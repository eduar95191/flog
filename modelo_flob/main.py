from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
import warnings

app = Flask(__name__)
CORS(app)
warnings.filterwarnings("ignore")

# Cargar el archivo CSV
file = 'data.csv'
file_golf = pd.read_csv(file)
file_golf.columns = file_golf.columns.str.strip()


def clasificar_clima(condicion):
    if 'lluvioso' in condicion.lower() or 'nublado' in condicion.lower():
        return 'Frío'
    else:
        return 'Cálido'


if 'Clima' in file_golf.columns:
    file_golf['Tipo_clima'] = file_golf['Clima'].apply(clasificar_clima)
else:
    print("La columna 'Clima' no se encuentra en el DataFrame.")

features = ['Edad', 'Estatura', 'Distancia_Hoyo', 'Ubicacion_Bandera', 'Temperatura', 'Velocidad_Viento']
target_golpes = 'Golpes_Total_Hoyo'
target_par = 'Resultado_Handicap'


palo_columns = ['Driver','Hibrido', 'Madera3', 'Madera5', 'Hierro2', 'Hierro3',
                'Hierro4', 'Hierro5', 'Hierro6', 'Hierro7', 'Hierro8',
                'Hierro9', 'Pitching _Wedge', 'Sand Wedge']
file_golf['Palo_recomendado'] = file_golf[palo_columns].idxmax(axis=1)


le_bandera = LabelEncoder()
file_golf['Ubicacion_Bandera'] = le_bandera.fit_transform(file_golf['Ubicacion_Bandera'])

le_palo = LabelEncoder()
file_golf['Palo_recomendado_codificado'] = le_palo.fit_transform(file_golf['Palo_recomendado'])


X = file_golf[features]
y_golpes = file_golf[target_golpes]
y_par = file_golf[target_par]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


X_train_golpes, X_test_golpes, y_train_golpes, y_test_golpes = train_test_split(X_scaled, y_golpes, test_size=0.2, random_state=42)
X_train_par, X_test_par, y_train_par, y_test_par = train_test_split(X_scaled, y_par, test_size=0.2, random_state=42)


rf_model_golpes = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model_par = RandomForestRegressor(n_estimators=100, random_state=42)


rf_model_golpes.fit(X_train_golpes, y_train_golpes)
rf_model_par.fit(X_train_par, y_train_par)

file_golf['Golpes_predichos'] = rf_model_golpes.predict(X_scaled).round(2)  # Redondeo a 2 decimales
file_golf['Par_predicho'] = rf_model_par.predict(X_scaled).round(1)


file_golf['Porcentaje_mejora_golpes'] = ((file_golf[target_golpes] - file_golf['Golpes_predichos']) / file_golf[target_golpes]) * 100
file_golf['Porcentaje_mejora_golpes'] = file_golf['Porcentaje_mejora_golpes'].abs().round(2)

file_golf['Porcentaje_mejora_par'] = ((file_golf[target_par] - file_golf['Par_predicho']) / file_golf[target_par]) * 100
file_golf['Porcentaje_mejora_par'] = file_golf['Porcentaje_mejora_par'].abs().round(2)


file_golf['Palo_predicho'] = file_golf['Palo_recomendado_codificado'].apply(lambda x: le_palo.inverse_transform([x])[0])


@app.route('/resumen_jugadores', methods=['GET'])
def get_resumen():
    id_jugador = request.args.get('id_jugador', type=int)

    if not id_jugador:
        return jsonify({"error": "Debe proporcionar los parámetros: 'id_jugador'."})

    # Filtrar por el ID del jugador
    if 'ID_Jugador' in file_golf.columns and 'Tipo_clima' in file_golf.columns:
        resumen_jugador = file_golf[file_golf['ID_Jugador'] == id_jugador]
    else:
        return jsonify({"error": "Las columnas 'ID_Jugador' y 'Tipo_clima' no existen."})

    if resumen_jugador.empty:
        return jsonify({"error": "No se encontraron resultados con los parámetros proporcionados."})

  
    resumen_jugador = resumen_jugador.groupby(['ID_Jugador', 'Tipo_clima']).agg({
        'ID_Juego': 'first',
        'Golpes_Total_Hoyo': 'sum',
        'Golpes_predichos': 'sum',
        'Par': 'sum',
        'Porcentaje_mejora_golpes': 'mean',
        'Porcentaje_mejora_par': 'mean',
        'Palo_recomendado': lambda x: x.mode()[0],
        'Edad': 'first',
        'Estatura': 'first',
        'N_Hoyo': 'first',
        'Resultado_Handicap': 'first',
    }).reset_index()

    resumen_jugador.rename(columns={'Palo_recomendado': 'Palo_mas_usado'}, inplace=True)

    resumen_jugador['Porcentaje_mejora_golpes'] = resumen_jugador['Porcentaje_mejora_golpes'].round(2).astype(str)
    resumen_jugador['Porcentaje_mejora_par'] = resumen_jugador['Porcentaje_mejora_par'].round(2).astype(str)

    resumen_json = resumen_jugador.to_dict(orient='records')
    return jsonify(resumen_json)


@app.route('/ranking', methods=['GET'])
def get_ranking():
    
    hoyos = request.args.get('hoyos', default='18', type=str)  

    if hoyos == "9":
        
        ranking_9 = file_golf[file_golf['N_Hoyo'] <= 9]
        ranking_9 = ranking_9[['ID_Jugador', 'Golpes_predichos', 'Golpes_Total_Hoyo', 'Porcentaje_mejora_golpes', 'Porcentaje_mejora_par']]
        ranking_9 = ranking_9.sort_values(by='Porcentaje_mejora_golpes', ascending=False)
        ranking_9_top = ranking_9.head(10) 
    else:
        ranking_9_top = pd.DataFrame()  

    ranking_18 = file_golf[file_golf['N_Hoyo'] == 18]
    ranking_18 = ranking_18[['ID_Jugador', 'Golpes_predichos', 'Golpes_Total_Hoyo', 'Porcentaje_mejora_golpes', 'Porcentaje_mejora_par']]
    ranking_18 = ranking_18.sort_values(by='Porcentaje_mejora_golpes', ascending=False)
    ranking_18_top = ranking_18.head(10)  

    
    response = {
        'ranking_9': ranking_9_top.to_dict(orient='records'),
        'ranking_18': ranking_18_top.to_dict(orient='records')
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

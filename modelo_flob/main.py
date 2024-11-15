import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
import warnings
from tabulate import tabulate

# Ignorar advertencias
warnings.filterwarnings("ignore")

# Cargar los datos y eliminar espacios en los nombres de columnas
file = 'data.csv'
file_golf = pd.read_csv(file)
file_golf.columns = file_golf.columns.str.strip()  # Eliminar espacios alrededor de los nombres de columnas

# Definir la función de clasificación del clima
def clasificar_clima(condicion):
    if 'lluvioso' in condicion.lower() or 'nublado' in condicion.lower():
        return 'Frío'
    else:
        return 'Cálido'

# Clasificar el clima
if 'Clima' in file_golf.columns:
    file_golf['Tipo_clima'] = file_golf['Clima'].apply(clasificar_clima)
else:
    print("La columna 'Clima' no se encuentra en el DataFrame.")

# Definir las columnas a usar
features = ['Edad', 'Estatura', 'Distancia_Hoyo', 'Ubicacion_Bandera', 'Temperatura', 'Velocidad_Viento']
target_golpes = 'Golpes_Total_Hoyo'
target_par = 'Resultado_Handicap'

# Crear la columna objetivo para el palo recomendado
palo_columns = ['Driver','Hibrido', 'Madera3', 'Madera5', 'Hierro2', 'Hierro3',
                'Hierro4', 'Hierro5', 'Hierro6', 'Hierro7', 'Hierro8',
                'Hierro9', 'Pitching _Wedge', 'Sand Wedge','Putt']
file_golf['Palo_recomendado'] = file_golf[palo_columns].idxmax(axis=1)

# Convertir variables categóricas a números
le_bandera = LabelEncoder()
file_golf['Ubicacion_Bandera'] = le_bandera.fit_transform(file_golf['Ubicacion_Bandera'])

le_palo = LabelEncoder()
file_golf['Palo_recomendado_codificado'] = le_palo.fit_transform(file_golf['Palo_recomendado'])

# Separar características y objetivos
X = file_golf[features]
y_golpes = file_golf[target_golpes]
y_par = file_golf[target_par]

# Estandarización de características
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Dividir los datos en conjunto de entrenamiento y prueba
X_train_golpes, X_test_golpes, y_train_golpes, y_test_golpes = train_test_split(X_scaled, y_golpes, test_size=0.2, random_state=42)
X_train_par, X_test_par, y_train_par, y_test_par = train_test_split(X_scaled, y_par, test_size=0.2, random_state=42)

# Crear y entrenar modelos
rf_model_golpes = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model_par = RandomForestRegressor(n_estimators=100, random_state=42)

rf_model_golpes.fit(X_train_golpes, y_train_golpes)
rf_model_par.fit(X_train_par, y_train_par)

# Predecir en los datos originales
file_golf['Golpes_predichos'] = rf_model_golpes.predict(X_scaled).round(2)  # Redondeo a 2 decimales
file_golf['Par_predicho'] = rf_model_par.predict(X_scaled).round(1)

# Calcular porcentaje de mejora para golpes
file_golf['Porcentaje_mejora_golpes'] = ((file_golf[target_golpes] - file_golf['Golpes_predichos']) / file_golf[target_golpes]) * 100
file_golf['Porcentaje_mejora_golpes'] = file_golf['Porcentaje_mejora_golpes'].abs().round(2)

# Calcular porcentaje de mejora para par
file_golf['Porcentaje_mejora_par'] = ((file_golf[target_par] - file_golf['Par_predicho']) / file_golf[target_par]) * 100
file_golf['Porcentaje_mejora_par'] = file_golf['Porcentaje_mejora_par'].abs().round(2)

# Invertir la codificación para el palo recomendado y el palo predicho
file_golf['Palo_predicho'] = file_golf['Palo_recomendado_codificado'].apply(lambda x: le_palo.inverse_transform([x])[0])

# Imprimir primera tabla con separación por jugador, ID de Juego y Hora_Estimada
if all(column in file_golf.columns for column in ['ID_Jugador', 'ID_Juego', 'Hora_Estimada']):
    resultados = file_golf[['ID_Juego', 'ID_Jugador', 'Hora_Estimada', 'N_Hoyo', 'Distancia_Hoyo',
                            'Golpes_Total_Hoyo', 'Golpes_predichos', 'Par', 'Par_predicho',
                            'Velocidad_Viento', 'Tipo_clima']]

    for jugador in resultados['ID_Jugador'].unique():
        print("-" * 50)  # Línea de separación entre jugadores
        print(f"\nResultados para el jugador {jugador}:")
        print(tabulate(resultados[resultados['ID_Jugador'] == jugador], headers='keys', tablefmt='pretty'))
else:
    print("Las columnas 'ID_Jugador', 'ID_Juego' o 'Hora_Estimada' no se encuentran en el DataFrame.")

# Resumen por jugador, separado por clima, sin incluir Hora_Estimada
if 'ID_Jugador' in file_golf.columns:
    resumen_jugadores = file_golf.groupby(['ID_Jugador', 'Tipo_clima']).agg({
        'Golpes_Total_Hoyo': 'sum',
        'Golpes_predichos': 'sum',
        'Par': 'sum',
        'Par_predicho': 'sum',
        'Porcentaje_mejora_golpes': 'mean',  # Promedio del porcentaje de mejora de golpes
        'Porcentaje_mejora_par': 'mean',  # Promedio del porcentaje de mejora de par
        'Palo_recomendado': lambda x: x.mode()[0]  # Palo más frecuente
    }).reset_index()

    # Renombrar la columna del palo más usado
    resumen_jugadores.rename(columns={'Palo_recomendado': 'Palo_mas_usado'}, inplace=True)

    # Formatear las columnas de porcentaje de mejora en el resumen a 2 decimales
    resumen_jugadores['Porcentaje_mejora_golpes'] = resumen_jugadores['Porcentaje_mejora_golpes'].round(2).astype(str)
    resumen_jugadores['Porcentaje_mejora_par'] = resumen_jugadores['Porcentaje_mejora_par'].round(2).astype(str)

    # Imprimir tabla 2
    print("\nResumen por jugador:")
    print(tabulate(resumen_jugadores, headers='keys', tablefmt='pretty'))
else:
    print("La columna 'ID_Jugador' no se encuentra en el DataFrame.")

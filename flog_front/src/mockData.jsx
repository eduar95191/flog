import barranquilla from './Imagenes_MockData/barranquilla.jpg';
import bogota from './Imagenes_MockData/bogota.jpg';
import cartagena from './Imagenes_MockData/cartagena.jpg';
import san_andres from './Imagenes_MockData/san_andres.jpg';
import pereira from './Imagenes_MockData/pereira.jpg';
import guajira from './Imagenes_MockData/guajira.jpg';

export const mockData = [
    {
      src: san_andres,
      title: "San Andrés islas",
      Description: "San Andrés es una isla en el Caribe colombiano, conocida por sus playas de arena blanca y aguas cristalinas, ideal para deportes acuáticos.",
      price: 600,
    },
    {
      src: cartagena,
      title: "Cartagena",
      Description: "Cartagena de Indias es una ciudad costera en la costa caribeña de Colombia, famosa por su centro histórico y playas.",
      price: 500,
    },
    {
      src: guajira,
      title: "Guajira",
      Description: "La Guajira es un departamento único en Colombia, conocido por su paisaje desértico y su cultura indígena vibrante. En esta región, el paisaje desértico domina, con extensas dunas de arena, playas prístinas y un clima cálido y seco que le otorga una personalidad singular",
      price: 400,
  
    },
    {
      src: pereira,
      title: "Pereira",
      Description: "Pereira es una ciudad ubicada en el corazón del Eje Cafetero, en la región montañosa central de Colombia, conocida por su papel destacado en la producción de café y su relevancia económica en la región.",
      price: 300,
  
    },
    {
      src: barranquilla,
      title: "Barranquilla",
      Description: "Barranquilla es una ciudad portuaria en la costa norte de Colombia, conocida por su animado carnaval y su importancia económica e industrial.",
      price: 150,
  
    },
    {
      src: bogota,
      title: "Bogotá",
      Description: "Bogotá es la capital de Colombia y la ciudad más grande del país, con una rica herencia cultural y numerosas atracciones.",
      price: 100,
    },
    
    
];

export const chips =[
  {key:0, label:"Flexibilidada de cancelación"},
  {key:1, label:"Vuelos de primera clase"},
  {key:2, label:"Vuelos ejecutivos"},
  {key:3, label:"vuelos estandar"},
  {key:4, label:"Más filtros"},
];
 /*Esto iba en el home.jsx en el return 
 <Grid container className={classes.section} spacing={3}>
                {
                  mockData.map((item, index) => (
                   <Grid item sm="6" md="4" lg="4">
                      <Destination
                      key={index}
                      src={item.src}
                      title={item.title}
                      description={item.Description}/> 
                   </Grid>
                  ))
                }
            </Grid>     


// Esto hace que un boton al momento de estar en el aparezca un texto y si quitas el cursor sea otro texto
const [showdates, setShowdates] = useState(false)

<Button onClick={()=>setShowdates(!showdates)}>
                  {
                    showdates ? "Esconder" : "Buscar fechas"
                  }
                </Button>     
                
//Esto es lo que estaba en un archivo Destination.jsx                
import React from 'react'
import { Typography, makeStyles } from '@material-ui/core';

export const Destination = ({src,title,description}) => {
  const classes = useStyle();
  return (
    <>
        <div className={classes.root}>
          <figure className={classes.imageWrapper}>
              <img className={classes.media} src={src} alt={title}/>
          </figure>
        <Typography variant="h5" color="textPrimary">{title}</Typography>
        <Typography variant="h6" color="textSecondary">{description}</Typography>
        </div>
    </>
  )
}

//objeto de estilos
const useStyle = makeStyles((theme) => ({
  root:{
    margin: theme.spacing(4,0,2,0), 
    [theme.breakpoints.down("sm")]:{
      "& h6":{
        wordWrap:"break-word",
      }
    },
  },  
  imageWrapper: {
    overflow:"hidden",

  },
  media:{
    height:"400px",
    width: "600px",
    objectFit:"cover",
    transform: "scale(1.1)",
    WebkitTransform: "scale(1.1)",
    WebkitTransition: ".4s ease-in-out",
    transition:".4s ease-in-out",
    "&:hover":{
        transform:"scale(1)",
        WebkitTransform: "scale(1)",
    },
    [theme.breakpoints.down("xs")]:{
      height:"200px",
    },
  },

}));
            */
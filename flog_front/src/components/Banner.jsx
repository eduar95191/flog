import React from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core';
import destino from '../imagenes/destino.jpg';
import { Link } from 'react-router-dom';

export const Banner = () => {
  const classes = useStyle();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.info}>
          <Typography variant='h2'>¡Vamos a Jugar GOLF!... </Typography>
          <Link to="/Partida"><Button variant='contained'>Registra una partida de 18 hoyos</Button></Link>
        </div>
      </div>
    
    </>
  )
}

//objeto de estilos
const useStyle = makeStyles((theme) => ({
  root:{
    height: "50vh",
    position: "relative",
    backgroundImage: `url(${destino})`,
    backgroundPosition: "center",
    backgroundSize:"cover", 
  },  
  info:{
    backgroundColor:"#000",
    color:"#fff",
    width:"350px",
    padding: theme.spacing(2),
    "& h2":{
        marginBottom: theme.spacing(4),
    },
    "& button":{
        backgroundColor:"rgba(0, 102, 204, 0.9)",
        color:"#fff",
        textTransform: "inherit",
        fontSiza:"1.2rem",
        fontWeight:"bold",
    },
    "& button:hover":{
        backgroundColor:"#fff",
        color:"rgba(0, 102, 204, 0.9)",
    },
  },
 
}));
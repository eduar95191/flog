import React from 'react'
import { Typography, makeStyles } from '@material-ui/core';

export const Footer = () => {
    const classes = useStyle();
  return (
    <div className={classes.root}>
        <Typography variant="subtitle1" gutterBottom>
            2024 Derechos reservados por FLOG
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            Términos de privacidad
        </Typography>
    </div>
  )
}
//objeto de estilos
const useStyle = makeStyles((theme) => ({
    root:{
       borderTop:"1px solid #ccc",
       textAlign:"center",
       fontStyle:"italic",
       marginTop: theme.spacing(2),
       background:"whitesmoke",
    },  
    
  }));
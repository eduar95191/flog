import React, { useState } from 'react';
import {Button, CssBaseline, makeStyles } from '@material-ui/core';
import { Banner } from './Banner';
//import { mockData } from '../mockData';

export const Home = () => {
    const classes = useStyle();
    

  return (
    <>
        <CssBaseline/>
        <div className={classes.root}>
            <div className={classes.dates}>
                
            </div>

            <Banner/>
            
        </div>
    </>
  )};

//objeto de estilos
const useStyle = makeStyles((theme) => ({
    root:{
        display:"flex",
        flexDirection:"column",
        margin: theme.spacing(2),
    },  
    dates:{
        display:"flex",
        flexDirection:"column",
        "& button":{
            border:"1px solid #ccc",
            backgroundColor:"#fff",
            color: "rgba(0, 102, 204, 0.9)",
            textTransform: "inherit",
            fontSize: "1.2rem",
            fontWeight:"bold",
        },
        "& button:hover":{
          backgroundColor:"rgba(0, 102, 204, 0.9)",
          color:"#fff",
        },
    },
  }));

 
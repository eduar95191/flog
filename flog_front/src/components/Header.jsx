import React, { useEffect, useState } from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  InputBase,
  List,
  Toolbar,
  Typography,
  makeStyles,
  ListItem,
  Button,
} from "@material-ui/core";
import logo from "../imagenes/logo.png";
import perfil from "../imagenes/perfil.png";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

export const Header = () => {
  const [tablet, setTablet] = useState(true);
  const [draweropen, setDraweropen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const responsiveness = () =>
      window.innerWidth < 900 ? setTablet(true) : setTablet(false);
    responsiveness();
    window.addEventListener("resize", () => responsiveness());
  }, []);

  const displayTablet = () => {
    const handleDrawerOpen = () => {
      setDraweropen(true);
    };

    const handleDrawerClose = () => {
      setDraweropen(false);
    };

    const headersData = [
      "Partida de GOLF",
      "Recomendaciones",
      "Ranking",
      "Cerrar sesión",
    ];
    const getDrawerChoices = () => {
      return headersData.map((data) => {
        return (
          <List>
            <ListItem>{data}</ListItem>
          </List>
        );
      });
    };

    return (
      <Toolbar className={classes.toolbar}>
        <IconButton
          {...{
            edge: "start",
            color: "#ccc",
            "arial-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: draweropen, //llama al useState, si es false se cierra y true se abre el menú del lado
            onClose: handleDrawerClose,
          }}
        >
          <div>{getDrawerChoices()}</div>
        </Drawer>
        <Link to="/">
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>
        <div className={classes.right}>
          <Link to="/login">
            <Button>
              <Typography>iniciar sesión</Typography>
            </Button>
          </Link>
          <Link to="/Registro">
            <Button>
              <Typography>Registrarse</Typography>
            </Button>
          </Link>
        </div>
      </Toolbar>
    );
  };

  const displayDesktop = () => (
    <Toolbar className={classes.toolbar}>
      <Link to="/">
        <img src={logo} alt="logo" className={classes.logo} />
      </Link>
      <div className={classes.center}>
        <InputBase
          fullWidth
          placeholder="Buscar aquí ..."
          inputProps={{ className: classes.input }}
        />
        <SearchIcon />
      </div>
      <div className={classes.right}>
        <Link to="/Partida" className={classes.Requisito}>
          <Typography>Partida de GOLF</Typography>
        </Link>
      </div>
      <div className={classes.right}>
        <Link to="/Recomendaciones" className={classes.Requisito}>
          <Typography>Recomendaciones</Typography>
        </Link>
      </div>
      <div className={classes.right}>
        <Link to="/Ranking" className={classes.Requisito}>
          <Typography>Ranking</Typography>
        </Link>
      </div>
      <div className={classes.right}>
        <Link to="/" className={classes.Requisito}>
          <Typography>Iniciar sesión</Typography>
        </Link>
      </div>
      <div className={classes.right}>
        <Link to="/Registro" className={classes.Requisito}>
          <Typography>Registrarse</Typography>
        </Link>
      </div>
      <Link to="/">
        <img src={perfil} alt="perfil" className={classes.logo} />
      </Link>
    </Toolbar>
  );

  return (
    <>
      <AppBar className={classes.root}>
        {tablet ? displayTablet() : displayDesktop()}
      </AppBar>
    </>
  );
};

//objeto de estilos
const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    zIndex: 99,
    width: "100vw",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "60px",
    margin: theme.spacing(1, 0, 0, 2),
    objectFit: "contain",
  },
  center: {
    display: "flex",
    alignItems: "center",
    border: "1px solid lightgray",
    minWidth: "300px",
    borderRadius: "999px",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  input: {
    fontSize: "1.2rem",
    padding: theme.spacing(1, 5, 1, 5),
  },
  right: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  Requisito: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#4CAF50",
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
}));

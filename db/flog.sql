
DROP DATABASE IF EXISTS flog;

CREATE DATABASE IF NOT EXISTS flog;

USE flog;

CREATE TABLE clima(
                      id_clima INT PRIMARY KEY,
                      tipo_clima varchar(50)

);

CREATE TABLE condiciones_climaticas (
                                        id_condicion INT PRIMARY KEY,
                                        velocidad_viento FLOAT,
                                        direccion_viento VARCHAR(50),
                                        humedad FLOAT,
                                        temperatura FLOAT,
                                        id_clima INT,
                                        FOREIGN KEY (id_clima) REFERENCES clima(id_clima)
);


CREATE TABLE palos (
                       id_palos INT PRIMARY KEY,
                       nombre VARCHAR(50),
                       distancia FLOAT
);



CREATE TABLE hoyo (
        id_hoyo INT PRIMARY KEY,
        distancia_hoyo FLOAT,
        ubicacion_bandera VARCHAR(50),
        golpes_totales INT
);


CREATE TABLE jugador (
        id_jugador VARCHAR(15) PRIMARY KEY,
        nombre VARCHAR(60),
        edad INT,
        estatura FLOAT,
        correo VARCHAR(100),
        contrasena VARCHAR(300)

);

CREATE TABLE juego (
        id_juego VARCHAR(15) PRIMARY KEY,
        hora_juego DATETIME,
        id_jugador VARCHAR(15),
        id_condicion INT,
        castigo INT,
        id_hoyo INT,
        id_palos INT,
        FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador),
        FOREIGN KEY (id_condicion) REFERENCES condiciones_climaticas(id_condicion),
        FOREIGN KEY (id_hoyo) REFERENCES hoyo(id_hoyo),
        FOREIGN KEY (id_palos) REFERENCES palos(id_palos)
);

INSERT INTO palos (id_palos, nombre, distancia) VALUES
        (1, 'Driver', 250),
        (2, 'Hibrido', 200),
        (3, 'Madera3', 230),
        (4, 'Madera5', 210),
        (5, 'Hierro2', 220),
        (6, 'Hierro3', 210),
        (7, 'Hierro4', 200),
        (8, 'Hierro5', 190),
        (9, 'Hierro6', 180),
        (10, 'Hierro7', 170),
        (11, 'Hierro8', 160),
        (12, 'Hierro9', 150),
        (13, 'Pitching Wedge', 140),
        (14, 'Sand Wedge', 130),
        (15, 'Putt', 10);

INSERT INTO clima (id_clima, tipo_clima)
VALUES
    (1,'Soleado'),
    (2,'Nublado');

INSERT INTO condiciones_climaticas (id_condicion, velocidad_viento, direccion_viento, humedad, temperatura, id_clima)
VALUES

    (1, 14.0, 'A favor', 60.0, 26.0, 1),
(2, 16.0, 'Cruzado a favor', 58.0, 27.0, 2),
   (3, 18.0, 'En contra', 57.0, 28.0, 2),
   (4, 20.0, 'A favor', 55.0, 29.0, 1),
   (5, 22.0, 'Cruzado en contra', 54.0, 30.0, 1);



INSERT INTO hoyo (id_hoyo, distancia_hoyo, ubicacion_bandera, golpes_totales) VALUES
                                                                                  (1, 382, 'Centro', 4),
                                                                                  (2, 552, 'Adelante', 5),
                                                                                  (3, 429, 'Centro', 4),
                                                                                  (4, 234, 'Adelante', 3),
                                                                                  (5, 602, 'Atrás', 5),
                                                                                  (6, 420, 'Centro', 4),
                                                                                  (7, 170, 'Centro', 3),
                                                                                  (8, 380, 'Adelante', 4),
                                                                                  (9, 555, 'Atrás', 5),
                                                                                  (10, 400, 'Centro', 4),
                                                                                  (11, 430, 'Centro', 4),
                                                                                  (12, 190, 'Adelante', 3),
                                                                                  (13, 550, 'Atrás', 5),
                                                                                  (14, 350, 'Centro', 4),
                                                                                  (15, 280, 'Adelante', 4),
                                                                                  (16, 610, 'Atrás', 5),
                                                                                  (17, 450, 'Centro', 4),
                                                                                  (18, 200, 'Centro', 3);

INSERT INTO jugador (id_jugador, nombre, edad, estatura,correo,contrasena) VALUES
                                                                       ('1', 'Juan Pérez', 52, 1.80,'juanp@gmail.com','123'),
                                                                       ('2', 'Carlos Gómez', 45, 1.75, 'carlosg@gmail.com','123'),
                                                                       ('3', 'Ana Martínez', 30, 1.68, 'anam@gmail.com','123'),
                                                                       ('4', 'Laura Rodríguez', 27, 1.72, 'laurar@gmail.com','123'),
                                                                       ('5', 'Luis Ramírez', 34, 1.78, 'luisr@gmail.com','123');


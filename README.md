# Administrador de usuarios JIRA

## Instalación

1) Abrir la terminal en la carpeta de la aplicacion y correr el comando `npm install`

## Configuracion

1) Crear el archivo a nivel root del proyecto llamado `.env`.
2) Agregar las siguientes variables

| Variable | Descripcion |
| --- | --- |
| HOST | URL del Jira, ej.: `https://fizzmod.atlassian.net` |
| USER_EMAIL | Email del usuario administrador |
| API_TOKEN | Token genedaro desde Jira |

## Iniciación

1) Dentro de la terminal correr el comando `npm run start:dev`

## Guía de uso

1) Acceder a JIRA, e ingresar a la seccion "Administracion de usuarios".

2) Dentro de esta seccion hacer click en el boton "Exportar usuarios".

    ![Exportar usuarios](https://i.imgur.com/1oA30l3.png)

3) A la hora de exportar usuarios es mandatorio seleccionar en "Incluir en la exportacion" la opcion _"Group membership"_.

    ![Group membershi](https://i.imgur.com/7w7F8UM.png)

4) Cuando termine de cargar, descargar la planilla.

    ![Download](https://i.imgur.com/ygX1qYB.png)

5) Con la aplicación corriendo, abrir en el navegador la direccion `http://localhost:8080`.

    ![App](https://i.imgur.com/ONHVrYY.png)

6) Seleccionar el archivo y seleccionar usuarios a remover de sus grupos.

7) Con todos los usuarios seleccionados, presionar "Aceptar", cuando termine de cargar esos usuarios estaran sin grupos.
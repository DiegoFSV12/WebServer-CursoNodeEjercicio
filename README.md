Usar el siguiente comando para generar las Keys al usar http2: openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt

/*Si no funciona openssl configurar las variables de entorno a la carpeta git/bin/usr/openssl en el disco donde se instalo*/



npm i dotenv env-var

Crear el archivo .env con la siguiente estructura:
PORT=
PUBLIC_PATH=

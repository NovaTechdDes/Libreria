# Ejecutar Docker

1. Crear archivo .dockerignore
2. Crear archivo dockerfile
3. crear archivo docker-compose.yml
4. Ejecutar en local `docker compose up --build`

   docker run -p 3001:3001 -e DB_HOST=192.168.0.139 -e DB_USER=pelusa -e DB_PASSWORD="Pelusa3345&" -e DB_NAME=libreria api_libreria

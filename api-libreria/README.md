# Inicializar en Docker

1. Crear archivo .dockerignore
2. Crear archivo dockerfile
3. Crear archivo docker-compose.yml
4. Subir a Docker Desktop con `docker compose build`
5. Ejecutar en local `docker compose up`

# Subir a Docker Hub

1. Iniciar sesión en Docker Hub: `docker login`
2. Construir la imagen: `docker build -t novatechdes/api-lachi:1.0.0 .`
3. Subir la imagen: `docker push novatechdes/api-lachi:1.0.0`

# Actualizar imagen en Docker Hub

1. Iniciar sesión en Docker Hub: `docker login`
2. Construir la imagen: `docker build -t novatechdes/api-lachi:(version) .`
3. Marcar como latest `docker tag novatechdes/api-lachi:(version) novatechdes/api-lachi:latest`
4. Subir la imagen: `docker push novatechdes/api-lachi:(version)`
5. Subir la imagen: `docker push novatechdes/api-lachi:latest`

# Bajar imagen de Docker Hub

1. Bajar la imagen: `docker pull novatechdes/api-lachi:1.0.0`
2. Parar y borrar el contenedor: `docker stop api-lachi` y `docker rm api-lachi`
3. Iniciar contenedor: `docker run -p 3001:3001 -e DB_HOST=192.168.0.138 -e DB_USER=pelusa -e DB_PASSWORD="Pelusa3345&" -e DB_NAME=libreria novatechdes/api-lachi:latest`

# Actualizar en Cliente

1. Bajar la imagen: `docker pull novatechdes/api-lachi:latest`
2. Parar y borrar el contenedor: `docker stop api-lachi` y `docker rm api-lachi`
3. Iniciar contenedor: `docker run -p 3000:3000 --restart always -e DB_HOST=host.docker.internal -e DB_USER=pelusa -e DB_PASSWORD="Pelusa3345&" -e DB_NAME=libreria novatechdes/api-lachi:latest`

# Ejecutar Docker

1. Crear archivo .dockerignore
2. Crear archivo dockerfile
3. crear archivo docker-compose.yml
4. Ejecutar en local `docker compose up --build`

   docker run -p 3001:3001 -e DB_HOST=192.168.0.139 -e DB_USER=pelusa -e DB_PASSWORD="Pelusa3345&" -e DB_NAME=libreria api_libreria

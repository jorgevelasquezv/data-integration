<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Data Integration Service

1. Clonar repositorio
2. Ejecutar comando para cargar modulos de node 
   ```
   npm install
   ```
3. Clonar archivo **.env.template** en un archivo **.env** 
4. Cambiar las variables de entorno 
5. Ejecutar comando para levantar base de datos
   ```
   docker-compose -f ./deployment/docker-compose-db.yml up -d 
   ```
6. Ejecutar comando para iniciar aplicación en modo desarrollo 
    ```
    npm run start:dev
    ```
7. Ejecutar SEED
   ```
   POST http://localhost:3000/api/v1/seed
   ```
8. Ejecutar el comando para correr la aplicación productiva y la base de datos contenerizada
   ```
   docker-compose -f ./deployment/docker-compose.yml up -d 
   ```
   
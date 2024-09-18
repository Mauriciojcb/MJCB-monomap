# Utiliza la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto 3000 para acceder a la API desde fuera del contenedor
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]

# Usar a imagem oficial do Node.js
FROM node:20.17.0

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Expor a porta 3000 para o Next
EXPOSE 3000

# Rodar o servidor de desenvolvimento do Next
CMD ["npm", "run", "dev"]
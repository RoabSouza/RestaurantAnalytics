# Dockerfile - COM PORTA 3000
FROM node:20-alpine

WORKDIR /app

# 1. Copiar e instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Copiar código
COPY . .

# 3. Build
RUN npm run build --prod

# 4. Instalar servidor HTTP simples
RUN npm install -g http-server

# 5. Expor porta 3000
EXPOSE 3000

# 6. Servir na porta 3000
CMD ["http-server", "dist/analyticsFront-A", "-p", "3000", "-a", "0.0.0.0", "--cors"]
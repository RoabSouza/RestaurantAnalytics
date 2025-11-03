# backend/Dokerfile

# 1. imagem base com java 17
FROM openjdk:17-jdk-slim

# 2. Diretorio de trabalho container
WORKDIR /app

# 3. Copiar o arquivo JAR
COPY target/analytics-0.0.1-SNAPSHOT.jar app.jar

# 4. Variáveis de ambiente
ENV SPRING_PROFILES_ACTIVE=docker
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/database_schema
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=qwerty

# 5. Expor porta
EXPOSE 8080

# 6. comando para rodar a aplicação
ENTRYPOINT [ "java","-jar","app.jar" ]




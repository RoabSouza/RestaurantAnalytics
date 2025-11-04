# Restaurant Analytics

**Requisitos:**
- Python 3.x instalado
- pip
- 
## 🚀 Como executar o projeto

## Navegar até a pagina database-docker
```bash
cd analytics/database-docker
```
### 1. Subir os containers Docker
```bash
docker-compose up -d
```
### 2. Popular o banco com dados de teste
**Passos:**
```bash
# Instalar dependências
pip install psycopg2-binary faker

# Navegar até a pasta do script
cd analytics/database-docker

# Executar o script
python generate_data.py --db-url "postgresql://postgres:qwerty@localhost:5432/database_schema"
```

### 3. Pronpts
```bash
======================================================================
God Level Coder Challenge - Data Generator
======================================================================
Generating 6 months of restaurant operational data...

Setting up base data...
✓ Base data: 3 sub-brands, 6 channels
Generating 50 stores...
✓ 50 stores created
Generating 500 products and 200 items...
✓ 498 products, 28 items, 4 option groups
Generating 10000 customers...

Vai retornar os seguintes pronpts, apos isso é só esperar concluir
Vai demorar um pouco por conta da densidades de dados...
```


### 4. Acessar a aplicação
- **Backend Spring**: http://localhost:8080 (ou a porta configurada)
- **Adminer** (gerenciador de BD): http://localhost:9090
  - Sistema: PostgreSQL
  - Servidor: postgres
  - Usuário: postgres
  - Senha: qwerty
  - Base de dados: database_schema

## 📦 Containers Docker

- `restaurant-postgres`: PostgreSQL 16 (porta 5432)
- `adminer-web`: Adminer (porta 9090)

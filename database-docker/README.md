# Restaurant Analytics

**Requisitos:**
- Python 3.x instalado
- pip
- 
## 🚀 Como executar o projeto

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

### 3. Acessar a aplicação
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

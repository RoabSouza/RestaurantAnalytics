# Restaurant Analytics

**Requisitos:**
- Python 3.x instalado
- pip
## 🚀 Como executar o projeto

## Navegar até a pagina database-docker
```bash
cd analytics/database-docker
```
### 1. 🐳 Subir os containers Docker
```bash
docker-compose up -d
```
### 2. 💉 Popular o banco com dados de teste
**Passos:**
```bash
# Instalar dependências
pip install psycopg2-binary faker

# Navegar até a pasta do script
cd analytics/database-docker

# Executar o comando para subir o docker
docker-compose up -d postgres adminer

# Comando para persistir os dados
docker-compose up data-generator

```

### 3. 👨‍💻Pronpts
```bash
Attaching to data-generator
data-generator  | Requirement already satisfied: psycopg2-binary in /usr/local/lib/python3.9/site-packages (2.9.11)
data-generator  | Requirement already satisfied: faker in /usr/local/lib/python3.9/site-packages (37.12.0)
data-generator  | Requirement already satisfied: tzdata in /usr/local/lib/python3.9/site-packages (from faker) (2025.2)
data-generator  | WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
data-generator  |
data-generator  | [notice] A new release of pip is available: 23.0.1 -> 25.3
data-generator  | [notice] To update, run: pip install --upgrade pip
data-generator  | ======================================================================
data-generator  | God Level Coder Challenge - Data Generator
data-generator  | ======================================================================
data-generator  | Generating 6 months of restaurant operational data...
data-generator  |
data-generator  | Setting up base data...
data-generator  | ✓ Base data: 3 sub-brands, 6 channels
data-generator  | Generating 50 stores...
data-generator  | ✓ 50 stores created
data-generator  | Generating 500 products and 200 items...
data-generator  | ✓ 498 products, 28 items, 4 option groups
data-generator  | Generating 10000 customers...
data-generator  | ✓ 30000 customers created
data-generator  | Generating sales for 6 months...
data-generator  |   → June 2025: 66,045 sales
data-generator  |   → July 2025: 154,544 sales
data-generator  |   → August 2025: 241,752 sales
data-generator  |   → September 2025: 343,178 sales
data-generator  |   → October 2025: 429,324 sales
data-generator  |   → November 2025: 517,079 sales
data-generator  | ✓ 539,677 total sales generated
data-generator  | Creating indexes...
data-generator  | ✓ Indexes created
data-generator  |
data-generator  | ======================================================================
data-generator  | ✓ Data generation complete!
data-generator  |   Stores: 50
data-generator exited with code 0
```


### 4. 🌐 Acessar a aplicação
- **🍃 Backend Spring**: http://localhost:8080 (ou a porta configurada)
- **🗄️ Adminer** (gerenciador de BD): http://localhost:9090
  - Sistema: PostgreSQL
  - Servidor: postgres
  - Usuário: postgres
  - Senha: qwerty
  - Base de dados: database_schema

## 📦 Containers Docker
- `🐘 restaurant-postgres`: PostgreSQL 16 (porta 5432)
- `🗂️ adminer-web`: Adminer (porta 9090)

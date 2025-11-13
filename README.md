# 🥑 Restaurant Analytics Dashboard

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green?style=for-the-badge&logo=spring)
![Angular](https://img.shields.io/badge/Angular-18-red?style=for-the-badge&logo=angular)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

**Dashboard completo de análise de vendas para restaurantes com múltiplos canais**

</div>

---

## 📋 Sobre o Projeto

Sistema desenvolvido para o **God Level Coder Challenge** da arcca, que permite donos de restaurantes analisarem e visualizarem dados de vendas de forma intuitiva e profissional.

O sistema processa **500.000 vendas** de **50 lojas** em **6 meses**, oferecendo insights através de gráficos interativos, filtros personalizados e relatórios em PDF.

### 🎯 Problema Resolvido

Donos de restaurantes gerenciam operações complexas através de múltiplos canais (presencial, iFood, Rappi, app próprio). Eles têm dados, mas não conseguem extrair insights personalizados para tomar decisões de negócio.

**Nossa solução:** Dashboard intuitivo que transforma dados em insights acionáveis.

---

## ✨ Funcionalidades

### 📊 Dashboard Principal
- ✅ **Métricas principais**: Faturamento total, total de vendas, ticket médio
- ✅ **Crescimento percentual** comparado com período anterior
- ✅ **Atualização em tempo real** dos dados

### 📊 Análise Comparativa
- ✅ **A analise comparativa** analisa os dados de um intervalo de tempo e retorna ganhos e pedas dentro deste meio tempo 


### 📈 Gráficos Interativos
- ✅ **Vendas por canal** (gráfico de pizza) - iFood, Presencial, Rappi, etc.
- ✅ **Horários de pico** (gráfico de barras) - análise por hora do dia
- ✅ **Evolução temporal** (gráfico de linha) - tendências dia a dia
- ✅ **Tooltips informativos** com valores formatados

### 🔍 Filtros Avançados
- ✅ **Período customizado** - escolha data início e fim
- ✅ **Atalhos rápidos** - últimos 7, 30 ou 90 dias
- ✅ **Validação de datas** - garante período válido

### 🏆 Rankings
- ✅ **Top 10 produtos mais vendidos** com quantidade e faturamento
- ✅ **Top 10 lojas** por performance com localização
- ✅ **Destaque visual** para top 3 (ouro, prata, bronze)

### 📄 Export PDF
- ✅ **Relatório profissional** com todas as métricas
- ✅ **Escolha de período** customizado no modal
- ✅ **Tabelas formatadas** de produtos, lojas e canais
- ✅ **Download automático** do arquivo

### 🌙 Dark Mode
- ✅ **Toggle suave** entre light e dark
- ✅ **Persistência** da preferência no localStorage
- ✅ **Detecção automática** da preferência do sistema operacional
- ✅ **Transições animadas**

### 📱 Responsividade
- ✅ **Design adaptativo** para desktop, tablet e mobile
- ✅ **Gráficos responsivos** que se ajustam ao tamanho da tela
- ✅ **Navegação otimizada** para dispositivos móveis

### ✏️ Personalizar
- ✅ **O Personaliza** permite que o usuario consiga excluir e adicionar e muda-los de lugar, podendo assim customizar o seu dashboard do jeito que achar mais confortavel.


---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Uso                 |
|------------|--------|-----                |
| Java       | 17     | Linguagem principal |
| Spring Boot| 3.2.x  | Framework backend   |
| Spring Data  JPA| 3.2.x  | ORM e queries       |
| PostgreSQL | 16     | Banco de dados      |
| iText      | 5.5.13 | Geração de PDF      |
| Maven | 3.9+ | Gerenciador de dependências|

### Frontend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Angular | 18 | Framework frontend |
| TypeScript | 5.0 | Linguagem tipada |
| Chart.js | 4.x | Gráficos interativos |
| RxJS | 7.x | Programação reativa |
| SCSS | - | Pré-processador CSS |

---

## 🗄️ Arquitetura do Banco de Dados

### Tabelas Principais
- **sales** (500k registros) - Vendas realizadas
- **stores** (50 registros) - Lojas da rede
- **channels** - Canais de venda (presencial, delivery)
- **products** - Catálogo de produtos
- **product_sales** - Produtos vendidos em cada venda
- **customers** - Clientes cadastrados
- **payments** - Pagamentos realizados
- **coupons** - Cupons de desconto aplicados

### Relacionamentos
```
Sale 1---N ProductSale N---1 Product
Sale N---1 Store
Sale N---1 Channel
Sale N---1 Customer
Sale 1---N Payment
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
```bash
- Java JDK 17 ou superior
- Node.js 18 ou superior
- PostgreSQL 16 ou superior
- Maven 3.9+
- Angular CLI 18+
```

### 1️⃣ Configurar Banco de Dados
```bash
# Criar banco de dados
psql -U postgres
CREATE DATABASE restaurant_db;
\q

# Executar script SQL (fornecido pelo desafio)
psql -U postgres -d restaurant_db -f script_dados.sql

# Verificar dados
psql -U postgres -d restaurant_db
SELECT COUNT(*) FROM sales;  -- Deve retornar ~500.000
```

### 2️⃣ Configurar Backend
```bash
# Clonar repositório
git clone https://github.com/seu-usuario/restaurant-analytics-challenge.git
cd restaurant-analytics-challenge/backend

# Configurar application.properties
# Edite: src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/database_schema
spring.datasource.username=postgres
spring.datasource.password=sua_senha

# Compilar e rodar
./mvnw clean install
./mvnw spring-boot:run
```

✅ Backend estará em: `http://localhost:8080`

### 3️⃣ Configurar Frontend
```bash
# Navegar para frontend
cd ../frontend

# Instalar dependências
npm install

# Rodar aplicação
ng serve
```

✅ Frontend estará em: `http://localhost:4200`

---

## 📡 Endpoints da API

### Dashboard

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| GET | `/api/dashboard/resumo` | Resumo completo do dashboard | `inicio`, `fim` |
| GET | `/api/dashboard/produtos/top` | Top produtos mais vendidos | `inicio`, `fim`, `limit` |
| GET | `/api/dashboard/vendas/por-canal` | Vendas agrupadas por canal | `inicio`, `fim` |
| GET | `/api/dashboard/vendas/por-hora` | Vendas por hora do dia | `inicio`, `fim` |
| GET | `/api/dashboard/vendas/por-dia` | Evolução diária de vendas | `inicio`, `fim` |
| GET | `/api/dashboard/lojas/top` | Top lojas por performance | `inicio`, `fim`, `limit` |
| GET | `/api/dashboard/vendas/por-dia-semana` | Vendas por dia da semana | `inicio`, `fim` |
| GET | `/api/dashboard/export/pdf` | Exportar relatório em PDF | `inicio`, `fim` |

### Parâmetros de Data
- Formato: ISO 8601 (`2024-10-31T23:59:59`)
- Opcionais: Se não informados, usa últimos 30 dias

### Exemplo de Requisição
```bash
# Obter resumo de outubro de 2024
curl "http://localhost:8080/api/dashboard/resumo?inicio=2024-10-01T00:00:00&fim=2024-10-31T23:59:59"

# Exportar PDF do último mês
curl "http://localhost:8080/api/dashboard/export/pdf" -o relatorio.pdf
```

---

## 📁 Estrutura do Projeto
```
RestaurantAnalytics/
├── 📁 backend/                 # Spring Boot
├── 📁 frontend/                # Angular
├── 📁 database/                # PostgreSQL + Docker
├── 📄 README.md               #   ✅
├── 📄 DECISOES_ARQUITETURAIS.md # ✅
├── 📄 CHANGELOG.md            #   ✅
├── 📄 LICENSE                 #   ✅
└── 📄 .gitignore              #   ✅
```

---

## 🎨 Screenshots

### Dashboard Light Mode
<img width="220" height="484" alt="Image" src="https://github.com/user-attachments/assets/523c8514-4e96-437d-bd78-5037c0fca204" />

### Dashboard Dark Mode
<img width="220" height="484" alt="Image" src="https://github.com/user-attachments/assets/044662b9-7625-4eab-8f75-08c541e65810" />

### Gráficos Interativos
<img width="220" height="484" alt="Image" src="https://github.com/user-attachments/assets/47a9d236-237a-458a-9c7d-2646700c7b16" />

### Export PDF
<img width="220" height="484" alt="Image" src="https://github.com/user-attachments/assets/75dc2ca4-355b-4e20-95e8-ca298704730e" />

---

## 📈 Performance

### Métricas
- ⚡ **Tempo de resposta médio**: < 500ms
- ⚡ **Query de 500k registros**: ~300-500ms
- ⚡ **Geração de PDF**: ~1-2 segundos
- ⚡ **First Contentful Paint**: < 1.5s
- ⚡ **Lighthouse Score**: 90+

### Otimizações Implementadas
- ✅ Índices no banco de dados
- ✅ Queries SQL nativas otimizadas
- ✅ Sem N+1 queries
- ✅ Agregações no banco (não na aplicação)
- ✅ Lazy loading de componentes
- ✅ CSS variables para dark mode


## 🤝 Contribuindo

Este projeto foi desenvolvido para um desafio técnico, mas sugestões são bem-vindas!

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**[Roab Souza Brito]**

- 💼 LinkedIn: [[linkedin.com/in/seu-perfil](https://www.linkedin.com/in/roab-brito/)]([https://linkedin.com/in/seu-perfil](https://www.linkedin.com/in/roab-brito/))
- 🐱 GitHub: [@RoabSouza]([https://github.com/seu-usuario](https://github.com/RoabSouza))
- 📧 Email: roabsouza144@gmail.com

---

## 🙏 Agradecimentos

- **DEUS** pois sem sua graça eu não conseguiria nem começar.
- **nola** pela oportunidade do desafio.

---

Feito com ❤️ e ☕ para o God Level Coder Challenge

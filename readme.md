# PayTurismo - Gestão de Agências de Turismo

Este projeto consiste em uma aplicação Full Stack para gestão de agências de turismo, composta por uma API em Node.js com Express e TypeScript, e um frontend em React com Vite.

## 📋 Pré-requisitos
`Docker` e `Docker Compose` instalados

`Node.js` (versão 18 ou superior)

`npm` ou `yarn`

## 🚀 Como executar o projeto
1. Clone o repositório

```bash
  git clone https://github.com/TheoTi/payturismo.git
  cd payturismo
```
2. Configuração do ambiente

## API (Backend)
Acesse a pasta da API:

```bash
  cd api
```
Crie o arquivo `.env` baseado no exemplo:

```bash
  cp .env.example .env
```
O arquivo `.env` deve conter as seguintes variáveis:

```env
  MYSQL_DATABASE=payturismo
  MYSQL_ROOT_PASSWORD=root
  DATABASE_URL=mysql://root:root@db:3306/payturismo?schema=public
  JWT_SECRET=testePayturismo
  SERVER_PORT=3333
```
## Frontend
Volte para a raiz do projeto e acesse a pasta do frontend:

```bash
  cd ../web
```

Crie o arquivo `.env` baseado no exemplo:

```bash
  cp .env.example .env
```
O arquivo `.env` deve conter:

```env
  VITE_BASE_API_URL=http://localhost:3333
```
3. Executando com Docker Compose

No diretório `/api` do projeto (onde está o arquivo `docker-compose.yml`), execute:

```bash
  docker-compose up --build
```
Este comando irá:

- [x] Construir as imagens Docker para a `API` e o `banco de dados MySQL`
- [x] Iniciar os containers
- [x] Popular o banco de dados com as tabelas necessárias

4. Acessando a aplicação
API: estará disponível em `http://localhost:3333`

## 🛠️ Executando sem Docker (opcional)
### Backend
Na pasta `api`, instale as dependências:

```bash
  npm install
```
Certifique-se de que ao menos o banco de dados está acessível e crie as migrations do `Prisma`

```bash
  npm run prisma:migrate
```

Execute a API:

```bash
  npm run dev
```

### Frontend
Na pasta `web`, instale as dependências:

```bash
  npm install
```
Execute o frontend:

```bash
  npm run dev
```

Após este comando a aplicação estará disponível em `http://localhost:5173`

## 📚 Documentação da API
A API possui documentação Swagger que pode ser acessada em:

```bash
  http://localhost:3333/api-docs
```
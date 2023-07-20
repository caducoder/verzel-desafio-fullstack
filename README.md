
# Catálogo de Veículos

Projeto criado para o desafio fullstack da verzel. Consiste em um sistema para
O sistema de catálogo de carros desenvolvido para o desafio fullstack da empresa Verzel é uma aplicação web moderna e responsiva, que permite aos usuários  visualizar uma ampla variedade de carros disponíveis para venda. O sistema conta com um perfil administrativo para adicionar, alterar e excluir carros.


## Stack utilizada

**Front-end:** React, React-Query, MaterialUI, React-router-dom, Axios, React-Hook-Form.

**Back-end:** Java 17, Spring Boot, Spring Data JPA, Spring Security, JJWT.


## Instalação

O sistema utiliza o banco de dados embutido H2, sem necessidade de configuração.

Para baixar o sistema, clone o repositório:

```bash
    git clone https://github.com/caducoder/verzel-desafio-fullstack.git
```
Entre na pasta do backend (carros) e suba a aplicação com o seguinte comando:

```bash
    mvn spring-boot:run
```

Abra outro terminal para o front, vá para a pasta do frontend (carros-front) e instale as dependências:
```bash
    npm install
```
Inicie o front:
```bash
    npm run dev
```

Acesse http://127.0.0.1:5173/

Administrador padrão:
```
Email: admin@verzel.com
Senha: admin
```
## Funcionalidades

- Paginação
- Responsividade
- Autenticação por Token JWT
- CRUD (Create, Read, Update, Delete)


## Apêndice

Na funcionalidade de edição do carro, faltou implementar a alteração da foto do carro.

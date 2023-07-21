
# Catálogo de Veículos

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

- **Paginação**: Os carros são exibidos em páginas, proporcionando uma experiência de navegação mais fluída.

- **Responsividade**: A aplicação é responsiva, adaptando-se a diferentes dispositivos, como smartphones, tablets e computadores.

- **Autenticação por Token JWT**: O sistema utiliza autenticação baseada em Token JWT (JSON Web Token) para garantir a segurança das operações.

- **CRUD** (Create, Read, Update, Delete): O perfil administrativo permite adicionar, visualizar, atualizar e excluir carros do catálogo.

## Documentação

### Passo a passo do fluxo de autenticação:

O servidor de autenticação OAuth é responsável por gerar tokens JWT e validar a autenticação dos usuários. Ele é configurado usando a biblioteca Spring Security OAuth2.

Quando o administrador faz o login, ele envia uma solicitação de autenticação para o servidor de autenticação OAuth. Essa solicitação inclui as credenciais de autenticação do usuário, que nesse caso é email e senha.

O servidor de autenticação valida as credenciais do usuário. Se as credenciais estiverem corretas, o servidor gera um token JWT e retorna-o para o cliente.

Dessa forma, o cliente envia o token junto a requisição para as rotas privadas, e se for válido, libera o acesso ao recurso.

No cliente, o token está sendo guardado no contexto da aplicação, atráves do hook useContext.

## Apêndice

Na funcionalidade de edição do carro, faltou implementar a alteração da foto do carro.

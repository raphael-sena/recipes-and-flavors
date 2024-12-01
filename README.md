# Recipes & Flavors

## Descrição

O Recipes & Flavors é uma aplicação web para compartilhamento de receitas de culinária, com filtros avançados para pesquisa de receitas por categorias como tipo de dieta, tipo de cozinha, dificuldade, entre outros. A aplicação foi construída utilizando Java com Spring Boot para o backend, e Next.js, Typescript e TailwindCSS para o frontend. A arquitetura segue o padrão MVC (Model-View-Controller) no backend, com a implementação de autenticação via JWT (JSON Web Token) para segurança, além da persistência de dados no Banco PostgreSQL.

A aplicação também é conteinerizada com o uso do Docker, facilitando o deploy e a escalabilidade.

## Tecnologias
* Backend: Java, Spring Boot, PostgreSQL
* Frontend: Next.js, Typescript, TailwindCSS
* Banco de Dados: PostgreSQL
* Autenticação: JWT (JSON Web Token)
* Conteinerização: Docker
* Arquitetura: MVC (Model-View-Controller)

## Organização das Pastas
### Backend (Java + Spring Boot)

```
/backend
    ├── /src
    │   ├── /main
    │   │   ├── /java
    │   │   │   ├── /com
    │   │   │   │   ├── /recipes
    │   │   │   │   │   ├── /flavors
    │   │   │   │   │   │   ├── /configs
    │   │   │   │   │   │   ├── /controllers
    │   │   │   │   │   │   ├── /entities
    │   │   │   │   │   │   |   ├── /dtos
    │   │   │   │   │   │   |   ├── /enums
    │   │   │   │   │   │   ├── /exceptions
    │   │   │   │   │   │   ├── /repositories
    │   │   │   │   │   │   ├── /services
    │   │   │   │   │   │   └── /specifications
    │   │   │   │   │   ├── /resources
    │   │   │   │   │   │   └── application.properties
    │   │   │   │   │   │   └── application-dev.properties
    │   │   │   │   │   │   └── application-test.properties
    │   │   │   │   │   │   └── application-prod.properties
    ├── Dockerfile
    ├── pom.xml

```


#### Detalhamento das Pastas:
* /configs: Contém as configurações globais da aplicação, como beans, filtros e configurações de segurança (JWT), inicialização de Roles, etc. 
* /controller: Contém os controladores responsáveis por receber as requisições HTTP e interagir com o serviço de negócio.
* /entities: Entidades JPA que representam os modelos de dados no banco.
* /entities/dto: Objetos de transferência de dados (DTOs) utilizados para facilitar a comunicação entre camadas.
* /entities/enums: Contém enums que representam valores fixos usados no sistema (Category, CuisineType, Difficulty, DietType).
* /exceptions: Contém classes de exceções globais personalizadas.
* /repositories: Contém interfaces de repositórios responsáveis pela persistência dos dados no banco.
* /services: Contém a lógica de negócio da aplicação.
* /specifications: Contém as especificações para as consultas complexas ao banco de dados.
* /resources: Contém recursos adicionais necessários para a aplicação, como os arquivos de propriedades do Spring.

### Frontend (Next.js + TailwindCSS)
```
/frontend
    ├── /node_modules         
    ├── /public               
    ├── /src                  
    │   ├── /components      
    │   ├── /context          
    │   ├── /helpers          
    │   ├── /lib              
    │   ├── /models          
    │   ├── /pages            
    │   ├── /services         
    │   ├── /styles           
    │   ├── enums.tsx                  
    ├── docker-compose.yml    
    ├── Dockerfile           
    ├── next.config.ts        
    ├── package-lock.json     
    ├── package.json          
    ├── postcss.config.js     
    ├── postcss.config.mjs    
    ├── README.md             
    ├── tailwind.config.ts    
    ├── tsconfig.json         

```
#### Detalhamento das Pastas e Arquivos:
* /public: Contém arquivos públicos que podem ser acessados diretamente pelo navegador, como imagens, ícones e fontes.
* /src: Diretório principal onde está o código-fonte da aplicação.
* /src/components: Contém os componentes reutilizáveis da interface.
* /src/context: Aqui ficam os contextos do React, que são usados para gerenciar o estado global da aplicação.
* /src/helpers: Contém funções utilitárias que são usadas em várias partes da aplicação.
* /src/lib: Este diretório contém bibliotecas e funções auxiliares.
* /src/models: Contém as interfaces e tipos do TypeScript para estruturar os dados que serão manipulados pela aplicação.
* /src/pages: Diretório onde ficam as páginas da aplicação.
* /src/services: Contém funções e módulos para a comunicação com a API do backend. 

## Diferenciais Implementados
1. Filtros Avançados para Pesquisa de Receitas
  A aplicação implementa filtros poderosos para facilitar a busca de receitas. O modelo de dados Recipe possui vários atributos, e a API permite filtrar receitas com base nos seguintes parâmetros:
    * Dieta (DietType)
    * Tipo de Cozinha (CuisineType)
    * Dificuldade (Difficulty)
    * Categoria (Category
  Para implementar os filtros, foi utilizado o recurso de filtragem dinâmica no backend, permitindo consultas rápidas e eficientes no banco de dados.
2. Soft Deletion com Hibernate Filters
  O backend implementa o conceito de "soft delete" utilizando filtros do Hibernate. Isso significa que, ao invés de excluir fisicamente uma receita do banco de dados, ela é marcada como deletada e pode ser filtrada na hora de buscar receitas.
  A entidade Recipe possui um campo deleted (booleano) que indica se a receita foi "excluída", e um filtro Hibernate foi configurado para ignorar essas receitas nas buscas.
3. JWT para Autenticação e Autorização
  O sistema de autenticação é baseado em JWT (JSON Web Tokens), proporcionando segurança no processo de login e garantindo que apenas usuários autenticados possam acessar recursos restritos da aplicação.
4. Conteinerização com Docker
  O projeto é conteinerizado usando Docker, permitindo que a aplicação seja facilmente empacotada, distribuída e executada em qualquer ambiente. O Dockerfile e a configuração do Docker Compose foram criados para facilitar o processo de build e execução dos containers.
5. UI Responsiva com TailwindCSS
  O frontend é desenvolvido utilizando TailwindCSS, garantindo uma interface responsiva e moderna, com um design simples e personalizável.

## Instruções para Execução
### Backend
1. Pré-requisitos: Certifique-se de ter o Java 17 e o Maven instalados em sua máquina.
2. Clone o repositório:
  ```git
    git clone https://github.com/raphael-sena/recipes-and-flavors.git
  ```
  ```bash
    cd backend
  ```

3. Para compilar e executar o backend localmente, use o Maven:
  ```bash
    mvn clean install
  ```
  ```bash
    mvn spring-boot:run
  ```
4. A aplicação estará disponível em [http://localhost:8080]([http://localhost:8080]).


### Frontend
1. Pré-requisitos: Certifique-se de ter o Node.js e o npm ou yarn instalados.
2. Entre na pasta /frontend da aplicação.
```bash
    cd../..
  ```
```bash
    cd frontend
  ```
3. Instale as dependências:
```bash
    npm install
  ```
4. Para rodar a aplicação localmente, use:
```bash
    npm run dev
  ```
5. O frontend estará disponível em [http://localhost:3000](http://localhost:3000).






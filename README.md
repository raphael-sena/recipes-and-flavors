# Recipes & Flavors
![image](https://github.com/user-attachments/assets/b414c7f3-ed6d-4094-bd62-5fcfbaefa858)

## Descrição
O Recipes & Flavors é uma aplicação web para compartilhamento de receitas de culinária, com filtros avançados para pesquisa de receitas por categorias como tipo de dieta, tipo de cozinha, dificuldade, entre outros. A aplicação foi construída utilizando Java com Spring Boot para o backend, e Next.js, Typescript e TailwindCSS para o frontend. A arquitetura segue o padrão MVC (Model-View-Controller) no backend, com a implementação de autenticação via JWT (JSON Web Token) para segurança, além da persistência de dados no Banco PostgreSQL.

A aplicação também é conteinerizada com o uso do Docker, facilitando o deploy e a escalabilidade.

## Planejamento e Documentação
O planejamento, a documentação e os diagrams desenvolvidos para concepção e desenvolvimento da solução para o problema proposto, estão disponíveis no caminho [./docs](https://github.com/raphael-sena/recipes-and-flavors/tree/main/docs) da aplicação, e lá é possível encontrar o figma desenvolvido, disponível também no [link](https://www.figma.com/proto/Vngm0DYncrRASCs8I6hsAe/recipes%26flavors?node-id=12-2&node-type=canvas&t=nJdT6WyAAabqxGyP-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=12%3A2).
### Documentos:
* [Documento de Visão](https://github.com/raphael-sena/recipes-and-flavors/blob/b07a10516507d9130cb7e1e0c72c22f3a91b4e1c/docs/vision-document/Recipes%26Flavors-Documento_de_Visao.pdf): documento onde estão todos os requisitos, tanto funcionais quanto não-funcionais elencados por mim
* [Diagrama de Classe UML](https://github.com/raphael-sena/recipes-and-flavors/blob/b07a10516507d9130cb7e1e0c72c22f3a91b4e1c/docs/diagrams/class-diagram/uml-class-diagram.png): documento para abstrair a relação entre as classes e definição de ORM.
* [Protótipo Interativo](https://github.com/raphael-sena/recipes-and-flavors/tree/b07a10516507d9130cb7e1e0c72c22f3a91b4e1c/docs/prototype): disponível no readme no link ao lado.

## Tecnologias
* Backend: Java, Spring Boot, PostgreSQL
* Frontend: Next.js, Typescript, TailwindCSS
* Banco de Dados: PostgreSQL
* Autenticação: JWT (JSON Web Token)
* Conteinerização: Docker
* Arquitetura: MVC (Model-View-Controller)

## Organização de Diretórios
A Recipes & Flavors possui, além do diretório de documentação já descrito anteriormente, um sub diretório destinado à código e desenvolvimento e que, por sua vez possui 2 subdiretórios, um detinado para o backend e o outro para o frontend. A árvore então, para exemplificar, ficaria assim: 
```bash
    ./recipes-and-flavors
                    ├── /code
                    │     └── /backend
                    │     └── /frontend
                    ├── /docs
                    ├── README.md
```
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
    │   │   │   │   │   │   |   └── /dtos
    │   │   │   │   │   │   |   └── /enums
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
6. Recuperação de Senha
   O sistema conta com uma recuperação de senha simples.

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


## Desenvolvimento: 
<table align="center">
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raphael-sena"><img src="https://avatars.githubusercontent.com/raphael-sena" width="100px;" alt="Raphael Sena"/><br /><sub><b>Raphael Sena Augusto de Brito</b></sub></a><br /><a href="https://github.com/raphael-sena/recipes-and-flavors/commits?author=raphael-sena" title="Code">Commits 💻</a></td>
    </tr>
  </tbody>
</table>







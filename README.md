# Projeto Meadowlark Travel

Aplicação Web com Node e Express do livro "Programação web com Node e Express: beneficiando-se da stack JavaScript", do professor Ethan Brown

Dependências:

- Express
- Handlebars (view engine)
- Jest para testes unitários
- Puppeteer para testes de Integração [^1]
- Portfinder como dependência para a aplicação ser capaz de achar portas abertas para se comunicar
- Body-parser para analizar o corpo de requisições. [^2]
- ESLint [^1]
- CSS Bootstrap [^1]
- Multiparty para o parseamento de requisições relacionadas ao upload de arquivos.
- Cookie-parser. [^1]
- Express-session. [^1]
- Nodemailer [^1]
- Morgan: criação de ambientes diferenciados de Log para o projeto. Em console para ambiente de Desenvolvimento e em arquivo separado para ambiente de Produção.
- Forever: para gerenciamento de processos em Node-JS.
- Artillery
- Mongoose - mapeador objeto-documento do MongoDB.
- PG - o cliente do banco de dados Postgres


[^1]: Essas dependências acabaram não sendo utilizadas no projeto final.
[^2]: Estaremos testando no projeto o parser de requisições de duas maneiras diferentes, sendo a primeira a partir do tradicional atributo 'action' do HTML, e a segundo no estilo front-end usando preventDefault para enviar a requisão por meio de JSON.

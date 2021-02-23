# Projeto Meadowlark Travel

Aplicação Web com Node e Express do livro "Programação web com Node e Express: beneficiando-se da stack JavaScript", do professor Ethan Brown

Dependências:

- Express
- Handlebars (view engine)
- Jest para testes unitários
- Puppeteer para testes de Integração
- Portfinder como dependência para a aplicação ser capaz de achar portas abertas para se comunicar
- ESLint
- CSS Bootstrap
- Body-parser para analizar o corpo de requisições. [^1]



[^1]: Estaremos testando no projeto o parser de requisições de duas maneiras diferentes, sendo a primeira a partir do tradicional atributo 'action' do HTML, e a segundo no estilo front-end usando preventDefault para enviar a requisão por meio de JSON.

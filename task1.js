const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

let homePageViews = 0;
let aboutPageViews = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    homePageViews++;
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end(`
      <h1>Добро пожаловать на мой сайт!</h1>
      <p>Количество просмотров этой страницы: ${homePageViews}</p>
      <a href="/about">Перейти на страницу About</a>
    `);
  } else if (req.url === '/about') {
    aboutPageViews++;
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end(`
      <h1>About</h1>
      <p>Количество просмотров этой страницы: ${aboutPageViews}</p>
      <a href="/">Перейти на главную страницу</a>
    `);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end('<h1>Страница не найдена!</h1>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

let counters = {};

// Загрузка данных счетчиков из файла
fs.readFile("counters.json", "utf8", (err, data) => {
  if (!err) {
    counters = JSON.parse(data);
  }
});

// Миддлвэр для сохранения данных счетчиков в файл
app.use((req, res, next) => {
  fs.writeFile("counters.json", JSON.stringify(counters), (err) => {
    if (err) {
      console.error("Error saving counters data");
    }
    next();
  });
});

// Обработчик для страницы "/"
app.get("/", (req, res) => {
  counters["/"] = (counters["/"] || 0) + 1;
  res.send(`Home page visited ${counters["/"]} times`);
});

// Обработчик для страницы "/about"
app.get("/about", (req, res) => {
  counters["/about"] = (counters["/about"] || 0) + 1;
  res.send(`About page visited ${counters["/about"]} times`);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

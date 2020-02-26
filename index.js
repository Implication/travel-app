const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 5000;

//Home page
app.get("/", (req, res) => res.render("home"));

const fortunes = [
  "I'm tired of the my life",
  "Everyone is out to get me",
  "Don't ever settle for less"
];
//About page
app.get("/about", (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
});

//404 Page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

//500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `Server started on http://localhost:${port}` + " press CTRL-C to terminate."
  )
);

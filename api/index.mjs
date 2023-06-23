import http from "node:http";
import words from "./words.json" assert { type: "json" };

// const words = ["hello", "word"];
// hier statt words echte api server anfrage erstellen
const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.end(JSON.stringify(words));
});

server.listen(80);

// mjs ist quasi backend teil- node

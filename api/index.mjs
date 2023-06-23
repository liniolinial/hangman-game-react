import http from "node:http";
import words from "./words.json" assert { type: "json" };

// const words = ["hello", "word"];

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");
  // je nach der Server muss ich das ändern.
  response.end(JSON.stringify(words));
});

server.listen(80);

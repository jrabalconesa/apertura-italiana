const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const root = __dirname;
const port = 8000;
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8" };
const server = http.createServer((request, response) => {
  const requested = decodeURIComponent(request.url.split("?")[0]);
  const relative = requested === "/" ? "index.html" : requested.replace(/^\/+/, "");
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) { response.writeHead(403).end("Acceso denegado"); return; }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"}); response.end("Archivo no encontrado"); return; }
    response.writeHead(200, {"Content-Type":mime[path.extname(file)] || "application/octet-stream", "Cache-Control":"no-cache"});
    response.end(data);
  });
});
server.listen(port, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${port}`;
  console.log(`La Italiana está disponible en ${url}`);
  if (!process.argv.includes("--no-open")) exec(`start "" "${url}"`);
});

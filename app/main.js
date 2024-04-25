import express from 'express';
import cors from "cors";

// ES6 Import helper for path
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init server and define port
const server = express();
const port = 2000;

server.use(cors({ origin: "http://localhost:" + port }));
server.use(express.static(path.join(__dirname, '/pages')));
server.use(express.json());

// Redirect all params to root, serve html index file
server.get('/', ( req, res ) => { res.sendFile(path.join(__dirname, '/pages/index.html')) })
server.get('*', ( req, res ) => { res.redirect(301, '/') })

// Listen for connections
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
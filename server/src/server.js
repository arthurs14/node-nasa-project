// Packages
const http = require("http");

// File Imports
const app = require("./app");

/* --- START OF FILE --- */
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

require("dotenv").config();
const http = require('http');
const app = require("./app")
const server = http.createServer(app)
const port = process.env.PORT || 5000

// Import db
require("./db/connection");

const main = async() => {
	server.listen(port, () => {
		console.log(`prime property server port ${port}`);
	  });
}
main()
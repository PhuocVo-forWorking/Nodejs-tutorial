const express = require('express');
const path = require('path');
const configViewEngine = require('./src/config/viewEngine');
const webRoutes = require('./src/routers/web');
const router = require('./src/routers/web');
const connection = require('./src/config/database');

require('dotenv').config();

const app = express();
const port = process.env.port || 8888; //port => hardcode .uat .prod
const hostname = process.env.host_name;

//config req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//config template engine
configViewEngine(app);

// bao routers
app.use('/', webRoutes);

//test connection


// connection.query(
//   'SELECT * FROM Users u',
//   function(err, results) {
//     console.log(">>>results= ", results); // results contains rows returned by server
//   }
// );


app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
});

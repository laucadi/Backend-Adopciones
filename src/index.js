const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

require("./database");

app.set('Port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origen: '*'}));

app.listen(app.get("Port"), () => {
    console.log("El servidor esta escuchando por el puerto: ", app.get("Port"));
  });

  app.use("/usuarios", require('./router/usuarios.route'));
  app.use("/mascotas", require('./router/mascotas.route'));
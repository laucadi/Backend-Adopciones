const mongoose = require("mongoose");
URL=('mongodb://localhost/BdAdopciones');

//URL=('mongodb+srv://LauCaicedo:diaz18210@cluster0.gyn1k.mongodb.net/BaseDeDatosAdopciones?retryWrites=true&w=majority');


mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Base de datos conectada:", db.connection.name))
  .catch((error) => console.log(error));

  module.exports = mongoose;
const mongoose = require("mongoose")

const Carro = mongoose.model("Carro", {
  user_id: String,
  nome: String,
  carro: String,
  placa: String,
  contato: String,
  email: String
})

module.exports = Carro
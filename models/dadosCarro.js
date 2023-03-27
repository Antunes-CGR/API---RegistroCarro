const mongoose = require("mongoose")

const dadosCarro = mongoose.model("User", {
  nome: String,
  carro: String,
  placa: String,
  contato: String,
  email: String
})

module.exports = dadosCarro
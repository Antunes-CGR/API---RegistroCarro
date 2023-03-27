
//models
const User = require("../models/User")

class CarroController {
  async index(req, res) {
    const listUser = await User.find()
    return res.status(200).json(listUser)
  }
  async store(req, res) {
    try {
      const user = new User({
        nome: req.body.nome,
        carro: req.body.carro,
        placa: req.body.placa,
        contato: req.body.contato,
        email: req.body.email
      })      

      await user.save()
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
    }

  }
  async update(req, res) {
  }
  async destroy(req, res) {
  }
  async show(req, res) {
    
  }
}

module.exports = new CarroController()
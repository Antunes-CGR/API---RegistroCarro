
//models
const Carro = require("../models/Carro")

class CarroController {
  async index(req, res) {
    const listCarro = await Carro.find()
    return res.status(200).json(listCarro)
  }
  async store(req, res) {
    try {
      const { user_id } = res.locals

      const carroCreate = await Carro.create({
        user_id,
        nome: req.body.nome,
        carro: req.body.carro,
        placa: req.body.placa,
        contato: req.body.contato,
        email: req.body.email
      })      

      return res.status(200).json(carroCreate)
    } catch (error) {
      console.log(error)
    }

  }
  async update(req, res) {
    try {
      const { user_id } = res.locals
      const { id } = req.params

      const updateCarro = await Carro.findByIdAndUpdate(id, {
        nome: req.body.nome,
        contato: req.body.contato,
        email: req.body.email
      })

        await updateCarro.save()

        return res.status(200).json({ msg:"Dados alterados", updateCarro})      
    } catch (error) {
      console.log(error)
    }

  }
  async destroy(req, res) {
  }
  async show(req, res) {
    
  }
}

module.exports = new CarroController()
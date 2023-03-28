
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
    try {
      const { user_id } = res.locals
      const { id } = req.params

      const destroyCarro = await Carro.findByIdAndDelete(id)

      return res.status(200).json({ msg: "Delete com sucesso!", destroyCarro})      
    } catch (error) {
      console.log(error)
    }

  }
  async show(req, res) {
    const { id } = req.params

    const showCarro = await Carro.findById(id)

    return res.status(200).json(showCarro)
  }
}

module.exports = new CarroController()
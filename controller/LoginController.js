const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()

//models
const User = require("../models/User")

class UserController {
  async index(req, res) {
    const listUser = await User.find()
    return res.status(200).json(listUser)
  }

  async store(req, res) {
    try {
      const { name, email, password,confirmPassword } = req.body

      //password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash( password, salt)
      
      //Validations
      if(!name){
        return res.status(400).json({ msg:"Necessário preenchimento do nome"})
      }
      if(!email){
        return res.status(400).json({ msg:"Necessário preenchimento do email"})
      }
      if(!password){
        return res.status(400).json({ msg:"Necessário preenchimento do senha"})
      }
      if(!confirmPassword){
        return res.status(400).json({ msg:"Necessário preenchimento da Confirmação de senha"})
      }

      //user
      const userCreate = new User({
        name,
        email,
        password: passwordHash
      })

      await userCreate.save()
      return res.status(200).json({ msg:"Usuário criado com sucesso!"})
    } catch (error) {
      console.log(error)
    }

  }
  async LoginStore (req, res) {
    const secret = process.env.SECRET
    const { email, password } = req.body
    //User exists
    const userExist = await User.findOne({ email: email})
    if(!email){
      return res.status(401).json({ msg:"É necessário um email"})
    }
    //validações password
    const checkPassword = await bcrypt.compare(password, userExist.password)
    if(!checkPassword){
      return res.status(400).json({ msg:"Problemas com seu password"})
    }
    // validação token
    const token = jwt.sign(
      {
        id: userExist._id,
      }, secret
    )
    
    return res.status(200).json({ msg:"Logado!", token})
  }
}


module.exports = new UserController()
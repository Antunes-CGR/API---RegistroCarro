const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

//controllers
const LoginController = require("./controller/LoginController")
const CarroController = require('./controller/CarroController')

//middlewares
const {checkToken} = require("./midllwares/authentication")
const {loginValidator} = require("./midllwares/validationLogin")

//user login
app.post('/user/create', LoginController.store)
app.post('/user/login', loginValidator, checkToken, LoginController.LoginStore)

//rotas carro
app.post('/carro', checkToken, CarroController.store )
app.put('/carro/:id', checkToken, CarroController.update )
app.delete('/carro/:id', checkToken, CarroController.destroy )
app.get('/carro', CarroController.index)
app.get('/carro/:id', CarroController.show)

// connect DB
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

mongoose
  .connect(
    `mongodb+srv://${db_user}:${db_pass}@cluster0.zb1sdoe.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    //call nack que retorna sucesso ou falha
    app.listen(3000)
    console.log("Conectou ao Banco!")
  })
  .catch((err) => console.log(err))

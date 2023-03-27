const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

//controllers
const LoginController = require("./controller/LoginController")

//middlewares
const {checkToken} = require("./midllwares/authentication")

//user login
app.post('/user/create', LoginController.store)
app.post('/user/login', checkToken, LoginController.LoginStore)

//app.get('/user', CarroController.index)


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

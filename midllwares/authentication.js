const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(" ")[1]

if(!token){
  return res.status(401).json({ msg: "acesso negado!" })
}

try {
  const secret = process.env.SECRET
  jwt.verify = (secret, token)

  const { id } = jwt.decode(token)
  res.locals.user_id = id
  next()

} catch (error) {
  console.log(error)
}
}

module.exports = {checkToken, }
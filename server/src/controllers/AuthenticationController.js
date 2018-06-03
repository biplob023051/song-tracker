const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const ONE_WEEK = 60 * 60 * 24 * 7
function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {expiresIn: ONE_WEEK })
}
module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Email already exist'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Login information is incorrect'
        })
      }
      const isValidPassword = await user.comparePassword(password)
      if (!isValidPassword) {
        return res.status(403).send({
          error: 'Login information is incorrect'
        })
      }
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'A error occured trying to login'
      })
    }
  }
}

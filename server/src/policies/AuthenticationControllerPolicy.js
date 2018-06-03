const Joi = require('joi')
module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Valid email is required'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Password must followed the following rules
              <br>
              1. It must contain following characters: lowercase, uppercase, numeric
              <br>
              2. Min length 8 characters and max length 32 characters
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration data'
          })
      }
    } else {
      next()
    }
  }
}

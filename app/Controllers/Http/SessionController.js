'use strict'

const { error } = use('App/Helpers/ControllerHelpers');
const User = use('App/Models/User');
const Hash = use('Hash');

class SessionController {
  /**
   *
   * @param {object} ctx
   * @param {import('@adonisjs/auth/src/Schemes/Jwt')} ctx.auth
   * @param {import('@adonisjs/framework/src/Request')} ctx.request
   * @param {import('@adonisjs/framework/src/Response')} ctx.response
   */

  async create({ auth, request, response }){
    const { email, password } = request.only(['email', 'password']);

    try{
      const user = await User.findBy('email', email);

      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email);
        const token = await auth.generate(user);

        return response.json({user, token});
      } else {
        return response.status(400).json(error('Usuário ou senha inválidos.'))
      }
    }catch(err) {
      console.log(err)
      return response.status(err.status).json()
    }
  }
}

module.exports = SessionController

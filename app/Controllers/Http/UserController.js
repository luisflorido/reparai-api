'use strict'

const { message } = use('App/Helpers/ControllerHelpers');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env');
/** @type {typeof import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');
const CryptoJS = use('crypto-js');

class UserController {
  /**
   *
   * @param {object} ctx
   * @param {import('@adonisjs/auth/src/Schemes/Jwt')} ctx.auth
   * @param {import('@adonisjs/framework/src/Request')} ctx.request
   */

  async store({auth, request, response}) {
    const { ...rest } = request.only(['first_name', 'last_name', 'email', 'password']);

    try{
      const user = await User.create(rest);

      return message('Usuário criado com sucesso.', user);
    }catch(err){
      return response.status(err.status || 409).json();
    }
  }

  /**
   *
   * @param {object} ctx
   * @param {import('@adonisjs/auth/src/Schemes/Jwt')} ctx.auth
   * @param {import('@adonisjs/framework/src/Request')} ctx.request
   */

  async forgotPassword({request, response}) {
    const { email } = request.only(['email']);

    try {
      const user = await User.query()
        .where('email', email)
        .first();

      if (user) {
        const resetToken = CryptoJS.SHA256(email).toString(
          CryptoJS.enc.Hex
        );

        user.password_reset_token = resetToken;
        await user.save();

        await Mail.send('emails.forgot', {name: user.first_name, link: `${Env.get('APP_FRONT_URL')}/users/forgot-password/${resetToken}`}, (message) => {
          message
            .to(user.email)
            .from('luiisflorido@gmail.com')
            .subject('Recuperação de senha')
        })
        return response.status(200).json();
      } else {
        return response.status(404).json(message('Usuário não encontrado.'));
      }
    }catch(err){
      console.log(err)
      return response.status(err.status).json();
    }
  }

  async setPassword({ request, response }) {
    try{
      const { token, password } = request.only(['token', 'password']);

      const findTokenUser = await User.query()
        .where('password_reset_token', token)
        .firstOrFail();

      if (findTokenUser) {
        findTokenUser.password = password;
        findTokenUser.password_reset_token = null;
        await findTokenUser.save();
        return response.status(200).json();
      } else {
        return response.status(400).json(message('Token inválido!'));
      }
    }catch(err) {
      return response.status(err.status).json();
    }
  }
}

module.exports = UserController

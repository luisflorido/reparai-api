/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env');
const Role = use('Role');
const CryptoJS = use('crypto-js');

class UserController {
  /**
   *
   * @param {object} ctx
   * @param {import('@adonisjs/auth/src/Schemes/Jwt')} ctx.auth
   * @param {import('@adonisjs/framework/src/Request')} ctx.request
   */

  async store({ request, response }) {
    const { ...rest } = request.only([
      'first_name',
      'last_name',
      'email',
      'password',
    ]);

    try {
      const user = await User.create(rest);
      const role = await Role.findBy('slug', 'user');
      if (role) {
        user.roles().attach(role.id);
      }
      return response.status(200).json(user);
    } catch (err) {
      console.log(err);
      return response.status(err.status || 409).json();
    }
  }

  /**
   *
   * @param {object} ctx
   * @param {import('@adonisjs/auth/src/Schemes/Jwt')} ctx.auth
   * @param {import('@adonisjs/framework/src/Request')} ctx.request
   */

  async forgotPassword({ request, response }) {
    const { email } = request.only(['email']);

    try {
      const user = await User.query()
        .where('email', email)
        .first();

      if (user) {
        const resetToken = CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);

        user.password_reset_token = resetToken;
        await user.save();

        await Mail.send(
          'emails.forgot',
          {
            name: user.first_name,
            resetToken,
          },
          message => {
            message
              .to(user.email)
              .from('luiisflorido@gmail.com')
              .subject('Recuperação de senha');
          }
        );
        return response.status(200).json();
      }
      return response.status(404).json();
    } catch (err) {
      return response.status(err.status).json();
    }
  }

  async setPassword({ request, response }) {
    try {
      const { token, password } = request.only(['token', 'password']);

      const findTokenUser = await User.query()
        .where('password_reset_token', token)
        .firstOrFail();

      if (findTokenUser) {
        findTokenUser.password = password;
        findTokenUser.password_reset_token = null;
        await findTokenUser.save();
        return response.status(200).json();
      }
      return response.status(400).json();
    } catch (err) {
      return response.status(err.status).json();
    }
  }
}

module.exports = UserController;

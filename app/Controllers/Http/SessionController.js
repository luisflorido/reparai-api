
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class SessionController {
  /**
   *
   * @param {object} ctx
   * @param {import('@adonisjs/auth/src/Schemes/Jwt')} ctx.auth
   * @param {import('@adonisjs/framework/src/Request')} ctx.request
   * @param {import('@adonisjs/framework/src/Response')} ctx.response
   */

  async create({ auth, request, response }) {
    const { email, password } = request.only(['email', 'password']);

    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email);
        const token = await auth.generate(user);
        const roles = await user.getRoles();

        return response.status(200).json({ user, roles, token });
      }
      return response.status(400).json();
    } catch (err) {
      return response.status(404).json();
    }
  }
}

module.exports = SessionController;

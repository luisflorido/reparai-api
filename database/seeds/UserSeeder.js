'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const User = use('App/Models/User')
const Hash = use('Hash')
const Role = use('Role');

class UserSeeder {
  async run () {
    const roleAdmin = new Role()
    roleAdmin.name = 'Administrator'
    roleAdmin.slug = 'adm'
    await roleAdmin.save()

    const userModerator = new Role()
    userModerator.name = 'User'
    userModerator.slug = 'user'
    await userModerator.save()

    const user = await User.create({
      first_name: 'Luis',
      last_name: 'Guilherme',
      email: 'luiisflorido@gmail.com',
      password: '123456ab'
    });

    user.roles().attach([roleAdmin.id]);
  }
}

module.exports = UserSeeder

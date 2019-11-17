
/*
|--------------------------------------------------------------------------
| LocationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Location = use('App/Models/Location');

class LocationSeeder {
  async run() {
    await Location.create({
      code: 'bloco',
      name: 'Bloco 1',
    });
    await Location.create({
      code: 'bloco2',
      name: 'Bloco 2',
    });
  }
}

module.exports = LocationSeeder;

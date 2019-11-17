
/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Category = use('App/Models/Category');

class CategorySeeder {
  async run() {
    await Category.create({
      code: 'cat',
      name: 'Categoria 1',
    });
    await Category.create({
      code: 'cat2',
      name: 'Categoria 2',
    });
  }
}

module.exports = CategorySeeder;

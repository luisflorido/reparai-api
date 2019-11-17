
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  static get incrementing() {
    return false;
  }

  static get primaryKey() {
    return 'code';
  }

  device() {
    return this.belongsToMany('App/Models/Device');
  }
}

module.exports = Category;

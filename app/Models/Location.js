
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Location extends Model {
  static get incrementing() {
    return false;
  }

  static get primaryKey() {
    return 'code';
  }
}

module.exports = Location;

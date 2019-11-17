
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with locations
 */

const Location = use('App/Models/Location');

class LocationController {
  /**
   * Show a list of all locations.
   * GET locations
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    try {
      const locations = await Location.all();
      if (locations) {
        return response.status(200).json(locations);
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Create/save a new location.
   * POST locations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { ...rest } = request.only(['code', 'name']);
      const location = await Location.create(rest);
      if (location) {
        return response.status(200).json(location);
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Display a single location.
   * GET locations/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({
    params, response,
  }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const location = await Location.find(id);
        if (location) {
          return response.status(200).json(location);
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  /**
   * Update location details.
   * PUT or PATCH locations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const { name } = request.only(['name']);
        const location = await Location.find(id);
        if (location) {
          location.merge({ name });
          await location.save();
          return response.status(200).json(location);
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  /**
   * Delete a location with id.
   * DELETE locations/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const location = await Location.find(id);
        if (location) {
          await location.delete();
          return response.status(200).json();
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }
}

module.exports = LocationController;

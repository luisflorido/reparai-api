/* eslint-disable camelcase */

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with devices
 */

const Device = use('App/Models/Device');
const Category = use('App/Models/Category');
const Location = use('App/Models/Location');

class DeviceController {
  /**
   * Show a list of all devices.
   * GET devices
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    try {
      const devices = await Device.query()
        .with('categories')
        .with('locations')
        .fetch();
      if (devices) {
        return response.status(200).json(devices);
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Create/save a new device.
   * POST devices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { locations_code, categories_code, ...rest } = request.only([
        'mac',
        'name',
        'locations_code',
        'categories_code',
      ]);
      const device = await Device.create(rest);
      if (device) {
        await device.locations().attach(locations_code);
        await device.categories().attach(categories_code);
        return response.status(200).json(device);
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Display a single device.
   * GET devices/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const device = await Device.query()
          .with('categories')
          .with('locations')
          .where('id', id)
          .first();
        if (device) {
          return response.status(200).json(device);
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  /**
   * Update device details.
   * PUT or PATCH devices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const { mac, name } = request.only(['mac', 'name']);
        const device = await Device.find(id);
        if (device) {
          device.merge({ mac, name });
          await device.save();
          return response.status(200).json(device);
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  /**
   * Delete a device with id.
   * DELETE devices/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const device = await Device.find(id);
        if (device) {
          await device.delete();
          return response.status(200).json();
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  async putCategories({ params, request, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const { category } = request.only(['category']);
        if (category) {
          const device = await Device.find(id);
          if (device) {
            const categories = await Promise.all(
              category.map(async e => {
                const cat = await Category.find(e);
                if (cat) {
                  return e;
                }
                return null;
              })
            );
            await device.categories().sync(categories.filter(Boolean));
            return response.status(200).json();
          }
          return response.status(404).json();
        }
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  async putLocations({ params, request, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const { location } = request.only(['location']);
        if (location) {
          const device = await Device.find(id);
          if (device) {
            const locations = await Promise.all(
              location.map(async e => {
                const loc = await Location.find(e);
                if (loc) {
                  return e;
                }
                return null;
              })
            );
            await device.locations().sync(locations.filter(Boolean));
            return response.status(200).json();
          }
          return response.status(404).json();
        }
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }
}

module.exports = DeviceController;

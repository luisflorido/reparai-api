/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/lucid/src/Lucid/Model')} Model */

/**
 * Resourceful controller for interacting with services
 */

/** @type {Model} */
const Service = use('App/Models/Service');
/** @type {Model} */
const Message = use('App/Models/Message');

class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ auth, response }) {
    try {
      if (auth && auth.user) {
        const roles = await auth.user.getRoles();
        if (roles.find(e => e === 'adm')) {
          const services = await Service.query()
            .with('device', builder =>
              builder.with('categories').with('locations')
            )
            .with('user')
            .with('messages', builder => builder.with('user'))
            .withTrashed()
            .fetch();
          if (services) {
            return response.status(200).json(services);
          }
        } else {
          const services = await Service.query()
            .with('device', builder =>
              builder.with('categories').with('locations')
            )
            .with('user')
            .with('messages', builder => builder.with('user'))
            .where('user_id', auth.user.id)
            .withTrashed()
            .fetch();
          if (services) {
            return response.status(200).json(services);
          }
        }
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Show a list of all services deleteds.
   * GET services
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async trashed({ response }) {
    try {
      const services = await Service.query()
        .with('device', builder => builder.with('categories').with('locations'))
        .with('user')
        .with('messages', builder => builder.with('user'))
        .onlyTrashed()
        .fetch();
      if (services) {
        return response.status(200).json(services);
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { ...rest } = request.only(['device_id', 'description']);
    const { user } = auth;
    if (user) {
      try {
        const service = await Service.create({ ...rest, user_id: user.id });
        if (service) {
          return response.status(200).json(service);
        }
        return response.status(500).json();
      } catch (err) {
        return response.status(err.status || 500).json();
      }
    } else {
      return response.status(401).json();
    }
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    if (params && params.id) {
      const { id } = params;
      try {
        const service = await Service.query()
          .with('device', builder =>
            builder.with('categories').with('locations')
          )
          .with('user')
          .with('messages', builder => builder.with('user'))
          .where('id', id)
          .first();
        if (service) {
          return response.status(200).json({ service });
        }
        return response.status(404).json();
      } catch (err) {
        return response.status(err.status || 500).json();
      }
    }
    return response.status(400).json();
  }

  /**
   * Archive a service with id.
   * POST services/archive/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async archive({ params, response }) {
    if (params && params.id) {
      const { id } = params;
      try {
        const service = await Service.query()
          .where('id', id)
          .withTrashed()
          .first();
        if (service) {
          if (service.deleted_at) {
            await service.restore();
          } else {
            await service.delete();
          }
          return response.status(200).json();
        }
        return response.status(404).json();
      } catch (err) {
        console.log(err);
        return response.status(err.status || 500).json();
      }
    }
    return response.status(400).json();
  }

  /**
   * Create message on service.
   * POST services/:id/message
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async createMessage({ auth, params, request, response }) {
    if (params && params.id) {
      try {
        const { id } = params;
        const { user } = auth;
        const { text } = request.only(['text']);
        if (user && text) {
          const service = await Service.query()
            .where('id', id)
            .first();
          if (service) {
            await Message.create({ service_id: id, user_id: user.id, text });
            return response.status(200).json();
          }
          return response.status(404).json();
        }
      } catch (err) {
        return response.status(err.status || 500).json();
      }
    }
    return response.status(400).json();
  }
}

module.exports = ServiceController;

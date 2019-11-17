
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */

const Category = use('App/Models/Category');

class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    try {
      const categories = await Category.all();
      if (categories) {
        return response.status(200).json(categories);
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { ...rest } = request.only(['code', 'name']);
      const category = await Category.create(rest);
      if (category) {
        return response.status(200).json(category);
      }
      return response.status(500).json();
    } catch (err) {
      return response.status(err.status || 500).json();
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
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
        const category = await Category.find(id);
        if (category) {
          return response.status(200).json(category);
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
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
        const category = await Category.find(id);
        if (category) {
          category.merge({ name });
          await category.save();
          return response.status(200).json(category);
        }
        return response.status(404).json();
      }
    } catch (err) {
      return response.status(err.status || 500).json();
    }
    return response.status(204).json();
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      if (params && params.id) {
        const { id } = params;
        const category = await Category.find(id);
        if (category) {
          await category.delete();
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

module.exports = CategoryController;

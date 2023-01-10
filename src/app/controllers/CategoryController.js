const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  // List all items
  async index(request, response) {
    const { orderBy } = request.query;

    const categories = await CategoryRepository.findAll(orderBy);

    response.status(200).json(categories);
  }

  // Get specific item
  async show(request, response) {
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  // Create item
  async store(request, response) {
    const { name } = request.body;

    const category = await CategoryRepository.create({ name });

    response.json(category);
  }

  // Edit item
  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const category = await CategoryRepository.edit(id, { name });

    response.json(category);
  }

  // Delete item
  async delete(request, response) {
    const { id } = request.params;

    await CategoryRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();

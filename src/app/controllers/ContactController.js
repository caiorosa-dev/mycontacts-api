const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // List all items
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactRepository.findAll(orderBy);

    response.status(200).json(contacts);
  }

  // Get specific item
  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  // Create item
  async store(request, response) {
    const {
      name, email, phone,
    } = request.body;

    const category_id = request.body.category_id && request.body.category_id !== '' ? request.body.category_id : null;

    const contactExists = await ContactRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // Edit item
  async update(request, response) {
    const { id } = request.params;

    const {
      name, email, phone,
    } = request.body;

    const category_id = request.body.category_id && request.body.category_id !== '' ? request.body.category_id : null;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.edit(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // Delete item
  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();

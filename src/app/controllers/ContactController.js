const ContactRepository = require('../repositories/ContactRepository');
const isValidUUID = require('../utils/isValidUUID');
const valueOrNull = require('../utils/valueOrNull');

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

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Invalid contact ID' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  // Create item
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id && !isValidUUID(category_id)) {
      return response.status(404).json({ error: 'Invalid category ID' });
    }

    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);
      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.create({
      name, email: email || null, phone, category_id: category_id || null,
    });

    response.json(contact);
  }

  // Edit item
  async update(request, response) {
    const { id } = request.params;

    const {
      name, email, phone,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Invalid contact ID' });
    }

    const category_id = valueOrNull(request.body.category_id);
    if (category_id && !isValidUUID(category_id)) {
      return response.status(404).json({ error: 'Invalid category ID' });
    }

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const contactByEmail = await ContactRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.edit(id, {
      name, email: email || null, phone, category_id: category_id || null,
    });

    response.json(contact);
  }

  // Delete item
  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Invalid contact ID' });
    }

    await ContactRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();

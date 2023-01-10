const db = require('../../database');
const AbstractRepository = require('./AbstractRepository');

const tableName = 'contacts';

class ContactRepository extends AbstractRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
    SELECT contacts.*, categories.name as category_name
    FROM ${tableName}
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await this.db.query(
      `SELECT contacts.*, categories.name as category_name
      FROM ${tableName}
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1`,
      [id],
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM ${tableName} WHERE email = $1`, [email]);

    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(
      `INSERT INTO ${tableName}(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *`,
      [name, email, phone, category_id],
    );

    return row;
  }

  async edit(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(
      `UPDATE ${tableName}
        SET name = $1, email = $2, phone = $3, category_id = $4
        WHERE id = $5
        RETURNING *`,
      [name, email, phone, category_id, id],
    );

    return row;
  }
}

module.exports = new ContactRepository(tableName, db);

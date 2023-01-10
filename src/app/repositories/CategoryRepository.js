const db = require('../../database');
const AbstractRepository = require('./AbstractRepository');

const tableName = 'categories';

class CategoryRepository extends AbstractRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`SELECT * FROM ${tableName} ORDER BY name ${direction}`);

    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(
      `INSERT INTO ${tableName}(name)
      VALUES($1)
      RETURNING *`,
      [name],
    );

    return row;
  }

  async edit(id, { name }) {
    const [row] = await db.query(
      `UPDATE ${tableName}
        SET name = $1
        WHERE id = $2
        RETURNING *`,
      [name, id],
    );

    return row;
  }
}

module.exports = new CategoryRepository(tableName, db);

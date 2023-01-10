module.exports = class AbstractRepository {
  tableName = '';

  db = null;

  constructor(tableName, db) {
    this.tableName = tableName;
    this.db = db;
  }

  async delete(id) {
    const row = await this.db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);

    return row;
  }

  async findById(id) {
    const [row] = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);

    return row;
  }
};

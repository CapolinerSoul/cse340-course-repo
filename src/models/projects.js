const pool = require("../database/");

async function getAllProjects() {
  return await pool.query(`
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date,
      o.name AS organization_name
    FROM service_project AS sp
    JOIN organization AS o
      ON sp.organization_id = o.organization_id
    ORDER BY sp.date;
  `);
}

module.exports = {
  getAllProjects,
};
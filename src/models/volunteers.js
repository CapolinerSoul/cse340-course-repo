import db from './db.js';

// Add a volunteer to a project
const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
    `;

    await db.query(query, [userId, projectId]);
};

// Remove a volunteer from a project
const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2
    `;

    await db.query(query, [userId, projectId]);
};

// Check whether a user volunteers for a project
const isVolunteer = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

// Retrieve projects a user volunteers for
const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            o.name AS organization_name
        FROM project_volunteer pv
        JOIN service_project sp
            ON pv.project_id = sp.project_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY sp.date ASC
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    isVolunteer,
    getVolunteerProjects
};
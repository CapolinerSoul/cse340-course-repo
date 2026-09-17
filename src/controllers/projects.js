import { getAllProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    try {
        const NUMBER_OF_UPCOMING_PROJECTS = 5;
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        const title = 'Upcoming Service Projects';

        res.render('projects', { title, projects });
    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).send('Server error');
    }
}

const showProjectDetailsPage = async (req, res)=>{
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const title = 'Project Details';

    res.render('project', {title, projectDetails});
}

export { showProjectsPage, showProjectDetailsPage};
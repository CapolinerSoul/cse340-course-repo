import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteers.js';

const processVolunteerSignup = async (req, res) => {
    const projectId = Number(req.params.projectId);
    const userId = req.session.user.user_id;

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        return res.status(400).send('Invalid project ID');
    }

    try {
        await addVolunteer(userId, projectId);

        req.flash('success', 'You are now volunteering for this project!');
        return res.redirect(`/project/${projectId}`);

    } catch (error) {
        console.error('Error adding volunteer:', error);

        req.flash('error', 'Unable to sign up for this project.');
        return res.redirect(`/project/${projectId}`);
    }
};

const processVolunteerRemoval = async (req, res) => {
    const projectId = Number(req.params.projectId);
    const userId = req.session.user.user_id;

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        return res.status(400).send('Invalid project ID');
    }

    try {
        await removeVolunteer(userId, projectId);

        req.flash('success', 'You have been removed from this project.');

        return res.redirect('/dashboard');

    } catch (error) {
        console.error('Error removing volunteer:', error);

        req.flash('error', 'Unable to remove your volunteer signup.');
        return res.redirect('/dashboard');
    }
};

export {
    processVolunteerSignup,
    processVolunteerRemoval
};
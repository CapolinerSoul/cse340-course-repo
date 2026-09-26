import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';
import { body, validationResult } from 'express-validator';
import { getProjectDetails } from '../models/projects.js';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category name must be between 2 and 50 characters.')
];

const showCategoriesPage = async (req, res) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Project Categories';

        res.render('categories', { title, categories });
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).send('Server error');
    }
}

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const categoryDetails = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', {
        title,
        categoryDetails,
        projects
    });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showCreateCategoryForm = async (req, res) => {
    const title = 'Create Category';

    res.render('new-category', {
        title,
        errors: [],
        formData: {}
    });
};

const processCreateCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    const { name } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render('new-category', {
            title: 'Create Category',
            errors: errors.array(),
            formData: { name }
        });
    }

    const categoryId = await createCategory(name);

    req.flash('success', 'Category created successfully.');
    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const categoryDetails = await getCategoryById(categoryId);

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        categoryDetails,
        errors: []
    });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const errors = validationResult(req);
    const { name } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render('edit-category', {
            title: 'Edit Category',
            categoryDetails: {
                category_id: categoryId,
                name
            },
            errors: errors.array()
        });
    }

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully.');
    res.redirect(`/category/${categoryId}`);
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showCreateCategoryForm,
    processCreateCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};
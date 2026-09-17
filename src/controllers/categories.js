import { getAllCategories } from '../models/categories.js';
import { getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/categories.js';

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

export {
    showCategoriesPage,
    showCategoryDetailsPage
}
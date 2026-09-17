import { getAllCategories } from '../models/categories.js';

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

export { showCategoriesPage }
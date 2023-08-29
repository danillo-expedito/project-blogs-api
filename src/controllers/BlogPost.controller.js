const { BlogPostService, CategoryService } = require('../services');
const { validatePostFields } = require('../utils/validateCredentials');

const createBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { userId } = req.user;

    const { error } = validatePostFields(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { categoryError } = await CategoryService.checkCategories(categoryIds);
    if (categoryError) {
        return res.status(400).json({ message: categoryError });
    } 

    try {
        const newBlogPost = await BlogPostService.create(title, content, categoryIds, userId);
        return res.status(201).json(newBlogPost);
    } catch (e) {
        return res.status(500).json({ message: 'Erro interno', error: e });
    }
};

const getAllBlogPosts = async (_req, res) => {
    try {
        const blogPosts = await BlogPostService.getAll();
        return res.status(200).json(blogPosts);
    } catch (e) {
        return res.status(500).json({ message: 'Erro interno', error: e });
    }
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
};
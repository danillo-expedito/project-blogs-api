const { BlogPostService, CategoryService } = require('../services');
const { validatePostFields, validatePutFields } = require('../utils/validateCredentials');

const internalError = 'Erro interno';

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
        return res.status(500).json({ message: internalError, error: e });
    }
};

const getAllBlogPosts = async (_req, res) => {
    try {
        const blogPosts = await BlogPostService.getAll();
        return res.status(200).json(blogPosts);
    } catch (e) {
        return res.status(500).json({ message: internalError, error: e });
    }
};

const getBlogPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const blogPost = await BlogPostService.getById(id);

        if (!blogPost) {
            return res.status(404).json({ message: 'Post does not exist' });
        }

        return res.status(200).json(blogPost);
    } catch (e) {
        return res.status(500).json({ message: internalError, error: e });
    }
};

const updateBlogPost = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req.user;
    const { id } = req.params;

    const blogPost = await BlogPostService.getById(id);
    if (blogPost.userId !== userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const { error } = validatePutFields(req.body);
    if (error) return res.status(400).json({ message: error.message });

    try {
        const updatedBlogPost = await BlogPostService.update(id, title, content);
        return res.status(200).json(updatedBlogPost);
    } catch (e) {
        return res.status(500).json({ message: internalError, error: e });
    }
};

const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    const postExists = await BlogPostService.getById(id);
    if (!postExists) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    if (postExists.userId !== userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    try {
        await BlogPostService.exclude(id);
        return res.status(204).json();
    } catch (e) {
        return res.status(500).json({ message: internalError, error: e });
    }
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
};
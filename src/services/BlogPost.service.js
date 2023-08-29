const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');
const cleanBlogPostFields = require('../utils/cleanBlogPostFields');

const create = async (title, content, categoryIds, userId) => {
    const result = await sequelize.transaction(async (t) => {
        const newBlogPost = await BlogPost.create({ 
            title, content, userId, published: Date.now(), updated: Date.now(),
        }, { transaction: t });

        const bulkCreatePromises = categoryIds.map((categoryId) => 
            PostCategory.bulkCreate([{ postId: newBlogPost.id, categoryId }], { transaction: t }));
   
        await Promise.all(bulkCreatePromises);

        return newBlogPost.get();
    });

    return result;
};

const getAll = async () => {
    const blogPosts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });

    const processedBlogPosts = cleanBlogPostFields(blogPosts);

    return processedBlogPosts;
};

const getById = async (id) => {
    const blogPost = await BlogPost.findByPk(id, {
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });

    if (!blogPost) return null;
    
    const [processedBlogPost] = cleanBlogPostFields([blogPost]);
    return processedBlogPost;
};

const update = async (id, title, content) => {
    const updateBlogPost = await BlogPost.update(
    {
        title,
        content,
        updated: Date.now(),
    }, 
    { where: { id } },
    );
    
    if (!updateBlogPost) return null;

    const updatedBlogPost = await getById(id);
    return updatedBlogPost;
};

const exclude = async (id) => {
    await BlogPost.destroy({ where: { id } });
    // await PostCategory.destroy({ where: { postId: id } });
};

const search = async (searchTerm) => {
    const blogPosts = await BlogPost.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${searchTerm}%` } },
                { content: { [Op.like]: `%${searchTerm}%` } },
            ],
        },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });

    if (!blogPosts) return [];

    const processedBlogPosts = cleanBlogPostFields(blogPosts);
    return processedBlogPosts;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
    search,
};
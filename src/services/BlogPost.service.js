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

module.exports = {
    create,
    getAll,
};
const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = {
    create,
};
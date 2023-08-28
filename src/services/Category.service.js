const { Op } = require('sequelize');
const { Category } = require('../models');

const create = async (name) => {
    const newCategory = await Category.create({ name });

    return newCategory;
};

const getAll = async () => {
    const categories = await Category.findAll();

    return categories;
};

const getById = async (id) => {
    const category = await Category.findByPk(id);

    return category;
};

const checkCategories = async (categoryIds) => {
    const existentCategoryies = await Category.findAll({ 
        where: { 
            id: { [Op.in]: categoryIds },
            },
        });
    
    const existingCategoryIds = existentCategoryies.map((category) => category.id);
    const nonExistentCategory = categoryIds
        .filter((categoryId) => !existingCategoryIds.includes(categoryId));

    if (nonExistentCategory.length > 0) {
        return { categoryError: 'one or more "categoryIds" not found' };
    }

    return { categoryError: null };
};

module.exports = {
    create,
    getAll,
    getById,
    checkCategories,
};
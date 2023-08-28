const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });
   
    try {
        const newCategory = await CategoryService.create(name);
    
        return res.status(201).json(newCategory);
    } catch (e) {
        return res.status(500).json({ message: 'Erro interno', error: e });
    }
};

const getAllCategories = async (_req, res) => {
    const categories = await CategoryService.getAll();

    return res.status(200).json(categories);
};

module.exports = {
    createCategory,
    getAllCategories,
};
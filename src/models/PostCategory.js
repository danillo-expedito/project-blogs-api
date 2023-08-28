module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                model: 'BlogPost',
                key: 'id',
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                model: 'Category',
                key: 'id',
            }
        },
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
    }
    );

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blogPosts',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });
    }

    return PostCategory;
}
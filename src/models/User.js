module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        displayName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'users',
    }
    );

    // User.associate = (models) => {
    //     User.hasMany(models.BlogPost, {
    //         foreignKey: 'userId',
    //         as: 'blogPosts',
    //     });
    // }

    return User;
}
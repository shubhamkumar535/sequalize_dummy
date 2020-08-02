module.exports = (sequelize, type) => {
    return sequelize.define('blog', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: type.STRING
    },
        {
            // tableName: 'blog',
            classMethods: {
                associate: function (models) {
                    blog.belongsTo(models.User, { foreignKey: 'id_user' });
                }
            }
        },
        )
}
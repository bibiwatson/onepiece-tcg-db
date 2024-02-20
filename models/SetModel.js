const Sequelize = require('sequelize');
const sequelize = require('../db.js')

class CardSet extends Sequelize.Model {
    static associate(models) {
        // define association here
    }
}
CardSet.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    key: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    serie: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
},
    {
        // options
        sequelize,
        modelName: 'CardSet',
        tableName: 'card_set',
        createdAt: 'date_created',
        timestamps: false,
    });

module.exports = CardSet;
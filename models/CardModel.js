const Sequelize = require('sequelize');
const sequelize = require('../db.js')

class Card extends Sequelize.Model {
    static associate(models) { }
}

Card.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    set_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    life: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    cost: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    attribute: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    power: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    counter: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    effect: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    rarity: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    card_type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    set_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    attr_img: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    original_set_key: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    card_img: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    trigger: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    max : {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        // options
        sequelize,
        modelName: 'Card',
        tableName: 'card',
        createdAt: 'date_created',
        timestamps: false,
    });

module.exports = Card;
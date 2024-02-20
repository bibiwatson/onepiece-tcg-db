const Sequelize = require('sequelize');
const CardModel = require('../models/CardModel');

class CardController {
    getAll(query){
        try {

            const params = {}

            if(query != undefined && query != null){
                if(query.queryString != undefined && query.queryString != ''){

                    params[Sequelize.Op.and] = []

                    params[Sequelize.Op.and].push({
                        [Sequelize.Op.or]: {
                            name: { [Sequelize.Op.like]: `%${query.queryString}%` },
                            effect: { [Sequelize.Op.like]: `%${query.queryString}%` },
                            trigger: { [Sequelize.Op.like]: `%${query.queryString}%` }
                        }
                    })
                }

                if(query.colors != undefined && query.colors != ''){
                    const arr_colors = query.colors.split(',');

                    let arr = []

                    arr_colors.forEach(color => {
                        arr.push({
                            color: {
                                [Sequelize.Op.like]: '%' + color.toLowerCase() + '%'
                            }
                        });
                    });


                    if(!params[Sequelize.Op.and]){
                        params[Sequelize.Op.and] = []
                    }

                    params[Sequelize.Op.and].push({
                        [Sequelize.Op.or]: arr
                    })
                }

                if(query.set_id != undefined && query.set_id > 0){
                    if(!params[Sequelize.Op.and]){
                        params[Sequelize.Op.and] = []
                    }

                    params[Sequelize.Op.and].push({
                        set_id: query.set_id
                    });
                }

                if(query.card_types != undefined && query.card_types != ''){
                    const arr_card_types = query.card_types.split(',');

                    let arr = []

                    arr_card_types.forEach(card_type => {
                        arr.push({
                            card_type: {
                                [Sequelize.Op.like]: '%' + card_type.toLowerCase() + '%'
                            }
                        });
                    });


                    if(!params[Sequelize.Op.and]){
                        params[Sequelize.Op.and] = []
                    }

                    params[Sequelize.Op.and].push({
                        [Sequelize.Op.or]: arr
                    })
                }

                if(query.attrs != undefined && query.attrs != ''){
                    const arr_attrs = query.attrs.split(',');

                    let arr = []

                    arr_attrs.forEach(attribute => {
                        arr.push({
                            attribute: {
                                [Sequelize.Op.like]: '%' + attribute.toLowerCase() + '%'
                            }
                        });
                    });


                    if(!params[Sequelize.Op.and]){
                        params[Sequelize.Op.and] = []
                    }

                    params[Sequelize.Op.and].push({
                        [Sequelize.Op.or]: arr
                    })
                }

                if(query.types != undefined && query.types != ''){
                    const arr_types = query.types.split(',');

                    let arr = [{
                        [Sequelize.Op.or]: {
                            type : {[Sequelize.Op.in]: query.types.split(',')},
                        }
                    }]

                    let arr2 = []

                    arr_types.forEach(type => {
                        arr2.push({
                            [Sequelize.Op.or] : [{
                                type : {
                                    [Sequelize.Op.like] : type + '/%'
                                }
                            },{
                                type : {
                                    [Sequelize.Op.like] : '%/' + type
                                }
                            },{
                                type : {
                                    [Sequelize.Op.like] : '%/' + type + '/%'
                                }
                            }]
                        });
                    });

                    arr.push({
                        [Sequelize.Op.or] : arr2
                    });

                    if(!params[Sequelize.Op.and]){
                        params[Sequelize.Op.and] = []
                    }

                    params[Sequelize.Op.and].push({
                        [Sequelize.Op.or]: arr
                    })
                }

                if(query.counters != undefined && query.counters != ''){
                    let arr = [{
                        [Sequelize.Op.or]: {
                            counter : {[Sequelize.Op.in]: query.counters.split(',')},
                        }
                    }]

                    if(!params[Sequelize.Op.and]){
                        params[Sequelize.Op.and] = []
                    }

                    params[Sequelize.Op.and].push({
                        [Sequelize.Op.or]: arr
                    })
                }

                if(query.cost != undefined && query.cost != ''){
                    if(!params[Sequelize.Op.and]){
                        params[Sequelize.Op.and] = []
                    }

                    let arr = [{
                        [Sequelize.Op.or]: {
                            cost : query.cost,
                        }
                    }]

                    const cost = query.cost;

                    if(cost == 0){
                        arr.push({
                            [Sequelize.Op.or]: {
                                cost : '-',
                            }
                        })
                    }

                    params[Sequelize.Op.and].push({
                        [Sequelize.Op.or]: arr
                    })
                }

            }

            const dbCards = [];

            return CardModel.findAll({
                where: params,
                order: ['original_set_key', 'number', 'card_img']
            })
            .then(function (cards){
                cards.forEach(function(card){
                    dbCards.push(card);
                });
                return dbCards;
            })
            .catch(err => console.log(err));
        }
        catch (err){
            console.log(err);
            return [];
        }
    }

    getCardTypes(){
        try{
            return CardModel.findAll({
                attributes : ['type']
            })
            .then(function (types){
                const arrTypes = []

                types.forEach(function(card){
                    card.type.split('/').forEach(singleType => {
                        if(arrTypes.indexOf(singleType) == -1){
                            arrTypes.push(singleType);
                        }
                    });
                });

                return arrTypes.sort();
            })
            .catch(err => console.log(err));
        }
        catch(err){
            console.log(err);
            return [];
        }
    }
}

module.exports = CardController;
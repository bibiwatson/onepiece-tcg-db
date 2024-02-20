const SetModel = require('../models/SetModel');

class SetController {
    getAll(){
        try{
            const dbSets = [];

            return SetModel.findAll()
                .then(function(sets){
                    sets.forEach(function(set){
                        dbSets.push(set);
                    });
                    return dbSets;
                })
                .catch(err => {
                    console.log(err);
                    return []
                });
        }
        catch(err){
            console.log(err);
            return [];
        }
    }
}

module.exports = SetController;
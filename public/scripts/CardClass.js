class Card{

    getId(){
        return this.id;
    }

    getSet_id(){
        return this.set_id;
    }

    getName(){
        return this.name;
    }

    getLife(){
        return this.life;
    }

    getCost(){
        return this.cost;
    }

    getAttribute(){
        return this.attribute;
    }

    getPower(){
        return this.power;
    }

    getCounter(){
        return this.counter;
    }

    getColor(){
        return this.color;
    }

    getType(){
        return this.type;
    }

    getEffect(){
        return this.effect;
    }

    getNumber(){
        return this.number;
    }

    getRarity(){
        return this.rarity;
    }

    getCard_type(){
        return this.card_type;
    }

    getSet_name(){
        return this.set_name;
    }

    getAttr_img(){
        return this.attr_img;
    }

    getOriginal_set_key(){
        return this.original_set_key;
    }

    getCard_img(){
        return this.card_img;
    }

    getTrigger(){
        return this.trigger;
    }

    getMax(){
        return this.max;
    }

    isLeader(){
        return this.card_type == 'LEADER';
    }

    constructor(data){
        this.id                 = data.id || 0;
        this.attr_img           = data.attr_img || '';
        this.attribute          = data.attribute || '';
        this.card_img           = data.card_img || '';
        this.card_type          = data.card_type || '';
        this.color              = data.color || '';
        this.cost               = data.cost || '';
        this.counter            = data.counter || '';
        this.effect             = data.effect || '';
        this.life               = data.life || '';
        this.name               = data.name || '';
        this.number             = data.number || 0;
        this.original_set_key   = data.original_set_key || '';
        this.power              = data.power || 0;
        this.rarity             = data.rarity || '';
        this.set_id             = data.set_id || 0;
        this.set_name           = data.set_name || '';
        this.trigger            = data.trigger || '';
        this.type               = data.type || '';
        this.max                = data.max || 0;
    }
}
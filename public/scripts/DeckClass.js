class Deck{
    
    hasLeader(){
        return this.leader != null && this.leader.constructor.name === 'Card';
    }

    getLeader(){
        return this.leader;
    }

    matchDeckColor(){
        const notMatch = this.cards.filter((el, index) => {
            let matchcolor = false; 
    
            el.color.split('/').forEach(color => {
                if(this.colors.indexOf(color) >= 0){
                    matchcolor = true;
                }
            });
        
            return !matchcolor;
        });

        if(notMatch.length == 0){
            return;
        }

        notMatch.forEach((el, index) => {
            this.removeCard(el)
        });
    }

    allowedColor(card){
        const cardColors = card.getColor().split('/');

        let found = false;

        if(!this.hasColor()){

            cardColors.forEach(element => {
                this.colors.push(element);
            });

            return true;
        }

        cardColors.forEach(element => {
            if(this.colors.indexOf(element) >= 0){
                found = true;
            }
        });

        return found;
    }

    canAddCard(card){
        if(!this.allowedColor(card)){
            return false;
        }

        if(card.isLeader() && this.leader == null){
            return true;
        }

        if(card.isLeader() && this.leader != null){
            return false;
        }

        if(this.cards.length == 0){
            return true;
        }        

        const deckCard = this.cards.find((el) => card.getOriginal_set_key() == el.getOriginal_set_key() && card.getNumber() == el.getNumber());

        if(deckCard == null){
            return true;
        }

        if(deckCard.getDeckCounter() < deckCard.getMax()){
            return true;
        }

        return false;
    }

    addCard(card){

        if(this.getCardsLen() == 61){
            return false;
        }

        if(!this.canAddCard(card)){
            return false;
        }

        if(card.isLeader()){
            this.leader = new DeckCard(card);
            this.leader.addDeckCounter();

            const colors = this.leader.getColor().split('/');

            this.setColor(colors);

            return this.leader;
        }

        let deckCard = this.cards.find((el) => card.getOriginal_set_key() == el.getOriginal_set_key() && card.getNumber() == el.getNumber());
        
        if(deckCard == null || deckCard == undefined){
            deckCard = new DeckCard(card);
            
            Object.seal(deckCard);
            
            this.cards.push(deckCard);
        }

        deckCard.addDeckCounter();

        return deckCard;
    }

    getCards(){
        return this.cards;
    }

    getCardsLen(){
        let len = this.cards.reduce((acc, el) =>  parseInt(acc) + parseInt(el.getDeckCounter()), 0);

        if(this.leader != null){
            len++;
        }

        len += 10;

        return len;
    }

    constructor(){
        this.leader = null;
        this.cards  = []
        this.colors  = [];
    }

    hasColor(){
        return this.colors.length > 0;
    }

    setColor(color){
        this.colors = color;
    }

    getColors(){
        return this.colors;
    }

    increaseCardAmount(card){
        const deckCard = this.cards.find((el) => card.getOriginal_set_key() == el.getOriginal_set_key() && card.getNumber() == el.getNumber());

        if(deckCard == null){
            return false;
        }

        if(deckCard.getDeckCounter() == card.getMax()){
            return false;
        }

        if(this.getCardsLen() == 61){
            return false;
        }

        deckCard.addDeckCounter();

        return deckCard;
    }

    decreaseCardAmount(card){
        const deckCard = this.cards.find((el) => card.getOriginal_set_key() == el.getOriginal_set_key() && card.getNumber() == el.getNumber());

        if(deckCard == null){
            return false;
        }
        
        deckCard.subDeckCounter();
        
        if(deckCard.getDeckCounter() == 0){
            this.removeCard(card);
            return deckCard;
        }

        return deckCard;
    }

    removeCard(card){

        if(card.isLeader() && card.getOriginal_set_key() == this.leader.getOriginal_set_key() && card.getNumber() == this.leader.getNumber()){
            this.leader = null;

            if(this.cards.length == 0){
                this.colors = [];
            }

            return card;
        }

        const cardIndex = this.cards.findIndex(el => el.getId() == card.getId());

        if(cardIndex < 0){
            return false;
        }

        this.cards.splice(cardIndex, 1);

        if(this.cards.length == 0 && !this.hasLeader()){
            this.colors = [];
        }

        return true;
    }

    getTriggerCount(){
        return this.cards.reduce((acc, el) => acc += el.trigger != ''? el.deckCounter : 0, 0);
    }

    emptyDeck(){
        this.leader = null;
        this.cards  = []
        this.colors  = [];
    }

    getCardFullName(card){
        return `${card.getOriginal_set_key()}-${card.getNumber().toString().padStart(3, '0')}`
    }

    getStatistics(){
        let accN = [{
            '0' : 0,
            '1' : 0,
            '2' : 0,
            '3' : 0,
            '4' : 0,
            '5' : 0,
            '6' : 0,
            '7' : 0,
            '8' : 0,
            '9' : 0,
            '10' : 0,
        },{
            '0'     : 0,
            '1000'  : 0,
            '2000'  : 0,
            '3000'  : 0,
            '4000'  : 0,
            '5000'  : 0,
            '6000'  : 0,
            '7000'  : 0,
            '8000'  : 0,
            '9000'  : 0,
            '10000' : 0,
            '11000' : 0,
            '12000' : 0,
        },{
            '0'     : 0,
            '1000'  : 0,
            '2000'  : 0
        }]
         
        const reducedArr = DECK.cards.reduce(function(acc, item, currentIndex) {
            if(currentIndex == 0){
                acc = accN;
            }
        
            item.cost = (item.cost == '-')? 0 : item.cost;
            item.counter = (item.counter == '-')? 0 : item.counter;
            item.power = (item.power == '-')? 0 : item.power;
        
            acc[0][item.cost]   += item.deckCounter;
            acc[1][item.power]  += item.deckCounter;
            acc[2][item.counter]+= item.deckCounter;
            
            return acc;
        }, {});

        return reducedArr;
    }

}
class DeckCard extends Card{

    setDeckCounter(deckCounter){
        this.deckCounter = deckCounter;
    }

    getDeckCounter(){
        return this.deckCounter;
    }

    addDeckCounter(){
        this.deckCounter+= 1;
    }

    subDeckCounter(){
        this.deckCounter-= 1;
    }

    constructor(data){
        super(data);

        this.deckCounter = 0;
    }
}
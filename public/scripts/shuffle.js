function shuffleDeck(){

    if(DECK == null){
        return;
    }

    const cards = [...DECK.cards];
    const nd = cards.flatMap((el, index) => Array(el.deckCounter).fill(index));

    shuffle(nd);
    clearHand();
    showHand(nd);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showHand(arrCards){

    const max = arrCards.length < 5 ? arrCards.length : 5;

    for(let i = 0; i < max; i++){
        const card = DECK.cards[arrCards[i]];

        const img = document.createElement('img');
        img.src = `https://cdn.glitch.global/85dfe08d-2d2f-40f2-a0f9-e3ae1044999e/${card.card_img.split('/')[4]}`;
        img.className = '';
        img.style = 'width:185px';

        $(`.shuffle-${i+1}`).html(img);

        $(`.shuffle-${i+1}`).popup({
            position    : 'top center',
            title       : card.name,
            html        : buildHtmlPopupContent(card)
        });
    }

    $('div[class*="shuffle-"]').fadeIn()
}

function clearHand(){
    $('div[class*="shuffle-"]').hide()
    $('div[class*="shuffle-"]').html('');
}
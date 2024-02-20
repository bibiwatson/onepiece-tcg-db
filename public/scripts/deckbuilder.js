let DECK = null;

function initDeckBuilder(){
    deckBuilderEvents();
}

function deckBuilderEvents(){
    if(DECK == null || !DECK.hasLeader()){
        filterLeader();
    }

    $(elements.btn_empty_deck).on('click', function(e){
        emptyDeck();
    });

    $(elements.btn_export_deck).on('click', function(){
        showDimDeck();
        return false;
    });

    $('.dimmer-deck-list .cancel.button').on('click', function(){
        hideDimDeck();
    });

    $(elements.download_deck_image).on('click', function(){
        downloadDeckImage();
    });

    $(elements.download_deck_file).on('click', function(){
        downloadDeckFile();
    });

    $(elements.icon_copy_card_list).on('click', function(){
        copyCardList();
    });

    $('[data-toggle="tooltip"]').tooltip();

    $(elements.deck_builder_tabs).tab();

    $(elements.btn_shuffle_deck).on('click', function(){
        shuffleDeck();
    });
}

function onCardClick(e){
    const card = new Card($(this).data());

    Object.freeze(card);
    
    if(DECK == null || !typeof DECK === 'Deck'){
        DECK = new Deck();
    }

    addCard(card);
}

function filterLeader(colors){
    $(elements.type_filter).dropdown('clear');
    $(elements.type_filter).dropdown('set selected', 'Leader');

    $(elements.color_filter).dropdown('clear');

    if(colors != null){
        $(elements.color_filter).dropdown('set selected', colors);
    }

    $('#cards_results').html('');
    loadCards();
}

function addCard(card){
    try{

        const deckCard = DECK.addCard(card);
        
        if(!deckCard){
            return;
        }

        const colors = card.getColor().split('/');

        if(card.isLeader()){

            $(elements.color_filter).dropdown('clear');
            $(elements.color_filter).dropdown('set selected', colors);
            $(elements.type_filter).dropdown('clear');
            $(elements.type_filter).dropdown('set selected', ['Character','Event','Stage']);

            $('#cards_results').html('');
            loadCards();
        }

        updateCardsCount();
        matchDeckColor();

        if(deckCard.getDeckCounter() == 1){
            addCardDeckElement(deckCard);
            return;
        }

        updateCardAmount(deckCard);
    }
    catch(err){
        console.error(err);
    }
}

function addCardDeckElement(card){

    const maxCards = $(window).width() > 980? 8 : 2;

    let newRow = (DECK.getCards().length) % maxCards == 0 ? true : false;

    const rowIndex = Math.ceil(DECK.cards.length / maxCards);
    newRow = false;

    const divRow = document.createElement('div');
    divRow.className = 'deck-cards';

    const divCol = document.createElement('div');
    divCol.className = 'card-holder';

    const divDeckCard = document.createElement('div');
    divDeckCard.className = 'card deck-card';

    const img = document.createElement('img');
    img.src = `https://cdn.glitch.global/85dfe08d-2d2f-40f2-a0f9-e3ae1044999e/${card.getCard_img().split('/')[4]}`;
    img.className = 'img-card';
    img.style = $(window).width() > 980 ? 'width:120px;' : 'width:190px;';//'width:100%';
    img.crossOrigin = 'anonymous';

    const divImgOverlay = document.createElement('div');
    divImgOverlay.className = 'card-img-overlay';

    const buttonRemove = document.createElement('button');
    buttonRemove.type = 'button';
    buttonRemove.className = 'close';
    buttonRemove.style = 'font-size:xxx-large;'
    buttonRemove.innerHTML = '&times;';

    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    divCardBody.style = 'z-index:9;';

    const divCardCounter = document.createElement('div');
    divCardCounter.style = 'float:left;text-align:center;margin-top:2px;';
    divCardCounter.className = 'col-4 div-card-counter';
    divCardCounter.innerHTML = '<h4 class="card-amount">1</h4>';

    const divCardCounterButtons = document.createElement('div');
    divCardCounterButtons.className = 'col-8 ui icon font buttons';

    const divCardPlus = document.createElement('div');
    divCardPlus.className = 'col-6 button-holder';
    divCardPlus.style = 'float:left;text-align:center;';

    const divCardMinus = document.createElement('div');
    divCardMinus.className = 'col-6 button-holder';
    divCardMinus.style = 'float:left;text-align:center;';

    const div50P = document.createElement('div');
    div50P.className = 'col-6';
    div50P.style = 'float:left;';

    const div50M = document.createElement('div');
    div50M.className = 'col-6'

    const buttonP = document.createElement('a');
    buttonP.className = 'increase ui button card-deck-button';
    buttonP.innerHTML = '<i class="plus icon"></i>';

    const buttonM = document.createElement('a');
    buttonM.className = 'decrease ui button card-deck-button';
    buttonM.innerHTML = '<i class="minus icon"></i>';

    divDeckCard.append(img);
    divDeckCard.append(divImgOverlay);
    
    divImgOverlay.append(buttonRemove);

    const divLeader = document.createElement('div');
    divLeader.className = 'w-100';
    divLeader.innerHTML = '<h5 class="leader-title">LEADER</h5>';
    divLeader.style = 'text-align:center;';
    
    divDeckCard.append(divCardBody);
    
    if(!card.isLeader()){
        divCardBody.append(divCardCounter);
        divCardBody.append(divCardCounterButtons);
        divCardCounterButtons.append(div50P);
        divCardCounterButtons.append(div50M);

        div50P.append(buttonP);
        div50M.append(buttonM);
    }

    $(divCol).data(card);
    $(buttonP).on('click', onBtnPlusClick);
    $(buttonM).on('click', onBtnMinusClick);
    $(buttonRemove).on('click', onBtnRemoveClick);


    if(card.isLeader()){
        $(divCol).hide();
        divCol.append(divDeckCard);
        divCardBody.append(divLeader);
        $('.col-leader-holder').append(divCol);
        $(divCol).fadeIn().css('display' , 'inline-block');

        return;
    }
    
    divCol.append(divDeckCard);
    $(divCol).fadeIn().css('display' , 'inline-block');


    if(newRow){
        divRow.append(divCol);
        $('.deck-holder').append(divRow);
        return;
    }

    $('.deck-cards').append(divCol);
}

function onBtnMinusClick(){
    const data = $(this).closest('.card-holder').data();
    
    const card = new Card(data);

    const deckCard = DECK.decreaseCardAmount(card);

    if(!deckCard){
        return;
    }

    updateCardAmount(deckCard);
}

function onBtnPlusClick(){
    const data = $(this).closest('.card-holder').data();
   
    const card = new Card(data);
    const deckCard = DECK.increaseCardAmount(card);

    if(!deckCard){
        return;
    }

    updateCardAmount(deckCard);
}

function onBtnRemoveClick(){
    const data = $(this).closest('.card-holder').data();
   
    const card = new Card(data);

    DECK.removeCard(card);
    
    removeCardElement($(this).closest('.card-holder'));

    if(card.isLeader() && (DECK.getCardsLen() - 10) > 0){
        filterLeader(DECK.getColors())
    }
}

function removeCardElement(el){

    $(el).fadeOut({
        always: function(){
            $(el).remove();
        }
    });

    updateCardsCount();
}

function updateCardAmount(card){
    const els = $('.card-holder').filter(function(){
        return $(this).data().id == card.getId();
    });

    if(card.getDeckCounter() == 0){
        removeCardElement(els[0]);
        return;
    }

    if(card.getDeckCounter() != $(els[0]).data().deckCounter){
        $(els[0]).data().deckCounter = card.getDeckCounter();
    }

    $(els[0]).find('.card-amount').html(card.getDeckCounter());

    updateCardsCount();
}

function updateCardsCount(empty){
    $($('.card-amount-holder')).html('Cards : ' + (DECK.getCardsLen() - 10));
    $($('.trigger-amount-holder')).html('Triggers : ' + DECK.getTriggerCount());

    if(DECK.getCardsLen() - 10 == 0){
        filterLeader(null);
    }

    if(empty){
        DECK = null;
    }


    updateCharts();
}

function matchDeckColor(){
    const notMatch = $('div[class=card-holder]').filter((index, el) => {
        let matchcolor = false; 

        $(el).data().color.split('/').forEach(color => {
            if(DECK.colors.indexOf(color) >= 0){
                matchcolor = true;
            }
        });
    
        return !matchcolor;
    });

    if(notMatch != null){
        $(notMatch).remove();
    }

    DECK.matchDeckColor();

    updateCardsCount();
}

function emptyDeck(){
    if(DECK == null){
        return;
    }

    updateCharts(true);
    
    DECK.emptyDeck();

    $('div[class=card-holder]').remove();

    filterLeader();

    updateCardsCount(true);
    clearHand();
}

function showDimDeck(){
    if(DECK == null || DECK.getCardsLen() < 12){
        return
    }

    $(elements.modal_export_deck).modal('hide');
    $(elements.modal_export_deck).modal('show');

    showCanvasExportDeck();
    showCanvasExportDeck(10, 'deck-export-canvas', 170);

    fillTextArea();
}

function hideDimDeck(){
    $(elements.modal_export_deck).modal('hide');
}

function showCanvasExportDeck(cardsPerRow, idCanvas, width, height){
    try{
        if(DECK.getCardsLen() < 12 || DECK.leader == null){
            return;
        }

        const w = width || 55;
        const h = w * 1.4;
        const cardsRow = cardsPerRow || 20;

        const rows = Math.ceil((DECK.getCardsLen() - 10)/cardsRow);
        const canvasH = rows * h;

        const strIdCanvas = idCanvas || 'modal-show-canvas';
        const canvasDeckShow = document.getElementById(strIdCanvas);

        let idx = 1;
        const imgs = DECK.cards.flatMap((el, index, arr) => {
            if(el.deckCounter > 1){
                const arr = []
                for(let i = 0; i<el.deckCounter; i++){
                    arr.push({
                        uri     : `https://cdn.glitch.global/85dfe08d-2d2f-40f2-a0f9-e3ae1044999e/${el.card_img.split('/')[4]}`,
                        x       : ((idx%cardsRow) * w) + idx%cardsRow,
                        y       : Math.floor((idx)/cardsRow) * h,
                        sw      : w,
                        sh      : h,
                        amount  : el.deckCounter,
                        cuenta  : idx
                    });

                    idx++;
                }
                return arr;
            }
            else{
                const obj = {
                    uri     : `https://cdn.glitch.global/85dfe08d-2d2f-40f2-a0f9-e3ae1044999e/${el.card_img.split('/')[4]}`,
                    x       : ((idx%cardsRow) * w) + idx%cardsRow,
                    y       : Math.floor((idx)/cardsRow) * h,
                    sw      : w,
                    sh      : h,
                    amount  : el.deckCounter,
                    cuenta  : idx
                }

                idx++;
                return obj
            }
        });

        imgs.unshift({
            uri : `https://cdn.glitch.global/85dfe08d-2d2f-40f2-a0f9-e3ae1044999e/${DECK.leader.card_img.split('/')[4]}`,
            x   : 0,
            y   : 0,
            sw  : w,
            sh  : h,
            amount : 1
        });

        const obj = imgs[cardsRow-1] || imgs[imgs.length-1];
        canvasDeckShow.width = obj.x + w;
        canvasDeckShow.height = canvasH;
        
        imgs.forEach(img => depict(img, strIdCanvas), canvasDeckShow);

        if(strIdCanvas == 'modal-show-canvas'){
            $(elements.text_area_deck_card_list).css('width', (obj.x + w) + 'px');
        }
    }
    catch(err){
        console.error(err);
    }
}

const loadImage = url => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`load ${url} fail`));
        img.src = url;
        img.crossOrigin  = 'anonymous';
    });
}

function depict(options, idCanvas){
    const canvasDeckShow = document.getElementById(idCanvas);
    const ctx = canvasDeckShow.getContext('2d');
    const myOptions = Object.assign({}, options);
    
    return loadImage(myOptions.uri).then(img => {
        ctx.drawImage(img, myOptions.x, myOptions.y, myOptions.sw, myOptions.sh);
    });
}
  

function downloadDeckImage(){
    try{

        let link = $(elements.a_download_deck).length == 0? null : $(elements.a_download_deck)[0];

        if($(elements.a_download_deck).length == 0){
            link = document.createElement('a');
            link.className = 'a-download-deck';
        }
        
        link.download = DECK.leader.name +'_'+ DECK.leader.original_set_key + '-' + DECK.leader.number + '_' + DECK.leader.color + '_' + new Date().getTime();
        link.href = document.getElementById('deck-export-canvas').toDataURL()
        link.click();
    }
    catch(err){
        console.error(err);
    }
}

function downloadDeckFile(){
    try{
        if(DECK == null || DECK.leader == null || DECK.cards.length == 0){
            return;
        }

        let content = getDotDeckContent();

        const file = new Blob([content], { type: 'text/plain' });

        let link = $(elements.a_download_deck_file).length == 0? null : $(elements.a_download_deck_file)[0];

        if($(elements.a_download_deck_file).length == 0){
            link = document.createElement('a');
            link.className = 'a-download-deck-file';
        }
        
        link.download = DECK.leader.name +'_'+ DECK.leader.original_set_key + '-' + DECK.leader.number + '_' + DECK.leader.color + '_' + new Date().getTime() + '.deck';
        link.href = URL.createObjectURL(file);
        link.click();
    }
    catch(err){
        console.error();
    }
}

function fillTextArea(){
    try{
        /*const arr = DECK.cards.flatMap(el => Array(el.deckCounter).fill(el.original_set_key + '-' + el.number));

        arr.unshift(DECK.leader.original_set_key + '-' + DECK.leader.number);*/

        let content = getDotDeckContent();

        $(elements.text_area_deck_card_list).val(content);
        $(elements.div_card_list_holder).html(content)
    }
    catch(err){
        console.error(err);
    }
}

function copyCardList(){
    try{
        const copyText = document.getElementsByClassName(elements.text_area_deck_card_list.substr(1))[0];

        copyText.select();
        copyText.setSelectionRange(0, 99999);


        if(navigator.clipboard){
            navigator.clipboard.writeText(copyText.value).then(res => console.log(res)).catch(err => alert(err));
        }
        else{
            document.execCommand('copy');
        }

        $(elements.icon_copy_card_list).attr('data-original-title', 'Copied');
        $(elements.icon_copy_card_list).tooltip('show');
        $(elements.icon_copy_card_list).attr('data-original-title', 'Copy to clipboard');
    }
    catch(err){
        console.error(err);
        alert(err.message);
    }
}

function getDotDeckContent(){
    let content = `1x${DECK.getCardFullName(DECK.leader)}`;

    DECK.cards.forEach(card => {
        content += `\n${card.getDeckCounter()}x${DECK.getCardFullName(card)}`
    });

    return content;
}

function updateCharts(empty){
    updateAllCharts(empty);
}
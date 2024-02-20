function showSets(sets) {
    if (sets.length == 0) {
        return;
    }


    try {
        const select_set = $('#select_set');
        sets.forEach(set => {
            const option = `<option value='${set.id}'>[${set.key}] ${set.name}</option>`

            select_set.append(option);

        });
    }
    catch (err) {
        console.error(err);
    }
}

function showCards(cards) {
    $('#results-count').html(`${cards.length} results`);

    const div_results = $('#cards_results');

    div_results.html('');

    if (cards.length == 0) {
        $('.not-results-found').html(`Not results found. Try another search`).show();
        return;
    }

    try {
        const row_limit = $(window).width() > 980? 3 : 2;
        const md_size = 12 / row_limit;

        let row_act = 0;
        const style = $(window).width() > 980? 'width:100%;' : 'width:100%;';

        let divRow = null;

        let arrImg = [];

        cards.forEach((card, index) => {
            row_act++;

            if(row_act == 1){
                divRow = document.createElement('div');
                divRow.className = 'row';

                div_results.append(divRow);
            }

            const divCard = document.createElement('div');
            divCard.classList.add(`col-lg-${md_size}`,  'col-md-6');
            divCard.style = 'text-align:center';
 
            const divImg = document.createElement('div');
            divImg.className = 'image-wrap-builder';

            const img = document.createElement('img');
            img.src = `https://cdn.glitch.global/85dfe08d-2d2f-40f2-a0f9-e3ae1044999e/${card.card_img.split('/')[4]}`;
            img.className = 'image-builder-selector img-con-data disable-dbl-tap-zoom';
            img.style = 'width:135px;';

            $(img).data(card);

            divImg.append(img);
            divCard.append(divImg);
            divRow.append(divCard);

            arrImg.push(img);
            
            if(row_act == row_limit){
                row_act = 0;
            }           
        });

        div_results.append(divRow);

        arrImg.forEach((val, index) => {
            $(val).popup({
                position    : 'top center',
                html        : buildHtmlPopupContent(cards[index])
            });
        });

        $('.img-con-data').on('click', onCardClick);
    }
    catch (err) {
        console.error(err);
    }
}

function showCardTypes(cardTypes){
    if (cardTypes.length == 0) {
        return;
    }

    try {
        const select_card_types = $('#select_card_types');
        const menu_card_types = $('#menu_card_types');

        cardTypes.forEach(card_type => {
            const option = `<option value='${card_type}'>${card_type}</option>`
            select_card_types.append(option);

            menu_card_types.append(`<div class="item" data-value="${card_type}">${card_type}</div>`);
        });

        initDropdowns();
    }
    catch (err) {
        console.error(err);
    }
}

function main() {
    loadSets();
    loadCardTypes();

    $('#button-search').on('click', function () {
        $('section').remove('.search-result-item');
        $('#cards_results').html('');
        loadCards();
    });
}

function initDropdowns(){
    $('.label.ui.dropdown').dropdown();

    $('.no.label.ui.dropdown')
        .dropdown({
        useLabels: false
    });

    initDeckBuilder();
}

function buildHtmlPopupContent(card){

    let effect = card.effect;
    effect = effect.replaceAll(' [', '---');
    effect = effect.replaceAll('][', '----');
    effect = effect.replaceAll('[', '<br/>[');

    if (effect.indexOf('<br/>[') == 0) {
        effect = effect.replace('<br/>[', '[');
    }

    effect = effect.replaceAll('---', ' [');
    effect = effect.replaceAll('----', '][');

    let htmlPopupContent = `<div class="popup-card-info">
                                        <div class="row">
                                            <div class="col-md-12 card_info">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <span class="text-break" style="font-size:16px"><strong>${card.name}</strong></span>
                                                    </div>
                                                </div>
                                                
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <span class="info">${card.set_name.replace('-', '')}-${card.number.toString().padStart(3, '0')} | ${card.rarity} | ${card.card_type}</span>
                                                    </div>
                                                </div>
                                                <div class="row">`

    if (card.cost > 0) {
        htmlPopupContent += `
        <div class="col-md-12 col-lg-3 text-align-center myCol">
            <span><strong>Cost</span></strong> ${card.cost}
        </div>`;
    }

    if (card.life > 0) {
        htmlPopupContent += `<div class="col-md-12 col-lg-3 text-align-center myCol">
            <span><strong>Life</span></strong> ${card.life}
        </div>`;
    }

    htmlPopupContent += `<div class="col-md-12 col-lg-3 text-align-center myCol">
        <span><strong>Attribute</span></strong> ${card.attribute}
    </div>`;

    htmlPopupContent += `</div>
        <div class="row">
        <div class="col-md-12 col-lg-3 text-align-center myCol">
            <span><strong>Power</span></strong> ${card.power}
        </div>
        <div class="col-md-12 col-lg-3 text-align-center myCol">
            <span><strong>Color</span></strong> ${card.color}
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-lg-3 text-align-center myCol">
            <span><strong>Counter</span></strong> ${card.counter}
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-lg-12 text-align-center myCol">
            <span><strong>Type</span></strong> ${card.type}
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 col-lg-12 text-align-center myCol">
            <span class="title-small-padding"><strong>Effect</strong></span> <br/>${effect}
        </div>
    </div>`

    if (card.trigger != undefined && card.trigger != '') {
        let trigger = card.trigger;
        trigger = trigger.replaceAll('[', '<br/>[').replace('<br/>[', '[');

        htmlPopupContent += `<div class="row">
                                <div class="col-md-12 col-lg-12 text-align-center myCol">
                                    <span class="title-small-padding"><strong>Trigger</strong></span> <br/>${card.trigger}
                                </div>
                            </div>`;
    }

    return htmlPopupContent;
}


$(function () {
    jQuery.event.special.touchstart = {
        setup: function( _, ns, handle ) {
            this.addEventListener('touchstart', handle, { passive: !ns.includes('noPreventDefault') });
        }
    };
    jQuery.event.special.touchmove = {
        setup: function( _, ns, handle ) {
            this.addEventListener('touchmove', handle, { passive: !ns.includes('noPreventDefault') });
        }
    };

    main();
});


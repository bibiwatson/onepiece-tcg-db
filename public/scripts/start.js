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

function showCards(cards) {
    $('#results-count').html(`${cards.length} results`);

    const div_results = $('#cards_results');

    if (cards.length == 0) {
        $('.not-results-found').html(`Not results found. Try another search`).show();
        return;
    }

    try {
        cards.forEach(card => {

            let effect = card.effect;
            effect = effect.replaceAll(' [', '---')
            effect = effect.replaceAll('][', '----')
            effect = effect.replaceAll('[', '<br/>[')

            if (effect.indexOf('<br/>[') == 0) {
                effect = effect.replace('<br/>[', '[');
            }

            effect = effect.replaceAll('---', ' [')
            effect = effect.replaceAll('----', '][')

            let sec = `<section class="search-result-item">
            
                <div class="image-link">
                    <img class="image" src="https://cdn.glitch.global/85dfe08d-2d2f-40f2-a0f9-e3ae1044999e/${card.card_img.split('/')[4]}">
                </div>
                </a>
            
            <div class="search-result-item-body">
                <div class="row">
                    <div class="col-md-12 card_info">
                        <div class="row">
                            <div class="col-md-12">
                                <span class="search-result-item-heading text-break">${card.name}</span>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-12">
                                <span class="info">${card.set_name.replace('-', '')}-${card.number.toString().padStart(3, '0')} | ${card.rarity} | ${card.card_type}</span>
                            </div>
                        </div>
                        <div class="row">`


            if (card.cost > 0) {
                sec += `
                <div class="col-md-12 col-lg-3 text-align-center myCol">
                    <span><strong>Cost</span></strong> ${card.cost}
                </div>`;
            }

            if (card.life > 0) {
                sec += `<div class="col-md-12 col-lg-3 text-align-center myCol">
                    <span><strong>Life</span></strong> ${card.life}
                </div>`;
            }

            sec += `<div class="col-md-12 col-lg-3 text-align-center myCol">
                <span><strong>Attribute</span></strong> ${card.attribute}
            </div>`;

            sec += `</div>
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
            </div>`;

            if (card.trigger != undefined && card.trigger != '') {
                let trigger = card.trigger;
                trigger = trigger.replaceAll('[', '<br/>[').replace('<br/>[', '[');

                sec += `<div class="row">
                            <div class="col-md-12 col-lg-12 text-align-center myCol">
                                <span class="title-small-padding"><strong>Trigger</strong></span> <br/>${card.trigger}
                            </div>
                        </div>`;
            }

            sec += `<div class="row">
                            <div class="col-md-12 col-lg-12 text-align-center myCol">
                                <br/>
                                <span class="title-small-padding"><strong>Card Sets</strong></span> <br/>${card.set_name}
                            </div>
                        </div>`;

            sec += `</div>
                </div>
                </div>
                </section>`

            div_results.append(sec)
        });
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
        loadCards();
    });

    //initDropdowns();

}

function initDropdowns(){
    $('.label.ui.dropdown').dropdown();

    $('.no.label.ui.dropdown')
        .dropdown({
        useLabels: false
    });

    $('.ui.button').on('click', function () {
        $('.ui.dropdown')
        .dropdown('restore defaults')
    })
}


$(function () {
    main();

    $(window).scroll(function (e, v) {
        if($(window).width() <= 980){
            changeNavbar();
        }
    });

    let last_class = '';
    let col = 0;
    function changeNavbar() {
        const scroll_top = $(this).scrollTop();

        if($(window).width() > 980){
            return;
        }

        if($('.navbar-fixed-top').hasClass('collapsing')){
            //alert('collapsing ' + scroll_top);
            last_class = 'collapsing';
            return false;
        }

        if(last_class == 'collapsing'){
            col++;
            //alert(col);
            if(col == 2){
                last_class = '';
                col = 0;
            }
            return false;
        }

        //alert(scroll_top);

        var navbar = $(".navbar-fixed-top");
        if(scroll_top >= 150){
            navbar.removeClass("show");
        }
        else if (scroll_top < 100) {
            navbar.addClass("show");
        }
    }
});
function loadSets() {
    $.ajax({
        url: '/sets',
        success: function (result) {

            if (result == null) {
                return;
            }

            showSets(result);
        }
    });
}

function loadCardTypes(){
    $.ajax({
        url: '/types',
        success: function (result) {

            if (result == null) {
                return;
            }

            showCardTypes(result);
        }
    });
}

function loadCards() {
    try {
        $('.not-results-found').hide();
        $('#results-count').html('');

        const inputSearch = $('#text-search');

        const checks = $('[name=color_filter] option:selected');
        //const checks_type = $('input[name=type_filter]:checked');
        const checks_type = $('[name=type_filter] option:selected');
        const checks_attr = $('[name=attr_filter] option:selected');
        const select_set = $('#select_set');
        const select_card_types = $('#select_card_types option:selected');
        const select_counters = $('#select_counter option:selected');
        const cost_search = $('#cost_search');


        let colors = '';
        let types = '';
        let attrs = '';
        let card_types = '';
        let counters = '';

        const queryString = inputSearch.val().trim();
        const set_id = select_set.val();
        const cost = cost_search.val().trim();

        $(checks).each((index, option) => {
            colors += $(option).val() + ',';
        });

        $(checks_type).each((index, option) => {
            types += $(option).val() + ',';
        });

        for(let i=0; i < checks_attr.length; i++){
            attrs += $(checks_attr[i]).val() + ',';
        }

        $(select_card_types).each((index, option) => {
            card_types += $(option).val() + ',';
        });

        $(select_counters).each((index, option) => {
            counters += $(option).val() + ',';
        });

        colors = colors.slice(0, -1);
        types = types.slice(0, -1);
        attrs = attrs.slice(0, -1);
        card_types = card_types.slice(0, -1);
        counters = counters.slice(0, -1);

        if (queryString.trim() == '' && colors.trim() == '' && types.trim() == '' && attrs.trim() == '' && card_types.trim() == '' && counters.trim() == '' && cost.trim() == '' && (set_id == 0 || set_id == '')) {
            $('section').remove('.search-result-item');
            $('.not-results-found').html(`Please apply at least one filter`).show();
            return;
        }

        $('.spinner-results').show();

        $.ajax({
            url: '/cards',
            data: {
                queryString,
                colors: colors,
                card_types: types,
                attrs,
                set_id,
                types: card_types,
                counters,
                cost
            },
            success: function (result) {
                $('.spinner-results').hide();

                if (result == null) {
                    return;
                }

                showCards(result);
            }
        });
    }
    catch (err) {
        console.log(err)
    }
}
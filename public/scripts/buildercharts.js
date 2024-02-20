function updateAllCharts(empty){
    if(DECK == null || DECK.cards.length == 0){
        return;
    }

    const data = DECK.getStatistics();
    Object.freeze(data);
    
    createChart('div-cost-chart', data[0], 'Cost', '#6384ff', empty);
    createChart('div-power-chart', data[1], 'Power', '#ff6384', empty);
    createChart('div-counter-chart', data[2], 'Counter', '#9063ff', empty);
}

function createChart(divId, chartData, chartTitle, bgColor, emtpy){
    const divData = $(`#${divId}`).data();

    if(divData.chart != undefined){
        const chart = divData.chart;

        if(emtpy){
            chart.destroy();
            $(`#${divId}`).data({chart : null});
            return;
        }

        chart.data.datasets[0].data = Object.values(chartData);
        chart.update();
        
        return;
    }
    
    const ctx = document.getElementById(divId);
    const costChar = new Chart(ctx, {
        type    : 'bar',
        data    : {
            labels  : Object.keys(chartData),
            datasets: [{
                label: 'Count',
                data: Object.values(chartData),
                borderWidth: 1,
                backgroundColor: bgColor
            }]
        },
        options : {
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                }
            },
            scales  : {
                y   : {
                    beginAtZero: true,
                    ticks : {
                        stepSize: 1,
                        precision: 0

                    }
                }
            }
        }
    });

    if(divData.chart == undefined || divData.chart == null){
        $(`#${divId}`).data({
            chart : costChar
        });
    }
}
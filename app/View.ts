class View {

    readonly leftCivImage: HTMLImageElement
    readonly rightCivImage: HTMLImageElement
    readonly leftUnitImage: HTMLImageElement
    readonly rightUnitImage: HTMLImageElement
    readonly leftStatsTable: HTMLTableElement
    readonly rightStatsTable: HTMLTableElement
    readonly modalOverlay: HTMLDivElement
    readonly modalContent: HTMLDivElement

    private readonly factory: Factory

    constructor() {
        this.leftCivImage = this.initElement("leftCivImage") as HTMLImageElement
        this.rightCivImage = this.initElement("rightCivImage") as HTMLImageElement
        this.leftUnitImage = this.initElement("leftUnitImage") as HTMLImageElement
        this.rightUnitImage = this.initElement("rightUnitImage") as HTMLImageElement
        this.leftStatsTable = this.initElement("leftStats") as HTMLTableElement
        this.rightStatsTable = this.initElement("rightStats") as HTMLTableElement
        this.modalOverlay = this.initElement("modalOverlay") as HTMLDivElement
        this.modalContent = this.initElement("modalContent") as HTMLDivElement
        this.factory = new Factory()
    }

    // TODO: Can we use generics to infer the type here? (So that it doesn't have to be cast)
    private initElement(element: string) {
        return document.getElementById(element)
    }

    public showOverlay() {
        this.modalOverlay.classList.remove("modalHidden")
        this.modalOverlay.classList.add("modalVisible")
    }
    
    public hideOverlay() {
        this.modalOverlay.classList.remove("modalVisible")
        this.modalOverlay.classList.add("modalHidden")
    }

    public showCivs(civs: Civ[]) {
        this.modalContent.innerHTML = ""
        for (const civ of civs) {
            this.modalContent.innerHTML += this.factory.civWidgetHtml(civ.id, civ.name, civ.image)
        }
        this.showOverlay()
    }

    public showUnits(civ: Civ) {
        if (civ == null) {
            return
        }
        this.modalContent.innerHTML = ""
        for (const unit of civ.units) {
            this.modalContent.innerHTML += this.factory.unitWidgetHtml(unit.id, unit.name, unit.img)
        }
        this.showOverlay()
    }

    public renderGraph(histogram) {

    
        let dataA = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200];
        let dataB = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200];
        
        let labels = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200];
    
          var config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'a',
                        backgroundColor: "blue",
                        borderColor: "blue",
                        data: dataA,
                        fill: false
                    },
                    {
                        label: 'b',
                        backgroundColor: "red",
                        borderColor: "red",
                        data: dataB,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: false,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    displayColors: false,
                    callbacks: {
                        title: function(tooltipItem, data) {
                            const index = tooltipItem[0].index;
                            const dataset = data.datasets[0];
                            const players = dataset.data[index];
                            return "xx"
                        },
                        label: function(tooltipItem, data) {
                            const index = tooltipItem.index;
                            return ["ttrr"];
                        }
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "yy"
                        },
                        gridLines: {
                            display: false,
                            zeroLineColor: "black",
                        },
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0,
                            // callback: function(value, index, values) {
                            // 	return '$' + value;
                            // }
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "nah"
                        },
                        gridLines: {
                            color: "black",
                            zeroLineColor: "black"
                        },
                        ticks: {
                            // suggestedMin: 985,
                            // suggestedMax: 990
                        }
                    }]
                }
            }
        };
    
        Chart.defaults.global.defaultFontColor = "black";
        Chart.defaults.global.defaultFontFamily = "Roboto Condensed";
    
        let chartElement = document.getElementById('chartCanvas') as HTMLCanvasElement
        var ctx = chartElement.getContext('2d');
        if (window.myLine == null) {
            window.myLine = new Chart(ctx, config);
        } else {
            window.myLine.config = config;
            window.myLine.options = config.options;
            window.myLine.update();
        }
    }
}

class Factory {

    public civWidgetHtml(id: number, name: string, imageUrl: string) {
        return `<div class="civCell" onClick="javascript:civClicked(${id})">
                   <img src="${imageUrl}"></img>
                   <p>${name}</p>
               </div>`
    }

    public unitWidgetHtml(id: string, name: string, imageUrl: string): string {
        return `<div class="civCell" onClick="javascript:unitClicked('${id}')">
                   <img src="${imageUrl}"></img>
                   <p>${name}</p>
               </div>`
    }

    public static unitDescriptionHtml(name: string, f: number, w: number, g: number) {
        let html = `${name}<br/><img src="${Cost.imageUrlFood}"></img>&nbsp;${f}`
        if (g > 0) {
            html += ` <img src="${Cost.imageUrlGold}"></img>&nbsp;${g}`
        }
        if (w > 0) {
            html += ` <img src="${Cost.imageUrlWood}"></img>&nbsp;${w}`
        }
        return html
    }
}
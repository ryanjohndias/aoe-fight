// import { ChartData } from "./Views/Models/ChartData"

class View {

    readonly leftCivImage: HTMLImageElement
    readonly rightCivImage: HTMLImageElement
    readonly leftUnitImage: HTMLImageElement
    readonly rightUnitImage: HTMLImageElement
    readonly leftStatsTable: HTMLTableElement
    readonly rightStatsTable: HTMLTableElement
    readonly modalOverlay: HTMLDivElement
    readonly modalContent: HTMLDivElement

    readonly leftCivPlaceholder: HTMLDivElement
    readonly rightCivPlaceholder: HTMLDivElement

    readonly leftUnitPlaceholder: HTMLDivElement
    readonly rightUnitPlaceholder: HTMLDivElement

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
        this.leftCivPlaceholder = this.initElement("leftCivPlaceholder") as HTMLDivElement
        this.rightCivPlaceholder = this.initElement("rightCivPlaceholder") as HTMLDivElement
        this.leftUnitPlaceholder = this.initElement("leftUnitPlaceholder") as HTMLDivElement
        this.rightUnitPlaceholder = this.initElement("rightUnitPlaceholder") as HTMLDivElement
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

    public renderGraph(data: ChartData) {

        //     options: {
        //         responsive: false,
        //         tooltips: {
        //             mode: 'index',
        //             intersect: false,
        //             displayColors: false,
        //             callbacks: {
        //                 title: function(tooltipItem, data) {
        //                     const index = tooltipItem[0].index;
        //                     const dataset = data.datasets[0];
        //                     const players = dataset.data[index];
        //                     return "xx"
        //                 },
        //                 label: function(tooltipItem, data) {
        //                     const index = tooltipItem.index;
        //                     return ["ttrr"];
        //                 }
        //             }
        //         },
        //         hover: {
        //             mode: 'nearest',
        //             intersect: true
        //         },
        //         legend: {
        //             display: false
        //         },
        //         scales: {
        //             xAxes: [{
        //                 display: true,
        //                 scaleLabel: {
        //                     display: true,
        //                     labelString: "yy"
        //                 },
        //                 gridLines: {
        //                     display: false,
        //                     zeroLineColor: "black",
        //                 },
        //                 ticks: {
        //                     maxRotation: 0,
        //                     minRotation: 0,
        //                     // callback: function(value, index, values) {
        //                     // 	return '$' + value;
        //                     // }
        //                 }
        //             }],
        //             yAxes: [{
        //                 display: true,
        //                 scaleLabel: {
        //                     display: true,
        //                     labelString: "nah"
        //                 },
        //                 gridLines: {
        //                     color: "black",
        //                     zeroLineColor: "black"
        //                 },
        //                 ticks: {
        //                     // suggestedMin: 985,
        //                     // suggestedMax: 990
        //                 }
        //             }]
        //         }
        //     }
        // };
    
        let config = {
            type: 'line',
            data: {
              datasets: [
                  {
                    label: data.leftName,
                    backgroundColor: '#ff0000',
                    borderColor: '#ff0000',
                    fill: false,
                    data: data.leftData
                },
                {
                    label: data.rightName,
                    backgroundColor: '#00FFFF',
                    borderColor: '#00FFFF',
                    fill: false,
                    data: data.rightData
                }
            ],
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: "Hit points remaining"
              },
              scales: {
                xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  scaleLabel: {
                    display: true,
                        labelString: "Seconds"
                    },
                }],
                yAxes: [{
                    scaleLabel: {
                      display: true,
                          labelString: "Hit points"
                      },
                  }]
              },
            tooltips: {
                // mode: 'index',
                // intersect: false,
                // displayColors: true,
                callbacks: {
                    title: function(tooltipItem, data) {
                        const index = tooltipItem[0].index;
                        const dataset = data.datasets[tooltipItem[0].datasetIndex];
                        const item = dataset.data[index];
                        return `Hit #${index + 1} at ${item.x} seconds`
                    },
                    label: function(tooltipItem, data) {
                        const index = tooltipItem.index;
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const item = dataset.data[index];

                        // const unit = tooltipItem.datasetIndex == 0 ? this.data.left.unit.name : ""

                        return [`${item.unitName} has ${item.y} hit points remaining`];
                    }
                }
            }
            }
          }

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
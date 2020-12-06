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

    public renderGraph(left: BattleReport, right: BattleReport) {

        // TODO: Have a custom view model object to pass in here (to not expose BattleReport to the view; also so that the view doesn't do too much work)

        let leftData = left.log.map(function(item) {
            return {
                x: item.time,
                y: item.hpLeft
            }
        })

        let rightData = right.log.map(function(item) {
            return {
                x: item.time,
                y: item.hpLeft
            }
        })

        console.log(leftData)

        // let dataA = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200];
        // let dataB = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200];
        
        // let labels = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200];
    
        //   var config = {
        //     type: 'line',
        //     data: {
        //         labels: labels,
        //         datasets: [
        //             {
        //                 label: 'a',
        //                 backgroundColor: "blue",
        //                 borderColor: "blue",
        //                 data: dataA,
        //                 fill: false
        //             },
        //             {
        //                 label: 'b',
        //                 backgroundColor: "red",
        //                 borderColor: "red",
        //                 data: dataB,
        //                 fill: false
        //             }
        //         ]
        //     },
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
              datasets: [{
                label: 'Engine Speed',
                backgroundColor: '#ff0000',
                borderColor: '#ff0000',
                fill: false,
                data: leftData,
                // data: [{
                //   x: 0.37,
                //   y: 2640
                // }, {
                //   x: 0.85,
                //   y: 2560
                // }, {
                //   x: 1.33,
                //   y: 2560
                // }, {
                //   x: 1.78,
                //   y: 2560
                // }, {
                //   x: 2.23,
                //   y: 2680
                // }, {
                //   x: 2.7,
                //   y: 2920
                // }, {
                //   x: 3.16,
                //   y: 3200
                // }, {
                //   x: 3.63,
                //   y: 3520
                // }]
              },
              {
                label: 'Mass Air Flow - Sensor',
                backgroundColor: '#00FFFF',
                borderColor: '#00FFFF',
                fill: false,
                data: rightData,
                // data: [{
                //   x: 0.02,
                //   y: 19.58
                // }, {
                //   x: 0.45,
                //   y: 16.28
                // }, {
                //   x: 0.92,
                //   y: 8.56
                // }, {
                //   x: 1.39,
                //   y: 8.47
                // }, {
                //   x: 1.86,
                //   y: 23.36
                // }, {
                //   x: 2.33,
                //   y: 45.78
                // }, {
                //   x: 2.78,
                //   y: 56.03
                // }, {
                //   x: 3.23,
                //   y: 62.36
                // }]
              }],
          
            },
            options: {
              responsive: true,
              title: {
                display: false
              },
              scales: {
                xAxes: [{
                  type: 'linear',
                  position: 'bottom'
                }]
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
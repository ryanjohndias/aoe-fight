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

    private readonly resultText: HTMLParagraphElement
    private readonly resultContainer: HTMLDivElement

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
        this.resultText = this.initElement("resultText") as HTMLDivElement
        this.resultContainer = this.initElement("resultContainer") as HTMLParagraphElement
        
        this.factory = new Factory()

        this.applyStyle()
    }

    // TODO: Can we use generics to infer the type here? (So that it doesn't have to be cast)
    private initElement(element: string) {
        return document.getElementById(element)
    }

    private applyStyle() {
        // Any programmatic styling that needs to be done
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
        let config = {
            type: 'line',
            data: {
              datasets: [
                  {
                    label: data.leftName,
                    backgroundColor: Config.leftColour,
                    borderColor: Config.leftColour,
                    fill: false,
                    data: data.leftData
                },
                {
                    label: data.rightName,
                    backgroundColor: Config.rightColour,
                    borderColor: Config.rightColour,
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
            //   hover: {
            //         mode: 'nearest',
            //         intersect: true
            //     }
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

        // Chart.defaults.global.defaultFontColor = "black";
        // Chart.defaults.global.defaultFontFamily = "Roboto Condensed";
    
        // let chartElement = document.getElementById('chartCanvas') as HTMLCanvasElement
        // var ctx = chartElement.getContext('2d');
        // if (window.myLine == null) {
        //     window.myLine = new Chart(ctx, config);
        // } else {
        //     window.myLine.config = config;
        //     window.myLine.options = config.options;
        //     window.myLine.update();
        // }
    }

    public reset() {
        this.toggleLeftCivVisibility(false)
        this.toggleRightCivVisibility(false)
        this.toggleLeftUnitVisibility(false)
        this.toggleRightUnitVisibility(false)
        Utils.$("leftUnitName").innerHTML = ""
        Utils.$("rightUnitName").innerHTML = ""
        Utils.$("leftCivName").textContent = ""
        Utils.$("rightCivName").textContent = ""

        this.leftStatsTable.innerHTML = ""
        this.rightStatsTable.innerHTML = ""

        view.toggleEmptyState(false)
    }

    public toggleLeftCivVisibility(visible: boolean) {
        this.leftCivImage.style.display = visible ? 'block' : 'none'
        this.leftCivPlaceholder.style.display = visible ? 'none' : 'table-cell'
    }

    public toggleRightCivVisibility(visible: boolean) {
        this.rightCivImage.style.display = visible ? 'block' : 'none'
        this.rightCivPlaceholder.style.display = visible ? 'none' : 'table-cell'
    }

    public toggleLeftUnitVisibility(visible: boolean) {
        this.leftUnitImage.style.display = visible ? 'block' : 'none'
        this.leftUnitPlaceholder.style.display = visible ? 'none' : 'table-cell'
    }

    public toggleRightUnitVisibility(visible: boolean) {
        this.rightUnitImage.style.display = visible ? 'block' : 'none'
        this.rightUnitPlaceholder.style.display = visible ? 'none' : 'table-cell'
    }

    public setResultHtml(text: string) {
        this.resultText.textContent = text
    }

    public toggleEmptyState(visible: boolean) {
        this.resultContainer.style.display = visible ? 'block' : 'none'
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
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
// import { ChartData } from "./Views/Models/ChartData"

window.onload = initialise
window.onclick = function(event: MouseEvent) {
    if (event.target == view.modalOverlay) {
        view.hideOverlay()
    }
}

var view: View
var service: Service
var state: AppState

function initialise() {
    this.view = new View()
    this.service = new Service()
    this.state = new AppState()
    initEventListeners()
    handleHashIfNeeded()   
}

function initEventListeners() {
    view.leftCivImage.onclick = () => showCivSelection(Side.left)
    view.leftCivPlaceholder.onclick = () => showCivSelection(Side.left)
    view.rightCivImage.onclick = () => showCivSelection(Side.right)
    view.rightCivPlaceholder.onclick = () => showCivSelection(Side.right)
    view.leftUnitImage.onclick = leftUnitImageClicked
    view.leftUnitPlaceholder.onclick = leftUnitImageClicked
    view.rightUnitImage.onclick = rightUnitImageClicked
    view.rightUnitPlaceholder.onclick = rightUnitImageClicked

    Utils.$("modalClose").onclick = view.hideOverlay
    Utils.$("button_random").onclick = randomMatchup
    Utils.$("button_reset").onclick = reset
    Utils.$("button_share").onclick = copyLink
}

function handleHashIfNeeded() {
    if (window.location.hash != null) {
        const code = window.location.hash.replace("#", "")
        loadCode(code)
    }
}

function loadCode(codeString: string) {
    if (!ShareCode.isValidCode(codeString)) {
        return 
    }

    let code = ShareCode.readCode(codeString)
    populate(code.leftCivId,
        service.getUnitByNumericId(code.leftUnitId).id,
        code.rightCivId,
        service.getUnitByNumericId(code.rightUnitId).id)
}

function showCivSelection(side: Side) {
    view.showCivs(service.getCivs())
    state.selectedSide = side
}

function leftUnitImageClicked() {
    view.showUnits(state.leftCiv)
    state.selectedSide = Side.left
}

function rightUnitImageClicked() {
    view.showUnits(state.rightCiv)
    state.selectedSide = Side.right
}

function civClicked(id: number) {
    const civ = service.getCiv(id)

    if (state.selectedSide == Side.left) {

        if (state.leftCiv == null) {
            view.toggleLeftCivVisibility(true)
        }

        state.leftCiv = civ
        view.leftCivImage.src = civ.image
        Utils.$("leftCivName").textContent = civ.name
    } else {

        if (state.rightCiv == null) {
            view.toggleRightCivVisibility(true)
        }

        state.rightCiv = civ
        view.rightCivImage.src = civ.image
        Utils.$("rightCivName").textContent = civ.name
    }

    view.hideOverlay()
 }

 function unitClicked(id: UnitId) {
    const unit = service.getUnit(id)
    const unitDescriptionHtml = Factory.unitDescriptionHtml(unit.name, unit.cost.food, unit.cost.wood, unit.cost.gold)

    var targetTable: string
    var civ: Civ
    if (state.selectedSide == Side.left) {

        if (state.leftUnit == null) {
            view.toggleLeftUnitVisibility(true)
        }

        state.leftUnit = unit
        view.leftUnitImage.src = unit.img
        targetTable = "leftStats"
        Utils.$("leftUnitName").innerHTML = unitDescriptionHtml
        civ = state.leftCiv
    } else {

        if (state.rightUnit == null) {
            view.toggleRightUnitVisibility(true)
        }

        state.rightUnit = unit
        view.rightUnitImage.src = unit.img
        targetTable = "rightStats"
        Utils.$("rightUnitName").innerHTML = unitDescriptionHtml
        civ = state.rightCiv
    }

    view.hideOverlay()

    showUnitStats(targetTable, unit, civ)
}

 function showUnitStats(tableId: string, unit: Unit, civ: Civ) {

    const civUnit = new CivUnit(unit, civ)
    var table = Utils.$(tableId) as HTMLTableElement
    var body = TableUtils.newBody(table)

    TableUtils.createRow(body, ["Stat", "Base", "Upgrades", "Special", "Total"]);
    TableUtils.createRow(body, ["HP",           civUnit.unit.hp, Formatter.amountUpgrade(civUnit.upgrades.hp), Formatter.percUpgrade(civUnit.special.hp), civUnit.total.hp]);
    TableUtils.createRow(body, ["Attack",       civUnit.unit.atk, `+${civUnit.upgrades.atk}`, Formatter.amountUpgrade(civUnit.special.atk), civUnit.total.atk]);
    TableUtils.createRow(body, ["RoF",          civUnit.unit.rof, "-", `${civUnit.special.rof != 0 ? `${civUnit.special.rof}%` : "-"}`, civUnit.total.rof.toFixed(2)]);
    TableUtils.createRow(body, ["AD",           civUnit.unit.ad, "-", "-", civUnit.unit.ad]);
    TableUtils.createRow(body, ["DPS",          civUnit.unit.dps().toFixed(2), "-", "-", civUnit.total.dps().toFixed(2)]);
    TableUtils.createRow(body, ["Melee armor",  civUnit.unit.ma, `+${civUnit.upgrades.ma}`, Formatter.amountUpgrade(civUnit.special.ma), civUnit.total.ma]);
    TableUtils.createRow(body, ["Pierce armor", civUnit.unit.pa, `+${civUnit.upgrades.pa}`, Formatter.amountUpgrade(civUnit.special.pa), civUnit.total.pa]);

    let rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        let row = rows[i];
        row.addEventListener('mouseover', (e) => statsHover(row.rowIndex, true) );
        row.addEventListener('mouseout', (e) => statsHover(row.rowIndex, false) );
    }

    if (state.canShowBattle()) {
        const l = new CivUnit(state.leftUnit, state.leftCiv)
        const r = new CivUnit(state.rightUnit, state.rightCiv)
        showBattle(l, r)
    }
 }

 function statsHover(row: number, on: boolean) {
    view.leftStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
    view.rightStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
 }

 function randomMatchup() {
    let civ1 = service.getRandomCiv()
    let civ2 = service.getRandomCiv()
    populate(
        civ1.id,
        civ1.units[Math.floor(Math.random() * civ1.units.length)].id,
        civ2.id,
        civ2.units[Math.floor(Math.random() * civ2.units.length)].id
    )
 }

 function copyLink() {

    if (!state.canCopyLink()) {
        return
    }

    let code = new ShareCode(state.leftCiv.id,
        state.leftUnit.numericId,
        state.rightCiv.id,
        state.rightUnit.numericId)

    Utils.copyToClipboard(code.generateLink())
 }

 function reset() {
    state.leftCiv = null
    state.rightCiv = null
    state.leftUnit = null
    state.rightUnit = null
    state.selectedSide = null
    view.reset()
 }

 function populate(civA: number, unitA: UnitId, civB: number, unitB: UnitId) {
    state.leftCiv = null
    state.rightCiv = null
    state.leftUnit = null
    state.rightUnit = null
    state.selectedSide = Side.left
    civClicked(civA)
    unitClicked(unitA)
    state.selectedSide = Side.right
    civClicked(civB)
    unitClicked(unitB) 
 }

 function showBattle(a: CivUnit, b: CivUnit) {

    let leftReport = createBattleReport(a, b)
    let rightReport = createBattleReport(b, a)

    renderBattleReport(a, b, leftReport, "battleLogLeft")
    renderBattleReport(b, a, rightReport, "battleLogRight")

    let winner: CivUnit
    let loser: CivUnit
    let winningReport: BattleReport
    let losingReport: BattleReport
    let lastLeft = leftReport.log[leftReport.log.length - 1]
    let lastRight = rightReport.log[rightReport.log.length - 1]
    if (lastLeft.time < lastRight.time) {
        winner = a
        loser = b
        winningReport = leftReport
        losingReport = rightReport
    } else if (lastLeft.time > lastRight.time) {
        winner = b
        loser = a
        winningReport = rightReport
        losingReport = leftReport
    } else {
        winner = null
    }

    // Result text
    if (winner != null) {

        let winnerTime = winningReport.log[winningReport.log.length - 1]
        let winnerHealthRemaining = winner.total.hp

        // Find the winner's HP remaing when the fight ended
        for (const log of losingReport.log) {
            if (log.time > winnerTime.time) {
                break
            }
            winnerHealthRemaining = log.hpLeft
        }

        let healthPerc = ((winnerHealthRemaining / winner.total.hp) * 100).toFixed(2)
        view.setResultHtml(`${winner.civ.adjective} ${winner.unit.name} defeats ${loser.civ.adjective} ${loser.unit.name} in ${winningReport.log.length} hits with ${winnerHealthRemaining} (${healthPerc}%) hit points remaining`)
    } else {
        view.setResultHtml("It's a draw")
    }

    // Summary text
    let l = Utils.$("leftSummaryText")
    l.innerHTML = `${a.unit.name} deals ${leftReport.effectiveDamagerPerHit} damage to ${b.unit.name} per hit:`
    l.innerHTML += `<br/>&nbsp;+ ${a.total.atk} standard damage`
    if (leftReport.bonusDamage > 0) {
        l.innerHTML += `<br/>&nbsp;+ ${leftReport.bonusDamage} bonus damage`
    }
    l.innerHTML += `<br/>&nbsp;- ${b.total.ma} melee armour`

    let r = Utils.$("rightSummaryText")
    r.innerHTML = `${b.unit.name} deals ${rightReport.effectiveDamagerPerHit} damage to ${a.unit.name} per hit:`
    r.innerHTML += `<br/>&nbsp;+ ${b.total.atk} standard damage`
    if (rightReport.bonusDamage > 0) {
        r.innerHTML += `<br/>&nbsp;+ ${rightReport.bonusDamage} bonus damage`
    }
    r.innerHTML += `<br/>&nbsp;- ${a.total.ma} melee armour`

    // Chart
    const chartData = new ChartData(a, leftReport, b, rightReport)
    this.view.renderGraph(chartData)
 }

 function createBattleReport(attacker: CivUnit, defender: CivUnit) {

    // TODO: Rof and AD might be at game speed 1, so would have to cater for 1.7

    // Bonus damage is currently non-accumulative
    let bonusDamage = 0

    for (const bonus of attacker.unit.atkBonuses) {
        for (const armourClass of defender.unit.armourClasses) {
            if (bonus.armourClass == armourClass) {
                bonusDamage += bonus.value
            }
        }
    }

    let effectiveDamage = attacker.total.atk + bonusDamage - defender.total.ma
    if (effectiveDamage < 1) {
        effectiveDamage = 1
    }
    let numsHitsToKill = Math.ceil(defender.total.hp / effectiveDamage)
    let timeTakenToKill = attacker.unit.ad + (numsHitsToKill * attacker.total.rof)

    let entries: BattleLogEntry[] = []
    let totDamage = 0
    for (let i = 0; i < numsHitsToKill; i++) {

        totDamage += effectiveDamage

        let entry = new BattleLogEntry(
            i + 1,
            attacker.unit.ad + (i*attacker.total.rof),
            effectiveDamage,
            totDamage,
            defender.total.hp - totDamage
        )

        entries.push(entry)
    }

    return new BattleReport(effectiveDamage, bonusDamage, entries)
 }

 function renderBattleReport(attacker: CivUnit, defender: CivUnit, report: BattleReport, tableId: string) {

    let log = Utils.$(tableId) as HTMLTableElement
    let body = TableUtils.newBody(log)

    let bonus = `${attacker.unit.name} deals <b>${report.bonusDamage}</b> bonus damage to ${defender.unit.name}`
    TableUtils.createMergedRow(body, `<p style="padding-top:16px; padding-bottom:16px">${bonus}</p>`, 5);
    TableUtils.createRow(body, ["Hit", "Time", "Damage", "Total", "HP left"]);
    for (let i = 0; i < report.log.length; i++) {
        let entry = report.log[i]

        TableUtils.createRow(body, [
            entry.hit,
            `${entry.time.toFixed(2)}`,
            entry.damage, 
            entry.total, 
            entry.hpLeft
        ]);
    }
 }

class BattleReport {
    effectiveDamagerPerHit: number
    bonusDamage: number
    log: BattleLogEntry[]

    constructor(effectiveDamagerPerHit: number, bonusDamage: number, log: BattleLogEntry[]) {
        this.effectiveDamagerPerHit = effectiveDamagerPerHit
        this.bonusDamage = bonusDamage
        this.log = log
    }
}

 class BattleLogEntry {
    hit: number
    time: number
    damage: number
    total: number
    hpLeft: number

    constructor(hit: number, time: number, damage: number, total: number, hpLeft: number) {
        this.hit = hit
        this.time = time
        this.damage = damage
        this.total = total
        this.hpLeft = hpLeft
    }
 }
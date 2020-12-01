window.onload = initialise;
window.onclick = function(event: MouseEvent) {
    if (event.target == modalOverlay) {
        hideOverlay()
    }
}

var leftCivImage: HTMLImageElement
var rightCivImage: HTMLImageElement
var leftUnitImage: HTMLImageElement
var rightUnitImage: HTMLImageElement
var leftStatsTable: HTMLTableElement
var rightStatsTable: HTMLTableElement

var modalOverlay: HTMLDivElement
var modalContent: HTMLDivElement

enum Side {
    left,
    right
}

var state = {
    left: {
        civ: null,
        unit: null
    }, 
    right: {
        civ: null,
        unit: null
    },
    selectedSide: null
}

function initialise() {

    leftCivImage = Utils.$("leftCivImage") as HTMLImageElement
    rightCivImage = Utils.$("rightCivImage") as HTMLImageElement
    leftCivImage.onclick = leftCivImageClicked
    rightCivImage.onclick = rightCivImageClicked

    leftUnitImage = Utils.$("leftUnitImage") as HTMLImageElement
    rightUnitImage = Utils.$("rightUnitImage") as HTMLImageElement
    leftUnitImage.addEventListener("click", leftUnitImageClicked);
    rightUnitImage.addEventListener("click", rightUnitImageClicked);

    leftStatsTable = Utils.$("leftStats") as HTMLTableElement
    rightStatsTable = Utils.$("rightStats") as HTMLTableElement

    modalOverlay = Utils.$("modalOverlay") as HTMLDivElement
    modalContent = Utils.$("modalContent") as HTMLDivElement

    Utils.$("modalClose").onclick = hideOverlay
    Utils.$("button_random").onclick = () => populateWithOption(null)
    Utils.$("button_share").onclick = () => copyLink()

    if (window.location.hash != null) {
        const code = window.location.hash.replace("#", "");
        if (code.length == 8) {
            loadCode(code)
        }
    }
}

function loadCode(codeString: string) {
    let code = Code.readCode(codeString)
    populate(code.leftCivId, getUnit(code.leftUnitId).id, code.rightCivId, getUnit(code.rightUnitId).id)
}

function showOverlay() {
    modalOverlay.classList.remove("modalHidden");
    modalOverlay.classList.add("modalVisible");
}

function hideOverlay() {
    // Utils.hide(modalOverlay);

    modalOverlay.classList.remove("modalVisible");
    modalOverlay.classList.add("modalHidden");
}

function leftCivImageClicked() {
    modalContent.innerHTML = "";
    civs.forEach(function(civ) {
        modalContent.innerHTML += WidgetFactory.civ(civ.id, civ.name, civ.image);
    });
    state.selectedSide = Side.left;
    showOverlay();
}

function rightCivImageClicked() {
    modalContent.innerHTML = "";
    civs.forEach(function(civ) {
        modalContent.innerHTML += WidgetFactory.civ(civ.id, civ.name, civ.image);
    });
    state.selectedSide = Side.right;
    showOverlay();
}

function leftUnitImageClicked() {
    if (state.left.civ == null) {
        return;
    }

    state.selectedSide = Side.left;

    modalContent.innerHTML = "";
    state.left.civ.units.forEach(function(unit) {
        modalContent.innerHTML += WidgetFactory.unit(unit);
    });

    showOverlay();
}

function rightUnitImageClicked() {
    if (state.right.civ == null) {
        return;
    }

    state.selectedSide = Side.right;

    modalContent.innerHTML = "";
    state.right.civ.units.forEach(function(unit) {
        modalContent.innerHTML += WidgetFactory.unit(unit);
    });

    showOverlay();
}

function getCiv(id: number) {
    for (let i = 0; i < civs.length; i++) {
        const civ = civs[i]
        if (civ.id == id) {
            return civ
        }
    }
}

function civClicked(id: number) {
    const civ = getCiv(id)

    if (state.selectedSide == Side.left) {
        state.left.civ = civ
        leftCivImage.src = civ.image
        Utils.$("leftCivName").textContent = civ.name
    } else {
        state.right.civ = civ
        rightCivImage.src = civ.image
        Utils.$("rightCivName").textContent = civ.name
    }

    hideOverlay()
 }

 function unitClicked(id: UnitId) {
    const unit = units[id] as Unit
    let unitDescription = `${unit.name}
    <br/>
    <img src="https://vignette.wikia.nocookie.net/ageofempires/images/5/5f/Aoe2de_food.png/revision/latest/scale-to-width-down/16?cb=20200417075725"></img>
    ${unit.cost.food}`
    if (unit.cost.gold > 0) {
        unitDescription += ` <img src="https://vignette.wikia.nocookie.net/ageofempires/images/4/49/Aoe2de_gold.png/revision/latest/scale-to-width-down/16?cb=20200417080000"></img>
        ${unit.cost.gold}`
    }
    if (unit.cost.wood > 0) {
        unitDescription += ` <img src="https://vignette.wikia.nocookie.net/ageofempires/images/8/84/Aoe2de_wood.png/revision/latest/scale-to-width-down/16?cb=20200417075938"></img>
        ${unit.cost.wood}`
    }

    var targetTable: string
    var civ: Civ
    if (state.selectedSide == Side.left) {
        state.left.unit = unit
        leftUnitImage.src = unit.img
        targetTable = "leftStats"
        Utils.$("leftUnitName").innerHTML = unitDescription
        civ = state.left.civ
    } else {
        state.right.unit = unit
        rightUnitImage.src = unit.img
        targetTable = "rightStats"
        Utils.$("rightUnitName").innerHTML = unitDescription
        civ = state.right.civ
    }

    hideOverlay()

    showUnitStats(targetTable, unit, civ)
}

 function showUnitStats(tableId: string, unit: Unit, civ: Civ) {

    const civUnit = new CivUnit(unit, civ)
    var table = Utils.$(tableId) as HTMLTableElement;
    var body = TableUtils.newBody(table);

    TableUtils.createRow(body, ["Stat", "Base", "Upgrades", "Special", "Total"]);
    TableUtils.createRow(body, ["HP", civUnit.unit.hp, `${civUnit.upgrades.hp != 0 ? `+${civUnit.upgrades.hp}` : "-"}`, `${civUnit.special.hp != 0 ? `+${civUnit.special.hp}%` : "-"}`, civUnit.total.hp]);
    TableUtils.createRow(body, ["Attack", civUnit.unit.atk, `+${civUnit.upgrades.atk}`, `${civUnit.special.atk != 0 ? `+${civUnit.special.atk}` : "-"}`, civUnit.total.atk]);
    TableUtils.createRow(body, ["RoF", civUnit.unit.rof, "-", `${civUnit.special.rof != 0 ? `${civUnit.special.rof}%` : "-"}`, civUnit.total.rof.toFixed(2)]);
    TableUtils.createRow(body, ["AD", civUnit.unit.ad, "-", "-", civUnit.unit.ad]);
    TableUtils.createRow(body, ["DPS", civUnit.unit.dps().toFixed(2), "-", "-", civUnit.total.dps().toFixed(2)]);
    TableUtils.createRow(body, ["Melee armor", civUnit.unit.ma, `+${civUnit.upgrades.ma}`, formatUpgradeValue(civUnit.special.ma), civUnit.total.ma]);
    TableUtils.createRow(body, ["Pierce armor", civUnit.unit.pa, `+${civUnit.upgrades.pa}`, formatUpgradeValue(civUnit.special.pa), civUnit.total.pa]);

    let rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        let row = rows[i];
        row.addEventListener('mouseover', (e) => statsHover(row.rowIndex, true) );
        row.addEventListener('mouseout', (e) => statsHover(row.rowIndex, false) );
    }

    if (state.left.unit != null && state.right.unit != null) {
        const l = new CivUnit(state.left.unit, state.left.civ)
        const r = new CivUnit(state.right.unit, state.right.civ)
        showBattle(l, r)
    }
 }

 function formatUpgradeValue(value) {
    return value != 0 ? `+${value}` : "-"
 }

 function statsHover(row: number, on: boolean) {
    leftStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
    rightStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
 }

 function populateWithOption(option: number) {

    switch (option) {
        case 0:
            populate(0, UnitId.condottiero, 2, UnitId.champion)
            break
        case 1:
            populate(4, UnitId.halbardier, 5, UnitId.eWoadRaider)
            break
        case 2:
            populate(14, UnitId.condottiero, 33, UnitId.champion)
            break
        case null:
            let civ1 = civs[Math.floor(Math.random() * civs.length)]
            let civ2 = civs[Math.floor(Math.random() * civs.length)]
            populate(
                civ1.id,
                civ1.units[Math.floor(Math.random() * civ1.units.length)].id,
                civ2.id,
                civ2.units[Math.floor(Math.random() * civ2.units.length)].id
            )
            break
    }
 }

 function copyLink() {

    if (state.left.civ == null ||
        state.left.unit == null ||
        state.right.civ == null ||
        state.right.unit == null) {
        return
    }

    let code = Code.createCode(state.left.civ.id,
        state.left.unit.numericId,
        state.right.civ.id,
        state.right.unit.numericId)

    let link = `${window.location.origin}/#${code}`;
    Utils.copyToClipboard(link)
 }

 function populate(civA: number, unitA: UnitId, civB: number, unitB: UnitId) {
    state.left.civ = null
    state.right.civ = null
    state.left.unit = null
    state.right.unit = null
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
        Utils.$("resultText").innerHTML = `${winner.civ.adjective} ${winner.unit.name} defeats ${loser.civ.adjective} ${loser.unit.name} in ${winningReport.log.length} hits with ${winnerHealthRemaining} (${healthPerc}%) hit points remaining`
    } else {
        Utils.$("resultText").innerHTML = "It's a draw"
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
 }

 function createBattleReport(attacker: CivUnit, defender: CivUnit) {

    // TODO: Rof and AD might be at game speed 1, so would have to cater for 1.7

    // Bonus damage is currently non-accumulative
    let bonusDamage = 0
    const bonuses = attacker.unit.atkBonuses

    for (const bonus of bonuses) {
        if (bonus.id == defender.unit.id || bonus.type == defender.unit.type) {
            bonusDamage = bonus.value
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

    let log = Utils.$(tableId) as HTMLParagraphElement
    let body = TableUtils.newBody(log);

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

 class Code {
    leftCivId: number
    leftUnitId: number
    rightCivId: number
    rightUnitId: number

    public static createCode(leftCivId: number, leftUnitId: number, rightCivId: number, rightUnitId: number) {
        return `${leftCivId}${leftUnitId}${rightCivId}${rightUnitId}`;
    }

    public static readCode(code: string) {
        return new Code(code)
    }

    constructor(code: string) {
        this.leftCivId = parseInt(code[0] + code[1])
        this.leftUnitId = parseInt(code[2] + code[3])
        this.rightCivId = parseInt(code[4] + code[5])
        this.rightUnitId = parseInt(code[6] + code[7])
    }
 }

 var WidgetFactory = {
    civ: function(id, name, imageUrl) {
        return `<div class="civCell" onClick="javascript:civClicked(${id})">
                   <img src="${imageUrl}"></img>
                   <p>${name}</p>
               </div>`;
    },
    unit: function(unit: Unit) {
        return `<div class="civCell" onClick="javascript:unitClicked('${unit.id}')">
                   <img src="${unit.img}"></img>
                   <p>${unit.name}</p>
               </div>`;
    }
 }

 var Utils = {
    hide: function (element) {
        element.style.display = "none";
    },
    show: function (element) {
        element.style.display = "block";
    },
    removeOptions: function (select) {
        var i, L = select.options.length - 1;
        for(i = L; i >= 0; i--) {
            select.remove(i);
        }
    },
    createOption: function (value, text) {
        var option = document.createElement("option");
        option.value = value;
        option.text = text;
        return option;
    },
    $: function (element: string) {
        return document.getElementById(element)
    },
    copyToClipboard: function(str) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
}

var TableUtils = {
    removeBody: function(table) {
        var body = table.querySelector('tbody');
        if (body != null) {
            body.parentNode.removeChild(body);
        }
    },
    createRow: function(body, values) {
        var row = body.insertRow() as HTMLTableRowElement;
        values.forEach(function(value) {
            var cell = row.insertCell();
            cell.innerHTML = value;
        });
    },
    createMergedRow: function(body, value, span) {
        var row = body.insertRow();
        var cell = row.insertCell();
        cell.colSpan = span;
        cell.innerHTML = value;
    },
    newBody: function(table) {
        TableUtils.removeBody(table);
        var body = table.createTBody();
        return body;
    }
}
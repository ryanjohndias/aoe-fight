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

    modalOverlay = Utils.$("modalOverlay") as HTMLDivElement
    modalContent = Utils.$("modalContent") as HTMLDivElement

    Utils.$("modalClose").onclick = hideOverlay
    Utils.$("debug").onclick = fillSelection
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
    Civs.forEach(function(civ) {
        modalContent.innerHTML += WidgetFactory.civ(civ.id, civ.name, civ.image);
    });
    state.selectedSide = Side.left;
    showOverlay();
}

function rightCivImageClicked() {
    modalContent.innerHTML = "";
    Civs.forEach(function(civ) {
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
    for (let i = 0; i < Civs.length; i++) {
        const civ = Civs[i]
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
    } else {
        state.right.civ = civ
        rightCivImage.src = civ.image
    }

    hideOverlay()
 }

 function unitClicked(id: UnitId) {
    const unit = units[id] as Unit

    var targetTable: string
    var civ
    if (state.selectedSide == Side.left) {
        state.left.unit = unit
        leftUnitImage.src = unit.img
        targetTable = "leftStats"
        civ = state.left.civ
    } else {
        state.right.unit = unit
        rightUnitImage.src = unit.img
        targetTable = "rightStats"
        civ = state.right.civ
    }

    hideOverlay()

    showUnitStats(targetTable, unit, civ)
}

 function showUnitStats(tableId: string, unit: Unit, civ) {

    const civUnit = new CivUnit(unit, civ)
    var table = Utils.$(tableId);
    var body = TableUtils.newBody(table);

    TableUtils.createRow(body, ["Stat", "Base", "Upgrades", "Special", "Total"]);
    TableUtils.createRow(body, ["HP", civUnit.unit.hp, "-", `${civUnit.special.hp != 0 ? `+${civUnit.special.hp}%` : "-"}`, civUnit.total.hp]);
    TableUtils.createRow(body, ["Attack", civUnit.unit.atk, `+${civUnit.upgrades.atk}`, `${civUnit.special.atk != 0 ? `+${civUnit.special.atk}` : "-"}`, civUnit.total.atk]);
    TableUtils.createRow(body, ["RoF", civUnit.unit.rof, "-", `${civUnit.special.rof != 0 ? `${civUnit.special.rof}%` : "-"}`, civUnit.total.rof.toFixed(2)]);
    TableUtils.createRow(body, ["DPS", civUnit.unit.dps().toFixed(2), "-", "-", civUnit.total.dps().toFixed(2)]);
    TableUtils.createRow(body, ["Melee armor", civUnit.unit.ma, `+${civUnit.upgrades.ma}`, "-", civUnit.total.ma]);
    TableUtils.createRow(body, ["Pierce armor", civUnit.unit.pa, `+${civUnit.upgrades.pa}`, "-", civUnit.total.pa]);

    if (state.left.unit != null && state.right.unit != null) {
        showBattle(new CivUnit(state.left.unit, state.left.civ), new CivUnit(state.right.unit, state.right.civ))
    }
 }

 function fillSelection() {
     state.selectedSide = Side.left
     civClicked(0)
     unitClicked(UnitId.condottiero)
     state.selectedSide = Side.right
     civClicked(5262523)
     unitClicked(UnitId.champion)
 }

 function showBattle(a: CivUnit, b: CivUnit) {
    createBattleLog(a, b, "battleLogLeft")
    createBattleLog(b, a, "battleLogRight")
 }

 function createBattleLog(attacker: CivUnit, defender: CivUnit, tableId: string) {

    // TODO: Rof might be at game speed 1, so would have to cater for 1.7
    // TODO: Take into account that first hit either hits immediately, or after a frame delay

    let effectiveDamage = attacker.total.atk - defender.total.ma
    let numsHitsToKill = Math.ceil(defender.total.hp / effectiveDamage)
    let timeTakenToKill = numsHitsToKill * attacker.total.rof

    let log = Utils.$(tableId) as HTMLParagraphElement
    let body = TableUtils.newBody(log);

    TableUtils.createMergedRow(body, `<p>${attacker.unit.name} attacks ${defender.unit.name}</p>`, 4);
    TableUtils.createRow(body, ["Hit", "Time", "Damage", "Total", "HP left"]);
    let totDamage = 0
    for (let i = 0; i < numsHitsToKill; i++) {
        totDamage += effectiveDamage
        TableUtils.createRow(body, [
            i + 1,
            `${(i*attacker.total.rof).toFixed(2)}`,
            effectiveDamage, 
            totDamage, 
            defender.total.hp - totDamage
        ]);
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
        var row = body.insertRow();
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
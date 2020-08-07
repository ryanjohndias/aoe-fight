window.onload = initialise;
window.onclick = function (event) {
    if (event.target == modalOverlay) {
        hideOverlay();
    }
};
var leftCivImage;
var rightCivImage;
var leftUnitImage;
var rightUnitImage;
var leftStatsTable;
var rightStatsTable;
var modalOverlay;
var modalContent;
var Side;
(function (Side) {
    Side[Side["left"] = 0] = "left";
    Side[Side["right"] = 1] = "right";
})(Side || (Side = {}));
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
};
function initialise() {
    leftCivImage = Utils.$("leftCivImage");
    rightCivImage = Utils.$("rightCivImage");
    leftCivImage.onclick = leftCivImageClicked;
    rightCivImage.onclick = rightCivImageClicked;
    leftUnitImage = Utils.$("leftUnitImage");
    rightUnitImage = Utils.$("rightUnitImage");
    leftUnitImage.addEventListener("click", leftUnitImageClicked);
    rightUnitImage.addEventListener("click", rightUnitImageClicked);
    leftStatsTable = Utils.$("leftStats");
    rightStatsTable = Utils.$("rightStats");
    modalOverlay = Utils.$("modalOverlay");
    modalContent = Utils.$("modalContent");
    Utils.$("modalClose").onclick = hideOverlay;
    Utils.$("debug_0").onclick = function () { return populateWithOption(0); };
    Utils.$("debug_1").onclick = function () { return populateWithOption(1); };
    Utils.$("debug_2").onclick = function () { return populateWithOption(2); };
    Utils.$("debug_random").onclick = function () { return populateWithOption(null); };
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
    civs.forEach(function (civ) {
        modalContent.innerHTML += WidgetFactory.civ(civ.id, civ.name, civ.image);
    });
    state.selectedSide = Side.left;
    showOverlay();
}
function rightCivImageClicked() {
    modalContent.innerHTML = "";
    civs.forEach(function (civ) {
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
    state.left.civ.units.forEach(function (unit) {
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
    state.right.civ.units.forEach(function (unit) {
        modalContent.innerHTML += WidgetFactory.unit(unit);
    });
    showOverlay();
}
function getCiv(id) {
    for (var i = 0; i < civs.length; i++) {
        var civ = civs[i];
        if (civ.id == id) {
            return civ;
        }
    }
}
function civClicked(id) {
    var civ = getCiv(id);
    if (state.selectedSide == Side.left) {
        state.left.civ = civ;
        leftCivImage.src = civ.image;
        Utils.$("leftCivName").textContent = civ.name;
    }
    else {
        state.right.civ = civ;
        rightCivImage.src = civ.image;
        Utils.$("rightCivName").textContent = civ.name;
    }
    hideOverlay();
}
function unitClicked(id) {
    var unit = units[id];
    var targetTable;
    var civ;
    if (state.selectedSide == Side.left) {
        state.left.unit = unit;
        leftUnitImage.src = unit.img;
        targetTable = "leftStats";
        Utils.$("leftUnitName").textContent = unit.name;
        civ = state.left.civ;
    }
    else {
        state.right.unit = unit;
        rightUnitImage.src = unit.img;
        targetTable = "rightStats";
        Utils.$("rightUnitName").textContent = unit.name;
        civ = state.right.civ;
    }
    hideOverlay();
    showUnitStats(targetTable, unit, civ);
}
function showUnitStats(tableId, unit, civ) {
    var civUnit = new CivUnit(unit, civ);
    var table = Utils.$(tableId);
    var body = TableUtils.newBody(table);
    TableUtils.createRow(body, ["Stat", "Base", "Upgrades", "Special", "Total"]);
    TableUtils.createRow(body, ["HP", civUnit.unit.hp, "-", "" + (civUnit.special.hp != 0 ? "+" + civUnit.special.hp + "%" : "-"), civUnit.total.hp]);
    TableUtils.createRow(body, ["Attack", civUnit.unit.atk, "+" + civUnit.upgrades.atk, "" + (civUnit.special.atk != 0 ? "+" + civUnit.special.atk : "-"), civUnit.total.atk]);
    TableUtils.createRow(body, ["RoF", civUnit.unit.rof, "-", "" + (civUnit.special.rof != 0 ? civUnit.special.rof + "%" : "-"), civUnit.total.rof.toFixed(2)]);
    TableUtils.createRow(body, ["AD", civUnit.unit.ad, "-", "-", civUnit.unit.ad]);
    TableUtils.createRow(body, ["DPS", civUnit.unit.dps().toFixed(2), "-", "-", civUnit.total.dps().toFixed(2)]);
    TableUtils.createRow(body, ["Melee armor", civUnit.unit.ma, "+" + civUnit.upgrades.ma, formatUpgradeValue(civUnit.special.ma), civUnit.total.ma]);
    TableUtils.createRow(body, ["Pierce armor", civUnit.unit.pa, "+" + civUnit.upgrades.pa, formatUpgradeValue(civUnit.special.pa), civUnit.total.pa]);
    var rows = table.rows;
    var _loop_1 = function () {
        var row = rows[i];
        row.addEventListener('mouseover', function (e) { return statsHover(row.rowIndex, true); });
        row.addEventListener('mouseout', function (e) { return statsHover(row.rowIndex, false); });
    };
    for (var i = 1; i < rows.length; i++) {
        _loop_1();
    }
    if (state.left.unit != null && state.right.unit != null) {
        showBattle(new CivUnit(state.left.unit, state.left.civ), new CivUnit(state.right.unit, state.right.civ));
    }
}
function formatUpgradeValue(value) {
    return value != 0 ? "+" + value : "-";
}
function statsHover(row, on) {
    leftStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
    rightStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
}
function populateWithOption(option) {
    switch (option) {
        case 0:
            populate(0, UnitId.condottiero, 2, UnitId.champion);
            break;
        case 1:
            populate(4, UnitId.halbardier, 5, UnitId.eWoadRaider);
            break;
        case 2:
            populate(14, UnitId.condottiero, 33, UnitId.champion);
            break;
        case null:
            var civ1 = civs[Math.floor(Math.random() * civs.length)];
            var civ2 = civs[Math.floor(Math.random() * civs.length)];
            populate(civ1.id, civ1.units[Math.floor(Math.random() * civ1.units.length)].id, civ2.id, civ2.units[Math.floor(Math.random() * civ2.units.length)].id);
            break;
    }
}
function populate(civA, unitA, civB, unitB) {
    state.left.civ = null;
    state.right.civ = null;
    state.left.unit = null;
    state.right.unit = null;
    state.selectedSide = Side.left;
    civClicked(civA);
    unitClicked(unitA);
    state.selectedSide = Side.right;
    civClicked(civB);
    unitClicked(unitB);
}
function showBattle(a, b) {
    var leftReport = createBattleReport(a, b);
    var rightReport = createBattleReport(b, a);
    renderBattleReport(a, b, leftReport, "battleLogLeft");
    renderBattleReport(b, a, rightReport, "battleLogRight");
    var winner;
    var lastLeft = leftReport.log[leftReport.log.length - 1];
    var lastRight = rightReport.log[rightReport.log.length - 1];
    if (lastLeft.time < lastRight.time) {
        winner = a;
    }
    else if (lastLeft.time > lastRight.time) {
        winner = b;
    }
    else {
        winner = null;
    }
    if (winner != null) {
        console.log("Winner is " + winner.unit.name + " (" + (winner == a ? "left" : "right") + ")");
    }
    else {
        console.log("It's a draw");
    }
}
function createBattleReport(attacker, defender) {
    // TODO: Rof and AD might be at game speed 1, so would have to cater for 1.7
    // Bonus damage is currently non-accumulative
    var bonusDamage = 0;
    var bonuses = attacker.unit.atkBonuses;
    for (var _i = 0, bonuses_1 = bonuses; _i < bonuses_1.length; _i++) {
        var bonus = bonuses_1[_i];
        if (bonus.id == defender.unit.id || bonus.type == defender.unit.type) {
            bonusDamage = bonus.value;
        }
    }
    var effectiveDamage = attacker.total.atk + bonusDamage - defender.total.ma;
    if (effectiveDamage < 1) {
        effectiveDamage = 1;
    }
    var numsHitsToKill = Math.ceil(defender.total.hp / effectiveDamage);
    var timeTakenToKill = attacker.unit.ad + (numsHitsToKill * attacker.total.rof);
    var entries = [];
    var totDamage = 0;
    for (var i = 0; i < numsHitsToKill; i++) {
        totDamage += effectiveDamage;
        var entry = new BattleLogEntry(i + 1, attacker.unit.ad + (i * attacker.total.rof), effectiveDamage, totDamage, defender.total.hp - totDamage);
        entries.push(entry);
    }
    return new BattleReport(bonusDamage, entries);
}
function renderBattleReport(attacker, defender, report, tableId) {
    var log = Utils.$(tableId);
    var body = TableUtils.newBody(log);
    var bonus = attacker.unit.name + " deals <b>" + report.bonusDamage + "</b> bonus damage to " + defender.unit.name;
    TableUtils.createMergedRow(body, "<p style=\"padding-top:16px; padding-bottom:16px\">" + bonus + "</p>", 5);
    TableUtils.createRow(body, ["Hit", "Time", "Damage", "Total", "HP left"]);
    for (var i = 0; i < report.log.length; i++) {
        var entry = report.log[i];
        TableUtils.createRow(body, [
            entry.hit,
            "" + entry.time.toFixed(2),
            entry.damage,
            entry.total,
            entry.hpLeft
        ]);
    }
}
var BattleReport = /** @class */ (function () {
    function BattleReport(bonusDamage, log) {
        this.bonusDamage = bonusDamage;
        this.log = log;
    }
    return BattleReport;
}());
var BattleLogEntry = /** @class */ (function () {
    function BattleLogEntry(hit, time, damage, total, hpLeft) {
        this.hit = hit;
        this.time = time;
        this.damage = damage;
        this.total = total;
        this.hpLeft = hpLeft;
    }
    return BattleLogEntry;
}());
var WidgetFactory = {
    civ: function (id, name, imageUrl) {
        return "<div class=\"civCell\" onClick=\"javascript:civClicked(" + id + ")\">\n                   <img src=\"" + imageUrl + "\"></img>\n                   <p>" + name + "</p>\n               </div>";
    },
    unit: function (unit) {
        return "<div class=\"civCell\" onClick=\"javascript:unitClicked('" + unit.id + "')\">\n                   <img src=\"" + unit.img + "\"></img>\n                   <p>" + unit.name + "</p>\n               </div>";
    }
};
var Utils = {
    hide: function (element) {
        element.style.display = "none";
    },
    show: function (element) {
        element.style.display = "block";
    },
    removeOptions: function (select) {
        var i, L = select.options.length - 1;
        for (i = L; i >= 0; i--) {
            select.remove(i);
        }
    },
    createOption: function (value, text) {
        var option = document.createElement("option");
        option.value = value;
        option.text = text;
        return option;
    },
    $: function (element) {
        return document.getElementById(element);
    }
};
var TableUtils = {
    removeBody: function (table) {
        var body = table.querySelector('tbody');
        if (body != null) {
            body.parentNode.removeChild(body);
        }
    },
    createRow: function (body, values) {
        var row = body.insertRow();
        values.forEach(function (value) {
            var cell = row.insertCell();
            cell.innerHTML = value;
        });
    },
    createMergedRow: function (body, value, span) {
        var row = body.insertRow();
        var cell = row.insertCell();
        cell.colSpan = span;
        cell.innerHTML = value;
    },
    newBody: function (table) {
        TableUtils.removeBody(table);
        var body = table.createTBody();
        return body;
    }
};
//# sourceMappingURL=main.js.map
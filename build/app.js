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
var service;
var state;
var Side;
(function (Side) {
    Side[Side["left"] = 0] = "left";
    Side[Side["right"] = 1] = "right";
})(Side || (Side = {}));
function initialise() {
    this.service = new Service();
    this.state = new AppState();
    initElements();
    initEventListeners();
    handleHashIfNeeded();
}
function initElements() {
    leftCivImage = Utils.$("leftCivImage");
    rightCivImage = Utils.$("rightCivImage");
    leftUnitImage = Utils.$("leftUnitImage");
    rightUnitImage = Utils.$("rightUnitImage");
    leftStatsTable = Utils.$("leftStats");
    rightStatsTable = Utils.$("rightStats");
    modalOverlay = Utils.$("modalOverlay");
    modalContent = Utils.$("modalContent");
}
function initEventListeners() {
    leftCivImage.onclick = leftCivImageClicked;
    rightCivImage.onclick = rightCivImageClicked;
    leftUnitImage.addEventListener("click", leftUnitImageClicked);
    rightUnitImage.addEventListener("click", rightUnitImageClicked);
    Utils.$("modalClose").onclick = hideOverlay;
    Utils.$("button_random").onclick = function () { return randomMatchup(); };
    Utils.$("button_share").onclick = function () { return copyLink(); };
}
function handleHashIfNeeded() {
    if (window.location.hash != null) {
        var code = window.location.hash.replace("#", "");
        if (code.length == 8) {
            loadCode(code);
        }
    }
}
function loadCode(codeString) {
    var code = ShareCode.readCode(codeString);
    populate(code.leftCivId, service.getUnitByNumericId(code.leftUnitId).id, code.rightCivId, service.getUnitByNumericId(code.rightUnitId).id);
}
function showOverlay() {
    modalOverlay.classList.remove("modalHidden");
    modalOverlay.classList.add("modalVisible");
}
function hideOverlay() {
    modalOverlay.classList.remove("modalVisible");
    modalOverlay.classList.add("modalHidden");
}
function leftCivImageClicked() {
    modalContent.innerHTML = "";
    service.getCivs().forEach(function (civ) {
        modalContent.innerHTML += WidgetFactory.civ(civ.id, civ.name, civ.image);
    });
    state.selectedSide = Side.left;
    showOverlay();
}
function rightCivImageClicked() {
    modalContent.innerHTML = "";
    service.getCivs().forEach(function (civ) {
        modalContent.innerHTML += WidgetFactory.civ(civ.id, civ.name, civ.image);
    });
    state.selectedSide = Side.right;
    showOverlay();
}
function leftUnitImageClicked() {
    if (state.leftCiv == null) {
        return;
    }
    state.selectedSide = Side.left;
    modalContent.innerHTML = "";
    state.leftCiv.units.forEach(function (unit) {
        modalContent.innerHTML += WidgetFactory.unit(unit);
    });
    showOverlay();
}
function rightUnitImageClicked() {
    if (state.rightCiv == null) {
        return;
    }
    state.selectedSide = Side.right;
    modalContent.innerHTML = "";
    state.rightCiv.units.forEach(function (unit) {
        modalContent.innerHTML += WidgetFactory.unit(unit);
    });
    showOverlay();
}
function civClicked(id) {
    var civ = service.getCiv(id);
    if (state.selectedSide == Side.left) {
        state.leftCiv = civ;
        leftCivImage.src = civ.image;
        Utils.$("leftCivName").textContent = civ.name;
    }
    else {
        state.rightCiv = civ;
        rightCivImage.src = civ.image;
        Utils.$("rightCivName").textContent = civ.name;
    }
    hideOverlay();
}
function unitClicked(id) {
    var unit = service.getUnit(id);
    var unitDescriptionHtml = Widgets.unitDescriptionHtml(unit);
    var targetTable;
    var civ;
    if (state.selectedSide == Side.left) {
        state.leftUnit = unit;
        leftUnitImage.src = unit.img;
        targetTable = "leftStats";
        Utils.$("leftUnitName").innerHTML = unitDescriptionHtml;
        civ = state.leftCiv;
    }
    else {
        state.rightUnit = unit;
        rightUnitImage.src = unit.img;
        targetTable = "rightStats";
        Utils.$("rightUnitName").innerHTML = unitDescriptionHtml;
        civ = state.rightCiv;
    }
    hideOverlay();
    showUnitStats(targetTable, unit, civ);
}
function showUnitStats(tableId, unit, civ) {
    var civUnit = new CivUnit(unit, civ);
    var table = Utils.$(tableId);
    var body = TableUtils.newBody(table);
    TableUtils.createRow(body, ["Stat", "Base", "Upgrades", "Special", "Total"]);
    TableUtils.createRow(body, ["HP", civUnit.unit.hp, "" + (civUnit.upgrades.hp != 0 ? "+" + civUnit.upgrades.hp : "-"), "" + (civUnit.special.hp != 0 ? "+" + civUnit.special.hp + "%" : "-"), civUnit.total.hp]);
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
    if (state.canShowBattle()) {
        var l = new CivUnit(state.leftUnit, state.leftCiv);
        var r = new CivUnit(state.rightUnit, state.rightCiv);
        showBattle(l, r);
    }
}
function formatUpgradeValue(value) {
    return value != 0 ? "+" + value : "-";
}
function statsHover(row, on) {
    leftStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
    rightStatsTable.rows[row].style.backgroundColor = on ? "#D3D3D3" : "#FFFFFF";
}
function randomMatchup() {
    var civ1 = service.getRandomCiv();
    var civ2 = service.getRandomCiv();
    populate(civ1.id, civ1.units[Math.floor(Math.random() * civ1.units.length)].id, civ2.id, civ2.units[Math.floor(Math.random() * civ2.units.length)].id);
}
function copyLink() {
    if (!state.canCopyLink()) {
        return;
    }
    var code = new ShareCode(state.leftCiv.id, state.leftUnit.numericId, state.rightCiv.id, state.rightUnit.numericId);
    Utils.copyToClipboard(code.generateLink());
}
function populate(civA, unitA, civB, unitB) {
    state.leftCiv = null;
    state.rightCiv = null;
    state.leftUnit = null;
    state.rightUnit = null;
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
    var loser;
    var winningReport;
    var losingReport;
    var lastLeft = leftReport.log[leftReport.log.length - 1];
    var lastRight = rightReport.log[rightReport.log.length - 1];
    if (lastLeft.time < lastRight.time) {
        winner = a;
        loser = b;
        winningReport = leftReport;
        losingReport = rightReport;
    }
    else if (lastLeft.time > lastRight.time) {
        winner = b;
        loser = a;
        winningReport = rightReport;
        losingReport = leftReport;
    }
    else {
        winner = null;
    }
    if (winner != null) {
        var winnerTime = winningReport.log[winningReport.log.length - 1];
        var winnerHealthRemaining = winner.total.hp;
        for (var _i = 0, _a = losingReport.log; _i < _a.length; _i++) {
            var log = _a[_i];
            if (log.time > winnerTime.time) {
                break;
            }
            winnerHealthRemaining = log.hpLeft;
        }
        var healthPerc = ((winnerHealthRemaining / winner.total.hp) * 100).toFixed(2);
        Utils.$("resultText").innerHTML = winner.civ.adjective + " " + winner.unit.name + " defeats " + loser.civ.adjective + " " + loser.unit.name + " in " + winningReport.log.length + " hits with " + winnerHealthRemaining + " (" + healthPerc + "%) hit points remaining";
    }
    else {
        Utils.$("resultText").innerHTML = "It's a draw";
    }
    var l = Utils.$("leftSummaryText");
    l.innerHTML = a.unit.name + " deals " + leftReport.effectiveDamagerPerHit + " damage to " + b.unit.name + " per hit:";
    l.innerHTML += "<br/>&nbsp;+ " + a.total.atk + " standard damage";
    if (leftReport.bonusDamage > 0) {
        l.innerHTML += "<br/>&nbsp;+ " + leftReport.bonusDamage + " bonus damage";
    }
    l.innerHTML += "<br/>&nbsp;- " + b.total.ma + " melee armour";
    var r = Utils.$("rightSummaryText");
    r.innerHTML = b.unit.name + " deals " + rightReport.effectiveDamagerPerHit + " damage to " + a.unit.name + " per hit:";
    r.innerHTML += "<br/>&nbsp;+ " + b.total.atk + " standard damage";
    if (rightReport.bonusDamage > 0) {
        r.innerHTML += "<br/>&nbsp;+ " + rightReport.bonusDamage + " bonus damage";
    }
    r.innerHTML += "<br/>&nbsp;- " + a.total.ma + " melee armour";
}
function createBattleReport(attacker, defender) {
    var bonusDamage = 0;
    for (var _i = 0, _a = attacker.unit.atkBonuses; _i < _a.length; _i++) {
        var bonus = _a[_i];
        for (var _b = 0, _c = defender.unit.armourClasses; _b < _c.length; _b++) {
            var armourClass = _c[_b];
            if (bonus.armourClass == armourClass) {
                bonusDamage += bonus.value;
            }
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
    return new BattleReport(effectiveDamage, bonusDamage, entries);
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
var BattleReport = (function () {
    function BattleReport(effectiveDamagerPerHit, bonusDamage, log) {
        this.effectiveDamagerPerHit = effectiveDamagerPerHit;
        this.bonusDamage = bonusDamage;
        this.log = log;
    }
    return BattleReport;
}());
var BattleLogEntry = (function () {
    function BattleLogEntry(hit, time, damage, total, hpLeft) {
        this.hit = hit;
        this.time = time;
        this.damage = damage;
        this.total = total;
        this.hpLeft = hpLeft;
    }
    return BattleLogEntry;
}());
var Widgets = (function () {
    function Widgets() {
    }
    Widgets.unitDescriptionHtml = function (unit) {
        var html = unit.name + "<br/><img src=\"" + Cost.imageUrlFood + "\"></img>&nbsp;" + unit.cost.food;
        if (unit.cost.gold > 0) {
            html += " <img src=\"" + Cost.imageUrlGold + "\"></img>&nbsp;" + unit.cost.gold;
        }
        if (unit.cost.wood > 0) {
            html += " <img src=\"" + Cost.imageUrlWood + "\"></img>&nbsp;" + unit.cost.wood;
        }
        return html;
    };
    return Widgets;
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
    },
    copyToClipboard: function (str) {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
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
var AppState = (function () {
    function AppState() {
    }
    AppState.prototype.canShowBattle = function () {
        return this.leftUnit != null && this.rightUnit != null;
    };
    AppState.prototype.canCopyLink = function () {
        return this.leftCiv != null &&
            this.leftUnit != null &&
            this.rightCiv != null &&
            this.rightUnit != null;
    };
    return AppState;
}());
var Civ = (function () {
    function Civ(id, name, adjective, image, units, meleeUpgrades, infantryArmourUpgrades, cavUpgrades, special) {
        this.id = id;
        this.name = name;
        this.adjective = adjective;
        this.image = image;
        this.units = units;
        this.meleeUpgrades = meleeUpgrades;
        this.infantryArmourUpgrades = infantryArmourUpgrades;
        this.cavUpgrades = cavUpgrades;
        this.special = special;
    }
    Civ.prototype.totalHPUpgrade = function (unitType) {
        var hp = 0;
        if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach(function (upgrade) { return hp += upgrade.hp; });
        }
        return hp;
    };
    Civ.prototype.totalSpecialHPUpgrade = function () {
        var hp = 0;
        this.special.infantry.forEach(function (upgrade) { return hp += upgrade.hp; });
        return hp;
    };
    Civ.prototype.totalMeleeAtkUpgrade = function () {
        var atk = 0;
        this.meleeUpgrades.forEach(function (upgrade) { return atk += upgrade.atk; });
        return atk;
    };
    Civ.prototype.totalSpecialAtkUpgrade = function () {
        var atk = 0;
        this.special.infantry.forEach(function (upgrade) { return atk += upgrade.atk; });
        return atk;
    };
    Civ.prototype.totalBlacksmithMAUpgrade = function (unitType) {
        var ma = 0;
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach(function (upgrade) { return ma += upgrade.ma; });
        }
        else if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach(function (upgrade) { return ma += upgrade.ma; });
        }
        return ma;
    };
    Civ.prototype.totalBlacksmithPAUpgrade = function (unitType) {
        var pa = 0;
        if (unitType == UnitType.infantry) {
            this.infantryArmourUpgrades.forEach(function (upgrade) { return pa += upgrade.pa; });
        }
        else if (unitType == UnitType.cavalry) {
            this.cavUpgrades.forEach(function (upgrade) { return pa += upgrade.pa; });
        }
        return pa;
    };
    Civ.prototype.totalSpecialMAUpgrade = function (unitId) {
        if (this.special.specificUnits == null) {
            return 0;
        }
        var ma = 0;
        var data = this.special.specificUnits;
        for (var i = 0; i < data.length; i++) {
            var upgrade = data[i];
            if (this.contains(upgrade.units, unitId)) {
                ma += upgrade.ma;
            }
        }
        return ma;
    };
    Civ.prototype.totalSpecialPAUpgrade = function (unitId) {
        if (this.special.specificUnits == null) {
            return 0;
        }
        var pa = 0;
        var data = this.special.specificUnits;
        for (var i = 0; i < data.length; i++) {
            var upgrade = data[i];
            if (this.contains(upgrade.units, unitId)) {
                pa += upgrade.pa;
            }
        }
        return pa;
    };
    Civ.prototype.contains = function (a, unitId) {
        var i = a.length;
        while (i--) {
            if (a[i] === unitId) {
                return true;
            }
        }
        return false;
    };
    return Civ;
}());
var CivData = (function () {
    function CivData(units, upgrades) {
        this.civs = [
            new Civ(10, "Aztecs", "Aztec", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png/revision/latest?cb=20191107173129", [units.champion, units.condottiero, units.eliteEagleWarrior, units.eliteJaguarWarrior, units.xolotl], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [], {
                infantry: [
                    { name: "Garland Wars", atk: 4, rof: 0, hp: 0, ma: 0, pa: 0 }
                ]
            }),
            new Civ(11, "Berbers", "Berber", "https://vignette.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png/revision/latest?cb=20191107173130", [units.cavalier, units.champion, units.condottiero, units.hussar, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(12, "Britons", "British", "https://vignette.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest?cb=20191107173130", [units.cavalier, units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(13, "Bulgarians", "Bulgarian", "https://vignette.wikia.nocookie.net/ageofempires/images/c/ce/CivIcon-Bulgarians.png/revision/latest/scale-to-width-down/104?cb=20191107173130", [units.cavalier, units.condottiero, units.eDismountedKonnik, units.halbardier, units.eKonnik, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [upgrades.bloodlines] }),
            new Civ(14, "Byzantines", "Byzantine", "https://vignette.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png/revision/latest?cb=20191107173131", [units.champion, units.condottiero, units.eCataphract, units.halbardier, units.hussar, units.heavyCamel, units.paladin], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(15, "Burmese", "Burmese", "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png/revision/latest?cb=20191107173131", [units.cavalier, units.champion, units.condottiero, units.eBattleElephant, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], {
                infantry: [
                    { name: "Civ bonus", atk: 3, rof: 0, hp: 0, ma: 0, pa: 0 }
                ]
            }),
            new Civ(16, "Celts", "Celtic", "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Celts.png/revision/latest?cb=20191107173132", [units.champion, units.condottiero, units.eWoadRaider, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
            new Civ(17, "Chinese", "Chinese", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png/revision/latest?cb=20191107173132", [units.cavalier, units.champion, units.condottiero, units.halbardier, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(18, "Cumans", "Cuman", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png/revision/latest?cb=20191107173133", [units.camel, units.champion, units.condottiero, units.eSteppeLancer, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(19, "Ethiopians", "Ethiopian", "https://vignette.wikia.nocookie.net/ageofempires/images/c/cb/CivIcon-Ethiopians.png/revision/latest?cb=20191107173133", [units.cavalier, units.condottiero, units.eShotel, units.halbardier, units.hussar, units.heavyCamel, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
            new Civ(20, "Franks", "Frank", "https://vignette.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png/revision/latest?cb=2019110717323", [units.champion, units.condottiero, units.halbardier, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(21, "Goths", "Goth", "https://vignette.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png/revision/latest?cb=20191107173238", [units.cavalier, units.champion, units.condottiero, units.eliteHuskarl, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
            new Civ(22, "Huns", "Hun", "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/CivIcon-Huns.png/revision/latest?cb=20191107173238", [units.condottiero, units.halbardier, units.hussar, units.paladin, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(23, "Incas", "Incan", "https://vignette.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png/revision/latest?cb=20191107173239", [units.champion, units.condottiero, units.eliteEagleWarrior, units.eKamayuk, units.halbardier, units.xolotl], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [], { infantry: [] }),
            new Civ(24, "Indians", "Indian", "https://vignette.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png/revision/latest?cb=20191107173239", [units.champion, units.condottiero, units.halbardier, units.hussar, units.imperialCamel, units.knight], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
            new Civ(25, "Italians", "Italian", "https://vignette.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png/revision/latest?cb=20191116050557", [units.cavalier, units.champion, units.condottiero, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], {
                infantry: [],
                specificUnits: [
                    { name: "Pavise", atk: 0, rof: 0, hp: 0, ma: 1, pa: 1, units: [UnitId.condottiero] }
                ]
            }),
            new Civ(26, "Japanese", "Japanese", "https://vignette.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest?cb=20191107173240", [units.cavalier, units.champion, units.condottiero, units.eSamurai, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], {
                infantry: [
                    { name: "Civ bonus", atk: 0, rof: 33, hp: 0, ma: 0, pa: 0 }
                ]
            }),
            new Civ(27, "Khmer", "Khmer", "https://vignette.wikia.nocookie.net/ageofempires/images/e/ec/CivIcon-Khmer.png/revision/latest?cb=20191107173240", [units.cavalier, units.condottiero, units.eBattleElephant, units.halbardier, units.hussar, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(28, "Koreans", "Korean", "https://vignette.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png/revision/latest?cb=20191107173241", [units.cavalier, units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
            new Civ(29, "Lithuanians", "Lithuanian", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png/revision/latest?cb=20191107173241", [units.champion, units.condottiero, units.eLeitis, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(30, "Magyars", "Magyar", "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png/revision/latest?cb=20191107173242", [units.champion, units.condottiero, units.eMagyarHuszar, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(31, "Malians", "Malian", "https://vignette.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png/revision/latest?cb=20191107173334", [units.cavalier, units.champion, units.condottiero, units.heavyCamel], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], {
                infantry: [
                    { name: "Civ bonus", atk: 0, rof: 0, hp: 0, ma: 0, pa: 3 }
                ]
            }),
            new Civ(32, "Malay", "Malay", "https://vignette.wikia.nocookie.net/ageofempires/images/c/c3/CivIcon-Malay.png/revision/latest?cb=20191107173334", [units.cavalier, units.condottiero, units.eBattleElephant, units.eKarambit, units.halbardier, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor], { infantry: [] }),
            new Civ(33, "Mayans", "Mayan", "https://vignette.wikia.nocookie.net/ageofempires/images/0/05/CivIcon-Mayans.png/revision/latest?cb=20191107173335", [units.condottiero, units.eliteEagleWarrior, units.halbardier, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [], { infantry: [] }),
            new Civ(34, "Mongols", "Mongol", "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png/revision/latest?cb=20191107173335", [units.cavalier, units.champion, units.condottiero, units.eSteppeLancer, units.hussar, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor], { infantry: [] }),
            new Civ(35, "Persians", "Persian", "https://vignette.wikia.nocookie.net/ageofempires/images/a/ad/CivIcon-Persians.png/revision/latest?cb=20191107173335", [units.condottiero, units.eWarElephant, units.halbardier, units.hussar, units.heavyCamel, units.paladin, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(36, "Portuguese", "Portuguese", "https://vignette.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png/revision/latest?cb=20191107173336", [units.cavalier, units.champion, units.condottiero, units.halbardier], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(37, "Saracens", "Saracen", "https://vignette.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png/revision/latest?cb=20191107173336", [units.champion, units.condottiero, units.hussar, units.heavyCamel, units.knight], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(38, "Slavs", "Slavic", "https://vignette.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png/revision/latest?cb=20191107173337", [units.eBoyar, units.cavalier, units.champion, units.condottiero, units.halbardier, units.hussar], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(39, "Spanish", "Spanish", "https://vignette.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png/revision/latest?cb=20191107173337", [units.champion, units.condottiero, units.halbardier, units.hussar, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(40, "Tatars", "Tatar", "https://vignette.wikia.nocookie.net/ageofempires/images/f/f2/CivIcon-Tatars.png/revision/latest?cb=20191107173338", [units.cavalier, units.condottiero, units.eSteppeLancer, units.halbardier, units.hussar, units.heavyCamel, units.eKeshik, units.twoHandedSwordsman], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(41, "Teutons", "Teutonic", "https://vignette.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png/revision/latest?cb=20191107173408", [units.champion, units.condottiero, units.eliteTeutonicKnight, units.halbardier, units.paladin], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(42, "Turks", "Turkish", "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png/revision/latest?cb=20191107173409", [units.cavalier, units.champion, units.condottiero, units.hussar, units.heavyCamel], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(43, "Vietnamese", "Vietnamese", "https://vignette.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png/revision/latest?cb=20191107173409", [units.cavalier, units.champion, units.condottiero, units.eBattleElephant, units.halbardier], [upgrades.forging, upgrades.ironCasting], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.bloodlines, upgrades.scaleBardingArmor, upgrades.chainBardingArmor, upgrades.plateBardingArmor], { infantry: [] }),
            new Civ(44, "Vikings", "Viking", "https://vignette.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png/revision/latest?cb=20191107173410", [units.eBerserk, units.cavalier, units.champion, units.condottiero], [upgrades.forging, upgrades.ironCasting, upgrades.blastFurnace], [upgrades.scaleMailArmor, upgrades.chainMailArmor, upgrades.plateMailArmor], [upgrades.scaleBardingArmor, upgrades.chainBardingArmor], {
                infantry: [
                    { name: "Civ bonus", atk: 0, rof: 0, hp: 20, ma: 0, pa: 0 }
                ]
            })
        ];
    }
    return CivData;
}());
var CivUnit = (function () {
    function CivUnit(unit, civ) {
        this.unit = unit;
        this.civ = civ;
        var hpUpgrades = civ.totalHPUpgrade(unit.type);
        var hpSpecial = civ.totalSpecialHPUpgrade();
        var hpTotal = unit.hp + (this.unit.hp * (hpSpecial / 100)) + hpUpgrades;
        var atkUpgrades = civ.totalMeleeAtkUpgrade();
        var atkSpecial = civ.totalSpecialAtkUpgrade();
        var atkTotal = unit.atk + atkUpgrades + atkSpecial;
        var rofSpecial = 0;
        civ.special.infantry.forEach(function (upgrade) {
            rofSpecial -= upgrade.rof;
        });
        var rofTotal = unit.rof + (rofSpecial / 100);
        var maUpgrades = civ.totalBlacksmithMAUpgrade(unit.type);
        var paUpgrades = civ.totalBlacksmithPAUpgrade(unit.type);
        var maSpecial = civ.totalSpecialMAUpgrade(unit.id);
        var paSpecial = civ.totalSpecialPAUpgrade(unit.id);
        var maTotal = unit.ma + maSpecial + maUpgrades;
        var paTotal = unit.pa + paSpecial + paUpgrades;
        this.upgrades = new Upgrade(hpUpgrades, atkUpgrades, 0, maUpgrades, paUpgrades);
        this.special = new Upgrade(hpSpecial, atkSpecial, rofSpecial, maSpecial, paSpecial);
        this.total = new Upgrade(hpTotal, atkTotal, rofTotal, maTotal, paTotal);
    }
    return CivUnit;
}());
var Cost = (function () {
    function Cost(f, g, w, s) {
        this.food = f;
        this.gold = g;
        this.wood = w;
        this.stone = s;
    }
    Cost.imageUrlFood = "https://vignette.wikia.nocookie.net/ageofempires/images/5/5f/Aoe2de_food.png/revision/latest/scale-to-width-down/16?cb=20200417075725";
    Cost.imageUrlWood = "https://vignette.wikia.nocookie.net/ageofempires/images/8/84/Aoe2de_wood.png/revision/latest/scale-to-width-down/16?cb=20200417075938";
    Cost.imageUrlGold = "https://vignette.wikia.nocookie.net/ageofempires/images/4/49/Aoe2de_gold.png/revision/latest/scale-to-width-down/16?cb=20200417080000";
    return Cost;
}());
var UnitType;
(function (UnitType) {
    UnitType[UnitType["infantry"] = 0] = "infantry";
    UnitType[UnitType["cavalry"] = 1] = "cavalry";
})(UnitType || (UnitType = {}));
var ArmourClass;
(function (ArmourClass) {
    ArmourClass[ArmourClass["infantry"] = 0] = "infantry";
    ArmourClass[ArmourClass["cavalry"] = 1] = "cavalry";
    ArmourClass[ArmourClass["uniqueUnit"] = 2] = "uniqueUnit";
    ArmourClass[ArmourClass["eagleWarrior"] = 3] = "eagleWarrior";
    ArmourClass[ArmourClass["camel"] = 4] = "camel";
    ArmourClass[ArmourClass["warElephant"] = 5] = "warElephant";
    ArmourClass[ArmourClass["mameluke"] = 6] = "mameluke";
    ArmourClass[ArmourClass["condottiero"] = 7] = "condottiero";
    ArmourClass[ArmourClass["spearman"] = 8] = "spearman";
})(ArmourClass || (ArmourClass = {}));
var UnitId;
(function (UnitId) {
    UnitId["champion"] = "champion";
    UnitId["condottiero"] = "condottiero";
    UnitId["halbardier"] = "halbardier";
    UnitId["hussar"] = "hussar";
    UnitId["eliteEagleWarrior"] = "eliteEagleWarrior";
    UnitId["eliteHuskarl"] = "eliteHuskarl";
    UnitId["eliteJaguarWarrior"] = "eliteJaguarWarrior";
    UnitId["eliteTeutonicKnight"] = "eliteTeutonicKnight";
    UnitId["eWoadRaider"] = "eWoadRaider";
    UnitId["eShotel"] = "eShotel";
    UnitId["eKarambit"] = "eKarambit";
    UnitId["eDismountedKonnik"] = "eDismountedKonnik";
    UnitId["twoHandedSwordsman"] = "twoHandedSwordsman";
    UnitId["xolotl"] = "xolotl";
    UnitId["knight"] = "knight";
    UnitId["cavalier"] = "cavalier";
    UnitId["paladin"] = "paladin";
    UnitId["camel"] = "camel";
    UnitId["heavyCamel"] = "heavyCamel";
    UnitId["imperialCamel"] = "imperialCamel";
    UnitId["eBattleElephant"] = "eBattleElephant";
    UnitId["eSteppeLancer"] = "eSteppeLancer";
    UnitId["eLeitis"] = "eLeitis";
    UnitId["eKeshik"] = "eKeshik";
    UnitId["eKonnik"] = "eKonnik";
    UnitId["eBoyar"] = "eBoyar";
    UnitId["eSamurai"] = "eSamurai";
    UnitId["eWarElephant"] = "eWarElephant";
    UnitId["eCataphract"] = "eCataphract";
    UnitId["eBerserk"] = "eBerserk";
    UnitId["eMagyarHuszar"] = "eMagyarHuszar";
    UnitId["eKamayuk"] = "eKamayuk";
})(UnitId || (UnitId = {}));
var AttackBonus = (function () {
    function AttackBonus(armourClass, value) {
        this.armourClass = armourClass;
        this.value = value;
    }
    return AttackBonus;
}());
var Service = (function () {
    function Service() {
        this.unitData = new UnitData();
        this.civData = new CivData(this.unitData.units, new UpgradeData().upgrades);
    }
    Service.prototype.getCiv = function (id) {
        for (var _i = 0, _a = this.civData.civs; _i < _a.length; _i++) {
            var civ = _a[_i];
            if (civ.id == id) {
                return civ;
            }
        }
        return null;
    };
    Service.prototype.getUnit = function (identifier) {
        return this.unitData.units[identifier];
    };
    Service.prototype.getUnitByNumericId = function (id) {
        for (var _i = 0, _a = Object.keys(this.unitData.units); _i < _a.length; _i++) {
            var unitId = _a[_i];
            var unit = this.unitData.units[unitId];
            if (unit.numericId == id) {
                return unit;
            }
        }
        return null;
    };
    Service.prototype.getCivs = function () {
        return this.civData.civs;
    };
    Service.prototype.getRandomCiv = function () {
        return this.civData.civs[Math.floor(Math.random() * this.civData.civs.length)];
    };
    return Service;
}());
var ShareCode = (function () {
    function ShareCode(leftCivId, leftUnitId, rightCivId, rightUnitId) {
        this.leftCivId = leftCivId;
        this.leftUnitId = leftUnitId;
        this.rightCivId = rightCivId;
        this.rightUnitId = rightUnitId;
    }
    ShareCode.readCode = function (code) {
        var parse = function (code, index) { return parseInt(code.substr(index, 2)); };
        return new ShareCode(parse(code, 0), parse(code, 2), parse(code, 4), parse(code, 6));
    };
    ShareCode.prototype.getCode = function () {
        return "" + this.leftCivId + this.leftUnitId + this.rightCivId + this.rightUnitId;
    };
    ShareCode.prototype.generateLink = function () {
        return window.location.origin + "/#" + this.getCode();
    };
    return ShareCode;
}());
var Unit = (function () {
    function Unit(id, numericId, name, type, img, cost, hp, atk, rof, ad, ma, pa, atkBonuses, armourClasses) {
        this.id = id;
        this.numericId = numericId;
        this.name = name;
        this.type = type;
        this.img = img;
        this.cost = cost;
        this.hp = hp;
        this.atk = atk;
        this.rof = rof;
        this.ad = ad;
        this.ma = ma;
        this.pa = pa;
        this.atkBonuses = atkBonuses;
        this.armourClasses = armourClasses;
    }
    Unit.prototype.dps = function () {
        return this.atk / this.rof;
    };
    return Unit;
}());
var UnitData = (function () {
    function UnitData() {
        this.units = {
            champion: new Unit(UnitId.champion, 10, "Champion", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/54/Champion_aoe2DE.png/revision/latest?cb=20200402012808", new Cost(60, 20, 0, 0), 70, 13, 2.0, 0.63, 1, 1, [new AttackBonus(ArmourClass.eagleWarrior, 8)], [ArmourClass.infantry]),
            condottiero: new Unit(UnitId.condottiero, 11, "Condottiero", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/CondottieroIcon-DE.png/revision/latest?cb=20191230141010", new Cost(50, 35, 0, 0), 80, 10, 1.9, 0.75, 1, 0, [], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit,
                ArmourClass.condottiero,
            ]),
            halbardier: new Unit(UnitId.halbardier, 12, "Halbardier", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/aa/Halberdier_aoe2DE.png/revision/latest?cb=20200403174747", new Cost(35, 0, 25, 0), 60, 6, 3.05, 0.5, 0, 0, [
                new AttackBonus(ArmourClass.camel, 26),
                new AttackBonus(ArmourClass.cavalry, 32),
                new AttackBonus(ArmourClass.eagleWarrior, 1),
                new AttackBonus(ArmourClass.warElephant, 28),
                new AttackBonus(ArmourClass.mameluke, 11)
            ], [
                ArmourClass.infantry,
                ArmourClass.spearman
            ]),
            hussar: new Unit(UnitId.hussar, 13, "Hussar", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Hussar_aoe2DE.png/revision/latest?cb=20200403174747", new Cost(80, 0, 0, 0), 75, 7, 1.9, 0.95, 0, 2, [], [
                ArmourClass.cavalry
            ]),
            eliteEagleWarrior: new Unit(UnitId.eliteEagleWarrior, 14, "Elite Eagle Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/a5/Eliteeaglewarrior_aoe2DE.png/revision/latest?cb=20200331191114", new Cost(20, 50, 0, 0), 60, 9, 2, 0.8, 0, 4, [
                new AttackBonus(ArmourClass.cavalry, 3),
                new AttackBonus(ArmourClass.camel, 2)
            ], [
                ArmourClass.cavalry
            ]),
            eliteHuskarl: new Unit(UnitId.eliteHuskarl, 15, "Elite Huskarl", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/79/HuskarlIcon-DE.png/revision/latest?cb=20191230145804", new Cost(52, 26, 0, 0), 70, 12, 2, 0.8, 0, 8, [new AttackBonus(ArmourClass.eagleWarrior, 3)], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eliteJaguarWarrior: new Unit(UnitId.eliteJaguarWarrior, 16, "Elite Jaguar Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/3/32/JaguarWarriorIcon-DE.png/revision/latest?cb=20191230143816", new Cost(60, 30, 0, 0), 75, 12, 2, 0.8, 2, 1, [
                new AttackBonus(ArmourClass.infantry, 11),
                new AttackBonus(ArmourClass.eagleWarrior, 2),
                new AttackBonus(ArmourClass.condottiero, 10)
            ], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eliteTeutonicKnight: new Unit(UnitId.eliteTeutonicKnight, 17, "Elite Teutonic Knight", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/9/95/TeutonicKnightIcon-DE.png/revision/latest?cb=20200325131355", new Cost(85, 40, 0, 0), 100, 17, 2.0, 0.75, 10, 2, [new AttackBonus(ArmourClass.eagleWarrior, 4)], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eWoadRaider: new Unit(UnitId.eWoadRaider, 18, "Elite Woad Raider", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/55/WoadRaiderIcon-DE.png/revision/latest?cb=20191230150759", new Cost(65, 25, 0, 0), 80, 13, 2, 0.72, 0, 1, [new AttackBonus(ArmourClass.eagleWarrior, 3)], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eShotel: new Unit(UnitId.eShotel, 19, "Elite Shotel Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/0/03/Shotelwarrioricon-DE.png/revision/latest?cb=20191210075606", new Cost(50, 30, 0, 0), 50, 18, 2, 0.75, 0, 1, [new AttackBonus(ArmourClass.eagleWarrior, 2)], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eKarambit: new Unit(UnitId.eKarambit, 20, "Elite Karambit Warrior", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/75/Karambitwarrioricon-DE.png/revision/latest/scale-to-width-down/256?cb=20191117115320", new Cost(25, 15, 0, 0), 40, 7, 2, 0.81, 1, 1, [new AttackBonus(ArmourClass.eagleWarrior, 2)], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eDismountedKonnik: new Unit(UnitId.eDismountedKonnik, 21, "Elite Dismounted Konnik", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/b5/Konnikdismountedicon.png/revision/latest/scale-to-width-down/256?cb=20191110154253", new Cost(60, 70, 0, 0), 50, 13, 2.4, 0.7, 0, 1, [], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            twoHandedSwordsman: new Unit(UnitId.twoHandedSwordsman, 22, "Two-Handed Swordsman", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/3/3c/Twohanded_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401184348", new Cost(60, 20, 0, 0), 60, 12, 2, 0.5, 0, 1, [new AttackBonus(ArmourClass.eagleWarrior, 8)], [
                ArmourClass.infantry
            ]),
            xolotl: new Unit(UnitId.xolotl, 23, "Xolotl Warrior", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/6/68/Xolotlicon.png/revision/latest/scale-to-width-down/256?cb=20191231081129", new Cost(60, 75, 0, 0), 100, 10, 1.8, 0.68, 2, 2, [], [
                ArmourClass.cavalry
            ]),
            knight: new Unit(UnitId.knight, 24, "Knight", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/7/7e/Knight_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401180458", new Cost(60, 75, 0, 0), 100, 10, 1.8, 0.68, 2, 2, [], [
                ArmourClass.cavalry
            ]),
            cavalier: new Unit(UnitId.cavalier, 25, "Cavalier", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/10/Cavalier_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401184346", new Cost(60, 75, 0, 0), 120, 12, 1.8, 0.68, 2, 2, [], [
                ArmourClass.cavalry
            ]),
            paladin: new Unit(UnitId.paladin, 26, "Paladin", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/2/28/Paladin_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200401180849", new Cost(60, 75, 0, 0), 160, 14, 1.9, 0.68, 2, 3, [], [
                ArmourClass.cavalry
            ]),
            camel: new Unit(UnitId.camel, 27, "Camel Rider", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/f/ff/Camelrider_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200331164238", new Cost(55, 60, 0, 0), 100, 6, 2, 0.5, 0, 0, [
                new AttackBonus(ArmourClass.cavalry, 9),
                new AttackBonus(ArmourClass.camel, 5)
            ], [
                ArmourClass.camel
            ]),
            heavyCamel: new Unit(UnitId.heavyCamel, 28, "Heavy Camel Rider", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/8/89/Aoe2_heavycamelriderDE.png/revision/latest/scale-to-width-down/256?cb=20200330225627", new Cost(55, 60, 0, 0), 120, 7, 2, 0.5, 0, 0, [
                new AttackBonus(ArmourClass.cavalry, 18),
                new AttackBonus(ArmourClass.camel, 9),
                new AttackBonus(ArmourClass.mameluke, 7)
            ], [
                ArmourClass.camel
            ]),
            imperialCamel: new Unit(UnitId.imperialCamel, 29, "Imperial Camel Rider", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/5d/ImperialCamelRiderIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230143407", new Cost(55, 60, 0, 0), 140, 9, 2, 0.5, 0, 0, [
                new AttackBonus(ArmourClass.cavalry, 18),
                new AttackBonus(ArmourClass.camel, 9),
                new AttackBonus(ArmourClass.mameluke, 7)
            ], [
                ArmourClass.camel
            ]),
            eBattleElephant: new Unit(UnitId.eBattleElephant, 30, "Elite Battle Elephant", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/b2/Elite_battle_elephant_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200414003052", new Cost(120, 70, 0, 0), 300, 14, 2, 0.49, 1, 3, [], [
                ArmourClass.cavalry,
                ArmourClass.warElephant
            ]),
            eSteppeLancer: new Unit(UnitId.eSteppeLancer, 31, "Elite Steppe Lancer", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/1c/Elitesteppelancericon.png/revision/latest/scale-to-width-down/256?cb=20191110161918", new Cost(70, 45, 0, 0), 80, 11, 2.3, 0.68, 0, 1, [], [
                ArmourClass.cavalry
            ]),
            eLeitis: new Unit(UnitId.eLeitis, 32, "Elite Leitis", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/6/64/Leitisicon.png/revision/latest/scale-to-width-down/256?cb=20191110154530", new Cost(70, 50, 0, 0), 130, 14, 1.9, 0.7, 2, 1, [], [
                ArmourClass.cavalry,
                ArmourClass.uniqueUnit
            ]),
            eKeshik: new Unit(UnitId.eKeshik, 33, "Elite Keshik", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/4/4c/Keshikicon.png/revision/latest/scale-to-width-down/256?cb=20191110154643", new Cost(50, 40, 0, 0), 140, 11, 1.9, 0.7, 1, 3, [], [
                ArmourClass.cavalry,
                ArmourClass.uniqueUnit
            ]),
            eKonnik: new Unit(UnitId.eKonnik, 34, "Elite Konnik", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/8/88/Konnikicon.png/revision/latest/scale-to-width-down/256?cb=20191110154203", new Cost(60, 70, 0, 0), 120, 14, 2.4, 0.7, 2, 2, [], [
                ArmourClass.cavalry,
                ArmourClass.uniqueUnit
            ]),
            eBoyar: new Unit(UnitId.eBoyar, 35, "Elite Boyar", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/bf/BoyarIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230135130", new Cost(50, 80, 0, 0), 130, 14, 1.9, 0.7, 6, 3, [], [
                ArmourClass.cavalry,
                ArmourClass.uniqueUnit
            ]),
            eSamurai: new Unit(UnitId.eSamurai, 36, "Elite Samurai", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/1/17/SamuraiIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230150219", new Cost(60, 30, 0, 0), 80, 12, 1.45, 0.8, 1, 1, [
                new AttackBonus(ArmourClass.uniqueUnit, 12),
                new AttackBonus(ArmourClass.eagleWarrior, 3)
            ], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eWarElephant: new Unit(UnitId.eWarElephant, 37, "Elite War Elephant", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/a/ab/WarElephantIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230145604", new Cost(200, 75, 0, 0), 600, 20, 2, 0.56, 1, 3, [], [
                ArmourClass.cavalry,
                ArmourClass.warElephant,
                ArmourClass.uniqueUnit
            ]),
            eCataphract: new Unit(UnitId.eCataphract, 38, "Elite Cataphract", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/b/bd/CataphractIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20200325131320", new Cost(70, 75, 0, 0), 150, 12, 1.7, 0.68, 2, 1, [
                new AttackBonus(ArmourClass.infantry, 12),
                new AttackBonus(ArmourClass.condottiero, 10)
            ], [
                ArmourClass.cavalry,
                ArmourClass.uniqueUnit
            ]),
            eBerserk: new Unit(UnitId.eBerserk, 39, "Elite Berserk", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/0/0d/BerserkIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230150427", new Cost(65, 25, 0, 0), 62.5, 14, 2.0, 0.5, 2, 1, [
                new AttackBonus(ArmourClass.eagleWarrior, 3)
            ], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ]),
            eMagyarHuszar: new Unit(UnitId.eMagyarHuszar, 40, "Elite Magyar Huszar", UnitType.cavalry, "https://vignette.wikia.nocookie.net/ageofempires/images/5/5b/MagyarHuszarIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230140432", new Cost(80, 10, 0, 0), 85, 10, 1.8, 0.68, 0, 2, [], [
                ArmourClass.cavalry,
                ArmourClass.uniqueUnit
            ]),
            eKamayuk: new Unit(UnitId.eKamayuk, 41, "Elite Kamayuk", UnitType.infantry, "https://vignette.wikia.nocookie.net/ageofempires/images/8/85/KamayukIcon-DE.png/revision/latest/scale-to-width-down/256?cb=20191230141856", new Cost(60, 30, 0, 0), 80, 8, 2.0, 0.5, 1, 0, [
                new AttackBonus(ArmourClass.warElephant, 20),
                new AttackBonus(ArmourClass.cavalry, 12),
                new AttackBonus(ArmourClass.camel, 10),
                new AttackBonus(ArmourClass.mameluke, 1)
            ], [
                ArmourClass.infantry,
                ArmourClass.uniqueUnit
            ])
        };
    }
    return UnitData;
}());
var Upgrade = (function () {
    function Upgrade(hp, atk, rof, ma, pa) {
        this.hp = hp;
        this.atk = atk;
        this.rof = rof;
        this.ma = ma;
        this.pa = pa;
    }
    Upgrade.prototype.dps = function () {
        return this.atk / this.rof;
    };
    return Upgrade;
}());
var UpgradeData = (function () {
    function UpgradeData() {
        this.upgrades = {
            forging: new Upgrade(0, 1, 0, 0, 0),
            ironCasting: new Upgrade(0, 1, 0, 0, 0),
            blastFurnace: new Upgrade(0, 2, 0, 0, 0),
            scaleMailArmor: new Upgrade(0, 0, 0, 1, 1),
            chainMailArmor: new Upgrade(0, 0, 0, 1, 1),
            plateMailArmor: new Upgrade(0, 0, 0, 1, 2),
            scaleBardingArmor: new Upgrade(0, 0, 0, 1, 1),
            chainBardingArmor: new Upgrade(0, 0, 0, 1, 1),
            plateBardingArmor: new Upgrade(0, 0, 0, 1, 2),
            bloodlines: new Upgrade(20, 0, 0, 0, 0)
        };
    }
    return UpgradeData;
}());
//# sourceMappingURL=app.js.map
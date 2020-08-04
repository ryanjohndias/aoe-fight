window.onload = initialise;
window.onclick = function(event) {
    if (event.target == modalOverlay) {
        hideOverlay();
    }
}

var leftCivImage, rightCivImage, leftUnitImage, rightUnitImage, modalOverlay, modalContent;

const Side = {
    left: 0,
    right: 1
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
    leftCivImage = document.getElementById("leftCivImage");
    rightCivImage = document.getElementById("rightCivImage");
    leftCivImage.addEventListener("click", leftCivImageClicked);
    rightCivImage.addEventListener("click", rightCivImageClicked);
    
    leftUnitImage = document.getElementById("leftUnitImage");
    rightUnitImage = document.getElementById("rightUnitImage");
    leftUnitImage.addEventListener("click", leftUnitImageClicked);
    rightUnitImage.addEventListener("click", rightUnitImageClicked);

    modalOverlay = document.getElementById("modalOverlay");
    modalContent = document.getElementById("modalContent");
    modalClose = document.getElementById("modalClose");
    modalClose.addEventListener("click", hideOverlay);
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

function getCiv(id) {
    for (i = 0; i < Civs.length; i++) {
        const civ = Civs[i];
        if (civ.id == id) {
            return civ;
        }
    }
}

function civClicked(id) {
    const civ = getCiv(id);

    if (state.selectedSide == Side.left) {
        state.left.civ = civ;
        leftCivImage.src = civ.image;
    } else {
        state.right.civ = civ;
        rightCivImage.src = civ.image;
    }

    hideOverlay();
 }

 function unitClicked(id) {
    const unit = Unit[id];

    var targetTable;
    var civ;
    if (state.selectedSide == Side.left) {
        state.left.unit = unit;
        leftUnitImage.src = unit.img;
        targetTable = "leftStats";
        civ = state.left.civ;
    } else {
        state.right.unit = unit;
        rightUnitImage.src = unit.img;
        targetTable = "rightStats";
        civ = state.right.civ;
    }

    hideOverlay();

    showUnitStats(targetTable, unit, civ);
 }

 function showUnitStats(tableId, unit, civ) {

    var table = document.getElementById(tableId);
    var body = TableUtils.newBody(table);

    TableUtils.createRow(body, ["Stat", "Base", "Upgrades", "Special", "Total"]);

    const baseHP = unit.hp;
    var extraHP = 0;
    civ.special.infantry.forEach(function(bonus) {
        extraHP += bonus.hp;
    });
    const totalHP = baseHP + (baseHP * (extraHP/100));

    TableUtils.createRow(body, ["HP", baseHP, "-", `${extraHP != 0 ? `+${extraHP}%` : "-"}`, totalHP]);

    const baseAtk = unit.atk;
    var atkModifier = 0;
    civ.upgrades.melee.forEach(function(upgrade) {
        atkModifier += upgrade.atk;
    });
    var specialAtk = 0;
    civ.special.infantry.forEach(function(upgrade) {
        specialAtk += upgrade.atk;
    });
    const atk = baseAtk + specialAtk + atkModifier;

    TableUtils.createRow(body, ["Attack", baseAtk, `+${atkModifier}`, `${specialAtk != 0 ? `+${specialAtk}` : "-"}`, atk]);

    const baseRof = unit.rof;
    var rof = 0;
    civ.special.infantry.forEach(function(upgrade) {
        rof -= upgrade.rof;
    });
    const effectiveRof = baseRof + (rof/100);

    TableUtils.createRow(body, ["RoF", baseRof, "-", `${rof != 0 ? `${rof}%` : "-"}`, effectiveRof.toFixed(2)]);

    const dpsBase = baseAtk / baseRof;
    const dpsTotal = atk / effectiveRof;
    TableUtils.createRow(body, ["DPS", dpsBase.toFixed(2), "-", "-", dpsTotal.toFixed(2)]);

    var maMod = 0, paMod = 0;
    civ.upgrades.infantryArmor.forEach(function(upgrade) {
        maMod += upgrade.ma;
        paMod += upgrade.pa;
    });

    TableUtils.createRow(body, ["Melee armor", unit.ma, `+${maMod}`, "-", unit.ma + maMod]);
    TableUtils.createRow(body, ["Pierce armor", unit.pa, `+${paMod}`, "-", unit.pa + paMod]);
 }

 var WidgetFactory = {
    civ: function(id, name, imageUrl) {
        return `<div class="civCell" onClick="javascript:civClicked(${id})">
                   <img src="${imageUrl}"></img>
                   <p>${name}</p>
               </div>`;
    },
    unit: function(unit) {
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
    createOption(value, text) {
        var option = document.createElement("option");
        option.value = value;
        option.text = text;
        return option;
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
    newBody: function(table) {
        TableUtils.removeBody(table);
        var body = table.createTBody();
        return body;
    }
}
class ChartData {

    leftName: string
    leftData: any[]

    rightName: string
    rightData: any[]

    constructor(left: CivUnit, leftReport: BattleReport, right: CivUnit, rightReport: BattleReport) {

        this.leftName = left.civ.adjective + " " + left.unit.name
        this.rightName = right.civ.adjective + " " + right.unit.name

        // Note: 'left' reports on the remaing health of 'right', thus it's appears switched around
        this.leftData = rightReport.log.map(function(item) {
            return {
                x: item.time,
                y: item.hpLeft,
                unitName: left.unit.name
            }
        })
        this.rightData = leftReport.log.map(function(item) {
            return {
                x: item.time,
                y: item.hpLeft,
                unitName: right.unit.name
            }
        })
    }

}
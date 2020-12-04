class ShareCode {
    readonly leftCivId: number
    readonly leftUnitId: number
    readonly rightCivId: number
    readonly rightUnitId: number

    public static readCode(code: string) {
        var parse = (code: string, index: number) => parseInt(code.substr(index, 2))
        return new ShareCode(parse(code, 0), parse(code, 2), parse(code, 4), parse(code, 6))
    }

    public static isValidCode(code: string) {
        return code.length == 8
        // Needs work
        // var regex = /^[0-9]\d{8}$/g
        // return regex.test(code)
    }

    constructor(leftCivId: number, leftUnitId: number, rightCivId: number, rightUnitId: number) {
        this.leftCivId = leftCivId
        this.leftUnitId = leftUnitId
        this.rightCivId = rightCivId
        this.rightUnitId = rightUnitId
    }

    private getCode() {
        return `${this.leftCivId}${this.leftUnitId}${this.rightCivId}${this.rightUnitId}`
    }

    public generateLink() {
        return `${window.location.origin}/#${this.getCode()}`
    }
 }
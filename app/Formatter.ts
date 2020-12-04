class Formatter {

    public static amountUpgrade(value) {
        return value != 0 ? `+${value}` : "-"
    }

    public static percUpgrade(value) {
        return value != 0 ? `+${value}%` : "-"
    }

}
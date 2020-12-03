class AppState {
    leftCiv: Civ
    leftUnit: Unit
    rightCiv: Civ
    rightUnit: Unit
    selectedSide: Side

    public canShowBattle() {
        return this.leftUnit != null && this.rightUnit != null
    }

    public canCopyLink() {
        return this.leftCiv != null &&
            this.leftUnit != null &&
            this.rightCiv != null &&
            this.rightUnit != null
    }
}
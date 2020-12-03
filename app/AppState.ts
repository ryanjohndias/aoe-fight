class AppState {
    leftCiv: Civ
    leftUnit: Unit
    rightCiv: Civ
    rightUnit: Unit
    selectedSide: Side

    public canShowBattle() {
        return state.leftUnit != null && state.rightUnit != null
    }

    public canCopyLink() {
        return state.leftCiv == null ||
            state.leftUnit == null ||
            state.rightCiv == null ||
            state.rightUnit == null
    }
}
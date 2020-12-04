class TableUtils {

    public static removeBody(table: HTMLTableElement) {
        var body = table.querySelector('tbody')
        if (body != null) {
            body.parentNode.removeChild(body)
        }
    }

    public static createRow(body: HTMLTableSectionElement, values: any[]) {
        var row = body.insertRow() as HTMLTableRowElement;
        values.forEach(function(value) {
            var cell = row.insertCell()
            cell.innerHTML = value
        });
    }

    public static createMergedRow(body: HTMLTableSectionElement, value: any, span: number) {
        var row = body.insertRow()
        var cell = row.insertCell()
        cell.colSpan = span
        cell.innerHTML = value
    }

    public static newBody(table: HTMLTableElement) {
        TableUtils.removeBody(table)
        var body = table.createTBody()
        return body
    }

}
class Report {
    constructor(since, to, parking, data, field, type, table = []) {
        this.since = since;
        this.to = to;
        this.parking = parking;
        this.data = data;
        this.field = field;
        this.type = type;
        this.table = table;
        this.orientation;
    }

    getHeader() {
        const keys = Object.keys(this.data[0]);
        return ['Id', ...keys];
    }

    getBody() {
        let tableContent = [];
        const rows = this.data;
        for (const row of rows) {
            for(const field in row) {
                if (field === 'Fecha Ingreso' || field === 'Fecha Salida'  || field === 'Desde'  || field === 'Hasta') {
                    if (row[field] !== null){
                        row[field] = row[field].replaceAll("-", "/").replace("T", "\n").split(".")[0];
                    }
                }
            }
            tableContent.push([rows.indexOf(row) + 1, ...Object.values(row)]);
        }
        return tableContent;
    }
}

module.exports = Report;

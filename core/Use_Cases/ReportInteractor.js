const Report = require('../Entities/Report.js');

class ReportInteractor {
    constructor (database) {
        this.database = database;
    }
    async getReportTickets(since, to, parking, state){
        try {
            let response = await this.database.query('CALL pa_re_report(?, ?, ?, ?, ?);', [1, since, to, parking, state]);
            response = JSON.parse(JSON.stringify(response[0]));

            if (response.length === 0) {
                return (404)
            } else {
                console.log(response);
                const report = new Report(since, to, parking, response);
                return report;
            }
        } catch (error) {
            return (500);
        }
    }
}

module.exports =  ReportInteractor;
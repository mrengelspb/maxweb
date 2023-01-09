const Report = require('../Entities/Report.js');
const fs = require('fs');

class ReportInteractor {
    constructor (database, Pdfmake, Excel) {
        this.database = database;
        this.Pdfmake = Pdfmake;
        this.Excel = Excel
    }
    async getReportTickets(action, since, to, parking, state, field, type, name_parking, address_parking) {
        try {
            let a_since = since.split(" ")[0].split("/");
            let a_to = to.split(" ")[0].split("/");
            since = new Date(`${a_since[0]}/${a_since[2]}/${a_since[1]}`).toISOString().replace("T", " ").split(".")[0];
            to = new Date(`${a_to[0]}/${a_to[2]}/${a_to[1]}`).toISOString().replace("T", " ").split(".")[0];
            let response = await this.database.query('CALL pa_re_report(?, ?, ?, ?, ?);', [action, since, to, parking, state]);
            response = JSON.parse(JSON.stringify(response[0]));
            if (response.length === 0) {
                return (404);
            } else {
                const report = new Report(since, to, parking, response, field, type);
                //PDF
                const pdfmake = new this.Pdfmake( {
                    Roboto: {
                        normal: './Roboto/Roboto-Regular.ttf',
                        bold: './Roboto/Roboto-Medium.ttf',
                        italics: './Roboto/Roboto-Italic.ttf',
                        bolditalics: './Roboto/Roboto-MediumItalic.ttf'
                    }
                });

                const pdfDeclarations = {
                    content: [ 
                        { text: "Soluciones Plan B", style: 'header'},
                        { text: `Informe: ${field}`},
                        { text: `${name_parking} - ${address_parking}`},
                        { text: `Desde: ${since}`},
                        { text: `Hasta: ${to}`},
                        {
                            layout: 'table', 
                            table: {
                                dontBreakRows: false,
                                width: ['*', '*', '*', '*', '*', '*', '*', '*'],
                                body: [report.getHeader(), ...report.getBody()],
                            }
                        }
                    ]
                }
                
                const pdfDoc = pdfmake.createPdfKitDocument(pdfDeclarations, {});
                pdfDoc.pipe(fs.createWriteStream('./Report/ticket.pdf'));
                pdfDoc.end();
        
            
                //EXCEL

                const headers = report.getHeader();
                const body = report.getBody();
                const workbook = new this.Excel.Workbook();
                const worksheet = workbook.addWorksheet("informe-excel");
                const header_columns = headers.map((col) => {
                    return {
                        header: col,
                        key: col,
                        width: col.length + 2
                    }
                });
                worksheet.columns = header_columns;
                for (let row of body) {
                    row = row.map((field, index) => [headers[index], field]);
                    worksheet.addRow(Object.fromEntries(row));
                }
                await workbook.xlsx.writeFile('./Report/ticket.xlsx');


                return report;
            }
        } catch (error) {
            console.log(error)
            return (500);
        }
    }

    async getReportCards(action, since, to, parking, state, field, type) {

    }
}

module.exports =  ReportInteractor;

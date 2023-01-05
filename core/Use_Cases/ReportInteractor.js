const Report = require('../Entities/Report.js');
const fs = require('fs');

class ReportInteractor {
    constructor (database, Pdfmake) {
        this.database = database;
        this.Pdfmake = Pdfmake;
    }
    async getReportTickets(action, since, to, parking, state, field, type, name_parking, address_parking) {
        try {
            let response = await this.database.query('CALL pa_re_report(?, ?, ?, ?, ?);', [action, since, to, parking, state]);
            response = JSON.parse(JSON.stringify(response[0]));
            if (response.length === 0) {
                return (404)
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
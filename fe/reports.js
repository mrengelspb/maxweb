const jsreport = require('jsreport-core')();
const fs = require('fs');

const template = fs.readFileSync("./template.html");

jsreport.init().then(() => {
	return jsreport.render({
		template: {
			content: template.toString(),
			engine: 'handlebars',
			recipe: 'chrome-pdf'
		},
		data: {
			foo: "world"
		}
	}).then((resp) => {
	 	// prints pdf with headline Hello world
        fs.writeFileSync("./example.pdf", resp.content);
 	});
}).catch((e) => {
	console.error(e)
})
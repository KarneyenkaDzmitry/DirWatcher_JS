'use strict'

function convert(path,) {
    let csvToJson = require('convert-csv-to-json');
 
    let fileInputName = path; 
    let fileOutputName = './archive/MOCK_DATA.json';
     
    csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
    return csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileInputName);
    //return csvToJson.formatValueByType().getJsonFromCsv(fileInputName);
}
//     //const fs = require('fs');
//     //let content = fs.readFileSync(path, "utf8").split('\r\n');
//     let content = csvContent.split('\r\n');
//     console.log(content[content.length - 1]);
//     const keys = content[0].split(',');
//     content.splice(0, 1);
//     if (content[content.length - 1] === '') {
//         content.splice(content.length - 1, 1);
//     }
//     let result = '{"object":[\n';
//     for (let j = 0; j < content.length ; j++) {
//         const values = content[j].split(',');
//         result += `{`;
//         for (let i = 0; i < keys.length; i++) {
//             if (i !== keys.length - 1) {
//                 result += `\"${keys[i]}\":\"${values[i]}\",`;
//             } else {
//                 result += `\"${keys[i]}\":\"${values[i]}\"`;
//             }
//         }
//         if (j !== content.length - 1) {
//             result += `},\n`;
//         } else {
//             result += `}\n]}`;
//         }
//     };
//     return result;
// }

exports.convert = convert;
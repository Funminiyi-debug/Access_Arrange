$(document).ready(function () {  
    $.support.cors = true;
    var workbook = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));  
});

var excelIO = new GC.Spread.Excel.IO();  

function ImportFile() {  
    var excelUrl = "./test.xlsx";  

    var oReq = new XMLHttpRequest();  
    oReq.open('get', excelUrl, true);  
    oReq.responseType = 'blob';  
    oReq.onload = function () {  
    var blob = oReq.response;  
    excelIO.open(blob, LoadSpread, function (message) {  
        console.log(message);  
    });  
};  
oReq.send(null);  
}  
function LoadSpread(json) {  
    jsonData = json;  
    workbook.fromJSON(json);  

    workbook.setActiveSheet("Revenues (Sales)");  
} 
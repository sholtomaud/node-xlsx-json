var fs = require('fs');
var xlsx = require('xlsx');
var cvcsv = require('csv');
var record = []
var header = []

exports = module.exports = XLSX_json;

function XLSX_json (config) {
  console.log(config)
  if(!config.input) {
    console.error("You miss a input file");
    process.exit(1);
  }

  if(!config.output) {
    console.error("You miss a output file");
    process.exit(2);
    
  }

  var cv = new CV(config);
  
}

function CV(config) {
  var wb = this.load_xlsx(config.input)
  var ws = this.ws(wb);
  var csv = this.csv(ws)
  this.cvjson(csv, config.output)
}

CV.prototype.load_xlsx = function(input) {
  return xlsx.readFile(input);
}

CV.prototype.ws = function(wb) {
  var target_sheet = '';

  if(target_sheet === '') 
    target_sheet = wb.SheetNames[0];
  ws = wb.Sheets[target_sheet];
  return ws;
}

CV.prototype.csv = function(ws) {
  return csv_file = xlsx.utils.make_csv(ws)
}

CV.prototype.cvjson = function(csv, output) {
  cvcsv()
    .from.string(csv)
    .transform( function(row){
      row.unshift(row.pop());
      return row;
    })
    .on('record', function(row, index){
      
      if(index === 0) {
        header = row;
      }else{
        var obj = {};
        header.forEach(function(column, index) {
          obj[column] = row[index];
        })
        record.push(obj);
      }
      console.log('#'+index+' '+JSON.stringify(row));
    })
    .on('end', function(count){
      // when writing to a file, use the 'close' event
      // the 'end' event may fire before the file has been written
      console.log('Number of lines: '+count);
      var stream = fs.createWriteStream(output, { flags : 'w' });
      stream.write(JSON.stringify(record));
      
    })
    .on('error', function(error){
      console.log(error.message);
    });
}

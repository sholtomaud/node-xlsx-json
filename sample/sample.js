var xlsx_json = require('../')

xlsx_json({
  input: __dirname + '/interview.xlsx',
  output: __dirname + '/test.json'
});


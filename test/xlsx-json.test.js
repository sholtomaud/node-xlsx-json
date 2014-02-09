var should = require('should');
var xlsx2json = require('../');

describe('xlsx to json', function() {

	it('should convert xlsx to json', function() {
		xlsx2json({
			input: './sample/interview.xlsx',
			output: null
		}, function(err, result) {
			should.not.exist(err)
			result.should.be.an.instanceOf(Object)
		})
	})

	it('should convert xlsx to json file', function() {
		xlsx2json({
			input: './sample/interview.xlsx',
			output: './sample/test.json'
		}, function(err, result) {
			should.not.exist(err)
			result.should.be.an.instanceOf(Object)
		})

	})

})

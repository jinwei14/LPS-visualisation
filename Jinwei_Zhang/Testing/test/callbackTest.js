res = [];
(function (window) {
    function callbackExample(val){
        // console.log(val);
        res.push(val)
    }

    var list = ['apple','banana','pear'];

    list.forEach(callbackExample);

    // console.log('Done');
    res.push('Done')



})();

// console.log(res);


var assert = require('assert');
describe('Array', function() {
        it('should return the same value', function() {
            assert.equal(res[0], 'apple');
        });

    it('should return the same value', function() {
        assert.equal(res[1], 'banana');
    });


    it('should return the same value', function() {
        assert.equal(res[3], 'Done');
    });
});


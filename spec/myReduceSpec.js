/* This is the test file for myReduce function
 *    PLEASE DO NOT EDIT THIS FILE
 * To run these tests do `mocha spec/myReduceSpec.js`
*/

var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var expect = chai.expect;
chai.config.includeStack = false; // turn off stack trace
chai.config.showDiff = true; // turn on reporter diff display

var myReduce = require('../exercises/myReduce');

describe('myReduce', function() {
  // sample data
  beforeEach(function() {
    testArr = ['a', 'b', 'c', 'd'];
  });

  it("accepts an array as the first argument", function testFirstArgument() {
    expect(myReduce).to.have.length.within(1,3) // number of arguments
  });

  it("accepts a callback function as the second argument", function testSecondArgument() {
    expect(myReduce).to.have.length.within(2,3)  // number of arguments
  });

  it("calls the callback function", function testCallbackIsCalled() {
   function spyOnMe() {}
   var spy = chai.spy(spyOnMe);
   myReduce(testArr, spy);
   expect(spy).to.have.been.called();
  });

  it("calls the callback function once for every pair of items in the array", function testCallbackisCalledNTimes() {
   function spyOnMe() {}
   var spy = chai.spy(spyOnMe);
   myReduce(testArr, spy);
   expect(spy).to.have.been.called.exactly(testArr.length - 1);
  });

  it("has a return value that is equal to the final return value of the callback", function() {
    var results = myReduce(testArr, function(){
      return 1000100;  // on every pass
    });
    console.log('       results: ', results);
    expect(results).to.equal(1000100);
  });


  it("returns a single value, not an array", function() {
    var results = myReduce(testArr, function() {
      return 'mercury';
    }, 'foo');
    console.log('       results: ', results);
    expect(results).to.not.be.an('Array');
    expect(results).to.not.be.an("undefined");
  });


  it("uses the return value of the previous execution of the callback " +
    "in the next execution of the callback (as the 1st callback argument)", function() {
    var results = [];

    myReduce(testArr, function(previousValue) {
      results.push(previousValue);
      return 'blue';
    });
    console.log('       results: ', results);
    expect(results[1]).to.equal('blue');
    results.shift(); // the previous test verified that element 0 is 192
    expect(results).to.have.members(['blue', 'blue', 'blue']);
  });

  it("uses the value at the current index (as the 2nd callback argument)", function() {
    var results = [];

    myReduce(testArr, function(previousValue, currentValue) {
      results.push(currentValue);
    });
    console.log('       results: ', results);
    expect(results).to.have.members(testArr.slice(1));
  });

  it("uses the current index (as the 3rd callback argument)", function() {
    var results = [];

    myReduce(testArr, function(previousValue, currentValue, index) {
      results.push(index);
    });
    console.log('       results: ', results);
    expect(results).to.have.members(
      // indexes 1..testArr.length
      Array.apply(null, Array(testArr.length)).map(function (_, i) {return i;}).slice(1)
    );
  });


  it("uses the entire array (as the 4th callback argument)", function testArrayPassing() {
    var resultingArray = [];
    myReduce(testArr, function(_prev, _curr, index, arr) {
      console.log('       results: ', arr);
      // each time the callback is called verify that the array is as expected
      // Note: until the callback is called though, this test will still pass
      expect(arr).to.have.members(['a', 'b', 'c', 'd']);
    });
  });

  describe("when NO initialValue is provided", function() {

    it("uses the first value in the array (as the 1st callback argument)", function() {
      var stachedValues = [];
      myReduce(['a', 0, 0, 0], function(prev, _curr) {
        stachedValues.push(prev);
        return 'x';
      });
      console.log('      results: ', stachedValues);
      expect(stachedValues[0]).to.equal('a');
    });

    it("uses the second value in the array (as the 2nd callback argument)", function() {
      var stachedValues = [];
      myReduce([0, 'b', 0], function(_prev, curr) {
        stachedValues.push(curr);
        return 'x';
      });
      console.log('      results: ', stachedValues);
      expect(stachedValues[0]).to.equal('b');
    });

    it("eventually passes every value in the array to the callback " +
      "(as the 3rd callback argument)", function testEachElem() {
      var resultingArray = [];
      myReduce(testArr, function(_prev, curr) {
        resultingArray.push(curr);
      });
      // compare elements in the result to the expected array
      console.log('       results: ', resultingArray);
      // note: 'a' is the first _prev; so the first curr is 'b'
      expect(resultingArray).to.have.members(['b', 'c', 'd']);
    });

    it("eventually passes every index in the array to the callback " +
      "(as the 3rd callback argument)", function testEachIndex() {
      var resultingArray = [];
      myReduce(testArr, function(_prev, _curr, index) {
        resultingArray.push(index);
      });
      // compare elements in the result to expected array
      console.log('       results: ', resultingArray);
      // we don't include 0 because index 0 is the first _prev
      expect(resultingArray).to.have.members([1, 2, 3]);
    });

    it("the first time the callback is called, the index starts at 1", function() {
      var results = [];
      myReduce(testArr, function(_prev, _next, index) {
        results.push(index);
      });
      expect(results[0]).to.equal(1);
    });

  });

  describe("when an initialValue IS provided", function() {

      it("accepts an optional initialValue as the 3rd argument", function testSecondArgument() {
        expect(myReduce).to.have.length(3)  // number of arguments
      });

      it("the first time the callback is called, it uses the initialValue (as the 1st callback argument)", function() {
        var result = [];

        myReduce(testArr, function(previousValue) {
          result.push(previousValue);
        }, 192);
        expect(result[0]).to.equal(192);
      });

      it("the first time the callback is called, the index starts at 0", function() {
        var results = [];
        myReduce(testArr, function(_prev, _next, index) {
          results.push(index);
        }, 'asdf');
        expect(results[0]).to.equal(0);
      });

      it("works even when the array is empty", function testArrayL0() {
        var resultingArray = [];
        var result = myReduce([], function(item) {
          return '44';
        }, 99);
        // compare elements in the result to expected array
        console.log('       result: ', result);
        expect(result).to.equal(99);
      });

      it("never calls the callback if the array is length 0", function() {
        function spyOnMe() {}
        var spy = chai.spy(spyOnMe);

        myReduce([], spy, 11);
        expect(spy).to.not.have.been.called();
      });

  });

});
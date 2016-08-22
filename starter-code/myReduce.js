// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce for more details
// Don't worry about initialValue at first. You can always add it in later.

function myReduce(arr, callback) {

  var sum = 0;

  for (var i = 0; i <= arr.length - 1; i++) {
    callback(arr[i], i, arr)
    sum += arr[i];
  }

  return sum;
}


/*
 Best if you don't code out here.
 If you want to check your code, use tests or `index.js`!
*/







// export this function (you can ignore this for now)
module.exports = myReduce;

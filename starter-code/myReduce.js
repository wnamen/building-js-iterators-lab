// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce for more details
// Don't worry about initialValue at first. You can always add it in later.

function myReduce(arr, callback, initialValue) {

  var i;
  var sum;

  if (initialValue == undefined) {
    sum = arr[0];
    i = 1;
  } else {
    sum = initialValue;
    i = 0;
  }

  for (; i <= arr.length - 1; i++) {
    sum = callback(sum, arr[i], i, arr)
  }

  return sum;
}


/*
 Best if you don't code out here.
 If you want to check your code, use tests or `index.js`!
*/







// export this function (you can ignore this for now)
module.exports = myReduce;

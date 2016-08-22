// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map

function myMap(arr, callback) {
  var mapped = [];

  for (var i = 0; i <= arr.length - 1; i++) {
    mapped.push(callback(arr[i], i, arr));
  }

  return mapped;
}


/*
 Best if you don't code out here.
 If you want to check your code, use tests or `index.js`!
*/







// export this function (you can ignore this for now)
module.exports = myMap;

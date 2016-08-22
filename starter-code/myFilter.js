// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Filter
function myFilter(arr, callback) {
  var filtered = [];

  for (var i = 0; i <= arr.length - 1; i++){
    if (callback(arr[i], i, arr)) {
      filtered.push(arr[i]);
    }
  }

  return filtered;
}


/*
 Best if you don't code out here.
 If you want to check your code, use tests or `index.js`!
*/






// export this function (you can ignore this for now)
module.exports = myFilter;

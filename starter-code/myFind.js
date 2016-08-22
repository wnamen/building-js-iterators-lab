// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Find
function myFind(arr, callback) {

  for (var i = 0; i <= arr.length - 1; i++) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }

}

/*
 Best if you don't code out here.
 If you want to check your code, use tests or `index.js`!
*/







// export this function (you can ignore this for now)
module.exports = myFind;

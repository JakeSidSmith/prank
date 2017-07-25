console.log('Test');

console.log('Before timeout');

setTimeout(function () {
  console.log('Timeout');
}, 1000);

console.log('After timeout');

throw new Error('Error');

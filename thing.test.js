console.log('Testing describes');

prank.describe('A test', function () {

  prank.it('should run a test', function () {
    console.log('I was run!');
  });

  prank.xit('should not run this test', function () {
    throw new Error('I should not be run!');
  });

});

prank.xdescribe('A test', function () {

  throw new Error('I should not be run!');

});

// This should blow up
prank.describe();

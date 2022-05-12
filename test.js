var testModel = document.Rotation();
var controller = document.RotationController(testModel);


testModel.addPlayer('A');
testModel.addPlayer('B');
testModel.addPlayer('C');
testModel.addPlayer('D');
testModel.addPlayer('E');
testModel.addPlayer('F');
testModel.addPlayer('G');
testModel.addPlayer('H');
testModel.addPlayer('I');
testModel.addPlayer('J');
console.log(testModel.roster);

testModel.fillInnings();
console.log(JSON.stringify(testModel.roster));
console.log(testModel.innings);
console.log(testModel.roster);
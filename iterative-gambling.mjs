function run(winBelow) {
  const capitalFractionInvested = 0.5;
  var fortune = 1.0;
  var iterations = 0;
  while (true) {
    const r = Math.random();
    if (r < winBelow) {
      // win
      fortune = fortune + fortune * capitalFractionInvested;
    } else {
      // loose
      fortune = fortune * capitalFractionInvested;
    }
    if (fortune == 0.0 || fortune == Infinity) {
      return [fortune, iterations];
    }
    iterations++;
  }
}

const numberOfRuns = 1000;

function runMany(winBelow) {
  console.log("win below", winBelow);
  var brokeCount = 0,
    richCount = 0;
  for (var i = 0; i < numberOfRuns; i++) {
    const [fortune] = run(winBelow);
    if (fortune == 0.0) {
      brokeCount++;
    } else if (fortune == Infinity) {
      richCount++;
    }
  }
  console.log(`broke ${brokeCount} rich ${richCount}`);
}

runMany(0.63); // almost always go broke
runMany(0.632); // always win big
// https://en.wikipedia.org/wiki/List_of_mathematical_constants
// Math.log(2)/Math.log(3) = 0.6309297535714575 Fractal dimension of the Cantor set
// what have I gotten myself into...
runMany(Math.log(2) / Math.log(3)); // stuck gambling for a long time

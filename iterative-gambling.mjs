import Random from "./Random.mjs";

function run(seed, winBelow) {
  const prng = new Random(seed);
  const capitalFractionInvested = 0.5;
  var fortune = 1.0;
  var iterations = 0;
  while (true) {
    const r = prng.getNextValue();
    if (fortune == 0.0 || fortune == Infinity) {
      return [fortune, iterations];
    }
    if (r < winBelow) {
      // win
      fortune = fortune + fortune * capitalFractionInvested;
    } else {
      // loose
      fortune = fortune * capitalFractionInvested;
    }
    iterations++;
  }
}

const numberOfRuns = 10;

function runMany(winBelow) {
  for (var i = 0; i < numberOfRuns; i++) {
    const [fortune, iterations] = run(i, winBelow);
    if (fortune == 0.0) {
      console.log(`broke after ${iterations} iterations`);
    } else if (fortune == Infinity) {
      console.log(`infinitely rich after ${iterations} iterations`);
    } else {
      console.log(`fortune ${fortune} after ${iterations} iterations`);
    }
  }
}

runMany(0.63091); // always go broke
runMany(0.63093); // always win big
runMany(0.63092); // stuck gambling for a long time

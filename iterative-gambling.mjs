import Random from "./Random.mjs";

function run(seed, maxGamesPlayed) {
  const prng = new Random(seed);
  const winBelow = 0.6309;
  const capitalFractionInvested = 0.5;
  var fortune = 1.0;
  for (var i = 0; i < maxGamesPlayed; i++) {
    const r = prng.getNextValue();
    if (r < winBelow) {
      // win
      fortune = fortune + fortune * capitalFractionInvested;
    } else {
      // loose
      fortune = fortune * capitalFractionInvested;
    }
  }
  return fortune;
}
for (var i = 0; i < 1000; i++) {
  console.log(i, run(i, 1000000));
}

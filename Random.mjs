export default class {
  constructor(seed) {
    this.seed = seed;
  }
  // the Central randomizer: https://www.freecodecamp.org/news/a-brief-history-of-random-numbers-9498737f5b6c/
  getNextValue() {
    const seed = this.seed;
    this.seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280.0;
  }
}

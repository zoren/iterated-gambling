#include <stdio.h>
#include <math.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>

struct FortuneIterations {
    double fortune;
    long iterations;
};

const double capitalFractionInvested = 0.5;

struct FortuneIterations run(unsigned int seed, double winBelow) {
    double fortune = 1.0;
    long iterations = 0;
    while(1) {
        double newSeed = (seed * 9301 + 49297) % 233280;
        double r = seed / 233280.0;
        seed = newSeed;
        if(fortune == 0.0 || fortune == INFINITY) {
            struct FortuneIterations fi = {fortune, iterations};
            return fi;
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

const int numberOfRuns = 10;

void runMany(double winBelow) {
  for (int i = 0; i < numberOfRuns; i++) {
    struct FortuneIterations fi = run(i, winBelow);
    if (fi.fortune == 0.0) {
        printf("broke after %li iterations\n", fi.iterations);
    } else if (fi.fortune == INFINITY) {
        printf("infinitely rich after %li iterations\n", fi.iterations);
    } else {
        printf("fortune %f after %li iterations\n", fi.fortune, fi.iterations);
    }
  }
}

int main() {
    runMany(0.63091); // always go broke
    runMany(0.63093); // always win big
    runMany(0.63092); // stuck gambling forever
}

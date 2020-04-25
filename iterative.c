#include <stdio.h>
#include <math.h>
#include <stdint.h>
#include <inttypes.h>
#include <string.h>
#include <stdlib.h>

struct FortuneIterations {
    double fortune;
    long iterations;
};

const double capitalFractionInvested = 0.5;

struct FortuneIterations run(double winBelow) {
    double fortune = 1.0;
    long iterations = 0;
    while(1) {
        double r = (double)rand() / RAND_MAX;
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

const int numberOfRuns = 1000;

void runMany(double winBelow) {
    printf("win below %f\n", winBelow);
    long brokeCount = 0, richCount = 0;
  for (int i = 0; i < numberOfRuns; i++) {
    struct FortuneIterations fi = run(winBelow);
    if (fi.fortune == 0.0) {
        brokeCount++;
    } else if (fi.fortune == INFINITY) {
        richCount++;
    }
  }
    printf("broke %li rich %li\n", brokeCount, richCount);
}

int main() {
    runMany(0.630); // almost always go broke
    runMany(0.632); // almost always win big
    runMany(log(2)/log(3)); // stuck gambling for a long time
}

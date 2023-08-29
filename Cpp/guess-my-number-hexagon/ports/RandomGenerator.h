// Interface/Port for RandomGenerator
// RandomGenerator.h
#pragma once

class RandomGenerator {
public:
    virtual int generateRandom(int min, int max) = 0;
    virtual ~RandomGenerator() {}
};

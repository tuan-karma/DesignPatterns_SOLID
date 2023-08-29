#include "../../ports/RandomGenerator.h"
#include <cstdlib>
#include <ctime>

class StdRandomGenerator : public RandomGenerator
{
public:
    StdRandomGenerator()
    {
        srand(time(nullptr));
    }
    int generateRandom(int min, int max) override
    {
        return rand() % (max - min + 1) + min;
    }
};
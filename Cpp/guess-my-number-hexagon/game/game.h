// The core domain logic of the game (guess my number)
#pragma once

#include <iostream>
#include <string>
#include <memory>
#include "../ports/Display.h"
#include "../ports/Input.h"
#include "../ports/RandomGenerator.h"

class Game
{
public:
    Game(int minRange, int maxRange, Input &input, Display &display, RandomGenerator &randomGenerator);
    void play();

private:
    int min;
    int max;
    Input &input;
    Display &display;
    RandomGenerator &randomGenerator;
};

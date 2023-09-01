#include <memory>

#include "ports/Display.h"
#include "ports/Input.h"
#include "ports/RandomGenerator.h"
#include "adapters/console/KeyboardInput.cpp"
#include "adapters/console/ConsoleDisplay.cpp"
#include "adapters/console/StdRandomGenerator.cpp"
#include "game/game.cpp"

int main()
{
    KeyboardInput input;
    ConsoleDisplay display;
    StdRandomGenerator randomGenerator;

    Game game(1, 10, input, display, randomGenerator);
    game.play();

    return 0;
}
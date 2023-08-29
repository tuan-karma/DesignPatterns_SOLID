#include "ports/Display.h"
#include "ports/Input.h"
#include "ports/RandomGenerator.h"
#include "adapters/console/KeyboardInput.cpp"
#include "adapters/console/ConsoleDisplay.cpp"
#include "adapters/console/StdRandomGenerator.cpp"
#include "game/game.cpp"

int main()
{
    Input *input = new KeyboardInput();
    Display *display = new ConsoleDisplay();
    RandomGenerator *randomGenerator = new StdRandomGenerator();

    Game game(1, 10, input, display, randomGenerator);
    game.play();

    delete randomGenerator;
    delete display;
    delete input;

    return 0;
}
#include <memory>
#include "domain/Guesses.h"
#include "domain/Display.h"
#include "adapters/console/KeyboardGuesses.cpp"
#include "adapters/console/ConsoleDisplay.cpp"
#include "domain/HexagonalGuessMyNumber.cpp"

int main()
{
    // Guesses *guesses = new KeyboardGuesses();
    // Display *display = new ConsoleDisplay();

    auto guesses = std::make_unique<KeyboardGuesses>();
    auto display = std::make_unique<ConsoleDisplay>();

    HexagonalGuessMyNumber game(1, 10, guesses, display);
    game.play();

    return 0;
}

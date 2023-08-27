// HexagonalGuessMyNumber.cpp
#include <iostream>
#include "Guesses.h"
#include "Display.h"
#include <cstdlib>
#include <ctime>
#include <string>

class HexagonalGuessMyNumber {
public:
    HexagonalGuessMyNumber(int minRange, int maxRange, Guesses* guesses, Display* display);
    void play();

private:
    int secretNumber;
    int minRange;
    int maxRange;
    Guesses* guesses;
    Display* display;
};

HexagonalGuessMyNumber::HexagonalGuessMyNumber(int minRange, int maxRange, Guesses* guesses, Display* display)
    : minRange(minRange), maxRange(maxRange), guesses(guesses), display(display) {
    srand(time(nullptr));
    secretNumber = rand() % (maxRange - minRange + 1) + minRange;
}

void HexagonalGuessMyNumber::play() {
    display->showMessage("Welcome to the Guess My Number game!");
    display->showMessage("I'm thinking of a number between " + std::to_string(minRange) + " and " + std::to_string(maxRange) + ".");
    display->showMessage("Try to guess it.");

    char playAgain = 'y';

    while (playAgain == 'y' || playAgain == 'Y') {
        int guess;
        int attempts = 0;

        do {
            guess = guesses->getGuess();
            attempts++;

            if (guess == secretNumber) {
                display->showMessage("Congratulations! You guessed the number in " + std::to_string(attempts) + " attempts.");
            } else if (guess < secretNumber) {
                display->showMessage("Try a higher number.");
            } else {
                display->showMessage("Try a lower number.");
            }
        } while (guess != secretNumber);

        display->showMessage("Play again? (y/n): ");
        std::cin >> playAgain;
    }

    display->showMessage("Thanks for playing!");
}

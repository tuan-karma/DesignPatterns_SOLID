#include "game.h"

Game::Game(int minRange, int maxRange, Input *input, Display *display, RandomGenerator *randomGenerator)
    : min(minRange), max(maxRange), input(input), display(display), randomGenerator(randomGenerator)
{
}

void Game::play()
{
    display->showMessage("Welcome to the Guess My Number game!");
    display->showMessage("I'm thinking of a number between " + std::to_string(min) + " and " + std::to_string(max) + ".");
    display->showMessage("Try to guess it.");

    char playAgain = 'y';
    int secretNumber = randomGenerator->generateRandom(min, max);

    while (playAgain == 'y' || playAgain == 'Y')
    {
        int guess;
        int attempts = 0;

        do
        {
            guess = input->getGuess();
            attempts++;

            if (guess == secretNumber)
            {
                display->showMessage("Congratulations! You guessed the number in " + std::to_string(attempts) + " attempts.");
            }
            else if (guess < secretNumber)
            {
                display->showMessage("Try a higher number.");
            }
            else
            {
                display->showMessage("Try a lower number.");
            }
        } while (guess != secretNumber);

        playAgain = input->getPlayAgain();
    }

    display->showMessage("Thank for playing!");
}
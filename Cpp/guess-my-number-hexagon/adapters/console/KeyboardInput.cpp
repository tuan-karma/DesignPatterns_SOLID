// KeyboardInput.cpp
#include "../../ports/Input.h"
#include <iostream>

class KeyboardInput : public Input
{
public:
    int getGuess() override
    {
        int guess;
        std::cout << "Enter your guess: ";
        std::cin >> guess;
        return guess;
    }

    char getPlayAgain() override
    {
        char playAgain;
        std::cout << "Play again? (y/n): ";
        std::cin >> playAgain;
        return playAgain;
    }
};

// KeyboardGuesses.cpp
#include "../../domain/Guesses.h"
#include <iostream>

class KeyboardGuesses : public Guesses
{
public:
    int getGuess() override
    {
        int guess;
        std::cout << "Enter your guess: ";
        std::cin >> guess;
        return guess;
    }
};

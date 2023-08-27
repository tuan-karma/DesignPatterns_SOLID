// Guesses.h
#pragma once
#include <string>

class Guesses {
public:
    virtual int getGuess() = 0;
    virtual ~Guesses() {}
};

// Interface/Port for Input devices: 
// ./ports/Input.h
#pragma once

class Input {
public:
    virtual int getGuess() = 0;
    virtual char getPlayAgain() = 0;
    virtual ~Input() {}
};

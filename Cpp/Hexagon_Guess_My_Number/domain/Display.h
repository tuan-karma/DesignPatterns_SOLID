// Display.h
#pragma once
#include <string>

class Display {
public:
    virtual void showMessage(const std::string& message) = 0;
    virtual ~Display() {}
};

// ./adapters/consloe/ConsoleDisplay.cpp
#include "../../ports/Display.h"
#include <iostream>

class ConsoleDisplay : public Display
{
public:
    void showMessage(const std::string &message) override
    {
        std::cout << message << std::endl;
    }
};
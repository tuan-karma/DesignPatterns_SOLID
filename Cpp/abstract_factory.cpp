/**
 * Xem chú thích và giải thích ví dụ trong file `abstract_factory.ts` ở thư mục TS tương ứng
 *
 */
#include <iostream>
#include <string>

// Abstract Product: Button and Checkbox
class Button
{
public:
    virtual void display() = 0;
};

class Checkbox
{
public:
    virtual void display() = 0;
};

// Concrete Products: LightButton, DarkButton, LightCheckbox, DarkCheckbox
class LightButton : public Button
{
public:
    void display() override
    {
        std::cout << "Displaying a light-themed button" << std::endl;
    }
};

class DarkButton : public Button
{
public:
    void display() override
    {
        std::cout << "Displaying a dark-themed button" << std::endl;
    }
};

class LightCheckbox : public Checkbox
{
public:
    void display() override
    {
        std::cout << "Displaying a light-themed checkbox" << std::endl;
    }
};

class DarkCheckbox : public Checkbox
{
public:
    void display() override
    {
        std::cout << "Displaying a dark-themed checkbox" << std::endl;
    }
};

// Abstract Factory: GUIFactory
class GUIFactory
{
public:
    virtual Button *createButton() = 0;
    virtual Checkbox *createCheckbox() = 0;
};

// Concrete Factories: LightThemeFactory, DarkThemeFactory
class LightThemeFactory : public GUIFactory
{
public:
    Button *createButton() override
    {
        return new LightButton();
    }
    Checkbox *createCheckbox() override
    {
        return new LightCheckbox();
    }
};

class DarkThemeFactory : public GUIFactory
{
public:
    Button *createButton() override
    {
        return new DarkButton();
    }
    Checkbox *createCheckbox() override
    {
        return new DarkCheckbox();
    }
};

// Client Code
void createUI(GUIFactory *factory)
{
    Button *button = factory->createButton();
    Checkbox *checkbox = factory->createCheckbox();

    button->display();
    checkbox->display();

    delete button;
    delete checkbox;
}

// Usage
int main()
{
    LightThemeFactory lightFactory;
    createUI(&lightFactory);

    DarkThemeFactory darkFactory;
    createUI(&darkFactory);

    return 0;
}
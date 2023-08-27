#include <iostream>
#include <string>

// Base Component (abstract) class
class Coffee
{
public:
    virtual double cost() = 0;
    virtual std::string description() = 0;
    virtual ~Coffee() {}
};

// Concrete Component
class SimpleCoffee : public Coffee
{
public:
    double cost() override
    {
        return 5.0; // Base price of simple coffee
    }

    std::string description() override
    {
        return "Simple Coffee";
    }
};

// Decorator abstract class
class CoffeeDecorator : public Coffee
{
protected:
    Coffee *coffee;

public:
    CoffeeDecorator(Coffee *c) : coffee(c) {}

    double cost() override = 0;             // ~ doesn't provide concrete implementation
    std::string description() override = 0; // ~ ... so they are similar to an abstract class

    virtual ~CoffeeDecorator()
    {
        delete coffee;
    }
};

// Concrete Decorator - Milk
class MilkDecorator : public CoffeeDecorator
{
public:
    MilkDecorator(Coffee *c) : CoffeeDecorator(c) {}

    double cost() override
    {
        return coffee->cost() + 2.0; // Add cost of milk
    }

    std::string description() override
    {
        return coffee->description() + ", Milk";
    }
};

// Concrete Decorator - Sugar
class SugarDecorator : public CoffeeDecorator
{
public:
    SugarDecorator(Coffee *c) : CoffeeDecorator(c) {}

    double cost() override
    {
        return coffee->cost() + 1.0; // Add cost of sugar
    }

    std::string description() override
    {
        return coffee->description() + ", Sugar";
    }
};

int main()
{
    Coffee *simpleCoffee = new SimpleCoffee();
    std::cout << simpleCoffee->description() << std::endl; // "Simple Coffee"
    std::cout << simpleCoffee->cost() << std::endl;        // 5.0

    Coffee *coffeeWithMilk = new MilkDecorator(simpleCoffee);
    std::cout << coffeeWithMilk->description() << std::endl; // "Simple Coffee, Milk"
    std::cout << coffeeWithMilk->cost() << std::endl;        // 7.0

    Coffee *coffeeWithMilkAndSugar = new SugarDecorator(coffeeWithMilk);
    std::cout << coffeeWithMilkAndSugar->description() << std::endl; // "Simple Coffee, Milk, Sugar"
    std::cout << coffeeWithMilkAndSugar->cost() << std::endl;        // 8.0

    // Clean up dynamically allocated objects
    delete coffeeWithMilkAndSugar;

    return 0;
}

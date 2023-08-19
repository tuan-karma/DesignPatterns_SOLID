/**
 * Xem giải thích ví dụ trong file `./TS/src/prototype.ts`
 */
#include <iostream>
#include <string>

// Prototype: Cloneable
class Cloneable
{
public:
    virtual Cloneable *clone() const = 0;
    virtual std::string getProperty() const = 0;
    virtual ~Cloneable(){};
};

// Concrete Prototype
class ConcreteCloneable : public Cloneable
{
private:
    std::string property;

public:
    ConcreteCloneable(std::string prop) : property(prop) {}

    Cloneable *clone() const override
    {
        return new ConcreteCloneable(property);
    }

    std::string getProperty() const override
    {
        return property;
    }
};

// Client
int main()
{
    Cloneable *originalObject = new ConcreteCloneable("Original Object");
    Cloneable *clonedObject = originalObject->clone();

    std::cout << originalObject->getProperty() << std::endl; // Output: "Original Object"
    std::cout << clonedObject->getProperty() << std::endl;   // Output: "Original Object" also

    // Clean up memory
    delete originalObject;
    delete clonedObject;

    return 0;
}
/**
 * Xem `./TS/src/builder.ts` để biết giải thích chi tiết về ví dụ này
 */
#include <iostream>
#include <string>

// Product: ComplexObject
class ComplexObject
{
private:
    std::string property1;
    int property2;
    bool property3;

public:
    ComplexObject(std::string prop1, int prop2, bool prop3)
        : property1(prop1), property2(prop2), property3(prop3) {}

    // Methods and behaviors of ComplexObject
    void showInfo()
    {
        std::cout << "Property 1: " << property1 << ", Property 2: " << property2 << ", Property 3: " << property3 << std::endl;
    }
};

// Builder: ComplexObjectBuilder
class ComplexObjectBuilder
{
private:
    std::string property1 = "";
    int property2 = 0;
    bool property3 = false;

public:
    ComplexObjectBuilder &setProperty1(std::string value)
    {
        property1 = value;
        return *this;
    }

    ComplexObjectBuilder &setProperty2(int value)
    {
        property2 = value;
        return *this;
    }

    ComplexObjectBuilder &setProperty3(bool value)
    {
        property3 = value;
        return *this;
    }

    ComplexObject build()
    {
        return ComplexObject(property1, property2, property3);
    }
};

// Usage
int main()
{
    ComplexObjectBuilder builder;
    ComplexObject complexObject = builder.setProperty1("Value 1").setProperty2(42).setProperty3(true).build();
    // ComplexObject complexObject = builder.build(); // test defaul values
    complexObject.showInfo(); // Output: ... ?

    return 0;
}
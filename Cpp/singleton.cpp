/**
 * Xem giải thích ví dụ trong file `../TS/singleton.ts`
 */
#include <iostream>

class Singleton
{
private:
    static Singleton *instance; // The single instance of the class

    // Private constructor to prevent direct instantiation
    Singleton() {}

public:
    // Static method to get the instance of the Singleton class
    static Singleton *getInstance()
    {
        if (!instance)
        {
            instance = new Singleton();
        }
        return instance;
    }

    // Other methods and properties of the Singleton class
    void doSomething()
    {
        std::cout << "Doing something ..." << std::endl;
    }
};

// Initialize the static instance to nullptr
Singleton *Singleton::instance = nullptr;

// Usage
int main()
{
    Singleton *instance1 = Singleton::getInstance();
    Singleton *instance2 = Singleton::getInstance();

    std::cout << (instance1 == instance2) << std::endl; // Output: 1 (true), both instances are the same

    instance1->doSomething();
    return 0;
}
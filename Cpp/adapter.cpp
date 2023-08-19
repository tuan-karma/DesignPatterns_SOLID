/**
 * Xem giải thích ví dụ trong file `../TS/src/adapter.ts`
*/
#include <iostream>
#include <cmath>

// Existing class with a Square interface
class SquareShape {
private:
    double size;

public:
    SquareShape(double size) : size(size) {}

    double getSize() {
        return size;
    }
};

// New library expects a Circular interface
class CircularShape {
public:
    virtual double getRadius() = 0;
};

// The library's function to check if the shape fits a circular hole of a given diameter
bool doesItFit(CircularShape* shape, double diameter) {
    return (shape->getRadius() * 2 <= diameter);
}

// Adapter to make SquareShape compatible with CircularShape
class CircularAdapter : public CircularShape {
private:
    SquareShape* squareShape;

public:
    CircularAdapter(SquareShape* squareShape) : squareShape(squareShape) {}

    double getRadius() override {
        return sqrt(pow(squareShape->getSize(), 2) * 2) / 2;
    }
};

int main() {
    SquareShape squareShape(5);
    CircularAdapter circularAdapter(&squareShape);

    std::cout << std::boolalpha;
    std::cout << doesItFit(&circularAdapter, 10) << std::endl; // Output: true
    std::cout << doesItFit(&circularAdapter, 7) << std::endl;  // Output: false

    return 0;
}

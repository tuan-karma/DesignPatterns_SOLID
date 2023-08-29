/**
 * Xem giải thích ví dụ trong `./TS/src/strategy.ts`
 */

#include <iostream>

// Strategy interface
class PaymentStrategy
{
public:
    virtual void pay(double amount) = 0;
};

// Concrete strategies
class CreditCardPayment : public PaymentStrategy
{
public:
    void pay(double amount) override
    {
        std::cout << "Paying $" << amount << " with credit card" << std::endl;
    }
};

class PayPalPayment : public PaymentStrategy
{
public:
    void pay(double amount) override
    {
        std::cout << "Paying $" << amount << " with PayPal" << std::endl;
    }
};

// Context
class ShoppingCart
{
private:
    PaymentStrategy *paymentStrategy;

public:
    ShoppingCart(PaymentStrategy *strategy) : paymentStrategy(strategy) {}

    void checkout(double totalAmount)
    {
        paymentStrategy->pay(totalAmount);
    }
};

int main()
{
    CreditCardPayment creditCardStrategy;
    PayPalPayment paypalStrategy;

    ShoppingCart cart1(&creditCardStrategy);
    cart1.checkout(100);

    ShoppingCart cart2(&paypalStrategy);
    cart2.checkout(50);

    return 0;
}

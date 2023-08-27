/**
 * Đọc tài liệu về ví dụ này trong file `./TS/src/observer.ts`
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

// Observer interface
class Observer
{
public:
    virtual void update(const std::string &message) = 0;
};

// Subject (Observable)
class NewsPulisher
{
private:
    std::vector<Observer *> observers;
    std::string lastestMessage;

public:
    // Method to subscribe observers
    void subscribe(Observer *observer)
    {
        observers.push_back(observer);
    }
    // Method to unsubscribe observers
    void unsubscribe(Observer *observer)
    {
        auto it = std::find(observers.begin(), observers.end(), observer);
        if (it != observers.end())
        {
            observers.erase(it);
        }
    }
    // Method to notify observers of a new message
    void notify(const std::string &message)
    {
        lastestMessage = message;
        for (Observer *observer : observers)
        {
            observer->update(lastestMessage);
        }
    }
};

// Concrete Observer
class NewsSubscriber : public Observer
{
private:
    std::string name;

public:
    NewsSubscriber(const std::string &name) : name(name) {}

    void update(const std::string &message) override
    {
        std::cout << name << " received news: " << message << std::endl;
    }
};

int main()
{
    NewsPulisher newsPublisher;

    NewsSubscriber subscriber1("Subscriber 1");
    NewsSubscriber subscriber2("Subscriber 2");
    NewsSubscriber subscriber3("Subscriber 3");

    newsPublisher.subscribe(&subscriber1);
    newsPublisher.subscribe(&subscriber2);
    newsPublisher.subscribe(&subscriber3);

    newsPublisher.notify("Breaking news: C++ Observer Pattern arrived!");

    // Unsubscribe test:
    newsPublisher.unsubscribe(&subscriber1);
    
    newsPublisher.notify("Breaking news: The subscriber 1 has unsubscribed!");

    return 0;
}
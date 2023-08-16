/**
 * Ví dụ dưới đây là viết lại ví dụ tương ứng dùng mẫu Factory Method tạo tiệm trà
 * Xem diễn giải và code mẫu trong thư mục TS (file cùng tên .ts)
 * Biên dịch và chạy thử code: `g++ tea_factory_method.cpp && ./a.out`
 */

#include <iostream>
#include <string>

// Product: Tea
class Tea
{
public:
    virtual std::string brew() = 0;
    virtual std::string package() = 0;
};

// Concrete Products: GreenTea, BlackTea, HerbalTea
class GreenTea : public Tea
{
public:
    std::string brew() override
    {
        return "Brewing green tea ...";
    }

    std::string package() override
    {
        return "Packaging green tea ...";
    }
};

class BlackTea : public Tea
{
public:
    std::string brew() override
    {
        return "Brewing black tea ...";
    }

    std::string package() override
    {
        return "Packaging black tea ...";
    }
};

class HerbalTea : public Tea
{
public:
    std::string brew() override
    {
        return "Brewing herbal tea ...";
    }

    std::string package() override
    {
        return "Packaging herbal tea ...";
    }
};

// Creator: TeaFactory
class TeaFactory
{
public:
    virtual Tea *createTea() = 0;
};

// Concrete Creators: GreenTeaFactory, BlackTeaFactory, HerbalTeaFactory
class GreenTeaFactory : public TeaFactory
{
public:
    Tea *createTea() override
    {
        return new GreenTea();
    }
};

class BlackTeaFactory : public TeaFactory
{
public:
    Tea *createTea() override
    {
        return new BlackTea();
    }
};

class HerbalTeaFactory : public TeaFactory
{
public:
    Tea *createTea() override
    {
        return new HerbalTea();
    }
};

// Client code
void serveTea(TeaFactory *factory)
{
    Tea *tea = factory->createTea();
    std::cout << tea->brew() << std::endl;
    std::cout << tea->package() << std::endl;
    delete tea;
}

int main()
{
    GreenTeaFactory greenTeaFactory;
    serveTea(&greenTeaFactory);

    BlackTeaFactory blackTeaFactory;
    serveTea(&blackTeaFactory);

    HerbalTeaFactory herbalTeaFactory;
    serveTea(&herbalTeaFactory);

    return 0;
}
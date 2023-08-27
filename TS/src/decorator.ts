/**
 * Decorator là một mẫu thiết kế thuộc nhóm cấu trúc
 * - Cho phép thêm hành vi vào các đối tượng riêng lẻ mà không ảnh hưởng đến hành vi của các đối tượng đã tạo ra
 * - Đó là một cách để mở rộng tính năng của các đối tượng trong lúc chạy (run-time) bằng cách gói chúng vào nhiều lớp decorator (trang trí) khác nhau 
 * 
 * Hữu ích và Giới hạn:
 * - Hữu ích khi mở rộng các tính năng của đối tượng sẵn có mà không cần can thiệp vào code đã có 
 * - Các framework thường hay sử dụng chiến thuật này để mở rộng tính năng của các lớp và hàm người dùng viết 
 * - Các khung kiểm thử (testing framework) cũng hay dùng kỹ thuật decorator để tạo các bọc phủ vào các đối tượng cần kiểm thử 
 * - Giới hạn: Mẫu này không phổ biến trong lập trình nhúng do tính giới hạn về phần cứng (RAM, ROM, CPU) của các con chip vi điều khiển
 * 
 * Ví dụ dưới đây:
 * 1. `Coffee` là giao diện cơ sở biểu diễn thành phần mà chúng ta có thể thêm các lớp trang trí
 * 2. `SimpleCoffee` là lớp cụ thể triển khai giao diện `Coffee`
 * 3. `CoffeeDecorator` là bộ trang trí trừu tượng nó cũng triển khai giao diện `Coffee` đồng thời chứa một tham chiếu đến đối tượng thuộc kiểu `Coffee` mà nó sẽ trang trí 
 * 4. `MilkDecorator` và `SugarDecorator` là các lớp trang trí cụ thể nó mở rộng bộ trang trí trừu tượng `CoffeeDecorator` và thêm vào các hành vi (như giá và mô tả) cho loại coffee được trang trí.
 * 5. Phần sử dụng, ta tạo một đối tượng `SimpleCoffee` sau đó "Trang trí" bằng `MilkDecorator` và `SugarDecorator` để tạo ra các loại cafe khác nhau từ loại cơ bản ban đầu. 
 * 
 * Notes:
 * - `protected` là một từ khóa thay đổi cách thức truy cập của biến/đối tượng
 * - trong ví dụ trên đối tượng `coffee` được truyền vào constructor của `CoffeeDecorator` bằng từ khóa `protected`
 * - ... điều đó có nghĩa là các đối tượng con của CofeeDecorator có toàn quyền truy cập vào các thuộc tính, phương thức của đối tượng `coffee` được truyền vào
 * - ... nhưng các thuộc tính này bị giới hạn, không thể truy cập từ bên ngoài class (do đó gọi là protected).
 */

// Base Component interface
interface Coffee {
    cost(): number;
    description(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
    cost(): number {
        return 5; // base price of simple coffee
    }

    description(): string {
        return "Simple Coffee";
    }
}

// Decorator abstract class
abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) { }

    abstract cost(): number;
    abstract description(): string;
}

// Concrete Decorator - Milk
class MilkDecorator extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 2; // Add cost of milk
    }

    description(): string {
        return this.coffee.description() + ", Milk";
    }
}

// Concrete Decorator - Sugar
class SugarDecorator extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 1; // Add cost of sugar
    }

    description(): string {
        return this.coffee.description() + ", Sugar";
    }
}

// Usage
const simpleCoffee: Coffee = new SimpleCoffee();
console.log(simpleCoffee.description()); // "Simple Coffee"
console.log(simpleCoffee.cost()); // 5

const coffeeWithMilk: Coffee = new MilkDecorator(simpleCoffee);
console.log(coffeeWithMilk.description()); // "Simple Coffee, Milk"
console.log(coffeeWithMilk.cost()); // 7

const coffeeWithMilkAndSugar: Coffee = new SugarDecorator(coffeeWithMilk);
console.log(coffeeWithMilkAndSugar.description()); // "Simple Coffee, Milk, Sugar"
console.log(coffeeWithMilkAndSugar.cost()); // 8 
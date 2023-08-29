/**
 * Strategy là mẫu thiết kế thuộc nhóm hành vi 
 * - Cho phép bạn định nghĩa một họ thuật toán, đóng gói từng thuật toán và làm cho chúng có thể hoán đổi cho nhau lúc thực thi 
 * - Cho phép mã khách chọn một thuật toán từ họ nói trên trong lúc chạy mà không cần thay đổi mã sử dụng 
 * 
 * Các thành phần của mẫu Strategy:
 * 1. Context (bối cảnh): đây là lớp giữ tham chiếu đến đối tượng strategy hiện tại 
 * 2. Strategy (chiến lược): Đây là giao diện hoặc lớp trừu tượng định nghĩa các hành vi của thuật toán 
 * 3. Concrete Strategies (các triển khai chiến lược cụ thể): Đây là các lớp triển khai giao diện Strategy nói trên 
 * 
 * Trong ví dụ dưới
 * - ShoppingCart (giỏ hàng) có thể áp dụng/sử dụng các phương pháp/chiến lược thanh toán khác nhau 
 * - Tùy vào chiến lược thanh toán đã chọn: Bằng thẻ tín dụng hoặc qua Paypal, phương thức thanh toán (checkout method) sẽ ủy quyền quy trình thanh toán cho đối tượng tương ứng.
 * 
 * Lưu ý:
 * Ưu điểm của mẫu Strategy:
 * - Có thể thay đổi thuật toán sử dụng lúc chương trình đang chạy 
 * - Cách ly các chi tiết triển khai của thuật toán với mã sử dụng 
 * - Sử dụng composition thay cho kế thừa 
 * - Mẫu này là một điển hình để đạt được nguyên tắc đóng mở (OCP) trong solid: bạn có thể thêm vào một thuật toán mới, mà không cần thay đổi context.
 * 
 * Nhược điểm:
 * - Nếu bạn chỉ sử dụng một vài thuật toán cố định (không đổi) thì không cần phải phức tạp hóa vấn đề bằng cách sử dụng mẫu Strategy
 * - Các ngôn ngữ hỗ trợ lập trình hàm có thể đạt được việc thay đổi thuật toán lúc chạy thông qua hàm lambda một cách đơn giản mà không cần viết thêm các lớp phụ
 * - tham khảo: https://refactoring.guru/design-patterns/strategy 
 */

// Strategy interface
interface PaymentStrategy {
    pay(amount: number): void;
};

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying $${amount} with credit card`);
    }
}

class PayPalPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying $${amount} with PayPal`);
    }
}

// Context 
class ShoppingCart {
    constructor(private payment_strategy: PaymentStrategy) { }

    checkout(total_amount: number): void {
        this.payment_strategy.pay(total_amount);
    }
}

// Client code 
let cart = new ShoppingCart(new CreditCardPayment());
cart.checkout(100);

cart = new ShoppingCart(new PayPalPayment());
cart.checkout(50);

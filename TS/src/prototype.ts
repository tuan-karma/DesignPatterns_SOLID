/**
 * Prototype là một mẫu thiết kế thuộc nhóm tạo tác:
 * - Bạn muốn tạo ra bản sao của một đối tượng (nhiều lần)
 * - Cho phép bạn sao chép các đối tượng mà không cần liên kết mã của mình với các lớp cụ thể
 * - Điều này hữu ích khi bạn muốn tạo các phiên bản mới bằng cách sao chép các phiên bản hiện có 
 * trong khi tránh sự phức tạp của việc tạo ra các đối tượng thông qua các hàm tạo
 * 
 * Ví dụ dưới đây:
 * 1. Giao diện `Cloneable` định nghĩa phương thức `clone` mà tất cả các lớp cụ thể cần phải triển khai.
 * 2. Lớp `ConcreteCloneable` triển khai giao diện `Clonenable` cung cấp mã thực thi cụ thể cho phương thức `clone`
 * Phương thức `getProperty` được thêm vào để hiển thị trạng thái của đối tượng.
 * 3. Trong mã khách, một thể hiện của `ConcreteCloneable` gọi là `originalObject` được tạo ra. 
 * Sau đó, một object nhân bản được tạo nhờ phương thức `clone` của đối tượng gốc. Cơ chế này cho phép bạn tạo ra một thể hiện mới (y hệt) mà không cần gọi hàm khởi tạo (constructor).
 * 4. Cả đối tượng gốc và đối tượng nhân bản đều có cùng trạng thái minh chứng cho khả năng tạo ra các thể hiện mới thông qua việc nhân bản.
 * 
 * Mẫu Prototype đặc biệt hữu ích khi bạn làm việc với các đối tượng có quy trình khởi tạo phức tạp hoặc bạn muốn tạo các biến thể của một đối tượng hiện có trong khi tránh được các chi phí tạo phiên bản từ đầu.
 * Nó tăng cường tính linh hoạt, giúp duy trì sự tách biệt giữa việc tạo và sử dụng đối tượng.
 * 
 */

interface Cloneable {
    clone(): Cloneable;
    getProperty(): string;
}

// Concrete Prototype: ConcreteCloneable
class ConcreteCloneable implements Cloneable {
    private property: string;

    constructor(property: string) {
        this.property = property;
    }

    clone(): Cloneable {
        return new ConcreteCloneable(this.property);
    }

    getProperty(): string {
        return this.property;
    }
}

// Client
const originalObject = new ConcreteCloneable("Original Object");
const cloneObject = originalObject.clone();

console.log(originalObject.getProperty()); // Output: Original Object
console.log(cloneObject.getProperty()); // Output: Original Object also
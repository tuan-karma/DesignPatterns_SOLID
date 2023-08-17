/**
 * Builder là một mẫu thuộc nhóm tạo tác giúp:
 * - Tách biệt việc tạo ra một đối tượng phức tạp với biểu diễn của nó
 * - Cho phép tạo ra các biểu diễn khác nhau của một đối tượng, trong khi vẫn giữ quy trình tạo nhất quán.
 * - Đặc biệt hữu ích khi xử lý các đối tượng có nhiều tham số hoặc cấu hình tùy chọn.
 * 
 * Trong ví dụ dưới đây:
 * 1. Lớp ComplexObject biểu diễn đối tượng phức tạp mà bạn muốn tạo. Nó có nhiều thuộc tính và một phương thức để hiển thị các thông tin của nó.
 * 2. Lớp ComplexObjectBuilder đóng vai trò là trình `xây dựng` (builder). Nó Cung cấp các phương thức để thiết lập từng thuộc tính và trả về phiên bản của buidler, cho phép xâu chuỗi các phương thức.
 * 3. Phương thức `build` của trình `xây dựng` (builder) tạo ra và trả về đối tượng ComplexObject cuối cùng với các thuộc tính xác định.
 * 4. Trong phần sử dụng (usage), bạn tạo một ComplexObject sử dụng `builder` bằng cách xâu chuỗi các phương thức thiết lập (setProperty...) và cuối cùng gọi `build`. 
 * Cách tiếp cận này giúp dễ dàng tạo ra các đối tượng với các cấu hình khác nhau trong khi vẫn duy trì cú pháp rõ ràng và dễ đọc.
 * 
 */
// Product: ComplexObject
class ComplexObject {
    private property1: string;
    private property2: number;
    private property3: boolean;

    constructor(property1: string, property2: number, property3: boolean) {
        this.property1 = property1;
        this.property2 = property2;
        this.property3 = property3;
    }

    // Methods and behaviors of ComplexObject
    public showInfo(): void {
        console.log(`Property 1: ${this.property1}, Property 2: ${this.property2}, Property 3: ${this.property3}`);
    }
}

// Builder: ComplexObjectBuilder
class ComplexObjectBuilder {
    private property1: string = "";
    private property2: number = 0;
    private property3: boolean = false;

    setProperty1(value: string): ComplexObjectBuilder {
        this.property1 = value;
        return this;
    }

    setProperty2(value: number): ComplexObjectBuilder {
        this.property2 = value;
        return this;
    }

    setProperty3(value: boolean): ComplexObjectBuilder {
        this.property3 = value;
        return this;
    }

    build(): ComplexObject {
        return new ComplexObject(this.property1, this.property2, this.property3)
    }
}

// Usage
const builder = new ComplexObjectBuilder();
const complexObject = builder.setProperty1("Value 1").setProperty2(42).setProperty3(true).build();
complexObject.showInfo();
/**
 * Singleton là một mẫu thiết kế thuộc nhóm tạo tác:
 * - giúp đảm bảo chỉ có một khởi tạo duy nhất của lớp trong toàn bộ app
 * - cung cấp một điểm truy cập toàn cục duy nhất 
 * 
 * Hữu ích:
 * - Khi bạn muốn đảm bảo chỉ có duy nhất một khởi tạo của một lớp
 * - ví dụ như quản lý cấu hình (configuration), tài nguyên, hoặc trạng thái dùng chung
 * - hoặc dịch vụ ghi nhật ký app (logging service)
 * 
 * Ví dụ dưới đây:
 * 1. Thuộc tính `instance` của lớp `Singleton` là `private static` để chứa một thể hiện duy nhất của lớp 
 * 2. Bộ tạo `constructor` của lớp này được để `private` để tránh việc khởi tạo trực tiếp lớp từ bên ngoài
 * 3. Phương thức tĩnh `getInstance` được sử dụng để truy cập một phiên bản duy nhất thể hiện của lớp. Nếu thể hiện không tồn tại, nó sẽ tạo ra, nếu không nó sẽ trả về thể hiện hiện có.
 * 4. Phương thức `doSomething` để lớp này thực hiện các chức năng hữu ích của nó 
 * 5. Khi tạo các thể hiện bằng Singleton.getInstance(), bạn sẽ luôn nhận được cùng một phiên bản. Điều này đảm bảo rằng lớp chỉ có một thể hiện duy nhất trong suốt vòng đời của chương trình.
 */

class Singleton {
    private static instance: Singleton | null = null; // zero or single instance of the class 

    // private constructor to prevent direct instantiation 
    private constructor() {}

    // static method to get the instance of the Singleton class 
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    // Other methods and properties of the Singleton class 
    public doSomething(): void {
        console.log("I am doing something ...");
    }
}

// Usage 
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true, both instances are the same
instance1.doSomething();
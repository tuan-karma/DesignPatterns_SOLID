/**
 * Cốt lõi của Factory Method là một mẫu thiết kế thuộc họ `tạo tác`:
 * - nó cung cấp một giao diện để tạo ra các đối tượng một cách vô cùng linh hoạt.
 * - nó thúc đẩy tạo ra mối liên kết lỏng (loose coupling) giữa bộ tạo (creator) và sản phẩm cần tạo ra (product)
 * - cho phép các thay đổi trong quá trình tạo mà không làm thay đổi mã sử dụng (client code)
 *
 * Trong ví dụ này:
 * - Ta tạo một quán trà giả lập: có thể phục vụ nhiều loại trà, và quan trọng là có thể thêm loại trà mới trong tương lai
 * - Dựa theo mẫu `Factory Method`, ta tạo các giao diện sản phẩm (product) và giao diện bộ tạo (creator) dùng abstract class
 * - ... Các giao diện này giống như một hợp đồng bắt buộc các lớp cụ thể thêm vào sau này cần phải tuân theo `giao diện` đã định trước
 * - Ví dụ, nếu ta muốn thêm một loại trà mới vào thực đơn như `VNTea` ta chỉ việc viết thêm (mở rộng - theo nguyên tắc OCP)
 * - ... Lớp cụ thể cho sản phẩm `class VNTea implement Tea` lớp này phải triển khai (implement) giao diện `Tea` cho trước: bắt buộc phải có hai phương thức `brew` và `package`
 * - ... Lớp cụ thể cho bộ tạo `VNTeaFactory extends TeaFactory` lớp này mở rộng/kế thừa lớp trừu tượng `TeaFactory` triển khai phương thức `createTea` trả về sản phẩm `VNTea`
 *
 * Như vậy, bằng cách sử dụng mẫu Factory Method trong ví dụ này ta có thể:
 * - Mở rộng ứng dụng mà không phải thay đổi bất kỳ mã nào có sẵn, trừ mã sửu dụng (client/usage code), điều này tuân theo nguyên tắc đóng-mở (OCP) trong SOLID
 * - Các thành phần lớp trên không phụ thuộc vào thành phần lớp dưới, thay vào đó cả hai đều phụ thuộc vào lớp trừu tượng/hoặc giao diện được định nghĩa trước (nguyên tắc đảo ngược phụ thuộc DIP trong SOLID)
 */
// Concrete Products: GreenTea, BlackTea, HerbalTea
class GreenTea {
    brew() {
        return "Brewing green tea...";
    }
    package() {
        return "Packaging green tea...";
    }
}
class BlackTea {
    brew() {
        return "Brewing black tea...";
    }
    package() {
        return "Packaging black tea...";
    }
}
class HerbalTea {
    brew() {
        return "Brewing herbal tea...";
    }
    package() {
        return "Packaging herbal tea...";
    }
}
// Creator: TeaFactory
class TeaFactory {
}
// Concrete Creators: GreenTeaFactory, BlackTeaFactory, HerbalTeaFactory
class GreenTeaFactory extends TeaFactory {
    createTea() {
        return new GreenTea();
    }
}
class BlackTeaFactory extends TeaFactory {
    createTea() {
        return new BlackTea();
    }
}
class HerbalTeaFactory extends TeaFactory {
    createTea() {
        return new HerbalTea();
    }
}
// Client code
function serveTea(factory) {
    const tea = factory.createTea();
    console.log(tea.brew());
    console.log(tea.package());
}
// Usage
const greenTeaFactory = new GreenTeaFactory();
serveTea(greenTeaFactory);
const blackTeaFactory = new BlackTeaFactory();
serveTea(blackTeaFactory);
const herbalTeaFactory = new HerbalTeaFactory();
serveTea(herbalTeaFactory);
export {};
//# sourceMappingURL=tea_factory_method.js.map
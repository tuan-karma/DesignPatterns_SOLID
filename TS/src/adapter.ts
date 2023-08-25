/**
 * Adapters là mẫu thiết kế thuộc nhóm cấu trúc:
 * - Cho phép các đối tượng có giao diện không tương thích hoạt động cùng nhau (ví dụ XML API <--> JSON API).
 * - Nó hoạt động như một cầu nối giữa hai giao diện không tương thích, làm cho chúng tương thích với nhau mà không cần thay đổi mã nguồn của chúng.
 * - Mẫu này hữu ích khi bạn muốn sử dụng lại mã hoặc giao diện hiện có với thư viện bên thứ 3 hoạt động với giao diện khác.
 *
 * Ví dụ dưới đây:
 * Giả sử ta sử dụng một thư viện tính kích thước của lỗ tròn để một vật hình tròn có thể lọt qua. Thư viện này chỉ hoạt động với các hình dạng tròn.
 * Nhưng ta đang viết mã cho các hình vuông, mà ta muốn sử dụng thư viện bên trên.
 *
 * 1. Ta đang có sẵn lớp `SquareShape` với phương thức `getSize` trả về kích thước cạnh của nó.
 * 2. Thư viện ta dùng mong đợi một giao diện hình tròn `CircularShape` interface với phương thức `getRadius` trả về bán kính hình tròn.
 * 3. Ta tạo ra một lớp điều hợp (Adapter) `CircularAdapter`, lớp này nhận vào `SquareShape` và điều chỉnh hành vi của nó phù hợp với giao diện hình tròn.
 * 4. Trong mã khách, ta tạo một phiên bản của hình vuông `SquareShape`, tạo bộ điều hợp cho nó, sau đó gọi hàm kiểm tra kích thước `isItFit` từ thư viện kia đối với bộ điều hợp này.
 * Bộ điều hợp cho phép chúng ta sử dụng thư viện mới mà không cần thay đổi lớp `SquareShape` ban đầu.
 *
 */

// Existing class with a Square interface
class SquareShape {
    constructor(private size: number) { }

    getSize(): number {
        return this.size;
    }
}

// New library expects a Circular interface
interface CircularShape {
    getRadius(): number;
}

// The library's function to check does the shape fit a circular hole of a given diameter
function doesItFit(shape: CircularShape, diameter: number): boolean {
    return shape.getRadius() * 2 <= diameter;
}

// Adapter to make SquareShape compatible with CircularShape
class CircularAdapter implements CircularShape {
    constructor(private squareShape: SquareShape) { }

    getRadius(): number {
        return Math.sqrt(Math.pow(this.squareShape.getSize(), 2) * 2) / 2;
    }
}

// Usage
const squareShape = new SquareShape(5);
const circularAdapter = new CircularAdapter(squareShape);
console.log(doesItFit(circularAdapter, 10)); // Output: True
console.log(doesItFit(circularAdapter, 7)); // Output: False

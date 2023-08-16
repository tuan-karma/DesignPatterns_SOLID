## Factory Method

Định nghĩa: là một mẫu thiết kế thuộc họ "tạo tác" cung cấp giao diện để tạo các đối tượng trong lớp cha, nhưng cho phép các lớp con thay đổi kiểu đối tượng sẽ được tạo.

Các thành phần chính của mẫu thiết kế này

1. Sản phẩm (Product): Đây là biểu diễn trừu tượng về những gì Phương thức Nhà máy (Factory Method) sẽ tạo ra. Nó xác định giao diện chung mà tất cả các sản phẩm cụ thể cần tuân theo.

2. Sản phẩm cụ thể (Concrete Product): Đây là triển khai thực tế của giao diện sản phẩm. Mỗi sản phẩm cụ thể gói gọn hành vi đặc trưng của nó.

3. Bộ tạo (Creator): Đây là lớp trừu tượng khai báo phương thức nhà máy. Phương thức này trả về một thể hiện của một sản phẩm cụ thể, nhưng nó không gắn với bất kỳ việc triển khai của sản phẩm cụ thể nào.

4. Bộ tạo cụ thể (Concrete Creator): Đây là các lớp con của lớp Creator. Chúng cung cấp việc triển khai phương thức nhà máy, do đó xác định loại sản phẩm cụ thể sẽ được khởi tạo.

## Ví dụ

Tưởng tượng bạn đang xây dựng một ứng dụng phần mềm mô phỏng một cửa hàng trà. Bạn có nhiều loại trà khác nhau, mỗi loại có quy trình pha chế (brew) và đóng gói (package) riêng. Đây là lúc mà mẫu "Factory Method" phát huy tác dụng.

```ts
// Product: Tea
interface Tea {
  brew(): string;
  package(): string;
}

// Concrete Products: GreenTea, BlackTea, HerbalTea
class GreenTea implements Tea {
  brew() {
    return "Brewing green tea...";
  }

  package() {
    return "Packaging green tea...";
  }
}

class BlackTea implements Tea {
  brew() {
    return "Brewing black tea...";
  }

  package() {
    return "Packaging black tea...";
  }
}

class HerbalTea implements Tea {
  brew() {
    return "Brewing herbal tea...";
  }

  package() {
    return "Packaging herbal tea...";
  }
}

// Creator: TeaFactory
abstract class TeaFactory {
  abstract createTea(): Tea;
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
function serveTea(factory: TeaFactory) {
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
```

## Ưu điểm của mẫu thiết kế này

- Linh hoạt: Giới thiệu một loại trà mới đòi hỏi những thay đổi tối thiểu. Chỉ cần tạo một lớp bộ tạo cụ thể (Concrete Creator) là có thể được.
- Tách rời: Mã khách sử dụng các đối tượng trà mà không cần biết nó là loại trà cụ thể nào. Nó chỉ tương tác với giao diện chung.
- Mở rộng: Mẫu Factory Method cung cấp nền tảng vững chắc cho việc mở rộng trong tương lai. Thêm sản phẩm mới hoặc biến thể sản phẩm một cách dễ dàng.

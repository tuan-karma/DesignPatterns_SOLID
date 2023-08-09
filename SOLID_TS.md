# Nguyên lý SOLID và ứng dụng vào mã Typescript

Lược dịch và tuyển chọn bởi "Nguyễn Anh Tuấn". Bài viết gốc: [Destiny Erhabor's Applying SOLID principles to TypeScript](https://blog.logrocket.com/applying-solid-principles-typescript/)

Được định nghĩa từ lâu, các nguyên tắc thiết kế SOLID nhằm cải thiện khả năng đọc, khả năng thích ứng, khả năng mở rộng và khả năng bảo trì của các thiết kế hướng đối tượng. Năm nguyên tắc thiết kế lớp hướng đối tượng (SOLID) tạo thuận lợi cho việc phát triển phầm mềm dễ hiểu, đã được kiểm chứng và có thể sử dụng với bất kỳ ngôn ngữ lập trình nào.

Các nguyên lý này khởi nguồn từ Robert C. Martin (Uncle Bob) trong bài viết của ông ta năm 2000. Sau này để nhấn mạnh tầm quan trọng của nó người ta đã đặt ra chữ viết tắt SOLID (hàm nghĩa rắn chắc) cho các nguyên lý này:

- S: Nguyên tắc đơn trách nhiệm (Single responsibility)
- O: Nguyên tắc đóng mở (Open-closed)
- L: Nguyên tắc thay thế Liskov (Liskov substitution)
- I: Nguyên tắc phân tách giao diện (Interface segregation)
- D: Nguyên tắc đảo ngược phụ thuộc (Dependency inversion)

## S: Nguyên tắc đơn trách nhiệm

Theo nguyên tắc đơn trách nhiệm, một lớp/class chỉ chịu trách nhiệm cho một hoạt động và chỉ có một nguyên nhân để thay đổi. Quy tắc này cũng áp dụng cho việc tổ chức/phân chia các hàm và mô-đun.

Xem xét ví dụ dưới đây.

```ts
class Student {
  public createStudentAccount() {
    // some logic
  }

  public calculateStudentGrade() {
    // some logic
  }

  public generateStudentData() {
    // some logic
  }
}
```

Nguyên tắc đơn trách nhiệm (một nhiệm vụ duy nhất) bị phá vỡ trong lớp `Student` ở mã trên. Do đó, chúng ta cần tái cấu trúc lại mã, chia lớp `Student` thành các trạng thái trách nhiệm khác nhau. Theo SOLID, ý niệm về `trách nhiệm` chính là lý do khiến ta phải thay đổi mã sau này.

Để xác định lý do thay đổi mã, chúng ta cần xem xét trách nhiệm của chương trình kể trên. Chúng ta có thể phải thay đổi mã trong lớp `Student` vì ba lý do khác nhau:

- Logic tính toán trong việc tạo ra tài khoản sinh viên của `createStudentAccount`
- Logic tính điểm cho sinh viên thay đổi
- Định dạng báo cáo dữ liệu về sinh viên thay đổi.

Nguyên tắc đơn trách nhiệm nhấn mạnh rằng ba khía cạnh trên đặt ra ba trách nhiệm khác nhau cho lớp `Student`:

```ts
class StudentAccount {
  public createStudentAccount() {
    // some logic
  }
}

class StudentGrade {
  public calculateStudentGrade() {
    // some logic
  }
}

class StudentData {
  public generateStudentData() {
    // some logic
  }
}
```

Bây giờ chúng ta đã chia các lớp, mỗi lớp chỉ có một nhiệm vụ, một trách nhiệm và chỉ cần thực hiện một thay đổi khi cần. Giờ đây, mã của chúng ta đơn giản, dễ giải thích, và dễ hiểu hơn nhiều.

## O: Nguyên tắc đóng mở

Nguyên tắc "đóng-mở" nói rằng, các thực thể phần mềm _nên_ "đóng" với việc sửa đổi, nhưng "mở" với việc mở rộng. Khái niệm thiết yếu đằng sau cách tiếp cận này là chúng ta có thể thêm chức năng mới mà không cần phải thay đổi mã hiện có.

Xem xét mã typescript sau về các lớp/class hình học cho hình tam giác và hình chữ nhật:

```ts
class Triangle {
  public base: number;
  public height: number;
  constructor(base: number, height: number) {
    this.base = base;
    this.height = height;
  }
}


class Rectangle {
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
```

Giờ chúng ta muốn phát triển một hàm tính tổng diện tích của một tập hợp các hình. Với thiết kế hiện tại, hàm này có thể viết như sau:

```ts
function computeAreasOfShapes(shapes: Array<Rectangle | Triangle>) {
  return shapes.reduce((computedArea, shape) => {
    if (shape instanceof Rectangle) {
      return computedArea + shape.width * shape.height;
    }
    if (shape instanceof Triangle) {
      return computedArea + shape.base * shape.height * 0.5;
    }
  }, 0);
}
```

Vấn đề với phương pháp này là mỗi khi chúng ta muốn thêm một hình dạng mới (ví dụ hình tròn), chúng ta phải thay đổi hàm `computeAreasOfShapes`, do đó nó vi phạm nguyên tắc "đóng-mở" (đóng với việc sửa đổi code, mở với việc mở rộng code). Để minh chứng điều này, hãy thêm một hình dạng khác, gọi là hình tròn `Circle`:

```ts
class Circle {
  public radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
}
```

Đi ngược lại nguyên lý "đóng-mở", hàm `computeAreasOfShapes` phải thay đổi để nhận một thực thể mới gọi là hình tròn:

```ts
function computeAreasOfShapes(
  shapes: Array<Rectangle | Triangle | Circle>
) {
  return shapes.reduce(
    (calculatedArea, shape) => {
      if (shape instanceof Rectangle) {
        return computedArea + shape.width * shape.height;
      }
      if (shape instanceof Triangle) {
        return computedArea + shape.base * shape.height * 0.5 ;
      }
      if (shape instanceof Circle) {
        return computedArea + shape.radius * Math.PI;
      }
    },
    0
  );
```

Chúng ta có thể giải quyết vấn đề này bằng cách đảm bảo rằng tất cả các hình dạng (`shapes`) của chúng ta đều có một phương thức trả về diện tích:

```ts
interface ShapeAreaInterface {
  getArea(): number;
}
```

Giờ đây, các lớp `shapes` đều phải triển khai cái `giao diện/interface` đã được định nghĩa bên trên có chứa phương thức `getArea()` tương ứng của nó:

```ts
class Triangle implements ShapeAreaInterface {
  public base: number;
  public height: number;
  constructor(base: number, height: number) {
    this.base = base;
    this.height = height;
  }

  public getArea() {
    return this.base * this.height * 0.5;
  }
}

class Rectangle implements ShapeAreaInterface {
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  public getArea() {
    return this.width * this.height;
  }
}
```

Giờ đây chúng ta chắc chắn rằng tất cả các hình dạng (`shapes`) đều có phương thức `getArea` để tính diện tích tương ứng của nó, chúng ta có thể tận dụng điều này trong code chính. Lúc này mã của hàm `computeAreasOfShaphes` sẽ đơn giản và tổng quát hơn như sau:

```ts
function computeAreasOfShapes(shapes: Shape[]) {
  return shapes.reduce((computedArea, shape) => {
    return computedArea + shape.getArea();
  }, 0);
}
```

Bây giờ, chúng ta _không_ cần thay đổi mã của hàm chính (hàm sử dụng/hàm client) `computeAreasOfShapes` mỗi khi muốn mở rộng thêm một loại hình dạng mới vào ứng dụng. Bạn có thể thử cho thêm hình tròn vào, sẽ thấy điều đó. Chúng ta đã làm cho mã trở nên mở với sự mở rộng và đóng với các thay đổi!

## L: Nguyên tắc thay thế Liskov

Nguyên tắc thay thế Liskov (Liskov Substitution Principle - LSP), được đặt theo tên của nhà khoa học máy tính
[Barbara Liskov](https://en.wikipedia.org/wiki/Liskov_substitution_principle), giúp đảm bảo rằng việc sửa đổi một thành phần trong hệ thống không gây ảnh hưởng _tiêu cực_ đến các thành phần khác của hệ thống.

Nguyên tắc thay thế Liskov phát biểu rằng các đối tượng của lớp cha nên được thay thế bằng các đối tượng của lớp con mà không ảnh hưởng đến tính chính xác của chương trình. Về bản chất, nếu S là một kiểu con của T, các thể hiện của T có thể được thay thế bằng các thể hiện của S mà không gây ra hành vi không mong muốn.

Phát biểu ngắn gọn của nguyên tắc này: "Kiểu con phải thay thế được cho kiểu cơ sở" ("Subtypes must be substituable for their base types").

Để làm rõ hơn vấn đề, ta xét ví dụ kinh điển về hình học 2D, viết chương trình tính diện tích các hình 2D:

```ts
abstract class Shape {
  abstract area(): number;
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

function printArea(shape: Shape): void {
  console.log(`Area: ${shape.area()}`);
}

const rect = new Rectangle(4, 5);
const circle = new Circle(3);

printArea(rect); // This should work as expected
printArea(circle); // This should work seamlessly
```

Trong mã trên, cả `Rectangle` và `Circle` đều là các lớp con của lớp trừu tượng `Shape`.

Từ khóa `abstract` trong TypeScript để khai báo một lớp trừu tượng, đó là một loại lớp không thể khởi tạo trực tiếp. Nó phục vụ như một bản thiết kế cho các lớp con kế thừa nó. Các lớp trừu tượng có thể chứa các phương thức trừu tượng (cũng bởi từ khóa `abstract` như trong ví dụ trên), các phương thức này được khai báo mà không viết mã triển khai trong lớp trừu tượng. Các lớp con buộc phải cung cấp mã triển khai cụ thể cho phương thức trừu tượng trong lớp mà nó kế thừa. Các lớp trừu tượng cho phép bạn định nghĩa hành vi và cấu trúc chung nên được chia sẻ giữa các lớp con của nó.

Ở đây, cả hình chữ nhật (`Rectangle`) và hình tròn (`Circle`) đều là các lớp con của hình dạng (`Shape`). Nguyên tắc thay thế Liskov ngụ ý rằng bạn sẽ có thể thay thế một đối tượng `Rectangle` cho một đối tượng `Shape` mà không gặp bất kỳ sự cố nào. Tương tự, các thực thể kiểu `Circle` có thể thay thế cho kiểu `Shape` ở bất kỳ đâu, như thấy trong đoạn mã sử dụng ở cuối chương trình bên trên.

Nguyên tắc này đảm bảo rằng các lớp con tôn trọng giao kèo/hợp đồng (contract) được thiết lập bởi lớp cha của chúng, ngăn chặn các kết quả không mong muốn. Trong trường hợp này, việc thay thế các đối tượng Hình chữ nhật và Hình tròn cho các đối tượng Hình dạng nói chung, thể hiện sự hài hòa và khả năng dự đoán mà nguyên tắc thay thế Liskov _cố gắng_ đạt được.

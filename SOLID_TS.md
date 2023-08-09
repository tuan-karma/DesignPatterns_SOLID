# Nguyên lý SOLID và ứng dụng vào mã TypeScript

_Lược dịch và tuyển chọn bởi "Nguyễn Anh Tuấn". Bài viết gốc: [Destiny Erhabor's Applying SOLID principles to TypeScript](https://blog.logrocket.com/applying-solid-principles-typescript/)_

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

> Phát biểu: Chúng ta nên hạn chế việc chỉnh sửa bên trong một class hoặc mô-đun có sẵn, thay vào đó hãy xem xét mở rộng chúng. (Software modules should be closed for modifications but open for extensions)

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

## I: Nguyên tắc phân tách giao diện (Interface segregation)

Nguyên tắc phân tách giao diện _khuyến khích_ các giao diện nhỏ hơn và mới mục tiêu cụ thể hơn. Theo khái niệm này, nhiều giao diện dành riêng cho mã sử dụng cụ thể (client-specific) được ưa thích hơn so với một giao diện đa mục đích.

Nói cách khác, nguyên tắc phân tách giao diện (Interface Segregation Principle - ISP) là một trong bộ nguyên tắc SOLID (~vững chắc) tập trung vào việc thiết kế các giao diện dành riêng cho nhu cầu của mã khách (client). Nó nhấn mạnh rằng một lớp không nên bị buộc phải triển khai các giao diện mà nó không sử dụng. Thay vào đó, các mã khách chỉ nên được yêu cầu phụ thuộc vào các giao diện phù hợp với ngữ cảnh của chúng (bằng cách phân tách một giao diện tổng quát thành nhiều giao diện có mục đích cụ thể hơn). Điều này giúp ngăn chặn các phụ thuộc không cần thiết, đồng thời thúc đẩy việc viết mã có tính mô-đun và dễ bảo trì hơn.

Để hiểu và sử dụng lý thuyết đơn giản này, hãy xét tình huống sau:

```ts
interface ShapeInterface {
  calculateArea();
  calculateVolume();
}
```

Tất cả các phương thức phải được định nghĩa khi một lớp triển khai giao diện này, ngay cả khi lớp đó không sử dụng hoặc không áp dụng hết các phương thức đó:

```ts
class Square implements ShapeInterface {
  calculateArea() {
    // some logic
  }
  calculateVolume() {
    // some logic
  }
}

class Cylinder implements ShapeInterface {
  calculateArea() {
    // some logic
  }
  calculateVolume() {
    // some logic
  }
}
```

Trong ví dụ trên, ta thấy rằng phương thức tính thể tích không thể áp dụng cho hình vuông, nhưng vẫn phải định nghĩa theo giao diện nó tuân theo.

Nguyên tắc phân tách giao diện sẽ đặt các giao diện nhỏ gọn hơn với vai trò cụ thể:

```ts
interface AreaInterface {
  calculateArea();
}

interface VolumeInterface {
  calculateVolume();
}
```

Nhờ vậy chúng ta có thể ngăn chăn các giao diện quá khổ và đơn giản hóa việc bảo trì chương trình bằng cách thay đổi cách chúng ta nghĩ về giao diện, như sau:

```ts
class Square implements AreaInterface {
  calculateArea() {
    // some logic
  }
}

class Cylinder implements AreaInterface, VolumeInterface {
  calculateArea() {
    // some logic
  }
  calculateVolume() {
    // some logic
  }
}
```

## D: Nguyên tắc đảo ngược phụ thuộc (Dependency inversion)

Theo khái niệm đảo ngược phụ thuộc, các mô-đun mức cao không nên phụ thuộc vào mô-đun cấp thấp (ở dưới). Thay vào đó, cả hai nên dựa vào cơ chế trừu tượng hóa (abstraction).

Chú Bob tóm tắt quy tắc này trong bài báo "Các nguyên tắc thiết kế và các mẫu thiết kế" năm 2000 của mình như sau:
"Nếu nguyên tắc đóng-mở (OCP) nêu mục tiêu của kiến trúc hướng đối tượng (OO), thì nguyên tắc đảo ngược phụ thuộc (DIP) chỉ ra cơ chế chính của mục tiêu này."

Nói một cách đơn giản, cả mô-đun mức cao và mức thấp sẽ phụ thuộc vào sự trừu tượng hơn là mô-đụ cấp cao phụ thuộc vào mô-đun cấp thấp. Mọi phụ thuộc trong thiết kế nên được hướng về một lớp hoặc giao diện trừu tượng (abstract class/interface). Không nên có sự phụ thuộc nào vào một lớp cụ thể.

Xét ví dụ minh họa để làm rõ nguyên tắc này. Ví dụ một dịch vụ đặt hàng (order service). Trong ví dụ này, ta sử dụng lớp OrderService, lớp này ghi lại các đơn đặt hàng trong cơ sở dữ liệu. Lớp mức thấp ở bên dưới là MySQLDatabase đóng vai trò như sự phụ thuộc trực tiếp của lớp OrderService.

Trong trường hợp này, chúng ta đã vi phạm nguyên tắc đảo ngược phụ thuộc. Trong tương lai, nếu chúng ta chuyển sang sử dụng hệ cơ sở dữ liệu khác, chúng ta sẽ phải sửa đổi lớp OrderService:

```ts
class OrderService {
  database: MySQLDatabase;

  public create(order: Order): void {
    this.database.create(order);
  }

  public update(order: Order): void {
    this.database.update;
  }
}

class MySQLDatabase {
  public create(order: Order) {
    // create and insert to database
  }

  public update(order: Order) {
    // update database
  }
}
```

Bằng cách thiết kế một lớp giao diện và làm cho lớp OrderService phụ thuộc vào nó, chúng ta có thể cải thiện tình trạng này bằng cách đảo ngược sự phụ thuộc. Bây giờ, thay vì dựa vào một lớp cấp thấp, lớp cấp cao phụ thuộc vào một sự trừu tượng hóa.

Chúng ta tạo một giao diện/interface giúp trừu tượng hóa các cơ sở dữ liệu như sau:

```ts
interface Database {
  create(order: Order): void;
  update(order: Order): void;
}

class OrderService {
  database: Database;

  public create(order: Order): void {
    this.database.create(order);
  }

  public update(order: Order): void {
    this.database.update(order);
  }
}

class MySQLDatabase implements Database {
  public create(order: Order) {
    // create and insert to database
  }

  public update(order: Order) {
    // update database
  }
}
```

Giờ đây, không không cần thay đổi lớp OrderService, chúng ta có thể thêm và mở rộng các dịch vụ cơ sở dữ liệu mới.

## Kết luận

Trong bài viết này, chúng ta đã khám phá năm nguyên tắc trong SOLID với các ví dụ thực tế bằng TypeScript. Các nguyên tắc SOLID cho phép chúng ta cải thiện khả năng đọc và khả năng bảo trì mã của mình, đồng thời chúng cũng giúp làm cho mã của chúng ta đơn giản hơn mà không ảnh hướng tới các vùng khác trong ứng dụng.

Khi viết mã, bạn nên ghi nhớ những nguyên tắc này. Hãy chắc chắn hiểu ý nghĩa của chúng, chúng là gì và tại sao lại cần chúng bên cạnh mô thức lập trình hướng đối tượng (OOP). Chúc viết code vui vẻ!

---

## Các bình luận nâng cao

- Để ý các từ _nên_ và _khuyến khích_ sử dụng trong bài viết. Điều đó chứng tỏ bộ các nguyên tắc thiết kế kể trên đưa ra để mọi người hướng tới chứ không phải nguyên tắc bắt buộc trong viết mã. Không nên cố gắng tuân thủ nó một cách cứng nhắc và mù quáng. Suy cho cùng việc viết một chương trình máy tính là để giải quyết một vấn đề thực tế, giống như quá trình giải một bài toán, cần hướng tới đáp án có ích bằng tư duy sáng tạo và cởi mở.

- Sự liên quan của các nguyên tắc thiết kế (design principles) và mẫu thiết kế (design patterns): Nguyên tắc thiết kế giống như một sự định hướng chung, còn các mẫu dạng thiết kế giống như các kinh nghiệm cụ thể rút ra từ việc thiết kế nhiều ứng dụng trong thực tế người ta thấy các dạng mẫu đó lặp đi lặp lại và đúc rút ra các mẫu phổ biến để giúp những nhà phát triển đi sau tham chiếu nhằm tiết kiệm công sức và thời gian. Các bài viết tiếp theo trong repo này sẽ đi vào từng mẫu thiết kế cụ thể.

- Tôi nhận thấy các mẫu thiết kế xuất hiện rất nhiều từ công việc viết các game (trò chơi) máy tính. Đặc điểm của loại chương trình này là nó chứa rất nhiều các đối tượng, thực thể tương tác với nhau. Vì vậy bạn có thể chọn các game đơn giản nổi tiếng để viết và thực hành các nguyên lý và mẫu thiết kế trong quá trình học. Một số ý tưởng xuất hện trong đầu tôi hiện thời: game tic-tac-toe (cờ caro, có hai người chơi tương tác nên khá nhiều mẫu thiết kế sẽ được áp dụng), game snake (rắn ăn quả, một người chơi, nhưng cũng rất hướng đối tượng), game pong (bóng bàn, hai người chơi, có sử dụng các cơ chế va chạm vật lý).

- Câu hỏi nâng cao 1: hai ví dụ TypeScript cho nguyên tắc đóng-mở (OCP) và nguyên tắc thay thế Liskov (LSP) nhìn khá giống nhau. Vậy làm sao để phân biệt hai nguyên tắc này? Hãy nghĩ về các trường hợp mã tuân theo OCP nhưng vi phạm LSP và ngược lại. Cũng nên đọc kỹ toàn bộ bài viết sẽ rút ra được kết luận cho câu hỏi này.

- Câu hỏi nâng cao 2: TypeScript cung cấp cả `interface` và `abstract` class để làm lớp giao diện và lớp trừu tượng. Hai cái này giống khác nhau như thế nào (cụ thể trong TypeScript) và có thể dùng thay thế cho nhau được hay không. Trong khi đó, trong ngôn ngữ C++ chỉ cung cấp các lớp trừu tượng bằng từ khóa `abstract` để thực hiện các nguyên lý trong SOLID, hãy tìm hiểu thêm về vấn đề này.

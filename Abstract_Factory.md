# Mẫu thiết kế Nhà máy trừu tượng

_Dịch từ: https://refactoring.guru/design-patterns/abstract-factory_

## Mục đích

Mẫu này thuộc nhóm "tạo tác" cho phép bạn tạo ra các họ các đối tượng liên quan tới nhau mà không cần xác định các lớp cụ thể. Lớp cụ thể (concrete classes) là lớp có mã triển khai định nghĩa tất cả các phương thức trong nó dùng để phân biệt với các lớp trừu tượng (chỉ khai báo các phương thức).

## Bài toán

Hình dung bạn đang cần tạo ra một trình mô phỏng cửa hàng nội thất. Mã của bạn bao gồm các lớp đại diện cho:

1. Một nhóm các sản phẩm liên quan, như: `Ghế` + `Sofa` + `Bàn cà phê`.
2. Một số biến thể của nhóm này. Ví dụ: các sản phẩm `Ghế` + `Sofa` + `Bàn cà phê` có các biến thể sau: `Modern`, `Victorian`, `ArtDeco` (~ Hiện đại, cổ điển, trang trí nghệ thuật).

![Họ các sản phẩm và biến thể của chúng](images/abstract_factory_product_families.png)
_Họ các sản phẩm và biến thể của chúng._

Bạn cần tìm cách tạo ra các đối tượng đồ nội thất riêng lẻ sao cho chúng ăn khớp với các đối tượng khác trong cùng một họ. Khách hàng khá tức giận nếu họ nhận được các đồ nội thất lệch họ nhau.

![Sofa kiểu hiện đại không thể nào hợp với các ghế kiểu cổ điển](images/abstract-factory-comic-1-en.png)
_Sofa kiểu hiện đại không thể nào hợp với các ghế kiểu cổ điển._

Ngoài ra bạn không muốn thay đổi mã chương trình đang có khi thêm sản phẩm hoặc dòng sản phẩm mới vào chương trình. Các nhà cung cấp đồ nội thất cập nhật danh mục của họ rất thường xuyên và bạn sẽ không muốn thay đổi các mã chương trình lõi mỗi khi điều đó xảy ra.

## Giải pháp

Điều đầu tiên mà mẫu Abstract Factory gợi ý là khai báo rõ ràng các giao diện cho từng sản phẩm riêng biệt của dòng sản phẩm (ví dụ: ghế, ghế sofa hoặc bàn cà phê). Sau đó, bạn có thể làm cho tất cả các biến thể của sản phẩm tuân theo các giao diện đó. Ví dụ: tất cả các biến thể ghế có thể triển khai giao diện `Chair`; tất cả các biến thể của bàn cà phê đều có thể triển khai giao diện `CoffeeTable`, v.v.

![Tất cả các biến thể của cùng một đối tượng phải được chuyển sang một lớp phân cấp đơn](images/Abstract_Factory_solution1.png)
_Tất cả các biến thể của cùng một đối tượng phải được chuyển sang một lớp phân cấp đơn._

Bước tiếp theo là khai báo Abstract Factory — một giao diện chứa một loạt các phương thức tạo tác cho tất cả các sản phẩm thuộc họ sản phẩm (ví dụ: createChair, createSofa và createCoffeeTable). Các phương thức này phải trả về các loại sản phẩm trừu tượng được đại diện bởi các giao diện mà chúng ta đã khai báo trước đó: `Chair`, `Sofa`, `CoffeeTable`, v.v.

![Mỗi nhà máy hiện hữu ứng với một biến thể sản phẩm cụ thể](images/Abstract_Factory_solution2.png)
_Mỗi nhà máy hiện hữu ứng với một biến thể sản phẩm cụ thể._

Thế còn các biến thể sản phẩm thì sao? Đối với mỗi biến thể của một dòng sản phẩm, chúng ta tạo một lớp nhà máy riêng dựa trên giao diện đã được định nghĩa trong AbstractFactory trước đó. Một nhà máy là một lớp trả về các sản phẩm thuộc một loại cụ thể. Ví dụ: `ModernFunitureFactory` (nhà máy đồ nội thất hiện đại) chỉ có thể tạo ra các đối tượng `ModernChair`, `ModernSofa`, và `ModernCoffeeTable`.

Mã khách (mã sử dụng ở lớp cao hơn) phải hoạt động với cả các nhà máy và các sản phẩm thông qua giao diện trừu tượng tương ứng của chúng (~ nhớ lại OCP & LSP trong SOLID). Điều này cho phép bạn thay đổi (mở rộng) các loại nhà máy mà bạn chuyển sang cho mã khách, cũng như các biến thể sản phẩm máy khách có thể nhận được mà không phá vỡ mã đã viết ở lớp khách (client code).

Giả sử mã khách muốn một nhà máy sản xuất một chiếc ghế. Mã khách không cần phải biết về lớp nhà máy cụ thể đó, cũng như loại ghế mà họ nhận được. Cho dù đó là kiểu ghế Hiện đại hay ghế theo phong cách Victoria, mã khách phải đối xử với tất cả các ghế theo cùng một cách, sử dụng giao diện Ghế trừu tượng. Với cách tiếp cận này, điều duy nhất mà mã khách biết về chiếc ghế là nó có thể thực hiện phương thức `sitOn` (ngồi lên) theo một cách nào đó. Ngoài ra, bất kỳ biến thể nào của ghế được trả lại, nó sẽ luôn khớp với loại ghế sofa hoặc bàn cà phê được sản xuất bởi cùng nhà máy đó.

Còn một điều nữa cần làm rõ: nếu mã khách chỉ tiếp xúc với các giao diện trừu tượng, thì điều gì tạo ra các đối tượng thực tế của nhà máy? Thông thường, ứng dụng tạo một đối tượng nhà máy cụ thể ở giai đoạn khởi tạo. Ngay trước đó, ứng dụng phải chọn loại nhà máy bằng cấu hình hoặc cài đặt môi trường.

## Giả mã

Ví dụ dưới đây minh họa cách sử dụng mẫu Abstract Factory để tạo ra các phần tử giao diện người dùng (UI) đa nền tảng mà không bị dính mắc mã khách với các lớp UI cụ thể, đồng thời giữ cho tất cả các phần tử UI tạo ra nhất quán với hệ điều hành đích.

![Ví dụ về các lớp UI đa nền tảng (vd, hệ điều hành Mac và Windows)](images/Abstract_Factory_example.png)
_Ví dụ về các lớp UI đa nền tảng (vd, hệ điều hành Mac và Windows)._

Các phần tử giao diện người dùng (UI) giống nhau, ví dụ nút bấm, sẽ hoạt động giống nhau, nhưng trông hơi khác nhau một chút trên các hệ điều hành khác nhau (ví dụ, phong cách Windows khác phong cách MacOS).

Giao diện Abstract Factory khai báo một tập hợp các phương thức tạo tác mà mã khách có thể sử dụng để tạo ra các loại phần tử UI khác nhau. Các nhà máy hiện hữu (concrete factory phân biệt với abstract factory) tương ứng với các hệ điều hành cụ thể để tạo ra các phần tử UI phù hợp với hệ điều hành đó.

Nó hoạt động như sau: khi một ứng dụng khởi chạy, nó sẽ kiểm tra loại hệ điều hành hiện tại. Ứng dụng sử dụng thông tin này để tạo ra một đối tượng nhà máy từ một lớp phù hợp với loại hệ điều hành đã xác định. Phần còn lại của mã sử dụng nhà máy này để tạo ra các phần tử UI. Điều này tránh các phần tử không phù hợp được tạo ra.

Bằng phương pháp này, mã khách không bị phụ thuộc vào các lớp cụ thể của các nhà máy và phần tử UI miễn là nó hoạt động với các đối tượng này thông qua các giao diện trừu tượng (abstract interface) của cúng. Điều này cũng cho phép mã khách hỗ trợ các nhà máy hoặc các phần tử giao diện người dùng khác có thể thêm vào trong tương lai (khả năng mở rộng - nguyên lý OCP).

Do đó, bạn không cần phải sửa đổi mã khách mỗi khi thêm một biến thể mới của phần tử UI vào ứng dụng của mình. Bạn chỉ cần tạo một lớp nhà máy mới tạo ra các phần tử này và sửa một chút mã khởi tạo của ứng dụng để ứng dụng đó chọn lớp thích hợp.

```java
// The abstract factory interface declares a set of methods that
// return different abstract products. These products are called
// a family and are related by a high-level theme or concept.
// Products of one family are usually able to collaborate among
// themselves. A family of products may have several variants,
// but the products of one variant are incompatible with the
// products of another variant.
interface GUIFactory is
    method createButton():Button
    method createCheckbox():Checkbox


// Concrete factories produce a family of products that belong
// to a single variant. The factory guarantees that the
// resulting products are compatible. Signatures of the concrete
// factory's methods return an abstract product, while inside
// the method a concrete product is instantiated.
class WinFactory implements GUIFactory is
    method createButton():Button is
        return new WinButton()
    method createCheckbox():Checkbox is
        return new WinCheckbox()

// Each concrete factory has a corresponding product variant.
class MacFactory implements GUIFactory is
    method createButton():Button is
        return new MacButton()
    method createCheckbox():Checkbox is
        return new MacCheckbox()


// Each distinct product of a product family should have a base
// interface. All variants of the product must implement this
// interface.
interface Button is
    method paint()

// Concrete products are created by corresponding concrete
// factories.
class WinButton implements Button is
    method paint() is
        // Render a button in Windows style.

class MacButton implements Button is
    method paint() is
        // Render a button in macOS style.

// Here's the base interface of another product. All products
// can interact with each other, but proper interaction is
// possible only between products of the same concrete variant.
interface Checkbox is
    method paint()

class WinCheckbox implements Checkbox is
    method paint() is
        // Render a checkbox in Windows style.

class MacCheckbox implements Checkbox is
    method paint() is
        // Render a checkbox in macOS style.


// The client code works with factories and products only
// through abstract types: GUIFactory, Button and Checkbox. This
// lets you pass any factory or product subclass to the client
// code without breaking it.
class Application is
    private field factory: GUIFactory
    private field button: Button
    constructor Application(factory: GUIFactory) is
        this.factory = factory
    method createUI() is
        this.button = factory.createButton()
    method paint() is
        button.paint()


// The application picks the factory type depending on the
// current configuration or environment settings and creates it
// at runtime (usually at the initialization stage).
class ApplicationConfigurator is
    method main() is
        config = readApplicationConfigFile()

        if (config.OS == "Windows") then
            factory = new WinFactory()
        else if (config.OS == "Mac") then
            factory = new MacFactory()
        else
            throw new Exception("Error! Unknown operating system.")

        Application app = new Application(factory)
```

## Khả năng ứng dụng

Sử dụng Abstract Factory khi mã của bạn cần hoạt động với nhiều dòng sản phẩm liên quan khác nhau, nhưng bạn không muốn nó phụ thuộc vào các lớp cụ thể của những sản phẩm đó—chúng có thể chưa được biết trước hoặc bạn chỉ muốn cho phép khả năng mở rộng trong tương lai.

Abstract Factory cung cấp cho bạn một giao diện để tạo các đối tượng từ mỗi lớp của họ sản phẩm. Miễn là mã của bạn tạo các đối tượng thông qua giao diện này, thì bạn không phải lo lắng về việc tạo sai biến thể của sản phẩm không khớp với các sản phẩm mà ứng dụng của bạn đã tạo.

Cân nhắc việc triển khai Nhà máy Trừu tượng khi bạn có một lớp với một tập hợp các Phương thức Nhà máy làm mờ trách nhiệm chính của nó.

Trong một chương trình được thiết kế tốt, mỗi lớp chỉ chịu trách nhiệm về một việc (nguyên tắc đơn trách nhiệm - SRP). Khi một lớp xử lý nhiều loại sản phẩm, có thể đáng để trích xuất các phương thức xuất xưởng của nó thành một lớp xuất xưởng độc lập hoặc triển khai Nhà máy Trừu tượng đầy đủ.

## Phương pháp triển khai

1. Vạch ra một ma trận các loại sản phẩm riêng biệt so với các biến thể của những sản phẩm này.

2. Khai báo giao diện sản phẩm trừu tượng cho tất cả các loại sản phẩm. Sau đó làm cho tất cả các lớp sản phẩm cụ thể triển khai các giao diện này.

3. Khai báo giao diện nhà máy trừu tượng với một tập hợp các phương thức tạo cho tất cả các sản phẩm trừu tượng.

4. Thực hiện một tập hợp các lớp nhà máy cụ thể, một lớp cho mỗi biến thể sản phẩm.

5. Tạo mã khởi tạo của nhà máy ở đâu đó trong ứng dụng. Nó sẽ khởi tạo một trong các lớp nhà máy cụ thể, tùy thuộc vào cấu hình ứng dụng hoặc môi trường hiện tại. Truyền đối tượng nhà máy này cho tất cả các lớp xây dựng sản phẩm.

6. Quét qua mã và tìm tất cả các gọi hàm trực tiếp đến các hàm tạo (constructors) sản phẩm. Thay thế chúng bằng các cuộc gọi đến phương thức tạo thích hợp trên đối tượng nhà máy.

## Ưu, nhược điểm

- [x] Bạn có thể chắc chắn rằng các sản phẩm bạn nhận được từ nhà máy tương thích với nhau.
- [x] Bạn tránh được sự kết hợp chặt chẽ giữa các sản phẩm bê tông và mã máy khách.
- [x] Nguyên tắc đơn trách nhiệm (SRP). Bạn có thể trích xuất mã tạo sản phẩm vào một nơi, giúp hỗ trợ mã dễ dàng hơn.
- [x] Nguyên tắc Đóng/Mở (OCP). Bạn có thể đưa vào các biến thể mới của sản phẩm mà không làm thay đổi mã ứng dụng hiện có.
- [ ] Mã có thể trở nên phức tạp hơn mức cần thiết, vì rất nhiều giao diện và lớp mới được đưa vào theo mẫu.

## Mối liên hệ với các mẫu khác

- Nhiều thiết kế bắt đầu bằng cách sử dụng `Factory Method` (ít phức tạp hơn và có thể tùy chỉnh nhiều hơn thông qua các lớp con) và phát triển thành `Abstract Factory`, `Prototype` hoặc `Builder` (linh hoạt hơn nhưng phức tạp hơn).

- `Builder` tập trung vào từng bước xây dựng các đối tượng phức tạp. `Abstract Factory` chuyên tạo các họ đối tượng liên quan. `Abstract Factory` trả lại sản phẩm ngay lập tức, trong khi `Builder` cho phép bạn chạy một số bước xây dựng bổ sung trước khi tìm nạp sản phẩm.

- Các lớp `Abstract Factory` thường dựa trên một tập hợp các `Factory Method`, nhưng bạn cũng có thể sử dụng `Prototype` để tổng hợp các phương thức trên các lớp này.

- `Abstract Factory` có thể đóng vai trò thay thế cho `Facade` khi bạn chỉ muốn ẩn cách các đối tượng hệ thống con được tạo từ mã khách.

- Bạn có thể sử dụng `Abstract Factory` cùng với `Bridge`. Việc ghép nối này rất hữu ích khi một số khái niệm trừu tượng do `Bridge` xác định chỉ có thể hoạt động với các triển khai cụ thể. Trong trường hợp này, `Abstract Factory` có thể đóng gói các mối quan hệ này và ẩn sự phức tạp khỏi mã máy khách.

- Tất cả các `Abstract Factory`, `Builder` và `Prototype` đều có thể được triển khai dưới dạng `Singletons`.

## Mã cụ thể

- Mã TypeScript cho ví dụ ở phần giả mã tìm trong thư mục TS
- Mã C++ cho ví dụ ở phần giả mã tìm trong thưc mục Cpp

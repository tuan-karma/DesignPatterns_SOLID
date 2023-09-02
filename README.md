## Tại sao?

- Các nguyên lý thiết kế phần mềm (SOLID) và các mẫu dạng thiết kế giúp tăng chất lượng mã viết ra: mã sáng sủa hơn, dễ đọc, dễ mở rộng, và dễ cộng tác hơn trong dự án lớn
- Giúp bạn giao tiếp tốt hơn với đồng nghiệp khi có chung vốn từ vựng về các mẫu dạng thiết kế phổ biến trong kỹ thuật phần mềm

## Hướng dẫn

- Các bài viết chọn lọc về chủ đề thiết kế và kiến trúc phần mềm được lưu trong các file .md hoặc trong phần comment đầu các file mã nguồn ví dụ viết bằng TypeScript (`./TS/src/*.ts`).
- Người đọc có thể đọc các bài viết theo thứ tự đường link trình bày bên dưới
- Người học nên clone repo này về máy cá nhân, sau đó tiến hành biên dịch và chạy thử từng ví dụ TypeScript:
  - `cd TS`
  - `npm install`
  - `npx tsc`
  - `node dist/<example>.js`
- Các ví dụ tương ứng được viết trên C++ chứa trong thư mục `./Cpp`. Biên dịch và chạy bằng lệnh sau `g++ <example.cpp> && ./a.out`
- Người học nên thử tự viết lại các ví dụ trong này bằng ngôn ngữ mình ưa thích, ví dụ Python, Java ...

## Giới thiệu chung

Để có cái nhìn tổng quát về thiết kế phần mềm (nên đọc theo thứ tự):

- [5 nguyên tắc SOLID trong thiết kế phần mềm](./SOLID_TS.md)
- [Kiến trúc lục giác 01 - Sơ lược](./Hexagonal_Architecture.md)
- [Kiến trúc lục giác 02 - Bản chất và Cụ thể](./Hexagonal_Architecture_02.md)
- [Kiến trúc lục giác 03 - Trong lập trình nhúng](./Hexagonal_Architecture_03_embedded.md)
- [Kiến trúc lục giác 04 - Phát triển hướng kiểm thử (TDD)](./Hexagonal_Architecture_04_TDD.md)
- [Kiến trúc lục giác 05 - Nguồn gốc thuật ngữ và So sánh với Clean, Onion, Microservice Architecture](./Hexagonal_Architecture_05_others.md)
- [Đề xuất: Lộ trình học thiết kế và kiến trúc phần mềm](./Softwave_Design_Architecture_Roadmap.md)

## Các mẫu thiết kế

Dưới đây liệt kê 9 mẫu thiết kế "được cho là" sử dụng rộng rãi trong phát triển phần mềm:

- [Singleton](./TS/src/singleton.ts): Đảm bảo rằng một lớp chỉ có một thể hiện và cung cấp một điểm truy xuất toàn cục (global) cho thể hiện đó. Hữu ích cho việc quản lý tài nguyên hoặc cấu hình được chia sẻ. Note: Mẫu này không phổ biến trong lập trình nhúng cho các vi điều khiển đơn luồng, khi đó ta có thể chỉ cần một global object là đơn giản sáng sủa và đạt mục đích của Singleton.
- [Factory Method](./Factory_Method.md): Xác định một giao diện để tạo các đối tượng nhưng cho phép các lớp con quyết định lớp nào sẽ khởi tạo. Thúc đẩy việc nới lỏng kết nối (loose coupling) bằng cách ủy thác việc tạo ra đối tượng cho các lớp con.
- [Abstract Factory](./Abstract_Factory.md): Cung cấp giao diện để tạo ra họ các đối tượng liên quan hoặc phụ thuộc. Đảm bảo rằng các đối tượng được tạo ra trong một họ là tương thích với nhau.
- [Builder](./TS/src/builder.ts): Tách việc xây dựng một đối tượng phức tạp khỏi biểu diễn của nó. Cho phép bạn tạo các biểu diễn của một đối tượng trong khi vẫn giữ cho quá trình xây dựng nhất quán.
- [Prototype](./TS/src/prototype.ts): Cho phép bạn nhân bản các đối tượng thay vì tạo ra chúng từ đầu.
- [Adapter](./TS/src/adapter.ts): Mẫu này giúp ta ghép nối các giao diện không tương thích với nhau.
- [Decorator](./TS/src/decorator.ts): (Trang trí/Bọc phủ) Thêm hành vi vào các đối tượng một cách linh động (dynamically). Mở rộng chức năng của các đối tượng mà không thay đổi cấu trúc của chúng.
- [Observer](./TS/src/observer.ts): Mẫu này thiết lập một mối quan hệ phụ thuộc giữa các đối tượng, cho phép chúng thông báo và phản ứng với những thay đổi trạng thái của nhau.
- [Strategy](./TS/src/strategy.ts): Cho phép xác định một nhóm thuật toán, gói gọn chúng và làm cho chúng có thể hoán đổi cho nhau.

## Lời kết

Các bài viết trên đây giúp ta nâng cao được kiến thức về phát triển phần mềm, có thể từ người viết mã (coder) đến nhà phát triển (developer) và có cái nhìn của một nhà thiết kế hệ thống (architecturer).

Những người mới bắt đầu thường quan tâm tới ngôn ngữ, các từ khóa và quy tắc viết của ngôn ngữ (syntax), sau đó áp dụng vào giải các bài toán ngắn bằng tư duy thuật toán. Đến một mức nào đó ta sẽ thấy tư duy lập trình (giải các bài toán thực tế bằng máy tính) gần như không phụ thuộc vào ngôn ngữ sử dụng. Ngôn ngữ lập trình chỉ là một công cụ để giải quyết bài toán. Người lập trình cần có đủ hiểu biết để lựa chọn công cụ cho công việc, giống như việc ta hoàn toàn có thể dùng cái vặn vít để đóng đinh nhưng thực sự nếu bạn dùng cây búa để đóng đinh sẽ có kết quả ít sai hỏng và hiệu quả hơn. Phát triển phần mềm cũng vậy.

Các nguyên tắc SOLID giống như một định hướng chung trong lập trình nó xuất phát từ kinh nghiệm thực tế, cho nên nó không có một lý do rõ ràng từ đầu. Việc chọn ra 5 nguyên tắc cũng là một lựa chọn mang tính kinh nghiệm, tên gọi của các nguyên tắc hay thứ tự trình bày tôi nghĩ cũng chỉ là một sự xắp xếp để gây ấn tượng và giúp dễ nhớ chứ không có lý do về logic.

Các mẫu thiết kế cụ thể cũng là những "mẫu hình" xuất phát từ quan sát thực tế trong ngành phát triển phần mềm, đã được những nhà phát triển lâu năm đúc rút ra. Nó trở thành nguồn tham khảo và thành vốn từ vựng cho những người đi sau như chúng ta. Các mẫu thiết kế này cũng hướng tới các nguyên tắc chung của SOLID.

Kiến trúc lục giác là một kiến trúc phần mềm khá hay. Các bạn nên đọc bài viết số 5 về kiến trúc lục giác để biết được lý do và tiến trình lịch sử của các loại kiến trúc phần mềm phổ biến hiện nay. Ban đầu mọi người hay đi từ kiến trúc phân lớp một cách khá tự nhiên, sau này do thực tế phát triển phần mềm kiến trúc phân lớp bộc lộ nhiều nhược điểm cần thay thế. Việc lựa chọn kiến trúc phần mềm là giai đoạn tiền thiết kế một giải pháp phần mềm lớn, nghĩa là nó diễn ra trước cả khi chọn các mẫu thiết kế và công nghệ cụ thể.

Tất cả những điều kể trên, nguyên tắc SOLID, các mẫu thiết kế, và kiến trúc phần mềm đều có một mục tiêu chung cần hướng tới trong phát triển phần mềm là: khả năng bảo trì (sửa lỗi phát sinh), khả năng thích nghi với các thay đổi trong tương lai (do yêu cầu kinh doanh, do thay đổi cơ sở hạ tầng công nghệ, ...), khả năng kiểm thử tự động, và khả năng phát triển ở quy mô lớn (theo đội nhóm, nhiều người).

Lưu ý: không phải lúc nào ta cũng buộc phải áp dụng những nguyên tắc thiết kế, những mẫu thiết kế, và kiến trúc lục giác. Tùy vào độ phức tạp của bài toán cần giải mà ta cần đưa ra quyết định phù hợp với yêu cầu bài toán và nguồn lực hiện có. Tránh việc "lạm dụng" (overuse) bất kỳ công cụ nào, nếu không ta sẽ trở thành người có cây búa trong tay và nhìn thấy bất kỳ thứ gì cũng muốn nghĩ nó là các cái đinh cần được đóng vào tường.

Trong thư mục Cpp ở kho mã này có một dự án game đơn giản ("đoán số") để thử nghiệm cấu trúc một dự án theo kiến trúc lục giác. Các bạn có thể dựa trên cái khung bố cục đó mà thử phát triển thành một dự án đầy đủ, có phần kiểm thử tự động trên máy PC, sau đó port sang con chip vi điều khiển, sử dụng một vài nút bấm và màn LCD để thấy được sự hữu ích của kiến trúc này. Tôi sẽ để dự án chi tiết như này trên một repo riêng.

## Đọc thêm

Thật ra thì bất kỳ công việc liên quan tới tư đuy nào đều có gốc gác là tư duy _trừu tượng hóa_, từ việc nghiên cứu khoa học, toán học, phát triển phần mềm, hay tìm ra giải pháp trong quản lý. Tư duy _trừu tượng hóa_ là gì và tại sao nó lại là vũ khí mạnh nhất trong công cụ tư duy của con người?

- [Trừu tượng hóa, một vũ khí bí mật](https://www.youtube.com/watch?v=FQYOpD7tv30)

Ít tài liệu trên mạng nói về nguyên lý SOLID trong C++, video sau ngắn gọn clear, có thể giúp ôn tập các kiến thức SOLID trong C++

- [Dimitris Platis's How to write SOLID C++](https://platis.solutions/blog/2020/06/22/how-to-write-solid-cpp/)

Những mẫu thiết kế thường áp dụng phổ biến trong ngạch phát triển ứng dụng web.

- [Webapp design patterns in JS and React](https://www.patterns.dev/)

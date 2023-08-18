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
- [Kiến trúc lục giác](./Hexagonal_Architecture.md)
- [Đề xuất: Lộ trình học thiết kế và kiến trúc phần mềm](./Softwave_Design_Architecture_Roadmap.md)

## Các mẫu thiết kế

Dưới đây liệt kê 9 mẫu thiết kế "được cho là" sử dụng rộng rãi trong phát triển phần mềm:

- [Singleton](./TS/src/singleton.ts): Đảm bảo rằng một lớp chỉ có một thể hiện và cung cập một điểm truy xuất toàn cục (global) cho thể hiện đó. Hữu ích cho việc quản lý tài nguyên hoặc cấu hình được chia sẻ.
- [Factory Method](./Factory_Method.md): Xác định một giao diện để tạo các đối tượng nhưng cho phép các lớp con quyết định lớp nào sẽ khởi tạo. Thúc đẩy việc nới lỏng kết nối (loose coupling) bằng cách ủy thác việc tạo ra đối tượng cho các lớp con.
- [Abstract Factory](./Abstract_Factory.md): Cung cấp giao diện để tạo ra họ các đối tượng liên quan hoặc phụ thuộc. Đảm bảo rằng các đối tượng được tạo ra trong một họ là tương thích với nhau.
- [Builder](./TS/src/builder.ts): Tách việc xây dựng một đối tượng phức tạp khỏi biểu diễn của nó. Cho phép bạn tạo các biểu diễn của một đối tượng trong khi vẫn giữ cho quá trình xây dựng nhất quán.
- Prototype: Cho phép bạn nhân bản các đối tượng thay vì tạo ra chúng từ đầu.
- Adapter: Mẫu này giúp ta ghép nối các giao diện không tương thích với nhau.
- Decorator: Thêm hành vi vào các đối tượng một cách linh động (dynamically). Mở rộng chức năng của các đối tượng mà không thay đổi cấu trúc của chúng.
- Observer: Mẫu này thiết lập một mối quan hệ phụ thuộc giữa các đối tượng, cho phép chúng thông báo và phản ứng với những thay đổi trạng thái của nhau.
- Strategy: Cho phép xác định một nhóm thuật toán, gói gọn chúng và làm cho chúng có thể hoán đổi cho nhau.

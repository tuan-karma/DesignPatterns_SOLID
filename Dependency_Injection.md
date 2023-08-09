## Intro

- [Scott Bailey's What is DI?](https://www.youtube.com/watch?v=tYZd8hserms)
- Thuật ngữ phổ biến trong lập trình hướng đối tượng (OOP): thay vì tạo ra đối tượng bên trong mã khởi tạo class thì chúng ta truyền đối tượng vào mã khởi tạo (injection)
- Rất nhiều framework phổ biến sinh ra để quản lý/viết trước các mã để bơm tiêm các sự phụ thuộc này
- Viết theo kiểu thông thường (thủ tục, tuần tự) --> làm tăng tính phụ thuộc của các module code --> khó thay đổi

## Ưu điểm của DI (inversion of control patterns)

- Tách biệt các mối quan tâm
- Giảm móc nối giữa các khối logic
- Có thể tái sử dụng
- Dễ dàng kiểm thử (easy to test)

## Inversion of Control with Dependency Inversion

- Một trong các phương pháp để thực hiện/đạt được nghịch đảo kiểm soát (inversion of control) là dùng kỹ thuật DI
- Các phần phụ thuộc được đưa vào (bơm vào) trong mã khởi tạo của class

## Nhược điểm

- Rất nhiều mã kết dính, class này phụ thuộc class kia --> tạo ra rất nhiều mã trung gian --> gây rối rắm
- Người ta tạo ra nhiều FW chỉ để handle cái DI này
- (dùng @Injectable decorators ...) ...
- Đưa thêm nhiều thuật ngữ mới chỉ để hỗ trợ IC và DI
- Tradeoff: nhiều thư viện và khung công việc: code khó đọc hơn (phụ thuộc FW) --> khó tìm lỗi hơn
- Chuyển lỗi compile thành lỗi run-time !!!

## Kết luận

- Nên dùng DI có chừng mực, đúng mức, đúng chỗ, giống như mọi công cụ khác, không nên lạm dụng.

## Tham khảo

- [CodeAesthetic's Dependency Injection, the best pattern](https://www.youtube.com/watch?v=J1f5b4vcxCQ)
- Trong video trên có nhắc đến: DI, Factory, Mocking Test

## DI and SOLID 
[blog.appsignal.com: Dependency Injection in JavaScript: Write Testable Code Easily](https://blog.appsignal.com/2022/02/16/dependency-injection-in-javascript-write-testable-code-easily.html)
Kết luận quan trọng từ bài viết trên 
- Hai nguyên lý quan trọng trong SOLID: single responsibility và dependency inversion 
- Lưu ý: không có công cụ nào là toàn năng (đừng coi mọi thứ như cái đinh nếu bạn cầm cây búa trong tay). Mục đích cuối cùng của dev là viết mã tin cậy, dễ bảo dưỡng, sáng sủa, dễ đọc. IoC là công cụ tốt để quản trị sự phức tạp, nhưng nó không phải là lý do để đưa những sự phức tạp không cần thiết vào một mã đơn giản. 




# Lộ trình học thiết kế và kiến trúc phần mềm

Lược dịch từ [Khalil Stemmler's How to Learn Software Design and Architecture - a Roadmap](https://www.freecodecamp.org/news/software-design/)

Bài viết này mong muốn cung cấp một cái nhìn tổng quan giúp người đọc có một hình dung dạng bản đồ trước khi lên đường để biết ta sẽ đi qua những ngã rẽ chính nào trên con đường nắm vững về kiến trúc và thiết kế phần mềm.

## Tầng thứ 1: Code sạch

Tất nhiên bước số 0 là cần phải biết viết phần mềm cái đã, ví như học ngôn ngữ, các thuật toán ... Giống như chuẩn bị lên đường trước hết ta phải biết lái xe.

Bước đầu tiên để tạo ra các phần mềm tốt/lâu dài là tìm ra cách viết mã sạch (clean code).

Mã sạch là mã dễ hiểu và dễ thay đổi. Ở cấp độ thấp, điều này thể hiện trong một số lựa chọn thiết kế như:

- Nhất quán
- Đặt các tên biến, tên hàm, tên lớp có ý nghĩa, hạn chế phải viết comment giải thích.
- Định dạng code theo một chuẩn phổ biến hiện hành (xuống dòng, thụt vào, ...)
- Nên học/viết theo phong cách hướng kiểm thử (tức là xây dựng các trường hợp kiểm thử trước khi bắt tay viết)
- Cố gắng giảm thiểu các tác dụng phụ của hàm (các hàm thuần thúy theo phong cách lập trình hàm)

Cuốn sách được nhiều người đề xuất là cuốn mã sạch của "Chú Bob" (Clean Code - Uncle Bob)

## Tầng thứ 2: Các mô thức lập trình

Chúng ta nên biết ba mô thức lập trình chính mà người ta biết hiện nay. Theo ý kiến của chú Bob (sách "kiến trúc sạch"):

- Lập trình hướng đối tượng là công cụ phù hợp để xác định cách chúng ta vượt qua ranh giới kiến trúc với tính đa hình và các mô-đun cắm vào
- Lập trình hàm là công cụ dùng để đẩy dữ liệu đến nơi gặp nhau của các ứng dụng
- Lập trình cấu trúc là công cụ để viết các thuật toán

Điều này ngụ ý rằng người viết phần mềm hiệu quả sử dụng kết hợp cả ba kiểu mô thức lập trình trên.

Mặc dù bạn có thể tuân thủ hướng đối tượng hoặc lập trình hàm một cách nghiêm ngặt, nhưng việc hiểu được ưu điểm của các mô thức lập trình khác sẽ cải thiện chất lượng thiết kế của bạn.

Đừng nên bám chấp vào một mô thức lập trình mà mình biết/cho là vượt trội. Tránh tư duy:

> Nếu tất cả những gì bạn có là một cây búa, thì mọi thứ bạn nhìn thấy đều giống như một cây đinh

## Tầng thứ 3: Lập trình hướng đối tượng

Vì sao? Trả lời: Các kiến trúc phần mềm và các mẫu thiết kế đều dựa trên mô thức lập trình hướng đối tượng.

Bốn trụ cột của lập trình hướng đối tượng là: đóng gói, kế thừa, đa hình, và trừu tượng hóa.

## Tầng thứ 4: Các nguyên tắc thiết kế

Đến đây có thể bạn đã hiểu được tính hữu ích của lập trình hướng đối tượng (OOP) như là một mô hình tinh thần để nhà phát triển phần mềm tư duy về thế giới. Nhưng OOP có thể dẫn đến một số thách thức về thiết kế:

- Khi nào nên sử dụng kỹ thuật cấu thành (composition)?
- Khi nào thì nên sử dụng kế thừa (inheritance)?
- Khi nào ta nên sử dụng một lớp trừu tượng?

Các nguyên tắc thiết kế là các phương pháp tốt nhất rút ra từ thực tiễn lập trình. Ví dụ về một số nguyên tắc thiết kế phổ biến mà bạn nên tìm hiểu là:

- Ưu tiên sử dụng cấu thành hơn là dùng kế thừa (Prefer composition over inheritance)
- Đóng gói/Cô lập những thứ hay phải thay đổi
- Lập trình hướng đến giao diện/trừu tượng hóa chứ không phải mã riêng biệt
- 5 nguyên tắc thiết kế SOLID
- ...

## Tầng thứ 5: Các mẫu thiết kế

Gần như mọi vấn đề trong phần mềm đều đã được phân loại và giải quyết rồi. Trên thực tế, chúng ta gọi những mẫu dạng này là "mẫu thiết kế" (`Design Patterns`).

Các mẫu thiết kế được phân thành ba loại: Tạo tác, Cấu trúc, và Hành vi (Creational, Structural, Behaviour)

### Nhóm Tạo tác (Creational)

Các mẫu tạo tác là mẫu kiểm soát cách các đối tượng được tạo.

Ví dụ về các mẫu dạng này bao gồm:

- Mẫu Đơn (Singleton): đảm bảo chỉ có một hiện thân duy nhất của một lớp tồn tại trong ứng dụng.
- Mẫu Nhà Máy Trừu tượng (Abstract Factory): để tạo ra một hiện thân của một số họ lớp.
- Mẫu Nguyên mẫu (Prototype): để tạo ra một phiên bản được nhân bản từ một bản hiện có.

### Nhóm Cấu trúc (Structural)

Các mẫu cấu trúc là các mẫu giups chúng ta đơn giản hóa cách xác định mối quan hệ giữa các thành phần trong phần mềm.

Ví dụ về các mẫu cấu trúc bao gồm:

- Mẫu điều hợp (Adapter): để tạo ra một giao diện cho phép các lớp khác nhau phối hợp cùng nhau.
- Mẫu cầu nối (Bridge): để phân tách một lớp thực sự phải là một hoặc nhiều lớp, thành một tập hợp các lớp thuộc về một hệ thống phân cấp (phả hệ), cho phép việc phát triển mã được tiến hành độc lập.
- Mẫu trang trí (Decorator): để thêm trách nhiệm cho các đối tượng một cách linh hoạt.

### Nhóm Hành vi (Behavioural)

Các mẫu hành vi là các mẫu phổ biến để tạo điều kiện giao tiếp trơn chu giữa các đối tượng.

Ví dụ về các mẫu hành vi:

- Mẫu khuôn mẫu (Template): để tuồn lại các bước cụ thể của thuật toán tới một lớp con.
- Mẫu người quan sát (Observer): để cho phép các lớp đăng ký một thông tin mà nó quan tâm và được thông báo khi có thay đổi về thông tin này (pub/sub)

### Một số phản bác về mẫu thiết kế

Các mẫu thiết kế là tuyệt vời, nhưng đôi khi chúng có thể làm tăng thêm độ phức tạp cho các thiết kế của chúng ta. Điều quan trọng phải nhớ quy tắc "Bạn sẽ không cần nó" (viết tắt YAGNI - You Ain't Gonna Need It) và cố gắng giữ cho các thiết kế của chúng ta đơn giản nhất có thể. Chỉ sử dụng các mẫu thiết kế khi bạn thực sự chắc chắn rằng mình cần chúng.

Khi chúng ta đã nắm được các mẫu thiết kế là gì, khi nào sử dụng chúng, khi nào không cần sử dụng chúng, thì chúng ta mới có thể bắt đầu tiến tới học cách kiến trúc các hệ thống lớn hơn.

Lý do là các mẫu kiến trúc chỉ là các mẫu thiết kế được mở rộng quy mô, trong đó các mẫu thiết kế là các triển khai cụ thể ở lớp dưới (gần với các lớp và hàm hơn).

## Tầng thứ 6: Các nguyên tắc kiến trúc

Học các nguyên tắc hướng dẫn giúp bạn xây dựng phần mềm linh hoạt có thể đáp ứng với các yêu cầu thay đổi tính năng từ công việc, từ khách hàng với ít công sức nhất có thể.

## Tầng thứ 7: Các phong cách kiến trúc

Đó là về việc xác định xem những gì mà hệ thống cần để thành công, sau đó sắp xếp tỉ lệ thành công bằng cách chọn một kiến trúc phù hợp nhất với yêu cầu hệ thống.

Ví dụ, một hệ thống có nhiều logic nghiệp vụ phức tạp sẽ được hưởng lợi từ kiến trúc phân lớp để gói gọn sự phức tạp đó vào từng lớp.

Một hệ thống như Uber cần có khả năng xử lý nhiều sự kiện theo thời gian thực cùng một lúc và cập nhật vị trí của người lái xe, do đó, kiến trúc kiểu xuất bản / đăng ký (pub/sub) có lẽ là lựa chọn phù hợp nhất.

## Tầng thứ 8: Các mẫu kiến trúc

Các mẫu kiến trúc là một dạng chi tiết hơn của các phương pháp làm thế nào để triển khai một trong các phong cách kiến trúc đã chọn.

Một vài ví dụ về các mẫu kiến trúc:

- Domain-Driven Design (Thiết kế hướng lĩnh vực - DDD): là một cách tiếp cận để phát triển phần mềm dựa trên các lĩnh vực nghiệp vụ phức tạp. Để DDD thành công, chúng ta cần triển khai kiến trúc phân lớp để tách biệt các mối quan tâm của mô hình lĩnh vực khỏi các chi tiết cơ sở hạ tầng.
- Model-View Controller (MVC): là một mẫu kiến trúc nổi tiếng nhất để phát triển các ứng dụng dựa trên giao diện người dùng. Nó hoạt động bằng cách chia ứng dụng thành 3 thành phần: Mô hình, Thể hiện, và Bộ điều khiể. MVC cực kỳ hữu ích khi bạn lần đầu tiên bắt đầu và nó giúp bạn hỗ trợ các kiến trúc khác, nhưng tới một thời điểm chúng ta sẽ nhận ra rằng MVC không đủ để giải quyết các vấn đề có nhiều logic nghiệp vụ.
- Event sourcing: là một phương pháp lập trình hàm trong đó chúng ta chỉ lưu trữ các giao dịch (sự kiện) chứ không bao giờ lưu trữ trạng thái. Nếu chúng ta cần trạng thái, chúng ta có thể áp các giao dịch từ thời điểm ban đầu tới thời điểm quan tâm.

## Tầng thứ 9: Các mẫu "doanh nghiệp"

Các mẫu kiến trúc đôi khi không giải quyết hết các vấn đề tồn tại trong thực tế doanh nghiệp. Tồn tại các mẫu khác gọi là "mẫu doanh nghiệp" để giải chúng. Ví dụ:

- Thực thể (Entities) mô tả các mô hình có danh tính.
- Các đối tượng giá trị (Value Objects) là các mô hình không có danh tính và có thể được sử dụng để đóng gói logic xác thực.
- Các sự kiện lĩnh vực (Domain Events) là các sự kiện biểu thị một số sự kiện kinh doanh có liên quan đang diễn ra và có thể được đăng ký từ các thành phần khác trong hệ thống thống.

Tùy thuộc vào phong cách kiến trúc bạn đã chọn, mà sẽ có rất nhiều mẫu doanh nghiệp khác để bạn tìm hiểu nhằm triển khai mẫu đó một cách tối đa.

---

## Bình luận

- Ông tác giả tự giới thiệu mình là người dạy TypeScript nâng cao cho các ứng dụng quy mô lớn và dạy cách phát triển phần mềm tùy biến, dễ bảo trì. Ông ý có trang web riêng, nhiều bài viết có vẻ khá là nâng cao, ông ý cũng viết sách về linh vực thiết kế phần mềm. Tuy nhiên, giống như bất kỳ bài viết nào về chủ đề thiết kế phần mềm, nó đều bị thiên kiến rất nặng do đặc trưng công việc của người viết chi phối. Do vậy trong lĩnh vực thiết kế và kiến trúc phần mềm, không thể có kiến thức tuyệt đối đúng và bất di bất dịch, tất cả đều dựa trên kinh nghiệm thực tế của từng nhóm, cá nhân mà viết ra. Mặc dù họ rất thích dùng các thuật ngữ như "nguyên lý, nguyên tắc, rắn chắc ..." để nói về chủ đề này, nhưng thực tế không phải như vậy.
- Tuy nhiên, bài này cũng là một bài cung cấp cho người đi sau một "bản đồ" đường đi để có cái nhìn rộng hơn về những điều cần đạt được trên lộ trình trở thành nhà phát triển phần mềm chuyên nghiệp, cấp cao.

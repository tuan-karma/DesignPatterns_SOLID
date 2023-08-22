# Kiến trúc lục giác trong ngữ cảnh lập trình nhúng

_Tham khảo: [Arjun Singh's Kiến trúc Lục giác trong lập trình nhúng](https://medium.com/@arjunsingh_93730/embedded-software-architecture-hexagonal-architecture-part-4-26933301ac73)_

> Trong thế giới lập trình nhúng, các kiến trúc sư và kỹ sư phải đối mặt với những thách thức đặc biệt khi thiết kế các hệ thống hiệu quả, mô-đun hóa, và có thể bảo trì. Một mẫu kiến trúc trở nên phổ biến trong những năm gần đây là kiến trúc Lục giác (hexagonal architecture), còn được gọi là Cổng và Bộ điều hợp. Mẫu này thúc đẩy sự phân tách rõ ràng các mối quan tâm, làm cho các hệ thống nhúng có khả năng mở rộng và dễ dàng kiểm thử. Hãy cùng khám phá kiến trúc này bằng ví dụ cụ thể trong lập trình nhúng.

## Tổng quan về kiến trúc Lục giác

Là một phong cách kiến trúc nhằm tách rời logic nghiệp vụ lõi (domain) khỏi các phần phụ thuộc bên ngoài, chẳng hạn như giao diện người dùng, cơ sở dữ liệu, server API, và phần cứng. Kiến trúc bao gồm ba thành phần chính:

1. Logic Lõi (hay miền/lĩnh vực/domain): Thành phần này gói gọn các quy tắc và hành vi của công việc chính yếu (essential business) của hệ thống nhúng. Nó phải hoàn toàn độc lập với các thành phần phụ thuộc bên ngoài.

2. Cổng: Cổng là giao diện xác định các điểm giao tiếp giữa logic lõi và thế giới bên ngoài. Chúng đóng vai trò là điểm vào và ra của dữ liệu và lệnh.

3. Bộ điều hợp: là việc triển khai (viết mã cụ thể) các Cổng (port interfaces) cho phép giao tiếp giữa logic lõi và hệ thống bên ngoài. Chúng chuyển đổi dữ liệu từ định dạng này sang định dạng khác, cho phép hệ thống tương tác với các thiết bị hoặc giao diện khác nhau. (Nó giống như một bộ chuyển đổi từ chuẩn này sang chuẩn khác, từ kiểu này sang kiểu khác và ngược lại: Adapters).

## Ví dụ: Hệ thống giám sát nhiệt độ nhúng

Hãy xem xét một ví dụ về hệ thống giám sát nhiệt độ nhúng cho nhà thông minh. Hệ thống phải có khả năng đo nhiệt độ bằng các loại cảm biến khác nhau, chẳng hạn như cảm biến dựa trên I2C và cảm biến dựa trên UART. Nó cũng sẽ hỗ trợ các giao diện người dùng khác nhau, như màn hình LCD và bảng điều khiển chạy trên trình duyệt web.

1. **Logic lõi (miền)**: Logic lõi của hệ thống giám sát nhiệt độ chứa các quy tắc kinh doanh cơ bản và tính toán liên quan đến đo nhiệt độ, kiểm tra ngưỡng, và cảnh báo. Nó nên được cách ly khỏi các loại cảm biến hoặc giao diện người dùng cụ thể. Đây là một đoạn mã đơn giản hóa của logic lõi:

```cpp
// Core Logic - Temperature Monitor

typedef struct {
    float currentTemperature;
    float threshold;
} TemperatureData;

// Temperature update event from sensors
void updateTemperature(float newTemp) {
    TemperatureData data;
    data.currentTemperature = newTemp;
    // Check if temperature exceeds threshold and raise an alert if needed
    if (data.currentTemperature > data.threshold) {
        raiseTemperatureAlert(data.currentTemperature);
    }
}
```

2. **Cổng**: Trong ví dụ này, ta có hai cổng: `TemperatureSensorPort` để liên lạc với các cảm biến nhiệt độ khác nhau (SPI, hoặc UART, hoặc I2C ...), và `UserInterfacePort` để tương tác với các giao diện người dùng khác nhau. Các cổng này là các giao diện (hoặc lớp trừu tượng) và không hề biết gì về các mã triển khai cụ thể.

```cpp
// Ports - Temperature Sensor and User Interface

// Ports for temperature sensor
typedef struct {
    float (*readTemperature)();
} TemperatureSensorPort;

// Port for user interface
typedef struct {
    void (*displayTemperature)(float temp);
    void (*displayAlert)(const char * message);
} UserInterfacePort;
```

3. **Bộ điều hợp**: Tiếp theo, ta triển khai các bộ điều hợp cho cảm biến nhiệt độ dựa trên I2C và UART, cũng như cho màn hình LCD đồ họa và giao diện người dùng dựa trên web.

```cpp
// Adapters - Sensor and User Interface Implementations

// I2C Sensor Adapter
float i2cReadTemperature() {
    // Implementation specific to I2C-based sensor
}

// UART Sensor Adapter
float uartReadTemperature() {
    // Implementation specific to UART-based sensor
}

// Graphical LCD Adapter
void displayOnGraphicalLCD(float temp) {
    // Implementation specific to graphical LCD interface
}

// Web-based User Interface Adapter
void displayOnWebDashboard(float temp) {
    // Implementation specific to web-based dashboard
}
```

4. Kết nối tất cả lại với nhau: Trong bước cuối cùng, ta kết nối **logic lõi** với các **bộ điều hợp** bằng cách sử dụng các **cổng** đã viết.

```cpp
// Wiring Core Logic with Adapters

// I2C Temperature Sensor Implementation
TemperatureSensorPort i2cTemperatureSensor = {
    .readTemperature = i2cReadTemperature
};

// Graphical LCD User Interface Implementation
UserInterfacePort graphicalLCDInterface = {
    .displayTemperature = displayOnGraphicalLCD,
    .displayAlert = displayAlertOnGraphicalLCD
};

// Wiring core logic with adapters
void initTemperatureMonitor() {
    TemperatureSensorPort *sensor = &i2cTemperatureSensor;
    UserInterfacePort *ui = &graphicalLCDInterface;

    // Start the monitoring loop
    while (1) {
        float temperature = sensor->readTemperature();
        updateTemperature(temperature);
        ui->displayTemperature(temperature);
    }
}

```

## Kết luận

Bằng cách tuân thủ Kiến trúc lục giác, chúng ta đạt được sự phân tách rõ ràng các mối quan tâm, giúp hệ thống giám sát nhiệt độ trở nên linh hoạt và dễ bảo trì hơn. Chúng ta có thể dễ dàng hoán đổi các cách triển khai cảm biến hoặc giao diện người dùng khác nhau mà không ảnh hưởng đến logic lõi.

Tóm lại, Kiến trúc lục giác là một mẫu thiết kế mạnh mẽ mang lại nhiều lợi ích cho việc phát triển phần mềm nhúng. Nó thúc đẩy tính mô-đun hóa, khả năng kiểm thử và khả năng thích ứng, cho phép các nhà phát triển xây dựng các hệ thống mạnh mẽ và có thể mở rộng trong một thế giới không ngừng thay đổi.

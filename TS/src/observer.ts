/**
 * Observer là mẫu thiết kế thuộc nhóm hành vi 
 * - Xác định mối quan hệ một-nhiều giữa một chủ thể và nhiều người quan sát 
 * - Khi chủ thể thay đổi trạng thái, tất cả các đối tượng phụ thuộc (người quan sát) của nó sẽ được thông báo và cập nhật tự động.
 * - Hữu ích để triển khai các hệ thống xử lý sự kiện phân tán và giữ cho nhiều đối tượng được đồng bộ hóa 
 * 
 * Trong ví dụ dưới đây:
 * 1. `Observer` là một giao diện với phương thức `update` mà những người quan sát cụ thể cần triển khai 
 * 2. `NewsPublisher` là chủ thể (đối tượng được quan sát) nó lưu trữ một danh sách những người quan sát (observers), 
 * và cung cấp các phương thức để đăng ký (subscribe), hủy đăng ký (unsubscribe), và thông báo (notify) tới người quan sát
 * 3. `NewsSubscriber` là người quan sát cụ thể, triển khai giao diện `Observer`, định nghĩa phương thức `update` để phản ứng với những cập nhật từ chủ thể
 * 4. Trong phần sử dụng, ta tạo một `NewsPublisher` và hai `NewsSubscriber`. Ta đăng ký những người quan sát mới tạo này với nhà xuất bản, 
 * và khi nhà xuất bản thông báo một thông điệp, tất cả những người quan sát (aka. người đăng ký) đều nhận và phản ứng với thông điệp này 
 * 
 * Mẫu Observer (người quan sát) giúp ta tách rời chủ thể khỏi những người quan sát (nhận thông báo), giúp dễ dàng thêm hoặc gỡ bỏ người đăng ký mà không cần sửa mã của chủ thể.
 * Nó thường được sử dụng trong các hệ thống xử lý sự kiện, các thành phần của giao diện người dùng (UI), và các tình huống trong đó nhiều đối tượng cần phản ứng với những thay đổi trạng thái từ một đối tượng (chủ thể).
 * 
 */

// Observer interface
interface Observer {
    update(message: string): void;
}

// Subject (Observable)
class NewsPublisher {
    private observers: Observer[] = [];
    
    // Method to subscribe observers
    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }
    
    // Method to unsubscribe observers
    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    // Method to notify observers of a new message
    notify(message: string): void {
        this.observers.forEach(observer => observer.update(message));
    }
}

// Concrete Observer
class NewsSubscriber implements Observer {
    constructor(private name: string) {}
    
    update(message: string): void {
        console.log(`${this.name} received news: ${message}`);
    }
}

// Usage
const newsPublisher = new NewsPublisher();

const subscriber1 = new NewsSubscriber("Subscriber 1");
const subscriber2 = new NewsSubscriber("Subscriber 2");

newsPublisher.subscribe(subscriber1);
newsPublisher.subscribe(subscriber2);

newsPublisher.notify("Breaking news: TypeScript is awesome!");

// Output:
// Subscriber 1 received news: Breaking news: TypeScript is awesome!
// Subscriber 2 received news: Breaking news: TypeScript is awesome!

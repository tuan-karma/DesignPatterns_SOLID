/**
 * Mẫu Abstract Factory: 
 * - có thể xem là một mở rộng của mẫu Factory Method cho một họ các sản phẩm
 * - tập trung vào chế tạo các họ đối tượng 
 * - cung cấp một giao diện để tạo ra các họ đối tượng liên quan hoặc phụ thuộc mà không chỉ định các lớp củ thể của chúng.
 * 
 * Các thành phần của mẫu này:
 * - Nhà máy trừu tượng (abstract factory): Khai báo một giao diện để tạo ra các họ đối tượng liên quan 
 * - Nhà máy cụ thể (concrete factory): Mỗi nhà máy cụ thể chịu trách nhiệm tạo ra các đối tượng thuộc về một họ cụ thể
 * - Sản phẩm trừu tượng (abstract product): Mỗi sản phẩm trừu tượng xác định một giao diện chung cho một nhóm các sản phẩm liên quan 
 * - Sản phẩm cụ thể (concrete product): Triển khai các giao diện của sản phẩm trừu tượng 
 * 
 * Ví dụ: Tưởng tượng bạn đang thiết kế một bộ khung GUI. Bạn có các thành phần khác nhau như các nút bấm (buttons) và chechboxes, 
 * mỗi thành phần có thể có các theme khác nhau như: sáng hoặc tối.
 * 
 * Ví dụ dưới đây sử dụng xen kẽ `interface` và `abstract class` của TypeScript, trong thực tế bạn có thể tùy tình hình mà sử dụng một trong hai cách này để tạo ra các abstract class hoặc interface trong mẫu.
 * 
 */

import { checkPrime } from "crypto";

// Abstract Products
interface Button {
    display(): void;
}

interface Checkbox {
    display(): void;
}

// Concrete Products for Light Theme
class LightButton implements Button {
    display(): void {
        console.log("Displaying light-themed button");
    }
}

class LightCheckbox implements Checkbox {
    display(): void {
        console.log("Displaying light-themed checkbox");
    }
}

// Concrete Products for Dark Theme
class DarkButton implements Button {
    display(): void {
        console.log("Displaying dark-themed button");
    }
}

class DarkCheckbox implements Checkbox {
    display(): void {
        console.log("Displaying dark-themed checkbox");
    }
}

// Abstract Factory
abstract class GUIFactory {
    abstract createButton(): Button;
    abstract createCheckbox(): Checkbox;

}

// Concrete Factories
class LightThemeFactory extends GUIFactory {
    createButton(): Button {
        return new LightButton;
    }

    createCheckbox(): Checkbox {
        return new LightCheckbox;
    }
}

class DarkThemeFactory extends GUIFactory {
    createButton(): Button {
        return new DarkButton;
    }

    createCheckbox(): Checkbox {
        return new DarkCheckbox;
    }
}

// Client code 
function createUI(factory: GUIFactory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();

    button.display();
    checkbox.display();
}

// Usage 
const lightFactory = new LightThemeFactory();
createUI(lightFactory);

const darkFactory = new DarkThemeFactory();
createUI(darkFactory);
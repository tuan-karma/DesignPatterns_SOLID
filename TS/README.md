Bởi vì chính tôi cũng gặp khó khăn mỗi khi bắt đầu một dự án TypeScript mới không biết phải bắt đầu từ đâu. Nên tôi ghi lại đây các bước bắt đầu một dự án TypeScript hoàn toàn mới trên máy tính.

Lưu ý:

- Các ghi chú này có hiệu lực áp dụng vào tháng 8 năm 2023. Bởi vì TypeScript và hệ sinh thái nodejs thay đổi rất nhanh nên các hướng dẫn này có thể không còn đúng trong tương lai gần!
- Node.js là môi trường thực thi mã javascript bên ngoài trình duyệt. Lưu ý: chỉ có js được gọi là ngôn ngữ lập trình, nodejs chỉ là run-time để chạy javascript.
- TypeScript là một loại ngôn ngữ bên trên của javascript, nó có quy ước về định kiểu và cung cấp nhiều syntax chặt chẽ hơn để lập trình. Cuối cùng thì mã viết bằng TypeScript vẫn phải "biên dịch" sang javascript để chạy trên môi trường nodejs.

## Cài đặt Node.js

- _Nên_ cài NodeJS trên máy phát triển thông qua công cụ quản lý phiên bản gọi là Node Version Manager (nvm). → Giúp tránh các lỗi phụ thuộc phiên bản của nhiều dự án khác nhau. Vì NodeJS được phát triển rất nhanh, nó lên vài phiên bản chính trong một năm, nên việc quản lý từng version cho từng dự án là vô cùng cần thiết.
- Trước tiên: cài nvm theo hướng dẫn (cho cả Windows và Linux, MacOS): https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment#ubuntu_and_macos
- Tiếp theo: cài nodejs từ nvm, ví dụ `nvm install --lts` để cài bản long-term support mới nhất.
- Hướng dẫn cho hệ điều hành sử dụng phiên bản nodejs vừa cài bằng lệnh `nvm use --lts`
- Kiểm tra phiên bản nodejs hiện hành: `node -v`, thời điểm hiện tại bản lts trên máy tính tôi trả về `v18.17.0`
- Có thể cài đặt các phiên bản nodejs khác bằng công cụ nvm, ví dụ `nvm install 20.5.1`
- Chuyển đổi phiên bản nodejs hiện hành trên máy bằng lệnh, ví dụ `nvm use 20.5.1`

- Trên máy triển khai (ví dụ Raspberry Pi hoặc trên server) ta có thể cài bản cụ thể với đầy đủ các setting phụ thông qua script tự động (tôi không đi vào chi tiết ở đây).

## Khởi tạo một dự án TypeScript mới

- Một dự án TypeScript thực chất là phần thêm vào một dự án NodeJS. Như nói bên trên, TypeScript chỉ là lớp bên trên của NodeJS.
- Khởi tạo dự án nodejs, vào thư mục trống của dự án: `npm init -y` --> tạo ra file `package.json` với các thông số tối thiểu mặc định. Bạn có thể sửa đổi các thông số trong file này bằng trình soạn thảo ví dụ vscode. Tham khảo file package.json của repo này để biết một số cài đặt hữu ích.
- Cài đặt typescript dưới dạng development dependency: `npm install typescript --save-dev`
- Cài đặt các gói định kiểu typescript cho các module node: `npm i -D @types/node` (i là viết tắt cho install, -D lfa viết tắt của --save-dev)
- Khởi tạo file `tsconfig.json` với các cài đặt mặc định và các comments hướng dẫn cụ thể: `npx tsc --init` (npx là một lệnh thực thi gói phần mềm nodejs bên trong thư mục, có thể hiểu npx ~ npm execute)
- Dùng vscode biên soạn lại các cài đặt cụ thể trong `tsconfig.json`. Ở trong repo này tôi sử dụng các lựa chọn sau, mục đích là đùng tất cả những thứ mới nhất trong ngôn ngữ typescript và nodejs hiện hành, bạn có thể phải chọn các lựa chọn thấp hơn nếu bạn sử dụng một số thư viện node không hỗ trợ các tính năng mới nhất này:

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    /* Language and Environment */
    "target": "ES2022" /* Set the JavaScript language version for emitted 
    /* Modules */,
    "module": "NodeNext" /* Specify what module code is generated. */,
    "moduleResolution": "NodeNext" /* Specify how TypeScript looks up a file from a given 
    "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */,
    "outDir": "dist" /* Specify an output folder for all emitted files. */,
    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

## Viết code và chạy thử

- Quy hoạch code: tôi để mã nguồn viết bằng TS trong thư mục ./src và các mã JS biên soạn ra trong thư mục ./dist. Thư mục dist được thiết lập là `"outdir": "dist"` trong file `tsconfig.json`
- Ta viết các mã nguồn dạng file .ts trong thư mục `./src`, ví dụ "hello.ts". Sau đó dùng lệnh `npx tsc` để typescript biên dịch nó ra file `./dist/hello.js`.
- Dùng lệnh `node dist/hello.js` để chạy file này.

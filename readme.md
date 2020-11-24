### Yêu cầu.
    - IDE: Webstome
    - Node: 12.19.0 (dùng nvm)
        + Cài nodemon vào global: npm install -g nodemon
    - MongoDB: 4.4 (navicat, studio 3T)
        + Tạo DB lgbt_vietnam.
        + Tạo userDB có quyền readWrite với DB lgbt_vietnam
    - Redis: 3.0.504 (Another Redis Desktop Mannager)
    - Elastic: 7.9.3 (Kibana, apm)

### Làm thế nào để chạy.
    - Chỉnh sửa cấu hình trong local_config.js cho phù hợp. tham khảo config.js
    - cd tới thư mục chứa source
    - Tạo mới thư mục logs (nếu chưa có)
    - npm install
    - nodemon server.js
    
###   Môi trường .env
    - local: Là môi trường phát triển tại máy của developer (người lập trình BE).
    - dev: Là môi trường trên cloud phục vụ tester.
    - prod: Là môi trường thật phục vụ khách hàng.
    
### Cấu trúc thư mục.
    - assets: Chứa tài nguyên của hệ thống, images, icons...
    - config: Chứa tất cả những file cấu hình của hệ thống.
        + local_config.js Chứa config của loal 
        + config.js  Chứa config của dự án theo môi trường.
    - utils: Nơi chứa công cụ hỗ trợ chung toàn hệ thống
        + log.js Ghi log, phân chi log của hệ thống
        + router_server.js Định tuyến đường đi của api theo controller.
        + authentication.js Xác thực auth của request khi call đến hệ thống.
        + helper.js Chứa các hàm hỗ trợ dùng chung cho toàn hệ thống.
        + validate.js 
    - connection: Chứa tất các các hàm connect đến bên thứ 3 (MongoDB, redis, rabbit ..)
    - constants: Chứa tât cả các hằng số của toàn bộ hệ thống
    - controllers: Nơi sử lý nghiệp vụ
    - models: Models của mongoDB
    - views: Chứa view của hệ thống
    - logs: Chứa log theo khung giờ của hệ thống
    - server.js File sẽ được run khi start hệ thống (Mọi thứ bắt nguồn từ đây).
    
### Làm thế nào để viết 1 API mới trong controllers.
    - Tạo một bản sao example.js và sửa [file_name], tên class, module.exports ở trong file.
    - Check xem việc tạo mới thành công chưa bằng cách gửi 1 request GET trên trình duyệt (VD: localhost:port/[file_name])
    - Trong mỗi một file controller luôn bao gồm 2 thành phần
        + method _test: (Không được xóa) phục vụ request GET để test các API có trong file.
        + method API _process01, _process02, _login... : (Được phép sửa) Là nơi tùy biến API theo từng nghiệp vụ.
        
### Thế nào là 1 API sạch, đẹp, đúng tiêu chuẩn, dễ maintain
    - Được viết gọn gàng trong 1 method (khác method _test) trong controller.
    - Tên method bắt đầu bằng "_" sử dụng slyte snake_case VD: _day_la_api
    - Có try catch toàn bộ method, có return khi gặp Exception
    - Đầy đủ 2 loại log ở tất cả các trường hợp: Đầu vào body và thông điệp của quá trình xử lý (trước khi return).
    - Sử dụng _log.log(), _log.error() để ghi log vào file thay vì console.log().
    - Không hard code, tất cả message, status ... phải đưa ra constants để quản lý tập trung và tái sử dụng lại.
    - Phải validate input cẩn thận trước khi xử lý
    - Phải mã hóa thông tin trước khi trả về response cho client (dùng helper.encode_data())  
    
### Làm thế nào để test 1 API
    - Chuyển .env sang "local" thì data response về sẽ không bị mã hóa.
    - Tất cả các API đều là dùng phương thức POST.
        + VD: Trong example.js có method _day_la_api => POST: localhost:port/example/day_la_api
        + VD: Trong user.js có method _login => POST: localhost:port/user/login
   
### BU database
mongodump --db sainbolt-app --out=sainbolt_app_local_24_11_2020
mongodump mongodb+srv://cluster0.hxmc8.mongodb.net/sainbolt-app --username dusainbolt  --out=sainbolt_app_server_24_11_2020
mongorestore <path dump>
mongorestore mongodb+srv://cluster0.hxmc8.mongodb.net/sainbolt-app --username dusainbolt  --out=sainbolt_app_server_24_11_2020

 
### update many <Rename>
const courseDetail = await course_rq_model.updateMany({},{ $rename: { "userId": "user" } } )
- create_at: 27/10/20 - dusainbolt.
- update_at: 31/10/20 - dusainbolt
mongodb+srv://cluster0.hxmc8.mongodb.net/sainbolt-app --username dusainbolt
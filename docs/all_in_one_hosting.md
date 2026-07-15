# Hướng dẫn Host Toàn bộ Dự án (All-in-One) lên Render.com

Để tối ưu nhất và có thể host **cả Frontend (React) lẫn Backend (Express ZaloPay)** trong cùng một lần triển khai, nền tảng **Render.com** (dùng Web Service) là lựa chọn tốt nhất.

Tôi đã tự động cấu hình lại 2 file ở Backend để hỗ trợ việc này (mà vẫn **không thay đổi cấu trúc `src`** của bạn):

1. **`server/index.cjs`**: Cấu hình để Express server tự động phục vụ các file giao diện của React (sau khi build ra thư mục `dist`).
2. **`package.json`**: Thêm lệnh `"start": "node server/index.cjs"` để Render biết cách khởi chạy.

Với thiết lập này, khi ứng dụng chạy, Backend sẽ tự động gánh luôn việc hiển thị Frontend ở cùng một domain! Dưới đây là các bước triển khai:

---

### Bước 1: Đưa toàn bộ code lên GitHub

1. Mở terminal tại thư mục gốc của dự án (`my-react-app`).
2. Chạy các lệnh sau:
   ```bash
   git add .
   git commit -m "Configured all-in-one server for Render"
   git push origin main
   ```

*(Nếu bạn chưa có repo GitHub, hãy tạo mới và push lên như hướng dẫn ở file trước).*

### Bước 2: Tạo Web Service trên Render

1. Truy cập [Render.com](https://render.com/) và tạo tài khoản/đăng nhập bằng GitHub.
2. Tại màn hình Dashboard, bấm nút **"New +"** ở góc phải trên cùng và chọn **"Web Service"**.
3. Chọn tùy chọn **"Build and deploy from a Git repository"** và bấm Next.
4. Tìm và kết nối repository GitHub chứa dự án của bạn (nếu Render chưa thấy, hãy bấm *Configure account* để cấp quyền cho Render truy cập repo đó). Sau đó bấm **"Connect"**.

### Bước 3: Cấu hình Web Service

Điền các thông tin cài đặt chính xác như sau:

- **Name:** Đặt tên bất kỳ cho dự án (ví dụ: `my-react-app-full`).
- **Region:** Chọn `Singapore` (để server gần Việt Nam, tốc độ truy cập sẽ nhanh nhất).
- **Branch:** `main` (hoặc nhánh bạn đang push code lên).
- **Runtime:** `Node`
- **Build Command:**

  ```bash
  npm install && npm run build
  ```

  *(Lệnh này sẽ cài đặt thư viện và build file React ra thư mục `dist`)*
- **Start Command:**

  ```bash
  npm start
  ```

  *(Lệnh này sẽ chạy file `server/index.cjs`)*
- **Instance Type:** Chọn gói `Free` ($0/month).

### Bước 4: Deploy

- Cuộn xuống dưới cùng và bấm nút **"Create Web Service"**.
- Render sẽ bắt đầu tiến trình cài đặt (Build) và Khởi chạy (Deploy). Bạn có thể xem trực tiếp log trong màn hình đen.
- Quá trình này mất khoảng 2 - 4 phút.
- Khi trạng thái chuyển sang **"Live"** màu xanh lá cây, bạn có thể click vào đường link URL do Render cung cấp ở góc trên bên trái (ví dụ: `https://my-react-app-xxxx.onrender.com`).

**Hoàn tất!** Bây giờ cả Frontend và các API thanh toán ZaloPay của bạn đều đang chạy trên cùng một đường link này. Frontend có thể tự động gọi API tới `/api/zalopay/...` mà không gặp bất kỳ lỗi CORS nào.

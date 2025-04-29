<h1 align='center'> <strong> AI-Powered Calculation plugin for excel processing applications </strong> </h1>


## ℹ️ Overview
Một add-on được phát triển bằng Google Apps Script cho phép người dùng tùy chỉnh và thực thi các lệnh AI trực tiếp trong môi trường excel sử dụng bằng AI (Google Gemini API).

## 🚀 Tính Năng
+ Chọn dòng tiêu đề cần bỏ qua.
+ Đặt prompt tùy chỉnh cho từng dòng (`{{value}}` được sử dụng để tham chiếu tên cột).
+ Chọn cột để ghi kết quả.
+ Chọn phạm vi dòng để xử lý:
    + `auto` (ví dụ, 3 dòng đầu) 
    + `fixed` (ví dụ, từ dòng 2 đến dòng 4).

+ Hàm GPT tùy chỉnh: `GPT_SUMMARIZE`
    + `Text`: Văn bản hoặc ô tham chiếu cần tóm tắt.
    + `Format`: Định dạng đầu ra theo prompt.
    + `Temperature`: Độ sáng tạo trong kết quả.
    + `Model`: Chọn mô hình AI muốn sử dụng (mặc đinh là gemini-2.0-flash).

## 🧠 Công Nghệ Sử Dụng 
- **Google App Script**: xây dựng add-on và tương tác với Google Sheets.
- **Google Gemini**: Xử lý prompt của người dùng.

## ⚙️ Cài Đặt Và Sử Dụng
1. Mở Google Sheets $\rightarrow$ Extensions $\rightarrow$ Apps Script.
2. Tạo 2 file gs và html tương ứng.
3. Tạo `GEMINI_API_KEY` và thay thế trong file.gs
4. Chạy file gs với `function onOpen()`.
5. Quay trở lại Sheets mở Calculation $\rightarrow$ AI-Powered Calculation. 


## 💡 Demo
### Thực hiện trên giao diện
- Chọn `header row = 1`.
- viết prompt để thực thi trên cột `{{description}}`
- Chọn đặt kết quả sau khi thực thi vào cột `Production name`

**Trường hợp 1:**
- Chọn all rows $\rightarrow$ run

<div align='center'>
<img src="https://i.imgur.com/peFOLNB.png" alt='all row'>
</div>

**Trường hợp 2:**
- Chọn $1$ rows $\rightarrow$ run

<div align='center'>
<img src='https://i.imgur.com/EBFkAXg.png' alt= 'rows'>
</div>

**Trường hợp 3:**
- Chọn `fixed`
- from $1$ rows $\rightarrow$ run

<div align='center'>
<img src='https://i.imgur.com/eMvctEk.png' alt= 'fixed'>
</div>

### GPT Function 
- Chọn ô thực hiện function
- Thực thi function `=GPT_SUMMARIZE(B2, "item list", 0)`

<div align='center'>
<img src="https://i.imgur.com/ILanIXZ.png" alt='gpt function'>
</div>

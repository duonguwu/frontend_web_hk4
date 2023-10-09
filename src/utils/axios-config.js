import axios from "axios";

// Tạo một phiên bản Axios với cấu hình mặc định
const instance = axios.create({
  baseURL: "http://localhost:8000/api", // Đổi thành URL của backend Laravel của bạn
});

export default instance;

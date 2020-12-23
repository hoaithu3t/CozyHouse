import axios from "../config/axios";
import { toast } from 'react-toastify';

export const login = (username, password) =>
  axios
    .post("/auth/login", {
      username,
      password,
    })
    .then((res) => {
      toast.success('Đăng nhập thành công');
      return res.data
    }
      )
    .catch((err) =>
    {
      if (err.response === undefined) {
        toast.error('Không thể kết nối server');
      }
      else {
         switch (err.response.status) {
            case 401:
              toast.error('Tên đăng nhập hoặc mật khẩu không tồn tại');
              break;       
            default:
              toast.error('Có một lỗi sảy ra trong quá trình đăng nhập');
        }
      }
    }
    )

export const register = (username, password, CMND, address, phone, email, birthDate, gender, role ) =>
  axios
    .post("/auth/register", {username, password, CMND, address, phone, email, birthDate, gender, role})
    .then((res) => {
      toast.success('Đăng ký thành công');
      return res.data
    }
      )
    .catch((err) =>
    {
      if (err.response === undefined) {
        toast.error('Không thể kết nối server');
      }
      else {
         switch (err.response.status) {
            case 409:
              toast.error('Tên đăng nhập đã tồn tại');
              break;       
            default:
              toast.error('Có một lỗi sảy ra trong quá trình đăng nhập');
        }
      }
    }
    )
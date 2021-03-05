import axios from "../config/axios";
import { toast } from 'react-toastify';

export const login = (username, password) =>
  axios
    .post("/auth/login", {
      username,
      password,
    })
    .then((res) => {
      toast.success('Logged in successfully');
      return res.data
    }
      )
    .catch((err) =>
    {
      if (err.response === undefined) {
        toast.error('Cannot connect server');
      }
      else {
         switch (err.response.status) {
            case 401:
              toast.error('Username or password does not exist');
              break;       
            default:
              toast.error('There was an error logging in');
        }
      }
    }
    )

export const register = (username, password, CMND, address, phone, email, birthDate, gender, role ) =>
  axios
    .post("/auth/register", {username, password, CMND, address, phone, email, birthDate, gender, role})
    .then((res) => {
      toast.success('Sign Up Success');
      return res.data
    }
      )
    .catch((err) =>
    {
      if (err.response === undefined) {
        toast.error('Cannot connect server');
      }
      else {
         switch (err.response.status) {
            case 409:
              toast.error('Username available');
              break;       
            default:
              toast.error('An error occurred during registration');
        }
      }
    }
    )
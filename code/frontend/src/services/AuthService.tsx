import { handleError } from "../helpers/ErrorHandler"
import { UserProfileToken } from "../models/User";
import axios from "axios";

const api =  "http://localhost:8080/login"


export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api, {
        email: email,
        password: password
    });

    return data;
  } catch (error) {
    handleError(error)
  }
};
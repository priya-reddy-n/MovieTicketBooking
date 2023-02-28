import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor() { }

  private backendServer = 'http://localhost:8000';

  private loginURL = `${this.backendServer}/user/login`;
  private registerURL = `${this.backendServer}/user/register`;

  // Login user
  async loginUser(userName: string, password: string): Promise<any> {
    const resData = await axios.post(this.loginURL, { userName, password }).then(res => {
      if (res && res.status === 200) {
        const { msg, data } = res.data;
        if (data && msg) {
          const { userId, userName } = data;
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", userName)
          return msg;
        }
        throw "Login response not found";
      }
      throw "Login Failed";
    });
    return resData;
  }

  // Register new user
  async registerUser(payload: any): Promise<any> {
    const resData = await axios.post(this.registerURL, payload).then(res => {
      if (res && res.data) {
        const { msg } = res.data;
        console.log(res.data)
        if (res.status === 200) {
          return { msg, loggedIn: true };
        } else if (res.status === 400) {
          return { msg, loggedIn: false };
        }
      }
      throw "Registration Failed";
    });
    return resData
  }
}

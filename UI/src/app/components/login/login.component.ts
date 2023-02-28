import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/service/login-register.service';
import { NzMessageService } from 'ng-zorro-antd/message';
interface LoginResType {
  msg: any;
  data: any;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginRegService: LoginRegisterService, private message: NzMessageService) {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (userName && userId) {
      this.router.navigate(["/dashboard"])
    }
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  async submitForm(): Promise<any> {
    if (this.loginForm.valid) {
      try {
        const { userName, password } = this.loginForm.value;
        if(userName=='admin'){
          this.router.navigate(['/admin']);
        }
        const resData: any = await this.loginRegService.loginUser(userName, password);
        if (resData) {
          this.message.success(resData || "");
          this.router.navigate(["/dashboard"]);
        }
      } catch (e: any) {
        this.message.error(e.response.data || "Invalid Credentails");
      }
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  



  goToRegister(): void {
    this.router.navigate(["/register"]);
  }

}

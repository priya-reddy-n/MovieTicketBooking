import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/service/login-register.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private message: NzMessageService, private loginRegService: LoginRegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      fullName: [null, [Validators.required]],
      emailId: [null, [Validators.required]],
      location: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

  async submitForm(): Promise<void> {
    if (this.registerForm.valid) {
      try {
        const { userName, password, fullName, location, emailId, phoneNumber } = this.registerForm.value;
        const resData: { loggedIn: Boolean, msg: string } = await this.loginRegService.registerUser({ userName, password, fullName, location, emailId, phoneNumber });
        if (resData.loggedIn === true) {
          this.message.success(resData.msg || "");
          this.router.navigate(["/login"]);
        }
      } catch (e: any) {
        this.message.error( "User Already exists");
      }
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(["/login"]);
  }
}

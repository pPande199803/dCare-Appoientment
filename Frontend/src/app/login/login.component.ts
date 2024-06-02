import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: boolean = true;
  registerForm: boolean = false;

  isAdmin : boolean = false

  registerFormData !: FormGroup;
  loginFormData !: FormGroup;

  constructor(private service: SharedService, private fb: FormBuilder, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerFormData = this.fb.group({
      "name":['',[Validators.required]],
      "email": ['',[Validators.required , Validators.email]],
      "password": ['',[Validators.required]],
      "isAdmin": [false ,[Validators.required]],
      "isUser": [false ,[Validators.required]],
      "secreatKey":['']
    })
    this.loginFormData = this.fb.group({
      "email": ['',[Validators.required , Validators.email]],
      "password": ['',[Validators.required]],
      "token": [""]
    })
  }

  get r() {
    return this.registerFormData.controls;
  }
  get l() {
    return this.loginFormData.controls;
  }

  checkAdmin(){
    this.isAdmin = !this.isAdmin;

    alert("For Doctor Secreat Key Contact On Mobile Number... Prathamesh Pande - 8329758097 ")
  }

  createNewAcount() {
    this.registerForm = true;
    this.loginForm = false;
  }
  AlreadyHaveAnAccount() {
    this.registerForm = false;
    this.loginForm = true;
  }

  registerUserData() {
    try {
      this.service.registerUser(this.registerFormData.value).subscribe((res: any) => {
        this.toastr.success('Register user successfully', 'Register Successfully', {
          timeOut: 3000,
        });
        this.registerFormData.reset();
        this.isAdmin = false;
        this.AlreadyHaveAnAccount();
      }, err => {
        this.toastr.error('Something Went Worong', 'Register Failed', {
          timeOut: 3000,
        });
      })

    } catch (error) {
      this.toastr.error('Something Went Worong From Api side', 'Server Error', {
        timeOut: 3000,
      });
    }
  }
  loginUserData() {
    try {
      this.service.loginUser(this.loginFormData.value).subscribe((res: any) => {
        this.toastr.success('Login user successfully', 'Login Successfully', {
          timeOut: 3000,
        });
        if(res.user.isAdmin == true){
          this.router.navigate(['/doctor'])
        }else{
          this.router.navigate(['/user'])
        }
        // console.log(res)
        let token = res.token;
        let userId = res.user._id
        let name = res.user.name
        // console.log(userId)
        localStorage.setItem('token',token)
        localStorage.setItem('userId',userId)
        localStorage.setItem('name',name)
        // console.log(token)
        this.loginFormData.reset();
      }, err => {
        this.toastr.error('Something Went Worong', 'Login Failed', {
          timeOut: 3000,
        });
      })

    } catch (error) {

      this.toastr.error('Something Went Worong From Api side', 'Server Error', {
        timeOut: 3000,
      });
    }
  }

  // loginUserData() {
  //   try {
  //     this.service.registerUserGet().subscribe((res: any) => {
  //       const user = res.find((data: any) => {
  //         return this.loginFormData.value.email == data.email;
  //       })
  //       console.log(user)
  //       if (!user) {
  //         console.log("User not Found")
  //       } else {
  //         if (user.isAdmin == true) {
  //           localStorage.setItem('role', 'admin')
  //           this.router.navigate(['/doctor'])
  //         } else {
  //           localStorage.setItem('role', 'user')
  //           this.router.navigate(['/user'])
  //         }
  //       }
  //     })
  //   }
  // catch(error) {

  //   alert("Something Went Worong From Api side")
  // }
}



import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  doctorData:any;
  appoientmentBookingForm!:FormGroup
  token:any
  doctorId:any;
  userId:any;
  currentDate = new Date().toISOString().slice(0, 10)
  notification = "Appoientment Request Send Successfully"


  constructor(private service:SharedService, private router:Router, private fb:FormBuilder,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.currentDate;
    this.token = localStorage.getItem('token')
    this.userId = localStorage.getItem('userId')
    // console.log(this.token)
    if(this.token  == null){
      alert('user not Authorized')
      this.router.navigate(['/login'])
    }
    
    
    this.getAllDoctorData();
    
    this.appoientmentBookingForm = this.fb.group({
      userEmailId:[""],
        userId:[''],
        doctorId:[''],
        userName:['',[Validators.required]],
        mobile:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
        age:['',[Validators.required, Validators.minLength(2),Validators.minLength(2)]],
        weight:['',[Validators.required, Validators.minLength(2),Validators.maxLength(3)]],
        address:['',[Validators.required]],
        checkType:['',[Validators.required]],
        currentDate:[this.currentDate],
        status:['pending'],
    })
    this.appoientmentBookingForm.reset()
   
  }

  get r() {
    return this.appoientmentBookingForm.controls;
  }

  getAllDoctorData(){
    this.service.getAllDoctor().subscribe((res)=>{
      // console.log(res);
      this.doctorData = res;
      this.doctorData = this.doctorData.doctors;

    })
  }

  bookId(doctorId :any){
    this.doctorId = doctorId;
    this.appoientmentBookingForm.reset()
  }

  confirm(){
    this.appoientmentBookingForm.value.userId = this.userId;
    this.appoientmentBookingForm.value.doctorId = this.doctorId;
    this.appoientmentBookingForm.value.currentDate = this.currentDate; 
    this.appoientmentBookingForm.value.status = 'pending'; 
    this.service.bookingAppoientment(this.appoientmentBookingForm.value).subscribe((res:any)=>{
      this.appoientmentBookingForm.reset()
      this.toastr.success(`${res.message}`, `${res.message}`, {
        timeOut: 3000,
      });
      let ref= document.getElementById('close');
      ref?.click();
    },err=>{
      this.toastr.error('Something Went Worong', 'Something Went Worong', {
        timeOut: 3000,
      });
    })
  }

//   sendNotification(){
//     let data = {
//       userName:this.appoientmentBookingForm.value.userName,
//     notification:this.notification,
//     status:this.appoientmentBookingForm.value.status,
//     userId: this.userId,
//     doctorId:this.doctorId,
//     currentDate: this.currentDate
//   }
//   this.service.sendNotification(data).subscribe((res:any)=>{
//     // console.log(res)
//     alert(res.message)
//   })
//  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  bookData:any
  appoientmentData:any
  userId:any;
  token:any

  constructor(private service : SharedService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(this.token  == null){
      alert('user not Authorized')
      this.router.navigate(['/login'])
    }
    
    this.getAllAppoientment();
    this.userId = localStorage.getItem('userId')

  }

  getAllAppoientment(){
    this.service.getAllAppoientment().subscribe((res)=>{
      this.bookData = res;
      this.bookData = this.bookData.doctors
    
     const bookingData =  this.bookData.filter((x:any)=>{
        return x.userId === this.userId
      })
      if(bookingData){
        this.appoientmentData = bookingData
        // console.log(this.appoientmentData)
      }else{
        this.toastr.error('Not daata found', 'Not daata found', {
          timeOut: 3000,
        });
      }

    })
    
  }

}

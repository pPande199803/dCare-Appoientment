import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-doctor-notification',
  templateUrl: './doctor-notification.component.html',
  styleUrls: ['./doctor-notification.component.css']
})
export class DoctorNotificationComponent implements OnInit {

  getPendingNoti : any;
  getApprovedNoti : any;
  getAllNoti:any;
  userId:any;
  status:string = 'pending' ;
  token:any;
  loading:boolean = false


  constructor(private service:SharedService, private toastr:ToastrService, private router:Router)  { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(this.token  == null){
      alert('user not Authorized')
      this.router.navigate(['/login'])
    }
    this.userId = localStorage.getItem('userId')
    this.getAllNotification();
  }

  getAllNotification(){
    this.service.getAllAppoientment().subscribe((res)=>{
      this.getAllNoti = res;
      this.getAllNoti = this.getAllNoti.doctors;
      
      const pendingNoti = this.getAllNoti.filter((x:any)=>{
        this.status == x.status;
        return x.status === 'pending'
      })
      if(pendingNoti){
        this.getPendingNoti = pendingNoti
        this.loading = false
        // console.log(this.getPendingNoti)
      }
    })
  }


  updateStatus(appoinmentId: any, data: any) {
    // console.log(appoinmentId)
    // console.log(data)
      data.status = 'approved';
      this.service.updateStatusAppoientment(appoinmentId, data).subscribe((res) => {
        this.toastr.success('Appoientment Request approved successfully', 'Approved Successfully', {
          timeOut: 3000,
        });
        
        this.getAllNotification();

      }, err => {
        this.toastr.error('something went worong', 'something went worong', {
          timeOut: 3000,
        });
      })

  }

  cancelAppoientment(appoinmentId:any, data:any){
      data.status = 'cancel';
      this.service.updateStatusAppoientment(appoinmentId, data).subscribe((res) => {
        // console.log(res);
        this.getAllNotification();
        // this.service.deleteAppoientment(appoinmentId).subscribe((res)=>{
        //   this.getAllNotification();
        // })
        this.toastr.warning('Doctor is Not Aavilable for today....', 'Not Avalible', {
          timeOut: 3000,
        });

      }, err => {
        this.toastr.error('something went worong', 'something went worong', {
          timeOut: 3000,
        });
      })
  
  }



}

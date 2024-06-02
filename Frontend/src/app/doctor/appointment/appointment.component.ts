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

  bookData: any
  appoientmentData: any
  userId: any
  doctorIdForViewAppoentment: any
  token :any

  constructor(private service: SharedService, private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(this.token  == null){
      alert('user not Authorized')
      this.router.navigate(['/login'])
    }

    this.doctorIdForViewAppoentment = localStorage.getItem('viewAppoientment')
    this.userId = localStorage.getItem('userId')
    this.getAllAppoientment();
  }

  getAllAppoientment() {
    if (this.doctorIdForViewAppoentment === '') {
      this.service.getAllAppoientment().subscribe((res: any) => {
        this.appoientmentData = res;
        this.appoientmentData = this.appoientmentData.doctors
      })
    } else {
      this.service.getAllAppoientment().subscribe((res: any) => {
        this.appoientmentData = res;
        this.appoientmentData = this.appoientmentData.doctors
        const data = this.appoientmentData.filter((x: any) => {
          return x.doctorId == this.doctorIdForViewAppoentment
        })
        if (data) {
          this.appoientmentData = data
        }
      })
    }

  }
  currentDate = new Date().toISOString().slice(0, 10)

  passedAppoient() {
    this.service.getAllNotification().subscribe((res:any)=>{
      this.appoientmentData = res.notification
    })
  }

  searchByName(data: any) {
    if (data.value == '') {
      this.getAllAppoientment()
    } else {
      this.service.getAllAppoientment().subscribe((res) => {
        this.appoientmentData = res;
        const user = this.appoientmentData.doctors.filter((x: any) => {
          return x.userName == data.value || x.mobile == data.value;
        })
        if (user) {
          this.appoientmentData = user
        }

      })
    }
  }

  updateStatus(appoinmentId: any, data: any) {
    // console.log(appoinmentId)
    // console.log(data)
    if (data.status == 'pending') {
      data.status = 'approved';
      this.service.updateStatusAppoientment(appoinmentId, data).subscribe((res) => {
        this.toastr.success('Appoientment Request approved successfully', 'Approved Successfully', {
          timeOut: 3000,
        });

      }, err => {
        this.toastr.error('Something Went Worong', 'Something Went Worong', {
          timeOut: 3000,
        });
      })
    }else if(data.status == 'approved'){
      data.status = 'done';
      this.service.updateStatusAppoientment(appoinmentId, data).subscribe((res) => {
        this.toastr.success('Appoientment Request approved successfully', 'Approved Successfully', {
          timeOut: 3000,
        });

      }, err => {
        this.toastr.error('Something Went Worong', 'Something Went Worong', {
          timeOut: 3000,
        });
      })
    }

  }

  passData(data:any, id:any){
    data.status = 'checkup Done'
    this.service.passNotificationData(data).subscribe((res)=>{
      this.toastr.success('Check Up Done', 'Check Up Done', {
        timeOut: 3000,
      });
      this.cancelData(id);
    })
  }

  cancelStatus(appoinmentId: any, data: any){
    // console.log(appoinmentId)
    // console.log(data)
    if (data.status == 'pending') {
      data.status = 'cancel';
      this.service.updateStatusAppoientment(appoinmentId, data).subscribe((res) => {
        this.toastr.warning('Doctor is not avalible Today', 'Not Avalible', {
          timeOut: 3000,
        });

      }, err => {
        this.toastr.error('Something Went Worong', 'Something Went Worong', {
          timeOut: 3000,
        });
      })
    }
  }


  cancelData(id : any){
     this.service.deleteAppoientment(id).subscribe((res)=>{
          this.getAllAppoientment();
          this.toastr.warning('Delete SuccessFully', 'Delete SuccessFully', {
            timeOut: 3000,
          });
        })
  }

  deleteDataUser(id:any){
    this.service.deleteNotification(id).subscribe((res)=>{
      this.getAllAppoientment();
      this.toastr.warning('Delete SuccessFully', 'Delete SuccessFully', {
        timeOut: 3000,
      });
    })
  }

}

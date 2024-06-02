import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  data:any;
  token:any;
  doctorData:any;
  getAllNoti:any;

  constructor(private service:SharedService, private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    // console.log(this.token)
    localStorage.setItem('viewAppoientment','')
    this.token = localStorage.getItem('token')
    
    if(this.token  == null){
      alert('user not Authorized')
      this.router.navigate(['/login'])
    }

    
    this.getDoctor();
    this.getAllDoctorData();
    this.getAllNotification();
  }

  getDoctor(){
      this.service.getDoctor().subscribe((res)=>{
        this.data = res
        // console.log(res)
        localStorage.setItem('name',this.data.data.name)
        localStorage.setItem('role',this.data.data.isAdmin)
      })
   
    }

    getAllDoctorData(){
      this.service.getAllDoctor().subscribe((res)=>{
        // console.log(res);
        this.doctorData = res;
        this.doctorData = this.doctorData.doctors;
  
      })
    }

    bookId(data:any){
      localStorage.setItem('viewAppoientment', data)
    }

  
    getAllNotification(){
      this.service.getAllAppoientment().subscribe((res)=>{
        this.getAllNoti = res;
        // console.log(res)
        this.getAllNoti = this.getAllNoti.doctors;
    
      })
    }

    deleteDoctor(id : any){
      this.service.deleteDoctor(id).subscribe((res)=>{
           this.getAllDoctorData();
           this.toastr.warning('Delete SuccessFully', 'Delete SuccessFully', {
             timeOut: 3000,
           });
         })
   }
    
  }



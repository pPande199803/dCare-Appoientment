import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  addDoctorsInfo!:FormGroup

  isEdit :boolean = false;
  token:any

  constructor(private service:SharedService, private fb:FormBuilder, private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(this.token  == null){
      alert('user not Authorized')
      this.router.navigate(['/login'])
    }
    this.addDoctorsInfo = this.fb.group({
      "firstName":['', [Validators.required]],
      "lastName":['', [Validators.required]],
      "email":['', [Validators.required, Validators.email]],
      "mobile":['', [Validators.required]],
      "website":['', [Validators.required]],
      "address":['', [Validators.required]],
      "specification":['', [Validators.required]],
      "experience":['', [Validators.required]],
      "fees":['', [Validators.required]],
      "timeIn":['', [Validators.required]],
      "timeOut":['', [Validators.required]]
    })
  }
  get d() {
    return this.addDoctorsInfo.controls;
  }


  editModeEnable(){
    this.isEdit = !this.isEdit

  }

  submitData(){
    this.service.addDoctor(this.addDoctorsInfo.value).subscribe(res=>{
      this.toastr.success('Doctor Added SuccessFully', 'Doctor Added SuccessFully', {
        timeOut: 3000,
      });
      // alert("Doctor Added SuccessFully");
      this.addDoctorsInfo.reset()
    }, err=>{
      this.toastr.error('Something Went Worong', 'Register Failed', {
        timeOut: 3000,
      });
    })
  }

}

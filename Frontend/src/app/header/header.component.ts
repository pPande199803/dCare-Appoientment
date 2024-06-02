import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router : Router, private route: ActivatedRoute, private service :SharedService) { }
  count = 0
  role! : string
  name:any

  doctorId:any;

  ngOnInit(): void {
    if(localStorage.getItem('role') == 'true'){
      this.role = 'Doctor'
      this.getDoctorNotification()
    }else{
      this.role = 'User'
      this.getUserNotification()
    }
    this.name = localStorage.getItem('name')
    
    if(localStorage.getItem("token") == ''){
      this.router.navigate(['/login'])
    }
    


  }


  logout(){
    this.router.navigate(['/login'])
    localStorage.setItem("role",'');
    // localStorage.setItem("token",'');
    localStorage.clear()
  }

  allNotification:any;


  getDoctorNotification(){
  this.service.getAllAppoientment().subscribe((res:any)=>{
        this.allNotification = res.doctors
        // console.log(this.allNotification)
        this.allNotification = this.allNotification.filter((x:any)=>{
          return x.status == 'pending'
        })
        if(this.allNotification){
          this.allNotification = this.allNotification
          console.log(this.allNotification)
          for(let i=0; i<this.allNotification.length; i++){
            this.count++
            // console.log(this.count)
          }
        }
      })
      
  }

  getUserNotification(){
    this.service.getAllAppoientment().subscribe((res:any)=>{
      this.allNotification = res.doctors
      // console.log(res.doctors)
      // console.log(this.allNotification)
      this.allNotification = this.allNotification.filter((x:any)=>{
        return x.status
      })
      if(this.allNotification){
        this.allNotification = this.allNotification
        console.log(this.allNotification)
        for(let i=0; i<this.allNotification.length; i++){
          this.count++
          // console.log(this.count)
        }
      }
    })
  }

}

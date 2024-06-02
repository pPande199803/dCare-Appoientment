import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.css']
})
export class UserNotificationComponent implements OnInit {

 getnotifi : any;
 getAllNoti:any;
 userId:any;
 token:any

  constructor(private service:SharedService, private router:Router) { }

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
      // console.log(this.getAllNoti)
      this.getAllNoti = this.getAllNoti.doctors;
      // console.log(this.getAllNoti)

      
      const notifi = this.getAllNoti.filter((x:any)=>{
        return x.userId === this.userId 
      })
      if(notifi){
        this.getnotifi = notifi
        // console.log(this.getnotifi)
      }
    })
  }

}

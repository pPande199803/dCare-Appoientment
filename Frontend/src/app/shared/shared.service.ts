import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // https://dcareappoientmentapplication.onrender.com

  constructor( private http : HttpClient ) { }

  registerUser(data:any){
    return this.http.post(' https://dcareappoientmentapplication.onrender.com/api/auth/register', data)
  }
  loginUser(data:any){
    return this.http.post(' https://dcareappoientmentapplication.onrender.com/api/auth/login', data)
  }

  getDoctor(){
    let headers = {
      "Authorization":"Bearer " + localStorage.getItem('token')
    }
    return this.http.get(' https://dcareappoientmentapplication.onrender.com/api/doctor/doctor',{headers:headers})
  }

  getAllDoctor(){
    return this.http.get(' https://dcareappoientmentapplication.onrender.com/api/doctor/all-doctor')
  }

  addDoctor(data:any){
    return this.http.post(' https://dcareappoientmentapplication.onrender.com/api/doctor/add-doctor',data)
  }

  bookingAppoientment(data:any){
    return this.http.post(' https://dcareappoientmentapplication.onrender.com/api/book-appoinment', data);
  }

  getAllAppoientment(){
    return this.http.get(' https://dcareappoientmentapplication.onrender.com/api/book-appoinment/all-appoientment')
  }

  passNotificationData(data:any){
    return this.http.post(' https://dcareappoientmentapplication.onrender.com/api/notification', data)
  }

  deleteNotification(id:any){
    return this.http.delete(' https://dcareappoientmentapplication.onrender.com/api/notification/'+id)
  }
  deleteDoctor(id:any){
    return this.http.delete(' https://dcareappoientmentapplication.onrender.com/api/doctor/'+id)
  }

  getAllNotification(){
    return this.http.get(' https://dcareappoientmentapplication.onrender.com/api/book-appoinment/all-notification')
  }

  updateStatusAppoientment(id:any, data:any){
    return this.http.put(' https://dcareappoientmentapplication.onrender.com/api/book-appoinment/appoientment/'+id, data)
  }
  deleteAppoientment(id:any){
    return this.http.delete(' https://dcareappoientmentapplication.onrender.com/api/book-appoinment/'+id)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
HttpClient

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url ='http://localhost:8000/v1';
  loggedIn = false;

  constructor(private httpClient: HttpClient) { }


  getAll(){
    return this.httpClient.get(`${this.url}/account`);
  }

  delete(id: string){
    return this.httpClient.delete(`${this.url}/account/${id}`)
  }


  checkLogin(){
    let jsonData = localStorage.getItem('login');
    if(jsonData){
      return JSON.parse(jsonData);
    }
    return false;
  }

  checkAdmin(){
    let jsonData = localStorage.getItem('login');
    if(jsonData){
      // console.log(JSON.parse(jsonData).user.admin)
      if(JSON.parse(jsonData).user.admin == true){
        //console.log(JSON.parse(jsonData).user.admin)
        return JSON.parse(jsonData);
      }
    }
    return false;
  }



  register(body: any): any{
    return this.httpClient.post<any>(`${this.url}/account/add`, body);
  }

  login(body: any): any{
    return this.httpClient.post<any>(`${this.url}/account/login`, body);
  }

  isAuthenticated(){
    const promist = new Promise<boolean> ((resolve, reject) =>{
      let jsonData = localStorage.getItem('login');
      if (jsonData){
        this.loggedIn = true;
        resolve(this.loggedIn);
      } else {
        resolve(this.loggedIn);
      }
    })
    return promist;
  }
  isAdmin(){
    const promist = new Promise<boolean> ((resolve, reject) =>{
      let jsonData = localStorage.getItem('login');
      if (jsonData){
        if(JSON.parse(jsonData).user.admin == true){
          this.loggedIn = true;
          resolve(this.loggedIn);
        }
      } else {
        resolve(this.loggedIn);
      }
    })
    return promist;
  }


  getToken(){
    let jsonData = localStorage.getItem('login')
    if (jsonData){
      return JSON.parse(jsonData).accessToken;
    }
    return false;
  }

  getRefreshToken(){
    let jsonData = localStorage.getItem('login');
    if(jsonData){
      return JSON.parse(jsonData).refreshToken;

    } return false;
  }

  refreshToken(refreshtoken: any): any{
    return this.httpClient.post<any>(`${this.url}/account/refresh`, refreshtoken)
  }
}

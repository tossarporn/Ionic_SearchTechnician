import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';

/*
  Generated class for the GetDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetDataProvider {
  host: string = "http://192.168.202.39/Final_Project/service/";   
  get_register: string = "register.php";
  get_login:string = "login.php"; 
  get_area:string ="Get_Area.php" 
  get_equipment:string = "get_equipment.php";
  insert_build_store : string= "insert_BuildStore.php"
  upload_img : string= "new_insertBuildStore.php";
  headers: any =   
    {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
  constructor(public http: HttpClient) {
    console.log('Hello GetDataProvider Provider'); 
  }

  register_provi(user,password,status){
    // alert(user+" "+pass+" "+status_cus)
    return new Promise((reslove,reject)=>{
      this.http.post(this.host+this.get_register,{
        user:user,
        password:password,
        status:status ,
      },{  
        headers:this.headers
      }).subscribe(result=>{
        reslove(result)
      },err=>{
        reject(err)
      })
    });
  }//register_provi

  login_provider(user,password){
    return new Promise ((reslov,reject)=>{
      this.http.post(this.host + this.get_login,
        {
          user:user,
          password:password,
        },
        {headers:this.headers
        }).subscribe(result=>{reslov(result)},
        err=>{
          reject(err)
        })
    });
  }//login_provider

  show_area(){
    return new Promise((reslov,reject)=>{
      this.http.get(this.host+this.get_area,{
        headers:this.headers
      })
      .subscribe(result=>{reslov(result)},
      err=>{
        reject(err)
      })
    });
  }//show_area


   
 
  show_equipment(){
    return new Promise((reslov,reject)=>{this.http.get(this.host+this.get_equipment,{headers:this.headers}).subscribe(result=>{reslov(result)},
      err=>{
          reject(err)
      })
    });
  }
creat_store(name_store,equipment,tel,time_start,time_end,cost_begin,num_house,street,distric,area,account,lat,lng,images){
  return new Promise ((reslov,reject)=>{
    this.http.post(this.host+this.insert_build_store,{
        name_store:name_store,
        equipment:equipment,
        tel:tel,
        time_start:time_start,
        time_end:time_end, 
        cost_begin:cost_begin,
        num_house:num_house,
        street:street,
        distric:distric,
        area:area,
        account:account,
        lat:lat,
        lng:lng,
        images:images
    },
      {
        headers:this.headers
    }).subscribe(result=>{
      reslov(result)},
      err=>{
        reject(err)
      })
  })
}//creat_store

// creat_img(images){
//   return new Promise((reslov,reject)=>{
//     this.http.post(this.host+this.upload_img,{
//       images:images
//     },{
//       headers:this.headers
//     }).subscribe(result=>{
//       reslov(result)
//       alert(JSON.stringify(result));
//       alert("success");
//     },
//     err=>{reject(err)
//       alert(JSON.stringify(err));
//       alert("fail");
//     })
//   })
// }



}//GetDataProvider
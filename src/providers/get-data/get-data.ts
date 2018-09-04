import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

/*
  Generated class for the GetDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetDataProvider {
  host: string = "http://10.5.6.4/Final_Project/service/";
  get_register: string = "register.php";
  get_login: string = "login.php";
  get_area: string = "Get_Area.php";
  get_equipment: string = "get_equipment.php";
  insert_build_store: string = "insert_BuildStore.php";
  upload_img: string = "new_insertBuildStore.php";
  show_TecDetail: string = "get_detailTech.php";
  guest_insert = "CustomerForRent.php";
  get_for_rentTech = "get_for_rentTech.php";
  insert_rating = "rating.php";
  get_ratings = "get_rating.php";
  get_guest_rent: string = "get_data_rent.php";
  showall_customer: string = "show_equipment_mont.php"
  count_equipment: string = "count_equipment.php";
  show_Equipment: string = "get_privete_details.php";
  register_guest: string = "guest_register.php";
  update_guest: string = "update_guest.php";
  get_detail_guest: string = "get_edit_guest.php";
  get_details_tecnician: string = "get_edit_tecnician.php";
  update_details_guest: string = "admin_update_guest.php";
  update_details_technician: string = "admin_update_tec.php";
  delete_details_tec: string = "delete_admin_tec.php";
  delete_details_guest: string = "delete_admin.guest.php";
  get_details_admin:string = "get_details_admin.php";
  update_details_admin:string ="admin_update_details.php";
  headers: any =
    {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
  constructor(public http: HttpClient) {
    // console.log('Hello GetDataProvider Provider'); 
  }

  register_provi(user, password, status) {
    return new Promise((reslove, reject) => {
      this.http.post(this.host + this.get_register, {
        user: user,
        password: password,
        status: status,
      }, {
          headers: this.headers
        }).subscribe(result => {
          reslove(result)
        }, err => {
          reject(err)
        })
    });
  }//register_provi

  login_provider(user, password, status) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.get_login,
        {
          user: user,
          password: password,
          status: status
        },
        {
          headers: this.headers
        }).subscribe(result => { reslov(result) },
        err => {
          reject(err)
        })
    });
  }//login_provider

  show_area() {
    return new Promise((reslov, reject) => {
      this.http.get(this.host + this.get_area, {
        headers: this.headers
      })
        .subscribe(result => { reslov(result) },
        err => {
          reject(err)
        })
    });
  }//show_area




  show_equipment() {
    return new Promise((reslov, reject) => {
      this.http.get(this.host + this.get_equipment, { headers: this.headers }).subscribe(result => { reslov(result) },
        err => {
          reject(err)
        })
    });
  }
  creat_store(name_store, equipment, tel, time_start, time_end, cost_begin, num_house, street, distric, area, account, lat, lng, images, tec_id) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.insert_build_store, {
        name_store: name_store,
        equipment: equipment,
        tel: tel,
        time_start: time_start,
        time_end: time_end,
        cost_begin: cost_begin,
        num_house: num_house,
        street: street,
        distric: distric,
        area: area,
        account: account,
        lat: lat,
        lng: lng,
        images: images,
        tec_id: tec_id
      },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        },
        err => {
          reject(err)
        })
    })
  }//creat_store

  showDetail_Technician(area_id, equip_id) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.show_TecDetail, {
        area_id: area_id,
        equip_id: equip_id
      },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        },
        err => {
          reject(err)
        })
    })
  }//showDetail_Technician

  builid_guest(name, last_name, tel, equipment, num_house, street, ditstric, area, date, ref_tec, ref_regis, ref_id_tec) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.guest_insert,
        {
          name_guest: name,
          last_name_guest: last_name,
          tel: tel,
          equipment: equipment,
          num_house: num_house,
          street: street,
          ditstric: ditstric,
          area: area,
          date: date,
          ref_tec: ref_tec,
          ref_regis: ref_regis,
          ref_id_tec: ref_id_tec
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//builid_guest


  GetTechnician(tec_id) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.get_for_rentTech, {
        tec_id: tec_id
      },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//GetTechnician

  rating(rating, details_tecID, guest_id, ref_id) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.insert_rating, {
        rating: rating,
        ref_tec: details_tecID,
        ref_regis: guest_id,
        ref_id: ref_id
      },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }
  get_rating(get_star) {
    // console.log('get_star',get_star);

    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.get_ratings,
        {
          ref_id: get_star
        }
        , {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    });
  }//get_rating

  get_data_rent(id_tec) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.get_guest_rent,
        {
          tec_id: id_tec
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    });
  }//get_data_rent

  get_data_equipment(Equipment, show_myDate) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.showall_customer,
        {
          ref_id_tec: Equipment,
          date_service: show_myDate
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    });
  }//get_data_equipment

  get_count_equipment(ref_id_tec, date_service, count_equipment) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.count_equipment,
        {
          ref_id_tec: ref_id_tec,
          date_service: date_service,
          count_equipment: count_equipment
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }// get_count_equipment

  show_details_equipment(ref_regis_tec) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.show_Equipment,
        {
          ref_regis_tec: ref_regis_tec
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//show_details_equipment
  guest_register(Username, Password, name, last_name, tel, num_house, street, ditstric, area, status_guest) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.register_guest,
        {
          user: Username,
          password: Password,
          status: status_guest,
          guest_name: name,
          guest_lastname: last_name,
          guest_tel: tel,
          guest_num_house: num_house,
          guest_street: street,
          guest_distric: ditstric,
          guest_area: area,
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//guest_register
  updates_guest(
    guest_id,
    guest_name,
    guest_lastname,
    guest_tel,
    guest_num_house,
    guest_street,
    guest_distric,
    guest_area,
  ) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.update_guest,
        {
          guest_id: guest_id,
          guest_name: guest_name,
          guest_lastname: guest_lastname,
          guest_tel: guest_tel,
          guest_num_house: guest_num_house,
          guest_street: guest_street,
          guest_distric: guest_distric,
          guest_area: guest_area,
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//updates_guest
  get_loop_detail_guest() {
    return new Promise((reslov, reject) => {
      this.http.get(this.host + this.get_detail_guest,
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//get_loop_detail_guest

  get_loop_details_technician() {
    return new Promise((reslov, reject) => {
      this.http.get(this.host + this.get_details_tecnician,
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }
  guest_update_details(
    id_guest, guest_name, guest_lastname, guest_tel, guest_num_house,
    guest_street, guest_distric, guest_area, username, password
  ) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.update_details_guest,
        {
          guest_id: id_guest,
          guest_name: guest_name,
          guest_lastname: guest_lastname,
          guest_tel: guest_tel,
          guest_num_house: guest_num_house,
          guest_street: guest_street,
          guest_distric: guest_distric,
          guest_area: guest_area,
          guest_username: username,
          guest_password: password
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//guest_update_details

  technicain_update_details(
    ref_id_tec,
    ref_area_name,
    ref_type_equipment,
    name_store,
    tel,
    account,
    time_start,
    time_end,
    num_house,
    cost_begin,
    distric,
    street
  ) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.update_details_technician,
        {
          ref_id_tec: ref_id_tec,
          ref_area_name: ref_area_name,
          ref_type_equipment: ref_type_equipment,
          name_store: name_store,
          tel: tel,
          account: account,
          time_start: time_start,
          time_end: time_end,
          num_house: num_house,
          cost_begin: cost_begin,
          distric: distric,
          street: street
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//technicain_update_details

  delete_tec(ref_tec) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.delete_details_tec,
        {
          ref_regis_tec: ref_tec
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })

  }//delect_tec

  delete_guest(loop_id_guest) {
    return new Promise((reslov, reject) => {
      this.http.post(this.host + this.delete_details_guest,
        {
          id_guest: loop_id_guest
        },
        {
          headers: this.headers
        }).subscribe(result => {
          reslov(result)
        })
      err => {
        reject(err)
      }
    })
  }//delete_guest

details_admin(){
  return new Promise((reslov, reject) => {
    this.http.get(this.host + this.get_details_admin,
      {
        headers: this.headers
      }).subscribe(result => {
        reslov(result)
      })
    err => {
      reject(err)
    }
  })
}//details_admin

update_admin(id,user,password,tel_admin,account_admin,num_houst_admin,street_admin,distric_admin,area_admin){
  return new Promise((reslov, reject) => {
    this.http.post(this.host + this.update_details_admin,
      {
        id_admin:id,
        username: user,
        password: password,
        tel: tel_admin,
        account:account_admin ,
        num_houst:num_houst_admin ,
        street:street_admin ,
        distric:distric_admin ,
        area:area_admin
      },
      {
        headers: this.headers
      }).subscribe(result => {
        reslov(result)
      })
    err => {
      reject(err)
    }
  })
}



}//GetDataProvider
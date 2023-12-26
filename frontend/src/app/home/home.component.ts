import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  customers : any[] = [];
  currentCustomerId = "";
  firstname : string = "";
  lastname : string = "";
  email : string = "";

  constructor(private route:Router,private http:HttpClient){
    this.getAllCustomers();
  }

  add(){
    this.route.navigateByUrl("/add-customer")
  }

  delete(customer:any){
      this.http.delete("http://localhost:8080/deletecustomers/"+customer._id).subscribe(()=>{
        console.log(customer);
        alert("Record Deleted");
        this.getAllCustomers();
      });
  }

  getAllCustomers(){
      this.http.get('http://localhost:8080/allcustomers').subscribe(
        (result:any)=>{
          console.log(result);
          this.customers = result;
        }
      );
  }

  reToUpdate(customer:any){
    let id = customer._id; 
    this.route.navigateByUrl('/update-customer',{state:{
      customer_id:id
    }});
  }
}

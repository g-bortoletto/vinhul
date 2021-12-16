import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wine } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wines!:Wine[];
  
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
   this.listWines();
  }

  listWines(){
   this.http.get<Wine[]>(`${environment.backendUrl}/wine/getwine`,{
   }).subscribe((value:any)=>{
    this.wines = value.wines;
    console.log(this.wines);
    return this.wines;
   });  
  }

}

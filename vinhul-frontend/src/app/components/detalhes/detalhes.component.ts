import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wine } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
})
export class DetalhesComponent implements OnInit, OnDestroy {
  id!: string;
  private sub: any;

  wine!: Wine;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.http
        .get<Wine>(`${environment.backendUrl}/wine/getsingle/${this.id}`, {})
        .subscribe((value: any) => {
          this.wine = value.item;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

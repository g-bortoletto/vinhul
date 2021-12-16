import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
})
export class DetalhesComponent implements OnInit, OnDestroy {
  id!: string;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      // this.http
      //   .get<Wine[]>(`${environment.backendUrl}/wine/getwine`, {})
      //   .subscribe((value) => {
      //     return value;
      //   });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

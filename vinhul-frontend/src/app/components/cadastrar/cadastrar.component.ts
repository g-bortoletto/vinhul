import { Component, OnInit } from '@angular/core';
import { CadastrarService } from 'src/app/services/cadastrar.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  name!: string;
  origin!: string;
  type!: string;
  grapetype!: string;
  foodharmony!: string;

  constructor(private cadastrarService: CadastrarService) {}

  ngOnInit(): void {}

  onCadastrar(): void {
    this.cadastrarService.cadastraVinho(
      this.name,
      this.origin,
      this.type,
      this.grapetype,
      this.foodharmony
    );
  }
}

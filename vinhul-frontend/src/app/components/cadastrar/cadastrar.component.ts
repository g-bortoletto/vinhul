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
  image!: string;

  constructor(private cadastrarService: CadastrarService) {}

  ngOnInit(): void {}

  handleFoto(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        this.image = reader.result as string;
      } else {
        console.log('Ocorreu um erro ao carregar a foto');
      }
    };
  }

  onCadastrar(): void {
    this.cadastrarService.cadastraVinho(
      this.name,
      this.origin,
      this.type,
      this.grapetype,
      this.foodharmony,
      this.image
    );
  }
}

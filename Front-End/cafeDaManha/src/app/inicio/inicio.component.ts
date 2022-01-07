import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  usuario: Usuario = new Usuario();
  idUser = environment.id;
  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private postagemService: PostagemService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert("sua seção expirou, faça login novamente.")
      this.router.navigate(['/entrar'])
    }
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=> {
      this.listaPostagens = resp

    })
  }

  publicar(){
    this.usuario.id = this.idUser;
    this.postagem.usuario = this.usuario;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        alert('Postagem feita com sucesso!');
        this.postagem = new Postagem();
        this.getAllPostagens();
      });
  }
}

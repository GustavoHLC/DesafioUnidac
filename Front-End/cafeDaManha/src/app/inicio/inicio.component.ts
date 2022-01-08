import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  listaPostagem: Postagem[];
  usuario: Usuario = new Usuario();
  idUsuario = environment.id;


  constructor(
    private router: Router,
    private authService: AuthService,
    private postagemService: PostagemService,
    private auth: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.alertas.showAlertDanger("sua seção expirou, faça login novamente.")
      this.router.navigate(['/entrar'])
    }
    this.auth.refreshToken()
    this.buscarPostagens()
  }

  buscarPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp
      console.log(this.listaPostagem)
    })
  }

  findUsuarioById(){
    this.auth.getUsuarioById(this.idUsuario).subscribe((resp: Usuario)=> {
      this.usuario = resp
    })
  }


  publicar(){
    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem feita com sucesso!');
        this.postagem = new Postagem();
        this.buscarPostagens();
      });
  }
}

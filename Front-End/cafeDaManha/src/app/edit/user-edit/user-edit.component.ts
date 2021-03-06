import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertDanger('sua seção expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

}
confirmSenha(event: any) {
  this.confirmarSenha = event.target.value
}

findByIdUser(id: number){
  this.authService.getUsuarioById(id).subscribe((resp: Usuario)=> {
    this.usuario = resp
  })
}

atualizar(){
  console.log(this.usuario)
  if(this.usuario.senha != this.confirmarSenha){
    alert('As senhas são diferentes!')
  } else {this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
    this.usuario = resp
    this.router.navigate(['/inicio'])
    this.alertas.showAlertInfo('Usúario atualizado com sucesso, faça o login novamente.')
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
    this.router.navigate(['/entrar'])
  })
}
}

}

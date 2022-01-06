import { Postagem } from "./Postagem"

export class Usuario{
  public id: number
  public nome: string
  public cpf: string
  public senha: string
  public foto: string
  public postagem: Postagem
}

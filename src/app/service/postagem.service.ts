import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

   token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){   //verificar necessidade
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://blogpessoaljulio.herokuapp.com/postagens',this.token)
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://blogpessoaljulio.herokuapp.com/postagens/${id}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://blogpessoaljulio.herokuapp.com/postagens/salvar', postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://blogpessoaljulio.herokuapp.com/postagens', postagem, this.token)
  }

  deletePostagem(id: number) {
    let params = new HttpParams()
    .set ('id', id)
    return this.http.delete(`https://blogpessoaljulio.herokuapp.com/postagens?${params}`, this.token)
  }

}

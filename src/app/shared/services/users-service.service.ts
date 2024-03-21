import { Injectable } from '@angular/core';
import { IUsers } from '../interfaces/iusers';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUsers[] = [];
  user!: IUsers;
  allUsers: IUsers[] = [];

  constructor(private http: HttpClient) {}

  addUser(username: string, password: string) {
    this.getLastid().subscribe((lastId) => {
      this.user = {
        id: lastId,
        username: username,
        password: password,
      };
      this.http.post<IUsers>(environment.usersBaseLink, this.user).subscribe();
    });
  }

  getLastid(): Observable<string> {
    return new Observable<string>((ObLastId) => {
      this.getAllUsers().subscribe((users) => {
        let lastId: number = -1;
        for (let user of users) {
          if (Number(user.id) > lastId) {
            lastId = Number(user.id);
          }
        }
        ObLastId.next(`${lastId + 1}`);
        ObLastId.complete();
      });
    });
  }

  checkUser(username: string): Observable<string> {
    let userID: number = -1;
    return new Observable<string>((isThere) => {
      this.getAllUsers().subscribe((users) => {
        for (let user of users) {
          if (user.username === username) {
            userID = Number(user.id);
            break;
          }
        }
        isThere.next(`${userID}`);
        isThere.complete();
      });
    });
  }

  getAllUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(environment.usersBaseLink);
  }

  getUser(id: string): Observable<IUsers> {
    return this.http.get<IUsers>(`${environment.usersBaseLink}/${id}`);
  }
}

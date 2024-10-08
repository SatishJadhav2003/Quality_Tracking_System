import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuth } from '../store/Authentication/auth.models';
import { User } from '../shared/model/user.model';
import { ApirequestService } from '../core/services/apirequest.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {

    apiRequest = inject(ApirequestService)
    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */
    getAll():Observable<User[]> {
        return this.apiRequest.get('/User')
        // return this.http.get<UserListModel[]>(`api/users`);
    }

    

    addUser(data:User):Observable<any>
    {
       return this.apiRequest.post('/User',data)
    }
}

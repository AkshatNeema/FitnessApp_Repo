import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class AutherService{
    private usersName :String='';

    setUsersName(usersName:String){
        this.usersName = usersName
    }
    getUsersName(){
        return this.usersName
    }
}
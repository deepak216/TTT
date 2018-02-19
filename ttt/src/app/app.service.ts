import {Injectable} from '@angular/core'
import {Http,Headers,RequestOptions} from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable()

export class DataService{
    result:any;
    constructor(private _http:Http){

    }
    getdata(n:number){
        return this._http.get('http://localhost:3000/api/data?n='+n)
        .map(result=>this.result=result.json())
    }
}
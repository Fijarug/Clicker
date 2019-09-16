import { Injectable } from '@angular/core'

@Injectable()
export class ItensDrop {

    public id:number;
		public nome:string;
		public chanceDrop:number;
    public quantidade:number;
    public imagem:string;

    constructor() {
        
    }
}
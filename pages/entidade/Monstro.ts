import { Injectable } from '@angular/core'
import { ItensDrop } from '../entidade/ItensDrop';

@Injectable()
export class Monstro {

    public id:number;
		public nome:string;
		public vida:number;
    public imagem:string;
    public drops:Array<ItensDrop> = new Array<ItensDrop>();

    constructor() {
        
    }
}
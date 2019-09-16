import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItensDrop } from '../entidade/ItensDrop';
import { AlertController } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private dropAgora:string;
  public golpeRandom:number;
	public health:number;
  public forca:number;
	public vidaAtual:number;
	public vidaRes:number;
	public vidaRestante:string;
	public golpe:boolean;
	public itens:boolean;
  private mostrarMochila:boolean;
	public chanceDropar:number;
	public porcentagemDrop:number;
	public mochila:Array<ItensDrop> = new Array<ItensDrop>();

	private itensDrop: ItensDrop = new ItensDrop();

	public vidaMax:number = 300;
	public lista:Array<ItensDrop> = new Array<ItensDrop>();

	constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

	}

  ionViewDidLoad() {
    this.adicionandoLista();
		this.vidaAtual = this.vidaMax;
		this.vidaRestante = "100";
    this.forca = 100;
  }

	public baterNoMonstro(): void{
    this.golpeRandom = Math.floor(Math.random() * (4-1) + 1);
		this.golpe = true;
    if (this.vidaAtual <= 0 ){
      this.vidaAtual = 0;
      this.dropDeItem();
    } else {
      this.vidaAtual -= this.forca;
 		};
 		if (this.vidaAtual <= 0 ){
      this.vidaAtual = 0;
      this.dropDeItem();
    }
    setTimeout(() => this.aparecerGolpe(), 200);
		setTimeout(() => this.gerarDano(this.vidaAtual, this.vidaMax), 200);
  	}

public exibirMochila(): void{
  this.mostrarMochila = !this.mostrarMochila;
  this.organizarMochila();
}

  public botao(): void{
		this.itens = !this.itens;
	}

  public aparecerGolpe(): void{
		this.golpe = false;
	}

	public gerarDano(vidaAtual:number, vidaMax:number):void{
		this.vidaRes = (this.vidaAtual*100)/this.vidaMax;
		this.vidaRestante = this.vidaRes.toFixed(2);
	}
	
	public numeroRandom(min, max): number {  
	  return this.chanceDropar = Math.random() * (max - min) + min;
	}

	public dropDeItem(){
  this.dropAgora = "";
		for (var i = 0; i < this.lista.length; i++) {
			this.numeroRandom(0,100)
			if (this.lista[i].chanceDrop >= this.chanceDropar){
				this.mochila.push(this.lista[i]);
        this.dropAgora += this.lista[i].nome + ", ";
			}
		}

		if (this.dropAgora) {
			let alert = this.alertCtrl.create({
			    title: 'Drop',
				subTitle: "Dropou " + this.dropAgora.substr(0, this.dropAgora.length-2),
				buttons: ['Okay']
			});
			alert.present();
		}

		setTimeout(() => this.vidaAtual = this.vidaMax, 500);
		setTimeout(() => this.vidaRestante = "100", 500);
	}

public lista2:Array<ItensDrop> = new Array<ItensDrop>();
  public organizarMochila():void{
    this.lista2 = new Array<ItensDrop>();
    function somar(obj) {
      var i:number;
      i++;
        if(obj.nome === this.lista2.get[i].nome){
          this.itensDrop = new ItensDrop;
          this.itensDrop.nome = obj.nome;
          this.itensDrop.quantidade = this.lista2.get[i].quantidade+1;
          this.lista2.push(this.itensDrop);
        } else{
          this.itensDrop = new ItensDrop;
          this.itensDrop.nome = obj.nome;
          this.itensDrop.quantidade = this.lista2.get[i].quantidade+1;
          this.lista2.push(this.itensDrop);
        }
    }

    this.mochila.forEach(somar);

    console.log(this.lista2);

  }

	public adicionandoLista(){
    this.itensDrop = new ItensDrop;
		this.itensDrop.id = 1;
		this.itensDrop.nome = "Coroa de Faraó";
		this.itensDrop.chanceDrop = 30;
    this.itensDrop.imagem = "https://github.com/Fijarug/Clicker/blob/master/src/images/coroaFarao.png?raw=true";
    this.lista.push(this.itensDrop);
    this.itensDrop = new ItensDrop;
		this.itensDrop.id = 2;
		this.itensDrop.nome = "Anel";
		this.itensDrop.chanceDrop = 50;
    this.itensDrop.imagem = "https://github.com/Fijarug/Clicker/blob/master/src/images/anel.png?raw=true";
		this.lista.push(this.itensDrop);
	}

public monstro:string = "https://github.com/Fijarug/Clicker/blob/master/src/images/lobo.png?raw=true";

public pow:string = "https://github.com/Fijarug/Clicker/blob/master/src/images/golpe.png?raw=true";
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItensDrop } from '../entidade/ItensDrop';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private dropAgora:string;
  public golpeRandom:number;
	public health:number;
	public vidaAtual:number;
	public vidaRes:number;
	public vidaRestante:string;
	public golpe:boolean;
	public itens:boolean;
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
  }

	public baterNoMonstro(): void{
		this.golpe = true;
    if (this.vidaAtual <= 0 ){
      this.vidaAtual = 0;
      this.dropDeItem();
    } else {
      this.vidaAtual -= 10;
 		};
 		if (this.vidaAtual <= 0 ){
      this.vidaAtual = 0;
      this.dropDeItem();
    }
    setTimeout(() => this.aparecerGolpe(), 200);
		setTimeout(() => this.gerarDano(this.vidaAtual, this.vidaMax), 200);
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

		//----------função para guardar os itens dropado

		setTimeout(() => this.vidaAtual = this.vidaMax, 500);
		setTimeout(() => this.vidaRestante = "100", 500);
		this.mochila = new Array<ItensDrop>();
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
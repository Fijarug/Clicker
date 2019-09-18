import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItensDrop } from '../entidade/ItensDrop';
import { Monstro } from '../entidade/Monstro';
import { AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private dropAgora:string;
  public posicaoGolpe:number;
  public forca:number;
	public vidaAtual:number;
	public vidaRes:number;
	public vidaRestante:string;
	public golpe:boolean;
	public itens:boolean;
  public mostrarMochila:boolean;
	public numRandomChanceDropar:number;
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
    this.posicaoGolpe = Math.floor(Math.random() * (4-1) + 1);
		this.golpe = true;
    if (this.vidaAtual <= 0 ){
      this.vidaAtual = 0;
      this.dropDeItem();
    } else {
      this.vidaAtual -= this.forca;
 		};
    setTimeout(() => this.aparecerGolpe(), 200);
		setTimeout(() => this.gerarDano(this.vidaAtual, this.vidaMax), 200);
  }

public exibirMochila(): void{
  //this.mostrarMochila = !this.mostrarMochila;
  
  this.navCtrl.push(AboutPage, {
  mochila: this.mochila
 });
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
	  return this.numRandomChanceDropar = Math.random() * (max - min) + min;
	}

	public dropDeItem(){
  this.dropAgora = "";
		for (var i = 0; i < this.lista.length; i++) {
			this.numeroRandom(0,100)
			if (this.lista[i].chanceDrop >= this.numRandomChanceDropar){
        if(!this.mochila.includes(this.lista[i])){
          this.lista[i].quantidade = 1;
          this.mochila.push(this.lista[i]);
          this.dropAgora += this.lista[i].nome + ", ";
        } else {
          for (var x = 0; x < this.lista.length; x++) {
            if(this.lista[i] === this.mochila[x]){
              this.mochila[x].quantidade = this.mochila[x].quantidade + 1
              this.dropAgora += this.lista[i].nome + ", ";
            }
          }
        }
				
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

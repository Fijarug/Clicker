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
  public grupoMonstro:Array<Monstro> = new Array<Monstro>();

  public monstro: Monstro = new Monstro();
	private itensDrop: ItensDrop = new ItensDrop();

  public levelMonstro:number = 0;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

	}

  ionViewDidLoad() {
    this.inicializarMonstro();
		this.vidaAtual = this.monstro.vida;
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
    setTimeout(() => this.gerarDano(this.vidaAtual, this.grupoMonstro[this.levelMonstro].vida), 200);
  }

public exibirMochila(): void{
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
		this.vidaRes = (this.vidaAtual*100)/this.grupoMonstro[this.levelMonstro].vida;
		this.vidaRestante = this.vidaRes.toFixed(2);
	}
	
	public numeroRandom(min, max): number {  
	  return this.numRandomChanceDropar = Math.random() * (max - min) + min;
	}

	public dropDeItem(){
  this.dropAgora = "";
  
		for (var i = 0; i < this.grupoMonstro[this.levelMonstro].drops.length; i++) {
			this.numeroRandom(0,100)
			if (this.grupoMonstro[this.levelMonstro].drops[i].chanceDrop >= this.numRandomChanceDropar){
        if(!this.mochila.includes(this.grupoMonstro[this.levelMonstro].drops[i])){
          this.grupoMonstro[this.levelMonstro].drops[i].quantidade = 1;
          this.mochila.push(this.grupoMonstro[this.levelMonstro].drops[i]);
          this.dropAgora += this.grupoMonstro[this.levelMonstro].drops[i].nome + ", ";
        } else {
          for (var x = 0; x < this.grupoMonstro[this.levelMonstro].drops.length; x++) {
            if(this.grupoMonstro[this.levelMonstro].drops[i] === this.mochila[x]){
              this.mochila[x].quantidade = this.mochila[x].quantidade + 1
              this.dropAgora += this.grupoMonstro[this.levelMonstro].drops[i].nome + ", ";
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

    if(this.grupoMonstro.length-1 > this.levelMonstro){
      this.levelMonstro = this.levelMonstro + 1; 
    } else{
      let alert = this.alertCtrl.create({
			    title: 'VENCEDOR',
				subTitle: "Matou todos os lobisomens!!!",
				buttons: ['Uhuuuul']
			});
			alert.present();
    }

		setTimeout(() => this.vidaAtual = this.grupoMonstro[this.levelMonstro].vida, 500);
		setTimeout(() => this.vidaRestante = "100", 500);
    this.proximoMonstro();
	}

  public proximoMonstro(){
    this.monstro = this.grupoMonstro[this.levelMonstro];
  }

	public adicionandoLista(): Array<ItensDrop>{
    var lista:Array<ItensDrop> = new Array<ItensDrop>();
    this.itensDrop = new ItensDrop;
		this.itensDrop.id = 1;
		this.itensDrop.nome = "Coroa de Faraó";
		this.itensDrop.chanceDrop = 30;
    this.itensDrop.imagem = "https://github.com/Fijarug/Clicker/blob/master/src/images/coroaFarao.png?raw=true";
    lista.push(this.itensDrop);
    this.itensDrop = new ItensDrop;
		this.itensDrop.id = 2;
		this.itensDrop.nome = "Anel";
		this.itensDrop.chanceDrop = 50;
    this.itensDrop.imagem = "https://github.com/Fijarug/Clicker/blob/master/src/images/anel.png?raw=true";
		lista.push(this.itensDrop);
    return lista;
	}

  public inicializarMonstro(){
		for (var i = 0; i < 5; i++) {
      this.monstro = new Monstro();
      this.monstro.nome = "Lobisomen " + i;
      this.monstro.vida = 300;
      this.monstro.drops = this.adicionandoLista();
      this.monstro.imagem = "https://github.com/Fijarug/Clicker/blob/master/src/images/lobo.png?raw=true";
      this.grupoMonstro.push(this.monstro);
    }
    this.monstro = this.grupoMonstro[0];
  }

public pow:string = "https://github.com/Fijarug/Clicker/blob/master/src/images/golpe.png?raw=true";
}

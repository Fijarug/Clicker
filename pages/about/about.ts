import { Component } from '@angular/core';
import { ItensDrop } from '../entidade/ItensDrop';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public mochila:Array<ItensDrop> = new Array<ItensDrop>();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mochila = navParams.get('mochila');
  }

}

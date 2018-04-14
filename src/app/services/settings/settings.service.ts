import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.chargeAjsutes();
  }

  saveAjsutes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  chargeAjsutes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

      this.aplicaTema(this.ajustes.tema);
    } else {
      this.aplicaTema(this.ajustes.tema);
    }
  }

  aplicaTema(tema: string) {

    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.saveAjsutes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
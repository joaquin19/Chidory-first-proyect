import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
  }

  cambiarColor(tema: string, link: any) {
    this.aplicaCheck(link);

    this._ajustes.aplicaTema(tema);
  }

  aplicaCheck(link: any) {

    let selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  putCheck() {
    let selectors: any = document.getElementsByClassName('selector');

    let tema =  this._ajustes.ajustes.tema;

    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}

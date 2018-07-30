import { Component, OnInit } from '@angular/core';
import { resolve, reject } from '../../../../node_modules/@types/q';
import { error } from 'util';
import { promise } from '../../../../node_modules/protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.countTree().then(
      () => console.log('Terminado')
    )
    .catch( error => console.error('Error en la promesa', error));
   }

  ngOnInit() {
  }

  countTree(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}

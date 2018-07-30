import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { log } from 'util';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.retrunObervable()
    .subscribe(
      number => console.log('Subs', number),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar!!');
    this.subscription.unsubscribe();
  }

  retrunObervable(): Observable<any> {
    return new Observable( observer => {

      let contador = 0;
      let intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Help!');
        // }
      }, 1000);
    }).pipe(
      map( resp =>  resp.valor),
      filter(( valor, index) => {
        // console.log('Filter', valor, index);
        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }

}

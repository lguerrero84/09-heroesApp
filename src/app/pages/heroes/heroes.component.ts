import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel [] = [];
  cargando = false;

  constructor(private heroeServices: HeroesService) { }

  ngOnInit() {
       this.cargando = true;
       this.heroeServices.getHeroes().subscribe( data => {
         this.heroes = data;
         this.cargando = false;
       } );

  }

  borrarHeroe( heroe: HeroeModel , i: number){
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${ heroe.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

        if( resp.value){
          this.heroeServices.borrarHeroe( heroe.id).subscribe();
          this.heroes.splice(i , 1);
        }

    })
   
  }


}

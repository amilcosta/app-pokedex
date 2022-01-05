import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder} from '@angular/forms';

/** Services */
import { PokemonSearchService } from '../../services/pokemon-search.service';

@Component({
    selector: 'app-lst-pokemon-search',
    templateUrl: './lst-pokemon-search.component.html',
    styleUrls: ['./lst-pokemon-search.component.css']
})
export class LstPokemonSearchComponent implements OnInit {
    public pokemonFiltro='';
    public listadoPokemons: Array<any>=[];
    public loading: boolean = false;
    public checkPokemon: boolean = false;
    public aditionalInfo: boolean = false;
    public error: boolean = false;
    public typesPoke: Array<any>= [];
    public abilities: Array<any>= [];
    public stats: Array<any>= [];
    public mensajeError: string = '';
    Form: FormGroup;

    constructor(private router: Router,private formBuilder: FormBuilder,private _PokemonsService: PokemonSearchService) {
        this.Form = this.formBuilder.group({
            filterPoke: ['']
        });
    }

    ngOnInit(): void {
        this.buildFormBusqueda();
    }

    buildFormBusqueda(){
        this.Form = this.formBuilder.group({
            filterPoke: ['']
        });
    }
    cargarPokemonFiltro(event: any){ 
        this.pokemonFiltro =this.Form.controls['filterPoke'].value;
        this.cargarPokemon()
    }

    cargarPokemon(){
        this._PokemonsService.getBPokemon(this.pokemonFiltro).subscribe(data=>{
            //console.log(data);
            if(data.status==200){
                this.error = false;
                this.listadoPokemons.push(data.body);
                this.typesPoke = data.body.tipo;
                this.abilities = data.body.habilidades;
                this.stats = data.body.descripcion.stats;
                this.loading = false;
                this.checkPokemon = true;

            }else{
                console.log('error')
            }
        }, err => {
            this.error= true;
            console.log(err)
            if(err.status==404)
                this.mensajeError = 'Debe introducir un pokemon o identificador de pokemon';
        });
    }

    Volver(){
        this.router.navigate(['principal']);
    }

    PokeDetail(){
        console.log('Data obtenida: ',this.listadoPokemons)
        this.aditionalInfo = true;
    }

}

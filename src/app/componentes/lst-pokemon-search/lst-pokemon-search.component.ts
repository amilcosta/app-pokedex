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
    public evolutions: Array<any>=[];
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
        this.listadoPokemons = [];
        this.abilities = [];
        this.stats = [];
        this.evolutions = [];
        this.aditionalInfo = false;
        this.pokemonFiltro =this.Form.controls['filterPoke'].value;
        this.cargarPokemon()
    }

    cargarPokemon(){
        this._PokemonsService.getPokemon(this.pokemonFiltro).subscribe(data=>{
            //console.log(data);
            if(data.status==200){
                this.error = false;
                this.listadoPokemons.push(data.body);
                this.typesPoke = data.body.tipo;
                this.abilities = data.body.habilidades;
                this.stats = data.body.descripcion.stats;
                this.loading = false;
                this.checkPokemon = true;
                let datevol = data.body.evoluciones[0].evolves_to;
                if(datevol.length>0){
                    let pokevol= datevol[0].species.name;
                    this.evolutions.push({ name: pokevol})
                    if(datevol[0].evolves_to.length>0){
                        pokevol= datevol[0].evolves_to[0].species.name
                        this.evolutions.push({ name: pokevol})
                    }
                }

            }else{
                console.log('error')
            }
        }, err => {
            this.error= true;
            console.log(err)
            if(err.status==404)
                this.mensajeError = 'Debe introducir un pokemon o identificador de pokemon';
            
            if(err.status==0)
            this.mensajeError = 'Intenta buscar de nuevo'
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

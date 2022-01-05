import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder} from '@angular/forms';

/** Services */
import { PokemonSearchService } from '../../services/pokemon-search.service';

@Component({
    selector: 'app-lst-ability-search',
    templateUrl: './lst-ability-search.component.html',
    styleUrls: ['./lst-ability-search.component.css']
})
export class LstAbilitySearchComponent implements OnInit {
    public abilityPokemons: Array<any>=[];
    public abilityFiltro='';
    public error: boolean = false;
    public mensajeError: string = '';
    public pokemons: Array<any>=[];
    public checkAbility: boolean = false;

    Form: FormGroup;


    constructor(private router: Router,private formBuilder: FormBuilder,private _PokemonsService: PokemonSearchService) { 
        this.Form = this.formBuilder.group({
            filterAbility: ['']
        });
    }

    ngOnInit(): void {

    }

    buildFormBusqueda(){
        this.Form = this.formBuilder.group({
            filterAbility: ['']
        });
    }

    cargarAbilityFiltro(event: any){ 
        this.abilityPokemons = [];
        this.checkAbility = false;
        this.abilityFiltro =this.Form.controls['filterAbility'].value;
        this.cargarAbility()
    }

    cargarAbility(){
        this._PokemonsService.getAbility(this.abilityFiltro).subscribe(data=>{
            if(data.status==200){
                this.error = false;
                this.abilityPokemons.push(data.body);
                this.pokemons = data.body.pokemon;
                this.checkAbility = true;
            }
        }, err => {
            this.error= true;
            if(err.status==404)
                this.mensajeError = 'Debe introducir un identificador de Habilidad';
        });
    }

    Volver(){
        this.router.navigate(['principal']);
    }

}

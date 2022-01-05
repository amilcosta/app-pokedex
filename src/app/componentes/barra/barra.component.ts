import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-barra',
    templateUrl: './barra.component.html',
    styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {
    ruta: string;

    constructor(private router: Router) {
        this.ruta = '';
     }

    ngOnInit(): void {
        this.ruta = '/principal';
    }

    Principal(){
        this.router.navigate(['principal']);
    }

}

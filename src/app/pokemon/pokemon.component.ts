import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemonList : [];
  displayedColumns: string[] = ['name', 'number', 'type', 'height' , 'weight', 'weakness', 'next_evolution'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
   
    this.pokemonService.getPokemonData().subscribe(data => {
      this.pokemonList = data['pokemon'];
      this.dataSource = new MatTableDataSource(this.pokemonList);
      this.dataSource.paginator = this.paginator;
      this.sortByName();
    });
  }

  sortByName() {
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'name', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

}

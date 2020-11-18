import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { PeopleInterface } from '../../interfaces/people.interface';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  loadPeople = false;

  people: PeopleInterface[] = [];

  constructor( private peopleService: PeopleService ){  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.getPeople();
  }

  // tslint:disable-next-line: typedef
  getPeople(){
    this.loadPeople = true;
    // tslint:disable-next-line: no-unused-expression
    this.peopleService.getPeople().subscribe( (resp: any) => {
      this.people = resp[0].data;
      this.loadPeople = false;
    });
  }

}

import { Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { PeopleInterface, FrequencyTable } from '../../interfaces/people.interface';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent {

  people: PeopleInterface[] = [];
  frequency: FrequencyTable[] = [];
  loadFrequency = false;

  constructor( private peopleService: PeopleService ){  }

  // Get data People from PeopleService and return as a Pomise
  getPeople(): Promise<PeopleInterface[]>{

    return new Promise<PeopleInterface[]>( (resolve, reject) => {

      this.peopleService.getPeople()
          .subscribe( (resp: any) => {
            this.people = resp[0].data;
            resolve(this.people);
          },
          err => reject(err) );

    });
  }

  // tslint:disable-next-line: typedef
  async getFrequency(){
    // set load frequency true to search data
    this.loadFrequency = true;
    // Get data people from a Promise and set it
    const data = await this.getPeople();

    // array of characters
    const characters = await this.getChars(data);
    // array of repetitions for each character
    const countChars = await this.countChars(characters, data);
    // join all the characters with thier own counts
    const table = await this.joinCharsAndCounts(characters, countChars);

    // set load frequency false to display data
    this.loadFrequency = false;

  }

  // tslint:disable-next-line: typedef
  joinCharsAndCounts(chars: string[], counts: number[]): Promise<FrequencyTable[]>{

    return new Promise<FrequencyTable[]>( (resolve) => {
      for ( let i = 0; i <= chars.length - 1; i++){
        const freq = {
          charName: chars[i],
          count: counts[i]
        };
        this.frequency.push(freq);
      }
      resolve(this.frequency);
    });

  }

  // Count characters inside data people
  // tslint:disable-next-line: typedef
  countChars(chars: string[], data: PeopleInterface[] = []): Promise<number[]>{
    // array to save all number of each character
    const countChars: number[] = [];

    return new Promise<number[]>( (resolve) => {
      // For loop to get characters
      for (const char of chars){
        let countC = 0;
        // For loop to get email from data people
        for ( let i = 0; i <= data.length - 1; i++){
          // set email from data people
          const email = data[i].email_address;

          // For loop to get character from email
          for (const e of email){

            // if character exist, increase constant "countC"
            if (e.indexOf(char.toLowerCase()) === 0){
              countC++;
            }

          }
        }
        // push countable on an array
        countChars.push(countC);
      }
      resolve(countChars);
    });

  }

  // get characters from data people
  // tslint:disable-next-line: typedef
  getChars(data = []): Promise<string[]>{
    // array to save all characters
    const characters: string[] = [];

    return new Promise<string[]>( (resolve) => {
      // For loop to get emails from data people
      for (let i = 0; i <= data.length - 1 ; i++){
        // set email address to search characters
        let email = data[i].email_address;
        // each space character is being replaced, character by
        // character, with the empty string
        email = email.replace(/\s/g, '');

        // For loop to get character from email
        for (const e of email){
          // if character exist, push character into characters array
          if (characters.indexOf(e.toLowerCase()) === -1){
            characters.push(e);
          }
        }
      }
      resolve(characters);
    });
  }

}

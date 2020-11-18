import { Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { PeopleInterface, SimilarityTable } from '../../interfaces/people.interface';


@Component({
  selector: 'app-similarity',
  templateUrl: './similarity.component.html',
  styleUrls: ['./similarity.component.css']
})
export class SimilarityComponent {

  loadSimilarity = false;
  people: PeopleInterface[] = [];
  similarityTable: SimilarityTable[] = [];

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
  async getSimilarity(){
    // set load frequency true to search data
    this.loadSimilarity = true;
    // Get data people from a Promise and set it
    const dataPeople = await this.getPeople();
    const emails = await this.getAllEmails(dataPeople);
    const emailList = await this.compareEmails(dataPeople, emails);

    this.similarityTable = emailList;
    // set load frequency false to display data
    this.loadSimilarity = false;
  }

  // get emails from data people
  // tslint:disable-next-line: typedef
  getAllEmails(data = []): Promise<string[]>{
    const emailList: string[] = [];

    return new Promise<string[]>( (resolve) => {
      // For loop to get emails from data people
      for (let i = 0; i <= data.length - 1 ; i++){
        // set email address to search characters
        let email = data[i].email_address;
        // each space character is being replaced, character by
        // character, with the empty string
        email = email.replace(/\s/g, '');
        emailList.push(email);
      }
      resolve(emailList);
    });
  }

  // get emails from data people
  // tslint:disable-next-line: typedef
  compareEmails(data = [], emails = []): Promise<SimilarityTable[]>{
    const similarEmailList: SimilarityTable[] = [];

    return new Promise<SimilarityTable[]>( (resolve) => {
      // For loop to get emails from data people
      for (let i = 0; i <= data.length - 1 ; i++){
        // set email address to search characters
        let emailToCompare = data[i].email_address;
        // each space character is being replaced, character by
        // character, with the empty string
        emailToCompare = emailToCompare.replace(/\s/g, '');

        // loop to compare emails
        for (const email of emails){
          const areSimilar = this.similarity(emailToCompare, email);
          // if email to compare is mayor 0.80,
          // and less than 1
          // push into the similarEmailList
          if (areSimilar > 0.80 && areSimilar < 1){
            const isSimilar = {
              email1: emailToCompare,
              email2: email
            };
            similarEmailList.push(isSimilar);
          }
        }
      }
      resolve(similarEmailList);
    });
  }

  // ----------------------------------------------------------------------------------------- //
  // ----------------------------------Start Section------------------------------------------ //
  // ----------------------------------------------------------------------------------------- //
  // How to compare two strings with similarity Algorithm
  // https://medium.com/@sumn2u/string-similarity-comparision-in-js-with-examples-4bae35f13968
  // Example on stackoverflow
  // https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely

  // tslint:disable-next-line: typedef
  similarity(s1: string, s2: string) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength.toString());
  }

  // tslint:disable-next-line: typedef
  editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        }
        else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  }
  // ----------------------------------------------------------------------------------------- //
  // -----------------------------------End Section------------------------------------------- //
  // ----------------------------------------------------------------------------------------- //

}

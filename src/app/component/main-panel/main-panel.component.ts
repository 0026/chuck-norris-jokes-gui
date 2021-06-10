import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { JokeService } from 'src/app/service/joke.service';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  joke: Observable<any>;
  jokeAsText: String = '';
  chuckForm: FormGroup;
  imageName = "Chuck Norris";
  characterName = "Chuck Norris";
  counter = 0;

  constructor(private jokeService: JokeService,
    private fileSaverService: FileSaverService) {
    this.joke = this.jokeService.getRandomJoke();
    this.joke.subscribe(resp => {
      this.jokeAsText = resp.value.joke
    });
    this.chuckForm = new FormGroup({
      category: new FormControl(),
      name: new FormControl()
    })
  }

  ngOnInit(): void {

  }

  send() {
    let name = this.chuckForm.value.name;
    let map = new Map<string, string>();
    let changedName = false;
    if (name != null && name != '') {
      name = name.trim();
    }

    if (name != null && name.includes(' ')) {
      let index = name.indexOf(' ');
      let firstname = name.substr(0, index);
      let lastname = name.substr(index + 1, name.length - 1);
      map.set('firstName', firstname)
      map.set('lastName', lastname)
      changedName = true;
    }
    if (this.chuckForm.value.category != '') {
      map.set('exclude', this.chuckForm.value.category);
    }

    this.joke = this.jokeService.getRandomJokeWithParams(map)
    this.joke.subscribe(resp => {
      this.jokeAsText = resp.value.joke;
      this.imageName = changedName ? "Random" : "Chuck Norris";
    })
  }

  onKey(a: any) {
    let name = this.chuckForm.value.name;
    if (name == null || name.trim() == "") {
      this.characterName = "Chuck Norris";
    } else {
      this.characterName = name
    }
  }

  add() {
    this.counter += 1;
  }
  minus() {
    if (this.counter > 1) this.counter -= 1;
  }

  saveManyJokes() {
    this.counter=  this.counter<0 ? 1:  this.counter;
    console.log(this.counter)
    this.jokeService.getManyJokes(this.counter).subscribe(resp => {
      let jokes = ''
      for(let e of resp.value){
        jokes+=e.joke+ '\n'
      }
      this.fileSaverService.saveText(jokes, "jokes.txt");    
    })
  }
}

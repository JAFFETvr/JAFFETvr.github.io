import { listCharacter } from "./Dependencias.js";
import { Character } from "../models/Characters.js";
import { Series } from "../models/Series.js";
import { Comics } from "../models/Comics.js";
import { Events} from "../models/Events.js";
import { Stories } from "../models/Stories.js";

let cargarApi = document.getElementById("btn-api")
cargarApi.addEventListener("click", function(){
    let url = "https://gateway.marvel.com:443/v1/public/characters?limit=20&ts=1&apikey=65cbab51b175b08a55424e1ca6dbd814&hash=4708e72fa7c169c0e529173f73255caf"
    fetch(url).then(
        response => response.json()
    )
    .then (
        data => {
           console.log(data)    
           data.data.results.forEach( element => {
            let character = new Character()
            character.setName(element.name)
            character.setPath(element.thumbnail.path)
            character.setId(element.id)

            element.comics.items.forEach(item =>{
                let comic = new Comics()
                comic.setName(item.name)
                character.addComic(comic)
            })

            element.series.items.forEach(item =>{
                let serie = new Series()
                serie.setName(item.name)
                character.addSerie(serie)
            })

            element.stories.items.forEach(item =>{
                let stories = new Stories()
                stories.setName(item.name)
                character.addHistory(stories);
            })

            element.events.items.forEach(item =>{
                let event = new Events()
                event.setName(item.name)
                character.addEvents(event)
            })
            
            
            listCharacter.addCharacter(character)
            console.log(character)
        })
})
})



const MostrarApi = document.getElementById("btn-view");
const characterContainer = document.getElementById("character-container");
const characterTemplate = document.getElementById("character-template");
MostrarApi.addEventListener("click", () => {
    characterContainer.innerHTML = ""; 
  
    listCharacter.getCharacters().forEach((item) => {
      let characterDiv = characterTemplate.content.cloneNode(true);
      characterDiv.querySelector("h2").innerText = item.getName();
      characterDiv.querySelector("p:nth-of-type(1)").innerText = `Id: ${item.getId()}`;
      characterDiv.querySelector("img").setAttribute("src", item.getPath() + ".jpg");
  
      const seriesList = item.getSeries().map(serie => serie.getName()).join(', ');
      characterDiv.querySelector("p:nth-of-type(2)").innerText = `SERIE: ${seriesList}`;

     const comicsList = item.getComics().map(comic => comic.getName()).join(', ');
      characterDiv.querySelector("p:nth-of-type(3)").innerText = `COMIC: ${comicsList}`;

      const eventList = item.getEvents().map(event => event.getName()).join(', ');
      characterDiv.querySelector("p:nth-of-type(4)").innerText = `EVENTOS: ${eventList}`;

      const storiesList = item.getHistories().map(stori => stori.getName()).join(`,`)
      characterDiv.querySelector("p:nth-of-type(5)").innerText = `STORIES: ${storiesList}`;
  
      characterContainer.appendChild(characterDiv);
    });
  });




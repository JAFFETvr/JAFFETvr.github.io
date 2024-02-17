
export class ListCharacter {
    #characters = []
   

    addCharacter(character){
        this.#characters.push(character)
    }

    getCharacters() {
        return this.#characters
    }

  
}
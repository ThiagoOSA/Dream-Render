import { GroupHandler } from "GroupHandler";

class Component{
    static #ID = 0;
    static name = "";
    constructor(owner){
        this.id = Component.#ID;
        Component.#ID++;
        this.owner = owner;
    }

    init(){
    }

    update(){
    }

    getOwner(){
        return GroupHandler.ProgramObjects.map.get(this.owner);
    }
}

export{ Component }
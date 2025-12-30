class EventHandler{
    static #events = new Map();

    static update(){
        for(const event of this.#events.values()){
            if(event.condition()){
                event.response();
            }
        }
    }

    static addEvent(name,condition,response){
        if(this.#events.has(name)){console.warn(`Event ${name} already exists. it will be overwriten.`); }
        this.#events.set(name,{condition:condition, response:response});
    }

    static removeEvent(name){
        if(!this.#events.delete(name)){
            console.warn(`Event ${name} does not exist to be deleted.`)
            return false
        }
        return true;
    }

    static activateEvent(name){
        let event = this.#events.get(name);
        if(!event){
            console.warn(`Event ${name} does not exist to be activated.`);
            return false;
        }
        if(event.condition()){
            event.response();
            return true;
        }
    }
}

export{ EventHandler };
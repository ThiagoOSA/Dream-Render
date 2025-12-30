class GroupHandler{
    static ProgramObjects = {map:new Map(), arr:[]};
    static Colliders = {map:new Map(), arr:[]};
    static #Groups = new Map([
        ["ProgramObjects",{map:this.ProgramObjects.map,arr:this.ProgramObjects.arr}],
        ["Colliders",{map:this.Colliders.map,arr:this.Colliders.arr}]
    ]);
    
    static addGroup(name){
        if(this.#Groups.has(name)){
            console.warn(`Group ${name} already exists`);
            return;
        }
        let map = new Map();
        let arr = [];
        this.#Groups.set(name,{map:map,arr:arr});
        this[name] = {map:map,arr:arr};
    }

    static deleteGroup(name){
        if(!this.#Groups.has(name)){
            console.warn(`Group ${name} does not exists to be removed.`);
            return;
        }
        this.#Groups.delete(name);
        delete this[name];
    }

    static hasGroup(name){
        if(!this.#Groups.has(name)){
            console.error(`Group ${name} does not exist.`);
            return false;
        }
        return true;
    }

    static addMember(groupName, object){
        let group = this.#Groups.get(groupName);
        if(!group){
            console.error(`Group ${groupName} does not exists`);
            return;
        }
        let member = group.map.get(object.name);
        if(member){
            console.warn(`Object ${object.name} is already in the group ${groupName}`);
            return;
        }
        group.map.set(object.name,object);
        group.arr.push(object);
    }

    static removeMember(groupName, objectName){
        let group = this.#Groups.get(groupName);
        if(!group){
            console.error(`Group ${groupName} does not exists`);
            return;
        }
        let member = group.map.get(objectName);
        if(!member){
            console.warn(`Object ${objectName} is not in the group ${groupName}`);
            return;
        }
        group.map.delete(objectName);
        group.arr = group.arr.filter((object)=> objectName !== object.name );
    }
}

export{ GroupHandler }
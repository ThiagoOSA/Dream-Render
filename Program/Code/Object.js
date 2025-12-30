import { ComponentHandler } from "ComponentHandler";
import { GroupHandler } from "GroupHandler";

class Object{
    static #ID = 0;
    constructor(name,components = [],Group){
        this.id = Object.#ID;
        Object.#ID++;
        this.name = name || `${this.id}_Object`;

        this.componentsArr = []
        this.componentsMap = new Map()
        components?.map((c)=>{
            this.addComponent(c.name, ...c.args)
        });

        if(Group && GroupHandler.hasGroup(Group)){
            GroupHandler.addMember(Group, this);
        }
    }

    init(){
        GroupHandler.addMember("ProgramObjects",this);
        for(let i = 0; i < this.componentsArr.length; i++){
            this.componentsArr[i].init();
        }
    }
    
    render(){
        return this.Graphics.render();
    }

    update(){
        for(let i = 0; i < this.componentsArr.length; i++){
            this.componentsArr[i].update();
        }
    }

    addComponent(name , ...args){
        let componentClass = ComponentHandler.getComponent(name);
        if(!componentClass){
            console.error(`Component ${name} does not exist`);
            return false;
        }
        let component = new componentClass(this,...args);

        this.componentsArr.push(component);
        if(this[name]){
            this[name] = [this[name],component].flat();
            this.componentsMap.set(name, this[name])
        }else{
            this.componentsMap.set(name, component);
            this[name] = component;
        }
        return component;
    }

    getComponent(name){
        return this.componentsMap.get(name);
    }

    hasComponent(name){
        return this.componentsMap.has(name);
    }

    removeComponent(name){
        if(this.componentsMap.has(name)){
            this.componentsArr = this.componentsArr.filter((component)=> name !== component.name)
            this.componentsMap.delete(name);
            delete this[name];
            return true
        }
        return false;
    }
}

export{ Object }
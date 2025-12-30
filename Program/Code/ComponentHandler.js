import { Camera } from "Camera";
import { Graphics } from "Graphics";
import { Transform } from "Transform";
import { CellphoneController } from "CellphoneController";

class ComponentHandler{
    static #components = new Map([
        ['Transform', Transform],
        ['Camera', Camera],
        ['Graphics', Graphics],
        ['CellphoneController', CellphoneController]
    ])

    static addComponent(name,component){
        if(this.#components.has(name)){console.warn(`Component ${name} already exists and will be overwriten.`)}
        this.#components.set(name,component);
    }

    static getComponent(name){
        let component = this.#components.get(name);
        if(!component){
            console.error(`Component class ${name} does not exist`)
            return false
        };
        return component;
    }
}

export { ComponentHandler };
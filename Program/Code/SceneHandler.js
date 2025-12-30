import { Scene } from "Scene";

class SceneHandler{
    static #scenesArr = [];
    static #scenesMap = new Map();
    static activeScene;

    static render(){
        if (!this.activeScene) return;
        this.activeScene.render();
    }

    static update(){
        if (!this.activeScene) return;
        this.activeScene.update();
    }

    static changeTo(name){
        const scene = this.#scenesMap.get(name);
        if(!scene){
            console.warn(`Scene ${name} does not exist.`);
            return;
        }
        this.activeScene = scene;
        this.activeScene.init();
    }

    static createScene(name,objects,type){
        if (this.#scenesMap.has(name)) {
            console.warn(`Scene named "${name}" already exists.`);
            return;
        }
        let scene = new Scene(name,objects,type)
        this.#scenesMap.set(name, scene)
        this.#scenesArr.push(scene);
    }

    static deleteScene(name){
        const scene = this.#scenesMap.has(name)
        if(scene){
            this.#scenesMap.delete(name);
            this.#scenesArr = this.#scenesArr.filter((scene)=> name !== scene.name);            
        }
    }

    static changeName(name, newName){
        if(this.#scenesMap.has(newName)){
            throw Error("the name passed already belongs to another scene");
        };
        let oldName = name;
        let scene = this.#scenesMap.get(oldName);
        this.#scenesMap.set(newName,scene);
        this.#scenesMap.delete(oldName);
    }
}

export{ SceneHandler }
import { Texture } from "Texture";

class TextureHandler{
    static #textures = new Map();

    static addTexture(name,image){
        let texture = new Texture(name,image);
        this.#textures.set(name,texture);
    }

    static removeTexture(name){
        if(!this.#textures.has(name)){
            console.warn(`Texture ${name} does not exist`);
            return;
        }

        return this.#textures.delete(name);
    }

    static getTexture(name){
        let texture = this.#textures.get(name);
        if(!texture){
            return null;
        }
        return texture;
    }
}

export{ TextureHandler }
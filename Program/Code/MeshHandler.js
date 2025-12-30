class MeshHandler{
    static #MeshMap = new Map();

    static addMesh(mesh){
        if(this.#MeshMap.has(mesh.name)){
            console.warn(`Mesh ${mesh.name} already exists and will be overwriten.`);
        }
        this.#MeshMap.set(mesh.name,mesh);
        return this.#MeshMap.get(mesh.name);
    }

    static removeMesh(name){
        return this.#MeshMap.delete(name);
    }

    static getMesh(name){
        if(!this.#MeshMap.has(name)){
            console.error(`Mesh ${name} does not exist.`);
            return false;
        }
        return this.#MeshMap.get(name);
    }
}

export{ MeshHandler };
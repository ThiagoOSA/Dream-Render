import { fillAfinne, fillPaP } from "DrawFunctions";
import { Program } from "Program";

class Scene{
    static ID = 0;  
    constructor(name,objects,type = 0){
        this.id = Scene.ID;
        Scene.ID++;
        this.name = name || `${this.id}_Scene`;
        this.objectsArr = [];
        this.objectsMap = new Map();
        this.activeCamera;
        for(let i = 0; i < objects.length; i++){
            this.addObject(objects[i]);
            const camera = this.objectsArr[i].Camera
            if(camera){
                if(camera.isMainCamera){this.activeCamera = camera;}
            }
        }
        this.type = type;
        this.imageData;
        this.i = 0
    }

    init(){
        for(let i = 0; i < this.objectsArr.length; i++){
            this.objectsArr[i].init();
        }
    }

    addObject(object){
        this.objectsArr.push(object);
        this.objectsMap.set(object.name, object);
    }

    removeObject(object){
        this.objectsArr = this.objectsArr.filter(obj => obj !== object);
        this.objectsMap.delete(object.name);
    }

    getObject(name){
        return this.objectsMap.get(name);
    }

    render(){
        this.imageData = Program.ctx.getImageData(0,0,Program.canvas.width,Program.canvas.height);
        let facesRendered = [];
        for(let i = 0; i < this.objectsArr.length; i++){
            if(this.objectsArr[i].Graphics){
                facesRendered.push(...this.objectsArr[i].render());
            }
        }

        facesRendered.sort((a,b)=> ((b[0][0].z+b[1][0].z+b[2][0].z)/3) - ((a[0][0].z+a[1][0].z+a[2][0].z)/3));
        for(let i = 0; i < facesRendered.length; i++){
            if(this.type){
                this.imageData = fillPaP(...facesRendered[i],this.imageData);
            }else{
                fillAfinne(...facesRendered[i])
            }
        }
        if(this.type){
            Program.ctx.putImageData(this.imageData,0,0);
        }
    }

    update(){
        for(let i = 0; i < this.objectsArr.length; i++){
            this.objectsArr[i].update();
        }
    }
}

export{ Scene };
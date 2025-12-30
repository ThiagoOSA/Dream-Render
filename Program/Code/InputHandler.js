import { vec3D } from "vectorMath";

class InputHandler{
    static mouse = {
        position: vec3D(0,0),
        click:[],
        draging:false,
        dragStart: vec3D(0,0),
    }
    static keys = []

    static{
        this.init();
    }
        
    static init(){
        document.addEventListener("mousemove",e=>this.mousemove(e));
        document.addEventListener("mousedown",e=>this.mousedown(e));
        document.addEventListener("mouseup",e=>this.mouseup(e));
        document.addEventListener("keydown", e=>this.keydown(e));
        document.addEventListener("keyup", e=>this.keyup(e));
    }

    static mousemove(e){
        this.mouse.position.x = e.clientX;
        this.mouse.position.y = e.clientY;

        if(this.dragged(e)){
            this.mouse.draging = true;
        }
    }

    static mousedown(e){
        e.preventDefault();
        this.mouse.click[e.button] = e;
        this.mouse.dragStart = vec3D(e.x,e.y)
    }

    static mouseup(e){
        e.preventDefault();
        this.mouse.click[e.button] = false;
        if(this.mouse.draging){
            this.mouse.draging = false;
            this.mouse.dragStart = vec3D();
        }
    }

    static dragged(e){
        return this.mouse.click.some((b)=>{
            return b && b.x != e.x || b && b.y != e.y;
        })
    }

    static keydown(e){
        this.keys[e.keyCode] = true;
    }

    static keyup(e){
        e.preventDefault();
        this.keys[e.keyCode] = false;
    }

    static checkKeys(...keys){
        var keys = keys;
        return keys.every((k)=>{
            return this.keys[k];
        })
    }
}

export{ InputHandler }
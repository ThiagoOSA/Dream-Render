import { Component } from "Component";
import {vec3D, vec_normalize, vec_scale, vec_sum } from "vectorMath";
import { InputHandler } from "InputHandler";

class CellphoneController extends Component{
    constructor(owner){
        super(owner)
        
        this.transform = this.owner.Transform

        this.leftMov = false;
        this.rightMov = false;
        this.mouse = InputHandler.mouse

        this.left = document.createElement("div");
        this.right = document.createElement("div");
        this.left.classList.add("leftJoystick","Joystick","hidden");
        this.right.classList.add("rightJoystick","Joystick","hidden");
        document.body.appendChild(this.left);
        document.body.appendChild(this.right);

        this.left.addEventListener("mousedown",(e)=>{this.leftUpdate(e)})
        this.left.addEventListener("mouseup",()=>{this.leftMov = false})
        this.right.addEventListener("mousedown",(e)=>this.rightUpdate(e))
        this.right.addEventListener("mouseup",()=>{this.rightMov = false})
    }

    init(){
    }

    update(){
        if(window.innerWidth <= 800){
            this.left.classList.remove("hidden");
            this.right.classList.remove("hidden");
        }else{
            this.left.classList.add("hidden");
            this.right.classList.add("hidden");
        }

        if(this.leftMov){
            this.leftMov = vec_normalize(new vec3D((this.left.offsetLeft+(this.left.offsetWidth/2))-this.mouse.position.x, (this.left.offsetTop+(this.left.offsetHeight/2))-this.mouse.position.y))
            let right = vec_scale(this.transform.right,this.leftMov.x)
            let forward = vec_scale(this.transform.forward,this.leftMov.y)
            let movement = vec_sum(forward,right)
            this.transform.translate(movement)
        }
        if(this.rightMov){
            this.rightMov = vec_normalize(new vec3D((this.right.offsetTop+(this.right.offsetHeight/2))-this.mouse.position.y,this.mouse.position.x-(this.right.offsetLeft+(this.right.offsetWidth/2))));
            this.transform.rotate(this.rightMov)
        }
    }

    leftUpdate(e){
        this.leftMov = true
    }

    rightUpdate(e){
        this.rightMov = true
    }

    getOwner(){
        return GroupHandler.ProgramObjects.map.get(this.owner);
    }
}

export{ CellphoneController }
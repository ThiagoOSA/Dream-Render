import { Program } from "Program";
import {mat_perspective, mat_view } from "matrixMath";
import { vec3D, vec_sum,vec_scale } from "vectorMath";
import { Component } from "Component";
import { InputHandler } from "InputHandler";

class Camera extends Component{
    constructor(owner, fov, aspectRatio, near, far, isMainCamera){
        super(owner);

        this.fov = fov ?? Program.Settings.fov;
        this.aspectRatio = aspectRatio ?? Program.Settings.aspectRatio;
        this.near = near ?? 1;
        this.far = far ?? 3000;

        this.forward;
        this.up;
        this.right;
        this.eye;
        this.rotation;
        this.target;
        
        let fovRadians = this.fov * (Math.PI/180);
        let halfHeight = this.near * Math.tan(fovRadians/2);
        let halfWidth = halfHeight*this.aspectRatio;
        
        this.projection = mat_perspective(this.near,this.far,halfHeight,-halfHeight,halfWidth,-halfWidth);
        this.view;
        this.isMainCamera = isMainCamera ?? false;
    }

    init(){
        super.init();
        this.calcView();
    }

    update(){
        this.isMainCamera && this.move();
        this.calcView();
    }

    move(){
        let Transform = this.owner.Transform

        if(InputHandler.checkKeys(87)){
            Transform.translate(Transform.forward);
            Transform.change = true;
        }
        if(InputHandler.checkKeys(83)){
            Transform.translate(vec_scale(Transform.forward,-1));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(68)){
            Transform.translate(vec_scale(Transform.right,-1));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(65)){
            Transform.translate(Transform.right);
            Transform.change = true;
        }
        if(InputHandler.checkKeys(32)){
            Transform.translate(Transform.up);
            Transform.change = true;
        }
        if(InputHandler.checkKeys(16)){
            Transform.translate(vec_scale(Transform.up,-1));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(69)){
            Transform.rotate(vec3D(0,1,0));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(81)){
            Transform.rotate(vec3D(0,-1,0));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(82)){
            Transform.rotate(vec3D(1,0,0));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(70)){
            Transform.rotate(vec3D(-1,0,0));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(88)){
            Transform.rotate(vec3D(0,0,1));
            Transform.change = true;
        }
        if(InputHandler.checkKeys(90)){
            Transform.rotate(vec3D(0,0,-1));
            Transform.change = true;
        }
    }

    calcView(){
        let Transform = this.owner.Transform;
        this.eye = Transform.position;
        this.rotation = Transform.rotation;
        
        this.forward = Transform.forward;
        this.right = Transform.right;
        this.up = Transform.up;
        
        this.target = vec_sum(this.eye, this.forward);
        this.view = mat_view(this.eye, this.target, this.up);
    }
}

export{ Camera }
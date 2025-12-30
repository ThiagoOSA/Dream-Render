import { mat_model, mat_multVec, mat_rotate } from "matrixMath";
import { quat_euler, quat_mult, quat_normalize, quaternion } from "quaternionMath";
import { vec3D, vec_normalize, vec_sum } from "vectorMath";
import { Component } from "Component";

class Transform extends Component{
    constructor(owner, position, rotation, size){
        super(owner);
        this.position = position || vec3D(0,0,0,0);
        this.rotation = quaternion(1,0,0,0);
        this.size = size || vec3D(0,0,0,0);

        this.forward = vec3D(0,0,-1,0);
        this.right = vec3D(1,0,0,0);
        this.up = vec3D(0,1,0,0);

        this.rotate(rotation || vec3D(0,0,0));

        this.model = mat_model(this.position,this.rotation,this.size);
        this.change = false;
    }

    update(){
        if(this.change){
            this.model = mat_model(this.position,this.rotation,this.size);
            this.change = false;
        }
    }

    translate(v){
        this.position = vec_sum(this.position, v);
        this.change = true;
        return true;
    }

    rotate(v){
        this.rotation = quat_normalize(quat_mult(this.rotation,quat_euler(v)));
        let rotationMatrix = mat_rotate(this.rotation);

        this.forward = vec_normalize(mat_multVec(rotationMatrix, vec3D(0, 0, -1, 0)));
        this.right = vec_normalize(mat_multVec(rotationMatrix, vec3D(1, 0, 0, 0)));
        this.up = vec_normalize(mat_multVec(rotationMatrix, vec3D(0, 1, 0, 0)));

        this.change = true;
        return true;
    }

    scale(v){
        this.size = vec_sum(this.size,v);
        this.change = true;
        return true;
    }
}

export{ Transform }
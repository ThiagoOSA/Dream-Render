import { mat_multMat } from "matrixMath";
import { Component } from "Component";
import { SceneHandler } from "SceneHandler";
import { MeshHandler } from "MeshHandler";

class Graphics extends Component{
    constructor(owner,mesh,visible = false){
        super(owner);
        this.mesh = MeshHandler.getMesh(mesh);
        this.visible = visible;
    }

    render(){
        let camera = SceneHandler.activeScene.activeCamera;
        let transform = this.owner.Transform;
        let vp = mat_multMat(camera.projection,camera.view);
        let mvp = mat_multMat(vp,transform.model);
        return this.mesh.render(transform,camera,mvp);
    }
}

export { Graphics };
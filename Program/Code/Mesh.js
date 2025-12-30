import { Program } from "Program";
import { mat_multVec } from "matrixMath";
import { vec3D, vec_sub, vec_cross, vec_dot,vec_normalize } from "vectorMath";
import { ToScreen } from "ToScreen";
import { MeshHandler } from "MeshHandler";
import { TextureHandler } from "TextureHandler";

class Mesh{
    constructor(name, vertices = [], normals = [], uvs = [], faces = []){
        this.name = name;
        this.vertices = vertices;
        this.normals = normals;
        this.uvs = uvs;
        this.faces = faces;
        MeshHandler.addMesh(this);
    }

    render(transform,camera,mvp){
        var renderedFaces = []
        for(let i = 0; i < this.faces.length; i++){
            let p1 = this.faces[i][0];
            let p2 = this.faces[i][1];
            let p3 = this.faces[i][2];

            let p1m = mat_multVec(transform.model, this.vertices[p1[0]]);
            let p2m = mat_multVec(transform.model, this.vertices[p2[0]]);
            let p3m = mat_multVec(transform.model, this.vertices[p3[0]]);

            let edge1 = vec_sub(p2m,p1m);
            let edge2 = vec_sub(p3m,p1m);
            let normal = vec_normalize(vec_cross(edge1,edge2));
            let cameraViewOfTriangle = vec_normalize(vec_sub(p1m,camera.owner.Transform.position));
            
            if(vec_dot(cameraViewOfTriangle,normal) >= 0){continue}

            p1 = [mat_multVec(mvp, this.vertices[p1[0]]), this.uvs[p1[1]], this.normals[p1[2]]];
            p2 = [mat_multVec(mvp, this.vertices[p2[0]]), this.uvs[p2[1]], this.normals[p2[2]]];
            p3 = [mat_multVec(mvp, this.vertices[p3[0]]), this.uvs[p3[1]], this.normals[p3[2]]];


            if(p1[0].w <= camera.near || p2[0].w <= camera.near || p3[0].w <= camera.near){continue};
            if(p1[0].w > camera.far || p2[0].w >= camera.far || p3[0].w >= camera.far){continue};
            
            p1[0] = vec3D(p1[0].x / p1[0].w, p1[0].y / p1[0].w, p1[0].z / p1[0].w, p1[0].w);
            p2[0] = vec3D(p2[0].x / p2[0].w, p2[0].y / p2[0].w, p2[0].z / p2[0].w, p2[0].w);
            p3[0] = vec3D(p3[0].x / p3[0].w, p3[0].y / p3[0].w, p3[0].z / p3[0].w, p3[0].w);
                        
            p1[0] = ToScreen(p1[0], Program.canvas);
            p2[0] = ToScreen(p2[0], Program.canvas);
            p3[0] = ToScreen(p3[0], Program.canvas);

            renderedFaces.push([p1,p2,p3,TextureHandler.getTexture(this.faces[i][3])]);
        }    
        return renderedFaces;
    }
}

export{ Mesh };
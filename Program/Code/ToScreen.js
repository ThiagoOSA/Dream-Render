import { vec3D } from "vectorMath"

function ToScreen(v,canvas){
    return new vec3D(((v.x+1)/2)*canvas.width,((1-v.y)/2)*canvas.height,v.z,v.w);
}

export{ ToScreen }
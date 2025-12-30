import { vec3D } from "vectorMath";

class Texture{
    constructor(name,image){
        this.name = name;
        this.image = null;
        this.width = 0;
        this.height = 0;
        this.loaded = false;
        if(image){
            this.load(image);
        }
        this.pixelsData;
    }

    load(src){
        this.image = new Image();
        this.image.onload = ()=>{
            this.width = this.image.width;
            this.height = this.image.height;
            this.loaded = true;
            this.pixelsData = this.getData();
        }
        this.image.src = src;
    }

    getData(){
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = this.image.width;
        tempCanvas.height = this.image.height;
        let tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(this.image,0,0);
        return tempCtx.getImageData(0,0,tempCanvas.width,tempCanvas.height);
    }

    getCorrespondingPixel(weights,triangle){
        let w0 = 1/triangle[0][0].w;
        let w1 = 1/triangle[1][0].w;
        let w2 = 1/triangle[2][0].w;
        
        let u0 = triangle[0][1].x * w0;
        let v0 = triangle[0][1].y * w0;

        let u1 = triangle[1][1].x * w1;
        let v1 = triangle[1][1].y * w1;

        let u2 = triangle[2][1].x * w2;
        let v2 = triangle[2][1].y * w2;

        var u = weights[0]*u0 + weights[1]*u1 + weights[2]*u2;
        var v = weights[0]*v0 + weights[1]*v1 + weights[2]*v2;
        var w = weights[0]*w0 + weights[1]*w1 + weights[2]*w2;

        var texel_x = Math.trunc((u/w)*this.pixelsData.width);
        var texel_y = Math.trunc((1-(v/w))*this.pixelsData.height);

        var index = (texel_y * this.pixelsData.width + texel_x) * 4;
        
        return new vec3D(this.pixelsData.data[index], this.pixelsData.data[index + 1], this.pixelsData.data[index + 2], 255);
    }
}

export{ Texture }
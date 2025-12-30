import { EventHandler } from "EventHandler";
import { GroupHandler } from "GroupHandler";
import { InputHandler } from "InputHandler";
import { Object } from "Object";
import { SceneHandler } from "SceneHandler";
import { vec3D, vec_scale } from "vectorMath";
import { Cube } from "Cube";
import { MeshHandler } from "MeshHandler";

class Program{
    static canvas = document.body.querySelector("#bgCanvas");
    static ctx = this.canvas.getContext("2d");
    static Settings = {
        volume: {
            music: 0,
            sfx: 0,
        },
        aspectRatio: 16/9,
        fov: 75,
    }
    static DeltaTime = 0;
    static lastDate;
    static currentDate;
    static running = true;
    static rendering = true;
    static updating = true;
    static timeAccumulator = 0;
    static frameCount = 0;
    static fpsCounter = document.querySelector(".fps")
    static init(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.Settings.aspectRatio = this.canvas.width/this.canvas.height;
        this.lastDate = performance.now();
        requestAnimationFrame(()=>{this.run()});
    }

    static run(){
        if(!this.running){return};

        var fps = this.DeltaTime > 0 ? 1 / this.DeltaTime : 0;

        this.frameCount++;
        this.timeAccumulator += this.DeltaTime;
        if (this.timeAccumulator >= 1.0) {
            this.fpsCounter.innerHTML = Math.round(this.frameCount / this.timeAccumulator);
            this.frameCount = 0;
            this.timeAccumulator = 0;
        }
        
        this.currentDate = performance.now();
        this.DeltaTime = (this.currentDate - this.lastDate)/1000;
        this.lastDate = this.currentDate;

        this.update();
        this.render();

        requestAnimationFrame(()=>{this.run()});
    }

    static render(){
        if(!this.rendering){return};

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        SceneHandler.render();
    }

    static update(){
        if(!this.updating){return};

        EventHandler.update();
        SceneHandler.update();
    }
}

export{ Program };
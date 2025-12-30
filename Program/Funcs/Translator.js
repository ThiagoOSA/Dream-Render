import { vec3D } from "vectorMath"
import { MeshHandler } from "MeshHandler";
import { Mesh } from "Mesh";
import { TextureHandler } from "TextureHandler";
import { Object } from "Object";
import { SceneHandler } from "SceneHandler";

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', async(e) => {
    if(e.target.files.length > 0) {

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event)=>{
            const fileContent = event.target.result;
            readJSON(file.name, fileContent);
        }

        reader.onerror = function() {
            alert("Could not read the file.");
            console.error("FileReader error:", reader.error);
        };

        reader.readAsText(file);
    }else{
        alert("Please select a file first!");
        return;
    }
   /*try{
    let response = await fetch("Program/scene_01.json");
    let file = await response.text();
    readJSON("scene_01.json",file)
   }catch(error){
        console.error(error)
   }*/
});

async function readJSON(name,content){
    if(name.indexOf(".json") < 0){
        alert("Arquivo Precisa Ser JSON");
    }
    var content = JSON.parse(content);
    let scenes = content.scenes
    for(let i = 0; i < scenes.length; i++){
        let objects = []
        for(let j = 0; j < scenes[i].Objects.length; j++){
            let object = scenes[i].Objects[j]; 
            for(let n = 0; n < object.Components.length; n++){
                let component = object.Components[n];
                switch(component.name){
                    case "Graphics":
                        component.args[0] = await addOBJ(component.args)
                        break;
                    case "Transform":
                        component.args = addTransform(component.args);
                        break;
                }
            }
            objects.push(new Object(object.name,object.Components))
        }

        const list = document.querySelector(".scene-list");
        const objectHTML = objects.map(obj => `<li class="object-item">${obj.name}</li>`).join('');
        const newSceneHTML = `
        <li class="scene-item">
            <button class="scene-header">${scenes[i].name}</button>
            <ul class="object-list">
                ${objectHTML}
            </ul>
        </li>`;

        list.insertAdjacentHTML('beforeend', newSceneHTML);

        const newHeader = list.lastElementChild.querySelector('.scene-header');
        newHeader.addEventListener('click', () => {
            newHeader.parentElement.classList.toggle('active');
            if(newHeader.parentElement.classList.contains('active')){
                SceneHandler.changeTo(scenes[i].name);
            }
            document.querySelectorAll('.scene-item').forEach(item => {
                if (item !== newHeader.parentElement) {
                    item.classList.remove('active');
                }
            });
        });
        SceneHandler.createScene(scenes[i].name,objects,scenes[i].type)
    }
}

async function addOBJ(args){
    let objLink = args[0]
    if(objLink.lastIndexOf(".obj") == -1){return objLink}
    try{
        let response = await fetch(objLink);
        let file = await response.text();
        let lines = file.split("\n");
        let tokens = lines.map((v)=>v.split(" ").map((v2)=>v2.trim()))
        for(let i = 0; i < tokens.length; i++){
            var currentObject;
            var currentTexture;
            switch(tokens[i][0]){
                case "#":
                    continue
                case "mtllib":
                    var matLink = tokens[i][1]
                    var result = addMTL(matLink);
                    continue
                case "usemtl":
                    currentTexture = tokens[i][1]
                    continue
                case "o":
                    currentObject = MeshHandler.addMesh(new Mesh(tokens[i][1]))
                    continue
                case "v":
                    var nums = tokens[i].slice(1).map(Number);
                    currentObject.vertices.push(new vec3D(...nums,1))
                    continue
                case "vt":
                    var nums = tokens[i].splice(1).map(Number);
                    currentObject.uvs.push(new vec3D(...nums))
                    continue
                case "vn":
                    var nums = tokens[i].splice(1).map(Number);
                    currentObject.normals.push(new vec3D(...nums))
                    continue
                case "f":
                    var result = tokens[i].slice(1).map((e)=> e != "" ? e.split("/").map((v)=>{v ? v = Number(v)-1 : v = 0; return v}):null).filter((v)=>v!=null)
                    var faces = [[result[0],result[1],result[2],currentTexture]];
                    if(result.length > 3){
                        faces[1] = [result[2],result[3],result[0],currentTexture]
                    }
                    currentObject.faces.push(...faces)
                    continue
            }
        }
        return currentObject.name;
    }
    catch(error){
        console.error(error);
    }
}

async function addMTL(matLink){
    try{
        let response = await fetch(matLink);
        let file = await response.text();
        let lines = file.split("\n");
        let tokens = lines.map((v)=>v.split(" "))
        var currentTexture = {
                name: "",
                image: ""
        };
        for(let i = 0; i < tokens.length; i++){
            switch(tokens[i][0]){
                case "newmtl":
                    if(currentTexture.name.length > 0){
                        TextureHandler.addTexture(currentTexture.name,currentTexture.image);
                        continue
                    }
                    currentTexture.name = tokens[i][1]
                    continue
                case "map_Kd":
                    currentTexture.image = tokens[i][1]
                    continue
            }
        }
        if(currentTexture.name.length > 0){
            TextureHandler.addTexture(currentTexture.name,currentTexture.image);
        }
    }catch(error){
        console.error(error);
    }
}

function addTransform(args){
    let arr = [];
    for(let i = 0; i < args.length; i++){
        arr.push(new vec3D(args[i].x,args[i].y,args[i].z))
    }
    return arr;
}

export { addOBJ, addMTL }
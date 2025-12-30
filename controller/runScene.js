import { Program } from "Program";

let runSceneBtn = document.querySelector(".runScene");

runSceneBtn.addEventListener("click", runScene)

function runScene(){
    Program.updating = !Program.updating;

    if(Program.updating){runSceneBtn.innerText = "Pause"}
    else{runSceneBtn.innerText = "Play"}
}

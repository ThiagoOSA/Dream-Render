import { Program } from "Program";
import { baricentric } from "Baricentric";
import { vec3D } from "vectorMath";

function fillAfinne(p1,p2,p3,texture_){
    let texture = texture_ ? texture_.image : null;
	var x0 = p1[0].x, y0 = p1[0].y;
	var x1 = p2[0].x, y1 = p2[0].y;
	var x2 = p3[0].x, y2 = p3[0].y;

	var u0 = p1[1] ? p1[1].x : 0, v0 = p1[1] ? p1[1].y : 0;
	var u1 = p2[1] ? p2[1].x : 1, v1 = p2[1] ? p2[1].y : 0;
	var u2 = p3[1] ? p3[1].x : 1, v2 = p3[1] ? p3[1].y : 1;

	Program.ctx.save();
	Program.ctx.beginPath();
	Program.ctx.moveTo(x0, y0);
	Program.ctx.lineTo(x1, y1);
	Program.ctx.lineTo(x2, y2);
	Program.ctx.closePath();
	Program.ctx.clip();
	var delta = u0*v1+v0*u2+u1*v2-v1*u2-v0*u1-u0*v2;
	Program.ctx.transform(
		(x0*v1+v0*x2+x1*v2-v1*x2-v0*x1-x0*v2)/delta,
		(y0*v1+v0*y2+y1*v2-v1*y2-v0*y1-y0*v2)/delta,
		(u0*x1+x0*u2+u1*x2-x1*u2-x0*u1-u0*x2)/delta,
		(u0*y1+y0*u2+u1*y2-y1*u2-y0*u1-u0*y2)/delta,
		(u0*v1*x2+v0*x1*u2+x0*u1*v2-x0*v1*u2-v0*u1*x2-u0*x1*v2)/delta,
		(u0*v1*y2+v0*y1*u2+y0*u1*v2-y0*v1*u2-v0*u1*y2-u0*y1*v2)/delta
	);
    if(texture){
        Program.ctx.drawImage(texture, 0, 0,1,1);
    }else{
        Program.ctx.fillStyle = "white";
        Program.ctx.fillRect(0,0,1,1);
    }
	Program.ctx.restore();
}

function fillPaP(p1,p2,p3,img,screen){
    var img = img;
	var canvas = Program.canvas
    var tri = [p1,p2,p3];
    var triX = tri.concat([]);
    var triY = tri.concat([]);

    triX.sort((a,b)=>{
        return a[0].x - b[0].x;
    }) 

    triY.sort((a,b)=>{
        return a[0].y - b[0].y;
    }) 

    let boxIX = Math.floor(triX[0][0].x);
    let boxFX = Math.ceil(triX[triX.length-1][0].x); 

    let boxIY = Math.floor(triY[0][0].y);
    let boxFY = Math.ceil(triY[triY.length-1][0].y);

    for(var x = boxIX; x < boxFX; x++){
        for(var y = boxIY; y < boxFY; y++){
            if(y >= 0 && y < canvas.height && x >= 0 && x < canvas.width){
                var weigths = baricentric(new vec3D(x,y,0,0),tri);
                if(weigths[0] < 0 || weigths[1] < 0 || weigths[2] < 0){
                    continue
                }

                if(img){
                    var color = img.getCorrespondingPixel(weigths,tri);
                }else{
                    var color = new vec3D(255,255,255,255);
                }
				
                let index = (Math.trunc(y) * screen.width + Math.trunc(x))*4;
                screen.data[index] = color.x;
                screen.data[index+1] = color.y;
                screen.data[index+2] = color.z;
                screen.data[index+3] = color.w;
            }
        }
    }
	return screen;
}

export { fillAfinne, fillPaP }
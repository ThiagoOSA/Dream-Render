function baricentric(p,triangle){
    var DetT = (triangle[1][0].y-triangle[2][0].y)*(triangle[0][0].x-triangle[2][0].x)+(triangle[2][0].x-triangle[1][0].x)*(triangle[0][0].y-triangle[2][0].y);
    var w0 = ((triangle[1][0].y-triangle[2][0].y)*(p.x-triangle[2][0].x)+(triangle[2][0].x-triangle[1][0].x)*(p.y-triangle[2][0].y))/DetT;
    var w1 = ((triangle[2][0].y-triangle[0][0].y)*(p.x-triangle[2][0].x)+(triangle[0][0].x-triangle[2][0].x)*(p.y-triangle[2][0].y))/DetT;
    var w2 = 1 - w0 - w1;
    return [w0,w1,w2];
}

export{baricentric}
import { quat_normalize } from "quaternionMath";
import { vec3D, vec_cross, vec_dot, vec_normalize, vec_sub } from "vectorMath";

function matrix3D(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
    return [
        [a??1,b??0,c??0,d??0],
        [e??0,f??1,g??0,h??0],
        [i??0,j??0,k??1,l??0],
        [m??0,n??0,o??0,p??1],
    ]
}

function mat_multMat(m1,m2){
    let resultantMatrix = matrix3D();
    
    for(let row = 0; row < 4; row++){
        for(let column = 0; column < 4; column++){
            let result = 0

            for(let n = 0; n < 4; n++){
                result += m1[row][n] * m2[n][column];
            }
            resultantMatrix[row][column] = result
        }
    }

    return resultantMatrix;
}

function mat_multVec(m,v){
    let VectorMatrix = [v.x,v.y,v.z,v.w??1];
    let resultantVectorMatrix = [];
    for(let row = 0; row < 4; row++){
        let result = 0;
        for(let column = 0; column < 4; column++){
            result += m[row][column] * VectorMatrix[column]
        }
        resultantVectorMatrix[row] = result;
    }

    return vec3D(resultantVectorMatrix[0],resultantVectorMatrix[1],resultantVectorMatrix[2],resultantVectorMatrix[3]);
}

function mat_translate(vec){
    return matrix3D(
        1,0,0,vec.x,
        0,1,0,vec.y,
        0,0,1,vec.z,
        0,0,0,1
    )
}

function mat_scale(vec){
    return matrix3D(
        vec.x,0,0,0,
        0,vec.y,0,0,
        0,0,vec.z,0,
        0,0,0,1
    )
}

function mat_rotate(quat){
    let q = quat_normalize(quat);
    return matrix3D(
        1-2*(q.y**2 + q.z**2), 2*(q.x*q.y - q.w*q.z), 2*(q.x*q.z + q.w*q.y),0,
        2*(q.x*q.y + q.w * q.z), 1-2*(q.x**2 + q.z**2), 2*(q.y*q.z - q.w*q.x),0,
        2*(q.x*q.z - q.w * q.y), 2*(q.y*q.z + q.w * q.x), 1-2*(q.x**2 + q.y**2),0,
        0,0,0,1
    )
}

function mat_model(position,rotation,size){
    let tm = mat_translate(position);
    let rm = mat_rotate(rotation);
    let sm = mat_scale(size);

    return mat_multMat(mat_multMat(tm,rm),sm);
}

function mat_view(eye,target,up){
    let zAxis = vec_normalize(vec_sub(eye,target));
    let xAxis = vec_normalize(vec_cross(zAxis,up));
    let yAxis = vec_cross(xAxis,zAxis);

    return matrix3D(
        xAxis.x,xAxis.y,xAxis.z,-vec_dot(xAxis,eye),
        yAxis.x,yAxis.y,yAxis.z,-vec_dot(yAxis,eye),
        zAxis.x,zAxis.y,zAxis.z,-vec_dot(zAxis,eye),
        0,0,0,1
    );
}

function mat_perspective(near,far,top,bottom,right,left){
    return matrix3D(
        (2*near)*(1/(right - left)),0,(right+left)*(1/(right - left)),0,
        0, (2*near)*(1/(top-bottom)),(top+bottom)*(1/(top-bottom)),0,
        0,0,-((far+near)*(1/(far - near))),-((2*far*near)*(1/(far - near))),
        0,0,-1,0
    ); 
}

function mat_orthographic(near,far,top,bottom,right,left){
    return matrix3D(
        2/(right-left),0,0,-((right+left)/(right-left)),
        0,2/(top-bottom),0,-((top+bottom)/(top-bottom)),
        0,0,-2/(far-near),-((far+near)/(far-near)),
        0,0,0,1
    )
}

function mat_mvp(m,v,p){
    return mat_multMat(mat_multMat(p,v),m);
}

export{ matrix3D, mat_multMat, mat_multVec , mat_translate, mat_rotate, mat_scale, mat_model, mat_view, mat_perspective, mat_orthographic, mat_mvp };
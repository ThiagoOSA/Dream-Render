import { vec_normalize, vec_scale } from "vectorMath";

function quaternion(w,x,y,z){
    return {w:w??0,x:x??0,y:y??0,z:z??0};
}

function quat_euler(v){
    let vr = vec_scale(v,(Math.PI/180))
    let qx = quaternion(Math.cos(vr.x/2),Math.sin(vr.x/2),0,0);
    let qy = quaternion(Math.cos(vr.y/2),0,Math.sin(vr.y/2),0);
    let qz = quaternion(Math.cos(vr.z/2),0,0,Math.sin(vr.z/2));
    return quat_mult(quat_mult(qx,qy),qz);
}

function quat_conjugate(q){
    return {w:q.w,x:-q.x,y:-q.y,z:-q.z};
}

function quat_mult(q1,q2){
    return quaternion(
        (q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z),
        (q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y),
        (q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x),
        (q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w),
    );
}

function quat_rotate(v,a){
    let ar = a*(Math.PI/180)
    let vn = vec_normalize(v)
    let q = quaternion(Math.cos(ar/2), Math.sin(ar/2)*vn.x,Math.sin(ar/2)*vn.y,Math.sin(ar/2)*vn.z)

    return q;
}

function quat_magnitude(q){
    return Math.sqrt((q.w**2 + q.x**2 + q.y**2 + q.z**2));
}

function quat_normalize(q){
    let mag = quat_magnitude(q);
    if(mag > 0){
        return quaternion(q.w/mag,q.x/mag,q.y/mag,q.z/mag);
    }
    return q;
}

export{ quaternion, quat_euler, quat_conjugate, quat_mult, quat_rotate, quat_magnitude, quat_normalize }
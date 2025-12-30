function vec3D(x,y,z,w){
    return {x:x??0,y:y??0,z:z??0,w:w??0};
}

function vec_sum(v1,v2){
    return vec3D(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z,v1.w+v2.w);
}

function vec_sub(v1,v2){
        if(!v1 || !v2){return}
    return vec3D(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z,v1.w-v2.w);
}

function vec_scale(v1,n){
    return vec3D(v1.x*n,v1.y*n,v1.z*n,v1.w*n);
}

function vec_div(v1,n){
    return vec3D(v1.x/n,v1.y/n,v1.z/n,v1.w/n);
}

function vec_dot(v1,v2){
    return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
}

function vec_cross(v1,v2){
    return vec3D((v1.y*v2.z - v1.z*v2.y), (v1.z*v2.x - v1.x*v2.z), (v1.x*v2.y - v1.y*v2.x));
}

function vec_mag(v){
    return Math.sqrt(v.x**2 + v.y**2 + v.z**2);
}

function vec_normalize(v){
    let mag = vec_mag(v);
    if(mag > 0){
        let vec = vec_div(v,mag)
        return vec3D(vec.x,vec.y,vec.z,v.w);
    }
    return v;
}

function vec_distance(v1,v2){
    return Math.sqrt((v1.x-v2.x)**2 + (v1.y-v2.y)**2 + (v1.z-v2.z)**2);
}

export{ vec3D, vec_sum, vec_sub, vec_scale, vec_div, vec_dot, vec_cross, vec_mag, vec_normalize, vec_distance };
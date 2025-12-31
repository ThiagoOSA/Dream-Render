import { vec3D } from "vectorMath";
import { Mesh } from "Mesh";
import { MeshHandler } from "MeshHandler";
import { TextureHandler } from "TextureHandler";

class Cube extends Mesh{
        constructor() {
            super(Cube.name, Cube.vertices, Cube.normals, Cube.uvs, Cube.faces, 1);
        }

        static name = "cube"
        static vertices = [
            vec3D(-1, -1, 1,1),
            vec3D(1, -1, 1,1),
            vec3D(1, 1, 1,1),
            vec3D(-1, 1, 1,1),

            vec3D(-1, -1, -1,1),
            vec3D(1, -1, -1,1),
            vec3D(1,  1, -1,1),
            vec3D(-1,  1, -1,1)
        ];

        static uvs = [
            vec3D(0, 0),
            vec3D(1, 0),
            vec3D(1, 1),
            vec3D(0, 1)
        ];

        static normals = [
            vec3D(0, 0, 1),
            vec3D(0, 0, -1),
            vec3D(0, 1, 0),
            vec3D(0, -1, 0),
            vec3D(1, 0, 0),
            vec3D(-1, 0, 0)
        ];

        static textures = [
            TextureHandler.addTexture("box", "/Program/Graphics/Textures/box.jpg"),
        ]

        static faces = [
            [[0, 0, 0], [1, 1, 0], [2, 2, 0], "box"],
            [[0, 0, 0], [2, 2, 0], [3, 3, 0], "box"],

            [[4, 1, 1], [7, 0, 1], [6, 3, 1], "box"],
            [[4, 1, 1], [6, 3, 1], [5, 2, 1], "box"],

            [[3, 0, 2], [2, 1, 2], [6, 2, 2], "box"],
            [[3, 0, 2], [6, 2, 2], [7, 3, 2], "box"],

            [[4, 0, 3], [5, 1, 3], [1, 2, 3], "box"],
            [[4, 0, 3], [1, 2, 3], [0, 3, 3], "box"],

            [[1, 0, 4], [5, 1, 4], [6, 2, 4], "box"],
            [[1, 0, 4], [6, 2, 4], [2, 3, 4], "box"],

            [[4, 0, 5], [0, 1, 5], [3, 2, 5], "box"],
            [[4, 0, 5], [3, 2, 5], [7, 3, 5], "box"],
        ];

        static {MeshHandler.addMesh(this)};
}

new Cube();
export{ Cube }
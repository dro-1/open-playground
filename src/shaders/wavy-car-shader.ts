export const fragment = `
    precision highp float;

    uniform sampler2D uTexture;
    uniform vec2 vUvScale;
    uniform vec2 uImageSizes;
    uniform vec2 uPlaneSizes;

    varying vec2 vUv;
    void main() {
        vec2 uv = (vUv - 0.5) * vUvScale + 0.5;
        vec4 color = texture2D(uTexture, uv);
        gl_FragColor = color;
    }
`;

export const vertex = `
    uniform float uTime;
    uniform float uAmplitude;
    uniform float uFrequency;
    
    varying vec2 vUv;
    void main() {
        vUv = uv;
        vec3 newPosition = position;
        float wave = uAmplitude * sin(position.x * uFrequency + uTime);
        newPosition.z = position.z + wave;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);
    }
`;

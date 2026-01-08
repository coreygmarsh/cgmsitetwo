import React, { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.0,0.0));
  float c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}

float fbm(vec2 p){
  float v=0.0, a=0.5, f=1.0;
  for(int i=0;i<5;i++){ v+=a*noise(p*f); f*=2.0; a*=0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv - 0.5;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.12;

  float base = fbm(p*2.0 + t);
  float waves =
      0.35*sin(3.0*p.y + t*2.0) +
      0.25*sin(4.5*p.x - t*1.4) +
      0.15*sin(6.0*(p.x+p.y) + t*1.7);

  float energy = base + waves*0.4;
  energy = smoothstep(-0.4, 0.8, energy);

  float glowMask = pow(energy, 3.0);

  // MORE CYAN / BLUE PALETTE
  // deep navy-cyan -> rich teal-blue -> bright cyan highlight
  vec3 deep   = vec3(0.0, 0.02, 0.09);  // almost black with blue hint
  vec3 mid    = vec3(0.0, 0.26, 0.55);  // teal-leaning blue
  vec3 bright = vec3(0.16, 0.90, 1.00); // strong cyan glow

  vec3 col = mix(deep, mid, energy);
  col = mix(col, bright, glowMask);

  float dist = length(p);

  // Stronger vignette to keep edges dark
  float vignette = smoothstep(0.7, 0.32, dist);
  col *= vignette;

  // Center glow now cooler (cyan/blue instead of emerald)
  float core = smoothstep(0.32, 0.0, dist);
  col += core * vec3(0.05, 0.35, 0.60);

  // Subtle cyan-tinted scanlines
  float scan = sin((uv.y + t*0.2) * 80.0) * 0.015;
  col += vec3(0.04, 0.10, 0.16) * scan;

  // GLOBAL DARKEN (keeps text readable)
  col *= 0.78;

  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vsSource, fsSource) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/**
 * Full-screen shader background that matches the CGM cyan/blue theme.
 * Use it absolutely positioned behind content.
 */
const CGMShaderBackground = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: true }) ||
      canvas.getContext("experimental-webgl");

    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    gl.useProgram(program);

    // Fullscreen quad
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform2f(uResolution, width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    let start = performance.now();
    let frameId;

    const render = (now) => {
      const t = (now - start) * 0.001; // seconds
      gl.uniform1f(uTime, t);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        "absolute inset-0 w-full h-full pointer-events-none " + className
      }
    />
  );
};

export default CGMShaderBackground;

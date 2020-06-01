uniform vec3 colorA;
uniform vec3 colorB;

varying vec3 vUv;

void main() {
  //rgba, return blue
  // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  
  //interpolate between two input colors
  gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);

}

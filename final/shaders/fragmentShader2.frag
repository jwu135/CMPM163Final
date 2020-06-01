uniform vec3 red;
uniform vec3 green;
uniform vec3 blue;
uniform vec3 black;


varying vec3 vUv;

void main() {
  //rgba, return blue
  // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  
  //interpolate between three input colors
  //gl_FragColor = vec4(mix( mix(blue, red, vUv.x) ,green, vUv.y ), 1.0);
  gl_FragColor = vec4(mix(mix(mix(black, green ,vUv.y), mix(blue,black,vUv.y), vUv.z),
  					  mix(mix(red, black, vUv.z), mix(green,red,vUv.x), vUv.y), vUv.x), 1.0);
  					  
}

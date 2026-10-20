/** 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT). */
export const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+10.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 105.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

/**
 * Full-screen "living video": a domain-warped noise field whose time axis is
 * scrubbed by scroll position, with topographic contour lines that light up
 * with scroll velocity.
 */
export const backdropVert = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`

export const backdropFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime, uScroll, uVel;
uniform vec2 uMouse, uRes;
uniform vec3 uBase, uC1, uC2, uC3, uClick;
${NOISE}
float fbm(vec3 p){
  float a=.5, s=0.;
  for(int i=0;i<OCT;i++){
    s+=a*snoise(p);
    p=p*2.03+vec3(1.7,9.2,3.1);
    a*=.5;
  }
  return s;
}
float hash(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
void main(){
  float aspect = uRes.x/uRes.y;
  vec2 uv = vUv*2.-vec2(1.);
  uv.x *= aspect;

  // shockwave from the last press: a thin ring that expands and fades
  vec2 dc = uv - uClick.xy*vec2(aspect,1.);
  float ring = exp(-pow((length(dc)-uClick.z*1.9)*5.5,2.))*exp(-uClick.z*1.1);
  uv += normalize(dc+vec2(1e-5))*ring*.09;

  vec2 m = uMouse*vec2(aspect,1.);
  float d = length(uv-m);
  uv -= (uv-m)*exp(-d*2.4)*.12;

  float v = clamp(abs(uVel),0.,1.5);
  float t = uTime*.035;
  float z = uScroll*.34;
  vec3 p = vec3(uv*.72, z+t);

  vec2 q = vec2(fbm(p), fbm(p+vec3(5.2,1.3,2.8)));
  float f = fbm(p+vec3(q*1.7,0.)+vec3(0.,0.,t*3.));
  float body = smoothstep(-.35,.8,f);

  float w = fract(f*6.+q.x*1.5);
  float line = smoothstep(.0,.05,w)*(1.-smoothstep(.05,.13,w));

  vec3 col = uBase;
  col += mix(uC1,uC2,smoothstep(-.4,.6,q.x+f*.5))*pow(body,2.3)*.42;
  col += uC3*line*(.07+.45*v)*smoothstep(.15,.9,body+.15);
  col += uC1*exp(-d*d*1.6)*.07;
  col += (uC3*.55+uC1*.25)*ring;

  float vig = smoothstep(2.0,.35,length(vUv*2.-vec2(1.)));
  col *= mix(.3,1.,vig);
  col += (hash(gl_FragCoord.xy+fract(uTime)*100.)-.5)*.018;
  gl_FragColor = vec4(max(col,0.),1.);
}
`

/** Liquid iridescent blob: noise-displaced sphere with analytic normals. */
export const coreVert = /* glsl */ `
uniform float uTime, uAmp, uFreq;
varying vec3 vN;
varying vec3 vV;
varying float vD;
${NOISE}
float disp(vec3 p){
  return snoise(p*uFreq+vec3(0.,0.,uTime*.35)) + .5*snoise(p*uFreq*2.1-vec3(uTime*.2));
}
vec3 displaced(vec3 p){ return p + normalize(p)*disp(p)*uAmp; }
void main(){
  vec3 n = normalize(normal);
  vec3 t1 = abs(n.x)>abs(n.z) ? normalize(vec3(-n.y,n.x,0.)) : normalize(vec3(0.,-n.z,n.y));
  vec3 t2 = normalize(cross(n,t1));
  float e = .03;
  float r = length(position);
  vec3 p0 = displaced(position);
  vec3 p1 = displaced(normalize(position+t1*e)*r);
  vec3 p2 = displaced(normalize(position+t2*e)*r);
  vec3 nn = normalize(cross(p1-p0,p2-p0));
  if (dot(nn,n)<0.) nn = -nn;
  vD = disp(position);
  vN = normalize(normalMatrix*nn);
  vec4 mv = modelViewMatrix*vec4(p0,1.);
  vV = -mv.xyz;
  gl_Position = projectionMatrix*mv;
}
`

export const coreFrag = /* glsl */ `
precision highp float;
uniform vec3 uC1, uC2, uC3;
uniform float uTime, uGlow;
varying vec3 vN;
varying vec3 vV;
varying float vD;
void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(vV);
  float ndv = clamp(dot(N,V),0.,1.);
  float fres = pow(1.-ndv,2.2);
  vec3 irid = .5+.5*cos(6.28318*(vec3(0.,.33,.67)+vD*.35+fres*.8+uTime*.03));
  vec3 tint = mix(uC1,uC2,vD*.5+.5);
  vec3 L = normalize(vec3(.6,.8,.5));
  float diff = max(dot(N,L),0.);
  float spec = pow(max(dot(reflect(-L,N),V),0.),40.);
  float band = smoothstep(.42,.5,abs(fract(vD*3.5)-.5));
  vec3 col = tint*.05 + tint*diff*.22;
  col = mix(col, irid*tint*1.5 + uC3*.35, fres*.9);
  col += uC3*band*.12;
  col += spec*1.1;
  col += uC3*pow(fres,4.)*uGlow;
  gl_FragColor = vec4(col,1.);
}
`

export const planeVert = /* glsl */ `
uniform float uVel, uTime;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec3 p = position;
  float v = clamp(uVel,-2.,2.);
  p.z += sin(uv.x*3.14159)*v*.45 + sin(uv.y*3.14159+uTime*.8)*.04;
  gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.);
}
`

export const planeFrag = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform float uTexAspect, uPlaneAspect, uVel, uActive, uHover, uScroll;
uniform vec3 uC;
varying vec2 vUv;
void main(){
  // tall captures fit the plane's width and scroll vertically with uScroll;
  // wider ones are cropped to cover
  float r = uTexAspect/uPlaneAspect;
  float f = min(r,1.);
  vec2 uv = vec2(r>1. ? (vUv.x-.5)/r+.5 : vUv.x, (1.-f)*(1.-uScroll)+vUv.y*f);
  vec2 center = vec2(.5,(1.-f)*(1.-uScroll)+f*.5);
  uv = (uv-center)*(1.-.05*uHover-.03*uActive)+center;

  float sh = abs(uVel)*.012 + uHover*.004;
  vec3 col = vec3(texture2D(uTex,uv+vec2(sh,0.)).r, texture2D(uTex,uv).g, texture2D(uTex,uv-vec2(sh,0.)).b);

  float lum = dot(col,vec3(.299,.587,.114));
  col = mix(vec3(lum)*.55, col, .2+.8*uActive)*.82;
  col *= mix(.55,1.,smoothstep(0.,.55,vUv.y));

  vec2 p = (vUv-.5)*vec2(uPlaneAspect,1.);
  vec2 b = vec2(uPlaneAspect*.5,.5)-.05;
  float dist = length(max(abs(p)-b,0.))-.05;
  float alpha = 1.-smoothstep(-.003,.003,dist);
  float edge = smoothstep(.014,0.,abs(dist+.007));
  col += uC*edge*(.35+.9*uActive);
  gl_FragColor = vec4(col, alpha*(.35+.65*uActive));
}
`

export const portalFrag = /* glsl */ `
precision highp float;
uniform float uTime, uPower;
uniform vec3 uC1, uC2;
varying vec2 vUv;
${NOISE}
void main(){
  vec2 p = vUv*2.-vec2(1.);
  float r = length(p);
  float a = atan(p.y,p.x);
  float n = snoise(vec3(p*1.6,uTime*.25));
  float swirl = sin(a*3.+r*9.-uTime*1.1+n*3.)*.5+.5;
  float core = pow(1.-clamp(r,0.,1.),1.6);
  vec3 col = mix(uC1,uC2,swirl)*(.18+.9*core);
  float mask = smoothstep(1.,.9,r);
  gl_FragColor = vec4(col*uPower, mask*(.25+.75*core)*uPower);
}
`

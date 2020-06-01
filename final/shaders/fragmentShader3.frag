uniform vec3 red;
uniform vec3 green;
uniform vec3 blue;
uniform vec3 black;


varying vec3 vUv;

void main() {
  	//vec2 q = fragCoord.xy / iResolution.xy;
    vec2 q = vUv.xy;
    vec2 v = -1.0 + 2.0*q;
    //v.x *= iResolution.x/ iResolution.y;

	#if 0
    vec2 mo = -1.0 + 2.0*iMouse.xy / iResolution.xy;
    #else
	vec2 mo = vec2(iTime*.1,cos(iTime*.25)*3.);
	#endif

    // camera by iq
    vec3 org = 25.0*normalize(vec3(cos(2.75-3.0*mo.x), 0.7-1.0*(mo.y-1.0), sin(2.75-3.0*mo.x)));
	vec3 ta = vec3(0.0, 1.0, 0.0);
    vec3 ww = normalize( ta - org);
    vec3 uu = normalize(cross( vec3(0.0,1.0,0.0), ww ));
    vec3 vv = normalize(cross(ww,uu));
    vec3 dir = normalize( v.x*uu + v.y*vv + 1.5*ww );
	vec4 color=vec4(.0);
	
	
	
	const int nbSample = 64;
	const int nbSampleLight = 6;
	
	float zMax         = 40.;
	float step         = zMax/float(nbSample);
	float zMaxl         = 20.;
	float stepl         = zMaxl/float(nbSampleLight);
    vec3 p             = org;
    float T            = 1.;
    float absorption   = 100.;
	vec3 sun_direction = normalize( vec3(1.,.0,.0) );
    
	for(int i=0; i<nbSample; i++)
	{
		float density = scene(p);
		if(density>0.)
		{
			float tmp = density / float(nbSample);
			T *= 1. -tmp * absorption;
			if( T <= 0.01)
				break;
				
				
			 //Light scattering
			float Tl = 1.0;
			for(int j=0; j<nbSampleLight; j++)
			{
				float densityLight = scene( p + normalize(sun_direction)*float(j)*stepl);
				if(densityLight>0.)
                	Tl *= 1. - densityLight * absorption/float(nbSample);
                if (Tl <= 0.01)
                    break;
			}
			
			//Add ambiant + light scattering color
			color += vec4(1.)*50.*tmp*T +  vec4(1.,.7,.4,1.)*80.*tmp*T*Tl;
		}
		p += dir*step;
	}    


  	gl_FragColor = color;
  

}

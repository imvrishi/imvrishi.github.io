(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[671,945],{8945:function(n,t,a){"use strict";a.r(t),a.d(t,{default:function(){return w}});var o,e,i=800,r=800;i=window.innerWidth,r=window.innerHeight,o=document.querySelector("canvas"),e=o.getContext("2d"),o.onmousemove=function(n){v=!1,z(n.clientX,n.clientY)},o.ontouchmove=function(n){v=!0,z(n.touches[0].clientX,n.touches[0].clientY),n.preventDefault()},o.ontouchend=b,document.onmouseleave=b;var u,h,c,d,x=(i+r)/8,y=.2,f=50,m=1,s=[],l={x:0,y:0,tx:0,ty:0,z:5e-4},v=!1;function M(n){n.x=Math.random()*u,n.y=Math.random()*h}function z(n,t){if(Number.isFinite(c)&&Number.isFinite(d)){var a=n-c,o=t-d;l.tx=l.tx+a/8*m*(v?1:-1),l.ty=l.ty+o/8*m*(v?1:-1)}c=n,d=t}function b(){c=NaN,d=NaN}function w(){return null}!function(){for(var n=0;n<x;n++)s.push({x:0,y:0,z:y+.8*Math.random()})}(),m=window.devicePixelRatio||1,u=i*m,h=r*m,o.width=u,o.height=h,s.forEach(M),function n(){e.clearRect(0,0,u,h),l.tx*=.96,l.ty*=.96,l.x+=.8*(l.tx-l.x),l.y+=.8*(l.ty-l.y),s.forEach((function(n){n.x+=l.x*n.z,n.y+=l.y*n.z,n.x+=(n.x-u/2)*l.z*n.z,n.y+=(n.y-h/2)*l.z*n.z,n.z+=l.z,(n.x<-50||n.x>u+f||n.y<-50||n.y>h+f)&&function(n){var t="z",a=Math.abs(l.x),o=Math.abs(l.y);(a>1||o>1)&&(t="h"===(a>o?Math.random()<a/(a+o)?"h":"v":Math.random()<o/(a+o)?"v":"h")?l.x>0?"l":"r":l.y>0?"t":"b"),n.z=y+.8*Math.random(),"z"===t?(n.z=.1,n.x=Math.random()*u,n.y=Math.random()*h):"l"===t?(n.x=-50,n.y=h*Math.random()):"r"===t?(n.x=u+f,n.y=h*Math.random()):"t"===t?(n.x=u*Math.random(),n.y=-50):"b"===t&&(n.x=u*Math.random(),n.y=h+f)}(n)})),s.forEach((function(n){e.beginPath(),e.lineCap="round",e.lineWidth=3*n.z*m,e.strokeStyle="rgba(255,255,255,"+(.5+.5*Math.random())+")",e.beginPath(),e.moveTo(n.x,n.y);var t=2*l.x,a=2*l.y;Math.abs(t)<.1&&(t=.5),Math.abs(a)<.1&&(a=.5),e.lineTo(n.x+t,n.y+a),e.stroke()})),requestAnimationFrame(n)}()},2876:function(n,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/main",function(){return a(8945)}])}},function(n){n.O(0,[774,888,179],(function(){return t=2876,n(n.s=t);var t}));var t=n.O();_N_E=t}]);
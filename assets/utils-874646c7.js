import{V as n,W as a,r as i,X as u}from"./index-00932b33.js";function p(e){const{theme:s}=n(),t=a();return i.useMemo(()=>u(s.direction,{...t,...e}),[e,s.direction,t])}function l(e,s){var t,r;if(e!=null&&e.response&&((t=e.response)!=null&&t.data)&&((r=e.response.data)!=null&&r.errors))for(const o of e.response.data.errors)s({title:"Error!",description:o.message,status:"error",duration:3e3,isClosable:!0});else s({title:"Unknown error!",status:"error",duration:3e3,isClosable:!0})}function d(e){return e.replace(/\b\w/g,function(s){return s.toUpperCase()})}function f(e){return new Promise(s=>setTimeout(s,e))}export{d as c,l as e,f as s,p as u};
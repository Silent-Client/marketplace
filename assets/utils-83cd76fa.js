import{Z as _,$ as p,r as c,a0 as m}from"./index-34628936.js";function f(t){const{theme:i}=_(),n=p();return c.useMemo(()=>m(i.direction,{...n,...t}),[t,i.direction,n])}function l(t,i){var n,a;if(t!=null&&t.response&&((n=t.response)!=null&&n.data)&&((a=t.response.data)!=null&&a.errors))for(const o of t.response.data.errors)i({title:"Error!",description:o.message,status:"error",duration:3e3,isClosable:!0});else i({title:"Unknown error!",status:"error",duration:3e3,isClosable:!0})}function g(t){return t.replace(/\b\w/g,function(i){return i.toUpperCase()})}function h(t){return new Promise(i=>setTimeout(i,t))}function C(t){return(t==null?void 0:t.is_plus)===1||(t==null?void 0:t.is_admin)===1||(t==null?void 0:t.is_staff)===1||(t==null?void 0:t.is_tester)===1||(t==null?void 0:t.is_partner)===1||(t==null?void 0:t.is_retired)===1||(t==null?void 0:t.is_dev)===1||(t==null?void 0:t.is_manager)===1||(t==null?void 0:t.is_senior_tester)||(t==null?void 0:t.is_tester_manager)||(t==null?void 0:t.is_jr_admin)||(t==null?void 0:t.is_tech_support)||(t==null?void 0:t.is_senior_tech_support)}function P(t){return(t==null?void 0:t.is_premium_plus)===1||(t==null?void 0:t.is_admin)===1||(t==null?void 0:t.is_staff)===1||(t==null?void 0:t.is_tester)===1||(t==null?void 0:t.is_partner)===1||(t==null?void 0:t.is_retired)===1||(t==null?void 0:t.is_dev)===1||(t==null?void 0:t.is_manager)===1||(t==null?void 0:t.is_senior_tester)||(t==null?void 0:t.is_tester_manager)||(t==null?void 0:t.is_jr_admin)||(t==null?void 0:t.is_tech_support)||(t==null?void 0:t.is_senior_tech_support)}export{P as a,g as c,l as e,C as i,h as s,f as u};
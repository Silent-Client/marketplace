import{r as n,j as s,C as r,t as m,H as a,S as o,q as x,T as u,n as h}from"./index-ed535aa6.js";import{b as f}from"./index-8a324392.js";import{u as g,e as j}from"./utils-5c7b6136.js";import{u as C}from"./chunk-BBVTFCMB-651e14f7.js";import{S as b}from"./chunk-NEK3OOAM-db070d5a.js";function E(){const[c,l]=n.useState([]),[d,i]=C(!0),p=g();return n.useEffect(()=>{(async()=>{i.on();try{const{data:e}=await h.get("https://api.silentclient.net/store/cases");l(e.cases)}catch(e){j(e,p)}finally{i.off()}})()},[]),d?s.jsx(r,{w:"full",p:5,children:s.jsx(m,{size:"xl",color:"white"})}):s.jsxs(s.Fragment,{children:[s.jsx(r,{children:s.jsx(a,{children:"Cases"})}),s.jsx(b,{mt:5,columns:[1,2,3,3,4],spacing:2,children:c.map(t=>s.jsxs(o,{cursor:"pointer",direction:"column",spacing:2,bgColor:"#131313",p:4,transitionProperty:"var(--silentclient-transition-property-common)",transitionDuration:"var(--silentclient-transition-duration-normal)",transitionTimingFunction:"var(--silentclient-transition-easing-ease-out)",border:"2px solid",borderColor:"transparent",borderRadius:"xl",_hover:{borderColor:"white"},as:x,to:`/cases/${t.id}`,children:[s.jsx(r,{children:s.jsx(f.LazyLoadImage,{width:"230px",height:"230px",src:`https://api.silentclient.net${t.preview}`})}),s.jsxs(o,{alignItems:"center",direction:"row",justifyContent:"space-between",children:[s.jsx(a,{size:"sm",children:t.name}),s.jsxs(u,{fontSize:"md",opacity:"0.8",children:[(t.price/100).toFixed(2),"$"]})]})]}))})]})}export{E as default};
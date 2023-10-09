import{r as d,o as w,j as e,I as A,J as k,K as O,t as b,l as E,a as R,s as S,_ as B,A as T,e as z,w as F,S as y,L as H}from"./index-b9857d62.js";import{M as V}from"./Layout-dfb63f09.js";import{B as I}from"./chunk-UVUR7MCU-fdc8386a.js";import{j,w as _,T as $,M as G,k as J,f as K,l as W,u as q,a as Q,c as U,d as X,e as Y}from"./chunk-4FCEGNGT-78e016fa.js";import{I as Z}from"./chunk-QINAG4RG-e43e77dc.js";import"./chunk-BBVTFCMB-fd463af7.js";import"./utils-c0b7d60e.js";import"./chunk-6CVSDS6C-1069c691.js";import"./chunk-GCOAS5YC-4b81530d.js";import"./chunk-PULVB27S-5f5743b7.js";import"./chunk-Z6RXEUPO-c7d71795.js";function D(s){const{viewBox:o="0 0 24 24",d:n,displayName:r,defaultProps:a={}}=s,i=d.Children.toArray(s.path),l=w((t,c)=>e.jsx(A,{ref:c,viewBox:o,...a,...t,children:i.length?i:e.jsx("path",{fill:"currentColor",d:n})}));return l.displayName=r,l}var M={exit:{duration:.15,ease:$.easeInOut},enter:{type:"spring",damping:25,stiffness:180}},ee={exit:({direction:s,transition:o,transitionEnd:n,delay:r})=>{var a;const{exit:i}=j({direction:s});return{...i,transition:(a=o==null?void 0:o.exit)!=null?a:_.exit(M.exit,r),transitionEnd:n==null?void 0:n.exit}},enter:({direction:s,transitionEnd:o,transition:n,delay:r})=>{var a;const{enter:i}=j({direction:s});return{...i,transition:(a=n==null?void 0:n.enter)!=null?a:_.enter(M.enter,r),transitionEnd:o==null?void 0:o.enter}}},N=d.forwardRef(function(o,n){const{direction:r="right",style:a,unmountOnExit:i,in:l,className:t,transition:c,transitionEnd:u,delay:h,motionProps:x,...m}=o,p=j({direction:r}),f=Object.assign({position:"fixed"},p.position,a),g=i?l&&i:!0,v=l||i?"enter":"exit",C={transitionEnd:u,transition:c,direction:r,delay:h};return e.jsx(k,{custom:C,children:g&&e.jsx(O.div,{...m,ref:n,initial:"exit",className:b("chakra-slide",t),animate:v,exit:"exit",custom:C,variants:ee,style:f,...x})})});N.displayName="Slide";var L=w((s,o)=>{const{icon:n,children:r,isRound:a,"aria-label":i,...l}=s,t=n||r,c=d.isValidElement(t)?d.cloneElement(t,{"aria-hidden":!0,focusable:!1}):null;return e.jsx(I,{padding:"0",borderRadius:a?"full":void 0,ref:o,"aria-label":i,...l,children:c})});L.displayName="IconButton";var[te,ne]=E(),oe={start:{ltr:"left",rtl:"right"},end:{ltr:"right",rtl:"left"}};function ae(s,o){var n,r;if(s)return(r=(n=oe[s])==null?void 0:n[o])!=null?r:s}function se(s){var o;const{isOpen:n,onClose:r,placement:a="right",children:i,...l}=s,t=R(),c=(o=t.components)==null?void 0:o.Drawer,u=ae(a,t.direction);return e.jsx(te,{value:{placement:u},children:e.jsx(G,{isOpen:n,onClose:r,styleConfig:c,...l,children:i})})}var re=S(N),P=w((s,o)=>{const{className:n,children:r,motionProps:a,containerProps:i,...l}=s,{getDialogProps:t,getDialogContainerProps:c,isOpen:u}=J(),h=t(l,o),x=c(i),m=b("chakra-modal__content",n),p=K(),f={display:"flex",flexDirection:"column",position:"relative",width:"100%",outline:0,...p.dialog},g={display:"flex",width:"100vw",height:"$100vh",position:"fixed",left:0,top:0,...p.dialogContainer},{placement:v}=ne();return e.jsx(W,{children:e.jsx(S.div,{...x,className:"chakra-modal__content-container",__css:g,children:e.jsx(re,{motionProps:a,direction:v,in:u,className:m,...h,__css:f,children:r})})})});P.displayName="DrawerContent";var ie=D({displayName:"HamburgerIcon",viewBox:"0 0 24 24",d:"M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"}),le=D({d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",displayName:"ChevronRightIcon"});const ce=d.lazy(()=>B(()=>import("./AccountMenu-ee6fff2c.js"),["assets/AccountMenu-ee6fff2c.js","assets/index-b9857d62.js","assets/index-a1d4600f.css","assets/index-ced25b69.js","assets/chunk-UVUR7MCU-fdc8386a.js","assets/chunk-4FCEGNGT-78e016fa.js","assets/chunk-QINAG4RG-e43e77dc.js"]));function Ce(){const{isOpen:s,onOpen:o,onClose:n}=q(),r=d.useContext(T),a=z(),i=F(),l=({item:t})=>e.jsx(H,{onClick:c=>{c.preventDefault(),t.external?window.location.href=t.href:i(t.href),n()},w:"full",href:t.href,children:e.jsx(I,{w:"full",fontWeight:a.pathname===t.href?600:500,color:a.pathname===t.href?"white":"#d4d4d4",boxShadow:a.pathname===t.href?"md":"none",_hover:a.pathname===t.href?{bgColor:"#131313"}:void 0,bgColor:"#131313",justifyContent:"start",children:e.jsxs(y,{direction:"row",w:"full",justifyContent:"space-between",children:[e.jsx("span",{children:t.name}),e.jsx(le,{})]})})});return e.jsxs(e.Fragment,{children:[e.jsx(L,{"aria-label":"menu",icon:e.jsx(ie,{}),onClick:o}),e.jsxs(se,{isOpen:s,placement:"left",size:"full",onClose:n,children:[e.jsx(Q,{}),e.jsxs(P,{children:[e.jsxs(U,{bgColor:"black",children:[e.jsx(Z,{h:"39px",w:"auto",src:"https://assets.silentclient.net/logos/logo.svg",alt:"Silent Client Logo"}),e.jsx(X,{top:3,h:"39px",w:"39px"})]}),e.jsx(Y,{bgColor:"black",children:e.jsxs(y,{direction:"column",spacing:2,children:[V.map((t,c)=>e.jsx(l,{item:t},c)),r.props.account&&e.jsx(d.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(ce,{onItemClick:n,isMobile:!0})})||e.jsx(l,{item:{name:"Login",href:`https://auth.silentclient.net/login?redirect_url=${window.location.href}`,external:!0}})]})})]})]})]})}export{Ce as default};

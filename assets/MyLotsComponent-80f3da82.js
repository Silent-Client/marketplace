import{r as n,A as g,q as C,j as t,C as c,d as j,S as p,L as y,a as d,H as S}from"./index-850ea893.js";import{h as _}from"./moment-fbc5633a.js";import{u as k,e as m}from"./utils-5969ce37.js";import{M as v}from"./Main-3873b023.js";import{u as $}from"./chunk-BBVTFCMB-0c078931.js";import{B as x}from"./chunk-UVUR7MCU-b606223f.js";import{B as I}from"./chunk-PULVB27S-5dbba2b4.js";import"./chunk-QINAG4RG-0f620e44.js";import"./index-db3dcc24.js";import"./chunk-6CVSDS6C-3f5e88e9.js";import"./index-e13f1694.js";import"./chunk-5MKCW436-1391779d.js";import"./chunk-NEK3OOAM-6bd7f349.js";function F(){const r=n.useContext(g),[o,h]=n.useState([]),[u,i]=$(!0),s=k(),a=C(),l=async()=>{i.on();try{const{data:e}=await d.get("https://api.silentclient.net/marketplace/my_lots",{headers:{Authorization:`Bearer ${r.props.accessToken}`}});h(e.items)}catch(e){m(e,s)}finally{i.off()}};return n.useEffect(()=>{l()},[]),u?t.jsx(c,{w:"full",p:2,children:t.jsx(j,{size:"xl",color:"white"})}):(o==null?void 0:o.length)!==0?t.jsxs(p,{direction:"column",spacing:2,children:[t.jsx(x,{w:"full",h:"35px",fontSize:"xl",borderRadius:"8px",paddingInlineStart:6,paddingInlineEnd:6,_hover:{bgColor:"#202020"},_active:{bgColor:"#252525"},bgColor:"#131313",onClick:()=>a("/sell"),children:"Sell Item"}),o==null?void 0:o.map(e=>t.jsx(v,{name:e.item.name,description:`Listed on ${_(e.created_at).format("D MMMM")}`,price:`${(e.price/100).toFixed(2)}$`,preview:`https://api.silentclient.net${e.item.preview}`,href:`/listings/${e.item_type}/${e.item_id}`,footer:t.jsx(y,{opacity:"0.8",textDecoration:"underline",_hover:{opacity:"1"},fontSize:"md",onClick:async()=>{try{await d.post(`https://api.silentclient.net/marketplace/item/${e.item_type}/${e.item_id}/delete_lot`,{id:e.id},{headers:{Authorization:`Bearer ${r.props.accessToken}`}})}catch(f){m(f,s)}finally{l()}},children:"Remove"})}))]}):t.jsx(c,{minH:"48px",children:t.jsxs(p,{alignItems:"center",direction:"column",spacing:1,children:[t.jsx(S,{size:"sm",children:"Sell listings not found"}),t.jsx(I,{children:t.jsx(x,{borderRadius:"8px",paddingInlineStart:6,paddingInlineEnd:6,_hover:{bgColor:"#202020"},_active:{bgColor:"#252525"},bgColor:"#131313",h:"28px",fontSize:"md",onClick:()=>a("/sell"),children:"Sell Item"})})]})})}export{F as default};
import{g as f,k as l,l as _,o as w,j as e,m as i,n as j,r as p,A as T,C as v,d as C,H as u,S as b,b as S,T as L,a as D}from"./index-334d877a.js";import{h as k}from"./moment-fbc5633a.js";import{b as z}from"./index-4718dee4.js";import{u as N,e as E}from"./utils-20123f34.js";import{u as $}from"./chunk-BBVTFCMB-ede98c8d.js";import{C as A}from"./chunk-5MKCW436-f5794745.js";import{B}from"./chunk-Z6RXEUPO-e0b5e5b9.js";var[M,h]=f({name:"TableStylesContext",errorMessage:`useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `}),y=l((s,r)=>{const t=_("Table",s),{className:o,layout:d,...c}=w(s);return e.jsx(M,{value:t,children:e.jsx(i.table,{ref:r,__css:{tableLayout:d,...t.table},className:j("chakra-table",o),...c})})});y.displayName="Table";var P=l((s,r)=>{const t=h();return e.jsx(i.thead,{...s,ref:r,__css:t.thead})}),g=l((s,r)=>{const t=h();return e.jsx(i.tr,{...s,ref:r,__css:t.tr})}),W=l((s,r)=>{var t;const{overflow:o,overflowX:d,className:c,...a}=s;return e.jsx(i.div,{ref:r,className:j("chakra-table__container",c),...a,__css:{display:"block",whiteSpace:"nowrap",WebkitOverflowScrolling:"touch",overflowX:(t=o??d)!=null?t:"auto",overflowY:"hidden",maxWidth:"100%"}})}),H=l((s,r)=>{const t=h();return e.jsx(i.tbody,{...s,ref:r,__css:t.tbody})}),x=l(({isNumeric:s,...r},t)=>{const o=h();return e.jsx(i.td,{...r,ref:t,__css:o.td,"data-is-numeric":s})}),m=l(({isNumeric:s,...r},t)=>{const o=h();return e.jsx(i.th,{...r,ref:t,__css:o.th,"data-is-numeric":s})});function G(){const s=p.useContext(T),r=N(),[t,o]=p.useState([]),[d,c]=$(!0);return p.useEffect(()=>{(async()=>{c.on();try{const{data:n}=await D.get("https://api.silentclient.net/marketplace/my_deals",{headers:{Authorization:`Bearer ${s.props.accessToken}`}});o(n.items)}catch(n){E(n,r)}finally{c.off()}})()},[]),d?e.jsx(v,{w:"full",p:5,children:e.jsx(C,{size:"xl",color:"white"})}):e.jsxs(A,{maxW:"container.xl",textAlign:"center",children:[e.jsx(u,{children:"My Deals"}),t.length===0&&e.jsx(u,{mt:5,size:"sm",children:"Deals not found"})||e.jsx(W,{bgColor:"#131313",borderRadius:"xl",mt:5,children:e.jsxs(y,{variant:"simple",children:[e.jsx(P,{children:e.jsxs(g,{children:[e.jsx(m,{borderColor:"rgba(255, 255, 255, 0.5)",color:"white",opacity:"0.8",children:"ID"}),e.jsx(m,{borderColor:"rgba(255, 255, 255, 0.5)",color:"white",opacity:"0.8",children:"Type"}),e.jsx(m,{borderColor:"rgba(255, 255, 255, 0.5)",color:"white",opacity:"0.8",children:"Lot"}),e.jsx(m,{borderColor:"rgba(255, 255, 255, 0.5)",color:"white",opacity:"0.8",children:"Date"})]})}),e.jsx(H,{children:t.map((a,n)=>e.jsxs(g,{children:[e.jsxs(x,{borderColor:n===t.length-1?"transparent":"rgba(255, 255, 255, 0.5)",children:["#",a.id]}),e.jsxs(x,{borderColor:n===t.length-1?"transparent":"rgba(255, 255, 255, 0.5)",children:[a.status==="purchase"?"Purchase":"Sell"," ",!a.readed&&e.jsx(B,{colorScheme:"green",children:"NEW"})]}),e.jsx(x,{borderColor:n===t.length-1?"transparent":"rgba(255, 255, 255, 0.5)",children:e.jsxs(b,{w:"full",alignItems:"center",direction:"row",spacing:2,cursor:"pointer",as:S,to:`/listings/${a.lot.item_type}/${a.lot.item_id}`,children:[e.jsx(z.LazyLoadImage,{src:`https://api.silentclient.net${a.lot.item.preview}`,width:"40px",height:"40px"}),e.jsxs(b,{direction:"column",spacing:0,children:[e.jsx(u,{size:"sm",children:a.lot.item.name}),e.jsxs(L,{fontSize:"sm",opacity:"0.8",children:[(a.lot.price/100).toFixed(2),"$, by"," ",a.lot.user.username]})]})]})}),e.jsx(x,{borderColor:n===t.length-1?"transparent":"rgba(255, 255, 255, 0.5)",children:k(a.created_at).format("LLL")})]},n))})]})})]})}export{G as default};
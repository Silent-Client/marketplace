import{x as S,r as d,A as T,j as e,S as n,C as z,H as w,n as m,w as v,t as A,T as b}from"./index-ed535aa6.js";import{b as B}from"./index-8a324392.js";import{u as F,c as I,e as C}from"./utils-5c7b6136.js";import{R as O,L as P,C as U,X as E,Y as R,T as D,a as H,b as W}from"./LineChart-880bc30d.js";import{u as L}from"./chunk-BBVTFCMB-651e14f7.js";import{M as K,b as N,c as X,d as Y,e as q,f as G,u as J}from"./chunk-4FCEGNGT-f9c4b325.js";import{F as Q,I as V}from"./chunk-6CVSDS6C-b5939784.js";import{F as Z}from"./chunk-GCOAS5YC-7e459f55.js";import{B as y}from"./chunk-UVUR7MCU-21a34eee.js";import{C as ee}from"./chunk-5MKCW436-00c2ddc6.js";import{I as se}from"./chunk-QINAG4RG-154b9d90.js";function te({isOpen:i,onClose:f,type:c,item:s,getData:k}){const h=S(),[o,u]=d.useState(),[r,l]=L(!1),x=F(),p=d.useContext(T),[$,_]=d.useState([]),[j]=d.useState("week"),a=async()=>{try{const{data:t}=await m.get(`https://api.silentclient.net/marketplace/item/${h.type}/${h.id}/get_median_sales?type=${j}`);_(t.sales)}catch(t){C(t,x)}};return d.useEffect(()=>{a()},[j]),e.jsx(e.Fragment,{children:e.jsxs(K,{size:"2xl",isOpen:i,onClose:f,children:[e.jsx(N,{}),e.jsxs(X,{bgColor:"#131313",children:[e.jsxs(Y,{children:[I(c)," ",s==null?void 0:s.item.name]}),e.jsx(q,{}),e.jsx(G,{pt:0,mb:2,children:e.jsxs(n,{direction:"column",spacing:2,children:[$.length!==0&&e.jsx(O,{aspect:2.5,width:"100%",children:e.jsxs(P,{width:500,height:300,margin:{left:-25},data:$.map(t=>({name:t.date,Price:(t.median_price/100).toFixed(2)})),children:[e.jsx(U,{strokeDasharray:"3 3"}),e.jsx(E,{dataKey:"name"}),e.jsx(R,{}),e.jsx(D,{formatter:t=>t+"$",contentStyle:{background:"#151515",border:"none",borderRadius:"15px"}}),e.jsx(H,{}),e.jsx(W,{type:"monotone",dataKey:"Price",stroke:"white"})]})})||e.jsx(z,{children:e.jsx(w,{size:"sm",children:"Sales not found"})}),e.jsxs(Q,{children:[e.jsx(Z,{children:c==="order"?"Max price":"Price"}),e.jsx(V,{value:o,onChange:t=>u(t.currentTarget.value),placeholder:"Price"})]}),e.jsx(y,{onClick:async()=>{try{l.on();const{data:t}=await m.post(`https://api.silentclient.net/marketplace/item/${h.type}/${h.id}/${c==="sell"?"create_lot":"create_order"}`,{price:parseFloat((o==null?void 0:o.replaceAll(",","."))||"0")*100,max_price:parseFloat((o==null?void 0:o.replaceAll(",","."))||"0")*100},{headers:{Authorization:`Bearer ${p.props.accessToken}`}});f(),u(""),x({title:`${c==="order"?"Order":"Lot"} created!`,status:"success",duration:3e3,isClosable:!0}),c==="order"?t.order||x({title:"The order has been completed!",status:"success",duration:3e3,isClosable:!0}):t.lot.status==="sold"&&x({title:"The lot has been sold!",status:"success",duration:3e3,isClosable:!0})}catch(t){C(t,x)}finally{k(),p.updateUser(),l.off()}},isDisabled:r,children:I(c)})]})})]})]})})}function he(){var j;const i=S(),[f,c]=L(!0),[s,k]=d.useState(null),[h,o]=d.useState("sell"),u=J(),r=d.useContext(T),l=F(),x=v(),p=async a=>{a||c.on();try{const{data:t}=await m.get(`https://api.silentclient.net/marketplace/item/${i.type}/${i.id}`);k(t.info)}catch(t){C(t,l),x("/")}finally{c.off()}};d.useEffect(()=>{p(),r.updateUser();const a=setInterval(()=>{f||(p(!0),r.updateUser())},1e4);return()=>clearInterval(a)},[]);const $=(s==null?void 0:s.lots.length)!==0?(((s==null?void 0:s.lots[0].price)||0)/100).toFixed(2)+"$":"Unknown",_=(s==null?void 0:s.orders.length)!==0?(((s==null?void 0:s.orders[0].max_price)||0)/100).toFixed(2)+"$":"Unknown";return e.jsxs(e.Fragment,{children:[f&&e.jsx(z,{w:"full",p:5,children:e.jsx(A,{size:"xl",color:"white"})})||e.jsxs(ee,{maxW:"container.xl",children:[e.jsxs(n,{direction:["column","row"],justifyContent:"space-between",alignItems:"center",children:[e.jsxs(n,{alignItems:["start","center"],direction:["column","row"],spacing:3,children:[e.jsx(z,{bgColor:"#131313",borderRadius:"xl",p:2,children:e.jsx(se,{src:`https://api.silentclient.net${s==null?void 0:s.item.preview}`,w:["full","200px"],h:["auto","200px"]})}),e.jsxs(n,{direction:"column",spacing:1,children:[e.jsx(w,{size:"md",children:s==null?void 0:s.item.name}),e.jsx(b,{opacity:"0.8",fontSize:"md",children:s==null?void 0:s.item.category}),e.jsx(w,{size:"md",children:$})]})]}),e.jsxs(n,{maxW:["full","30%"],w:["full","auto"],alignItems:["start","center"],direction:"column",spacing:2,children:[e.jsxs(b,{fontSize:"md",children:[s==null?void 0:s.orders.length," ",e.jsx("span",{style:{opacity:"0.8"},children:"requests to buy at"})," ",_," ",e.jsx("span",{style:{opacity:"0.8"},children:"or lower"})]}),(s==null?void 0:s.orders.find(a=>{var t;return a.user_id===((t=r.props.account)==null?void 0:t.id)}))&&e.jsxs(e.Fragment,{children:[e.jsxs(b,{textAlign:"left",w:"full",children:["My order:"," ",((((j=s==null?void 0:s.orders.find(a=>{var t;return a.user_id===((t=r.props.account)==null?void 0:t.id)}))==null?void 0:j.max_price)||0)/100).toFixed(2),"$"]}),e.jsx(y,{w:"full",onClick:async()=>{const a=s==null?void 0:s.orders.find(t=>{var g;return t.user_id===((g=r.props.account)==null?void 0:g.id)});try{await m.post(`https://api.silentclient.net/marketplace/item/${i.type}/${i.id}/delete_order`,{id:a==null?void 0:a.id},{headers:{Authorization:`Bearer ${r.props.accessToken}`}}),l({title:"Order was canceled",status:"success",duration:3e3,isClosable:!0})}catch(t){C(t,l)}finally{p()}},size:"md",fontSize:"xl",children:"Cancel Order"})]})||e.jsx(y,{w:"full",onClick:()=>{r.props.account?(o("order"),u.onOpen()):window.location.href=`https://auth.silentclient.net/login?redirect_url=${window.location.href}`},size:"md",fontSize:"xl",children:"Order"})]})]}),e.jsx(n,{alignItems:"center",justifyContent:"center",direction:"row",spacing:5,mt:5,children:e.jsxs(n,{direction:"column",w:["full","70%"],spacing:2,children:[e.jsxs(n,{alignItems:"center",direction:"row",justifyContent:"space-between",children:[e.jsx(w,{size:"md",children:"Lots"}),e.jsx(y,{w:"100px",onClick:()=>{r.props.account?(o("sell"),u.onOpen()):window.location.href=`https://auth.silentclient.net/login?redirect_url=${window.location.href}`},children:"Sell Item"})]}),s==null?void 0:s.lots.map(a=>{var t;return e.jsxs(n,{direction:"row",justifyContent:"space-between",spacing:2,alignItems:["start","center"],children:[e.jsxs(n,{alignItems:"center",direction:"row",spacing:1,children:[e.jsx(B.LazyLoadImage,{src:`https://mc-heads.net/avatar/${a.user.username}.png`,width:"50px",height:"50px",className:"market-lot-avatar"}),e.jsxs(n,{direction:"column",spacing:0,children:[e.jsxs(w,{size:"sm",children:[(a.price/100).toFixed(2),"$"]}),e.jsxs(b,{opacity:"0.8",children:["by ",a.user.username]})]})]}),e.jsx(y,{onClick:async()=>{var g;try{if(a.user_id===((g=r.props.account)==null?void 0:g.id)){await m.post(`https://api.silentclient.net/marketplace/item/${i.type}/${i.id}/delete_lot`,{id:a.id},{headers:{Authorization:`Bearer ${r.props.accessToken}`}}),l({title:"Lot was canceled",status:"success",duration:3e3,isClosable:!0});return}await m.post(`https://api.silentclient.net/marketplace/item/${i.type}/${i.id}/buy_lot`,{id:a.id},{headers:{Authorization:`Bearer ${r.props.accessToken}`}}),l({title:"Lot was buyed",status:"success",duration:3e3,isClosable:!0})}catch(M){C(M,l)}finally{p(),r.updateUser()}},maxW:"100px",w:"full",children:a.user_id===((t=r.props.account)==null?void 0:t.id)?"Cancel":"Buy"})]})})]})})]}),e.jsx(te,{isOpen:u.isOpen,onClose:u.onClose,item:s,getData:p,type:h})]})}export{he as default};
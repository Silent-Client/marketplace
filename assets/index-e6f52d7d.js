import{r as i,l as Y,x as j}from"./index-34628936.js";import{m as w}from"./chunk-UVUR7MCU-b2dbaa10.js";var q=Object.defineProperty,H=(e,t,n)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,u=(e,t,n)=>(H(e,typeof t!="symbol"?t+"":t,n),n);function M(e){return e.sort((t,n)=>{const r=t.compareDocumentPosition(n);if(r&Node.DOCUMENT_POSITION_FOLLOWING||r&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(r&Node.DOCUMENT_POSITION_PRECEDING||r&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(r&Node.DOCUMENT_POSITION_DISCONNECTED||r&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0})}var J=e=>typeof e=="object"&&"nodeType"in e&&e.nodeType===Node.ELEMENT_NODE;function S(e,t,n){let r=e+1;return n&&r>=t&&(r=0),r}function U(e,t,n){let r=e-1;return n&&r<0&&(r=t),r}var k=typeof window<"u"?i.useLayoutEffect:i.useEffect,D=e=>e,Q=class{constructor(){u(this,"descendants",new Map),u(this,"register",e=>{if(e!=null)return J(e)?this.registerNode(e):t=>{this.registerNode(t,e)}}),u(this,"unregister",e=>{this.descendants.delete(e);const t=M(Array.from(this.descendants.keys()));this.assignIndex(t)}),u(this,"destroy",()=>{this.descendants.clear()}),u(this,"assignIndex",e=>{this.descendants.forEach(t=>{const n=e.indexOf(t.node);t.index=n,t.node.dataset.index=t.index.toString()})}),u(this,"count",()=>this.descendants.size),u(this,"enabledCount",()=>this.enabledValues().length),u(this,"values",()=>Array.from(this.descendants.values()).sort((t,n)=>t.index-n.index)),u(this,"enabledValues",()=>this.values().filter(e=>!e.disabled)),u(this,"item",e=>{if(this.count()!==0)return this.values()[e]}),u(this,"enabledItem",e=>{if(this.enabledCount()!==0)return this.enabledValues()[e]}),u(this,"first",()=>this.item(0)),u(this,"firstEnabled",()=>this.enabledItem(0)),u(this,"last",()=>this.item(this.descendants.size-1)),u(this,"lastEnabled",()=>{const e=this.enabledValues().length-1;return this.enabledItem(e)}),u(this,"indexOf",e=>{var t,n;return e&&(n=(t=this.descendants.get(e))==null?void 0:t.index)!=null?n:-1}),u(this,"enabledIndexOf",e=>e==null?-1:this.enabledValues().findIndex(t=>t.node.isSameNode(e))),u(this,"next",(e,t=!0)=>{const n=S(e,this.count(),t);return this.item(n)}),u(this,"nextEnabled",(e,t=!0)=>{const n=this.item(e);if(!n)return;const r=this.enabledIndexOf(n.node),a=S(r,this.enabledCount(),t);return this.enabledItem(a)}),u(this,"prev",(e,t=!0)=>{const n=U(e,this.count()-1,t);return this.item(n)}),u(this,"prevEnabled",(e,t=!0)=>{const n=this.item(e);if(!n)return;const r=this.enabledIndexOf(n.node),a=U(r,this.enabledCount()-1,t);return this.enabledItem(a)}),u(this,"registerNode",(e,t)=>{if(!e||this.descendants.has(e))return;const n=Array.from(this.descendants.keys()).concat(e),r=M(n);t!=null&&t.disabled&&(t.disabled=!!t.disabled);const a={node:e,index:-1,...t};this.descendants.set(e,a),this.assignIndex(r)})}};function Z(){const e=i.useRef(new Q);return k(()=>()=>e.current.destroy()),e.current}var[$,L]=Y({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"});function ee(e){const t=L(),[n,r]=i.useState(-1),a=i.useRef(null);k(()=>()=>{a.current&&t.unregister(a.current)},[]),k(()=>{if(!a.current)return;const o=Number(a.current.dataset.index);n!=o&&!Number.isNaN(o)&&r(o)});const d=D(e?t.register(e):t.register);return{descendants:t,index:n,enabledIndex:t.enabledIndexOf(a.current),register:w(d,a)}}function ae(){return[D($),()=>D(L()),()=>Z(),a=>ee(a)]}function te(){const e=i.useRef(new Map),t=e.current,n=i.useCallback((a,d,o,l)=>{e.current.set(o,{type:d,el:a,options:l}),a.addEventListener(d,o,l)},[]),r=i.useCallback((a,d,o,l)=>{a.removeEventListener(d,o,l),e.current.delete(o)},[]);return i.useEffect(()=>()=>{t.forEach((a,d)=>{r(a.el,a.type,d,a.options)})},[r,t]),{add:n,remove:r}}function g(e){const t=e.target,{tagName:n,isContentEditable:r}=t;return n!=="INPUT"&&n!=="TEXTAREA"&&r!==!0}function ue(e={}){const{ref:t,isDisabled:n,isFocusable:r,clickOnEnter:a=!0,clickOnSpace:d=!0,onMouseDown:o,onMouseUp:l,onClick:N,onKeyDown:m,onKeyUp:x,tabIndex:y,onMouseOver:C,onMouseLeave:I,...P}=e,[c,A]=i.useState(!0),[b,h]=i.useState(!1),f=te(),K=s=>{s&&s.tagName!=="BUTTON"&&A(!1)},R=c?y:y||0,E=n&&!r,T=i.useCallback(s=>{if(n){s.stopPropagation(),s.preventDefault();return}s.currentTarget.focus(),N==null||N(s)},[n,N]),v=i.useCallback(s=>{b&&g(s)&&(s.preventDefault(),s.stopPropagation(),h(!1),f.remove(document,"keyup",v,!1))},[b,f]),V=i.useCallback(s=>{if(m==null||m(s),n||s.defaultPrevented||s.metaKey||!g(s.nativeEvent)||c)return;const p=a&&s.key==="Enter";d&&s.key===" "&&(s.preventDefault(),h(!0)),p&&(s.preventDefault(),s.currentTarget.click()),f.add(document,"keyup",v,!1)},[n,c,m,a,d,f,v]),B=i.useCallback(s=>{if(x==null||x(s),n||s.defaultPrevented||s.metaKey||!g(s.nativeEvent)||c)return;d&&s.key===" "&&(s.preventDefault(),h(!1),s.currentTarget.click())},[d,c,n,x]),O=i.useCallback(s=>{s.button===0&&(h(!1),f.remove(document,"mouseup",O,!1))},[f]),F=i.useCallback(s=>{if(s.button!==0)return;if(n){s.stopPropagation(),s.preventDefault();return}c||h(!0),s.currentTarget.focus({preventScroll:!0}),f.add(document,"mouseup",O,!1),o==null||o(s)},[n,c,o,f,O]),z=i.useCallback(s=>{s.button===0&&(c||h(!1),l==null||l(s))},[l,c]),G=i.useCallback(s=>{if(n){s.preventDefault();return}C==null||C(s)},[n,C]),W=i.useCallback(s=>{b&&(s.preventDefault(),h(!1)),I==null||I(s)},[b,I]),_=w(t,K);return c?{...P,ref:_,type:"button","aria-disabled":E?void 0:n,disabled:E,onClick:T,onMouseDown:o,onMouseUp:l,onKeyUp:x,onKeyDown:m,onMouseOver:C,onMouseLeave:I}:{...P,ref:_,role:"button","data-active":j(b),"aria-disabled":n?"true":void 0,tabIndex:E?void 0:R,onClick:T,onMouseDown:F,onMouseUp:z,onKeyUp:B,onKeyDown:V,onMouseOver:G,onMouseLeave:W}}function ie(e){const{wasSelected:t,enabled:n,isSelected:r,mode:a="unmount"}=e;return!!(!n||r||a==="keepMounted"&&t)}export{ae as c,ie as l,ue as u};
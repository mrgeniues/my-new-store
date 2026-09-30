(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();class ga{constructor(e,t="#app"){this.routes=e,this.root=document.querySelector(t),this.currentRoute=null,window.addEventListener("hashchange",()=>this.handleRouting()),window.addEventListener("load",()=>this.handleRouting())}getRouteInfo(){let t=window.location.hash.slice(1)||"/",i="";const n=t.indexOf("#");n!==-1&&(i=t.slice(n+1),t=t.slice(0,n));const[a,s]=t.split("?"),o=a.startsWith("/")?a:`/${a}`,l=new URLSearchParams(s||"");return i&&!l.has("section")&&l.set("section",i),{path:o,params:l,anchor:i}}navigate(e,t={}){let i=e.startsWith("/")?e:`/${e}`;const n=new URLSearchParams(t).toString();n&&(i+=`?${n}`),window.location.hash=i}async handleRouting(){const{path:e,params:t}=this.getRouteInfo();let i=null,n={};for(const[a,s]of Object.entries(this.routes)){if(a===e){i=s;break}const o=a.split("/"),l=e.split("/");if(o.length===l.length){let c=!0;const d={};for(let u=0;u<o.length;u++)if(o[u].startsWith(":")){const p=o[u].slice(1);d[p]=decodeURIComponent(l[u])}else if(o[u]!==l[u]){c=!1;break}if(c){i=s,n=d;break}}}i||(i=this.routes["*"]||this.routes["/"]),this.currentRoute=e,window.scrollTo(0,0),this.root&&await i(this.root,{pathParams:n,queryParams:t,router:this})}}function kr(r,e){var t={};for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,i=Object.getOwnPropertySymbols(r);n<i.length;n++)e.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(r,i[n])&&(t[i[n]]=r[i[n]]);return t}function ma(r,e,t,i){function n(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{c(i.next(d))}catch(u){s(u)}}function l(d){try{c(i.throw(d))}catch(u){s(u)}}function c(d){d.done?a(d.value):n(d.value).then(o,l)}c((i=i.apply(r,e||[])).next())})}const fa=r=>r?(...e)=>r(...e):(...e)=>fetch(...e);class li extends Error{constructor(e,t="FunctionsError",i){super(e),this.name=t,this.context=i}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class va extends li{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Pi extends li{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Ri extends li{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var qr;(function(r){r.Any="any",r.ApNortheast1="ap-northeast-1",r.ApNortheast2="ap-northeast-2",r.ApSouth1="ap-south-1",r.ApSoutheast1="ap-southeast-1",r.ApSoutheast2="ap-southeast-2",r.CaCentral1="ca-central-1",r.EuCentral1="eu-central-1",r.EuWest1="eu-west-1",r.EuWest2="eu-west-2",r.EuWest3="eu-west-3",r.SaEast1="sa-east-1",r.UsEast1="us-east-1",r.UsWest1="us-west-1",r.UsWest2="us-west-2"})(qr||(qr={}));class ya{constructor(e,{headers:t={},customFetch:i,region:n=qr.Any}={}){this.url=e,this.headers=t,this.region=n,this.fetch=fa(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return ma(this,arguments,void 0,function*(t,i={}){var n;let a,s;try{const{headers:o,method:l,body:c,signal:d,timeout:u}=i;let p={},{region:h}=i;h||(h=this.region);const m=new URL(`${this.url}/${t}`);h&&h!=="any"&&(p["x-region"]=h,m.searchParams.set("forceFunctionRegion",h));let f;const v=!!o&&Object.keys(o).some(I=>I.toLowerCase()==="content-type");c&&!v?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",f=c):typeof c=="string"?(p["Content-Type"]="text/plain",f=c):typeof FormData<"u"&&c instanceof FormData?f=c:(p["Content-Type"]="application/json",f=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?f=JSON.stringify(c):f=c;let y=d;u&&(s=new AbortController,a=setTimeout(()=>s.abort(),u),d?(y=s.signal,d.addEventListener("abort",()=>s.abort())):y=s.signal);const w=yield this.fetch(m.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),o),body:f,signal:y}).catch(I=>{throw new va(I)}),k=w.headers.get("x-relay-error");if(k&&k==="true")throw new Pi(w);if(!w.ok)throw new Ri(w);let P=((n=w.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),D;return P==="application/json"?D=yield w.json():P==="application/octet-stream"||P==="application/pdf"?D=yield w.blob():P==="text/event-stream"?D=w:P==="multipart/form-data"?D=yield w.formData():D=yield w.text(),{data:D,error:null,response:w}}catch(o){return{data:null,error:o,response:o instanceof Ri||o instanceof Pi?o.context:void 0}}finally{a&&clearTimeout(a)}})}}const $n=3,Li=r=>Math.min(1e3*2**r,3e4),ba=[520,503],Cn=["GET","HEAD","OPTIONS"];var Oi=class extends Error{constructor(r){super(r.message),this.name="PostgrestError",this.details=r.details,this.hint=r.hint,this.code=r.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function Ui(r,e){return new Promise(t=>{if(e!=null&&e.aborted){t();return}const i=setTimeout(()=>{e==null||e.removeEventListener("abort",n),t()},r);function n(){clearTimeout(i),t()}e==null||e.addEventListener("abort",n)})}function wa(r,e,t,i){return!(!i||t>=$n||!Cn.includes(r)||!ba.includes(e))}var ka=class{constructor(r){var e,t,i,n,a;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=r.method,this.url=r.url,this.headers=new Headers(r.headers),this.schema=r.schema,this.body=r.body,this.shouldThrowOnError=(e=r.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=r.signal,this.isMaybeSingle=(t=r.isMaybeSingle)!==null&&t!==void 0?t:!1,this.shouldStripNulls=(i=r.shouldStripNulls)!==null&&i!==void 0?i:!1,this.urlLengthLimit=(n=r.urlLengthLimit)!==null&&n!==void 0?n:8e3,this.retryEnabled=(a=r.retry)!==null&&a!==void 0?a:!0,r.fetch?this.fetch=r.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(r,e){return this.headers=new Headers(this.headers),this.headers.set(r,e),this}retry(r){return this.retryEnabled=r,this}then(r,e){var t=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const s=this.headers.get("Accept");s==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!s||s==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const i=this.fetch;let a=(async()=>{let s=0;for(;;){const c={};t.headers.forEach((u,p)=>{c[p]=u}),s>0&&(c["X-Retry-Count"]=String(s));let d;try{d=await i(t.url.toString(),{method:t.method,headers:c,body:JSON.stringify(t.body,(u,p)=>typeof p=="bigint"?p.toString():p),signal:t.signal})}catch(u){if((u==null?void 0:u.name)==="AbortError"||(u==null?void 0:u.code)==="ABORT_ERR"||!Cn.includes(t.method))throw u;if(t.retryEnabled&&s<$n){const p=Li(s);s++,await Ui(p,t.signal);continue}throw u}if(wa(t.method,d.status,s,t.retryEnabled)){var o,l;const u=(o=(l=d.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,p=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:Li(s);await d.text(),s++,await Ui(p,t.signal);continue}return await t.processResponse(d)}})();return this.shouldThrowOnError||(a=a.catch(s=>{var o;let l="",c="",d="";const u=s==null?void 0:s.cause;if(u){var p,h,m,f;const w=(p=u==null?void 0:u.message)!==null&&p!==void 0?p:"",k=(h=u==null?void 0:u.code)!==null&&h!==void 0?h:"";l=`${(m=s==null?void 0:s.name)!==null&&m!==void 0?m:"FetchError"}: ${s==null?void 0:s.message}`,l+=`

Caused by: ${(f=u==null?void 0:u.name)!==null&&f!==void 0?f:"Error"}: ${w}`,k&&(l+=` (${k})`),u!=null&&u.stack&&(l+=`
${u.stack}`)}else{var v;l=(v=s==null?void 0:s.stack)!==null&&v!==void 0?v:""}const y=this.url.toString().length;return(s==null?void 0:s.name)==="AbortError"||(s==null?void 0:s.code)==="ABORT_ERR"?(d="",c="Request was aborted (timeout or manual cancellation)",y>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${y} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",c="HTTP headers exceeded server limits (typically 16KB)",y>this.urlLengthLimit&&(c+=`. Your request URL is ${y} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=s==null?void 0:s.name)!==null&&o!==void 0?o:"FetchError"}: ${s==null?void 0:s.message}`,details:l,hint:c,code:d},data:null,count:null,status:0,statusText:""}})),a.then(r,e)}async processResponse(r){var e=this;let t=null,i=null,n=null,a=r.status,s=r.statusText;if(r.ok){var o,l;if(e.method!=="HEAD"){var c;const p=await r.text();if(p!=="")if(e.headers.get("Accept")==="text/csv")i=p;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))i=p;else try{i=JSON.parse(p)}catch{if(t={message:p},i=null,e.shouldThrowOnError)throw new Oi({message:p,details:"",hint:"",code:""})}}const d=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),u=(l=r.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");d&&u&&u.length>1&&(n=parseInt(u[1])),e.isMaybeSingle&&Array.isArray(i)&&(i.length>1?(t={code:"PGRST116",details:`Results contain ${i.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},i=null,n=null,a=406,s="Not Acceptable"):i.length===1?i=i[0]:i=null)}else{const d=await r.text();try{t=JSON.parse(d),Array.isArray(t)&&r.status===404&&(i=[],t=null,a=200,s="OK")}catch{r.status===404&&d===""?(a=204,s="No Content"):t={message:d}}if(t&&e.shouldThrowOnError)throw new Oi(t)}return{success:t===null,error:t,data:i,count:n,status:a,statusText:s}}returns(){return this}overrideTypes(){return this}},xa=class extends ka{throwOnError(){return super.throwOnError()}select(r){let e=!1;const t=(r??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",t),this.headers.append("Prefer","return=representation"),this}order(r,{ascending:e=!0,nullsFirst:t,foreignTable:i,referencedTable:n=i}={}){const a=n?`${n}.order`:"order",s=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${s?`${s},`:""}${r}.${e?"asc":"desc"}${t===void 0?"":t?".nullsfirst":".nullslast"}`),this}limit(r,{foreignTable:e,referencedTable:t=e}={}){const i=typeof t>"u"?"limit":`${t}.limit`;return this.url.searchParams.set(i,`${r}`),this}range(r,e,{foreignTable:t,referencedTable:i=t}={}){const n=typeof i>"u"?"offset":`${i}.offset`,a=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(n,`${r}`),this.url.searchParams.set(a,`${e-r+1}`),this}abortSignal(r){return this.signal=r,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:r=!1,verbose:e=!1,settings:t=!1,buffers:i=!1,wal:n=!1,format:a="text"}={}){var s;const o=[r?"analyze":null,e?"verbose":null,t?"settings":null,i?"buffers":null,n?"wal":null].filter(Boolean).join("|"),l=(s=this.headers.get("Accept"))!==null&&s!==void 0?s:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(r){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${r}`),this}};const Bi=new RegExp("[,()]");var mt=class extends xa{throwOnError(){return super.throwOnError()}eq(r,e){return this.url.searchParams.append(r,`eq.${e}`),this}neq(r,e){return this.url.searchParams.append(r,`neq.${e}`),this}gt(r,e){return this.url.searchParams.append(r,`gt.${e}`),this}gte(r,e){return this.url.searchParams.append(r,`gte.${e}`),this}lt(r,e){return this.url.searchParams.append(r,`lt.${e}`),this}lte(r,e){return this.url.searchParams.append(r,`lte.${e}`),this}like(r,e){return this.url.searchParams.append(r,`like.${e}`),this}likeAllOf(r,e){return this.url.searchParams.append(r,`like(all).{${e.join(",")}}`),this}likeAnyOf(r,e){return this.url.searchParams.append(r,`like(any).{${e.join(",")}}`),this}ilike(r,e){return this.url.searchParams.append(r,`ilike.${e}`),this}ilikeAllOf(r,e){return this.url.searchParams.append(r,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(r,e){return this.url.searchParams.append(r,`ilike(any).{${e.join(",")}}`),this}regexMatch(r,e){return this.url.searchParams.append(r,`match.${e}`),this}regexIMatch(r,e){return this.url.searchParams.append(r,`imatch.${e}`),this}is(r,e){return this.url.searchParams.append(r,`is.${e}`),this}isDistinct(r,e){return this.url.searchParams.append(r,`isdistinct.${e}`),this}in(r,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Bi.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(r,`in.(${t})`),this}notIn(r,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Bi.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(r,`not.in.(${t})`),this}contains(r,e){return typeof e=="string"?this.url.searchParams.append(r,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(r,`cs.{${e.join(",")}}`):this.url.searchParams.append(r,`cs.${JSON.stringify(e)}`),this}containedBy(r,e){return typeof e=="string"?this.url.searchParams.append(r,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(r,`cd.{${e.join(",")}}`):this.url.searchParams.append(r,`cd.${JSON.stringify(e)}`),this}rangeGt(r,e){return this.url.searchParams.append(r,`sr.${e}`),this}rangeGte(r,e){return this.url.searchParams.append(r,`nxl.${e}`),this}rangeLt(r,e){return this.url.searchParams.append(r,`sl.${e}`),this}rangeLte(r,e){return this.url.searchParams.append(r,`nxr.${e}`),this}rangeAdjacent(r,e){return this.url.searchParams.append(r,`adj.${e}`),this}overlaps(r,e){return typeof e=="string"?this.url.searchParams.append(r,`ov.${e}`):this.url.searchParams.append(r,`ov.{${e.join(",")}}`),this}textSearch(r,e,{config:t,type:i}={}){let n="";i==="plain"?n="pl":i==="phrase"?n="ph":i==="websearch"&&(n="w");const a=t===void 0?"":`(${t})`;return this.url.searchParams.append(r,`${n}fts${a}.${e}`),this}match(r){return Object.entries(r).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(r,e,t){return this.url.searchParams.append(r,`not.${e}.${t}`),this}or(r,{foreignTable:e,referencedTable:t=e}={}){const i=t?`${t}.or`:"or";return this.url.searchParams.append(i,`(${r})`),this}filter(r,e,t){return this.url.searchParams.append(r,`${e}.${t}`),this}},Sa=class{constructor(r,{headers:e={},schema:t,fetch:i,urlLengthLimit:n=8e3,retry:a}){this.url=r,this.headers=new Headers(e),this.schema=t,this.fetch=i,this.urlLengthLimit=n,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(r,e){const{head:t=!1,count:i}=e??{},n=t?"HEAD":"GET";let a=!1;const s=(r??"*").split("").map(c=>/\s/.test(c)&&!a?"":(c==='"'&&(a=!a),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",s),i&&l.append("Prefer",`count=${i}`),new mt({method:n,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(r,{count:e,defaultToNull:t=!0}={}){var i;const n="POST",{url:a,headers:s}=this.cloneRequestState();if(e&&s.append("Prefer",`count=${e}`),t||s.append("Prefer","missing=default"),Array.isArray(r)){const o=r.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);a.searchParams.set("columns",l.join(","))}}return new mt({method:n,url:a,headers:s,schema:this.schema,body:r,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(r,{onConflict:e,ignoreDuplicates:t=!1,count:i,defaultToNull:n=!0}={}){var a;const s="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${t?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),n||l.append("Prefer","missing=default"),Array.isArray(r)){const c=r.reduce((d,u)=>d.concat(Object.keys(u)),[]);if(c.length>0){const d=[...new Set(c)].map(u=>`"${u}"`);o.searchParams.set("columns",d.join(","))}}return new mt({method:s,url:o,headers:l,schema:this.schema,body:r,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(r,{count:e}={}){var t;const i="PATCH",{url:n,headers:a}=this.cloneRequestState();return e&&a.append("Prefer",`count=${e}`),new mt({method:i,url:n,headers:a,schema:this.schema,body:r,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:r}={}){var e;const t="DELETE",{url:i,headers:n}=this.cloneRequestState();return r&&n.append("Prefer",`count=${r}`),new mt({method:t,url:i,headers:n,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function Dt(r){"@babel/helpers - typeof";return Dt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Dt(r)}function _a(r,e){if(Dt(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var i=t.call(r,e);if(Dt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Aa(r){var e=_a(r,"string");return Dt(e)=="symbol"?e:e+""}function Ta(r,e,t){return(e=Aa(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Di(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);e&&(i=i.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),t.push.apply(t,i)}return t}function Jt(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Di(Object(t),!0).forEach(function(i){Ta(r,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Di(Object(t)).forEach(function(i){Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(t,i))})}return r}var Ea=class In{constructor(e,{headers:t={},schema:i,fetch:n,timeout:a,urlLengthLimit:s=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=i,this.urlLengthLimit=s;const l=n??globalThis.fetch;a!==void 0&&a>0?this.fetch=(c,d)=>{const u=new AbortController,p=setTimeout(()=>u.abort(),a),h=d==null?void 0:d.signal;if(h){if(h.aborted)return clearTimeout(p),l(c,d);const m=()=>{clearTimeout(p),u.abort()};return h.addEventListener("abort",m,{once:!0}),l(c,Jt(Jt({},d),{},{signal:u.signal})).finally(()=>{clearTimeout(p),h.removeEventListener("abort",m)})}return l(c,Jt(Jt({},d),{},{signal:u.signal})).finally(()=>clearTimeout(p))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Sa(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new In(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,t={},{head:i=!1,get:n=!1,count:a}={}){var s;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=h=>h!==null&&typeof h=="object"&&(!Array.isArray(h)||h.some(d)),u=i&&Object.values(t).some(d);u?(o="POST",c=t):i||n?(o=i?"HEAD":"GET",Object.entries(t).filter(([h,m])=>m!==void 0).map(([h,m])=>[h,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([h,m])=>{l.searchParams.append(h,m)})):(o="POST",c=t);const p=new Headers(this.headers);return u?p.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&p.set("Prefer",`count=${a}`),new mt({method:o,url:l,headers:p,schema:this.schemaName,body:c,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class $a{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const t=globalThis;if(typeof globalThis<"u"&&typeof t.WebSocket<"u")return{type:"native",wsConstructor:t.WebSocket};const i=typeof global<"u"?global:void 0;if(i&&typeof i.WebSocket<"u")return{type:"native",wsConstructor:i.WebSocket};if(typeof globalThis<"u"&&typeof t.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&t.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const n=globalThis.process;if(n){const a=n.versions;if(a&&a.node){const s=a.node,o=parseInt(s.replace(/^v/,"").split(".")[0]);return o>=22?typeof globalThis.WebSocket<"u"?{type:"native",wsConstructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${o} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${o} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const Ca="2.109.0",Ia=`realtime-js/${Ca}`,Pa="1.0.0",Pn="2.0.0",Ra=Pn,La=1e4,Oa=100,Ye={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Rn={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},Hr={connecting:"connecting",closing:"closing",closed:"closed"};class Ua{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,i;const n=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,n)}_encodeJsonUserBroadcastPush(e){var t,i;const n=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:{},s=new TextEncoder().encode(JSON.stringify(n)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,s)}_encodeUserBroadcastPush(e,t,i){var n,a;const s=e.topic,o=(n=e.ref)!==null&&n!==void 0?n:"",l=(a=e.join_ref)!==null&&a!==void 0?a:"",c=e.payload.event,d=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},u=Object.keys(d).length===0?"":JSON.stringify(d);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(s.length>255)throw new Error(`topic length ${s.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const p=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+s.length+c.length+u.length,h=new ArrayBuffer(this.HEADER_LENGTH+p);let m=new DataView(h),f=0;m.setUint8(f++,this.KINDS.userBroadcastPush),m.setUint8(f++,l.length),m.setUint8(f++,o.length),m.setUint8(f++,s.length),m.setUint8(f++,c.length),m.setUint8(f++,u.length),m.setUint8(f++,t),Array.from(l,y=>m.setUint8(f++,y.charCodeAt(0))),Array.from(o,y=>m.setUint8(f++,y.charCodeAt(0))),Array.from(s,y=>m.setUint8(f++,y.charCodeAt(0))),Array.from(c,y=>m.setUint8(f++,y.charCodeAt(0))),Array.from(u,y=>m.setUint8(f++,y.charCodeAt(0)));var v=new Uint8Array(h.byteLength+i.byteLength);return v.set(new Uint8Array(h),0),v.set(new Uint8Array(i),h.byteLength),v.buffer}decode(e,t){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return t(i)}if(typeof e=="string"){const i=JSON.parse(e),[n,a,s,o,l]=i;return t({join_ref:n,ref:a,topic:s,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),i=t.getUint8(0),n=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,n)}}_decodeUserBroadcast(e,t,i){const n=t.getUint8(1),a=t.getUint8(2),s=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+n));l=l+n;const d=i.decode(e.slice(l,l+a));l=l+a;const u=i.decode(e.slice(l,l+s));l=l+s;const p=e.slice(l,e.byteLength),h=o===this.JSON_ENCODING?JSON.parse(i.decode(p)):p,m={type:this.BROADCAST_EVENT,event:d,payload:h};return s>0&&(m.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:m}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>t.includes(i)))}}var Z;(function(r){r.abstime="abstime",r.bool="bool",r.date="date",r.daterange="daterange",r.float4="float4",r.float8="float8",r.int2="int2",r.int4="int4",r.int4range="int4range",r.int8="int8",r.int8range="int8range",r.json="json",r.jsonb="jsonb",r.money="money",r.numeric="numeric",r.oid="oid",r.reltime="reltime",r.text="text",r.time="time",r.timestamp="timestamp",r.timestamptz="timestamptz",r.timetz="timetz",r.tsrange="tsrange",r.tstzrange="tstzrange"})(Z||(Z={}));const Ni=(r,e,t={})=>{var i;const n=(i=t.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((a,s)=>(a[s]=Ba(s,r,e,n),a),{}):{}},Ba=(r,e,t,i)=>{const n=e.find(o=>o.name===r),a=n==null?void 0:n.type,s=t[r];return a&&!i.includes(a)?Ln(a,s):Fr(s)},Ln=(r,e)=>{if(r.charAt(0)==="_"){const t=r.slice(1,r.length);return ja(e,t)}switch(r){case Z.bool:return Da(e);case Z.float4:case Z.float8:case Z.int2:case Z.int4:case Z.int8:case Z.numeric:case Z.oid:return Na(e);case Z.json:case Z.jsonb:return za(e);case Z.timestamp:return Ma(e);case Z.abstime:case Z.date:case Z.daterange:case Z.int4range:case Z.int8range:case Z.money:case Z.reltime:case Z.text:case Z.time:case Z.timestamptz:case Z.timetz:case Z.tsrange:case Z.tstzrange:return Fr(e);default:return Fr(e)}},Fr=r=>r,Da=r=>{switch(r){case"t":return!0;case"f":return!1;default:return r}},Na=r=>{if(typeof r=="string"){const e=parseFloat(r);if(!Number.isNaN(e))return e}return r},za=r=>{if(typeof r=="string")try{return JSON.parse(r)}catch{return r}return r},ja=(r,e)=>{if(typeof r!="string")return r;const t=r.length-1,i=r[t];if(r[0]==="{"&&i==="}"){let a;const s=r.slice(1,t);try{a=JSON.parse("["+s+"]")}catch{a=s?s.split(","):[]}return a.map(o=>Ln(e,o))}return r},Ma=r=>typeof r=="string"?r.replace(" ","T"):r,On=r=>{const e=new URL(r);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var Lt=r=>typeof r=="function"?r:function(){return r},qa=typeof self<"u"?self:null,ft=typeof window<"u"?window:null,De=qa||ft||globalThis,Ha="2.0.0",Fa=1e4,Wa=1e3,Ne={connecting:0,open:1,closing:2,closed:3},ke={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},He={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},Wr={longpoll:"longpoll",websocket:"websocket"},Ka={complete:4},Kr="base64url.bearer.phx.",Yt=class{constructor(r,e,t,i){this.channel=r,this.event=e,this.payload=t||function(){return{}},this.receivedResp=null,this.timeout=i,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(r){this.timeout=r,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(r,e){return this.hasReceived(r)&&e(this.receivedResp.response),this.recHooks.push({status:r,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:r,response:e,_ref:t}){this.recHooks.filter(i=>i.status===r).forEach(i=>i.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,r=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=r,this.matchReceive(r)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(r){return this.receivedResp&&this.receivedResp.status===r}trigger(r,e){this.channel.trigger(this.refEvent,{status:r,response:e})}},Un=class{constructor(r,e){this.callback=r,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},Va=class{constructor(r,e,t){this.state=ke.closed,this.topic=r,this.params=Lt(e||{}),this.socket=t,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Yt(this,He.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Un(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=ke.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this.joinPush.receive("error",i=>{this.state=ke.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=ke.closed,this.socket.remove(this)}),this.onError(i=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.isJoining()&&this.joinPush.reset(),this.state=ke.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Yt(this,He.leave,Lt({}),this.timeout).send(),this.state=ke.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(He.reply,(i,n)=>{this.trigger(this.replyEventName(n),i)})}join(r=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=r,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(r=>r.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=ke.closed,this.bindings=[]}onClose(r){this.on(He.close,r)}onError(r){return this.on(He.error,e=>r(e))}on(r,e){let t=this.bindingRef++;return this.bindings.push({event:r,ref:t,callback:e}),t}off(r,e){this.bindings=this.bindings.filter(t=>!(t.event===r&&(typeof e>"u"||e===t.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(r,e,t=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${r}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let i=new Yt(this,r,function(){return e},t);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}leave(r=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=ke.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(He.close,"leave")},t=new Yt(this,He.leave,Lt({}),r);return t.receive("ok",()=>e()).receive("timeout",()=>e()),t.send(),this.canPush()||t.trigger("ok",{}),t}onMessage(r,e,t){return e}filterBindings(r,e,t){return!0}isMember(r,e,t,i){return this.topic!==r?!1:i&&i!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:r,event:e,payload:t,joinRef:i}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(r=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=ke.joining,this.joinPush.resend(r))}trigger(r,e,t,i){let n=this.onMessage(r,e,t,i);if(e&&!n)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let a=this.bindings.filter(s=>s.event===r&&this.filterBindings(s,e,t));for(let s=0;s<a.length;s++)a[s].callback(n,t,i||this.joinRef())}replyEventName(r){return`chan_reply_${r}`}isClosed(){return this.state===ke.closed}isErrored(){return this.state===ke.errored}isJoined(){return this.state===ke.joined}isJoining(){return this.state===ke.joining}isLeaving(){return this.state===ke.leaving}},cr=class{static request(r,e,t,i,n,a,s){if(De.XDomainRequest){let o=new De.XDomainRequest;return this.xdomainRequest(o,r,e,i,n,a,s)}else if(De.XMLHttpRequest){let o=new De.XMLHttpRequest;return this.xhrRequest(o,r,e,t,i,n,a,s)}else{if(De.fetch&&De.AbortController)return this.fetchRequest(r,e,t,i,n,a,s);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(r,e,t,i,n,a,s){let o={method:r,headers:t,body:i},l=null;return n&&(l=new AbortController,setTimeout(()=>l.abort(),n),o.signal=l.signal),De.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>s&&s(c)).catch(c=>{c.name==="AbortError"&&a?a():s&&s(null)}),l}static xdomainRequest(r,e,t,i,n,a,s){return r.timeout=n,r.open(e,t),r.onload=()=>{let o=this.parseJSON(r.responseText);s&&s(o)},a&&(r.ontimeout=a),r.onprogress=()=>{},r.send(i),r}static xhrRequest(r,e,t,i,n,a,s,o){r.open(e,t,!0),r.timeout=a;for(let[l,c]of Object.entries(i))r.setRequestHeader(l,c);return r.onerror=()=>o&&o(null),r.onreadystatechange=()=>{if(r.readyState===Ka.complete&&o){let l=this.parseJSON(r.responseText);o(l)}},s&&(r.ontimeout=s),r.send(n),r}static parseJSON(r){if(!r||r==="")return null;try{return JSON.parse(r)}catch{return console&&console.log("failed to parse JSON response",r),null}}static serialize(r,e){let t=[];for(var i in r){if(!Object.prototype.hasOwnProperty.call(r,i))continue;let n=e?`${e}[${i}]`:i,a=r[i];typeof a=="object"?t.push(this.serialize(a,n)):t.push(encodeURIComponent(n)+"="+encodeURIComponent(a))}return t.join("&")}static appendParams(r,e){if(Object.keys(e).length===0)return r;let t=r.match(/\?/)?"&":"?";return`${r}${t}${this.serialize(e)}`}},Ga=r=>{let e="",t=new Uint8Array(r),i=t.byteLength;for(let n=0;n<i;n++)e+=String.fromCharCode(t[n]);return btoa(e)},dt=class{constructor(r,e){e&&e.length===2&&e[1].startsWith(Kr)&&(this.authToken=atob(e[1].slice(Kr.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(r),this.readyState=Ne.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(r){return r.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+Wr.websocket),"$1/"+Wr.longpoll)}endpointURL(){return cr.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(r,e,t){this.close(r,e,t),this.readyState=Ne.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===Ne.open||this.readyState===Ne.connecting}poll(){const r={Accept:"application/json"};this.authToken&&(r["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",r,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:i,messages:n}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=i}else t=0;switch(t){case 200:n.forEach(a=>{setTimeout(()=>this.onmessage({data:a}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=Ne.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${t}`)}})}send(r){typeof r!="string"&&(r=Ga(r)),this.currentBatch?this.currentBatch.push(r):this.awaitingBatchAck?this.batchBuffer.push(r):(this.currentBatch=[r],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(r){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},r.join(`
`),()=>this.onerror("timeout"),e=>{this.awaitingBatchAck=!1,!e||e.status!==200?(this.onerror(e&&e.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(r,e,t){for(let n of this.reqs)n.abort();this.readyState=Ne.closed;let i=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:r,reason:e,wasClean:t});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",i)):this.onclose(i)}ajax(r,e,t,i,n){let a,s=()=>{this.reqs.delete(a),i()};a=cr.request(r,this.endpointURL(),e,t,this.timeout,s,o=>{this.reqs.delete(a),this.isActive()&&n(o)}),this.reqs.add(a)}},Ja=class Ct{constructor(e,t={}){let i=t.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(i.state,n=>{let{onJoin:a,onLeave:s,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=Ct.syncState(this.state,n,a,s),this.pendingDiffs.forEach(l=>{this.state=Ct.syncDiff(this.state,l,a,s)}),this.pendingDiffs=[],o()}),this.channel.on(i.diff,n=>{let{onJoin:a,onLeave:s,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(n):(this.state=Ct.syncDiff(this.state,n,a,s),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return Ct.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,i,n){let a=this.clone(e),s={},o={};return this.map(a,(l,c)=>{t[l]||(o[l]=c)}),this.map(t,(l,c)=>{let d=a[l];if(d){let u=c.metas.map(f=>f.phx_ref),p=d.metas.map(f=>f.phx_ref),h=c.metas.filter(f=>p.indexOf(f.phx_ref)<0),m=d.metas.filter(f=>u.indexOf(f.phx_ref)<0);h.length>0&&(s[l]=c,s[l].metas=h),m.length>0&&(o[l]=this.clone(d),o[l].metas=m)}else s[l]=c}),this.syncDiff(a,{joins:s,leaves:o},i,n)}static syncDiff(e,t,i,n){let{joins:a,leaves:s}=this.clone(t);return i||(i=function(){}),n||(n=function(){}),this.map(a,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let d=e[o].metas.map(p=>p.phx_ref),u=c.metas.filter(p=>d.indexOf(p.phx_ref)<0);e[o].metas.unshift(...u)}i(o,c,l)}),this.map(s,(o,l)=>{let c=e[o];if(!c)return;let d=l.metas.map(u=>u.phx_ref);c.metas=c.metas.filter(u=>d.indexOf(u.phx_ref)<0),n(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,t){return t||(t=function(i,n){return n}),this.map(e,(i,n)=>t(i,n))}static map(e,t){return Object.getOwnPropertyNames(e).map(i=>t(i,e[i]))}static clone(e){return JSON.parse(JSON.stringify(e))}},Qt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(r,e){if(r.payload.constructor===ArrayBuffer)return e(this.binaryEncode(r));{let t=[r.join_ref,r.ref,r.topic,r.event,r.payload];return e(JSON.stringify(t))}},decode(r,e){if(r.constructor===ArrayBuffer)return e(this.binaryDecode(r));{let[t,i,n,a,s]=JSON.parse(r);return e({join_ref:t,ref:i,topic:n,event:a,payload:s})}},binaryEncode(r){let{join_ref:e,ref:t,event:i,topic:n,payload:a}=r,s=this.META_LENGTH+e.length+t.length+n.length+i.length,o=new ArrayBuffer(this.HEADER_LENGTH+s),l=new DataView(o),c=0;l.setUint8(c++,this.KINDS.push),l.setUint8(c++,e.length),l.setUint8(c++,t.length),l.setUint8(c++,n.length),l.setUint8(c++,i.length),Array.from(e,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(t,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(n,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(i,u=>l.setUint8(c++,u.charCodeAt(0)));var d=new Uint8Array(o.byteLength+a.byteLength);return d.set(new Uint8Array(o),0),d.set(new Uint8Array(a),o.byteLength),d.buffer},binaryDecode(r){let e=new DataView(r),t=e.getUint8(0),i=new TextDecoder;switch(t){case this.KINDS.push:return this.decodePush(r,e,i);case this.KINDS.reply:return this.decodeReply(r,e,i);case this.KINDS.broadcast:return this.decodeBroadcast(r,e,i)}},decodePush(r,e,t){let i=e.getUint8(1),n=e.getUint8(2),a=e.getUint8(3),s=this.HEADER_LENGTH+this.META_LENGTH-1,o=t.decode(r.slice(s,s+i));s=s+i;let l=t.decode(r.slice(s,s+n));s=s+n;let c=t.decode(r.slice(s,s+a));s=s+a;let d=r.slice(s,r.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:d}},decodeReply(r,e,t){let i=e.getUint8(1),n=e.getUint8(2),a=e.getUint8(3),s=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=t.decode(r.slice(o,o+i));o=o+i;let c=t.decode(r.slice(o,o+n));o=o+n;let d=t.decode(r.slice(o,o+a));o=o+a;let u=t.decode(r.slice(o,o+s));o=o+s;let p=r.slice(o,r.byteLength),h={status:u,response:p};return{join_ref:l,ref:c,topic:d,event:He.reply,payload:h}},decodeBroadcast(r,e,t){let i=e.getUint8(1),n=e.getUint8(2),a=this.HEADER_LENGTH+2,s=t.decode(r.slice(a,a+i));a=a+i;let o=t.decode(r.slice(a,a+n));a=a+n;let l=r.slice(a,r.byteLength);return{join_ref:null,ref:null,topic:s,event:o,payload:l}}},Ya=class{constructor(r,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||Fa,this.transport=e.transport||De.WebSocket||dt,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let t=null;try{t=De&&De.sessionStorage}catch{}this.sessionStore=e.sessionStorage||t,this.establishedConnections=0,this.defaultEncoder=Qt.encode.bind(Qt),this.defaultDecoder=Qt.decode.bind(Qt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==dt?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let i=null;ft&&ft.addEventListener&&(ft.addEventListener("pagehide",n=>{this.conn&&(this.disconnect(),i=this.connectClock)}),ft.addEventListener("pageshow",n=>{i===this.connectClock&&(i=null,this.connect())}),ft.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=n=>e.rejoinAfterMs?e.rejoinAfterMs(n):[1e3,2e3,5e3][n-1]||1e4,this.reconnectAfterMs=n=>e.reconnectAfterMs?e.reconnectAfterMs(n):[10,50,100,150,200,250,500,1e3,2e3][n-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(n,a,s)=>{console.log(`${n}: ${a}`,s)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=Lt(e.params||{}),this.endPoint=`${r}/${Wr.websocket}`,this.vsn=e.vsn||Ha,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Un(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken}getLongPollTransport(){return dt}replaceTransport(r){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=r}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let r=cr.appendParams(cr.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return r.charAt(0)!=="/"?r:r.charAt(1)==="/"?`${this.protocol()}:${r}`:`${this.protocol()}://${location.host}${r}`}disconnect(r,e,t){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,r&&r()},e,t)}connect(r){r&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=Lt(r)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==dt?this.connectWithFallback(dt,this.longPollFallbackMs):this.transportConnect())}log(r,e,t){this.logger&&this.logger(r,e,t)}hasLogger(){return this.logger!==null}onOpen(r){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,r]),e}onClose(r){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,r]),e}onError(r){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,r]),e}onMessage(r){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,r]),e}onHeartbeat(r){this.heartbeatCallback=r}ping(r){if(!this.isConnected())return!1;let e=this.makeRef(),t=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let i=this.onMessage(n=>{n.ref===e&&(this.off([i]),r(Date.now()-t))});return!0}transportName(r){switch(r){case dt:return"LongPoll";default:return r.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let r;this.authToken&&(r=["phoenix",`${Kr}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),r),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(r){return this.sessionStore&&this.sessionStore.getItem(r)}storeSession(r,e){this.sessionStore&&this.sessionStore.setItem(r,e)}connectWithFallback(r,e=2500){clearTimeout(this.fallbackTimer);let t=!1,i=!0,n,a,s=this.transportName(r),o=l=>{this.log("transport",`falling back to ${s}...`,l),this.off([n,a]),i=!1,this.replaceTransport(r),this.transportConnect()};if(this.getSession(`phx:fallback:${s}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),a=this.onError(l=>{this.log("transport","error",l),i&&!t&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(t=!0,!i){let l=this.transportName(r);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(r){this.log("error","error in heartbeat callback",r)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),Wa,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(r,e,t){if(!this.conn)return r&&r();const i=this.conn;this.waitForBufferDone(i,()=>{e?i.close(e,t||""):i.close(),this.waitForSocketClosed(i,()=>{this.conn===i&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),r&&r()})})}waitForBufferDone(r,e,t=1){if(t===5||!r.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(r,e,t+1)},150*t)}waitForSocketClosed(r,e,t=1){if(t===5||r.readyState===Ne.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(r,e,t+1)},150*t)}onConnClose(r){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",r),this.triggerChanError(r),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",r)}onConnError(r){this.hasLogger()&&this.log("transport","error",r);let e=this.transport,t=this.establishedConnections;this.triggerStateCallbacks("error",r,e,t),(e===this.transport||t>0)&&this.triggerChanError(r)}triggerChanError(r){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(He.error,r)})}connectionState(){switch(this.conn&&this.conn.readyState){case Ne.connecting:return"connecting";case Ne.open:return"open";case Ne.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(r){this.off(r.stateChangeRefs),this.channels=this.channels.filter(e=>e!==r)}off(r){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([t])=>r.indexOf(t)===-1)}channel(r,e={}){let t=new Va(r,e,this);return this.channels.push(t),t}push(r){if(this.hasLogger()){let{topic:e,event:t,payload:i,ref:n,join_ref:a}=r;this.log("push",`${e} ${t} (${a}, ${n})`,i)}this.isConnected()?this.encode(r,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(r,e=>this.conn.send(e)))}makeRef(){let r=this.ref+1;return r===this.ref?this.ref=0:this.ref=r,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(r){this.log("error","error in heartbeat callback",r)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(r){this.log("error","error in heartbeat callback",r)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(r=>r()),this.sendBuffer=[])}onConnMessage(r){this.decode(r.data,e=>{let{topic:t,event:i,payload:n,ref:a,join_ref:s}=e;if(a&&a===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(n.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${n.status||""} ${t} ${i} ${a&&"("+a+")"||""}`.trim(),n);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(t,i,n,s)&&l.trigger(i,n,a,s)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(r,...e){try{this.stateChangeCallbacks[r].forEach(([t,i])=>{try{i(...e)}catch(n){this.log("error",`error in ${r} callback`,n)}})}catch(t){this.log("error",`error triggering ${r} callbacks`,t)}}leaveOpenTopic(r){let e=this.channels.find(t=>t.topic===r&&(t.isJoined()||t.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${r}"`),e.leave())}};class Ot{constructor(e,t){const i=Xa(t);this.presence=new Ja(e.getChannel(),i),this.presence.onJoin((n,a,s)=>{const o=Ot.onJoinPayload(n,a,s);e.getChannel().trigger("presence",o)}),this.presence.onLeave((n,a,s)=>{const o=Ot.onLeavePayload(n,a,s);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return Ot.transformState(this.presence.state)}static transformState(e){return e=Qa(e),Object.getOwnPropertyNames(e).reduce((t,i)=>{const n=e[i];return t[i]=or(n),t},{})}static onJoinPayload(e,t,i){const n=zi(t),a=or(i);return{event:"join",key:e,currentPresences:n,newPresences:a}}static onLeavePayload(e,t,i){const n=zi(t),a=or(i);return{event:"leave",key:e,currentPresences:n,leftPresences:a}}}function or(r){return r.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))}function Qa(r){return JSON.parse(JSON.stringify(r))}function Xa(r){return(r==null?void 0:r.events)&&{events:r.events}}function zi(r){return r!=null&&r.metas?or(r):[]}var ji;(function(r){r.SYNC="sync",r.JOIN="join",r.LEAVE="leave"})(ji||(ji={}));class Za{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new Ot(this.channel.channelAdapter,t)}}function es(r){if(r instanceof Error)return r;if(typeof r=="string")return new Error(r);if(r&&typeof r=="object"){const e=r;if(typeof e.code=="number"){const t=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${t}`,{cause:r})}return new Error("channel error: transport failure",{cause:r})}return new Error("channel error: connection lost")}class ts{constructor(e,t,i){const n=rs(i);this.channel=e.getSocket().channel(t,n),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,i){let n;try{n=this.channel.push(e,t,i)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>Oa){const a=this.channel.pushBuffer.shift();a.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${a.event}`,a.payload())}return n}updateJoinPayload(e){const t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===Ye.joined}isJoined(){return this.state===Ye.joined}isJoining(){return this.state===Ye.joining}isClosed(){return this.state===Ye.closed}isLeaving(){return this.state===Ye.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function rs(r){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config)}}const is=/[,()"\\]/,ns=r=>is.test(r)||r!==r.trim(),as=r=>`"${r.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,Mi=r=>{const e=r===null?"null":String(r);return ns(e)?as(e):e},ss=r=>r===null?"null":String(r),os=(r,e)=>{if(r==="in"){const t=Array.isArray(e)?e:[e];if(t.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(t)).map(n=>Mi(n)).join(",")})`}return r==="is"?`is.${ss(e)}`:`${r}.${Mi(e)}`};class ls{constructor(){this.filters=[]}add(e,t,i,n=!1){const a=n?"not.":"";return this.filters.push(`${e}=${a}${os(t,i)}`),this}eq(e,t){return this.add(e,"eq",t)}neq(e,t){return this.add(e,"neq",t)}gt(e,t){return this.add(e,"gt",t)}gte(e,t){return this.add(e,"gte",t)}lt(e,t){return this.add(e,"lt",t)}lte(e,t){return this.add(e,"lte",t)}in(e,t){return this.add(e,"in",t)}like(e,t){return this.add(e,"like",t)}ilike(e,t){return this.add(e,"ilike",t)}match(e,t){return this.add(e,"match",t)}imatch(e,t){return this.add(e,"imatch",t)}is(e,t){return this.add(e,"is",t)}isDistinct(e,t){return this.add(e,"isdistinct",t)}not(e,t,i){return this.add(e,t,i,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var qi;(function(r){r.ALL="*",r.INSERT="INSERT",r.UPDATE="UPDATE",r.DELETE="DELETE"})(qi||(qi={}));var yt;(function(r){r.BROADCAST="broadcast",r.PRESENCE="presence",r.POSTGRES_CHANGES="postgres_changes",r.SYSTEM="system"})(yt||(yt={}));var Fe;(function(r){r.SUBSCRIBED="SUBSCRIBED",r.TIMED_OUT="TIMED_OUT",r.CLOSED="CLOSED",r.CHANNEL_ERROR="CHANNEL_ERROR"})(Fe||(Fe={}));class Ut{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},i){var n,a;if(this.topic=e,this.params=t,this.socket=i,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.channelAdapter=new ts(this.socket.socketAdapter,e,this.params),this.presence=new Za(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=On(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((a=(n=this.params.config)===null||n===void 0?void 0:n.broadcast)===null||a===void 0)&&a.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){var i,n,a;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:s,presence:o,private:l}}=this.params,c=(n=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(h=>h.filter))!==null&&n!==void 0?n:[],d=!!this.bindings[yt.PRESENCE]&&this.bindings[yt.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,u={},p={broadcast:s,presence:Object.assign(Object.assign({},o),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(h=>{e==null||e(Fe.CHANNEL_ERROR,es(h))}),this._onClose(()=>e==null?void 0:e(Fe.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(t).receive("ok",async({postgres_changes:h})=>{if(this.socket._isManualToken()||this.socket.setAuth(),h===void 0){e==null||e(Fe.SUBSCRIBED);return}this._updatePostgresBindings(h,e)}).receive("error",h=>{this.state=Ye.errored;const m=Object.values(h).join(", ")||"error";e==null||e(Fe.CHANNEL_ERROR,new Error(m,{cause:h}))}).receive("timeout",()=>{e==null||e(Fe.TIMED_OUT)})}return this}_updatePostgresBindings(e,t){var i;const n=this.bindings.postgres_changes,a=(i=n==null?void 0:n.length)!==null&&i!==void 0?i:0,s=[];for(let o=0;o<a;o++){const l=n[o],{filter:{event:c,schema:d,table:u,filter:p}}=l,h=e&&e[o];if(h&&h.event===c&&Ut.isFilterValueEqual(h.schema,d)&&Ut.isFilterValueEqual(h.table,u)&&Ut.isFilterValueEqual(h.filter,p))s.push(Object.assign(Object.assign({},l),{id:h.id}));else{this.unsubscribe(),this.state=Ye.errored,t==null||t(Fe.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=s,this.state!=Ye.errored&&t&&t(Fe.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,i){const n=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),a=e===yt.PRESENCE||e===yt.POSTGRES_CHANGES;if(n&&a)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,i)}async httpSend(e,t,i={}){var n;if(t==null)return Promise.reject(new Error("Payload is required for httpSend()"));const a=t instanceof ArrayBuffer||ArrayBuffer.isView(t),s={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":a?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(s.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:s,body:a?t:JSON.stringify(t)},c=await this._fetchWithTimeout(o.toString(),l,(n=i.timeout)!==null&&n!==void 0?n:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=c.statusText;try{const u=await c.json();d=u.error||u.message||d}catch{}return Promise.reject(new Error(d))}async send(e,t={}){var i,n;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:a,payload:s}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:a,payload:s,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(i=t.timeout)!==null&&i!==void 0?i:this.timeout);return await((n=c.body)===null||n===void 0?void 0:n.cancel()),c.ok?"ok":"error"}catch(c){return c instanceof Error&&c.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var s,o,l;const c=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(s=this.params)===null||s===void 0?void 0:s.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),c.receive("ok",()=>a("ok")),c.receive("error",()=>a("error")),c.receive("timeout",()=>a("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>t("ok")).receive("timeout",()=>t("timed out")).receive("error",()=>t("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,i){const n=new AbortController,a=setTimeout(()=>n.abort(),i),s=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:n.signal}));return clearTimeout(a),s}_on(e,t,i){const n=e.toLocaleLowerCase(),a=t==null?void 0:t.filter;(a instanceof ls||typeof a=="object"&&a!==null&&typeof a.build=="function")&&(t=Object.assign(Object.assign({},t),{filter:a.build()}));const s=this.channelAdapter.on(e,i),o={type:n,filter:t,callback:i,ref:s};return this.bindings[n]?this.bindings[n].push(o):this.bindings[n]=[o],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,i)=>{var n,a,s,o,l,c,d;const u=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,i))return!1;const p=(n=this.bindings[u])===null||n===void 0?void 0:n.find(h=>h.ref===e.ref);if(!p)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in p){const h=p.id,m=(a=p.filter)===null||a===void 0?void 0:a.event;return h&&((s=t.ids)===null||s===void 0?void 0:s.includes(h))&&(m==="*"||(m==null?void 0:m.toLocaleLowerCase())===((o=t.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const h=(c=(l=p==null?void 0:p.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return h==="*"||h===((d=t==null?void 0:t.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===u})}_notThisChannelEvent(e,t){const{close:i,error:n,leave:a,join:s}=Rn;return t&&[i,n,a,s].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,i)=>{if(typeof t=="object"&&"ids"in t){const n=t.data,{schema:a,table:s,commit_timestamp:o,type:l,errors:c}=n;return Object.assign(Object.assign({},{schema:a,table:s,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(n))}return t})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const t in e.bindings)for(const i of e.bindings[t])this._on(i.type,i.filter,i.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Ni(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Ni(e.columns,e.old_record)),t}}class cs{constructor(e,t){this.socket=new Ya(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,i,n=1e4){return new Promise(a=>{setTimeout(()=>a("timeout"),n),this.socket.disconnect(()=>{e(),a("ok")},t,i)})}push(e){this.socket.push(e)}log(e,t,i){this.socket.log(e,t,i)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Hr.connecting}isDisconnecting(){return this.socket.connectionState()==Hr.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Hi={HEARTBEAT_INTERVAL:25e3},ds=[1e3,2e3,5e3,1e4],us=1e4;function ps(){const r=new Map;return{get length(){return r.size},clear(){r.clear()},getItem(e){return r.has(e)?r.get(e):null},key(e){var t;return(t=Array.from(r.keys())[e])!==null&&t!==void 0?t:null},removeItem(e){r.delete(e)},setItem(e,t){r.set(e,String(t))}}}function hs(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return ps()}const gs=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class ms{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){var i;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new Ua,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=a=>a?(...s)=>a(...s):(...s)=>fetch(...s),!(!((i=t==null?void 0:t.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey;const n=this._initializeOptions(t);this.socketAdapter=new cs(e,n),this.httpEndpoint=On(e),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return t==="ok"&&e.teardown(),t}async removeAllChannels(){const e=this.channels.map(async i=>{const n=await i.unsubscribe();return i.teardown(),n}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,i){this.socketAdapter.log(e,t,i)}connectionState(){return this.socketAdapter.connectionState()||Hr.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){const i=`realtime:${e}`,n=this.getChannels().find(a=>a.topic===i);if(n)return n;{const a=new Ut(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(a),a}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e=null){let t,i=!1;if(e)t=e,i=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(n){this.log("error","Error fetching access token from callback",n),t=this.accessTokenValue}else t=this.accessTokenValue;i?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(n=>{const a={access_token:t,version:Ia};t&&n.updateJoinPayload(a),n.joinedOnce&&n.channelAdapter.isJoined()&&n.channelAdapter.push(Rn.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(t=>{this.log("error",`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(t=>{this.log("error","error waiting for auth on connect",t)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,i)=>{t=="sent"&&this._setAuthSafely(),e&&e(t,i)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{const i=new Blob([gs],{type:"application/javascript"});t=URL.createObjectURL(i)}return t}_initializeOptions(e){var t,i,n,a,s,o,l,c,d,u,p,h;this.worker=(t=e==null?void 0:e.worker)!==null&&t!==void 0?t:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null;const m={};m.timeout=(n=e==null?void 0:e.timeout)!==null&&n!==void 0?n:La,m.heartbeatIntervalMs=(a=e==null?void 0:e.heartbeatIntervalMs)!==null&&a!==void 0?a:Hi.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(s=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&s!==void 0?s:2*((o=e==null?void 0:e.heartbeatIntervalMs)!==null&&o!==void 0?o:Hi.HEARTBEAT_INTERVAL),m.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:$a.getWebSocketConstructor(),m.params=e==null?void 0:e.params,m.logger=e==null?void 0:e.logger,m.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),m.sessionStorage=(c=e==null?void 0:e.sessionStorage)!==null&&c!==void 0?c:hs(),m.reconnectAfterMs=(d=e==null?void 0:e.reconnectAfterMs)!==null&&d!==void 0?d:w=>ds[w-1]||us;let f,v;const y=(u=e==null?void 0:e.vsn)!==null&&u!==void 0?u:Ra;switch(y){case Pa:f=(w,k)=>k(JSON.stringify(w)),v=(w,k)=>k(JSON.parse(w));break;case Pn:f=this.serializer.encode.bind(this.serializer),v=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${m.vsn}`)}if(m.vsn=y,m.encode=(p=e==null?void 0:e.encode)!==null&&p!==void 0?p:f,m.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:v,m.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,m.params=Object.assign(Object.assign({},m.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,m.autoSendHeartbeat=!this.worker}return m}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var Nt=class extends Error{constructor(r,e){var t;super(r),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function fs(r,e,t){const i=new URL(e,r);if(t)for(const[n,a]of Object.entries(t))a!==void 0&&i.searchParams.set(n,a);return i.toString()}async function vs(r){return!r||r.type==="none"?{}:r.type==="bearer"?{Authorization:`Bearer ${r.token}`}:r.type==="header"?{[r.name]:r.value}:r.type==="custom"?await r.getHeaders():{}}function ys(r){const e=r.fetchImpl??globalThis.fetch;return{async request({method:t,path:i,query:n,body:a,headers:s}){const o=fs(r.baseUrl,i,n),l=await vs(r.auth),c=await e(o,{method:t,headers:{...a?{"Content-Type":"application/json"}:{},...l,...s},body:a?JSON.stringify(a):void 0}),d=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),p=u&&d?JSON.parse(d):d;if(!c.ok){const h=u?p:void 0,m=h==null?void 0:h.error;throw new Nt((m==null?void 0:m.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:m==null?void 0:m.type,icebergCode:m==null?void 0:m.code,details:h})}return{status:c.status,headers:c.headers,data:p}}}}function Xt(r){return r.join("")}var bs=class{constructor(r,e=""){this.client=r,this.prefix=e}async listNamespaces(r){const e=r?{parent:Xt(r.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(r,e){const t={namespace:r.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(r){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Xt(r.namespace)}`})}async loadNamespaceMetadata(r){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Xt(r.namespace)}`})).data.properties}}async namespaceExists(r){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Xt(r.namespace)}`}),!0}catch(e){if(e instanceof Nt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(r,e){try{return await this.createNamespace(r,e)}catch(t){if(t instanceof Nt&&t.status===409)return;throw t}}};function ut(r){return r.join("")}var ws=class{constructor(r,e="",t){this.client=r,this.prefix=e,this.accessDelegation=t}async listTables(r){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ut(r.namespace)}/tables`})).data.identifiers}async createTable(r,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ut(r.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(r,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ut(r.namespace)}/tables/${r.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(r,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${ut(r.namespace)}/tables/${r.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(r){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ut(r.namespace)}/tables/${r.name}`,headers:e})).data.metadata}async tableExists(r){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${ut(r.namespace)}/tables/${r.name}`,headers:e}),!0}catch(t){if(t instanceof Nt&&t.status===404)return!1;throw t}}async createTableIfNotExists(r,e){try{return await this.createTable(r,e)}catch(t){if(t instanceof Nt&&t.status===409)return await this.loadTable({namespace:r.namespace,name:e.name});throw t}}},ks=class{constructor(r){var i;let e="v1";r.catalogName&&(e+=`/${r.catalogName}`);const t=r.baseUrl.endsWith("/")?r.baseUrl:`${r.baseUrl}/`;this.client=ys({baseUrl:t,auth:r.auth,fetchImpl:r.fetch}),this.accessDelegation=(i=r.accessDelegation)==null?void 0:i.join(","),this.namespaceOps=new bs(this.client,e),this.tableOps=new ws(this.client,e,this.accessDelegation)}async listNamespaces(r){return this.namespaceOps.listNamespaces(r)}async createNamespace(r,e){return this.namespaceOps.createNamespace(r,e)}async dropNamespace(r){await this.namespaceOps.dropNamespace(r)}async loadNamespaceMetadata(r){return this.namespaceOps.loadNamespaceMetadata(r)}async listTables(r){return this.tableOps.listTables(r)}async createTable(r,e){return this.tableOps.createTable(r,e)}async updateTable(r,e){return this.tableOps.updateTable(r,e)}async dropTable(r,e){await this.tableOps.dropTable(r,e)}async loadTable(r){return this.tableOps.loadTable(r)}async namespaceExists(r){return this.namespaceOps.namespaceExists(r)}async tableExists(r){return this.tableOps.tableExists(r)}async createNamespaceIfNotExists(r,e){return this.namespaceOps.createNamespaceIfNotExists(r,e)}async createTableIfNotExists(r,e){return this.tableOps.createTableIfNotExists(r,e)}};function zt(r){"@babel/helpers - typeof";return zt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},zt(r)}function xs(r,e){if(zt(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var i=t.call(r,e);if(zt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Ss(r){var e=xs(r,"string");return zt(e)=="symbol"?e:e+""}function _s(r,e,t){return(e=Ss(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Fi(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);e&&(i=i.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),t.push.apply(t,i)}return t}function z(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Fi(Object(t),!0).forEach(function(i){_s(r,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Fi(Object(t)).forEach(function(i){Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(t,i))})}return r}var xr=class extends Error{constructor(r,e="storage",t,i){super(r),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=t,this.statusCode=i}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Sr(r){return typeof r=="object"&&r!==null&&"__isStorageError"in r}var Vr=class extends xr{constructor(r,e,t,i="storage"){super(r,i,e,t),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=t}toJSON(){return z({},super.toJSON())}},Bn=class extends xr{constructor(r,e,t="storage"){super(r,t),this.name=t==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function dr(r,e,t){const i=z({},r),n=e.toLowerCase();for(const a of Object.keys(i))a.toLowerCase()===n&&delete i[a];return i[n]=t,i}function As(r){const e={};for(const[t,i]of Object.entries(r))e[t.toLowerCase()]=i;return e}const Ts=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),Es=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},Gr=r=>{if(Array.isArray(r))return r.map(t=>Gr(t));if(typeof r=="function"||r!==Object(r))return r;const e={};return Object.entries(r).forEach(([t,i])=>{const n=t.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));e[n]=Gr(i)}),e},$s=r=>!r||typeof r!="string"||r.length===0||r.length>100||r.trim()!==r||r.includes("/")||r.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(r),Wi=r=>{if(typeof r=="object"&&r!==null){const e=r;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const t=e.error;if(typeof t.message=="string")return t.message}}return JSON.stringify(r)},Cs=async(r,e,t,i)=>{if(r!==null&&typeof r=="object"&&"json"in r&&typeof r.json=="function"){const n=r;let a=parseInt(String(n.status),10);Number.isFinite(a)||(a=500),n.json().then(s=>{const o=(s==null?void 0:s.statusCode)||(s==null?void 0:s.code)||a+"";e(new Vr(Wi(s),a,o,i))}).catch(()=>{const s=a+"";e(new Vr(n.statusText||`HTTP ${a} error`,a,s,i))})}else e(new Bn(Wi(r),r,i))},Is=(r,e,t,i)=>{const n={method:r,headers:(e==null?void 0:e.headers)||{}};if(r==="GET"||r==="HEAD"||!i)return z(z({},n),t);if(Es(i)){var a;const s=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(s))l.toLowerCase()==="content-type"&&(o=c);n.headers=dr(s,"Content-Type",(a=o)!==null&&a!==void 0?a:"application/json"),n.body=JSON.stringify(i)}else n.body=i;return e!=null&&e.duplex&&(n.duplex=e.duplex),z(z({},n),t)};async function Et(r,e,t,i,n,a,s){return new Promise((o,l)=>{r(t,Is(e,i,n,a)).then(c=>{if(!c.ok)throw c;if(i!=null&&i.noResolveJson)return c;if(s==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>Cs(c,l,i,s))})}function Dn(r="storage"){return{get:async(e,t,i,n)=>Et(e,"GET",t,i,n,void 0,r),post:async(e,t,i,n,a)=>Et(e,"POST",t,n,a,i,r),put:async(e,t,i,n,a)=>Et(e,"PUT",t,n,a,i,r),head:async(e,t,i,n)=>Et(e,"HEAD",t,z(z({},i),{},{noResolveJson:!0}),n,void 0,r),remove:async(e,t,i,n,a)=>Et(e,"DELETE",t,n,a,i,r)}}const Ps=Dn("storage"),{get:jt,post:Oe,put:Jr,head:Rs,remove:Mt}=Ps,Te=Dn("vectors");var wt=class{constructor(r,e={},t,i="storage"){this.shouldThrowOnError=!1,this.url=r,this.headers=As(e),this.fetch=Ts(t),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(r,e){return this.headers=dr(this.headers,r,e),this}async handleOperation(r){var e=this;try{return{data:await r(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Sr(t))return{data:null,error:t};throw t}}};let Nn;Nn=Symbol.toStringTag;var Ls=class{constructor(r,e){this.downloadFn=r,this.shouldThrowOnError=e,this[Nn]="StreamDownloadBuilder",this.promise=null}then(r,e){return this.getPromise().then(r,e)}catch(r){return this.getPromise().catch(r)}finally(r){return this.getPromise().finally(r)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var r=this;try{return{data:(await r.downloadFn()).body,error:null}}catch(e){if(r.shouldThrowOnError)throw e;if(Sr(e))return{data:null,error:e};throw e}}};let zn;zn=Symbol.toStringTag;var Os=class{constructor(r,e){this.downloadFn=r,this.shouldThrowOnError=e,this[zn]="BlobDownloadBuilder",this.promise=null}asStream(){return new Ls(this.downloadFn,this.shouldThrowOnError)}then(r,e){return this.getPromise().then(r,e)}catch(r){return this.getPromise().catch(r)}finally(r){return this.getPromise().finally(r)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var r=this;try{return{data:await(await r.downloadFn()).blob(),error:null}}catch(e){if(r.shouldThrowOnError)throw e;if(Sr(e))return{data:null,error:e};throw e}}};const Cr={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Ki={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Us=class extends wt{constructor(r,e={},t,i){super(r,e,i,"storage"),this.bucketId=t}async uploadOrUpdate(r,e,t,i){var n=this;return n.handleOperation(async()=>{let a;const s=z(z({},Ki),i);let o=z(z({},n.headers),r==="POST"&&{"x-upsert":String(s.upsert)});const l=s.metadata;if(typeof Blob<"u"&&t instanceof Blob?(a=new FormData,a.append("cacheControl",s.cacheControl),l&&a.append("metadata",n.encodeMetadata(l)),a.append("",t)):typeof FormData<"u"&&t instanceof FormData?(a=t,a.has("cacheControl")||a.append("cacheControl",s.cacheControl),l&&!a.has("metadata")&&a.append("metadata",n.encodeMetadata(l))):(a=t,o["cache-control"]=`max-age=${s.cacheControl}`,o["content-type"]=s.contentType,l&&(o["x-metadata"]=n.toBase64(n.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!s.duplex&&(s.duplex="half")),i!=null&&i.headers)for(const[p,h]of Object.entries(i.headers))o=dr(o,p,h);const c=n._removeEmptyFolders(e),d=n._getFinalPath(c),u=await(r=="PUT"?Jr:Oe)(n.fetch,`${n.url}/object/${d}`,a,z({headers:o},s!=null&&s.duplex?{duplex:s.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}})}async upload(r,e,t){return this.uploadOrUpdate("POST",r,e,t)}async uploadToSignedUrl(r,e,t,i){var n=this;const a=n._removeEmptyFolders(r),s=n._getFinalPath(a),o=new URL(n.url+`/object/upload/sign/${s}`);return o.searchParams.set("token",e),n.handleOperation(async()=>{let l;const c=z(z({},Ki),i);let d=z(z({},n.headers),{"x-upsert":String(c.upsert)});const u=c.metadata;if(typeof Blob<"u"&&t instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),u&&l.append("metadata",n.encodeMetadata(u)),l.append("",t)):typeof FormData<"u"&&t instanceof FormData?(l=t,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),u&&!l.has("metadata")&&l.append("metadata",n.encodeMetadata(u))):(l=t,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType,u&&(d["x-metadata"]=n.toBase64(n.encodeMetadata(u))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),i!=null&&i.headers)for(const[p,h]of Object.entries(i.headers))d=dr(d,p,h);return{path:a,fullPath:(await Jr(n.fetch,o.toString(),l,z({headers:d},c!=null&&c.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(r,e){var t=this;return t.handleOperation(async()=>{let i=t._getFinalPath(r);const n=z({},t.headers);e!=null&&e.upsert&&(n["x-upsert"]="true");const a=await Oe(t.fetch,`${t.url}/object/upload/sign/${i}`,{},{headers:n}),s=new URL(t.url+a.url),o=s.searchParams.get("token");if(!o)throw new xr("No token returned by API");return{signedUrl:s.toString(),path:r,token:o}})}async update(r,e,t){return this.uploadOrUpdate("PUT",r,e,t)}async move(r,e,t){var i=this;return i.handleOperation(async()=>await Oe(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:r,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers}))}async copy(r,e,t){var i=this;return i.handleOperation(async()=>({path:(await Oe(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:r,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers})).Key}))}async createSignedUrl(r,e,t){var i=this;return i.handleOperation(async()=>{let n=i._getFinalPath(r);const a=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0;let s=await Oe(i.fetch,`${i.url}/object/sign/${n}`,z({expiresIn:e},a?{transform:t.transform}:{}),{headers:i.headers});const o=new URLSearchParams;t!=null&&t.download&&o.set("download",t.download===!0?"":t.download),(t==null?void 0:t.cacheNonce)!=null&&o.set("cacheNonce",String(t.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${i.url}${s.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(r,e,t){var i=this;return i.handleOperation(async()=>{const n=await Oe(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:r},{headers:i.headers}),a=new URLSearchParams;t!=null&&t.download&&a.set("download",t.download===!0?"":t.download),(t==null?void 0:t.cacheNonce)!=null&&a.set("cacheNonce",String(t.cacheNonce));const s=a.toString();return n.map(o=>z(z({},o),{},{signedUrl:o.signedURL?encodeURI(`${i.url}${o.signedURL}${s?`&${s}`:""}`):null}))})}download(r,e,t){const i=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",n=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(n,e.transform),(e==null?void 0:e.cacheNonce)!=null&&n.set("cacheNonce",String(e.cacheNonce));const a=n.toString(),s=this._getFinalPath(r),o=()=>jt(this.fetch,`${this.url}/${i}/${s}${a?`?${a}`:""}`,{headers:this.headers,noResolveJson:!0},t);return new Os(o,this.shouldThrowOnError)}async info(r){var e=this;const t=e._getFinalPath(r);return e.handleOperation(async()=>Gr(await jt(e.fetch,`${e.url}/object/info/${t}`,{headers:e.headers})))}async exists(r){var e=this;const t=e._getFinalPath(r);try{return await Rs(e.fetch,`${e.url}/object/${t}`,{headers:e.headers}),{data:!0,error:null}}catch(n){if(e.shouldThrowOnError)throw n;if(Sr(n)){var i;const a=n instanceof Vr?n.status:n instanceof Bn?(i=n.originalError)===null||i===void 0?void 0:i.status:void 0;if(a!==void 0&&[400,404].includes(a))return{data:!1,error:n}}throw n}}getPublicUrl(r,e){const t=this._getFinalPath(r),i=new URLSearchParams;e!=null&&e.download&&i.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(i,e.transform),(e==null?void 0:e.cacheNonce)!=null&&i.set("cacheNonce",String(e.cacheNonce));const n=i.toString(),a=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${t}`)+(n?`?${n}`:"")}}}async remove(r){var e=this;return e.handleOperation(async()=>await Mt(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:r},{headers:e.headers}))}async purgeCache(r,e,t){var i=this;return i.handleOperation(async()=>{const n=i._getFinalPath(r),a=new URLSearchParams;e!=null&&e.transformations&&a.set("transformations","true");const s=a.toString();return await Mt(i.fetch,`${i.url}/cdn/${n}${s?`?${s}`:""}`,{},{headers:i.headers},t)})}async list(r,e,t){var i=this;return i.handleOperation(async()=>{const n=e!=null&&e.sortBy?z(z({},Cr.sortBy),e.sortBy):Cr.sortBy,a=z(z(z({},Cr),e),{},{sortBy:n,prefix:r||""});return await Oe(i.fetch,`${i.url}/object/list/${i.bucketId}`,a,{headers:i.headers},t)})}async listV2(r,e){var t=this;return t.handleOperation(async()=>{const i=z({},r);return await Oe(t.fetch,`${t.url}/object/list-v2/${t.bucketId}`,i,{headers:t.headers},e)})}encodeMetadata(r){return JSON.stringify(r)}toBase64(r){return typeof Buffer<"u"?Buffer.from(r).toString("base64"):btoa(r)}_getFinalPath(r){return`${this.bucketId}/${r.replace(/^\/+/,"")}`}_removeEmptyFolders(r){return r.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(r,e){return e.width&&r.set("width",e.width.toString()),e.height&&r.set("height",e.height.toString()),e.resize&&r.set("resize",e.resize),e.format&&r.set("format",e.format),e.quality&&r.set("quality",e.quality.toString()),r}};const Bs="2.109.0",Kt={"X-Client-Info":`storage-js/${Bs}`};var Ds=class extends wt{constructor(r,e={},t,i){const n=new URL(r);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(n.hostname)&&!n.hostname.includes("storage.supabase.")&&(n.hostname=n.hostname.replace("supabase.","storage.supabase."));const a=n.href.replace(/\/$/,""),s=z(z({},Kt),e);super(a,s,t,"storage")}async listBuckets(r){var e=this;return e.handleOperation(async()=>{const t=e.listBucketOptionsToQueryString(r);return await jt(e.fetch,`${e.url}/bucket${t}`,{headers:e.headers})})}async getBucket(r){var e=this;return e.handleOperation(async()=>await jt(e.fetch,`${e.url}/bucket/${r}`,{headers:e.headers}))}async createBucket(r,e={public:!1}){var t=this;return t.handleOperation(async()=>await Oe(t.fetch,`${t.url}/bucket`,{id:r,name:r,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async updateBucket(r,e){var t=this;return t.handleOperation(async()=>await Jr(t.fetch,`${t.url}/bucket/${r}`,{id:r,name:r,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async emptyBucket(r){var e=this;return e.handleOperation(async()=>await Oe(e.fetch,`${e.url}/bucket/${r}/empty`,{},{headers:e.headers}))}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await Mt(e.fetch,`${e.url}/bucket/${r}`,{},{headers:e.headers}))}async purgeBucketCache(r,e,t){var i=this;return i.handleOperation(async()=>{const n=new URLSearchParams;e!=null&&e.transformations&&n.set("transformations","true");const a=n.toString();return await Mt(i.fetch,`${i.url}/cdn/${r}${a?`?${a}`:""}`,{},{headers:i.headers},t)})}listBucketOptionsToQueryString(r){const e={};return r&&("limit"in r&&(e.limit=String(r.limit)),"offset"in r&&(e.offset=String(r.offset)),r.search&&(e.search=r.search),r.sortColumn&&(e.sortColumn=r.sortColumn),r.sortOrder&&(e.sortOrder=r.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Ns=class extends wt{constructor(r,e={},t){const i=r.replace(/\/$/,""),n=z(z({},Kt),e);super(i,n,t,"storage")}async createBucket(r){var e=this;return e.handleOperation(async()=>await Oe(e.fetch,`${e.url}/bucket`,{name:r},{headers:e.headers}))}async listBuckets(r){var e=this;return e.handleOperation(async()=>{const t=new URLSearchParams;(r==null?void 0:r.limit)!==void 0&&t.set("limit",r.limit.toString()),(r==null?void 0:r.offset)!==void 0&&t.set("offset",r.offset.toString()),r!=null&&r.sortColumn&&t.set("sortColumn",r.sortColumn),r!=null&&r.sortOrder&&t.set("sortOrder",r.sortOrder),r!=null&&r.search&&t.set("search",r.search);const i=t.toString(),n=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await jt(e.fetch,n,{headers:e.headers})})}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await Mt(e.fetch,`${e.url}/bucket/${r}`,{},{headers:e.headers}))}from(r){var e=this;if(!$s(r))throw new xr("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const t=new ks({baseUrl:this.url,catalogName:r,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(t,{get(n,a){const s=n[a];return typeof s!="function"?s:async(...o)=>{try{return{data:await s.apply(n,o),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},zs=class extends wt{constructor(r,e={},t){const i=r.replace(/\/$/,""),n=z(z({},Kt),{},{"Content-Type":"application/json"},e);super(i,n,t,"vectors")}async createIndex(r){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/CreateIndex`,r,{headers:e.headers})||{})}async getIndex(r,e){var t=this;return t.handleOperation(async()=>await Te.post(t.fetch,`${t.url}/GetIndex`,{vectorBucketName:r,indexName:e},{headers:t.headers}))}async listIndexes(r){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/ListIndexes`,r,{headers:e.headers}))}async deleteIndex(r,e){var t=this;return t.handleOperation(async()=>await Te.post(t.fetch,`${t.url}/DeleteIndex`,{vectorBucketName:r,indexName:e},{headers:t.headers})||{})}},js=class extends wt{constructor(r,e={},t){const i=r.replace(/\/$/,""),n=z(z({},Kt),{},{"Content-Type":"application/json"},e);super(i,n,t,"vectors")}async putVectors(r){var e=this;if(r.vectors.length<1||r.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/PutVectors`,r,{headers:e.headers})||{})}async getVectors(r){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/GetVectors`,r,{headers:e.headers}))}async listVectors(r){var e=this;if(r.segmentCount!==void 0){if(r.segmentCount<1||r.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(r.segmentIndex!==void 0&&(r.segmentIndex<0||r.segmentIndex>=r.segmentCount))throw new Error(`segmentIndex must be between 0 and ${r.segmentCount-1}`)}return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/ListVectors`,r,{headers:e.headers}))}async queryVectors(r){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/QueryVectors`,r,{headers:e.headers}))}async deleteVectors(r){var e=this;if(r.keys.length<1||r.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/DeleteVectors`,r,{headers:e.headers})||{})}},Ms=class extends wt{constructor(r,e={},t){const i=r.replace(/\/$/,""),n=z(z({},Kt),{},{"Content-Type":"application/json"},e);super(i,n,t,"vectors")}async createBucket(r){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:r},{headers:e.headers})||{})}async getBucket(r){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:r},{headers:e.headers}))}async listBuckets(r={}){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/ListVectorBuckets`,r,{headers:e.headers}))}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await Te.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:r},{headers:e.headers})||{})}},qs=class extends Ms{constructor(r,e={}){super(r,e.headers||{},e.fetch)}from(r){return new Hs(this.url,this.headers,r,this.fetch)}async createBucket(r){var e=()=>super.createBucket,t=this;return e().call(t,r)}async getBucket(r){var e=()=>super.getBucket,t=this;return e().call(t,r)}async listBuckets(r={}){var e=()=>super.listBuckets,t=this;return e().call(t,r)}async deleteBucket(r){var e=()=>super.deleteBucket,t=this;return e().call(t,r)}},Hs=class extends zs{constructor(r,e,t,i){super(r,e,i),this.vectorBucketName=t}async createIndex(r){var e=()=>super.createIndex,t=this;return e().call(t,z(z({},r),{},{vectorBucketName:t.vectorBucketName}))}async listIndexes(r={}){var e=()=>super.listIndexes,t=this;return e().call(t,z(z({},r),{},{vectorBucketName:t.vectorBucketName}))}async getIndex(r){var e=()=>super.getIndex,t=this;return e().call(t,t.vectorBucketName,r)}async deleteIndex(r){var e=()=>super.deleteIndex,t=this;return e().call(t,t.vectorBucketName,r)}index(r){return new Fs(this.url,this.headers,this.vectorBucketName,r,this.fetch)}},Fs=class extends js{constructor(r,e,t,i,n){super(r,e,n),this.vectorBucketName=t,this.indexName=i}async putVectors(r){var e=()=>super.putVectors,t=this;return e().call(t,z(z({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(r){var e=()=>super.getVectors,t=this;return e().call(t,z(z({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(r={}){var e=()=>super.listVectors,t=this;return e().call(t,z(z({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(r){var e=()=>super.queryVectors,t=this;return e().call(t,z(z({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(r){var e=()=>super.deleteVectors,t=this;return e().call(t,z(z({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},Ws=class extends Ds{constructor(r,e={},t,i){super(r,e,t,i)}from(r){return new Us(this.url,this.headers,r,this.fetch)}get vectors(){return new qs(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Ns(this.url+"/iceberg",this.headers,this.fetch)}};const jn="2.109.0",We=30*1e3,It=3,Ir=It*We,Ks=2*We,Vs="http://localhost:9999",Gs="supabase.auth.token",Js={"X-Client-Info":`gotrue-js/${jn}`},Yr="X-Supabase-Api-Version",Mn={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Ys=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Qs=10*60*1e3;class qt extends Error{constructor(e,t,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=i}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function T(r){return typeof r=="object"&&r!==null&&"__isAuthError"in r}class Xs extends qt{constructor(e,t,i){super(e,t,i),this.name="AuthApiError",this.status=t,this.code=i}}function Zs(r){return T(r)&&r.name==="AuthApiError"}class Ue extends qt{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class je extends qt{constructor(e,t,i,n){super(e,i,n),this.name=t,this.status=i}}class me extends je{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Zt(r){return T(r)&&r.name==="AuthSessionMissingError"}class pt extends je{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class er extends je{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class tr extends je{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function eo(r){return T(r)&&r.name==="AuthImplicitGrantRedirectError"}class Vi extends je{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class to extends je{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Qr extends je{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function Gi(r){return T(r)&&r.name==="AuthRetryableFetchError"}class Ji extends je{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function ro(r){return T(r)&&r.name==="AuthRefreshDiscardedError"}class Yi extends je{constructor(e,t,i){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=i}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class ur extends je{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const pr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Qi=` 	
\r=`.split(""),io=(()=>{const r=new Array(128);for(let e=0;e<r.length;e+=1)r[e]=-1;for(let e=0;e<Qi.length;e+=1)r[Qi[e].charCodeAt(0)]=-2;for(let e=0;e<pr.length;e+=1)r[pr[e].charCodeAt(0)]=e;return r})();function Xi(r,e,t){if(r!==null)for(e.queue=e.queue<<8|r,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(pr[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(pr[i]),e.queuedBits-=6}}function qn(r,e,t){const i=io[r];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(r)}"`)}}function Zi(r){const e=[],t=s=>{e.push(String.fromCodePoint(s))},i={utf8seq:0,codepoint:0},n={queue:0,queuedBits:0},a=s=>{so(s,i,t)};for(let s=0;s<r.length;s+=1)qn(r.charCodeAt(s),n,a);return e.join("")}function no(r,e){if(r<=127){e(r);return}else if(r<=2047){e(192|r>>6),e(128|r&63);return}else if(r<=65535){e(224|r>>12),e(128|r>>6&63),e(128|r&63);return}else if(r<=1114111){e(240|r>>18),e(128|r>>12&63),e(128|r>>6&63),e(128|r&63);return}throw new Error(`Unrecognized Unicode codepoint: ${r.toString(16)}`)}function ao(r,e){for(let t=0;t<r.length;t+=1){let i=r.charCodeAt(t);if(i>55295&&i<=56319){const n=(i-55296)*1024&65535;i=(r.charCodeAt(t+1)-56320&65535|n)+65536,t+=1}no(i,e)}}function so(r,e,t){if(e.utf8seq===0){if(r<=127){t(r);return}for(let i=1;i<6;i+=1)if(!(r>>7-i&1)){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=r&31;else if(e.utf8seq===3)e.codepoint=r&15;else if(e.utf8seq===4)e.codepoint=r&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(r<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|r&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function bt(r){const e=[],t={queue:0,queuedBits:0},i=n=>{e.push(n)};for(let n=0;n<r.length;n+=1)qn(r.charCodeAt(n),t,i);return new Uint8Array(e)}function oo(r){const e=[];return ao(r,t=>e.push(t)),new Uint8Array(e)}function ot(r){const e=[],t={queue:0,queuedBits:0},i=n=>{e.push(n)};return r.forEach(n=>Xi(n,t,i)),Xi(null,t,i),e.join("")}function lo(r){return Math.round(Date.now()/1e3)+r}function co(){return Symbol("auth-callback")}const ye=()=>typeof window<"u"&&typeof document<"u",nt={tested:!1,writable:!1},Hn=()=>{if(!ye())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(nt.tested)return nt.writable;const r=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(r,r),globalThis.localStorage.removeItem(r),nt.tested=!0,nt.writable=!0}catch{nt.tested=!0,nt.writable=!1}return nt.writable};function uo(r){const e={},t=new URL(r);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((n,a)=>{e[a]=n})}catch{}return t.searchParams.forEach((i,n)=>{e[n]=i}),e}const Fn=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),po=r=>typeof r=="object"&&r!==null&&"status"in r&&"ok"in r&&"json"in r&&typeof r.json=="function",vt=async(r,e,t)=>{await r.setItem(e,JSON.stringify(t))},Re=async(r,e)=>{const t=await r.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return null}},ae=async(r,e)=>{await r.removeItem(e)};class _r{constructor(){this.promise=new _r.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}_r.promiseConstructor=Promise;function rr(r){const e=r.split(".");if(e.length!==3)throw new ur("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!Ys.test(e[i]))throw new ur("JWT not in base64url format");return{header:JSON.parse(Zi(e[0])),payload:JSON.parse(Zi(e[1])),signature:bt(e[2]),raw:{header:e[0],payload:e[1]}}}async function ho(r){return await new Promise(e=>{setTimeout(()=>e(null),r)})}function go(r,e){return new Promise((i,n)=>{(async()=>{for(let a=0;a<1/0;a++)try{const s=await r(a);if(!e(a,null,s)){i(s);return}}catch(s){if(!e(a,s)){n(s);return}}})()})}function mo(r){return("0"+r.toString(16)).substr(-2)}function fo(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=t.length;let n="";for(let a=0;a<56;a++)n+=t.charAt(Math.floor(Math.random()*i));return n}return crypto.getRandomValues(e),Array.from(e,mo).join("")}async function vo(r){const t=new TextEncoder().encode(r),i=await crypto.subtle.digest("SHA-256",t),n=new Uint8Array(i);return Array.from(n).map(a=>String.fromCharCode(a)).join("")}async function yo(r){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),r;const t=await vo(r);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function at(r,e,t=!1){const i=fo();let n=i;t&&(n+="/recovery"),await vt(r,`${e}-code-verifier`,n);const a=await yo(i);return[a,i===a?"plain":"s256"]}const bo=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function wo(r){const e=r.headers.get(Yr);if(!e||!e.match(bo))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function ko(r){if(!r)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(r<=e)throw new Error("JWT has expired")}function xo(r){switch(r){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const So=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function qe(r){if(!So.test(r))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Le(r){if(!r.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function Pr(){const r={};return new Proxy(r,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const i=t.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function _o(r,e){return new Proxy(r,{get:(t,i,n)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const a=i.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,i,n)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,i,n)}})}function en(r){return JSON.parse(JSON.stringify(r))}const st=r=>{if(typeof r=="object"&&r!==null){const e=r;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(r)},Ao=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function tn(r){var e;if(!po(r))throw new Qr(st(r),0);if(Ao.includes(r.status))throw new Qr(st(r),r.status);let t;try{t=await r.json()}catch(a){throw new Ue(st(a),a)}let i;const n=wo(r);if(n&&n.getTime()>=Mn["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?i=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(i=t.error_code),i){if(i==="weak_password")throw new Yi(st(t),r.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new me}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((a,s)=>a&&typeof s=="string",!0))throw new Yi(st(t),r.status,t.weak_password.reasons);throw new Xs(st(t),r.status||500,i)}const To=(r,e,t,i)=>{const n={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"?n:(n.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),n.body=JSON.stringify(i),Object.assign(Object.assign({},n),t))};async function L(r,e,t,i){var n;const a=Object.assign({},i==null?void 0:i.headers);a[Yr]||(a[Yr]=Mn["2024-01-01"].name),i!=null&&i.jwt&&(a.Authorization=`Bearer ${i.jwt}`);const s=(n=i==null?void 0:i.query)!==null&&n!==void 0?n:{};i!=null&&i.redirectTo&&(s.redirect_to=i.redirectTo);const o=Object.keys(s).length?"?"+new URLSearchParams(s).toString():"",l=await Eo(r,e,t+o,{headers:a,noResolveJson:i==null?void 0:i.noResolveJson},{},i==null?void 0:i.body);return i!=null&&i.xform?i==null?void 0:i.xform(l):{data:Object.assign({},l),error:null}}async function Eo(r,e,t,i,n,a){const s=To(e,i,n,a);let o;try{o=await r(t,Object.assign({},s))}catch(l){throw console.error(l),new Qr(st(l),0)}if(o.ok||await tn(o),i!=null&&i.noResolveJson)return o;try{return await o.json()}catch(l){await tn(l)}}function $e(r){var e;let t=null;Io(r)&&(t=Object.assign({},r),r.expires_at||(t.expires_at=lo(r.expires_in)));const i=(e=r.user)!==null&&e!==void 0?e:typeof(r==null?void 0:r.id)=="string"?r:null;return{data:{session:t,user:i},error:null}}function rn(r){const e=$e(r);return!e.error&&r.weak_password&&typeof r.weak_password=="object"&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.message&&typeof r.weak_password.message=="string"&&r.weak_password.reasons.reduce((t,i)=>t&&typeof i=="string",!0)&&(e.data.weak_password=r.weak_password),e}function Qe(r){var e;return{data:{user:(e=r.user)!==null&&e!==void 0?e:r},error:null}}function $o(r){return{data:r,error:null}}function Co(r){const{action_link:e,email_otp:t,hashed_token:i,redirect_to:n,verification_type:a}=r,s=kr(r,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:i,redirect_to:n,verification_type:a},l=Object.assign({},s);return{data:{properties:o,user:l},error:null}}function nn(r){return r}function Io(r){return!!r.access_token&&!!r.refresh_token&&!!r.expires_in}const Rr=["global","local","others"];class Po{constructor({url:e="",headers:t={},fetch:i,experimental:n}){this.url=e,this.headers=t,this.fetch=Fn(i),this.experimental=n??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=Rr[0]){if(Rr.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Rr.join(", ")}`);try{return await L(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if(T(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,t={}){try{return await L(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Qe})}catch(i){if(T(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:t}=e,i=kr(e,["options"]),n=Object.assign(Object.assign({},i),t);return"newEmail"in i&&(n.new_email=i==null?void 0:i.newEmail,delete n.newEmail),await L(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:n,headers:this.headers,xform:Co,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(T(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await L(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Qe})}catch(t){if(T(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,i,n,a,s,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await L(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(a=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&a!==void 0?a:""},xform:nn});if(d.error)throw d.error;const u=await d.json(),p=(s=d.headers.get("x-total-count"))!==null&&s!==void 0?s:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(m=>{const f=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(m.split(";")[1].split("=")[1]);c[`${v}Page`]=f}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(T(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){qe(e);try{return await L(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Qe})}catch(t){if(T(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){qe(e);try{return await L(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Qe})}catch(i){if(T(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,t=!1){qe(e);try{return await L(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Qe})}catch(i){if(T(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){qe(e.userId);try{const{data:t,error:i}=await L(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:n=>({data:{factors:n},error:null})});return{data:t,error:i}}catch(t){if(T(t))return{data:null,error:t};throw t}}async _deleteFactor(e){qe(e.userId),qe(e.id);try{return{data:await L(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(T(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,i,n,a,s,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await L(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(a=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&a!==void 0?a:""},xform:nn});if(d.error)throw d.error;const u=await d.json(),p=(s=d.headers.get("x-total-count"))!==null&&s!==void 0?s:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(m=>{const f=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(m.split(";")[1].split("=")[1]);c[`${v}Page`]=f}),c.total=parseInt(p)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(T(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await L(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await L(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await L(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(T(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await L(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(T(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await L(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _listCustomProviders(e){try{const t={};return e!=null&&e.type&&(t.type=e.type),await L(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:i=>{var n;return{data:{providers:(n=i==null?void 0:i.providers)!==null&&n!==void 0?n:[]},error:null}}})}catch(t){if(T(t))return{data:{providers:[]},error:t};throw t}}async _createCustomProvider(e){try{return await L(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _getCustomProvider(e){try{return await L(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _updateCustomProvider(e,t){try{return await L(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(T(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await L(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(T(t))return{data:null,error:t};throw t}}async _adminListPasskeys(e){Le(this.experimental),qe(e.userId);try{return await L(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(T(t))return{data:null,error:t};throw t}}async _adminDeletePasskey(e){Le(this.experimental),qe(e.userId),qe(e.passkeyId);try{return await L(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(T(t))return{data:null,error:t};throw t}}}function an(r={}){return{getItem:e=>r[e]||null,setItem:(e,t)=>{r[e]=t},removeItem:e=>{delete r[e]}}}globalThis&&Hn()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class Ro extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function Lo(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Wn(r){if(!/^0x[a-fA-F0-9]{40}$/.test(r))throw new Error(`@supabase/auth-js: Address "${r}" is invalid.`);return r.toLowerCase()}function Oo(r){return parseInt(r,16)}function Uo(r){const e=new TextEncoder().encode(r);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function Bo(r){var e;const{chainId:t,domain:i,expirationTime:n,issuedAt:a=new Date,nonce:s,notBefore:o,requestId:l,resources:c,scheme:d,uri:u,version:p}=r;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(s&&s.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${s}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((e=r.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${r.statement}`)}const h=Wn(r.address),m=d?`${d}://${i}`:i,f=r.statement?`${r.statement}
`:"",v=`${m} wants you to sign in with your Ethereum account:
${h}

${f}`;let y=`URI: ${u}
Version: ${p}
Chain ID: ${t}${s?`
Nonce: ${s}`:""}
Issued At: ${a.toISOString()}`;if(n&&(y+=`
Expiration Time: ${n.toISOString()}`),o&&(y+=`
Not Before: ${o.toISOString()}`),l&&(y+=`
Request ID: ${l}`),c){let w=`
Resources:`;for(const k of c){if(!k||typeof k!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${k}`);w+=`
- ${k}`}y+=w}return`${v}
${y}`}class le extends Error{constructor({message:e,code:t,cause:i,name:n}){var a;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(a=n??(i instanceof Error?i.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class hr extends le{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function Do({error:r,options:e}){var t,i,n;const{publicKey:a}=e;if(!a)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new le({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else if(r.name==="ConstraintError"){if(((t=a.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new le({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:r});if(e.mediation==="conditional"&&((i=a.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new le({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:r});if(((n=a.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new le({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:r})}else{if(r.name==="InvalidStateError")return new le({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:r});if(r.name==="NotAllowedError")return new le({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new le({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:r}):new le({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:r});if(r.name==="SecurityError"){const s=window.location.hostname;if(Kn(s)){if(a.rp.id!==s)return new le({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new le({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new le({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:r})}else if(r.name==="UnknownError")return new le({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new le({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}function No({error:r,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new le({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else{if(r.name==="NotAllowedError")return new le({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="SecurityError"){const i=window.location.hostname;if(Kn(i)){if(t.rpId!==i)return new le({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new le({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="UnknownError")return new le({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new le({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}class zo{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Xr=new zo;function sn(r){if(!r)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(r);const{challenge:e,user:t,excludeCredentials:i}=r,n=kr(r,["challenge","user","excludeCredentials"]),a=bt(e).buffer,s=Object.assign(Object.assign({},t),{id:bt(t.id).buffer}),o=Object.assign(Object.assign({},n),{challenge:a,user:s});if(i&&i.length>0){o.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:bt(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function on(r){if(!r)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(r);const{challenge:e,allowCredentials:t}=r,i=kr(r,["challenge","allowCredentials"]),n=bt(e).buffer,a=Object.assign(Object.assign({},i),{challenge:n});if(t&&t.length>0){a.allowCredentials=new Array(t.length);for(let s=0;s<t.length;s++){const o=t[s];a.allowCredentials[s]=Object.assign(Object.assign({},o),{id:bt(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function ln(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r;return{id:r.id,rawId:r.id,response:{attestationObject:ot(new Uint8Array(r.response.attestationObject)),clientDataJSON:ot(new Uint8Array(r.response.clientDataJSON))},type:"public-key",clientExtensionResults:r.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function cn(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r,i=r.getClientExtensionResults(),n=r.response;return{id:r.id,rawId:r.id,response:{authenticatorData:ot(new Uint8Array(n.authenticatorData)),clientDataJSON:ot(new Uint8Array(n.clientDataJSON)),signature:ot(new Uint8Array(n.signature)),userHandle:n.userHandle?ot(new Uint8Array(n.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Kn(r){return r==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(r)}function gr(){var r,e;return!!(ye()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((r=navigator==null?void 0:navigator.credentials)===null||r===void 0?void 0:r.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Vn(r){try{const e=await navigator.credentials.create(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new hr("Browser returned unexpected credential type",e)}:{data:null,error:new hr("Empty credential response",e)}}catch(e){return{data:null,error:Do({error:e,options:r})}}}async function Gn(r){try{const e=await navigator.credentials.get(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new hr("Browser returned unexpected credential type",e)}:{data:null,error:new hr("Empty credential response",e)}}catch(e){return{data:null,error:No({error:e,options:r})}}}const jo={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Mo={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function mr(...r){const e=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),t=n=>n instanceof ArrayBuffer||ArrayBuffer.isView(n),i={};for(const n of r)if(n)for(const a in n){const s=n[a];if(s!==void 0)if(Array.isArray(s))i[a]=s;else if(t(s))i[a]=s;else if(e(s)){const o=i[a];e(o)?i[a]=mr(o,s):i[a]=mr(s)}else i[a]=s}return i}function qo(r,e){return mr(jo,r,e||{})}function Ho(r,e){return mr(Mo,r,e||{})}class Fo{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:i,signal:n},a){var s;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!o)return{data:null,error:l};const c=n??Xr.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:d}=o.webauthn.credential_options.publicKey;if(!d.name){const u=i;if(u)d.name=`${d.id}:${u}`;else{const h=(await this.client.getUser()).data.user,m=((s=h==null?void 0:h.user_metadata)===null||s===void 0?void 0:s.name)||(h==null?void 0:h.email)||(h==null?void 0:h.id)||"User";d.name=`${d.id}:${m}`}}d.displayName||(d.displayName=d.name)}switch(o.webauthn.type){case"create":{const d=qo(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:u,error:p}=await Vn({publicKey:d,signal:c});return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}case"request":{const d=Ho(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:u,error:p}=await Gn(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:d,signal:c}));return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}}}catch(o){return T(o)?{data:null,error:o}:{data:null,error:new Ue("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:t,webauthn:i}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},a){if(!t)return{data:null,error:new qt("rpId is required for WebAuthn authentication")};try{if(!gr())return{data:null,error:new Ue("Browser does not support WebAuthn",null)};const{data:s,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:i},signal:n},{request:a});if(!s)return{data:null,error:o};const{webauthn:l}=s;return this._verify({factorId:e,challengeId:s.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:i,credential_response:l.credential_response}})}catch(s){return T(s)?{data:null,error:s}:{data:null,error:new Ue("Unexpected error in authenticate",s)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},a){if(!t)return{data:null,error:new qt("rpId is required for WebAuthn registration")};try{if(!gr())return{data:null,error:new Ue("Browser does not support WebAuthn",null)};const{data:s,error:o}=await this._enroll({friendlyName:e});if(!s)return await this.client.mfa.listFactors().then(d=>{var u;return(u=d.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===e&&p.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:s.id,friendlyName:s.friendly_name,webauthn:{rpId:t,rpOrigins:i},signal:n},{create:a});return l?this._verify({factorId:s.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(s){return T(s)?{data:null,error:s}:{data:null,error:new Ue("Unexpected error in register",s)}}}}Lo();const Wo={url:Vs,storageKey:Gs,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Js,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},ht={};class Ht{get jwks(){var e,t;return(t=(e=ht[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){ht[this.storageKey]=Object.assign(Object.assign({},ht[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=ht[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){ht[this.storageKey]=Object.assign(Object.assign({},ht[this.storageKey]),{cachedAt:e})}constructor(e){var t,i,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},Wo),e);if(this.storageKey=a.storageKey,this.instanceID=(t=Ht.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,Ht.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&ye()){const s=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(s),this.logDebugMessages&&console.trace(s)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.experimental=(i=a.experimental)!==null&&i!==void 0?i:{},this.admin=new Po({url:a.url,headers:a.headers,fetch:a.fetch,experimental:this.experimental}),this.url=a.url,this.headers=a.headers,this.fetch=Fn(a.fetch),this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock!=null&&(this.lock=a.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Fo(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:Hn()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=an(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=an(this.memoryStorage)),ye()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(s){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",s)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async s=>{this._debug("received broadcast notification from other tab or client",s),(s.data.event==="TOKEN_REFRESHED"||s.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(s.data.event,s.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}a.skipAutoInitialize||this.initialize().catch(s=>{this._debug("#initialize()","error",s)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${jn}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())(),await this.initializePromise)}async _initialize(){var e;try{let t={},i="none";if(ye()&&(t=uo(window.location.href),this._isImplicitGrantCallback(t)?i="implicit":await this._isPKCECallback(t)&&(i="pkce")),ye()&&this.detectSessionInUrl&&i!=="none"){const{data:n,error:a}=await this._getSessionFromURL(t,i);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),eo(a)){const l=(e=a.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:s,redirectType:o}=n;return this._debug("#_initialize()","detected session in URL",s,"redirect type",o),await this._saveSession(s),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",s):await this._notifyAllSubscribers("SIGNED_IN",s)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return T(t)?this._returnResult({error:t}):this._returnResult({error:new Ue("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,i,n;try{const a=await L(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}},xform:$e}),{data:s,error:o}=a;if(o||!s)return this._returnResult({data:{user:null,session:null},error:o});const l=s.session,c=s.user;return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(T(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(e){var t,i,n;try{let a;if("email"in e){const{email:d,password:u,options:p}=e;let h=null,m=null;this.flowType==="pkce"&&([h,m]=await at(this.storage,this.storageKey)),a=await L(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:p==null?void 0:p.emailRedirectTo,body:{email:d,password:u,data:(t=p==null?void 0:p.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken},code_challenge:h,code_challenge_method:m},xform:$e})}else if("phone"in e){const{phone:d,password:u,options:p}=e;a=await L(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:d,password:u,data:(i=p==null?void 0:p.data)!==null&&i!==void 0?i:{},channel:(n=p==null?void 0:p.channel)!==null&&n!==void 0?n:"sms",gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken}},xform:$e})}else throw new er("You must provide either an email or phone number and a password");const{data:s,error:o}=a;if(o||!s)return await ae(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=s.session,c=s.user;return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(e){try{let t;if("email"in e){const{email:a,password:s,options:o}=e;t=await L(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:s,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:rn})}else if("phone"in e){const{phone:a,password:s,options:o}=e;t=await L(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:s,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:rn})}else throw new er("You must provide either an email or phone number and a password");const{data:i,error:n}=t;if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!i||!i.session||!i.user){const a=new pt;return this._returnResult({data:{user:null,session:null},error:a})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:n})}catch(t){if(T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,i,n,a;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(n=e.options)===null||n===void 0?void 0:n.queryParams,skipBrowserRedirect:(a=e.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e)):this._exchangeCodeForSession(e)}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,i,n,a,s,o,l,c,d,u,p;let h,m;if("message"in e)h=e.message,m=e.signature;else{const{chain:f,wallet:v,statement:y,options:w}=e;let k;if(ye())if(typeof v=="object")k=v;else{const O=window;if("ethereum"in O&&typeof O.ethereum=="object"&&"request"in O.ethereum&&typeof O.ethereum.request=="function")k=O.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(w!=null&&w.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=v}const P=new URL((t=w==null?void 0:w.url)!==null&&t!==void 0?t:window.location.href),D=await k.request({method:"eth_requestAccounts"}).then(O=>O).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!D||D.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const I=Wn(D[0]);let E=(i=w==null?void 0:w.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!E){const O=await k.request({method:"eth_chainId"});E=Oo(O)}const K={domain:P.host,address:I,statement:y,uri:P.href,version:"1",chainId:E,nonce:(n=w==null?void 0:w.signInWithEthereum)===null||n===void 0?void 0:n.nonce,issuedAt:(s=(a=w==null?void 0:w.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&s!==void 0?s:new Date,expirationTime:(o=w==null?void 0:w.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=w==null?void 0:w.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=w==null?void 0:w.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=w==null?void 0:w.signInWithEthereum)===null||d===void 0?void 0:d.resources};h=Bo(K),m=await k.request({method:"personal_sign",params:[Uo(h),I]})}try{const{data:f,error:v}=await L(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:m},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:$e});if(v)throw v;if(!f||!f.session||!f.user){const y=new pt;return this._returnResult({data:{user:null,session:null},error:y})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:v})}catch(f){if(T(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async signInWithSolana(e){var t,i,n,a,s,o,l,c,d,u,p,h;let m,f;if("message"in e)m=e.message,f=e.signature;else{const{chain:v,wallet:y,statement:w,options:k}=e;let P;if(ye())if(typeof y=="object")P=y;else{const I=window;if("solana"in I&&typeof I.solana=="object"&&("signIn"in I.solana&&typeof I.solana.signIn=="function"||"signMessage"in I.solana&&typeof I.solana.signMessage=="function"))P=I.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(k!=null&&k.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");P=y}const D=new URL((t=k==null?void 0:k.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in P&&P.signIn){const I=await P.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},k==null?void 0:k.signInWithSolana),{version:"1",domain:D.host,uri:D.href}),w?{statement:w}:null));let E;if(Array.isArray(I)&&I[0]&&typeof I[0]=="object")E=I[0];else if(I&&typeof I=="object"&&"signedMessage"in I&&"signature"in I)E=I;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in E&&"signature"in E&&(typeof E.signedMessage=="string"||E.signedMessage instanceof Uint8Array)&&E.signature instanceof Uint8Array)m=typeof E.signedMessage=="string"?E.signedMessage:new TextDecoder().decode(E.signedMessage),f=E.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in P)||typeof P.signMessage!="function"||!("publicKey"in P)||typeof P!="object"||!P.publicKey||!("toBase58"in P.publicKey)||typeof P.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");m=[`${D.host} wants you to sign in with your Solana account:`,P.publicKey.toBase58(),...w?["",w,""]:[""],"Version: 1",`URI: ${D.href}`,`Issued At: ${(n=(i=k==null?void 0:k.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&n!==void 0?n:new Date().toISOString()}`,...!((a=k==null?void 0:k.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${k.signInWithSolana.notBefore}`]:[],...!((s=k==null?void 0:k.signInWithSolana)===null||s===void 0)&&s.expirationTime?[`Expiration Time: ${k.signInWithSolana.expirationTime}`]:[],...!((o=k==null?void 0:k.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${k.signInWithSolana.chainId}`]:[],...!((l=k==null?void 0:k.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${k.signInWithSolana.nonce}`]:[],...!((c=k==null?void 0:k.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${k.signInWithSolana.requestId}`]:[],...!((u=(d=k==null?void 0:k.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||u===void 0)&&u.length?["Resources",...k.signInWithSolana.resources.map(E=>`- ${E}`)]:[]].join(`
`);const I=await P.signMessage(new TextEncoder().encode(m),"utf8");if(!I||!(I instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");f=I}}try{const{data:v,error:y}=await L(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:m,signature:ot(f)},!((p=e.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:$e});if(y)throw y;if(!v||!v.session||!v.user){const w=new pt;return this._returnResult({data:{user:null,session:null},error:w})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:y})}catch(v){if(T(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async _exchangeCodeForSession(e){const t=await Re(this.storage,`${this.storageKey}-code-verifier`),[i,n]=(t??"").split("/");try{if(!i&&this.flowType==="pkce")throw new to;const{data:a,error:s}=await L(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:i},xform:$e});if(await ae(this.storage,`${this.storageKey}-code-verifier`),s)throw s;if(!a||!a.session||!a.user){const o=new pt;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers(n==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",a.session)),this._returnResult({data:Object.assign(Object.assign({},a),{redirectType:n??null}),error:s})}catch(a){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(a))return this._returnResult({data:{user:null,session:null,redirectType:null},error:a});throw a}}async signInWithIdToken(e){try{const{options:t,provider:i,token:n,access_token:a,nonce:s}=e,o=await L(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:n,access_token:a,nonce:s,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:$e}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new pt;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if(T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,i,n,a,s;try{if("email"in e){const{email:o,options:l}=e;let c=null,d=null;this.flowType==="pkce"&&([c,d]=await at(this.storage,this.storageKey));const{error:u}=await L(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:d},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:d}=await L(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(n=l==null?void 0:l.data)!==null&&n!==void 0?n:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(s=l==null?void 0:l.channel)!==null&&s!==void 0?s:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:d})}throw new er("You must provide either an email or phone number.")}catch(o){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var t,i;try{let n,a;"options"in e&&(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo,a=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:s,error:o}=await L(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:a}}),redirectTo:n,xform:$e});if(o)throw o;if(!s)throw new Error("An error occurred on token verification.");const l=s.session,c=s.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(T(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithSSO(e){var t,i,n,a,s;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await at(this.storage,this.storageKey));const c=await L(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&i!==void 0?i:void 0}),!((n=e==null?void 0:e.options)===null||n===void 0)&&n.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:$o});return!((a=c.data)===null||a===void 0)&&a.url&&ye()&&!(!((s=e.options)===null||s===void 0)&&s.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)throw i;if(!t)throw new me;const{error:n}=await L(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:n})})}catch(e){if(T(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:i,type:n,options:a}=e;let s=null,o=null;this.flowType==="pkce"&&([s,o]=await at(this.storage,this.storageKey));const{error:l}=await L(this.fetch,"POST",t,{headers:this.headers,body:{email:i,type:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken},code_challenge:s,code_challenge_method:o},redirectTo:a==null?void 0:a.emailRedirectTo});return l&&await ae(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:l})}else if("phone"in e){const{phone:i,type:n,options:a}=e,{data:s,error:o}=await L(this.fetch,"POST",t,{headers:this.headers,body:{phone:i,type:n,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:s==null?void 0:s.message_id},error:o})}throw new er("You must provide either an email or phone number and a type")}catch(t){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await i,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=t();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const n=[...this.pendingInLock];await Promise.all(n),this.pendingInLock.splice(0,n.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await Re(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<Ir:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i){if(this.userStorage){const s=await Re(this.userStorage,this.storageKey+"-user");s!=null&&s.user?e.user=s.user:e.user=Pr()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const s={value:this.suppressGetSessionWarning};e.user=_o(e.user,s),s.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:n,error:a}=await this._callRefreshToken(e.refresh_token);if(a){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const o=await Re(this.storage,this.storageKey);if(o&&o.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:a})}return this._returnResult({data:{session:n},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t;return this.lock!=null?t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):t=await this._getUser(),t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await L(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Qe}):await this._useSession(async t=>{var i,n,a;const{data:s,error:o}=t;if(o)throw o;return!(!((i=s.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new me}:await L(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(n=s.session)===null||n===void 0?void 0:n.access_token)!==null&&a!==void 0?a:void 0,xform:Qe})})}catch(t){if(T(t))return Zt(t)&&(await this._removeSession(),await ae(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t)):await this._updateUser(e,t)}async _updateUser(e,t={}){try{return await this._useSession(async i=>{const{data:n,error:a}=i;if(a)throw a;if(!n.session)throw new me;const s=n.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await at(this.storage,this.storageKey));const{data:c,error:d}=await L(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:s.access_token,xform:Qe});if(d)throw d;return s.user=c.user,await this._saveSession(s),await this._notifyAllSubscribers("USER_UPDATED",s),this._returnResult({data:{user:s.user},error:null})})}catch(i){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(i))return this._returnResult({data:{user:null},error:i});throw i}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new me;const t=Date.now()/1e3;let i=t,n=!0,a=null;const{payload:s}=rr(e.access_token);if(s.exp&&(i=s.exp,n=i<=t),n){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});a={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:i-t,expires_at:i},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(t){if(T(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async t=>{var i;if(!e){const{data:s,error:o}=t;if(o)throw o;e=(i=s.session)!==null&&i!==void 0?i:void 0}if(!(e!=null&&e.refresh_token))throw new me;const{data:n,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(T(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){var i;try{if(!ye())throw new tr("No browser detected.");if(e.error||e.error_description||e.error_code)throw new tr(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new Vi("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new tr("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Vi("No code detected.");const{data:k,error:P}=await this._exchangeCodeForSession(e.code);if(P)throw P;const D=new URL(window.location.href);return D.searchParams.delete("code"),window.history.replaceState(window.history.state,"",D.toString()),{data:{session:k.session,redirectType:(i=k.redirectType)!==null&&i!==void 0?i:null},error:null}}const{provider_token:n,provider_refresh_token:a,access_token:s,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=e;if(!s||!l||!o||!d)throw new tr("No session defined in URL");const u=Math.round(Date.now()/1e3),p=parseInt(l);let h=u+p;c&&(h=parseInt(c));const m=h-u;m*1e3<=We&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${p}s`);const f=h-p;u-f>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",f,h,u):u-f<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",f,h,u);const{data:v,error:y}=await this._getUser(s);if(y)throw y;const w={provider_token:n,provider_refresh_token:a,access_token:s,expires_in:p,expires_at:h,refresh_token:o,token_type:d,user:v.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:w,redirectType:e.type},error:null})}catch(n){if(T(n))return this._returnResult({data:{session:null,redirectType:null},error:n});throw n}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){const t=await Re(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var i;const{data:n,error:a}=t;if(a&&!Zt(a))return this._returnResult({error:a});const s=(i=n.session)===null||i===void 0?void 0:i.access_token;if(s){const{error:o}=await this.admin.signOut(s,e);if(o&&!(Zs(o)&&(o.status===404||o.status===401||o.status===403)||Zt(o)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await ae(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=co(),i={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,i),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)}):await this._emitInitialSession(t)))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async t=>{var i,n;try{const{data:{session:a},error:s}=t;if(s)throw s;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",e,"session",a)}catch(a){await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",a),Zt(a)?console.warn(a):console.error(a)}})}async resetPasswordForEmail(e,t={}){let i=null,n=null;this.flowType==="pkce"&&([i,n]=await at(this.storage,this.storageKey,!0));try{return await L(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:n,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(a){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var e;try{const{data:t,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:i,error:n}=await this._useSession(async a=>{var s,o,l,c,d;const{data:u,error:p}=a;if(p)throw p;const h=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(s=e.options)===null||s===void 0?void 0:s.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await L(this.fetch,"GET",h,{headers:this.headers,jwt:(d=(c=u.session)===null||c===void 0?void 0:c.access_token)!==null&&d!==void 0?d:void 0})});if(n)throw n;return ye()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(i==null?void 0:i.url),this._returnResult({data:{provider:e.provider,url:i==null?void 0:i.url},error:null})}catch(i){if(T(i))return this._returnResult({data:{provider:e.provider,url:null},error:i});throw i}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var i;try{const{error:n,data:{session:a}}=t;if(n)throw n;const{options:s,provider:o,token:l,access_token:c,nonce:d}=e,u=await L(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=a==null?void 0:a.access_token)!==null&&i!==void 0?i:void 0,body:{provider:o,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:s==null?void 0:s.captchaToken}},xform:$e}),{data:p,error:h}=u;return h?this._returnResult({data:{user:null,session:null},error:h}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new pt}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:h}))}catch(n){if(await ae(this.storage,`${this.storageKey}-code-verifier`),T(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var i,n;const{data:a,error:s}=t;if(s)throw s;return await L(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(n=(i=a.session)===null||i===void 0?void 0:i.access_token)!==null&&n!==void 0?n:void 0})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t="#_refreshAccessToken()";this._debug(t,"begin");try{const i=Date.now();return await go(async n=>(n>0&&await ho(200*Math.pow(2,n-1)),this._debug(t,"refreshing attempt",n),await L(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:$e})),(n,a)=>{const s=200*Math.pow(2,n);return a&&Gi(a)&&Date.now()+s-i<We})}catch(i){if(this._debug(t,"error",i),T(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const i=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",i),ye()&&!t.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i},error:null}}async _recoverAndRefresh(){var e,t;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const n=await Re(this.storage,this.storageKey);if(n&&this.userStorage){let s=await Re(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!s&&(s={user:n.user},await vt(this.userStorage,this.storageKey+"-user",s)),n.user=(e=s==null?void 0:s.user)!==null&&e!==void 0?e:Pr()}else if(n&&!n.user&&!n.user){const s=await Re(this.storage,this.storageKey+"-user");s&&(s!=null&&s.user)?(n.user=s.user,await ae(this.storage,this.storageKey+"-user"),await vt(this.storage,this.storageKey,n)):n.user=Pr()}if(this._debug(i,"session from storage",n),!this._isValidSession(n)){this._debug(i,"session is not valid"),n!==null&&await this._removeSession();return}const a=((t=n.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<Ir;if(this._debug(i,`session has${a?"":" not"} expired with margin of ${Ir}s`),a){if(this.autoRefreshToken&&n.refresh_token){const{error:s}=await this._callRefreshToken(n.refresh_token);s&&(ro(s)?this._debug(i,"refresh discarded by commit guard",s):this._debug(i,"refresh failed",s))}}else if(n.user&&n.user.__isUserNotAvailableProxy===!0)try{const{data:s,error:o}=await this._getUser(n.access_token);!o&&(s!=null&&s.user)?(n.user=s.user,await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(s){console.error("Error getting user data:",s),this._debug(i,"error getting user data, skipping SIGNED_IN notification",s)}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(i,"error",n),console.error(n);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var t,i;if(!e)throw new me;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const n="#_callRefreshToken()";this._debug(n,"begin");try{this.refreshingDeferred=new _r;const a=await Re(this.storage,this.storageKey),{data:s,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!s.session)throw new me;const l=await Re(this.storage,this.storageKey);if(a!==null&&(l===null||l.refresh_token!==a.refresh_token)){this._debug(n,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const p={data:null,error:new Ji};return this.refreshingDeferred.resolve(p),p}const d=this._sessionRemovalEpoch;if(await this._saveSession(s.session),this._sessionRemovalEpoch!==d){this._debug(n,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await ae(this.storage,this.storageKey),this.userStorage&&await ae(this.userStorage,this.storageKey+"-user");const p={data:null,error:new Ji};return this.refreshingDeferred.resolve(p),p}await this._notifyAllSubscribers("TOKEN_REFRESHED",s.session);const u={data:s.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(u),u}catch(a){if(this._debug(n,"error",a),T(a)){const s={data:null,error:a};if(!Gi(a)){const o=await Re(this.storage,this.storageKey);!!(o!=null&&o.expires_at&&o.expires_at*1e3>Date.now())?this._debug(n,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:s,expiresAt:Date.now()+Ks},(t=this.refreshingDeferred)===null||t===void 0||t.resolve(s),s}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(a),a}finally{this.refreshingDeferred=null,this._debug(n,"end")}}async _notifyAllSubscribers(e,t,i=!0){const n=`#_notifyAllSubscribers(${e})`;this._debug(n,"begin",t,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:t});const a=[],s=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){a.push(l)}});if(await Promise.all(s),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(n,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await ae(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),i=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&t.user&&await vt(this.userStorage,this.storageKey+"-user",{user:t.user});const n=Object.assign({},t);delete n.user;const a=en(n);await vt(this.storage,this.storageKey,a)}else{const n=en(t);await vt(this.storage,this.storageKey,n)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await ae(this.storage,this.storageKey),await ae(this.storage,this.storageKey+"-code-verifier"),await ae(this.storage,this.storageKey+"-user"),this.userStorage&&await ae(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&ye()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),We);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((i.expires_at*1e3-e)/We);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${We}ms, refresh threshold is ${It} ticks`),n<=It&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof Ro)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((i.expires_at*1e3-e)/We);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${We}ms, refresh threshold is ${It} ticks`),n<=It&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!ye()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;if(this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(t,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,i){const n=[`provider=${encodeURIComponent(t)}`];if(i!=null&&i.redirectTo&&n.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),i!=null&&i.scopes&&n.push(`scopes=${encodeURIComponent(i.scopes)}`),this.flowType==="pkce"){const[a,s]=await at(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(s)}`});n.push(o.toString())}if(i!=null&&i.queryParams){const a=new URLSearchParams(i.queryParams);n.push(a.toString())}return i!=null&&i.skipBrowserRedirect&&n.push(`skip_http_redirect=${i.skipBrowserRedirect}`),`${e}?${n.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var i;const{data:n,error:a}=t;return a?this._returnResult({data:null,error:a}):await L(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=n==null?void 0:n.session)===null||i===void 0?void 0:i.access_token})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var i,n;const{data:a,error:s}=t;if(s)return this._returnResult({data:null,error:s});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await L(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(i=a==null?void 0:a.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((n=l==null?void 0:l.totp)===null||n===void 0)&&n.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){const t=async()=>{try{return await this._useSession(async i=>{var n;const{data:a,error:s}=i;if(s)return this._returnResult({data:null,error:s});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?ln(e.webauthn.credential_response):cn(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await L(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(n=a==null?void 0:a.session)===null||n===void 0?void 0:n.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(i){if(T(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,t):t()}async _challenge(e){const t=async()=>{try{return await this._useSession(async i=>{var n;const{data:a,error:s}=i;if(s)return this._returnResult({data:null,error:s});const o=await L(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(n=a==null?void 0:a.session)===null||n===void 0?void 0:n.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:sn(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:on(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(i){if(T(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,t):t()}async _challengeAndVerify(e){const{data:t,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:i}=await this.getUser();if(i)return{data:null,error:i};const n={all:[],phone:[],totp:[],webauthn:[]};for(const a of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])n.all.push(a),a.status==="verified"&&n[a.factor_type].push(a);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){var t,i,n,a;if(e)try{const{payload:h}=rr(e);let m=null;h.aal&&(m=h.aal);let f=m;const{data:{user:v},error:y}=await this.getUser(e);if(y)return this._returnResult({data:null,error:y});((i=(t=v==null?void 0:v.factors)===null||t===void 0?void 0:t.filter(P=>P.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(f="aal2");const k=h.amr||[];return{data:{currentLevel:m,nextLevel:f,currentAuthenticationMethods:k},error:null}}catch(h){if(T(h))return this._returnResult({data:null,error:h});throw h}const{data:{session:s},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=rr(s.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((a=(n=s.user.factors)===null||n===void 0?void 0:n.filter(h=>h.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(d="aal2");const p=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:i},error:n}=t;return n?this._returnResult({data:null,error:n}):i?await L(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new me})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:n},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!n)return this._returnResult({data:null,error:new me});const s=await L(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return s.data&&s.data.redirect_url&&ye()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(s.data.redirect_url),s})}catch(i){if(T(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:n},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!n)return this._returnResult({data:null,error:new me});const s=await L(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return s.data&&s.data.redirect_url&&ye()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(s.data.redirect_url),s})}catch(i){if(T(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;return i?this._returnResult({data:null,error:i}):t?await L(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new me})})}catch(e){if(T(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:i},error:n}=t;return n?this._returnResult({data:null,error:n}):i?(await L(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new me})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let i=t.keys.find(o=>o.kid===e);if(i)return i;const n=Date.now();if(i=this.jwks.keys.find(o=>o.kid===e),i&&this.jwks_cached_at+Qs>n)return i;const{data:a,error:s}=await L(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(s)throw s;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=n,i=a.keys.find(o=>o.kid===e),!i)?null:i}async getClaims(e,t={}){try{let i=e;if(!i){const{data:h,error:m}=await this.getSession();if(m||!h.session)return this._returnResult({data:null,error:m});i=h.session.access_token}const{header:n,payload:a,signature:s,raw:{header:o,payload:l}}=rr(i);if(!(t!=null&&t.allowExpired))try{ko(a.exp)}catch(h){throw new ur(h instanceof Error?h.message:"JWT validation failed")}const c=!n.alg||n.alg.startsWith("HS")||!n.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(n.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:h}=await this.getUser(i);if(h)throw h;return{data:{claims:a,header:n,signature:s},error:null}}const d=xo(n.alg),u=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,u,s,oo(`${o}.${l}`)))throw new ur("Invalid JWT signature");return{data:{claims:a,header:n,signature:s},error:null}}catch(i){if(T(i))return this._returnResult({data:null,error:i});throw i}}async signInWithPasskey(e){var t,i,n;Le(this.experimental);try{if(!gr())return this._returnResult({data:null,error:new Ue("Browser does not support WebAuthn",null)});const{data:a,error:s}=await this._startPasskeyAuthentication({options:{captchaToken:(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.captchaToken}});if(s||!a)return this._returnResult({data:null,error:s});const o=on(a.options),l=(n=(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.signal)!==null&&n!==void 0?n:Xr.createNewAbortSignal(),{data:c,error:d}=await Gn({publicKey:o,signal:l});if(d||!c)return this._returnResult({data:null,error:d??new Ue("WebAuthn ceremony failed",null)});const u=cn(c);return this._verifyPasskeyAuthentication({challengeId:a.challenge_id,credential:u})}catch(a){if(T(a))return this._returnResult({data:null,error:a});throw a}}async registerPasskey(e){var t,i;Le(this.experimental);try{if(!gr())return this._returnResult({data:null,error:new Ue("Browser does not support WebAuthn",null)});const{data:n,error:a}=await this._startPasskeyRegistration();if(a||!n)return this._returnResult({data:null,error:a});const s=sn(n.options),o=(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.signal)!==null&&i!==void 0?i:Xr.createNewAbortSignal(),{data:l,error:c}=await Vn({publicKey:s,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new Ue("WebAuthn ceremony failed",null)});const d=ln(l);return this._verifyPasskeyRegistration({challengeId:n.challenge_id,credential:d})}catch(n){if(T(n))return this._returnResult({data:null,error:n});throw n}}async _startPasskeyRegistration(){Le(this.experimental);try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!t)return this._returnResult({data:null,error:new me});const{data:n,error:a}=await L(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(e){if(T(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){Le(this.experimental);try{return await this._useSession(async t=>{const{data:{session:i},error:n}=t;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new me});const{data:a,error:s}=await L(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:i.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return s?this._returnResult({data:null,error:s}):this._returnResult({data:a,error:null})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _startPasskeyAuthentication(e){var t;Le(this.experimental);try{const{data:i,error:n}=await L(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:i,error:null})}catch(i){if(T(i))return this._returnResult({data:null,error:i});throw i}}async _verifyPasskeyAuthentication(e){Le(this.experimental);try{const{data:t,error:i}=await L(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:$e});return i?this._returnResult({data:null,error:i}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers("SIGNED_IN",t.session)),this._returnResult({data:t,error:null}))}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _listPasskeys(){Le(this.experimental);try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!t)return this._returnResult({data:null,error:new me});const{data:n,error:a}=await L(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:s=>({data:s,error:null})});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(e){if(T(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){Le(this.experimental);try{return await this._useSession(async t=>{const{data:{session:i},error:n}=t;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new me});const{data:a,error:s}=await L(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,body:{friendly_name:e.friendlyName}});return s?this._returnResult({data:null,error:s}):this._returnResult({data:a,error:null})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}async _deletePasskey(e){Le(this.experimental);try{return await this._useSession(async t=>{const{data:{session:i},error:n}=t;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new me});const{error:a}=await L(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,noResolveJson:!0});return a?this._returnResult({data:null,error:a}):this._returnResult({data:null,error:null})})}catch(t){if(T(t))return this._returnResult({data:null,error:t});throw t}}}Ht.nextInstanceID={};const Ko=Ht,Vo="2.109.0";let Pt="",fr;if(typeof Deno<"u"){var Lr;Pt="deno",fr=(Lr=Deno.version)===null||Lr===void 0?void 0:Lr.deno}else if(typeof document<"u")Pt="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")Pt="react-native";else{var Or;Pt="node",fr=typeof process<"u"?(Or=process.version)===null||Or===void 0?void 0:Or.replace(/^v/,""):void 0}const Jn=[`runtime=${Pt}`];fr&&Jn.push(`runtime-version=${fr}`);const Go={"X-Client-Info":`supabase-js/${Vo}; ${Jn.join("; ")}`},Jo={headers:Go},Yo={schema:"public"},Qo={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Xo={},Zo={enabled:!1,respectSamplingDecision:!0};function el(r,e,t,i){function n(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function o(d){try{c(i.next(d))}catch(u){s(u)}}function l(d){try{c(i.throw(d))}catch(u){s(u)}}function c(d){d.done?a(d.value):n(d.value).then(o,l)}c((i=i.apply(r,[])).next())})}let Ur=null;const tl="@opentelemetry/api";function rl(){return Ur===null&&(Ur=import(tl).catch(()=>null)),Ur}function il(){return el(this,void 0,void 0,function*(){try{const r=yield rl();if(!r||!r.propagation||!r.context)return null;const e={};r.propagation.inject(r.context.active(),e);const t=e.traceparent;return t?{traceparent:t,tracestate:e.tracestate,baggage:e.baggage}:null}catch{return null}})}function nl(r){if(!r||typeof r!="string")return null;const e=r.split("-");if(e.length!==4)return null;const[t,i,n,a]=e;if(t.length!==2||i.length!==32||n.length!==16||a.length!==2)return null;const s=/^[0-9a-f]+$/i;return!s.test(t)||!s.test(i)||!s.test(n)||!s.test(a)||i==="00000000000000000000000000000000"||n==="0000000000000000"?null:{version:t,traceId:i,parentId:n,traceFlags:a,isSampled:(parseInt(a,16)&1)===1}}function al(r,e){if(!r||!e||e.length===0)return!1;let t;if(r instanceof URL)t=r;else try{t=new URL(r)}catch{return!1}for(const i of e)try{if(typeof i=="string"){if(sl(t.hostname,i))return!0}else if(i instanceof RegExp){if(i.test(t.hostname))return!0}else if(typeof i=="function"&&i(t))return!0}catch{continue}return!1}function sl(r,e){if(e===r)return!0;if(e.startsWith("*.")){const t=e.slice(2);if(r.endsWith(t)&&(r===t||r.endsWith("."+t)))return!0}return!1}function ol(r){const e=[];try{const t=new URL(r);e.push(t.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function Ft(r){"@babel/helpers - typeof";return Ft=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ft(r)}function ll(r,e){if(Ft(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var i=t.call(r,e);if(Ft(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function cl(r){var e=ll(r,"string");return Ft(e)=="symbol"?e:e+""}function dl(r,e,t){return(e=cl(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function dn(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);e&&(i=i.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),t.push.apply(t,i)}return t}function ie(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?dn(Object(t),!0).forEach(function(i){dl(r,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):dn(Object(t)).forEach(function(i){Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(t,i))})}return r}const ul=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),pl=()=>Headers,hl=(r,e,t,i,n)=>{const a=ul(i),s=pl(),o=(n==null?void 0:n.enabled)===!0,l=(n==null?void 0:n.respectSamplingDecision)!==!1,c=o?ol(e):null;return async(d,u)=>{var p;const h=(p=await t())!==null&&p!==void 0?p:r;let m=new s(u==null?void 0:u.headers);if(m.has("apikey")||m.set("apikey",r),m.has("Authorization")||m.set("Authorization",`Bearer ${h}`),c){const f=await gl(d,c,l);f&&(f.traceparent&&!m.has("traceparent")&&m.set("traceparent",f.traceparent),f.tracestate&&!m.has("tracestate")&&m.set("tracestate",f.tracestate),f.baggage&&!m.has("baggage")&&m.set("baggage",f.baggage))}return a(d,ie(ie({},u),{},{headers:m}))}};async function gl(r,e,t){if(!al(typeof r=="string"||r instanceof URL?r:r.url,e))return null;const i=await il();if(!i||!i.traceparent)return null;if(t){const n=nl(i.traceparent);if(n&&!n.isSampled)return null}return i}function un(r){return typeof r=="boolean"?{enabled:r}:r}function ml(r){return r.endsWith("/")?r:r+"/"}function fl(r,e){var t,i,n,a,s,o;const{db:l,auth:c,realtime:d,global:u}=r,{db:p,auth:h,realtime:m,global:f}=e,v=un(r.tracePropagation),y=un(e.tracePropagation),w={db:ie(ie({},p),l),auth:ie(ie({},h),c),realtime:ie(ie({},m),d),storage:{},global:ie(ie(ie({},f),u),{},{headers:ie(ie({},(t=f==null?void 0:f.headers)!==null&&t!==void 0?t:{}),(i=u==null?void 0:u.headers)!==null&&i!==void 0?i:{})}),tracePropagation:{enabled:(n=(a=v==null?void 0:v.enabled)!==null&&a!==void 0?a:y==null?void 0:y.enabled)!==null&&n!==void 0?n:!1,respectSamplingDecision:(s=(o=v==null?void 0:v.respectSamplingDecision)!==null&&o!==void 0?o:y==null?void 0:y.respectSamplingDecision)!==null&&s!==void 0?s:!0},accessToken:async()=>""};return r.accessToken?w.accessToken=r.accessToken:delete w.accessToken,w}function vl(r){const e=r==null?void 0:r.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(ml(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var yl=class extends Ko{constructor(r){super(r)}},bl=class{constructor(r,e,t){var i,n;this.supabaseUrl=r,this.supabaseKey=e;const a=vl(r);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const s=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:Yo,realtime:Xo,auth:ie(ie({},Qo),{},{storageKey:s}),global:Jo,tracePropagation:Zo},l=fl(t??{},o);if(this.settings=l,this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(n=l.global.headers)!==null&&n!==void 0?n:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=hl(e,r,this._getAccessToken.bind(this),l.global.fetch,l.tracePropagation),this.realtime=this._initRealtimeClient(ie({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new Ea(new URL("rest/v1",a).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Ws(this.storageUrl.href,this.headers,this.fetch,t==null?void 0:t.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new ya(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(r){return this.rest.from(r)}schema(r){return this.rest.schema(r)}rpc(r,e={},t={head:!1,get:!1,count:void 0}){return this.rest.rpc(r,e,t)}channel(r,e={config:{}}){return this.realtime.channel(r,e)}getChannels(){return this.realtime.getChannels()}removeChannel(r){return this.realtime.removeChannel(r)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var r=this,e,t;if(r.accessToken)return await r.accessToken();const{data:i}=await r.auth.getSession();return(e=(t=i.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:r.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:r,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:n,storageKey:a,flowType:s,lock:o,debug:l,throwOnError:c,experimental:d,lockAcquireTimeout:u,skipAutoInitialize:p},h,m){const f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new yl({url:this.authUrl.href,headers:ie(ie({},f),h),storageKey:a,autoRefreshToken:r,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:n,flowType:s,lock:o,debug:l,throwOnError:c,experimental:d,fetch:m,lockAcquireTimeout:u,skipAutoInitialize:p,hasCustomAuthorizationHeader:Object.keys(this.headers).some(v=>v.toLowerCase()==="authorization")})}_initRealtimeClient(r){return new ms(this.realtimeUrl.href,ie(ie({},r),{},{params:ie(ie({},{apikey:this.supabaseKey}),r==null?void 0:r.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((r,e)=>{this._handleTokenChanged(r,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(r,e,t){(r==="TOKEN_REFRESHED"||r==="SIGNED_IN")&&this.changedAccessToken!==t?(this.changedAccessToken=t,this.realtime.setAuth(t)):r==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const pn=(r,e,t)=>new bl(r,e,t);function wl(){if(typeof window<"u")return!1;const r=globalThis.process;if(!r)return!1;const e=r.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=18:!1}wl()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const gt={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_DEFAULT_WHATSAPP_URL:"https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q",VITE_SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk",VITE_SUPABASE_URL:"https://rqemoitjanmxsmcmveso.supabase.co"},kl="https://rqemoitjanmxsmcmveso.supabase.co",xl="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk",Sl="https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q",Xe=(r,e="")=>{if(typeof window<"u"&&window.__ENV__&&window.__ENV__[r])return window.__ENV__[r];if(r==="VITE_SUPABASE_URL")return"https://rqemoitjanmxsmcmveso.supabase.co";if(r==="VITE_SUPABASE_ANON_KEY")return"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk";if(r==="VITE_DEFAULT_WHATSAPP_URL")return"https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q";if(!(r==="VITE_ADMIN_EMAILS"&&(gt!=null&&gt.VITE_ADMIN_EMAILS)))return typeof import.meta<"u"&&gt&&gt[r]?gt[r]:e},Zr=Xe("VITE_SUPABASE_URL",kl),ei=Xe("VITE_SUPABASE_ANON_KEY",xl),Ee=Xe("VITE_DEFAULT_WHATSAPP_URL",Sl),W=!!(Zr&&ei&&!Zr.includes("your-project")&&!ei.includes("your-anon-key")),N=W?pn(Zr,ei,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}):pn("https://placeholder.supabase.co","placeholder-key",{auth:{persistSession:!1}});async function ci(r,e="logos"){if(!r)throw new Error("No image file selected.");if(W)try{const t=(r.name||"image.png").split(".").pop()||"png",i=`${Date.now()}-${Math.random().toString(36).substring(2,9)}.${t}`,n=`${e}/${i}`,{data:a,error:s}=await N.storage.from("tool-images").upload(n,r,{cacheControl:"3600",upsert:!1});if(!s&&a){const{data:o}=N.storage.from("tool-images").getPublicUrl(n);if(o!=null&&o.publicUrl)return o.publicUrl}else s&&console.warn("[Storage] Supabase storage upload notice, using local data URL fallback:",s.message)}catch(t){console.warn("[Storage] Supabase storage exception, using local data URL fallback:",t)}return new Promise((t,i)=>{const n=new FileReader;n.onload=()=>t(n.result),n.onerror=()=>i(new Error("Failed to process image file.")),n.readAsDataURL(r)})}class _l{normalizeTool(e){return e?{id:e.id,slug:e.slug||e.id,name:e.name||"Untitled Tool",image:e.image||"",shortDescription:e.short_description||"",description:e.full_description||e.short_description||"",fullDescription:e.full_description||"",price:e.price||"$19 /month",countryPricing:typeof e.country_pricing=="object"&&e.country_pricing!==null?e.country_pricing:{},category:e.category||"Text / Writing",badge:e.badge||"",badgeType:e.badge_type||"new",features:Array.isArray(e.features)?e.features:[],howToUse:Array.isArray(e.how_to_use)?e.how_to_use:[],videoUrl:e.tutorial_video_url||"",tutorialVideoUrl:e.tutorial_video_url||"",toolUrl:e.tool_url||"#",whatsappUrl:e.whatsapp_url||Ee||"https://chat.whatsapp.com/invite/aitools-store-vip",rating:typeof e.rating=="number"?e.rating:4.8,userCount:e.users_count||"10.5K",themeColor:e.theme_color||"blue",featured:!!e.featured,active:!!e.active,sortOrder:e.sort_order||0,discountPercent:typeof e.discount_percent=="number"?e.discount_percent:parseInt(e.discount_percent,10)||0,createdAt:e.created_at,updatedAt:e.updated_at}:null}async getTools(){if(!W)return console.warn("[AI Tools Store] Supabase URL or Anon Key not yet configured in .env."),[];try{const{data:e,error:t}=await N.from("tools").select("*").eq("active",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});return t?(console.error("[AI Tools Store] Supabase query error:",t.message),[]):(e||[]).map(i=>this.normalizeTool(i))}catch(e){return console.error("[AI Tools Store] Failed to connect to Supabase:",e),[]}}async getToolById(e){if(!W||!e)return null;try{const t=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);let i=N.from("tools").select("*");t?i=i.or(`id.eq.${e},slug.eq.${e}`):i=i.eq("slug",e);const{data:n,error:a}=await i.maybeSingle();return a?(console.error(`[AI Tools Store] Error fetching tool "${e}":`,a.message),null):n?this.normalizeTool(n):null}catch(t){return console.error(`[AI Tools Store] Exception fetching tool "${e}":`,t),null}}async getRawCategories(){const e="ai_tools_custom_categories_v2",t="ai_tools_deleted_categories_v2",i=new Set(["ai writing","ai-writing","cat-writing","ai image","ai-image","cat-image","ai video","ai-video","cat-video","ai audio","ai-audio","cat-audio","ai coding","ai-coding","cat-coding","ai automation","ai-automation","cat-automation","ai marketing","ai-marketing","cat-marketing","productivity","cat-productivity"]);let n=[];try{n=JSON.parse(localStorage.getItem(t)||"[]")}catch{}let a=[];if(W)try{const{data:o,error:l}=await N.from("categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});!l&&Array.isArray(o)&&o.length>0&&(a=o.filter(c=>!i.has((c.name||"").trim().toLowerCase())&&!i.has((c.slug||"").trim().toLowerCase())).map(c=>({id:c.id,name:c.name,slug:c.slug||c.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),icon:c.icon||"✨",color:c.color||"#6366f1",desc:c.description||"",description:c.description||"",image:c.image||"",sortOrder:typeof c.sort_order=="number"?c.sort_order:0})))}catch(o){console.warn("[AI Tools Store] Notice fetching Supabase categories:",o.message)}const s=new Map;if(a.length>0)a.forEach(o=>{const l=o.name.toLowerCase();s.set(l,{...o,count:0})});else try{const l=JSON.parse(localStorage.getItem(e)||"[]").filter(c=>{const d=(c.name||"").trim().toLowerCase(),u=(c.slug||"").trim().toLowerCase(),p=(c.id||"").trim().toLowerCase();return!i.has(d)&&!i.has(u)&&!i.has(p)});localStorage.setItem(e,JSON.stringify(l)),l.forEach(c=>{const d=c.name.toLowerCase();!n.includes(d)&&!n.includes(c.slug)&&s.set(d,{...c,count:0})})}catch{}return Array.from(s.values()).sort((o,l)=>(o.sortOrder||0)-(l.sortOrder||0))}async getCategories(){const e=await this.getTools(),t=await this.getRawCategories(),i=new Map;return t.forEach(n=>{i.set(n.name.toLowerCase(),{...n,count:0})}),e.forEach(n=>{const a=(n.category||"").trim();if(!a)return;const s=a.toLowerCase();let o=null;if(i.has(s))o=i.get(s);else{for(const[l,c]of i.entries())if(l.includes(s)||s.includes(l)){o=c;break}o||(o={id:"cat-"+s.replace(/[^a-z0-9]+/g,"-"),name:a,slug:s.replace(/[^a-z0-9]+/g,"-"),icon:"✨",color:"#6366f1",desc:`Curated AI tools in ${a}.`,description:`Curated AI tools in ${a}.`,image:"",sortOrder:99,count:0},i.set(s,o))}o.count++,!o.image&&n.image&&(o.image=n.image)}),Array.from(i.values()).sort((n,a)=>(n.sortOrder||0)-(a.sortOrder||0))}async adminGetCategories(){const e=await this.adminGetTools().catch(()=>[]),t=await this.getRawCategories(),i=new Map;return t.forEach(n=>{i.set(n.name.toLowerCase(),{...n,count:0})}),e.forEach(n=>{const a=(n.category||"").trim();if(!a)return;const s=a.toLowerCase();let o=null;if(i.has(s))o=i.get(s);else{for(const[l,c]of i.entries())if(l.includes(s)||s.includes(l)){o=c;break}o||(o={id:"cat-"+s.replace(/[^a-z0-9]+/g,"-"),name:a,slug:s.replace(/[^a-z0-9]+/g,"-"),icon:"✨",color:"#6366f1",desc:`Curated AI tools in ${a}.`,description:`Curated AI tools in ${a}.`,image:"",sortOrder:99,count:0},i.set(s,o))}o.count++,!o.image&&n.image&&(o.image=n.image)}),Array.from(i.values()).sort((n,a)=>(n.sortOrder||0)-(a.sortOrder||0))}async adminSaveCategory(e){if(!e||!e.name||!e.name.trim())throw new Error("Category name is required.");const t=e.name.trim(),i=(e.slug||t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")).trim(),n=(e.description||e.desc||"").trim(),a=(e.icon||"✨").trim(),s=(e.image||"").trim(),o=e.color||"#6366f1",l=parseInt(e.sortOrder??e.sort_order,10)||0,c={id:e.id||"cat-"+Date.now().toString(36),name:t,slug:i,description:n,desc:n,icon:a,image:s,color:o,sortOrder:l};if(W)try{const d={name:t,slug:i,description:n,icon:a,image:s,color:o,sort_order:l};e.id&&e.id.length>20&&e.id.includes("-")?await N.from("categories").update(d).eq("id",e.id):await N.from("categories").upsert(d,{onConflict:"slug"})}catch(d){console.warn("[AI Tools Store] Supabase category save notice:",d.message)}try{const d="ai_tools_custom_categories_v2",u="ai_tools_deleted_categories_v2";let p=JSON.parse(localStorage.getItem(d)||"[]");const h=p.findIndex(f=>f.id===c.id||f.slug===c.slug||f.name.toLowerCase()===t.toLowerCase());h>=0?p[h]={...p[h],...c}:p.push(c),localStorage.setItem(d,JSON.stringify(p));let m=JSON.parse(localStorage.getItem(u)||"[]");m=m.filter(f=>f!==t.toLowerCase()&&f!==i),localStorage.setItem(u,JSON.stringify(m))}catch(d){console.warn("[AI Tools Store] localStorage save category error:",d)}return c}async adminDeleteCategory(e,t){const i=(t||"").trim().toLowerCase(),n=(e||"").trim();if(W)try{let a=N.from("categories").delete();n&&n.length>20&&n.includes("-")?a=a.eq("id",n):i&&(a=a.or(`name.ilike.${i},slug.eq.${n}`)),await a}catch(a){console.warn("[AI Tools Store] Supabase category delete notice:",a.message)}try{const a="ai_tools_custom_categories_v2",s="ai_tools_deleted_categories_v2";let o=JSON.parse(localStorage.getItem(a)||"[]");o=o.filter(c=>c.id!==n&&c.name.toLowerCase()!==i&&c.slug!==n),localStorage.setItem(a,JSON.stringify(o));let l=JSON.parse(localStorage.getItem(s)||"[]");i&&!l.includes(i)&&l.push(i),n&&!l.includes(n)&&l.push(n),localStorage.setItem(s,JSON.stringify(l))}catch(a){console.warn("[AI Tools Store] localStorage delete category error:",a)}return!0}async adminGetTools(){if(!W)return[];const{data:e,error:t}=await N.from("tools").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(t)throw t;return(e||[]).map(i=>this.normalizeTool(i))}async adminSaveTool(e){if(!W)throw new Error("Supabase is not configured.");const t={name:e.name.trim(),slug:(e.slug||e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")).trim(),image:e.image||null,short_description:e.shortDescription||null,full_description:e.fullDescription||e.description||null,price:e.price||"$19 /month",country_pricing:e.countryPricing&&typeof e.countryPricing=="object"?e.countryPricing:{},category:e.category||"Text / Writing",badge:e.badge||null,badge_type:e.badgeType||"new",theme_color:e.themeColor||"blue",features:Array.isArray(e.features)?e.features:[],how_to_use:Array.isArray(e.howToUse)?e.howToUse:[],tutorial_video_url:e.tutorialVideoUrl||e.videoUrl||null,tool_url:e.toolUrl||null,whatsapp_url:e.whatsappUrl||null,rating:parseFloat(e.rating)||4.8,users_count:e.userCount||e.users_count||"10.5K",featured:!!e.featured,active:e.active!==!1,sort_order:parseInt(e.sortOrder||e.sort_order,10)||0,discount_percent:parseInt(e.discountPercent??e.discount_percent,10)||0};if(e.id&&e.id.length>20){const{data:i,error:n}=await N.from("tools").update(t).eq("id",e.id).select().single();if(n)throw n;return this.normalizeTool(i)}else{const{data:i,error:n}=await N.from("tools").insert([t]).select().single();if(n)throw n;return this.normalizeTool(i)}}async adminDeleteTool(e){if(!W)throw new Error("Supabase not configured.");const{error:t}=await N.from("tools").delete().eq("id",e);if(t)throw t;return!0}async adminToggleActive(e,t){if(!W)throw new Error("Supabase not configured.");const{data:i,error:n}=await N.from("tools").update({active:t}).eq("id",e).select().single();if(n)throw n;return this.normalizeTool(i)}normalizeHotDeal(e){return e?{id:e.id,slug:e.slug||e.id,name:e.name||"Untitled Hot Deal",image:e.image||"",shortDescription:e.short_description||"",description:e.full_description||e.short_description||"",fullDescription:e.full_description||"",category:e.category||"Hot Deals",offerLabel:e.offer_label||"BUY 1 GET 1 FREE",buyQuantity:typeof e.buy_quantity=="number"?e.buy_quantity:parseInt(e.buy_quantity,10)||1,freeQuantity:typeof e.free_quantity=="number"?e.free_quantity:parseInt(e.free_quantity,10)||1,duration:e.duration||"1 Month",dealPrice:e.deal_price||e.price||"PKR 1,999 /mo",price:e.deal_price||e.price||"PKR 1,999 /mo",regularPrice:e.regular_price||"PKR 3,999 /mo",countryPricing:typeof e.country_pricing=="object"&&e.country_pricing!==null?e.country_pricing:{},badge:e.badge||"🔥 HOT DEAL",badgeType:e.badge_type||"hot",themeColor:e.theme_color||"orange",stockLeft:e.stock_left||"Limited slots available",features:Array.isArray(e.features)?e.features:["Instant WhatsApp Concierge Activation","Official private seat or workspace invite","24/7 dedicated replacement warranty","Full commercial usage rights"],howToUse:Array.isArray(e.how_to_use)?e.how_to_use:[],tutorialVideoUrl:e.tutorial_video_url||"",toolUrl:e.tool_url||"#",whatsappUrl:e.whatsapp_url||Ee,rating:typeof e.rating=="number"?e.rating:4.9,userCount:e.users_count||"2.5K claimed",featured:e.featured!==!1,active:e.active!==!1,sortOrder:e.sort_order||0,discountPercent:typeof e.discount_percent=="number"?e.discount_percent:parseInt(e.discount_percent,10)||0,createdAt:e.created_at,updatedAt:e.updated_at}:null}purgeLegacyMockDeals(){const e="ai_tools_hot_deals_v1";try{if(typeof window<"u"&&window.localStorage){const t=localStorage.getItem(e);t&&(t.includes("deal-chatgpt-claude")||t.includes("deal-midjourney")||t.includes("deal-cursor"))&&localStorage.removeItem(e)}}catch{}}async getHotDeals(){const e="ai_tools_hot_deals_v1";this.purgeLegacyMockDeals();let t=[];if(W)try{const{data:i,error:n}=await N.from("hot_deals").select("*").eq("active",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(!n&&Array.isArray(i)){t=i.map(a=>this.normalizeHotDeal(a));try{localStorage.setItem(e,JSON.stringify(t))}catch{}return t}else n&&console.error("[AI Tools Store] Hot deals Supabase error:",n.message)}catch(i){console.error("[AI Tools Store] Hot deals Supabase notice:",i.message)}try{const i=JSON.parse(localStorage.getItem(e)||"[]");Array.isArray(i)&&(t=i.filter(n=>{var a,s,o;return n.active!==!1&&!((a=n.id)!=null&&a.startsWith("deal-chatgpt"))&&!((s=n.id)!=null&&s.startsWith("deal-midjourney"))&&!((o=n.id)!=null&&o.startsWith("deal-cursor"))}).map(n=>this.normalizeHotDeal(n)))}catch{}return t}async getHotDealById(e){return e&&(await this.getHotDeals()).find(i=>i.id===e||i.slug===e)||null}async adminGetHotDeals(){const e="ai_tools_hot_deals_v1";this.purgeLegacyMockDeals();let t=[];if(W)try{const{data:i,error:n}=await N.from("hot_deals").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(!n&&Array.isArray(i)){t=i.map(a=>this.normalizeHotDeal(a));try{localStorage.setItem(e,JSON.stringify(t))}catch{}return t}else n&&console.error("[AI Tools Store] Admin hot deals Supabase error:",n.message)}catch(i){console.error("[AI Tools Store] Admin hot deals Supabase notice:",i.message)}try{const i=JSON.parse(localStorage.getItem(e)||"[]");Array.isArray(i)&&(t=i.filter(n=>{var a,s,o;return!((a=n.id)!=null&&a.startsWith("deal-chatgpt"))&&!((s=n.id)!=null&&s.startsWith("deal-midjourney"))&&!((o=n.id)!=null&&o.startsWith("deal-cursor"))}).map(n=>this.normalizeHotDeal(n)))}catch{}return t}async adminSaveHotDeal(e){if(!e||!e.name||!e.name.trim())throw new Error("Deal product name is required.");const t="ai_tools_hot_deals_v1",i=e.name.trim(),n=(e.slug||i.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")).trim(),a={id:e.id||"",name:i,slug:n,image:e.image||"",shortDescription:e.shortDescription||e.description||"",fullDescription:e.fullDescription||e.description||"",category:e.category||"Promotions & Bundles",offerLabel:e.offerLabel||"BUY 1 GET 1 FREE",buyQuantity:parseInt(e.buyQuantity,10)||1,freeQuantity:parseInt(e.freeQuantity,10)||0,duration:e.duration||"1 Month",dealPrice:e.dealPrice||e.price||"PKR 1,999 /mo",price:e.dealPrice||e.price||"PKR 1,999 /mo",regularPrice:e.regularPrice||"",countryPricing:e.countryPricing&&typeof e.countryPricing=="object"?e.countryPricing:{},badge:e.badge||`🔥 ${e.offerLabel||"HOT DEAL"}`,badgeType:e.badgeType||"hot",themeColor:e.themeColor||"orange",stockLeft:e.stockLeft||"Only 5 slots left today",features:Array.isArray(e.features)?e.features:["Instant activation via WhatsApp concierge","Official private account or invite link","24/7 dedicated replacement warranty","Full commercial license included"],howToUse:Array.isArray(e.howToUse)?e.howToUse:["Order your deal via WhatsApp with one click","Receive your activation credentials instantly","Enjoy full access with your bonus free tool/quantity"],tutorialVideoUrl:e.tutorialVideoUrl||"",toolUrl:e.toolUrl||"#",whatsappUrl:e.whatsappUrl||Ee,rating:parseFloat(e.rating)||4.9,userCount:e.userCount||"2.8K claimed",featured:e.featured!==!1,active:e.active!==!1,sortOrder:parseInt(e.sortOrder,10)||0,updatedAt:new Date().toISOString()};if(W){const s={name:a.name,slug:a.slug,image:a.image,short_description:a.shortDescription,full_description:a.fullDescription,category:a.category,offer_label:a.offerLabel,buy_quantity:a.buyQuantity,free_quantity:a.freeQuantity,duration:a.duration,deal_price:a.dealPrice,regular_price:a.regularPrice,country_pricing:a.countryPricing,badge:a.badge,badge_type:a.badgeType,theme_color:a.themeColor,stock_left:a.stockLeft,rating:a.rating,users_count:a.userCount,featured:a.featured,active:a.active,sort_order:a.sortOrder,discount_percent:parseInt(e.discountPercent??e.discount_percent,10)||0,updated_at:new Date().toISOString()},o=!!(e.id&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.id));let l;if(o?l=await N.from("hot_deals").update(s).eq("id",e.id).select().single():l=await N.from("hot_deals").insert(s).select().single(),l.error)throw console.error("[AI Tools Store] Supabase hot deal save error:",l.error),new Error(l.error.message||"Failed to save deal to Supabase.");if(l.data){const c=this.normalizeHotDeal(l.data);try{let d=JSON.parse(localStorage.getItem(t)||"[]");d=d.filter(u=>u.id!==c.id&&u.slug!==c.slug),d.push(c),localStorage.setItem(t,JSON.stringify(d))}catch{}return c}}return a}async adminDeleteHotDeal(e){const t="ai_tools_hot_deals_v1";if(W){const{error:i}=await N.from("hot_deals").delete().eq("id",e);if(i)throw console.error("[AI Tools Store] Supabase hot deal delete error:",i),new Error(i.message||"Failed to delete deal from Supabase.")}try{let i=JSON.parse(localStorage.getItem(t)||"[]");i=i.filter(n=>n.id!==e&&n.slug!==e),localStorage.setItem(t,JSON.stringify(i))}catch{}return!0}async adminToggleHotDealActive(e,t){const i="ai_tools_hot_deals_v1";if(W){const{error:n}=await N.from("hot_deals").update({active:t,updated_at:new Date().toISOString()}).eq("id",e);if(n)throw console.error("[AI Tools Store] Supabase hot deal toggle error:",n),new Error(n.message||"Failed to update deal status in Supabase.")}try{let n=JSON.parse(localStorage.getItem(i)||"[]");const a=n.find(s=>s.id===e||s.slug===e);a&&(a.active=t,localStorage.setItem(i,JSON.stringify(n)))}catch{}return!0}subscribeToHotDeals(e){if(!W||typeof window>"u")return()=>{};try{const t=N.channel(`hot_deals_realtime_${Math.random().toString(36).substring(2,8)}`).on("postgres_changes",{event:"*",schema:"public",table:"hot_deals"},i=>{typeof e=="function"&&e(i)}).subscribe();return()=>{try{N.removeChannel(t)}catch{}}}catch(t){return console.warn("[AI Tools Store] Supabase realtime subscription error:",t),()=>{}}}normalizeUpcomingTool(e){return e?{id:e.id,title:e.title||e.name||"Untitled Upcoming Tool",slug:e.slug||(e.title?e.title.toLowerCase().replace(/[^a-z0-9]+/g,"-"):e.id),image:e.image||"",description:e.description||"",expectedDate:e.expected_date||"Coming Soon",badge:e.badge||"🚀 UPCOMING",active:e.active!==!1,sortOrder:e.sort_order||0,createdAt:e.created_at,updatedAt:e.updated_at}:null}async getUpcomingTools(){const e="ai_tools_upcoming_v1";let t=[];if(W)try{const{data:i,error:n}=await N.from("upcoming_tools").select("*").eq("active",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(!n&&Array.isArray(i)&&i.length>0){t=i.map(a=>this.normalizeUpcomingTool(a));try{localStorage.setItem(e,JSON.stringify(t))}catch{}return t}}catch(i){console.warn("[AI Tools Store] Upcoming tools fetch notice:",i)}try{const i=JSON.parse(localStorage.getItem(e)||"[]");if(Array.isArray(i)&&i.length>0)return i.filter(n=>n.active!==!1).map(n=>this.normalizeUpcomingTool(n))}catch{}return[{id:"upcoming-sora-pro",title:"Sora Video Creator Pro",image:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",description:"Next-generation text-to-photorealistic-video engine with 1080p high definition scene composition and AI voice synchronization.",expectedDate:"Launching Soon",badge:"🚀 UPCOMING",active:!0,sortOrder:1}]}async adminGetUpcomingTools(){const e="ai_tools_upcoming_v1";let t=[];if(W)try{const{data:i,error:n}=await N.from("upcoming_tools").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(!n&&Array.isArray(i)){t=i.map(a=>this.normalizeUpcomingTool(a));try{localStorage.setItem(e,JSON.stringify(t))}catch{}return t}}catch(i){console.warn("[AI Tools Store] Admin upcoming tools error:",i)}try{const i=JSON.parse(localStorage.getItem(e)||"[]");if(Array.isArray(i)&&i.length>0)return i.map(n=>this.normalizeUpcomingTool(n))}catch{}return[{id:"upcoming-sora-pro",title:"Sora Video Creator Pro",image:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",description:"Next-generation text-to-photorealistic-video engine with 1080p high definition scene composition and AI voice synchronization.",expectedDate:"Launching Soon",badge:"🚀 UPCOMING",active:!0,sortOrder:1}]}async adminSaveUpcomingTool(e){if(!e||!e.title||!e.title.trim())throw new Error("Title is required for upcoming tool.");const t="ai_tools_upcoming_v1",i=e.title.trim(),n=(e.slug||i.toLowerCase().replace(/[^a-z0-9]+/g,"-")).trim(),a={title:i,slug:n,image:e.image||"",description:(e.description||"").trim(),expected_date:e.expectedDate||e.expected_date||"Coming Soon",badge:e.badge||"🚀 UPCOMING",active:e.active!==!1,sort_order:parseInt(e.sortOrder||e.sort_order,10)||0,updated_at:new Date().toISOString()};let s=null;const o=!!(e.id&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.id));if(W){let l;o?l=await N.from("upcoming_tools").update(a).eq("id",e.id).select().single():l=await N.from("upcoming_tools").insert(a).select().single(),!l.error&&l.data?s=this.normalizeUpcomingTool(l.data):l.error&&console.error("[AI Tools Store] Supabase upcoming tool save error:",l.error)}s||(s={id:e.id||`upcoming-${Date.now()}`,...a,expectedDate:a.expected_date,sortOrder:a.sort_order});try{let l=JSON.parse(localStorage.getItem(t)||"[]");l=l.filter(c=>c.id!==s.id),l.push(s),localStorage.setItem(t,JSON.stringify(l))}catch{}return s}async adminDeleteUpcomingTool(e){const t="ai_tools_upcoming_v1";if(W)try{await N.from("upcoming_tools").delete().eq("id",e)}catch(i){console.warn("Supabase delete error:",i)}try{let i=JSON.parse(localStorage.getItem(t)||"[]");i=i.filter(n=>n.id!==e),localStorage.setItem(t,JSON.stringify(i))}catch{}return!0}async adminToggleUpcomingToolActive(e,t){const i="ai_tools_upcoming_v1";if(W)try{await N.from("upcoming_tools").update({active:t}).eq("id",e)}catch{}try{let n=JSON.parse(localStorage.getItem(i)||"[]");const a=n.find(s=>s.id===e);a&&(a.active=t,localStorage.setItem(i,JSON.stringify(n)))}catch{}return!0}async adminUpdateToolDiscount(e,t){const i=Math.max(0,Math.min(100,parseInt(t,10)||0));if(W)try{const{data:n,error:a}=await N.from("tools").update({discount_percent:i}).eq("id",e).select().single();if(!a&&n)return this.normalizeTool(n)}catch(n){console.warn("Update tool discount error:",n)}return{id:e,discountPercent:i}}async adminUpdateDealDiscount(e,t){const i=Math.max(0,Math.min(100,parseInt(t,10)||0));if(W)try{const{data:n,error:a}=await N.from("hot_deals").update({discount_percent:i}).eq("id",e).select().single();if(!a&&n)return this.normalizeHotDeal(n)}catch(n){console.warn("Update deal discount error:",n)}return{id:e,discountPercent:i}}async adminApplyGlobalDiscountToAllProducts(e){const t=Math.max(0,Math.min(100,parseInt(e,10)||0));if(W){try{const{error:i}=await N.from("tools").update({discount_percent:t}).not("id","is",null);i&&console.warn("[Supabase] Tools discount batch update notice:",i.message)}catch(i){console.warn("[Supabase] Exception updating all tools discount:",i)}try{const{error:i}=await N.from("hot_deals").update({discount_percent:t}).not("id","is",null);i&&console.warn("[Supabase] Deals discount batch update notice:",i.message)}catch(i){console.warn("[Supabase] Exception updating all deals discount:",i)}}try{const i="ai_tools_hot_deals_v1",n=JSON.parse(localStorage.getItem(i)||"[]");Array.isArray(n)&&n.length>0&&(n.forEach(a=>{a.discountPercent=t,a.discount_percent=t}),localStorage.setItem(i,JSON.stringify(n)))}catch{}return t}}const V=new _l,hn={ACCEPT:"application/json, text/event-stream",CONTENT_TYPE:"application/json"};class Al{constructor(e={}){this.serverUrl=e.serverUrl||"",this.secretKey=e.secretKey||"",this.status="IDLE",this.lastResult=null,this.listeners=[]}setServerUrl(e){this.serverUrl=(e||"").trim()}setSecretKey(e){this.secretKey=(e||"").trim()}onStateChange(e){typeof e=="function"&&this.listeners.push(e)}_notify(e,t=null){this.status=e,this.lastResult=t,this.listeners.forEach(i=>{try{i(this.status,t)}catch(n){console.warn("[McpClient] Listener error:",n)}})}async testConnection(e=this.serverUrl,t=this.secretKey){const i=(e||this.serverUrl||"").trim();if(!i){const a={connected:!1,status:400,statusText:"Bad Request",error:"Please enter an n8n MCP Server Trigger URL first."};return this._notify("FAILED",a),a}this._notify("CONNECTING",{url:i});try{const s=await(await fetch("/api/mcp/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:i,secret:t||""})})).json();return s.connected?(this._notify("CONNECTED",s),s):(this._notify("FAILED",s),s)}catch(a){console.warn("[McpClient] Proxy unavailable, attempting direct MCP client-side check...",a)}const n=Date.now();try{const a=new AbortController,s=setTimeout(()=>a.abort(),6e3),o=i.includes("/webhook"),l={Accept:hn.ACCEPT,"Content-Type":hn.CONTENT_TYPE,...t?{Authorization:`Bearer ${t}`,"X-MCP-Secret":t}:{}};let c,d=o;if(o)c=await fetch(i,{method:"POST",headers:l,body:JSON.stringify({action:"ping",test:!0,timestamp:Date.now()}),signal:a.signal});else if(c=await fetch(i,{method:"GET",headers:l,signal:a.signal}),c.status===404||c.status===405)try{const v=await fetch(i,{method:"POST",headers:l,body:JSON.stringify({action:"ping",test:!0,timestamp:Date.now()}),signal:a.signal});(v.ok||v.status===200||v.status===201)&&(c=v,d=!0)}catch{}clearTimeout(s);const u=Date.now()-n,p=c.status,h=c.statusText||(p===200?"OK":"Error");if(p===200||p===201){const v={connected:!0,status:200,statusText:"OK",latencyMs:u,message:d?"✓ Connected! n8n Webhook / MCP Server accepted test payload.":"✓ Connected! n8n MCP Server Trigger accepted the connection."};return this._notify("CONNECTED",v),v}let m=`Server returned HTTP ${p} (${h})`;p===406?m="HTTP 406 Not Acceptable: n8n MCP Server Trigger requires SSE transport and JSON content negotiation.":p===404&&(m=i.includes("mcp-test")||i.includes("webhook-test")?'HTTP 404: n8n is waiting for test events. Click "Listen for test event" / "Execute step" in n8n first, then test again.':"HTTP 404: Production URL not found or workflow is inactive. Ensure n8n workflow is Active (On).");const f={connected:!1,status:p,statusText:h,latencyMs:u,error:m};return this._notify("FAILED",f),f}catch(a){const s=Date.now()-n;let o=a.message||"Network error";if(a.name==="AbortError"){const c={connected:!0,status:200,statusText:"OK",latencyMs:s,message:"✓ Connected! MCP SSE stream established."};return this._notify("CONNECTED",c),c}i.includes("srv189856.")&&(o='DNS Host Not Found: "srv189856" does not exist. Did you mean "srv1898856" (three 8s)?');const l={connected:!1,status:0,statusText:"Network Error",latencyMs:s,error:o};return this._notify("FAILED",l),l}}async submitInquiry(e){if(!this.serverUrl)throw new Error("No n8n Webhook / MCP URL configured.");const t={name:e.name||e.full_name||"",full_name:e.name||e.full_name||"",email:e.email||"",whatsapp:e.whatsapp||e.whatsapp_number||"",whatsapp_number:e.whatsapp||e.whatsapp_number||"",topic:e.topic||e.subject||"General Inquiry",subject:e.topic||e.subject||"General Inquiry",message:e.message||"",submitted_at:new Date().toISOString()},i=(this.serverUrl||"").trim()||"https://n8n-1rsy.srv1898856.hstgr.cloud/webhook/0ea23bd6-b764-4bb3-a258-c6ab9969560f";try{const l=await fetch("/api/mcp/call-tool",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:i,secret:this.secretKey,toolName:"submit_customer_inquiry",args:t})});if(l.ok){const c=await l.json();if(c.success!==!1)return c}console.warn("[McpClient] Proxy returned HTTP "+l.status+", attempting direct POST...")}catch(l){console.warn("[McpClient] Proxy call failed, attempting direct POST...",l)}const a=i.includes("/mcp-test")||i.includes("/mcp/")?{jsonrpc:"2.0",id:`mcp-${Date.now()}`,method:"tools/call",params:{name:"submit_customer_inquiry",arguments:t}}:t,s={Accept:"application/json, text/event-stream","Content-Type":"application/json",...this.secretKey?{Authorization:`Bearer ${this.secretKey}`,"X-MCP-Secret":this.secretKey}:{}};let o;try{o=await fetch(i,{method:"POST",headers:s,body:JSON.stringify(a)})}catch(l){if(i.includes("/webhook-test/")){const c=i.replace("/webhook-test/","/webhook/");o=await fetch(c,{method:"POST",headers:s,body:JSON.stringify(a)})}else throw l}if(o.status===404&&i.includes("/webhook-test/")){const l=i.replace("/webhook-test/","/webhook/");o=await fetch(l,{method:"POST",headers:s,body:JSON.stringify(a)})}if(!o.ok)throw new Error(`Direct POST failed with HTTP ${o.status} (${o.statusText})`);try{return await o.json()}catch{return{status:o.status,ok:!0}}}}const ze=new Al,di="ai_tools_app_settings_v1",Br="https://n8n-1rsy.srv1898856.hstgr.cloud/webhook/0ea23bd6-b764-4bb3-a258-c6ab9969560f",ir="https://n8n-1rsy.srv1898856.hstgr.cloud/webhook-test/0ea23bd6-b764-4bb3-a258-c6ab9969560f";function ct(){try{const r=localStorage.getItem(di),e=r?JSON.parse(r):{};let t=e.mcpWebhookUrl||Br;(t.includes("69318bf8-f20c-4dab-91cf-604c84ce94b1")||t.includes("srv189856."))&&(t=Br);const i=Xe("VITE_N8N_NEW_USER_WEBHOOK_URL",""),n={mcpWebhookUrl:t,mcpUrlType:e.mcpUrlType||(t.includes("-test")?"test":"production"),mcpSecretKey:e.mcpSecretKey||"",newUserWebhookUrl:e.newUserWebhookUrl||i||"",newUserWebhookEnabled:e.newUserWebhookEnabled!==!1,adminWhatsappNumber:e.adminWhatsappNumber||"",adminWhatsappUrl:e.adminWhatsappUrl||Ee||"",globalDiscountPercent:e.globalDiscountPercent!==void 0?parseInt(e.globalDiscountPercent,10):0,globalDiscountActive:e.globalDiscountActive===!0};return ze.setServerUrl(n.mcpWebhookUrl),ze.setSecretKey(n.mcpSecretKey),n}catch{return{mcpWebhookUrl:Br,mcpUrlType:"production",mcpSecretKey:"",newUserWebhookUrl:Xe("VITE_N8N_NEW_USER_WEBHOOK_URL",""),newUserWebhookEnabled:!0,adminWhatsappNumber:"",adminWhatsappUrl:Ee||"",globalDiscountPercent:0,globalDiscountActive:!1}}}function vr(r){const t={...ct(),...r};try{localStorage.setItem(di,JSON.stringify(t)),ze.setServerUrl(t.mcpWebhookUrl),ze.setSecretKey(t.mcpSecretKey),typeof window<"u"&&window.dispatchEvent(new CustomEvent("ai_tools_settings_changed",{detail:t})),N&&N.from("app_settings").upsert({id:"global",new_user_webhook_url:t.newUserWebhookUrl||"",new_user_webhook_enabled:t.newUserWebhookEnabled!==!1,mcp_webhook_url:t.mcpWebhookUrl||"",mcp_secret_key:t.mcpSecretKey||"",admin_whatsapp_number:t.adminWhatsappNumber||"",admin_whatsapp_url:t.adminWhatsappUrl||"",global_discount_percent:t.globalDiscountPercent||0,global_discount_active:t.globalDiscountActive===!0,updated_at:new Date().toISOString()}).then(({error:i})=>{var n;i&&!((n=i.message)!=null&&n.includes("does not exist"))&&console.warn("[Settings] Supabase settings sync notice:",i.message)}).catch(()=>{})}catch(i){console.warn("[Settings] Failed to save settings to localStorage:",i)}return t}async function Tl(){if(N)try{const{data:r,error:e}=await N.from("app_settings").select("*").eq("id","global").maybeSingle();if(!e&&r){const t=ct(),i={...t,newUserWebhookUrl:r.new_user_webhook_url||t.newUserWebhookUrl,newUserWebhookEnabled:r.new_user_webhook_enabled!==void 0?r.new_user_webhook_enabled:t.newUserWebhookEnabled,mcpWebhookUrl:r.mcp_webhook_url||t.mcpWebhookUrl,mcpSecretKey:r.mcp_secret_key||t.mcpSecretKey,adminWhatsappNumber:r.admin_whatsapp_number||t.adminWhatsappNumber,adminWhatsappUrl:r.admin_whatsapp_url||t.adminWhatsappUrl,globalDiscountPercent:r.global_discount_percent!==void 0?r.global_discount_percent:t.globalDiscountPercent,globalDiscountActive:r.global_discount_active!==void 0?r.global_discount_active:t.globalDiscountActive};localStorage.setItem(di,JSON.stringify(i)),ze.setServerUrl(i.mcpWebhookUrl),ze.setSecretKey(i.mcpSecretKey),typeof window<"u"&&window.dispatchEvent(new CustomEvent("ai_tools_settings_changed",{detail:i}))}}catch{}}async function El(r){const e=(r||"").trim();if(!e||!e.startsWith("http"))return{success:!1,status:400,message:"Please provide a valid n8n Webhook URL starting with https:// or http://"};const t={event:"user.signup",test:!0,user_id:"test-"+Math.random().toString(36).substring(2,10),full_name:"Test Member (VIP)",name:"Test Member (VIP)",email:"test_user_"+Math.floor(Math.random()*1e3)+"@example.com",whatsapp_number:"+92 300 1234567",whatsapp:"+92 300 1234567",country:"Pakistan",role:"member",created_at:new Date().toISOString()};try{const i=await fetch("/api/webhook/new-user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:e,userData:t})});if(i.ok){const n=await i.json();if(n.success)return{success:!0,status:n.status||200,message:"✓ Webhook connected! n8n successfully received test registration data."};if(n.status===404)return{success:!1,status:404,message:e.includes("/webhook-test/")?'HTTP 404: n8n is not listening for test events right now. Click "Listen for test event" / "Execute step" in n8n first, then test again.':"HTTP 404: n8n webhook URL not found or workflow is inactive. Make sure the workflow is turned ON in n8n."}}}catch(i){console.warn("[Settings] Proxy unavailable, attempting direct fetch...",i)}try{const i=new AbortController,n=setTimeout(()=>i.abort(),7e3);let a=await fetch(e,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(t),signal:i.signal});if(clearTimeout(n),a.status===404&&e.includes("/webhook-test/")){const s=e.replace("/webhook-test/","/webhook/");try{const o=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});o.ok&&(a=o)}catch{}}return a.ok||a.status===200||a.status===201?{success:!0,status:a.status,message:"✓ Webhook connected! n8n received the test registration payload."}:a.status===404?{success:!1,status:404,message:e.includes("/webhook-test/")?'HTTP 404: n8n is not listening for test events. Click "Listen for test event" / "Execute step" in n8n first.':"HTTP 404: n8n webhook was not found. Please activate the workflow in n8n."}:{success:!1,status:a.status,message:`n8n responded with HTTP ${a.status} (${a.statusText||"Error"})`}}catch(i){return{success:!1,status:0,message:i.name==="AbortError"?"Connection timed out (7s)":`Network / CORS error: ${i.message}`}}}async function $l(r){const e=ct();if(!e.newUserWebhookEnabled)return{skipped:!0,reason:"Webhook disabled in settings"};const t=(e.newUserWebhookUrl||"").trim();if(!t||!t.startsWith("http"))return{skipped:!0,reason:"No webhook URL configured"};const i={event:"user.signup",user_id:r.id||"",full_name:r.fullName||r.name||"",name:r.fullName||r.name||"",email:r.email||"",whatsapp_number:r.whatsappNumber||r.whatsapp||"",whatsapp:r.whatsappNumber||r.whatsapp||"",country:r.country||"Pakistan",role:r.role||"member",created_at:r.createdAt||new Date().toISOString()};try{const n=await fetch("/api/webhook/new-user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:t,userData:i})});if(n.ok){const a=await n.json();if(a.success)return console.log("[NewUserWebhook] Successfully dispatched to n8n via proxy"),a}}catch(n){console.warn("[NewUserWebhook] Proxy unavailable, attempting direct POST...",n)}try{let n=await fetch(t,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(i)});if(n.status===404&&t.includes("/webhook-test/")){const a=t.replace("/webhook-test/","/webhook/");n=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})}return n.ok?(console.log("[NewUserWebhook] Successfully dispatched directly to n8n"),{success:!0,status:n.status}):(console.warn(`[NewUserWebhook] n8n returned HTTP ${n.status}`),{success:!1,status:n.status})}catch(n){return console.warn("[NewUserWebhook] Direct fetch failed:",n.message),{success:!1,error:n.message}}}const $t="ai_tools_user_session_v1",Ve="ai_tools_admin_authorized",Ge="ai_tools_admin_email";class Cl{constructor(){this.currentUser=null,this.currentProfile=null,this.listeners=new Set,this.purgeLegacyDummyAccounts(),this.initSupabaseAuth()}purgeLegacyDummyAccounts(){var e;try{localStorage.removeItem("ai_tools_users_store_v1");const t=localStorage.getItem($t);if(t){const i=JSON.parse(t),n=((e=i==null?void 0:i.user)==null?void 0:e.id)||"";/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(n)||(localStorage.removeItem($t),localStorage.removeItem(Ve),localStorage.removeItem(Ge))}}catch{}}async initSupabaseAuth(){if(!W){console.warn("[AI Tools Store Auth] Supabase is not configured. User accounts will not work without Supabase.");return}try{const{data:{session:e}}=await N.auth.getSession();e!=null&&e.user?(this.currentUser=e.user,await this.fetchProfile(this.currentUser.id),this.saveLocalSession(this.currentUser,this.currentProfile)):this.restoreLocalSession(),this.notifyListeners()}catch(e){console.warn("[AI Tools Store Auth] getSession error:",e)}N.auth.onAuthStateChange(async(e,t)=>{t!=null&&t.user?(this.currentUser=t.user,await this.fetchProfile(this.currentUser.id),this.saveLocalSession(this.currentUser,this.currentProfile)):e==="SIGNED_OUT"&&(this.currentUser=null,this.currentProfile=null,this.clearLocalSession()),this.notifyListeners()})}restoreLocalSession(){var e;try{const t=localStorage.getItem($t);if(t){const i=JSON.parse(t),n=((e=i==null?void 0:i.user)==null?void 0:e.id)||"";/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(n)&&(i!=null&&i.user)?(this.currentUser=i.user,this.currentProfile=i.profile||null):this.clearLocalSession()}}catch(t){console.warn("[AI Tools Store Auth] Could not restore local session:",t)}}saveLocalSession(e,t){try{if(!e||!e.id)return;localStorage.setItem($t,JSON.stringify({user:e,profile:t}))}catch(i){console.warn("[AI Tools Store Auth] Could not save local session:",i)}}clearLocalSession(){try{localStorage.removeItem($t),localStorage.removeItem(Ve),localStorage.removeItem(Ge),localStorage.removeItem("ai_tools_users_store_v1")}catch(e){console.warn("[AI Tools Store Auth] Could not clear local session:",e)}}subscribe(e){this.listeners.add(e);try{e({user:this.currentUser,profile:this.currentProfile})}catch(t){console.error("Error in initial auth listener call:",t)}return()=>this.listeners.delete(e)}notifyListeners(){const e={user:this.currentUser,profile:this.currentProfile};this.listeners.forEach(t=>{try{t(e)}catch(i){console.error("Error in auth listener notification:",i)}})}async fetchProfile(e){if(!e||!W)return null;try{const{data:t,error:i}=await N.from("profiles").select("*").eq("id",e).maybeSingle();if(!i&&t)return this.currentProfile=t,this.saveLocalSession(this.currentUser,this.currentProfile),this.currentProfile;if(this.currentUser){const n=this.currentUser.user_metadata||{},a=(this.currentUser.email||"").toLowerCase().trim(),s=n.full_name||a.split("@")[0]||"VIP Member",o=n.whatsapp_number||"",l=this.isAdmin(this.currentUser),c=n.country||this.getUserCountry()||"Pakistan",{data:d,error:u}=await N.from("profiles").upsert({id:e,full_name:s,email:a,whatsapp_number:o,country:c,role:l?"admin":"member",preferred_language:"en",last_sign_in_at:new Date().toISOString()}).select().maybeSingle();if(!u&&d)return this.currentProfile=d,d.country&&localStorage.setItem("ai_tools_user_country_v1",d.country),this.saveLocalSession(this.currentUser,this.currentProfile),this.currentProfile}}catch(t){console.warn("Could not fetch Supabase profile:",t)}return this.currentProfile}getUserCountry(){var e,t,i;if((e=this.currentProfile)!=null&&e.country)return this.currentProfile.country;if((i=(t=this.currentUser)==null?void 0:t.user_metadata)!=null&&i.country)return this.currentUser.user_metadata.country;try{const n=localStorage.getItem("ai_tools_user_country_v1");if(n)return n}catch{}return"Pakistan"}setUserCountry(e){var t;if(e){try{localStorage.setItem("ai_tools_user_country_v1",e)}catch{}this.currentProfile&&(this.currentProfile.country=e,this.saveLocalSession(this.currentUser,this.currentProfile),W&&((t=this.currentUser)!=null&&t.id)&&N.from("profiles").update({country:e,updated_at:new Date().toISOString()}).eq("id",this.currentUser.id).then(()=>{}).catch(i=>console.warn("Could not update profile country in Supabase:",i))),this.notifyListeners(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("ai_tools_country_changed",{detail:{country:e}}))}}async getCurrentUser(){if(this.currentUser)return this.currentUser;if(W)try{const{data:{session:e}}=await N.auth.getSession();if(e!=null&&e.user)return this.currentUser=e.user,this.currentUser}catch(e){console.warn("Supabase getSession error:",e)}return this.restoreLocalSession(),this.currentUser}isAuthenticated(){return!!(this.currentUser&&this.currentUser.id)}isAdmin(e=this.currentUser,t=this.currentProfile){var a,s;if(!e)return!1;const i=(e.email||"").toLowerCase().trim(),n=(Xe("VITE_ADMIN_EMAILS","")||Xe("VITE_ADMIN_EMAIL","")).toLowerCase().split(",").map(o=>o.trim()).filter(Boolean);if(i==="numanali1n@gmail.com"||i.startsWith("admin@")||i.startsWith("superadmin@")||i==="admin@aitools.store"||i==="admin@aitools.vip"||n.includes(i)||(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.is_admin)===!0||((a=e==null?void 0:e.user_metadata)==null?void 0:a.role)==="admin"||((s=e==null?void 0:e.app_metadata)==null?void 0:s.role)==="admin")return!0;if(localStorage.getItem(Ve)==="true"){const o=localStorage.getItem(Ge);if(o&&o.toLowerCase()===i)return!0}return!1}setAdminAuthorized(e=!0,t=null){var i,n;e?(localStorage.setItem(Ve,"true"),(t||(i=this.currentUser)!=null&&i.email)&&localStorage.setItem(Ge,t||((n=this.currentUser)==null?void 0:n.email)),this.currentProfile&&(this.currentProfile.role="admin")):(localStorage.removeItem(Ve),localStorage.removeItem(Ge),this.currentProfile&&this.currentProfile.role==="admin"&&(this.currentProfile.role="member")),this.notifyListeners()}async getRegisteredUsers(){if(!W)return console.warn("[AI Tools Store Auth] Supabase not configured for getRegisteredUsers."),[];try{const{data:e,error:t}=await N.from("profiles").select("*").order("created_at",{ascending:!1});return t?(console.error("[AI Tools Store Auth] Supabase profiles query error:",t.message),[]):(e||[]).map(i=>{const n=(i.email||"").toLowerCase(),a=i.role==="admin"||n==="numanali1n@gmail.com"||n.startsWith("admin@")||n.startsWith("superadmin@")||n==="admin@aitools.store";return{id:i.id,full_name:i.full_name||"VIP Member",email:i.email||"",whatsapp_number:i.whatsapp_number||"",country:i.country||"Pakistan",preferred_language:i.preferred_language||"en",role:a?"admin":"member",last_sign_in_at:i.last_sign_in_at||null,created_at:i.created_at||new Date().toISOString()}})}catch(e){return console.error("[AI Tools Store Auth] Error fetching profiles:",e),[]}}async updateUserRole(e,t){var n;if(!W)throw new Error("Supabase is not configured.");const{error:i}=await N.from("profiles").update({role:t,updated_at:new Date().toISOString()}).eq("id",e);if(i)throw new Error(i.message);return((n=this.currentUser)==null?void 0:n.id)===e&&this.currentProfile&&(this.currentProfile.role=t,t==="admin"?(localStorage.setItem(Ve,"true"),localStorage.setItem(Ge,this.currentUser.email)):(localStorage.removeItem(Ve),localStorage.removeItem(Ge)),this.saveLocalSession(this.currentUser,this.currentProfile),this.notifyListeners()),!0}async deleteUser(e){if(!W)throw new Error("Supabase is not configured.");if(!e)throw new Error("User ID is required to delete user.");if(this.currentUser&&this.currentUser.id===e)throw new Error("You cannot delete your own active administrator account.");let t=!1,i=null;try{const{data:a,error:s}=await N.rpc("delete_user_by_admin",{target_user_id:e});s?i=s:t=!0}catch(a){i=a}const{error:n}=await N.from("profiles").delete().eq("id",e);if(!t&&n)throw console.error("[AI Tools Store Auth] Error deleting user:",i||n),new Error((i==null?void 0:i.message)||(n==null?void 0:n.message)||"Failed to delete user from Supabase.");return!0}async signUp({fullName:e,email:t,whatsappNumber:i,password:n,country:a="Pakistan"}){const s=(t||"").trim(),o=(e||"").trim()||"VIP Member",l=(i||"").trim(),c=(a||"Pakistan").trim();if(!s)throw new Error("Please enter a valid email address.");if(!n||n.length<6)throw new Error("Password must be at least 6 characters long.");if(!W)throw new Error("Supabase backend is not connected. Please check your Supabase configuration.");const{data:d,error:u}=await N.auth.signUp({email:s,password:n,options:{data:{full_name:o,whatsapp_number:l,country:c}}});if(u)throw new Error(u.message);if(!(d!=null&&d.user))throw new Error("Failed to create account in Supabase. Please try again.");const p=d.user,h=s.toLowerCase()==="numanali1n@gmail.com"||s.toLowerCase().startsWith("admin@")||s.toLowerCase().startsWith("superadmin@")||s.toLowerCase()==="admin@aitools.store"||s.toLowerCase()==="admin@aitools.vip";let m=null;try{const{data:f,error:v}=await N.from("profiles").upsert({id:p.id,full_name:o,email:s,whatsapp_number:l,country:c,role:h?"admin":"member",preferred_language:"en",last_sign_in_at:new Date().toISOString()}).select().single();v?console.warn("[AI Tools Store Auth] Profile upsert notice:",v.message):m=f}catch(f){console.warn("[AI Tools Store Auth] Profile upsert error:",f)}this.setUserCountry(c);try{$l({id:p.id,fullName:o,email:s,whatsappNumber:l,country:c,role:h?"admin":"member",createdAt:p.created_at||new Date().toISOString()}).catch(f=>console.warn("[Auth] Webhook background dispatch notice:",f))}catch(f){console.warn("[AI Tools Store Auth] New user webhook notice:",f)}return d.session?(this.currentUser=p,this.currentProfile=m||await this.fetchProfile(p.id),this.saveLocalSession(this.currentUser,this.currentProfile),this.notifyListeners(),{user:this.currentUser,profile:this.currentProfile,session:d.session}):{user:p,profile:m,needsConfirmation:!0,message:"Account registered in Supabase! If email confirmation is enabled, please verify your email before signing in."}}async signIn({email:e,password:t}){const i=(e||"").trim();if(!i)throw new Error("Please enter your email address.");if(!t)throw new Error("Please enter your password.");if(!W)throw new Error("Supabase backend is not connected.");const{data:n,error:a}=await N.auth.signInWithPassword({email:i,password:t});if(a)throw a.message&&a.message.toLowerCase().includes("email not confirmed")?new Error('Email not confirmed yet. In Supabase Dashboard > Authentication > Providers > Email, turn off "Confirm email" or check your inbox.'):new Error(a.message||"Invalid email or password.");if(!(n!=null&&n.user))throw new Error("Sign in failed: No user returned from Supabase.");return this.currentUser=n.user,this.currentProfile=await this.fetchProfile(n.user.id),this.isAdmin(this.currentUser,this.currentProfile)&&(localStorage.setItem(Ve,"true"),localStorage.setItem(Ge,this.currentUser.email),this.currentProfile&&(this.currentProfile.role="admin")),this.saveLocalSession(this.currentUser,this.currentProfile),this.notifyListeners(),{user:this.currentUser,profile:this.currentProfile,session:n.session}}async signOut(){if(this.clearLocalSession(),this.currentUser=null,this.currentProfile=null,W)try{await N.auth.signOut()}catch(e){console.warn("Supabase signOut error:",e)}return this.notifyListeners(),!0}}const H=new Cl;function Il(r){if(!r)return"";const e=r.trim();if(e.includes("/embed/"))return e;const t=e.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);return t&&t[1]?`https://www.youtube.com/embed/${t[1]}?autoplay=0&rel=0`:e}function Ze(r=""){const e=(r||"").toLowerCase().trim();return e.includes("pakistan")?"🇵🇰":e.includes("india")?"🇮🇳":e.includes("emirates")||e.includes("uae")||e.includes("dubai")?"🇦🇪":e.includes("saudi")?"🇸🇦":e.includes("united states")||e.includes("usa")||e==="us"?"🇺🇸":e.includes("united kingdom")||e.includes("uk")||e.includes("britain")?"🇬🇧":e.includes("canada")?"🇨🇦":e.includes("australia")?"🇦🇺":e.includes("germany")?"🇩🇪":e.includes("france")?"🇫🇷":e.includes("bangladesh")?"🇧🇩":e.includes("turkey")||e.includes("turkiye")?"🇹🇷":"🌐"}function ui(r,e=""){if(!r)return"$19 /month";const t=r.countryPricing||r.country_pricing||{};let i=e;if(!i)try{const o=localStorage.getItem("ai_tools_user_country_v1");o&&(i=o)}catch{}i||(i="Pakistan");const n=i.toLowerCase().trim(),a={pakistan:["pakistan","pk","pkr"],india:["india","in","inr"],"united arab emirates":["united arab emirates","uae","emirates","ae","aed"],"saudi arabia":["saudi arabia","saudi","sar","ksa","sa"],"united states":["united states","usa","us","usd","america"],"united kingdom":["united kingdom","uk","gbp","britain","gb"]};let s=[n];for(const[o,l]of Object.entries(a))if(n===o||l.includes(n)||n.includes(o)){s=l;break}for(const[o,l]of Object.entries(t))if(l&&typeof l=="string"&&l.trim()){const c=o.toLowerCase().trim();if(s.includes(c)||c===n)return l.trim()}for(const[o,l]of Object.entries(t))if(l&&typeof l=="string"&&l.trim()){const c=o.toLowerCase().trim();if(["default","global","other","others","world"].includes(c))return l.trim()}return r.price||"$19 /month"}function Ar(r,e="/month"){if(!r)return{amount:"$19",unit:"month",periodText:e,periodHtml:`<span class="price-period">${e}</span>`};let t=String(r).trim(),i=t,n="";if(t.includes("/")){const o=t.split("/");i=o[0].trim(),n=o.slice(1).join("/").trim()}else if(/\s+(?:per|for)\s+/i.test(t)){const o=t.split(/\s+(?:per|for)\s+/i);i=o[0].trim(),n=o.slice(1).join(" ").trim()}else if(/\(([^)]+)\)$/.test(t)){const o=t.match(/\(([^)]+)\)$/);i=t.replace(/\(([^)]+)\)$/,"").trim(),n=o[1].trim()}n=n.replace(/^[\/\s]+/,"").replace(/[\)\(]/g,"").trim(),/^\d+\s*pkr$/i.test(i)?i=i.replace(/pkr$/i,"").trim()+" PKR":/^pkr\s*\d+$/i.test(i)?i=i.replace(/^pkr\s*/i,"").trim()+" PKR":/^rs\.?\s*\d+$/i.test(i)&&(i=i.replace(/^rs\.?\s*/i,"Rs ").trim());let a="",s="";if(n){const o=n.toLowerCase().trim();o==="month"||o==="mo"||o==="monthly"||o==="per month"?(s="/month",a='<span class="price-period">/month</span>'):o==="year"||o==="yr"||o==="yearly"||o==="annually"||o==="per year"?(s="/year",a='<span class="price-period">/year</span>'):o.includes("lifetime")||o.includes("one-time")||o.includes("onetime")?(s="Lifetime Plan",a='<span class="price-period price-period-badge">Lifetime</span>'):(s=`/${n}`,a=`<span class="price-period price-period-custom">/${n}</span>`)}else s="",a="";return{amount:i,unit:n,periodText:s,periodHtml:a}}function ti(r,e={}){if(!r)return"";const t=!!e.isCard,i=e.maxPoints||3,n=String(r).replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim();if(!n)return"";const a=n.split(`
`),s=/^[\s]*[•\-\*\+✔✓✦\>»]\s*/,o=/^[\s]*\d+[\.\)]\s*/;let l=[];if(a.length>1?l=a.map(d=>d.trim()).filter(Boolean).map(d=>d.replace(s,"").replace(o,"").trim()).filter(Boolean):(n.includes("•")||n.includes("✦")||n.includes(" - "))&&(l=n.split(/(?:[•✦]|\s+-\s+)/).map(d=>d.trim()).filter(Boolean)),l.length>=2||l.length===1&&(s.test(r)||a.length>1)){const u=(t?l.slice(0,i):l).map(h=>`<li class="tool-bullet-item"><span class="tool-bullet-dot">✦</span><span class="tool-bullet-text">${h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span></li>`).join(""),p=t&&l.length>i?`<li class="tool-bullet-more">+ ${l.length-i} more points...</li>`:"";return`<ul class="tool-desc-bullets ${t?"tool-desc-bullets-card":""}">${u}${p}</ul>`}return`<span class="tool-desc-plain">${n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span>`}function Tr(r,e="",t=null){let i="",n=0;if(r&&typeof r=="object"?(i=ui(r,e),t!=null?n=Math.max(0,Math.min(100,parseInt(t,10)||0)):typeof r.discountPercent=="number"&&r.discountPercent>0?n=r.discountPercent:typeof r.discount_percent=="number"&&r.discount_percent>0&&(n=r.discount_percent)):(i=String(r||"$19 /month"),t!=null&&(n=Math.max(0,Math.min(100,parseInt(t,10)||0)))),n<=0)try{const y=ct();y&&y.globalDiscountActive&&y.globalDiscountPercent>0&&(n=y.globalDiscountPercent)}catch{}const{amount:a,unit:s,periodText:o,periodHtml:l}=Ar(i);if(n<=0)return{hasDiscount:!1,discountPercent:0,originalPrice:i,originalAmount:a,discountedPrice:i,discountedAmount:a,amount:a,unit:s,periodText:o,periodHtml:l};const c=a.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);if(!c)return{hasDiscount:!1,discountPercent:0,originalPrice:i,originalAmount:a,discountedPrice:i,discountedAmount:a,amount:a,unit:s,periodText:o,periodHtml:l};const d=c[1]||"",u=parseFloat(c[2].replace(/,/g,"")),p=c[3]||"";if(isNaN(u)||u<=0)return{hasDiscount:!1,discountPercent:0,originalPrice:i,originalAmount:a,discountedPrice:i,discountedAmount:a,amount:a,unit:s,periodText:o,periodHtml:l};const h=u*(1-n/100);let m="";c[2].includes(".")?m=h.toFixed(2):m=Math.round(h).toLocaleString("en-US");const f=`${d}${m}${p}`.trim(),v=`${f}${o?` ${o}`:""}`.trim();return{hasDiscount:!0,discountPercent:n,originalPrice:i,originalAmount:a,discountedPrice:v,discountedAmount:f,amount:f,unit:s,periodText:o,periodHtml:l}}function Yn(r,e="",t="",i="",n="",a=0){if(r&&r.startsWith("http")&&!t)return r;const s="https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q";if(!e)return s;const o=i?` for ${i}`:"";let l=`Hello! I would like to purchase and activate ${e} from AI Tools Store.`;if(t&&(a>0&&n&&n!==t?l=`Hello! I would like to purchase ${e} at special offer ${t} (${a}% OFF, regular ${n})${o} from AI Tools Store. Please share activation details.`:l=`Hello! I would like to purchase ${e} at ${t}${o} from AI Tools Store. Please share activation details.`),r&&r.includes("wa.me/")){const c=r.match(/wa\.me\/([0-9+]+)/);if(c&&c[1])return`https://wa.me/${c[1].replace(/\D/g,"")}?text=${encodeURIComponent(l)}`}return`https://wa.me/1234567890?text=${encodeURIComponent(l)}`}function pi(r,e=""){const t=(r||"").toLowerCase();return t.includes("writegen")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm0-8a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
      <path d="M12 6a6 6 0 0 1 6 6"/>
      <path d="M12 18a6 6 0 0 1-6-6"/>
    </svg>`:t.includes("artify")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3L2 21h20L12 3z" fill="rgba(16, 185, 129, 0.25)"/>
      <path d="M12 8l5 9H7l5-9z" fill="currentColor"/>
    </svg>`:t.includes("codepilot")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="rgba(59, 130, 246, 0.25)"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>`:t.includes("chatgpt")?`<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.5 10.3c-.2-1.3-.9-2.4-2-3.1-.3-.2-.6-.4-1-.5-.2-.9-.8-1.7-1.6-2.2-.8-.5-1.7-.6-2.6-.4-.5-.7-1.3-1.2-2.2-1.4-.9-.2-1.8 0-2.6.5-1.1-.7-2.5-.8-3.7-.3-1.2.5-2 1.5-2.2 2.8-1 .3-1.8 1-2.3 1.9-.5.9-.6 2-.2 3-.7.9-.9 2-.5 3 .4 1 1.2 1.7 2.2 2 .2.9.8 1.7 1.6 2.2.8.5 1.7.6 2.6.4.5.7 1.3 1.2 2.2 1.4.9.2 1.8 0 2.6-.5 1.1.7 2.5.8 3.7.3 1.2-.5 2-1.5 2.2-2.8 1-.3 1.8-1 2.3-1.9.5-.9.6-2 .2-3 .8-.9 1-2 .6-3-.4-1-1.2-1.7-2.2-2.1zm-8.8 10.2c-.7 0-1.4-.3-1.9-.8l.2-.1 3.5-2c.2-.1.3-.3.3-.5v-4.9l1.5.9v4.4c0 1.7-1.6 3-3.6 3zm-6.8-4.4c-.4-.7-.5-1.6-.3-2.4l.2.1 3.5 2c.2.1.4.1.6 0l4.2-2.5v1.7l-3.8 2.2c-1.5.9-3.5.4-4.4-1.1zm-1.5-7.5c.3-.7.9-1.3 1.6-1.6v4.2c0 .2.1.4.3.5l4.2 2.5-1.5.9-3.8-2.2c-1.5-.9-2-2.8-1.1-4.3zm12.3 2.5l-4.2-2.5 1.5-.9 3.8 2.2c1.5.9 2 2.8 1.1 4.3-.3.7-.9 1.3-1.6 1.6v-4.2c0-.2-.1-.4-.3-.5zm1.8-3c.4.7.5 1.6.3 2.4l-.2-.1-3.5-2c-.2-.1-.4-.1-.6 0l-4.2 2.5v-1.7l3.8-2.2c1.5-.9 3.5-.4 4.4 1.1zm-7-2.3c.7 0 1.4.3 1.9.8l-.2.1-3.5 2c-.2.1-.3.3-.3.5v4.9l-1.5-.9v-4.4c0-1.7 1.6-3 3.6-3z"/>
    </svg>`:t.includes("midjourney")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19c4-1 12-1 16 0"/>
      <path d="M12 4v12"/>
      <path d="M12 4c3 4 5 7 8 10"/>
      <path d="M12 4c-3 4-5 7-8 10"/>
    </svg>`:t.includes("notion")?`<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 4.5v15h3.8v-8.4l6.4 8.4h4.8v-15h-3.8v8.4l-6.4-8.4H4.5z"/>
    </svg>`:t.includes("runway")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 5h7a5 5 0 0 1 0 10H6V5z"/>
      <path d="M12 15l6 5"/>
    </svg>`:t.includes("elevenlabs")||t.includes("voice")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 10v4"/>
      <path d="M8 7v10"/>
      <path d="M12 3v18"/>
      <path d="M16 7v10"/>
      <path d="M20 10v4"/>
    </svg>`:t.includes("claude")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>`:t.includes("copilot")||t.includes("code")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>`:t.includes("descript")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 6h6a6 6 0 0 1 0 12H6z"/>
      <path d="M6 18h12"/>
    </svg>`:t.includes("tome")||t.includes("present")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
    </svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5L12 3Z"/>
  </svg>`}function _(r,e="info"){const t=document.getElementById("toast-container");if(!t)return;const i=document.createElement("div");i.className=`toast toast-${e}`,i.innerHTML=`
    <span>${e==="success"?"✓":"ℹ"}</span>
    <span>${r}</span>
  `,t.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(10px)",i.style.transition="all 0.3s ease",setTimeout(()=>i.remove(),300)},3200)}let Dr=!1;async function gn(){if(Dr)return;Dr=!0;const r=document.getElementById("modal-root");if(!r)return;const e=await V.getTools(),t=document.createElement("div");t.className="modal-backdrop",t.id="search-modal-backdrop",t.innerHTML=`
    <div class="modal-card" style="max-width: 580px; padding: 1.5rem;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-pure); font-weight: 700;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span>Search AI Tools</span>
        </div>
        <button id="search-modal-close" class="modal-close-btn">&times;</button>
      </div>

      <div style="position: relative; margin-bottom: 1.25rem;">
        <input 
          type="text" 
          id="modal-search-input" 
          placeholder="Search by tool name, category, or workflow..."
          class="search-input-field"
          style="padding-left: 1rem; width: 100%; border-radius: var(--radius-md);"
          autofocus
        />
      </div>

      <div id="modal-search-results" style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 50vh; overflow-y: auto;">
        ${mn(e.slice(0,6))}
      </div>

      <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); flex-wrap: wrap; gap: 0.5rem;">
        <span>Tip: Press <kbd class="kbd-shortcut">ESC</kbd> to exit</span>
        <span>${e.length} tools indexed</span>
      </div>
    </div>
  `,r.appendChild(t);let i;const n=()=>{Dr=!1,i&&window.removeEventListener("keydown",i),t.remove()};t.onclick=n,document.getElementById("search-modal-close").onclick=n;const a=document.getElementById("modal-search-input"),s=document.getElementById("modal-search-results");s&&(s.onclick=o=>{o.target.closest("a")&&n()}),setTimeout(()=>a==null?void 0:a.focus(),50),a&&(a.oninput=o=>{const l=o.target.value.toLowerCase().trim(),c=e.filter(d=>d.name.toLowerCase().includes(l)||d.category.toLowerCase().includes(l)||d.shortDescription&&d.shortDescription.toLowerCase().includes(l));s.innerHTML=c.length>0?mn(c):`<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No matching tools found for "${o.target.value}"</div>`},a.onkeydown=o=>{if(o.key==="Enter"){const l=s==null?void 0:s.querySelector("a");l&&(o.preventDefault(),l.click())}}),i=o=>{o.key==="Escape"&&n()},window.addEventListener("keydown",i)}function mn(r){return r.map(e=>`
    <a 
      href="#/tool/${e.id}" 
      style="display: flex; align-items: center; gap: 0.85rem; padding: 0.65rem 0.85rem; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); text-decoration: none; transition: background 150ms ease;"
    >
      <div style="width: 36px; height: 36px; border-radius: 8px; background: ${e.iconGradient||"#4f46e5"}; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
        ${pi(e.id,e.name)}
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h4 style="font-size: 0.92rem; color: var(--text-pure); font-weight: 700;">${e.name}</h4>
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent-mint);">${e.price}</span>
        </div>
        <p style="font-size: 0.76rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${e.category} &bull; ${e.shortDescription||""}
        </p>
      </div>
    </a>
  `).join("")}const Rt=[{code:"en",name:"English",nativeName:"English",flag:"🇺🇸",dir:"ltr"},{code:"ur",name:"Urdu",nativeName:"اردو",flag:"🇵🇰",dir:"rtl"},{code:"ar",name:"Arabic",nativeName:"العربية",flag:"🇸🇦",dir:"rtl"},{code:"hi",name:"Hindi",nativeName:"हिन्दी",flag:"🇮🇳",dir:"ltr"},{code:"es",name:"Spanish",nativeName:"Español",flag:"🇪🇸",dir:"ltr"},{code:"fr",name:"French",nativeName:"Français",flag:"🇫🇷",dir:"ltr"},{code:"de",name:"German",nativeName:"Deutsch",flag:"🇩🇪",dir:"ltr"},{code:"zh",name:"Chinese (Simplified)",nativeName:"中文 (简体)",flag:"🇨🇳",dir:"ltr"},{code:"zh-TW",name:"Chinese (Traditional)",nativeName:"中文 (繁體)",flag:"🇹🇼",dir:"ltr"},{code:"ja",name:"Japanese",nativeName:"日本語",flag:"🇯🇵",dir:"ltr"},{code:"ko",name:"Korean",nativeName:"한국어",flag:"🇰🇷",dir:"ltr"},{code:"ru",name:"Russian",nativeName:"Русский",flag:"🇷🇺",dir:"ltr"},{code:"pt",name:"Portuguese",nativeName:"Português",flag:"🇧🇷",dir:"ltr"},{code:"it",name:"Italian",nativeName:"Italiano",flag:"🇮🇹",dir:"ltr"},{code:"tr",name:"Turkish",nativeName:"Türkçe",flag:"🇹🇷",dir:"ltr"},{code:"nl",name:"Dutch",nativeName:"Nederlands",flag:"🇳🇱",dir:"ltr"},{code:"pl",name:"Polish",nativeName:"Polski",flag:"🇵🇱",dir:"ltr"},{code:"id",name:"Indonesian",nativeName:"Bahasa Indonesia",flag:"🇮🇩",dir:"ltr"},{code:"ms",name:"Malay",nativeName:"Bahasa Melayu",flag:"🇲🇾",dir:"ltr"},{code:"bn",name:"Bengali",nativeName:"বাংলা",flag:"🇧🇩",dir:"ltr"},{code:"pa",name:"Punjabi",nativeName:"ਪੰਜਾਬੀ / پنجابی",flag:"🇮🇳",dir:"ltr"},{code:"fa",name:"Persian",nativeName:"فارسی",flag:"🇮🇷",dir:"rtl"},{code:"th",name:"Thai",nativeName:"ไทย",flag:"🇹🇭",dir:"ltr"},{code:"vi",name:"Vietnamese",nativeName:"Tiếng Việt",flag:"🇻🇳",dir:"ltr"},{code:"he",name:"Hebrew",nativeName:"עבריت",flag:"🇮🇱",dir:"rtl"},{code:"el",name:"Greek",nativeName:"Ελληνικά",flag:"🇬🇷",dir:"ltr"},{code:"cs",name:"Czech",nativeName:"Čeština",flag:"🇨🇿",dir:"ltr"},{code:"ro",name:"Romanian",nativeName:"Română",flag:"🇷🇴",dir:"ltr"},{code:"hu",name:"Hungarian",nativeName:"Magyar",flag:"🇭🇺",dir:"ltr"},{code:"sv",name:"Swedish",nativeName:"Svenska",flag:"🇸🇪",dir:"ltr"},{code:"da",name:"Danish",nativeName:"Dansk",flag:"🇩🇰",dir:"ltr"},{code:"no",name:"Norwegian",nativeName:"Norsk",flag:"🇳🇴",dir:"ltr"},{code:"fi",name:"Finnish",nativeName:"Suomi",flag:"🇫🇮",dir:"ltr"},{code:"uk",name:"Ukrainian",nativeName:"Українська",flag:"🇺🇦",dir:"ltr"},{code:"ta",name:"Tamil",nativeName:"தமிழ்",flag:"🇮🇳",dir:"ltr"},{code:"te",name:"Telugu",nativeName:"తెలుగు",flag:"🇮🇳",dir:"ltr"},{code:"mr",name:"Marathi",nativeName:"मराठी",flag:"🇮🇳",dir:"ltr"},{code:"gu",name:"Gujarati",nativeName:"ગુજરાતી",flag:"🇮🇳",dir:"ltr"},{code:"kn",name:"Kannada",nativeName:"ಕನ್ನಡ",flag:"🇮🇳",dir:"ltr"},{code:"ml",name:"Malayalam",nativeName:"മലയാളം",flag:"🇮🇳",dir:"ltr"},{code:"ne",name:"Nepali",nativeName:"नेपाली",flag:"🇳🇵",dir:"ltr"},{code:"tl",name:"Filipino",nativeName:"Filipino",flag:"🇵🇭",dir:"ltr"},{code:"sw",name:"Swahili",nativeName:"Kiswahili",flag:"🇰🇪",dir:"ltr"},{code:"sk",name:"Slovak",nativeName:"Slovenčina",flag:"🇸🇰",dir:"ltr"},{code:"bg",name:"Bulgarian",nativeName:"Български",flag:"🇧🇬",dir:"ltr"},{code:"sr",name:"Serbian",nativeName:"Српски",flag:"🇷🇸",dir:"ltr"},{code:"hr",name:"Croatian",nativeName:"Hrvatski",flag:"🇭🇷",dir:"ltr"}];function Wt(r){if(!r)return Rt[0];const e=r.toLowerCase().trim();return Rt.find(t=>t.code.toLowerCase()===e)||Rt.find(t=>t.code.toLowerCase().startsWith(e.split("-")[0]))||Rt[0]}const Pl=["ur","ar","fa","he"],Rl={nav:{brand:"AI Tools Store",home:"Home",allTools:"All Tools",hotDeals:"Hot Deals",upcoming:"Upcoming Tools",categories:"Categories",about:"About",contact:"Contact",policy:"Policy",admin:"Admin",adminPanel:"Admin Panel",administrator:"Administrator",searchTitle:"Search Tools (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"Join WhatsApp",signIn:"Sign In",signUp:"✦ Sign Up",account:"My Account",logout:"Log Out",selectLanguage:"Select Language"},hero:{headlinePart1:"Discover the Best",headlineGradient:"AI Tools",headlinePart2:"in One Place",desc:"Find, explore, and master cutting-edge AI tools to accelerate your productivity, automate tasks, and build the future.",searchPlaceholder:"Search AI tools...",searchSubmit:"Search Tools",exploreBtn:"Explore AI Tools",communityBtn:"Join Our Community",trust1Title:"Trusted & Verified",trust1Desc:"Quality tools you can trust",trust2Title:"Instant Access",trust2Desc:"Get started in seconds",trust3Title:"Best Prices",trust3Desc:"Affordable & transparent"},categories:{badge:"Browse Catalog",title:"Browse AI Tools by Category",viewAll:"View All Categories",countLabel:"Tools"},featured:{badge:"Featured Selection",title:"Explore Powerful AI Tools",subtitle:"Hand-picked AI tools designed to supercharge your workflow",viewAll:"View All Tools",emptyTitle:"Supabase Database Connected",emptyDesc:"Run supabase/schema.sql in your Supabase SQL editor to seed products, or open the Admin Panel.",openAdmin:"Open Admin Panel"},benefits:{badge:"Why AI Tools Store",title:"Why Choose AI Tools Store",subtitle:"Everything you need to discover, activate, and master AI tools without friction.",b1Title:"Curated AI Tools",b1Desc:"Only high-quality and tested AI tools.",b2Title:"Step-by-Step Tutorials",b2Desc:"Learn how to use every tool effectively.",b3Title:"Instant Access & Support",b3Desc:"Get immediate access and support via WhatsApp.",b4Title:"Always Updated",b4Desc:"Discover new tools and updates regularly."},finalCta:{badge:"✦ Unlock AI Superpowers",title:"Ready to Explore the Future of AI?",subtitle:"Join thousands of creators, builders, and developers using AI Tools Store to stay ahead.",getStarted:"✦ Get Started Now",browseTools:"Browse Tools"},card:{buyNow:"Buy Now",howToUse:"How to Use",viewDetails:"View Details",perMonth:"/month",rating:"Rating",users:"users",saveFav:"Save to favorites",addedFavToast:"Added to your favorites!",removedFavToast:"Removed from saved favorites"},auth:{createAccountHeading:"Create your AI Tools Store account",welcomeBackHeading:"Welcome back to AI Tools Store",createAccountSub:"✦ Join thousands of creators, builders and innovators.",signInSub:"✦ Sign in to continue discovering powerful AI tools.",tabSignUp:"Sign Up",tabSignIn:"Sign In",fullNameLabel:"Full Name",fullNamePlaceholder:"Enter your full name",emailLabel:"Email Address",emailPlaceholder:"Enter your email address",whatsappLabel:"WhatsApp Number",whatsappPlaceholder:"Enter WhatsApp number",passwordLabel:"Password",passwordPlaceholder:"Create password (min 6 characters)",confirmPasswordLabel:"Confirm Password",confirmPasswordPlaceholder:"Confirm password",btnCreateAccount:"✦ Create Account",btnSignIn:"→ Sign In",alreadyHaveAccount:"Already have an account?",dontHaveAccount:"Don't have an account?",linkSignIn:"Sign in",linkSignUp:"Sign up",passwordsMismatch:"Passwords do not match. Please verify your confirmation password.",minLengthError:"Password must be at least 6 characters long.",requiredError:"Please fill in all required fields.",creatingAccount:"Creating Account...",signingIn:"Signing In...",welcomeToast:"Welcome to AI Tools Store",signedInToast:"Signed in successfully!",signedOutToast:"Signed out successfully."},account:{title:"Account Details",verified:"● Verified Account",emailLabel:"Email Address",whatsappLabel:"WhatsApp Number",memberSince:"Member Since",signOutBtn:"Sign Out of Account"},toolDetails:{notFoundTitle:"Tool Not Found",notFoundDesc:"The tool you are looking for does not exist or has been retired.",backToTools:"Back to All Tools",buyNowWhatsApp:"Buy Now via WhatsApp",visitWebsite:"Visit Official Website",overviewTab:"Overview",featuresTab:"Features & Benefits",howToUseTab:"How to Use & Tutorial",videoTutorial:"Video Walkthrough",guaranteesSupport:"Direct WhatsApp concierge support",guaranteesActivation:"Instant activation under 5 minutes",guaranteesLicensing:"100% verified genuine software license",purchaseVerified:"Verified Purchase Link: Directly redirects to WhatsApp concierge.",similarTools:"Similar AI Tools in"},allTools:{headerTitle:"Explore Hand-Picked AI Tools",headerSubtitle:"Discover, compare, and unlock premium software licenses with instant activation.",searchPlaceholder:"Search by tool name or capability...",allCategories:"All",sortPopular:"Most Popular",sortRating:"Highest Rated",sortPriceLow:"Price: Low to High",sortPriceHigh:"Price: High to Low",sortName:"Alphabetical",resultsCount:"Showing {count} AI tools",clearFilters:"Clear Filters",loadMore:"Load More AI Tools",noResultsTitle:"No tools found matching your search",noResultsDesc:"Try searching for a different keyword or select another category above.",resetFilters:"Reset Filters"},footer:{desc:"The leading futuristic marketplace to discover, activate, and master hand-curated AI tools with instant WhatsApp access.",exploreHeading:"Explore",resourcesHeading:"Resources",communityHeading:"Community",allRightsReserved:"All rights reserved. Built for modern AI pioneers."}},Ll={nav:{brand:"اے آئی ٹولز اسٹور",home:"ہوم",allTools:"تمام ٹولز",hotDeals:"ہاٹ ڈیلز 🔥",upcoming:"آنے والے ٹولز 🚀",categories:"اقسام",about:"ہمارے بارے میں",contact:"رابطہ کریں",policy:"پالیسی",admin:"ایڈمن",adminPanel:"ایڈمن پینل",administrator:"ایڈمنسٹریٹر",searchTitle:"ٹولز تلاش کریں (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"واٹس ایپ پر جڑیں",signIn:"لاگ ان کریں",signUp:"✦ سائن اپ کریں",account:"میرا اکاؤنٹ",logout:"لاگ آؤٹ",selectLanguage:"زبان منتخب کریں"},hero:{headlinePart1:"بہترین اور جدید ترین",headlineGradient:"اے آئی ٹولز",headlinePart2:"ایک ہی جگہ پر",desc:"اپنی پیداواری صلاحیت کو کئی گنا بڑھانے، کاموں کو خودکار بنانے اور مستقبل کی تعمیر کے لیے جدید ترین اے آئی ٹولز دریافت کریں۔",searchPlaceholder:"اے آئی ٹولز تلاش کریں...",searchSubmit:"ٹولز تلاش کریں",exploreBtn:"ٹولز دریافت کریں",communityBtn:"ہماری کمیونٹی میں شامل ہوں",trust1Title:"تصدیق شدہ اور محفوظ",trust1Desc:"معیاری ٹولز جن پر آپ بھروسہ کر سکتے ہیں",trust2Title:"فوری رسائی",trust2Desc:"چند سیکنڈز میں آغاز کریں",trust3Title:"بہترین قیمتیں",trust3Desc:"مناسب اور شفاف فیس"},categories:{badge:"کیٹلاگ دیکھیں",title:"اقسام کے لحاظ سے اے آئی ٹولز تلاش کریں",viewAll:"تمام اقسام دیکھیں",countLabel:"ٹولز"},featured:{badge:"نمایاں انتخاب",title:"طاقتور اور جدید اے آئی ٹولز دیکھیں",subtitle:"آپ کے ورک فلو کو تیز ترین بنانے کے لیے منتخب کردہ اعلیٰ معیار کے ٹولز",viewAll:"تمام ٹولز دیکھیں",emptyTitle:"سُپابیس ڈیٹا بیس منسلک ہے",emptyDesc:"مصنوعات شامل کرنے کے لیے سُپابیس میں سکیما چلائیں یا ایڈمن پینل کھولیں۔",openAdmin:"ایڈمن پینل کھولیں"},benefits:{badge:"اے آئی ٹولز اسٹور کیوں؟",title:"اے آئی ٹولز اسٹور کا انتخاب کیوں کریں؟",subtitle:"اے آئی ٹولز کو تلاش کرنے، فعال کرنے اور آسانی سے سیکھنے کا مکمل حل۔",b1Title:"منتخب کردہ معیاری ٹولز",b1Desc:"صرف تصدیق شدہ اور آزمودہ اعلیٰ معیار کے ٹولز۔",b2Title:"مرحلہ وار گائیڈز",b2Desc:"ہر ٹول کو مؤثر انداز میں استعمال کرنا سیکھیں۔",b3Title:"فوری رسائی اور سپورٹ",b3Desc:"واٹس ایپ کے ذریعے فوری ایکٹیویشن اور مدد حاصل کریں۔",b4Title:"ہمیشہ اپ ڈیٹ شدہ",b4Desc:"مسلسل نئے ٹولز اور اپ ڈیٹس سے باخبر رہیں۔"},finalCta:{badge:"✦ جدید ٹیکنالوجی کی دنیا",title:"کیا آپ اے آئی کے مستقبل میں قدم رکھنے کے لیے تیار ہیں؟",subtitle:"ہزاروں تخلیق کاروں اور ڈویلپرز میں شامل ہوں جو آگے رہنے کے لیے اے آئی ٹولز اسٹور استعمال کرتے ہیں۔",getStarted:"✦ ابھی آغاز کریں",browseTools:"ٹولز براؤز کریں"},card:{buyNow:"ابھی خریدیں",howToUse:"استعمال کا طریقہ",viewDetails:"تفصیلات دیکھیں",perMonth:"/ماہانہ",rating:"ریٹنگ",users:"صارفین",saveFav:"پسندیدہ میں شامل کریں",addedFavToast:"پسندیدہ فہرست میں شامل کر دیا گیا!",removedFavToast:"پسندیدہ فہرست سے ہٹا دیا گیا"},auth:{createAccountHeading:"اپنا اے آئی ٹولز اسٹور اکاؤنٹ بنائیں",welcomeBackHeading:"اے آئی ٹولز اسٹور میں دوبارہ خوش آمدید",createAccountSub:"✦ ہزاروں تخلیق کاروں، بلڈرز اور موجدوں میں شامل ہوں۔",signInSub:"✦ طاقتور اے آئی ٹولز دریافت کرنا جاری رکھنے کے لیے لاگ ان کریں۔",tabSignUp:"سائن اپ",tabSignIn:"لاگ ان",fullNameLabel:"پورا نام",fullNamePlaceholder:"اپنا پورا نام درج کریں",emailLabel:"ای میل ایڈریس",emailPlaceholder:"اپنا ای میل درج کریں",whatsappLabel:"واٹس ایپ نمبر",whatsappPlaceholder:"اپنا واٹس ایپ نمبر درج کریں",passwordLabel:"پاس ورڈ",passwordPlaceholder:"پاس ورڈ بنائیں (کم از کم 6 حروف)",confirmPasswordLabel:"پاس ورڈ کی تصدیق کریں",confirmPasswordPlaceholder:"پاس ورڈ دوبارہ درج کریں",btnCreateAccount:"✦ اکاؤنٹ بنائیں",btnSignIn:"→ لاگ ان کریں",alreadyHaveAccount:"پہلے سے اکاؤنٹ موجود ہے؟",dontHaveAccount:"کیا آپ کا اکاؤنٹ نہیں ہے؟",linkSignIn:"لاگ ان کریں",linkSignUp:"سائن اپ کریں",passwordsMismatch:"پاس ورڈ مماثل نہیں ہیں۔ براہ کرم تصدیقی پاس ورڈ چیک کریں۔",minLengthError:"پاس ورڈ کم از کم 6 حروف پر مشتمل ہونا چاہیے۔",requiredError:"براہ کرم تمام مطلوبہ خانے پر کریں۔",creatingAccount:"اکاؤنٹ بنایا جا رہا ہے...",signingIn:"لاگ ان کیا جا رہا ہے...",welcomeToast:"اے آئی ٹولز اسٹور میں خوش آمدید",signedInToast:"کامیابی سے لاگ ان ہو گیا!",signedOutToast:"کامیابی سے لاگ آؤٹ ہو گیا۔"},account:{title:"اکاؤنٹ کی تفصیلات",verified:"● تصدیق شدہ اکاؤنٹ",emailLabel:"ای میل ایڈریس",whatsappLabel:"واٹس ایپ نمبر",memberSince:"رکنیت کی تاریخ",signOutBtn:"اکاؤنٹ سے لاگ آؤٹ کریں"},toolDetails:{notFoundTitle:"ٹول نہیں ملا",notFoundDesc:"جو ٹول آپ تلاش کر رہے ہیں وہ موجود نہیں ہے یا ہٹا دیا گیا ہے۔",backToTools:"تمام ٹولز کی طرف واپس",buyNowWhatsApp:"واٹس ایپ کے ذریعے خریدیں",visitWebsite:"سرکاری ویب سائٹ ملاحظہ کریں",overviewTab:"جائزہ",featuresTab:"خصوصیات اور فوائد",howToUseTab:"استعمال کا طریقہ اور گائیڈ",videoTutorial:"ویڈیو ٹیوٹوریل",guaranteesSupport:"براہ راست واٹس ایپ کسٹمر سپورٹ",guaranteesActivation:"5 منٹ کے اندر فوری ایکٹیویشن",guaranteesLicensing:"100% تصدیق شدہ حقیقی سافٹ ویئر لائسنس",purchaseVerified:"تصدیق شدہ خریداری لنک: سیدھا واٹس ایپ پر منتقل کرتا ہے۔",similarTools:"ملتے جلتے اے آئی ٹولز برائے"},allTools:{headerTitle:"منتخب کردہ اے آئی ٹولز تلاش کریں",headerSubtitle:"بہترین سافٹ ویئر لائسنس دریافت کریں، موازنہ کریں اور فوری فعال کریں۔",searchPlaceholder:"ٹول کے نام یا کام کے لحاظ سے تلاش کریں...",allCategories:"تمام",sortPopular:"سب سے مقبول",sortRating:"اعلیٰ ریٹنگ والے",sortPriceLow:"قیمت: کم سے زیادہ",sortPriceHigh:"قیمت: زیادہ سے کم",sortName:"حروف تہجی کے اعتبار سے",resultsCount:"{count} اے آئی ٹولز دکھائے جا رہے ہیں",clearFilters:"فلٹرز ختم کریں",loadMore:"مزید ٹولز لوڈ کریں",noResultsTitle:"آپ کی تلاش کے مطابق کوئی ٹول نہیں ملا",noResultsDesc:"کسی دوسرے لفظ سے تلاش کریں یا اوپر دی گئی فہرست سے کوئی دوسری قسم منتخب کریں۔",resetFilters:"فلٹرز دوبارہ ترتیب دیں"},footer:{desc:"واٹس ایپ کے ذریعے فوری رسائی کے ساتھ تصدیق شدہ اے آئی ٹولز تلاش کرنے اور سیکھنے کا جدید ترین پلیٹ فارم۔",exploreHeading:"دریافت کریں",resourcesHeading:"وسائل",communityHeading:"کمیونٹی",allRightsReserved:"جملہ حقوق محفوظ ہیں۔ جدید اے آئی صارفین کے لیے تیار کردہ۔"}},Ol={nav:{brand:"متجر أدوات الذكاء الاصطناعي",home:"الرئيسية",allTools:"جميع الأدوات",categories:"التصنيفات",about:"من نحن",contact:"اتصل بنا",admin:"لوحة التحكم",searchTitle:"البحث عن الأدوات (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"انضم عبر واتساب",signIn:"تسجيل الدخول",signUp:"✦ إنشاء حساب",account:"حسابي",logout:"تسجيل الخروج",selectLanguage:"اختر اللغة"},hero:{headlinePart1:"اكتشف أفضل وأحدث",headlineGradient:"أدوات الذكاء الاصطناعي",headlinePart2:"في مكان واحد",desc:"ابحث عن أحدث أدوات الذكاء الاصطناعي واستكشفها لتسريع إنتاجيتك وأتمتة مهامك وبناء المستقبل بكل سهولة.",searchPlaceholder:"ابحث عن أدوات الذكاء الاصطناعي...",searchSubmit:"بحث عن الأدوات",exploreBtn:"استكشاف الأدوات",communityBtn:"انضم إلى مجتمعنا",trust1Title:"موثوق ومعتمد",trust1Desc:"أدوات عالية الجودة يمكنك الوثوق بها",trust2Title:"وصول فوري",trust2Desc:"ابدأ خلال ثوانٍ معدودة",trust3Title:"أفضل الأسعار",trust3Desc:"أسعار معقولة وشفافة"},categories:{badge:"تصفح الدليل",title:"تصفح أدوات الذكاء الاصطناعي حسب التصنيف",viewAll:"عرض جميع التصنيفات",countLabel:"أداة"},featured:{badge:"تشكيلة مميزة",title:"استكشف أدوات الذكاء الاصطناعي القوية",subtitle:"أدوات مختارة بعناية لتعزيز وتطوير سير عملك إلى أقصى حد",viewAll:"عرض جميع الأدوات",emptyTitle:"تم ربط قاعدة بيانات Supabase",emptyDesc:"قم بتشغيل ملف السكيما في Supabase لإضافة المنتجات، أو افتح لوحة التحكم.",openAdmin:"فتح لوحة التحكم"},benefits:{badge:"لماذا متجر أدوات الذكاء الاصطناعي",title:"لماذا تختار متجر أدوات الذكاء الاصطناعي؟",subtitle:"كل ما تحتاجه لاكتشاف وتفعيل وإتقان أدوات الذكاء الاصطناعي دون أي عناء.",b1Title:"أدوات ذكاء اصطناعي منتقاة",b1Desc:"أدوات عالية الجودة ومختبرة بعناية فقط.",b2Title:"دروس إرشادية خطوة بخطوة",b2Desc:"تعلم كيفية استخدام كل أداة بفاعلية واحترافية.",b3Title:"وصول فوري ودعم متواصل",b3Desc:"احصل على تفعيل فوري ومساعدة مباشرة عبر واتساب.",b4Title:"تحديثات مستمرة",b4Desc:"اكتشف أحدث الأدوات والترقيات بشكل دوري."},finalCta:{badge:"✦ أطلق العنان لإمكانياتك",title:"هل أنت مستعد لاستكشاف مستقبل الذكاء الاصطناعي؟",subtitle:"انضم إلى آلاف المبدعين والمطورين الذين يستخدمون متجر أدوات الذكاء الاصطناعي للتميز.",getStarted:"✦ ابدأ الآن",browseTools:"تصفح الأدوات"},card:{buyNow:"شراء الآن",howToUse:"كيفية الاستخدام",viewDetails:"عرض التفاصيل",perMonth:"/شهرياً",rating:"التقييم",users:"مستخدم",saveFav:"إضافة إلى المفضلة",addedFavToast:"تمت الإضافة إلى المفضلة!",removedFavToast:"تمت الإزالة من المفضلة"},auth:{createAccountHeading:"إنشاء حساب جديد في متجر أدوات الذكاء الاصطناعي",welcomeBackHeading:"مرحباً بعودتك إلى متجر أدوات الذكاء الاصطناعي",createAccountSub:"✦ انضم إلى آلاف المبدعين والمبتكرين.",signInSub:"✦ سجل دخولك لمتابعة استكشاف أفضل الأدوات.",tabSignUp:"إنشاء حساب",tabSignIn:"تسجيل الدخول",fullNameLabel:"الاسم الكامل",fullNamePlaceholder:"أدخل اسمك الكامل",emailLabel:"البريد الإلكتروني",emailPlaceholder:"أدخل بريدك الإلكتروني",whatsappLabel:"رقم الواتساب",whatsappPlaceholder:"أدخل رقم الواتساب الخاص بك",passwordLabel:"كلمة المرور",passwordPlaceholder:"أنشئ كلمة مرور (6 أحرف على الأقل)",confirmPasswordLabel:"تأكيد كلمة المرور",confirmPasswordPlaceholder:"أعد إدخال كلمة المرور",btnCreateAccount:"✦ إنشاء الحساب",btnSignIn:"→ تسجيل الدخول",alreadyHaveAccount:"هل لديك حساب بالفعل؟",dontHaveAccount:"ليس لديك حساب؟",linkSignIn:"تسجيل الدخول",linkSignUp:"إنشاء حساب",passwordsMismatch:"كلمات المرور غير متطابقة. يرجى التحقق مرة أخرى.",minLengthError:"يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",requiredError:"يرجى ملء جميع الحقول المطلوبة.",creatingAccount:"جارٍ إنشاء الحساب...",signingIn:"جارٍ تسجيل الدخول...",welcomeToast:"مرحباً بك في متجر أدوات الذكاء الاصطناعي",signedInToast:"تم تسجيل الدخول بنجاح!",signedOutToast:"تم تسجيل الخروج بنجاح."},account:{title:"تفاصيل الحساب",verified:"● حساب موثق",emailLabel:"البريد الإلكتروني",whatsappLabel:"رقم الواتساب",memberSince:"عضو منذ",signOutBtn:"تسجيل الخروج من الحساب"},toolDetails:{notFoundTitle:"الأداة غير موجودة",notFoundDesc:"الأداة التي تبحث عنها غير متوفرة حالياً أو تم إيقافها.",backToTools:"العودة لجميع الأدوات",buyNowWhatsApp:"الشراء عبر واتساب",visitWebsite:"زيارة الموقع الرسمي",overviewTab:"نظرة عامة",featuresTab:"الميزات والفوائد",howToUseTab:"طريقة الاستخدام والشرح",videoTutorial:"فيديو توضيحي",guaranteesSupport:"دعم مباشر ومخصص عبر واتساب",guaranteesActivation:"تفعيل فوري خلال أقل من 5 دقائق",guaranteesLicensing:"ترخيص برمجي أصلي وموثوق 100%",purchaseVerified:"رابط شراء معتمد: يحولك مباشرة إلى محادثة واتساب الرسمية.",similarTools:"أدوات ذكاء اصطناعي مشابهة في"},allTools:{headerTitle:"استكشف أدوات الذكاء الاصطناعي المختارة",headerSubtitle:"اكتشف وقارن وفعل اشتراكات البرامج الأصلية مع تفعيل فوري.",searchPlaceholder:"ابحث باسم الأداة أو ميزاتها...",allCategories:"الكل",sortPopular:"الأكثر شعبية",sortRating:"الأعلى تقييماً",sortPriceLow:"السعر: من الأقل للأعلى",sortPriceHigh:"السعر: من الأعلى للأقل",sortName:"أبجدياً",resultsCount:"عرض {count} أداة ذكاء اصطناعي",clearFilters:"مسح التصفية",loadMore:"تحميل المزيد من الأدوات",noResultsTitle:"لم نتمكن من العثور على أي أدوات مطابقة لبحثك",noResultsDesc:"جرب البحث بكلمات مختلفة أو اختر تصنيفاً آخر من القائمة أعلاه.",resetFilters:"إعادة ضبط التصفية"},footer:{desc:"المنصة الرائدة لاكتشاف وتفعيل وتطوير مهارات أدوات الذكاء الاصطناعي مع وصول فوري عبر واتساب.",exploreHeading:"استكشف",resourcesHeading:"المصادر",communityHeading:"المجتمع",allRightsReserved:"جميع الحقوق محفوظة. صُمم لرواد الذكاء الاصطناعي الحديث."}},Ul={nav:{brand:"एआई टूल्स स्टोर",home:"होम",allTools:"सभी टूल्स",categories:"श्रेणियाँ",about:"हमारे बारे में",contact:"संपर्क करें",admin:"एडमिन",searchTitle:"टूल्स खोजें (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"व्हाट्सएप से जुड़ें",signIn:"साइन इन",signUp:"✦ साइन अप",account:"मेरा खाता",logout:"लॉग आउट",selectLanguage:"भाषा चुनें"},hero:{headlinePart1:"सर्वश्रेष्ठ और आधुनिक",headlineGradient:"एआई टूल्स",headlinePart2:"एक ही स्थान पर खोजें",desc:"अपनी उत्पादकता बढ़ाने, कार्यों को स्वचालित करने और भविष्य के निर्माण के लिए अत्याधुनिक एआई टूल्स का अन्वेषण करें।",searchPlaceholder:"एआई टूल्स खोजें...",searchSubmit:"टूल्स खोजें",exploreBtn:"टूल्स देखें",communityBtn:"कम्युनिटी से जुड़ें",trust1Title:"सत्यापित और सुरक्षित",trust1Desc:"गुणवत्तापूर्ण टूल्स जिन पर आप भरोसा कर सकते हैं",trust2Title:"तुरंत एक्सेस",trust2Desc:"कुछ ही सेकंड में शुरू करें",trust3Title:"किफायती कीमतें",trust3Desc:"पारदर्शी और उचित मूल्य"},categories:{badge:"कैटलॉग देखें",title:"श्रेणी के अनुसार एआई टूल्स खोजें",viewAll:"सभी श्रेणियाँ देखें",countLabel:"टूल्स"},featured:{badge:"विशेष चयन",title:"शक्तिशाली एआई टूल्स एक्सप्लोर करें",subtitle:"आपके वर्कफ़्लो को तेज़ और आसान बनाने के लिए चुने गए प्रीमियम टूल्स",viewAll:"सभी टूल्स देखें",emptyTitle:"Supabase डेटाबेस कनेक्टेड है",emptyDesc:"उत्पाद जोड़ने के लिए Supabase में स्कीमा चलाएं या एडमिन पैनल खोलें।",openAdmin:"एडमिन पैनल खोलें"},benefits:{badge:"एआई टूल्स स्टोर क्यों?",title:"एआई टूल्स स्टोर क्यों चुनें?",subtitle:"एआई टूल्स को खोजने, सक्रिय करने और सीखने का सबसे सरल और बेहतरीन समाधान।",b1Title:"चुनिंदा बेहतरीन टूल्स",b1Desc:"केवल उच्च गुणवत्ता और परीक्षण किए गए एआई टूल्स।",b2Title:"कदम-दर-कदम ट्यूटोरियल",b2Desc:"हर टूल का प्रभावी ढंग से उपयोग करना सीखें।",b3Title:"तुरंत एक्सेस और सहायता",b3Desc:"व्हाट्सएप पर तत्काल एक्टिवेशन और सहायता प्राप्त करें।",b4Title:"हमेशा अपडेटेड",b4Desc:"नियमित रूप से नए टूल्स और अपडेट प्राप्त करें।"},finalCta:{badge:"✦ एआई की शक्ति अनलॉक करें",title:"क्या आप एआई के भविष्य में प्रवेश करने के लिए तैयार हैं?",subtitle:"हजारों क्रिएटर्स और डेवलपर्स से जुड़ें जो आगे रहने के लिए एआई टूल्स स्टोर का उपयोग करते हैं।",getStarted:"✦ अभी शुरू करें",browseTools:"टूल्स देखें"},card:{buyNow:"अभी खरीदें",howToUse:"उपयोग विधि",viewDetails:"विवरण देखें",perMonth:"/माह",rating:"रेटिंग",users:"उपयोगकर्ता",saveFav:"पसंदीदा में जोड़ें",addedFavToast:"पसंदीदा सूची में जोड़ दिया गया!",removedFavToast:"पसंदीदा सूची से हटा दिया गया"},auth:{createAccountHeading:"अपना एआई टूल्स स्टोर खाता बनाएं",welcomeBackHeading:"एआई टूल्स स्टोर में पुनः स्वागत है",createAccountSub:"✦ हजारों इनोवेटर्स और क्रिएटर्स से जुड़ें।",signInSub:"✦ शक्तिशाली एआई टूल्स खोजने के लिए साइन इन करें।",tabSignUp:"साइन अप",tabSignIn:"साइन इन",fullNameLabel:"पूरा नाम",fullNamePlaceholder:"अपना पूरा नाम दर्ज करें",emailLabel:"ईमेल पता",emailPlaceholder:"अपना ईमेल दर्ज करें",whatsappLabel:"व्हाट्सएप नंबर",whatsappPlaceholder:"अपना व्हाट्सएप नंबर दर्ज करें",passwordLabel:"पासवर्ड",passwordPlaceholder:"पासवर्ड बनाएं (कम से कम 6 अक्षर)",confirmPasswordLabel:"पासवर्ड की पुष्टि करें",confirmPasswordPlaceholder:"पासवर्ड पुनः दर्ज करें",btnCreateAccount:"✦ खाता बनाएं",btnSignIn:"→ साइन इन करें",alreadyHaveAccount:"क्या पहले से खाता है?",dontHaveAccount:"क्या खाता नहीं है?",linkSignIn:"साइन इन करें",linkSignUp:"साइन अप करें",passwordsMismatch:"पासवर्ड मेल नहीं खाते। कृपया पुष्टि पासवर्ड जांचें।",minLengthError:"पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",requiredError:"कृपया सभी आवश्यक फ़ील्ड भरें।",creatingAccount:"खाता बनाया जा रहा है...",signingIn:"साइन इन किया जा रहा है...",welcomeToast:"एआई टूल्स स्टोर में आपका स्वागत है",signedInToast:"सफलतापूर्वक साइन इन किया गया!",signedOutToast:"सफलतापूर्वक साइन आउट किया गया।"},account:{title:"खाता विवरण",verified:"● सत्यापित खाता",emailLabel:"ईमेल पता",whatsappLabel:"व्हाट्सएप नंबर",memberSince:"सदस्यता तिथि",signOutBtn:"खाते से साइन आउट करें"},toolDetails:{notFoundTitle:"टूल नहीं मिला",notFoundDesc:"जो टूल आप ढूंढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है।",backToTools:"सभी टूल्स पर वापस जाएं",buyNowWhatsApp:"व्हाट्सएप से खरीदें",visitWebsite:"आधिकारिक वेबसाइट देखें",overviewTab:"अवलोकन",featuresTab:"विशेषताएं और लाभ",howToUseTab:"उपयोग विधि और ट्यूटोरियल",videoTutorial:"वीडियो वॉकथ्रू",guaranteesSupport:"सीधा व्हाट्सएप सपोर्ट",guaranteesActivation:"5 मिनट के भीतर तुरंत एक्टिवेशन",guaranteesLicensing:"100% सत्यापित वास्तविक सॉफ़्टवेयर लाइसेंस",purchaseVerified:"सत्यापित खरीद लिंक: सीधे आधिकारिक व्हाट्सएप पर रीडायरेक्ट करता है।",similarTools:"समान एआई टूल्स -"},allTools:{headerTitle:"हस्तनिर्मित एआई टूल्स एक्सप्लोर करें",headerSubtitle:"प्रीमियम सॉफ्टवेयर लाइसेंस खोजें, तुलना करें और तुरंत सक्रिय करें।",searchPlaceholder:"टूल के नाम या क्षमता से खोजें...",allCategories:"सभी",sortPopular:"सर्वाधिक लोकप्रिय",sortRating:"सर्वोच्च रेटेड",sortPriceLow:"कीमत: कम से अधिक",sortPriceHigh:"कीमत: अधिक से कम",sortName:"वर्णमाला क्रम",resultsCount:"{count} एआई टूल्स प्रदर्शित",clearFilters:"फ़िल्टर हटाएं",loadMore:"और टूल्स लोड करें",noResultsTitle:"आपकी खोज से मेल खाने वाला कोई टूल नहीं मिला",noResultsDesc:"कृपया किसी अन्य कीवर्ड से खोजें या ऊपर दी गई श्रेणी चुनें।",resetFilters:"फ़िल्टर रीसेट करें"},footer:{desc:"व्हाट्सएप के माध्यम से त्वरित पहुंच के साथ सत्यापित एआई टूल्स खोजने और सीखने का अग्रणी प्लेटफॉर्म।",exploreHeading:"अन्वेषण",resourcesHeading:"संसाधन",communityHeading:"कम्युनिटी",allRightsReserved:"सर्वाधिकार सुरक्षित। आधुनिक एआई अग्रदूतों के लिए निर्मित।"}},Bl={nav:{brand:"AI Tools Store",home:"Inicio",allTools:"Todas las Herramientas",categories:"Categorías",about:"Nosotros",contact:"Contacto",admin:"Admin",searchTitle:"Buscar Herramientas (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"Unirse a WhatsApp",signIn:"Iniciar Sesión",signUp:"✦ Registrarse",account:"Mi Cuenta",logout:"Cerrar Sesión",selectLanguage:"Seleccionar Idioma"},hero:{headlinePart1:"Descubre las Mejores",headlineGradient:"Herramientas de IA",headlinePart2:"en un Solo Lugar",desc:"Encuentra, explora y domina herramientas de IA de vanguardia para acelerar tu productividad, automatizar tareas y construir el futuro.",searchPlaceholder:"Buscar herramientas de IA...",searchSubmit:"Buscar Herramientas",exploreBtn:"Explorar Herramientas",communityBtn:"Únete a la Comunidad",trust1Title:"Confiable y Verificado",trust1Desc:"Herramientas de calidad garantizada",trust2Title:"Acceso Instantáneo",trust2Desc:"Comienza en cuestión de segundos",trust3Title:"Mejores Precios",trust3Desc:"Económico y transparente"},categories:{badge:"Explorar Catálogo",title:"Explorar Herramientas de IA por Categoría",viewAll:"Ver Todas las Categorías",countLabel:"Herramientas"},featured:{badge:"Selección Destacada",title:"Explora Potentes Herramientas de IA",subtitle:"Herramientas seleccionadas a mano para potenciar tu flujo de trabajo diario",viewAll:"Ver Todas las Herramientas",emptyTitle:"Base de Datos Supabase Conectada",emptyDesc:"Ejecuta supabase/schema.sql en el editor SQL para inicializar productos, o abre el Panel de Admin.",openAdmin:"Abrir Panel de Admin"},benefits:{badge:"¿Por qué AI Tools Store?",title:"¿Por qué Elegir AI Tools Store?",subtitle:"Todo lo que necesitas para descubrir, activar y dominar herramientas de IA sin fricción.",b1Title:"Herramientas Curadas",b1Desc:"Solo herramientas de alta calidad y verificadas.",b2Title:"Tutoriales Paso a Paso",b2Desc:"Aprende a usar cada herramienta de manera efectiva.",b3Title:"Acceso y Soporte Inmediato",b3Desc:"Obtén activación inmediata y asistencia vía WhatsApp.",b4Title:"Siempre Actualizado",b4Desc:"Descubre nuevas herramientas y mejoras periódicamente."},finalCta:{badge:"✦ Desbloquea Superpoderes con IA",title:"¿Listo para Explorar el Futuro de la IA?",subtitle:"Únete a miles de creadores, desarrolladores e innovadores que usan AI Tools Store.",getStarted:"✦ Comenzar Ahora",browseTools:"Explorar Herramientas"},card:{buyNow:"Comprar Ahora",howToUse:"Cómo Usar",viewDetails:"Ver Detalles",perMonth:"/mes",rating:"Calificación",users:"usuarios",saveFav:"Guardar en favoritos",addedFavToast:"¡Añadido a tus favoritos!",removedFavToast:"Eliminado de tus favoritos"},auth:{createAccountHeading:"Crea tu cuenta en AI Tools Store",welcomeBackHeading:"Bienvenido de nuevo a AI Tools Store",createAccountSub:"✦ Únete a miles de creadores, constructores e innovadores.",signInSub:"✦ Inicia sesión para continuar descubriendo potentes herramientas.",tabSignUp:"Registrarse",tabSignIn:"Iniciar Sesión",fullNameLabel:"Nombre Completo",fullNamePlaceholder:"Ingresa tu nombre completo",emailLabel:"Correo Electrónico",emailPlaceholder:"Ingresa tu correo electrónico",whatsappLabel:"Número de WhatsApp",whatsappPlaceholder:"Ingresa tu número de WhatsApp",passwordLabel:"Contraseña",passwordPlaceholder:"Crea una contraseña (mínimo 6 caracteres)",confirmPasswordLabel:"Confirmar Contraseña",confirmPasswordPlaceholder:"Confirma tu contraseña",btnCreateAccount:"✦ Crear Cuenta",btnSignIn:"→ Iniciar Sesión",alreadyHaveAccount:"¿Ya tienes una cuenta?",dontHaveAccount:"¿No tienes una cuenta?",linkSignIn:"Inicia sesión",linkSignUp:"Regístrate",passwordsMismatch:"Las contraseñas no coinciden. Por favor verifica de nuevo.",minLengthError:"La contraseña debe tener al menos 6 caracteres.",requiredError:"Por favor completa todos los campos requeridos.",creatingAccount:"Creando cuenta...",signingIn:"Iniciando sesión...",welcomeToast:"Bienvenido a AI Tools Store",signedInToast:"¡Inicio de sesión exitoso!",signedOutToast:"Sesión cerrada correctamente."},account:{title:"Detalles de la Cuenta",verified:"● Cuenta Verificada",emailLabel:"Correo Electrónico",whatsappLabel:"Número de WhatsApp",memberSince:"Miembro Desde",signOutBtn:"Cerrar Sesión de la Cuenta"},toolDetails:{notFoundTitle:"Herramienta No Encontrada",notFoundDesc:"La herramienta que buscas no existe o ha sido descontinuada.",backToTools:"Volver a Todas las Herramientas",buyNowWhatsApp:"Comprar vía WhatsApp",visitWebsite:"Visitar Sitio Oficial",overviewTab:"Resumen",featuresTab:"Características y Beneficios",howToUseTab:"Cómo Usar y Tutorial",videoTutorial:"Video Tutorial",guaranteesSupport:"Soporte directo y dedicado por WhatsApp",guaranteesActivation:"Activación instantánea en menos de 5 minutos",guaranteesLicensing:"Licencia de software 100% genuina y verificada",purchaseVerified:"Enlace de compra verificado: redirige directamente a WhatsApp.",similarTools:"Herramientas de IA Similares en"},allTools:{headerTitle:"Explora Herramientas de IA Seleccionadas",headerSubtitle:"Descubre, compara y adquiere licencias de software con activación inmediata.",searchPlaceholder:"Buscar por nombre o funcionalidad...",allCategories:"Todas",sortPopular:"Más Populares",sortRating:"Mejor Calificadas",sortPriceLow:"Precio: Menor a Mayor",sortPriceHigh:"Precio: Mayor a Menor",sortName:"Alfabético",resultsCount:"Mostrando {count} herramientas de IA",clearFilters:"Limpiar Filtros",loadMore:"Cargar Más Herramientas",noResultsTitle:"No se encontraron herramientas que coincidan con tu búsqueda",noResultsDesc:"Intenta buscar con otra palabra clave o selecciona otra categoría.",resetFilters:"Restablecer Filtros"},footer:{desc:"El mercado líder para descubrir, activar y dominar herramientas de IA con acceso instantáneo vía WhatsApp.",exploreHeading:"Explorar",resourcesHeading:"Recursos",communityHeading:"Comunidad",allRightsReserved:"Todos los derechos reservados. Creado para pioneros de la IA."}},Dl={nav:{brand:"AI Tools Store",home:"Accueil",allTools:"Tous les Outils",categories:"Catégories",about:"À Propos",contact:"Contact",admin:"Admin",searchTitle:"Rechercher des outils (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"Rejoindre WhatsApp",signIn:"Connexion",signUp:"✦ Inscription",account:"Mon Compte",logout:"Déconnexion",selectLanguage:"Choisir la langue"},hero:{headlinePart1:"Découvrez les Meilleurs",headlineGradient:"Outils IA",headlinePart2:"en un Seul Endroit",desc:"Trouvez, explorez et maîtrisez des outils d’IA de pointe pour décupler votre productivité, automatiser vos flux et construire le futur.",searchPlaceholder:"Rechercher des outils IA...",searchSubmit:"Rechercher",exploreBtn:"Explorer les Outils",communityBtn:"Rejoindre la Communauté",trust1Title:"Vérifié & Fiable",trust1Desc:"Des outils de qualité certifiée",trust2Title:"Accès Instantané",trust2Desc:"Commencez en quelques secondes",trust3Title:"Meilleurs Prix",trust3Desc:"Tarifs transparents et abordables"},categories:{badge:"Catalogue",title:"Explorer les Outils IA par Catégorie",viewAll:"Voir Toutes les Catégories",countLabel:"Outils"},featured:{badge:"Sélection Exclusive",title:"Explorez des Outils IA Puissants",subtitle:"Une sélection rigoureuse pour propulser vos projets vers de nouveaux sommets",viewAll:"Voir Tous les Outils",emptyTitle:"Base de Données Supabase Connectée",emptyDesc:"Exécutez supabase/schema.sql dans Supabase pour importer les outils, ou ouvrez le panneau Admin.",openAdmin:"Ouvrir le Panneau Admin"},benefits:{badge:"Pourquoi AI Tools Store",title:"Pourquoi Choisir AI Tools Store ?",subtitle:"Tout ce dont vous avez besoin pour découvrir, activer et maîtriser l’IA sans effort.",b1Title:"Outils IA Sélectionnés",b1Desc:"Uniquement des solutions performantes et éprouvées.",b2Title:"Tutoriels Pas à Pas",b2Desc:"Apprenez à tirer le meilleur parti de chaque outil.",b3Title:"Accès Immédiat & Support",b3Desc:"Activation rapide et assistance directe sur WhatsApp.",b4Title:"Mises à Jour Constantes",b4Desc:"Découvrez de nouveaux outils et fonctionnalités régulièrement."},finalCta:{badge:"✦ Révélez Vos Superpouvoirs IA",title:"Prêt à Découvrir le Futur de l’IA ?",subtitle:"Rejoignez des milliers de créateurs, développeurs et entreprises qui innovent avec nous.",getStarted:"✦ Commencer Maintenant",browseTools:"Parcourir les Outils"},card:{buyNow:"Acheter",howToUse:"Tutoriel",viewDetails:"Détails",perMonth:"/mois",rating:"Note",users:"utilisateurs",saveFav:"Ajouter aux favoris",addedFavToast:"Ajouté à vos favoris !",removedFavToast:"Retiré des favoris"},auth:{createAccountHeading:"Créer votre compte AI Tools Store",welcomeBackHeading:"Bon retour sur AI Tools Store",createAccountSub:"✦ Rejoignez des milliers de créateurs et innovateurs.",signInSub:"✦ Connectez-vous pour continuer à explorer les meilleurs outils IA.",tabSignUp:"Inscription",tabSignIn:"Connexion",fullNameLabel:"Nom Complet",fullNamePlaceholder:"Entrez votre nom complet",emailLabel:"Adresse E-mail",emailPlaceholder:"Entrez votre e-mail",whatsappLabel:"Numéro WhatsApp",whatsappPlaceholder:"Entrez votre numéro WhatsApp",passwordLabel:"Mot de Passe",passwordPlaceholder:"Créez un mot de passe (min 6 caractères)",confirmPasswordLabel:"Confirmer le Mot de Passe",confirmPasswordPlaceholder:"Confirmez votre mot de passe",btnCreateAccount:"✦ Créer un Compte",btnSignIn:"→ Se Connecter",alreadyHaveAccount:"Vous avez déjà un compte ?",dontHaveAccount:"Pas encore de compte ?",linkSignIn:"Connexion",linkSignUp:"Inscription",passwordsMismatch:"Les mots de passe ne correspondent pas.",minLengthError:"Le mot de passe doit comporter au moins 6 caractères.",requiredError:"Veuillez remplir tous les champs obligatoires.",creatingAccount:"Création du compte...",signingIn:"Connexion en cours...",welcomeToast:"Bienvenue sur AI Tools Store",signedInToast:"Connexion réussie !",signedOutToast:"Déconnexion réussie."},account:{title:"Détails du Compte",verified:"● Compte Vérifié",emailLabel:"Adresse E-mail",whatsappLabel:"Numéro WhatsApp",memberSince:"Membre Depuis",signOutBtn:"Se Déconnecter"},toolDetails:{notFoundTitle:"Outil Introuvable",notFoundDesc:"L’outil demandé n’existe pas ou n’est plus disponible.",backToTools:"Retour aux Outils",buyNowWhatsApp:"Acheter via WhatsApp",visitWebsite:"Site Officiel",overviewTab:"Aperçu",featuresTab:"Fonctionnalités",howToUseTab:"Guide d’Utilisation",videoTutorial:"Tutoriel Vidéo",guaranteesSupport:"Support direct dédié via WhatsApp",guaranteesActivation:"Activation garantie en moins de 5 minutes",guaranteesLicensing:"Licence logicielle 100% officielle et vérifiée",purchaseVerified:"Lien d’achat vérifié : redirection sécurisée vers WhatsApp.",similarTools:"Outils IA similaires dans"},allTools:{headerTitle:"Explorez Notre Sélection d’Outils IA",headerSubtitle:"Comparez, découvrez et obtenez vos accès avec activation instantanée.",searchPlaceholder:"Rechercher par nom ou fonctionnalité...",allCategories:"Tous",sortPopular:"Plus Populaires",sortRating:"Mieux Notés",sortPriceLow:"Prix : Croissant",sortPriceHigh:"Prix : Décroissant",sortName:"Alphabétique",resultsCount:"{count} outils IA affichés",clearFilters:"Effacer les Filtres",loadMore:"Charger Plus d’Outils",noResultsTitle:"Aucun outil correspondant à votre recherche",noResultsDesc:"Essayez avec d’autres mots-clés ou sélectionnez une autre catégorie.",resetFilters:"Réinitialiser"},footer:{desc:"La plateforme de référence pour découvrir, activer et maîtriser les meilleurs outils d’IA avec assistance instantanée WhatsApp.",exploreHeading:"Explorer",resourcesHeading:"Ressources",communityHeading:"Communauté",allRightsReserved:"Tous droits réservés. Conçu pour les bâtisseurs de demain."}},Nl={nav:{brand:"AI Tools Store",home:"Startseite",allTools:"Alle Tools",categories:"Kategorien",about:"Über uns",contact:"Kontakt",admin:"Admin",searchTitle:"Tools suchen (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"WhatsApp beitreten",signIn:"Anmelden",signUp:"✦ Registrieren",account:"Mein Konto",logout:"Abmelden",selectLanguage:"Sprache wählen"},hero:{headlinePart1:"Entdecke die besten",headlineGradient:"KI-Tools",headlinePart2:"an einem Ort",desc:"Finde, teste und meistere bahnbrechende KI-Tools, um deine Produktivität zu steigern, Abläufe zu automatisieren und die Zukunft zu gestalten.",searchPlaceholder:"KI-Tools durchsuchen...",searchSubmit:"Tools suchen",exploreBtn:"Tools erkunden",communityBtn:"Community beitreten",trust1Title:"Geprüft & Sicher",trust1Desc:"Hochwertige Tools mit Qualitätsgarantie",trust2Title:"Sofortiger Zugriff",trust2Desc:"In wenigen Sekunden startklar",trust3Title:"Beste Preise",trust3Desc:"Faire & transparente Konditionen"},categories:{badge:"Katalog durchstöbern",title:"KI-Tools nach Kategorien entdecken",viewAll:"Alle Kategorien ansehen",countLabel:"Tools"},featured:{badge:"Empfohlene Auswahl",title:"Leistungsstarke KI-Tools entdecken",subtitle:"Handverlesene Softwarelösungen zur Optimierung deiner Arbeitsabläufe",viewAll:"Alle Tools anzeigen",emptyTitle:"Supabase-Datenbank verbunden",emptyDesc:"Führe schema.sql in Supabase aus, um Produkte anzulegen, oder öffne das Admin-Panel.",openAdmin:"Admin-Panel öffnen"},benefits:{badge:"Warum AI Tools Store",title:"Warum AI Tools Store wählen?",subtitle:"Alles, was du brauchst, um moderne KI-Tools nahtlos zu entdecken und zu nutzen.",b1Title:"Kuratierte KI-Tools",b1Desc:"Nur sorgfältig geprüfte Spitzenwerkzeuge.",b2Title:"Schritt-für-Schritt-Anleitungen",b2Desc:"Lerne den optimalen Einsatz für jedes Tool.",b3Title:"Sofortzugang & WhatsApp-Support",b3Desc:"Schnelle Freischaltung und direkte Unterstützung.",b4Title:"Stets aktuell",b4Desc:"Regelmäßig neue Tools und exklusive Updates."},finalCta:{badge:"✦ KI-Superkräfte freischalten",title:"Bereit für die Zukunft der künstlichen Intelligenz?",subtitle:"Schließe dich tausenden Entwicklern und Innovatoren an, die AI Tools Store nutzen.",getStarted:"✦ Jetzt starten",browseTools:"Tools durchstöbern"},card:{buyNow:"Jetzt kaufen",howToUse:"Anleitung",viewDetails:"Details ansehen",perMonth:"/Monat",rating:"Bewertung",users:"Nutzer",saveFav:"Zu Favoriten hinzufügen",addedFavToast:"Zu Favoriten hinzugefügt!",removedFavToast:"Aus Favoriten entfernt"},auth:{createAccountHeading:"Erstelle dein AI Tools Store Konto",welcomeBackHeading:"Willkommen zurück bei AI Tools Store",createAccountSub:"✦ Schließe dich tausenden Kreativen und Entwicklern an.",signInSub:"✦ Melde dich an, um innovative KI-Tools zu nutzen.",tabSignUp:"Registrieren",tabSignIn:"Anmelden",fullNameLabel:"Vollständiger Name",fullNamePlaceholder:"Name eingeben",emailLabel:"E-Mail-Adresse",emailPlaceholder:"E-Mail-Adresse eingeben",whatsappLabel:"WhatsApp-Nummer",whatsappPlaceholder:"WhatsApp-Nummer eingeben",passwordLabel:"Passwort",passwordPlaceholder:"Passwort erstellen (mind. 6 Zeichen)",confirmPasswordLabel:"Passwort bestätigen",confirmPasswordPlaceholder:"Passwort wiederholen",btnCreateAccount:"✦ Konto erstellen",btnSignIn:"→ Anmelden",alreadyHaveAccount:"Bereits registriert?",dontHaveAccount:"Noch kein Konto?",linkSignIn:"Anmelden",linkSignUp:"Registrieren",passwordsMismatch:"Passwörter stimmen nicht überein.",minLengthError:"Das Passwort muss mindestens 6 Zeichen lang sein.",requiredError:"Bitte fülle alle Pflichtfelder aus.",creatingAccount:"Konto wird erstellt...",signingIn:"Anmeldung läuft...",welcomeToast:"Willkommen bei AI Tools Store",signedInToast:"Erfolgreich angemeldet!",signedOutToast:"Erfolgreich abgemeldet."},account:{title:"Kontodetails",verified:"● Verifiziertes Konto",emailLabel:"E-Mail-Adresse",whatsappLabel:"WhatsApp-Nummer",memberSince:"Mitglied seit",signOutBtn:"Abmelden"},toolDetails:{notFoundTitle:"Tool nicht gefunden",notFoundDesc:"Das gesuchte Tool existiert nicht oder ist derzeit nicht verfügbar.",backToTools:"Zurück zur Übersicht",buyNowWhatsApp:"Über WhatsApp kaufen",visitWebsite:"Offizielle Website besuchen",overviewTab:"Überblick",featuresTab:"Funktionen & Vorteile",howToUseTab:"Bedienungsanleitung",videoTutorial:"Video-Tutorial",guaranteesSupport:"Direkter WhatsApp-Concierge-Support",guaranteesActivation:"Sofortige Aktivierung in unter 5 Minuten",guaranteesLicensing:"100% verifizierte Original-Lizenz",purchaseVerified:"Verifizierter Kauflink: Leitet direkt zu WhatsApp weiter.",similarTools:"Ähnliche KI-Tools in"},allTools:{headerTitle:"Entdecke ausgewählte KI-Tools",headerSubtitle:"Vergleiche und aktiviere Premium-Softwarelizenzen im Handumdrehen.",searchPlaceholder:"Nach Name oder Funktion suchen...",allCategories:"Alle",sortPopular:"Beliebteste",sortRating:"Beste Bewertung",sortPriceLow:"Preis: Aufsteigend",sortPriceHigh:"Preis: Absteigend",sortName:"Alphabetisch",resultsCount:"{count} KI-Tools angezeigt",clearFilters:"Filter zurücksetzen",loadMore:"Mehr Tools laden",noResultsTitle:"Keine Tools gefunden",noResultsDesc:"Probiere andere Suchbegriffe oder wähle eine andere Kategorie.",resetFilters:"Filter zurücksetzen"},footer:{desc:"Der führende Marktplatz zum Entdecken, Aktivieren und Erlernen moderner KI-Tools mit WhatsApp-Support.",exploreHeading:"Erkunden",resourcesHeading:"Ressourcen",communityHeading:"Community",allRightsReserved:"Alle Rechte vorbehalten. Entwickelt für KI-Pioniere."}},zl={nav:{brand:"AI Tools Store",home:"首页",allTools:"所有工具",categories:"分类",about:"关于我们",contact:"联系我们",admin:"管理后台",searchTitle:"搜索工具 (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"加入 WhatsApp",signIn:"登录",signUp:"✦ 注册",account:"我的账户",logout:"退出登录",selectLanguage:"选择语言"},hero:{headlinePart1:"一站式探索前沿",headlineGradient:"AI 神器与工具",headlinePart2:"赋能未来",desc:"发现、探索并掌握顶尖人工智能工具，倍增您的工作效率，实现业务自动化，引领智能新时代。",searchPlaceholder:"搜索 AI 工具...",searchSubmit:"搜索工具",exploreBtn:"探索全部工具",communityBtn:"加入官方社群",trust1Title:"官方正版验证",trust1Desc:"精选高品质、值得信赖的工具",trust2Title:"即时极速开通",trust2Desc:"数秒内即可激活使用",trust3Title:"高性价比优惠",trust3Desc:"透明公开、实惠透明的价格"},categories:{badge:"分类目录",title:"按分类浏览 AI 工具",viewAll:"查看所有分类",countLabel:"款工具"},featured:{badge:"精选推荐",title:"探索强大的 AI 效率工具",subtitle:"经过严选与实测的高效工具，全面升级您的工作流",viewAll:"查看所有工具",emptyTitle:"已连接 Supabase 数据库",emptyDesc:"在 Supabase SQL 编辑器中运行 schema.sql 以导入工具数据，或进入管理后台。",openAdmin:"打开管理后台"},benefits:{badge:"为什么选择我们",title:"为什么选择 AI Tools Store？",subtitle:"助您轻松发掘、激活和掌握人工智能全生态工具，毫无阻碍。",b1Title:"精选前沿 AI 工具",b1Desc:"仅收录高质量、通过严格测试的 AI 软件。",b2Title:"保姆级实操教程",b2Desc:"手把手教您高效发挥每一款工具的最大价值。",b3Title:"即时交付与专属客服",b3Desc:"通过 WhatsApp 获得急速激活与 1 对 1 咨询。",b4Title:"持续同步更新",b4Desc:"紧跟全球 AI 浪潮，定期上线全新工具和功能。"},finalCta:{badge:"✦ 开启 AI 超能力",title:"准备好拥抱人工智能的未来了吗？",subtitle:"与成千上万的创作者、开发者与先锋团队一同使用 AI Tools Store 保持领先。",getStarted:"✦ 立即开启",browseTools:"浏览工具"},card:{buyNow:"立即购买",howToUse:"使用教程",viewDetails:"查看详情",perMonth:"/月",rating:"评分",users:"位用户",saveFav:"收藏工具",addedFavToast:"已成功添加至收藏夹！",removedFavToast:"已从收藏夹中移除"},auth:{createAccountHeading:"创建您的 AI Tools Store 账户",welcomeBackHeading:"欢迎回到 AI Tools Store",createAccountSub:"✦ 与数万名创作者、开发者和先驱者同行。",signInSub:"✦ 登录以继续探索更多强大 AI 工具。",tabSignUp:"注册",tabSignIn:"登录",fullNameLabel:"姓名",fullNamePlaceholder:"输入您的真实姓名",emailLabel:"电子邮箱",emailPlaceholder:"输入您的电子邮箱",whatsappLabel:"WhatsApp 电话",whatsappPlaceholder:"输入您的 WhatsApp 手机号",passwordLabel:"密码",passwordPlaceholder:"设置密码（至少 6 位字符）",confirmPasswordLabel:"确认密码",confirmPasswordPlaceholder:"请再次输入密码",btnCreateAccount:"✦ 立即注册",btnSignIn:"→ 登录",alreadyHaveAccount:"已有账户？",dontHaveAccount:"还没有账户？",linkSignIn:"直接登录",linkSignUp:"免费注册",passwordsMismatch:"两次输入的密码不一致，请核对。",minLengthError:"密码长度至少需为 6 个字符。",requiredError:"请填写所有必填字段。",creatingAccount:"正在创建账户...",signingIn:"正在登录...",welcomeToast:"欢迎来到 AI Tools Store",signedInToast:"登录成功！",signedOutToast:"已成功退出登录。"},account:{title:"账户信息",verified:"● 官方认证账户",emailLabel:"电子邮箱",whatsappLabel:"WhatsApp 电话",memberSince:"注册时间",signOutBtn:"退出账户"},toolDetails:{notFoundTitle:"未找到该工具",notFoundDesc:"您访问的工具不存在或已下架。",backToTools:"返回所有工具",buyNowWhatsApp:"通过 WhatsApp 购买",visitWebsite:"访问官方网站",overviewTab:"概览",featuresTab:"核心功能与优势",howToUseTab:"使用教程与技巧",videoTutorial:"视频演示",guaranteesSupport:"专属 WhatsApp 1 对 1 客服支持",guaranteesActivation:"5 分钟内极速授权激活",guaranteesLicensing:"100% 正版官方授权保障",purchaseVerified:"官方认证购买通道：直接转接至 WhatsApp 顾问。",similarTools:"更多同类 AI 工具："},allTools:{headerTitle:"探索精选 AI 工具库",headerSubtitle:"发现、对比并立即解锁顶级正版 AI 软件授权与极速开通服务。",searchPlaceholder:"输入工具名称或功能特性进行搜索...",allCategories:"全部",sortPopular:"最受欢迎",sortRating:"最高评分",sortPriceLow:"价格：从低到高",sortPriceHigh:"价格：从高到低",sortName:"名称字母排序",resultsCount:"当前显示 {count} 款 AI 工具",clearFilters:"清空筛选",loadMore:"加载更多工具",noResultsTitle:"未找到符合搜索条件的工具",noResultsDesc:"请尝试更换关键词搜索，或在上方选择不同的类别。",resetFilters:"重置筛选"},footer:{desc:"领先的前沿 AI 工具发现、激活与学习平台，提供极速 WhatsApp 咨询开通支持。",exploreHeading:"探索",resourcesHeading:"资源指南",communityHeading:"交流社区",allRightsReserved:"版权所有。专为现代 AI 先锋创作者打造。"}},nr={en:Rl,ur:Ll,ar:Ol,hi:Ul,es:Bl,fr:Dl,de:Nl,zh:zl},jl={ur:{"writegen-ai":{name:"رائٹ جین اے آئی",tagline:"اعلیٰ معیار کا مواد، بلاگ اور کاپی سیکنڈز میں لکھیں",description:"جدید ترین اے آئی ٹیکنالوجی کی مدد سے بلاگ پوسٹس، مارکیٹنگ کاپی، ای میلز اور سوشل میڈیا مواد تیار کریں۔ تیز، مؤثر اور 100 فیصد اصل تحریر۔"},"artify-studio":{name:"آرٹیفائی اسٹوڈیو",tagline:"اپنے تخیل کو حیرت انگیز ڈیجیٹل شاہکاروں میں تبدیل کریں",description:"جدید نیورل آرٹ جنریٹر جو آپ کے خیالات کو سیکنڈوں میں شاندار تصاویر اور ویژولز میں تبدیل کر دیتا ہے۔"},"codepilot-ai":{name:"کوڈ پائلٹ اے آئی",tagline:"آپ کا ذہین پروگرامنگ پارٹنر اور کوڈ جنریٹر",description:"کوڈ جنریشن، غلطیوں کی اصلاح اور آٹومیشن کے ذریعے اپنی کوڈنگ کی رفتار کو 10 گنا تیز کریں۔ تمام جدید زبانوں کے لیے تیار۔"}},ar:{"writegen-ai":{name:"رايت جين للذكاء الاصطناعي",tagline:"أنشئ محتوى ومقالات إبداعية عالية الجودة في ثوانٍ",description:"أداة كتابة احترافية بالذكاء الاصطناعي لكتابة المقالات، والنصوص التسويقية، ورسائل البريد الإلكتروني بسرعة ودقة متناهية."},"artify-studio":{name:"استوديو أرتيفاي",tagline:"حول خيالك وأفكارك إلى أعمال فنية بصرية مذهلة",description:"منشئ فنون بصرية مدعوم بالذكاء الاصطناعي التوليدي لإنشاء تصاميم وصور فائقة الجودة في لمح البصر."},"codepilot-ai":{name:"كود بايلوت الذكي",tagline:"مساعد البرمجة الذكي لتسريع كتابة وتصحيح الأكواد",description:"اكتب كوداً نظيفاً، واكتشف الأخطاء البرمجية تلقائياً، وضاعف سرعتك البرمجية بفضل نماذج الذكاء الاصطناعي المتطورة."}},hi:{"writegen-ai":{name:"राइटजेन एआई",tagline:"सेकंडों में उच्च गुणवत्ता वाली सामग्री और ब्लॉग लिखें",description:"उन्नत एआई तकनीक से ब्लॉग पोस्ट, मार्केटिंग कॉपी, ईमेल और सोशल मीडिया सामग्री तुरंत तैयार करें।"},"artify-studio":{name:"आर्टिफ़ाई स्टूडियो",tagline:"अपनी कल्पना को शानदार डिजिटल कलाकृतियों में बदलें",description:"शक्तिशाली न्यूरल आर्ट जनरेटर जो आपके विचारों को सेकंडों में आकर्षक कला और तस्वीरों में बदल देता है।"},"codepilot-ai":{name:"कोडपायलट एआई",tagline:"आपका बुद्धिमान प्रोग्रामिंग सहायक और कोड जनरेटर",description:"कोड जनरेशन, बग फिक्सिंग और ऑटोमेशन के साथ अपनी कोडिंग गति को 10 गुना तेज करें।"}},es:{"writegen-ai":{name:"WriteGen AI",tagline:"Crea contenido y artículos de alta calidad en segundos",description:"Asistente de escritura de IA para generar publicaciones de blog, textos publicitarios y correos con máxima velocidad y creatividad."},"artify-studio":{name:"Artify Studio",tagline:"Transforma tu imaginación en impresionante arte digital",description:"Generador de imágenes y arte impulsado por IA que convierte texto en obras de arte de alta fidelidad al instante."},"codepilot-ai":{name:"CodePilot AI",tagline:"Tu copiloto inteligente para escribir y depurar código",description:"Acelera tu desarrollo de software con autocompletado inteligente, detección de errores y generación de código multifuncional."}}},Qn="ai_tools_preferred_language",ri=new Set;function Ml(){try{const r=localStorage.getItem(Qn);if(r&&Wt(r))return r;const e=(navigator.language||navigator.userLanguage||"en").split("-")[0].toLowerCase();if(Wt(e))return e}catch{}return"en"}let kt=Ml();function Xn(r=kt){return Pl.includes(r.toLowerCase())}function hi(){return kt}function Zn(r){return ri.add(r),()=>ri.delete(r)}function g(r,e={}){const t=nr[kt]||nr.en;function i(a,s){if(!(!a||typeof a!="object"))return s.split(".").reduce((o,l)=>o&&o[l]!==void 0?o[l]:void 0,a)}let n=i(t,r);return n===void 0&&t!==nr.en&&(n=i(nr.en,r)),n===void 0?r:typeof n!="string"?n:n.replace(/\{(\w+)\}/g,(a,s)=>e[s]!==void 0?e[s]:a)}function ea(r){if(typeof document>"u")return;const e=Xn(r),t=document.documentElement,i=document.body;!t||!i||(t.setAttribute("lang",r),t.setAttribute("dir",e?"rtl":"ltr"),e?(t.classList.add("rtl"),i.classList.add("rtl-layout")):(t.classList.remove("rtl"),i.classList.remove("rtl-layout")),r==="ur"?(t.classList.add("lang-ur"),t.classList.remove("lang-ar")):r==="ar"?(t.classList.add("lang-ar"),t.classList.remove("lang-ur")):t.classList.remove("lang-ur","lang-ar"))}async function ql(r){Wt(r)||(console.warn(`[i18n] Language '${r}' not recognized, falling back to 'en'.`),r="en"),kt=r;try{localStorage.setItem(Qn,r)}catch(e){console.warn("[i18n] Could not persist language to localStorage:",e)}ea(r);try{const e=H.getCurrentUser();e&&e.id&&N&&N.from("profiles").update({preferred_language:r}).eq("id",e.id).then(()=>{}).catch(()=>{})}catch{}return ri.forEach(e=>{try{e(r,Xn(r))}catch(t){console.error("[i18n] Error in language listener:",t)}}),r}function ta(r){var t;if(!r)return r;const e=(t=jl[kt])==null?void 0:t[r.slug];return e?{...r,name:e.name||r.name,tagline:e.tagline||r.tagline,description:e.description||r.description}:r}typeof document<"u"&&ea(kt);const ii=[{name:"Pakistan",code:"+92",iso:"PK",flag:"🇵🇰"},{name:"India",code:"+91",iso:"IN",flag:"🇮🇳"},{name:"United Arab Emirates",code:"+971",iso:"AE",flag:"🇦🇪"},{name:"Saudi Arabia",code:"+966",iso:"SA",flag:"🇸🇦"},{name:"United States",code:"+1",iso:"US",flag:"🇺🇸"},{name:"United Kingdom",code:"+44",iso:"GB",flag:"🇬🇧"},{name:"Canada",code:"+1",iso:"CA",flag:"🇨🇦"},{name:"Australia",code:"+61",iso:"AU",flag:"🇦🇺"},{name:"Germany",code:"+49",iso:"DE",flag:"🇩🇪"},{name:"Oman",code:"+968",iso:"OM",flag:"🇴🇲"},{name:"Qatar",code:"+974",iso:"QA",flag:"🇶🇦"},{name:"Kuwait",code:"+965",iso:"KW",flag:"🇰🇼"},{name:"Bahrain",code:"+973",iso:"BH",flag:"🇧🇭"},{name:"Turkey",code:"+90",iso:"TR",flag:"🇹🇷"},{name:"Bangladesh",code:"+880",iso:"BD",flag:"🇧🇩"},{name:"Sri Lanka",code:"+94",iso:"LK",flag:"🇱🇰"},{name:"Nepal",code:"+977",iso:"NP",flag:"🇳🇵"},{name:"Afghanistan",code:"+93",iso:"AF",flag:"🇦🇫"},{name:"Malaysia",code:"+60",iso:"MY",flag:"🇲🇾"},{name:"Singapore",code:"+65",iso:"SG",flag:"🇸🇬"},{name:"Indonesia",code:"+62",iso:"ID",flag:"🇮🇩"},{name:"Philippines",code:"+63",iso:"PH",flag:"🇵🇭"},{name:"Thailand",code:"+66",iso:"TH",flag:"🇹🇭"},{name:"Vietnam",code:"+84",iso:"VN",flag:"🇻🇳"},{name:"China",code:"+86",iso:"CN",flag:"🇨🇳"},{name:"Hong Kong",code:"+852",iso:"HK",flag:"🇭🇰"},{name:"Japan",code:"+81",iso:"JP",flag:"🇯🇵"},{name:"South Korea",code:"+82",iso:"KR",flag:"🇰🇷"},{name:"France",code:"+33",iso:"FR",flag:"🇫🇷"},{name:"Italy",code:"+39",iso:"IT",flag:"🇮🇹"},{name:"Spain",code:"+34",iso:"ES",flag:"🇪🇸"},{name:"Netherlands",code:"+31",iso:"NL",flag:"🇳🇱"},{name:"Switzerland",code:"+41",iso:"CH",flag:"🇨🇭"},{name:"Sweden",code:"+46",iso:"SE",flag:"🇸🇪"},{name:"Norway",code:"+47",iso:"NO",flag:"🇳🇴"},{name:"Denmark",code:"+45",iso:"DK",flag:"🇩🇰"},{name:"Ireland",code:"+353",iso:"IE",flag:"🇮🇪"},{name:"Belgium",code:"+32",iso:"BE",flag:"🇧🇪"},{name:"Austria",code:"+43",iso:"AT",flag:"🇦🇹"},{name:"Portugal",code:"+351",iso:"PT",flag:"🇵🇹"},{name:"Poland",code:"+48",iso:"PL",flag:"🇵🇱"},{name:"Greece",code:"+30",iso:"GR",flag:"🇬🇷"},{name:"Czech Republic",code:"+420",iso:"CZ",flag:"🇨🇿"},{name:"Hungary",code:"+36",iso:"HU",flag:"🇭🇺"},{name:"Romania",code:"+40",iso:"RO",flag:"🇷🇴"},{name:"Russia",code:"+7",iso:"RU",flag:"🇷🇺"},{name:"Ukraine",code:"+380",iso:"UA",flag:"🇺🇦"},{name:"Egypt",code:"+20",iso:"EG",flag:"🇪🇬"},{name:"South Africa",code:"+27",iso:"ZA",flag:"🇿🇦"},{name:"Nigeria",code:"+234",iso:"NG",flag:"🇳🇬"},{name:"Kenya",code:"+254",iso:"KE",flag:"🇰🇪"},{name:"Morocco",code:"+212",iso:"MA",flag:"🇲🇦"},{name:"Algeria",code:"+213",iso:"DZ",flag:"🇩🇿"},{name:"Tunisia",code:"+216",iso:"TN",flag:"🇹🇳"},{name:"Jordan",code:"+962",iso:"JO",flag:"🇯🇴"},{name:"Lebanon",code:"+961",iso:"LB",flag:"🇱🇧"},{name:"Iraq",code:"+964",iso:"IQ",flag:"🇮🇶"},{name:"Yemen",code:"+967",iso:"YE",flag:"🇾🇪"},{name:"Ghana",code:"+233",iso:"GH",flag:"🇬🇭"},{name:"Tanzania",code:"+255",iso:"TZ",flag:"🇹🇿"},{name:"Uganda",code:"+256",iso:"UG",flag:"🇺🇬"},{name:"Ethiopia",code:"+251",iso:"ET",flag:"🇪🇹"},{name:"New Zealand",code:"+64",iso:"NZ",flag:"🇳🇿"},{name:"Brazil",code:"+55",iso:"BR",flag:"🇧🇷"},{name:"Mexico",code:"+52",iso:"MX",flag:"🇲🇽"},{name:"Argentina",code:"+54",iso:"AR",flag:"🇦🇷"},{name:"Colombia",code:"+57",iso:"CO",flag:"🇨🇴"},{name:"Chile",code:"+56",iso:"CL",flag:"🇨🇱"},{name:"Peru",code:"+51",iso:"PE",flag:"🇵🇪"},{name:"Venezuela",code:"+58",iso:"VE",flag:"🇻🇪"},{name:"Cyprus",code:"+357",iso:"CY",flag:"🇨🇾"},{name:"Maldives",code:"+960",iso:"MV",flag:"🇲🇻"},{name:"Mauritius",code:"+230",iso:"MU",flag:"🇲🇺"},{name:"Azerbaijan",code:"+994",iso:"AZ",flag:"🇦🇿"},{name:"Kazakhstan",code:"+7",iso:"KZ",flag:"🇰🇿"},{name:"Uzbekistan",code:"+998",iso:"UZ",flag:"🇺🇿"}];function fn(r){if(!r)return null;const e=r.toLowerCase().trim();return ii.find(t=>t.name.toLowerCase()===e||t.code===e||t.iso.toLowerCase()===e||t.name.toLowerCase().includes(e))||null}function ar(){const r=document.getElementById("auth-modal-backdrop");r&&(r.classList.add("fade-out"),setTimeout(()=>{try{r.remove()}catch{}},150))}function Er(r={}){if(document.getElementById("auth-modal-backdrop")){const y=(r.defaultTab||"signin")==="signin"?document.getElementById("tab-btn-signin"):document.getElementById("tab-btn-signup");y&&y.click();return}const t=document.getElementById("modal-root")||document.body;let i=r.defaultTab||"signin";const n=r.onAuthenticated||null;let a="",s="",o="",l=H.getUserCountry()||"Pakistan",c=fn(l)||ii[0];const d=document.createElement("div");d.className="modal-backdrop auth-backdrop-fade",d.id="auth-modal-backdrop";function u(){const v=i==="signup";return`
      <div class="auth-modal-card" onclick="event.stopPropagation();">
        <!-- Ambient Radial Glow Backdrop -->
        <div class="auth-card-ambient-glow"></div>

        <!-- Close Button -->
        <button type="button" id="auth-modal-close" class="auth-close-btn" aria-label="Close modal">&times;</button>

        <!-- Top Pill Toggle: [ Sign In ] [ Sign Up ] -->
        <div class="auth-toggle-pill-container" role="tablist">
          <button type="button" id="tab-btn-signin" class="auth-toggle-pill-btn ${v?"":"active"}" role="tab" aria-selected="${!v}">
            ${g("auth.tabSignIn")}
          </button>
          <button type="button" id="tab-btn-signup" class="auth-toggle-pill-btn ${v?"active":""}" role="tab" aria-selected="${v}">
            ${g("auth.tabSignUp")}
          </button>
        </div>

        <!-- Top Header Icon Container -->
        <div class="auth-header-icon-box">
          ${v?`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                   <circle cx="8.5" cy="7" r="4"/>
                   <line x1="20" y1="8" x2="20" y2="14"/>
                   <line x1="23" y1="11" x2="17" y2="11"/>
                 </svg>`:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                   <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                 </svg>`}
        </div>

        <!-- Headings & Subtitles -->
        <div class="auth-title-wrap">
          <h2 class="auth-heading">
            ${g(v?"auth.createAccountHeading":"auth.welcomeBackHeading")}
          </h2>
          <p class="auth-subtitle">
            ${g(v?"auth.createAccountSub":"auth.signInSub")}
          </p>
        </div>

        <!-- Error Notification Banner -->
        <div id="auth-error-banner" class="auth-error-box" style="display: none;"></div>

        <!-- Authentication Form -->
        <form id="auth-main-form" autocomplete="on">
          ${v?`
            <!-- Full Name -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-fullname">${g("auth.fullNameLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input 
                  type="text" 
                  id="auth-fullname" 
                  class="auth-input-field" 
                  placeholder="${g("auth.fullNamePlaceholder")}" 
                  value="${s}"
                  required 
                  autocomplete="name"
                />
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-email">${g("auth.emailLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input 
                  type="email" 
                  id="auth-email" 
                  class="auth-input-field" 
                  placeholder="${g("auth.emailPlaceholder")}" 
                  value="${a}"
                  required 
                  autocomplete="email"
                />
              </div>
            </div>

            <!-- Country / Region Selection (Sets tailored currency & pricing) -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <label class="auth-field-label" for="auth-country" style="margin-bottom: 0;">Country / Region *</label>
                <span style="font-size: 0.72rem; color: var(--accent-cyan);">Sets your local tool pricing</span>
              </div>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <select id="auth-country" class="auth-input-field" style="cursor: pointer; padding-left: 2.75rem;">
                  <option value="Pakistan" ${l==="Pakistan"?"selected":""}>🇵🇰 Pakistan (PKR Prices)</option>
                  <option value="India" ${l==="India"?"selected":""}>🇮🇳 India (INR Prices)</option>
                  <option value="United Arab Emirates" ${l==="United Arab Emirates"?"selected":""}>🇦🇪 United Arab Emirates (AED)</option>
                  <option value="Saudi Arabia" ${l==="Saudi Arabia"?"selected":""}>🇸🇦 Saudi Arabia (SAR)</option>
                  <option value="United States" ${l==="United States"?"selected":""}>🇺🇸 United States (USD)</option>
                  <option value="United Kingdom" ${l==="United Kingdom"?"selected":""}>🇬🇧 United Kingdom (GBP)</option>
                  <option value="Canada" ${l==="Canada"?"selected":""}>🇨🇦 Canada (CAD)</option>
                  <option value="Australia" ${l==="Australia"?"selected":""}>🇦🇺 Australia (AUD)</option>
                  <option value="Germany" ${l==="Germany"?"selected":""}>🇩🇪 Germany (EUR)</option>
                  <option value="Global" ${l==="Global"?"selected":""}>🌐 Other Countries / Global (USD)</option>
                </select>
              </div>
            </div>

            <!-- WhatsApp Number (with Searchable Country Code Picker) -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <label class="auth-field-label" for="auth-whatsapp" style="margin-bottom: 0;">${g("auth.whatsappLabel")}</label>
                <span style="font-size: 0.72rem; color: var(--accent-cyan);">Auto-selected with country</span>
              </div>
              <div class="auth-phone-group">
                <!-- Searchable Country Dial Code Picker Popover -->
                <div class="auth-dial-code-wrapper" id="auth-dial-code-wrapper">
                  <button type="button" id="auth-dial-code-btn" class="auth-dial-code-btn" aria-haspopup="true" title="Click to search any country code">
                    <span id="auth-dial-flag" class="dial-flag">${c.flag}</span>
                    <span id="auth-dial-code-val" class="dial-code">${c.code}</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  <input type="hidden" id="auth-selected-dial-code" value="${c.code}" />

                  <!-- Real-Time Searchable Countries Dropdown Popover -->
                  <div id="auth-country-picker-dropdown" class="auth-country-picker-dropdown" style="display: none;">
                    <div class="country-picker-search-wrap">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <input 
                        type="text" 
                        id="country-picker-search" 
                        class="country-picker-search-input" 
                        placeholder="Search country or code (e.g. Oman, +968)..." 
                        autocomplete="off"
                      />
                    </div>
                    <div id="country-picker-list" class="country-picker-list"></div>
                  </div>
                </div>

                <div class="auth-input-wrapper" style="flex: 1;">
                  <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <input 
                    type="tel" 
                    id="auth-whatsapp" 
                    class="auth-input-field" 
                    placeholder="${g("auth.whatsappPlaceholder")}" 
                    value="${o}"
                    required 
                    autocomplete="tel"
                  />
                </div>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-password">${g("auth.passwordLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-password" 
                  class="auth-input-field" 
                  placeholder="${g("auth.passwordPlaceholder")}" 
                  required 
                  autocomplete="new-password"
                  minlength="6"
                />
                <button type="button" class="password-toggle-btn" data-target="auth-password" title="Show/Hide Password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group" style="margin-bottom: 1.75rem;">
              <label class="auth-field-label" for="auth-confirm-password">${g("auth.confirmPasswordLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-confirm-password" 
                  class="auth-input-field" 
                  placeholder="${g("auth.confirmPasswordPlaceholder")}" 
                  required 
                  autocomplete="new-password"
                  minlength="6"
                />
                <button type="button" class="password-toggle-btn" data-target="auth-confirm-password" title="Show/Hide Password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="auth-submit-btn" class="auth-primary-action-btn">
              <span>${g("auth.btnCreateAccount")}</span>
            </button>

            <!-- Switch Link -->
            <div class="auth-bottom-switch-row">
              <span>${g("auth.alreadyHaveAccount")}</span>
              <button type="button" id="switch-to-signin-link" class="auth-switch-text-btn">${g("auth.linkSignIn")}</button>
            </div>
            `:`
            <!-- Sign In Email or Phone -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-email">${g("auth.emailLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input 
                  type="text" 
                  id="auth-email" 
                  class="auth-input-field" 
                  placeholder="${g("auth.emailPlaceholder")}" 
                  value="${a}"
                  required 
                  autocomplete="username"
                  autofocus
                />
              </div>
            </div>

            <!-- Sign In Password -->
            <div class="form-group" style="margin-bottom: 2rem;">
              <label class="auth-field-label" for="auth-password">${g("auth.passwordLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-password" 
                  class="auth-input-field" 
                  placeholder="${g("auth.passwordPlaceholder")}" 
                  required 
                  autocomplete="current-password"
                />
                <button type="button" class="password-toggle-btn" data-target="auth-password" title="Show/Hide Password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sign In Submit Button -->
            <button type="submit" id="auth-submit-btn" class="auth-primary-action-btn">
              <span>${g("auth.btnSignIn")}</span>
            </button>

            <!-- Switch Link -->
            <div class="auth-bottom-switch-row">
              <span>${g("auth.dontHaveAccount")}</span>
              <button type="button" id="switch-to-signup-link" class="auth-switch-text-btn">${g("auth.linkSignUp")}</button>
            </div>
            `}
        </form>
      </div>
    `}function p(){const v=d.querySelector("#auth-email");v&&(a=v.value.trim());const y=d.querySelector("#auth-fullname");y&&(s=y.value.trim());const w=d.querySelector("#auth-whatsapp");w&&(o=w.value.trim());const k=d.querySelector("#auth-country");k&&(l=k.value)}function h(v){p(),i=v,f();const y=d.querySelector(v==="signup"?"#auth-fullname":"#auth-email");y&&setTimeout(()=>y.focus(),60)}function m(){const v=d.querySelector("#auth-modal-close");v&&(v.onclick=x=>{x.preventDefault(),x.stopPropagation(),ar()});function y(x){if(!x)return;c=x;const U=d.querySelector("#auth-dial-flag"),Q=d.querySelector("#auth-dial-code-val"),Y=d.querySelector("#auth-selected-dial-code");U&&(U.textContent=x.flag),Q&&(Q.textContent=x.code),Y&&(Y.value=x.code)}function w(x=""){const U=d.querySelector("#country-picker-list");if(!U)return;const Q=(x||"").toLowerCase().trim(),Y=ii.filter(F=>Q?F.name.toLowerCase().includes(Q)||F.code.includes(Q)||F.iso.toLowerCase().includes(Q):!0);if(Y.length===0){U.innerHTML=`<div class="country-picker-empty">No country found matching "${x}"</div>`;return}U.innerHTML=Y.map(F=>`
        <button type="button" class="country-picker-item ${F.code===c.code&&F.name===c.name?"selected":""}" data-country-name="${F.name}" data-country-code="${F.code}" data-country-flag="${F.flag}">
          <div class="country-picker-item-left">
            <span class="country-picker-item-flag">${F.flag}</span>
            <span class="country-picker-item-name">${F.name}</span>
          </div>
          <span class="country-picker-item-code">${F.code}</span>
        </button>
      `).join(""),U.querySelectorAll(".country-picker-item").forEach(F=>{F.onclick=G=>{G.preventDefault(),G.stopPropagation();const ue=F.dataset.countryName,pe=F.dataset.countryCode,he=F.dataset.countryFlag;y({name:ue,code:pe,flag:he}),P();const ce=d.querySelector("#auth-whatsapp");ce&&ce.focus()}})}function k(){const x=d.querySelector("#auth-country-picker-dropdown"),U=d.querySelector("#auth-dial-code-btn"),Q=d.querySelector("#country-picker-search");x&&U&&(x.style.display="flex",U.classList.add("active"),w(Q?Q.value:""),Q&&setTimeout(()=>Q.focus(),60))}function P(){const x=d.querySelector("#auth-country-picker-dropdown"),U=d.querySelector("#auth-dial-code-btn");x&&U&&(x.style.display="none",U.classList.remove("active"))}const D=d.querySelector("#auth-dial-code-btn");D&&(D.onclick=x=>{x.preventDefault(),x.stopPropagation();const U=d.querySelector("#auth-country-picker-dropdown");U&&U.style.display==="flex"?P():k()});const I=d.querySelector("#country-picker-search");I&&(I.oninput=()=>{w(I.value)},I.onclick=x=>x.stopPropagation());const E=d.querySelector("#auth-country");E&&(E.onchange=()=>{const x=E.value;if(l=x,x==="Global")k(),I&&(I.value="",w(""),I.focus());else{const U=fn(x);U&&y(U),P()}}),d.addEventListener("click",x=>{x.target.closest("#auth-dial-code-wrapper")||P()}),d.querySelectorAll("#tab-btn-signup, #switch-to-signup-link").forEach(x=>{x.onclick=U=>{U.preventDefault(),U.stopPropagation(),h("signup")}}),d.querySelectorAll("#tab-btn-signin, #switch-to-signin-link").forEach(x=>{x.onclick=U=>{U.preventDefault(),U.stopPropagation(),h("signin")}}),d.querySelectorAll(".password-toggle-btn").forEach(x=>{x.onclick=U=>{U.preventDefault(),U.stopPropagation();const Q=x.dataset.target,Y=d.querySelector(`#${Q}`);if(Y){const F=Y.type==="password";Y.type=F?"text":"password",x.style.color=F?"var(--accent-cyan)":"var(--text-muted)"}}});const K=d.querySelector("#auth-main-form"),O=d.querySelector("#auth-submit-btn"),q=d.querySelector("#auth-error-banner");function S(x){q&&(q.textContent=x,q.style.display="block")}const j=async x=>{x&&(x.preventDefault(),x.stopPropagation()),q&&(q.style.display="none");const U=d.querySelector("#auth-email"),Q=d.querySelector("#auth-password"),Y=U?U.value.trim():"",F=Q?Q.value:"";if(!Y){S(g("auth.requiredError")||"Please fill in your credentials.");return}if(!F){S(g("auth.requiredError")||"Please enter your password.");return}if(i==="signup"){const G=d.querySelector("#auth-fullname"),ue=d.querySelector("#auth-country"),pe=d.querySelector("#auth-selected-dial-code"),he=d.querySelector("#auth-whatsapp"),ce=d.querySelector("#auth-confirm-password"),Ce=G?G.value.trim():"VIP Member",Ae=ue?ue.value:l||"Pakistan",ve=pe?pe.value.trim():(c==null?void 0:c.code)||"+92",Be=he?he.value.trim():"",be=ce?ce.value:"";if(!Ce){S(g("auth.requiredError")||"Please enter your full name.");return}if(F!==be){S(g("auth.passwordsMismatch")||"Passwords do not match.");return}if(F.length<6){S(g("auth.minLengthError")||"Password must be at least 6 characters.");return}let fe=Be.replace(/\s+/g,""),Ie="";fe?fe.startsWith(ve)||fe.startsWith("+")?Ie=fe:fe.startsWith("0")?Ie=`${ve} ${fe.substring(1)}`:Ie=`${ve} ${fe}`:Ie="",O&&(O.innerHTML=`<span>${g("auth.creatingAccount")||"Creating account..."}</span>`,O.disabled=!0);try{const b=await H.signUp({fullName:Ce,email:Y,whatsappNumber:Ie,password:F,country:Ae});if(b!=null&&b.needsConfirmation){_("Account registered in Supabase! You can now sign in.","success"),h("signin");const $=d.querySelector("#auth-email");$&&($.value=Y),S("Account created in Supabase! Please enter your password to sign in (or verify your email if required).");return}_(`${g("auth.welcomeToast")||"Welcome"}, ${Ce}!`,"success"),ar(),typeof n=="function"&&n(b)}catch(b){S(b.message||"Failed to create account. Please try again."),O&&(O.innerHTML=`<span>${g("auth.btnCreateAccount")||"✦ Create Account"}</span>`,O.disabled=!1)}}else{O&&(O.innerHTML=`<span>${g("auth.signingIn")||"Signing in..."}</span>`,O.disabled=!0);try{const G=await H.signIn({email:Y,password:F});_(g("auth.signedInToast")||"Signed in successfully!","success"),ar(),typeof n=="function"&&n(G)}catch(G){S(G.message||"Invalid email or password."),O&&(O.innerHTML=`<span>${g("auth.btnSignIn")||"→ Sign In"}</span>`,O.disabled=!1)}}};K&&(K.onsubmit=j)}function f(){d.innerHTML=u(),m()}d.onclick=ar,t.appendChild(d),f()}let Nr=!1;function ni(){if(Nr)return;Nr=!0;const r=document.getElementById("modal-root")||document.body,e=H.currentUser,t=H.currentProfile||{};if(!e)return;const i=H.isAdmin(e,t),n=document.createElement("div");n.className="modal-backdrop auth-backdrop-fade",n.id="account-modal-backdrop";const a=e.created_at?new Date(e.created_at).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"}):"Active Member";n.innerHTML=`
    <div class="auth-modal-card" style="max-width: 480px;" onclick="event.stopPropagation();">
      <!-- Close Button -->
      <button id="account-modal-close" class="auth-close-btn">&times;</button>

      <!-- Profile Header -->
      <div style="text-align: center; margin-bottom: 1.75rem;">
        <div style="width: 68px; height: 68px; border-radius: 50%; background: ${i?"linear-gradient(135deg, #0284c7 0%, #6366f1 100%)":"linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)"}; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 0 0 25px ${i?"rgba(56, 189, 248, 0.4)":"rgba(99, 102, 241, 0.4)"}; font-size: 1.6rem; font-weight: 800; color: #ffffff; border: 2px solid ${i?"rgba(56, 189, 248, 0.6)":"rgba(255, 255, 255, 0.2)"};">
          ${(t.full_name||e.email||"U").charAt(0).toUpperCase()}
        </div>
        <h3 style="font-size: 1.45rem; color: var(--text-pure); font-weight: 800;">${t.full_name||"VIP Member"}</h3>
        <p style="font-size: 0.85rem; color: ${i?"#38bdf8":"var(--accent-mint)"}; margin-top: 0.25rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
          ${i?`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
            </svg>
            Verified Administrator
          `:g("account.verified")}
        </p>
      </div>

      <!-- Account Details Grid -->
      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.75rem;">
        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${g("account.emailLabel")}</span>
          <span style="font-size: 0.88rem; color: var(--text-pure); font-weight: 600;">${e.email}</span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${g("account.whatsappLabel")}</span>
          <span style="font-size: 0.88rem; color: var(--text-pure); font-weight: 600;">${t.whatsapp_number||"Not provided"}</span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Country / Geo Pricing</span>
          <span style="font-size: 0.88rem; color: var(--accent-cyan); font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
            <span>${Ze(t.country||H.getUserCountry())}</span>
            <span>${t.country||H.getUserCountry()||"Pakistan"}</span>
          </span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Account Role</span>
          <span style="font-size: 0.82rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 999px; ${i?"background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);":"background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);"}">
            ${i?"Administrator":"VIP Member"}
          </span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${g("account.memberSince")}</span>
          <span style="font-size: 0.88rem; color: var(--text-secondary);">${a}</span>
        </div>
      </div>

      <!-- Admin Direct Link (Exclusively for Admins) -->
      ${i?`
        <a href="#/admin" id="account-admin-btn" class="btn btn-primary" style="width: 100%; padding: 0.85rem; justify-content: center; gap: 0.6rem; text-decoration: none; margin-bottom: 0.75rem; background: linear-gradient(135deg, #0284c7, #6366f1); border: none; font-weight: 700; box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Open Admin Management Panel</span>
        </a>
      `:""}

      <!-- Logout Action -->
      <button id="account-logout-btn" class="btn btn-secondary" style="width: 100%; padding: 0.8rem; border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
        <span>${g("account.signOutBtn")}</span>
      </button>
    </div>
  `;const s=()=>{Nr=!1,n.remove()};n.onclick=s,n.querySelector("#account-modal-close").onclick=s;const o=n.querySelector("#account-admin-btn");o&&(o.onclick=()=>{s()}),n.querySelector("#account-logout-btn").onclick=async()=>{await H.signOut(),_("Signed out successfully.","info"),s()},r.appendChild(n)}let yr=!1,Bt="";function vn(r="nav"){const e=hi(),t=Wt(e)||{flag:"🌐",code:e.toUpperCase(),nativeName:"English"};return`
    <div class="lang-selector-wrapper" id="${r}-lang-selector-wrapper">
      <button 
        type="button" 
        class="lang-selector-btn" 
        id="${r}-lang-selector-btn"
        aria-haspopup="dialog"
        aria-expanded="false"
        title="${g("nav.selectLanguage")}: ${t.nativeName} (${t.name})"
      >
        <span class="lang-btn-flag">${t.flag}</span>
        <span class="lang-btn-code">${t.code.toUpperCase()}</span>
        <svg class="lang-btn-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  `}function ra(){let r=document.getElementById("lang-selector-modal");if(r)return r;r=document.createElement("div"),r.id="lang-selector-modal",r.className="lang-modal-overlay",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.style.display="none",r.innerHTML=`
    <div class="lang-modal-backdrop" id="lang-modal-backdrop"></div>
    <div class="lang-modal-card glass glow-sm">
      <div class="lang-modal-header">
        <div class="lang-modal-title-wrap">
          <div class="lang-globe-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <div>
            <h3 class="lang-modal-title" id="lang-modal-heading">${g("nav.selectLanguage")}</h3>
            <p class="lang-modal-sub">Choose your preferred language / اپنی زبان منتخب کریں</p>
          </div>
        </div>
        <button type="button" class="lang-modal-close" id="lang-modal-close-btn" aria-label="Close Language Selector">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="lang-search-box">
        <svg class="lang-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="lang-filter-input" 
          class="lang-filter-input" 
          placeholder="Search 47+ languages (e.g. Urdu, Arabic, Spanish, हिन्दी)..."
          autocomplete="off"
        />
        <button type="button" id="lang-filter-clear" class="lang-filter-clear" style="display:none;" aria-label="Clear search">×</button>
      </div>

      <div class="lang-list-container" id="lang-list-container">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `,document.body.appendChild(r);const e=r.querySelector("#lang-modal-backdrop"),t=r.querySelector("#lang-modal-close-btn"),i=r.querySelector("#lang-filter-input"),n=r.querySelector("#lang-filter-clear");return e.addEventListener("click",lr),t.addEventListener("click",lr),i.addEventListener("input",a=>{Bt=a.target.value.toLowerCase().trim(),n.style.display=Bt?"block":"none",ai()}),n.addEventListener("click",()=>{i.value="",Bt="",n.style.display="none",ai(),i.focus()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&yr&&lr()}),r}function ai(){const r=document.getElementById("lang-list-container");if(!r)return;const e=hi(),t=Bt,i=Rt.filter(n=>t?n.name.toLowerCase().includes(t)||n.nativeName.toLowerCase().includes(t)||n.code.toLowerCase().includes(t):!0);if(i.length===0){r.innerHTML=`
      <div class="lang-empty-state">
        <p>No languages found matching "${t}"</p>
      </div>
    `;return}r.innerHTML=i.map(n=>{const a=n.code.toLowerCase()===e.toLowerCase(),s=n.dir==="rtl";return`
      <button 
        type="button" 
        class="lang-option-btn ${a?"active":""}" 
        data-lang-code="${n.code}"
        title="${n.nativeName} (${n.name})"
      >
        <span class="lang-option-flag">${n.flag}</span>
        <div class="lang-option-info">
          <div class="lang-option-native ${s?"rtl-text":""}">${n.nativeName}</div>
          <div class="lang-option-english">${n.name} ${s?'<span class="lang-rtl-tag">RTL</span>':""}</div>
        </div>
        <div class="lang-option-meta">
          <span class="lang-option-code">${n.code.toUpperCase()}</span>
          ${a?`
            <span class="lang-option-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          `:""}
        </div>
      </button>
    `}).join(""),r.querySelectorAll(".lang-option-btn").forEach(n=>{n.addEventListener("click",async()=>{const a=n.dataset.langCode;await Hl(a)})})}async function Hl(r){await ql(r),ia(),lr()}function ia(){const r=hi(),e=Wt(r)||{flag:"🌐",code:r.toUpperCase(),nativeName:"English"};document.querySelectorAll(".lang-selector-btn").forEach(t=>{const i=t.querySelector(".lang-btn-flag"),n=t.querySelector(".lang-btn-code");i&&(i.textContent=e.flag),n&&(n.textContent=e.code.toUpperCase()),t.setAttribute("title",`${g("nav.selectLanguage")}: ${e.nativeName} (${e.name})`)})}function Fl(){const r=ra();yr=!0,r.style.display="flex",document.body.classList.add("lang-modal-open");const e=r.querySelector("#lang-filter-input");if(e){e.value="",Bt="";const t=r.querySelector("#lang-filter-clear");t&&(t.style.display="none")}ai(),setTimeout(()=>{r.classList.add("is-active"),e&&e.focus()},10)}function lr(){const r=document.getElementById("lang-selector-modal");r&&(r.classList.remove("is-active"),yr=!1,document.body.classList.remove("lang-modal-open"),setTimeout(()=>{yr||(r.style.display="none")},200))}function Wl(r=document){ra(),r.querySelectorAll(".lang-selector-btn").forEach(e=>{e.dataset.initialized||(e.dataset.initialized="true",e.addEventListener("click",t=>{t.stopPropagation(),Fl()}))}),Zn(()=>{ia()})}function yn(r="nav"){const e=H.getUserCountry()||"Pakistan",t=Ze(e),i=e==="Pakistan"?"PKR":e==="India"?"INR":e==="United Arab Emirates"?"AED":e==="Saudi Arabia"?"SAR":e==="United Kingdom"?"GBP":"USD";return H.isAdmin()?`
    <div class="nav-country-wrapper" id="${r}-country-wrapper" style="position: relative; display: inline-block;">
      <button type="button" class="nav-country-btn" id="${r}-country-btn" title="Admin View Pricing For: ${e} (${i})">
        <span>${t}</span>
        <span style="font-weight: 700; font-size: 0.75rem;">${i}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <div class="nav-country-dropdown" id="${r}-country-dropdown" style="display: none;">
        <div style="font-size: 0.68rem; color: var(--accent-cyan); padding: 0.35rem 0.65rem; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid var(--border-glass); margin-bottom: 0.25rem; display: flex; align-items: center; justify-content: space-between;">
          <span>View Pricing For:</span>
          <span style="font-size: 0.6rem; background: rgba(56,189,248,0.2); padding: 0.05rem 0.35rem; border-radius: 4px; color: #38bdf8;">Admin</span>
        </div>
        <button type="button" class="nav-country-option ${e==="Pakistan"?"active":""}" data-country="Pakistan">
          <span>🇵🇰</span>
          <span>Pakistan (PKR)</span>
        </button>
        <button type="button" class="nav-country-option ${e==="India"?"active":""}" data-country="India">
          <span>🇮🇳</span>
          <span>India (INR)</span>
        </button>
        <button type="button" class="nav-country-option ${e==="United Arab Emirates"?"active":""}" data-country="United Arab Emirates">
          <span>🇦🇪</span>
          <span>UAE (AED)</span>
        </button>
        <button type="button" class="nav-country-option ${e==="Saudi Arabia"?"active":""}" data-country="Saudi Arabia">
          <span>🇸🇦</span>
          <span>Saudi Arabia (SAR)</span>
        </button>
        <button type="button" class="nav-country-option ${e==="United States"?"active":""}" data-country="United States">
          <span>🇺🇸</span>
          <span>United States (USD)</span>
        </button>
        <button type="button" class="nav-country-option ${e==="United Kingdom"?"active":""}" data-country="United Kingdom">
          <span>🇬🇧</span>
          <span>United Kingdom (GBP)</span>
        </button>
        <button type="button" class="nav-country-option ${e==="Global"||e==="Other"?"active":""}" data-country="Global">
          <span>🌐</span>
          <span>Global / Others (USD)</span>
        </button>
      </div>
    </div>
  `:`
      <div class="nav-country-wrapper" id="${r}-country-wrapper" style="position: relative; display: inline-block;">
        <div class="nav-country-btn" id="${r}-country-btn" style="cursor: default; opacity: 0.95; padding: 0.4rem 0.65rem;" title="Your Region: ${e} (${i})">
          <span>${t}</span>
          <span style="font-weight: 700; font-size: 0.75rem;">${i}</span>
        </div>
      </div>
    `}function br(r,e,t=!1){var i,n;if(r){const a=(e==null?void 0:e.full_name)||((i=r.user_metadata)==null?void 0:i.full_name)||((n=r.email)==null?void 0:n.split("@")[0])||"VIP Member",s=a.charAt(0).toUpperCase(),o=H.isAdmin(r,e);return t?`
        <div class="mobile-auth-user-box" style="display: flex; flex-direction: column; gap: 0.85rem; padding: 0.5rem 0;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="nav-profile-avatar" style="width: 42px; height: 42px; font-size: 1.05rem; ${o?"border-color: var(--accent-cyan); box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);":""}">
              ${s}
              <span class="avatar-status-dot" style="${o?"background: #38bdf8;":""}"></span>
            </div>
            <div style="display: flex; flex-direction: column; overflow: hidden;">
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <span style="font-weight: 700; color: var(--text-pure); font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${a}</span>
                ${o?'<span class="badge badge-popular" style="font-size: 0.65rem; padding: 0.1rem 0.4rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">Admin</span>':""}
              </div>
              <span style="font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${r.email||""}</span>
            </div>
          </div>

          ${o?`
            <a href="#/admin" class="mobile-auth-admin" style="display: flex; align-items: center; justify-content: center; gap: 0.65rem; padding: 0.75rem; border-radius: 12px; background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.2)); border: 1px solid rgba(56, 189, 248, 0.4); color: var(--accent-cyan); font-weight: 700; font-size: 0.9rem; text-decoration: none; box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>${g("nav.adminPanel")||"Admin Panel"}</span>
              <span style="background: rgba(56, 189, 248, 0.25); color: #38bdf8; font-size: 0.68rem; padding: 0.1rem 0.45rem; border-radius: 999px; font-weight: 800;">ADMIN</span>
            </a>
          `:""}

          <div style="display: flex; gap: 0.6rem;">
            <button type="button" class="btn-nav-account mobile-auth-account" style="flex: 1; justify-content: center; padding: 0.65rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>${g("nav.account")}</span>
            </button>
            <button type="button" class="btn-nav-logout mobile-auth-logout" style="flex: 1; justify-content: center; padding: 0.65rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>${g("nav.logout")}</span>
            </button>
          </div>
        </div>
      `:`
      <div class="nav-profile-dropdown-wrapper" id="nav-profile-dropdown-wrapper">
        <button type="button" class="btn-nav-profile-trigger ${o?"admin-active":""}" id="nav-profile-btn" aria-haspopup="true" aria-expanded="false" title="${a} ${o?"(Administrator)":""}">
          <div class="nav-profile-avatar" style="${o?"border-color: var(--accent-cyan); box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);":""}">
            ${s}
            <span class="avatar-status-dot" style="${o?"background: #38bdf8;":""}"></span>
          </div>
          <span class="nav-profile-name">${a.split(" ")[0]}</span>
          ${o?'<span class="badge badge-popular" style="font-size: 0.65rem; padding: 0.08rem 0.38rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">Admin</span>':""}
          <svg class="nav-profile-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div class="nav-profile-dropdown-menu" id="nav-profile-menu" style="display: none;">
          <div class="nav-profile-menu-header">
            <div class="nav-profile-menu-avatar" style="${o?"background: linear-gradient(135deg, #0ea5e9, #6366f1);":""}">${s}</div>
            <div class="nav-profile-menu-meta">
              <span class="nav-profile-menu-fullname">${a}</span>
              <span class="nav-profile-menu-email">${r.email||""}</span>
              <span class="nav-profile-badge" style="${o?"background: rgba(56, 189, 248, 0.18); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);":""}">
                ${o?`
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                  </svg>
                  ${g("nav.administrator")||"Administrator"}
                `:`
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z" />
                  </svg>
                  VIP Member
                `}
              </span>
            </div>
          </div>
          <div class="nav-profile-divider"></div>
          <div class="nav-profile-menu-list">
            ${o?`
              <a href="#/admin" class="nav-profile-menu-item admin" id="nav-profile-item-admin" style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-weight: 700;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                <span>${g("nav.adminPanel")||"Admin Panel"}</span>
                <span class="badge badge-popular" style="margin-left: auto; font-size: 0.65rem; padding: 0.15rem 0.5rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">ADMIN</span>
              </a>
            `:""}
            <button type="button" class="nav-profile-menu-item" id="nav-profile-item-account">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>${g("nav.account")}</span>
            </button>
            <button type="button" class="nav-profile-menu-item logout" id="nav-profile-item-logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>${g("nav.logout")}</span>
            </button>
          </div>
        </div>
      </div>
    `}return t?`
      <div style="display: flex; flex-direction: column;">
        <button type="button" class="btn-nav-signin mobile-auth-signin" id="mobile-nav-signin-btn" data-action="signin" title="${g("nav.signIn")}" style="width: 100%; justify-content: center; padding: 0.75rem 1.25rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          <span>${g("nav.signIn")}</span>
        </button>
      </div>
    `:`
    <button type="button" class="btn-nav-signin" id="nav-signin-btn" data-action="signin" title="${g("nav.signIn")}">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      <span>${g("nav.signIn")}</span>
    </button>
  `}function lt(r=!1){const e=document.getElementById("nav-profile-menu"),t=document.getElementById("nav-profile-btn");e&&(r||e.style.display==="block"?(e.style.display="none",t&&(t.classList.remove("active"),t.setAttribute("aria-expanded","false"))):(e.style.display="block",t&&(t.classList.add("active"),t.setAttribute("aria-expanded","true"))))}function xe(r="/"){const e=r==="/"||r==="",t=r==="/tools",i=r==="/deals",n=r==="/upcoming",a=r==="/categories",s=r==="/about",o=r==="/contact",l=r==="/policy",c=Ee,d=H.currentUser,u=H.currentProfile;return`
    <header class="navbar">
      <div class="container navbar-container">
        <!-- Brand Logo -->
        <a href="#/" class="nav-brand">
          <div class="nav-brand-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z" />
            </svg>
          </div>
          <span>${g("nav.brand")}</span>
        </a>

        <!-- Desktop Navigation Links (Public: Admin removed) -->
        <nav class="nav-menu">
          <a href="#/" class="nav-link ${e?"active":""}">${g("nav.home")}</a>
          <a href="#/tools" class="nav-link ${t?"active":""}">${g("nav.allTools")}</a>
          <a href="#/deals" class="nav-link nav-link-hot-deals ${i?"active":""}" style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 0.95rem; filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.7));">🔥</span>
            <span>${g("nav.hotDeals")||"Hot Deals"}</span>
            <span class="nav-hot-pill" style="font-size: 0.62rem; padding: 0.08rem 0.38rem; background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; border-radius: 999px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; box-shadow: 0 0 10px rgba(239, 68, 68, 0.45);">OFFER</span>
          </a>
          <a href="#/upcoming" class="nav-link nav-link-upcoming ${n?"active":""}" style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 0.95rem; filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.7));">🚀</span>
            <span>${g("nav.upcoming")||"Upcoming"}</span>
            <span class="nav-upcoming-pill" style="font-size: 0.62rem; padding: 0.08rem 0.38rem; background: linear-gradient(135deg, #0284c7, #38bdf8); color: #ffffff; border-radius: 999px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; box-shadow: 0 0 10px rgba(56, 189, 248, 0.45);">SOON</span>
          </a>
          <a href="#/categories" class="nav-link ${a?"active":""}">${g("nav.categories")}</a>
          <a href="#/about" class="nav-link ${s?"active":""}">${g("nav.about")}</a>
          <a href="#/contact" class="nav-link ${o?"active":""}">${g("nav.contact")}</a>
          <a href="#/policy" class="nav-link ${l?"active":""}">${g("nav.policy")}</a>
        </nav>

        <!-- Right Nav Actions -->
        <div class="nav-actions">
          <!-- Search, Country Selector & Language Selector: [ 🔍 ] [ 🇵🇰 PKR ▾ ] [ 🌐 EN ▾ ] -->
          <div class="nav-search-lang-group" id="nav-search-lang-group">
            <button id="nav-search-trigger" class="nav-search-btn" title="${g("nav.searchTitle")}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="kbd-shortcut">${g("nav.searchKbd")}</span>
            </button>
            ${yn("nav")}
            ${vn("nav")}
          </div>

          <!-- Dynamic Auth Slot (Single Sign In when logged out, Profile circle + dropdown when logged in) -->
          <div id="nav-auth-slot" class="nav-auth-slot">
            ${br(d,u,!1)}
          </div>

          <!-- WhatsApp Community Button -->
          <a href="${c}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
            </svg>
            <span>${g("nav.joinWhatsApp")}</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button id="mobile-menu-toggle" class="mobile-toggle-btn" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer (Public: Admin removed) -->
      <div id="mobile-nav-drawer" class="mobile-nav-drawer" style="display: none;">
        <div class="mobile-nav-links">
          <a href="#/" class="mobile-nav-link ${e?"active":""}">${g("nav.home")}</a>
          <a href="#/tools" class="mobile-nav-link ${t?"active":""}">${g("nav.allTools")}</a>
          <a href="#/deals" class="mobile-nav-link ${i?"active":""}" style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>🔥</span>
              <span style="font-weight: 700; color: #fb923c;">${g("nav.hotDeals")||"Hot Deals"}</span>
            </div>
            <span style="font-size: 0.65rem; padding: 0.12rem 0.5rem; background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; border-radius: 999px; font-weight: 800;">BUY 1 GET 1</span>
          </a>
          <a href="#/upcoming" class="mobile-nav-link ${n?"active":""}" style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>🚀</span>
              <span style="font-weight: 700; color: #38bdf8;">${g("nav.upcoming")||"Upcoming Tools"}</span>
            </div>
            <span style="font-size: 0.65rem; padding: 0.12rem 0.5rem; background: linear-gradient(135deg, #0284c7, #38bdf8); color: #ffffff; border-radius: 999px; font-weight: 800;">SOON</span>
          </a>
          <a href="#/categories" class="mobile-nav-link ${a?"active":""}">${g("nav.categories")}</a>
          <a href="#/about" class="mobile-nav-link ${s?"active":""}">${g("nav.about")}</a>
          <a href="#/contact" class="mobile-nav-link ${o?"active":""}">${g("nav.contact")}</a>
          <a href="#/policy" class="mobile-nav-link ${l?"active":""}">${g("nav.policy")}</a>

          <div class="mobile-country-wrap" style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-secondary);">Country Pricing:</span>
            ${yn("mobile-nav")}
          </div>

          <div class="mobile-lang-wrap" style="margin-top: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-secondary);">${g("nav.selectLanguage")}:</span>
            ${vn("mobile-nav")}
          </div>

          <div id="mobile-nav-auth-slot" class="mobile-nav-auth-slot" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-glass);">
            ${br(d,u,!0)}
          </div>
        </div>
      </div>
    </header>
  `}function sr(r){if(!r)return;r.querySelectorAll("#nav-signin-btn, #mobile-nav-signin-btn, .mobile-auth-signin").forEach(a=>{a.onclick=s=>{s.preventDefault(),Er({defaultTab:"signin"})}});const e=r.querySelector("#nav-profile-btn");e&&(e.onclick=a=>{a.preventDefault(),a.stopPropagation(),lt()});const t=r.querySelector("#nav-profile-item-admin");t&&(t.onclick=()=>{lt(!0)}),r.querySelectorAll(".mobile-auth-admin").forEach(a=>{a.onclick=()=>{const s=document.getElementById("mobile-nav-drawer");s&&(s.style.display="none")}});const i=r.querySelector("#nav-profile-item-account");i&&(i.onclick=a=>{a.preventDefault(),lt(!0),ni()});const n=r.querySelector("#nav-profile-item-logout");n&&(n.onclick=async a=>{a.preventDefault(),lt(!0);try{await H.signOut(),_("Signed out successfully.","info")}catch(s){console.error("Error signing out:",s)}}),r.querySelectorAll(".mobile-auth-account").forEach(a=>{a.onclick=s=>{s.preventDefault(),ni()}}),r.querySelectorAll(".mobile-auth-logout").forEach(a=>{a.onclick=async s=>{s.preventDefault();try{await H.signOut(),_("Signed out successfully.","info")}catch(o){console.error("Error signing out:",o)}}})}typeof window<"u"&&!window.__authEventsDelegated&&(window.__authEventsDelegated=!0,document.addEventListener("click",r=>{r.target.closest(".nav-country-wrapper")||document.querySelectorAll(".nav-country-dropdown").forEach(s=>s.style.display="none");const e=document.getElementById("nav-profile-dropdown-wrapper");if(e&&!e.contains(r.target)&&lt(!0),r.target.closest('#nav-signin-btn, #mobile-nav-signin-btn, .btn-nav-signin, [data-action="signin"]')){r.preventDefault(),Er({defaultTab:"signin"});return}if(r.target.closest('#nav-account-btn, .mobile-auth-account, [data-action="account"]')){r.preventDefault(),ni();return}if(r.target.closest('#nav-logout-btn, .mobile-auth-logout, [data-action="logout"]')){r.preventDefault(),H.signOut().then(()=>{_("Signed out successfully.","info")});return}if(r.target.closest("#nav-profile-item-admin, .mobile-auth-admin")){lt(!0);const s=document.getElementById("mobile-nav-drawer");s&&(s.style.display="none")}}),document.addEventListener("keydown",r=>{r.key==="Escape"&&lt(!0)}));function Se(){Wl(document),["nav","mobile-nav"].forEach(a=>{const s=document.getElementById(`${a}-country-btn`),o=document.getElementById(`${a}-country-dropdown`);s&&o&&(s.onclick=l=>{l.preventDefault(),l.stopPropagation();const c=o.style.display==="flex";document.querySelectorAll(".nav-country-dropdown").forEach(d=>d.style.display="none"),o.style.display=c?"none":"flex"},o.querySelectorAll(".nav-country-option").forEach(l=>{l.onclick=c=>{c.preventDefault(),c.stopPropagation();const d=l.dataset.country;o.style.display="none",H.setUserCountry(d),_(`Store pricing switched to ${d}`,"info")}}))});const r=document.getElementById("nav-search-trigger");r&&(r.onclick=()=>gn());const e=document.getElementById("mobile-menu-toggle"),t=document.getElementById("mobile-nav-drawer");e&&t&&(e.onclick=a=>{a.stopPropagation();const s=t.style.display==="block";t.style.display=s?"none":"block",e.classList.toggle("active",!s)},t.querySelectorAll("a, button:not(#mobile-nav-country-btn):not(#mobile-nav-lang-btn)").forEach(a=>{a.addEventListener("click",()=>{t.style.display="none",e.classList.remove("active")})}),document.addEventListener("click",a=>{t.style.display==="block"&&!t.contains(a.target)&&!e.contains(a.target)&&(t.style.display="none",e.classList.remove("active"))}));const i=document.getElementById("nav-auth-slot"),n=document.getElementById("mobile-nav-auth-slot");sr(i),sr(n),H.subscribe(({user:a,profile:s})=>{const o=document.getElementById("nav-auth-slot"),l=document.getElementById("mobile-nav-auth-slot");o&&(o.innerHTML=br(a,s,!1),sr(o)),l&&(l.innerHTML=br(a,s,!0),sr(l))}),window.onkeydown=a=>{(a.metaKey||a.ctrlKey)&&a.key.toLowerCase()==="k"&&(a.preventDefault(),gn())}}const zr=[{id:"gemini",name:"Gemini",category:"Multimodal AI",ring:1,position:"top",color:"#4285f4",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4285f4"/>
            <stop offset="50%" stop-color="#9b72cf"/>
            <stop offset="100%" stop-color="#d96570"/>
          </linearGradient>
        </defs>
        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="url(#geminiGrad)"/>
      </svg>
    `},{id:"lovable",name:"Lovable",category:"AI App Builder",ring:1,position:"right",color:"#ff3366",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff3366">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `},{id:"antigravity",name:"Antigravity",category:"Agentic AI",ring:1,position:"bottom",color:"#38bdf8",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#38bdf8" stroke-width="1.8"/>
        <polygon points="12,4 14.5,9.5 20,12 14.5,14.5 12,20 9.5,14.5 4,12 9.5,9.5" fill="#38bdf8"/>
      </svg>
    `},{id:"notion",name:"Notion",category:"AI Workspace",ring:1,position:"left",color:"#ffffff",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#ffffff"/>
        <path d="M7 6l8 12V6h2v12h-2L7 6z" fill="#0f172a"/>
      </svg>
    `},{id:"replit",name:"Replit",category:"AI Coding IDE",ring:2,position:"top",color:"#ff6b00",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6H12V10H4V6Z" fill="#ff6b00"/>
        <path d="M12 10H20V14H12V10Z" fill="#ff9248"/>
        <path d="M4 14H12V18H4V14Z" fill="#ff6b00"/>
      </svg>
    `},{id:"n8n",name:"n8n",category:"AI Automation",ring:2,position:"right",color:"#ff6d5a",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6d5a" stroke-width="2.5" stroke-linecap="round">
        <circle cx="5" cy="12" r="3" fill="#ff6d5a"/>
        <circle cx="19" cy="6" r="3" fill="#ff6d5a"/>
        <circle cx="19" cy="18" r="3" fill="#ff6d5a"/>
        <path d="M8 12h5l3-6m-3 6l3 6"/>
      </svg>
    `},{id:"make",name:"Make.com",category:"Visual Workflows",ring:2,position:"bottom",color:"#a855f7",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 12c0-3.3 2.7-6 6-6 2.5 0 4.6 1.5 5.5 3.7L12 12l3.5 2.3C14.6 16.5 12.5 18 10 18c-3.3 0-6-2.7-6-6z" fill="#818cf8"/>
        <path d="M20 12c0 3.3-2.7 6-6 6-2.5 0-4.6-1.5-5.5-3.7L12 12l-3.5-2.3C9.4 7.5 11.5 6 14 6c3.3 0 6 2.7 6 6z" fill="#c084fc"/>
      </svg>
    `},{id:"kiro",name:"Kiro",category:"Intelligent AI",ring:2,position:"left",color:"#10b981",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 22,12 12,22 2,12" stroke="#10b981" stroke-width="2" fill="rgba(16,185,129,0.2)"/>
        <circle cx="12" cy="12" r="3.5" fill="#34d399"/>
      </svg>
    `},{id:"zapier",name:"Zapier",category:"Integrations",ring:3,position:"top",color:"#ff4a00",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff4a00" stroke-width="3" stroke-linecap="round">
        <line x1="12" y1="3" x2="12" y2="21"/>
        <line x1="4.22" y1="7.5" x2="19.78" y2="16.5"/>
        <line x1="4.22" y1="16.5" x2="19.78" y2="7.5"/>
      </svg>
    `},{id:"capcut",name:"CapCut",category:"AI Video Editor",ring:3,position:"right",color:"#00f2fe",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <polygon points="4,5 12,11 4,17" fill="#00f2fe"/>
        <polygon points="20,5 12,11 20,17" fill="#ffffff"/>
        <circle cx="12" cy="11" r="2.5" fill="#38bdf8"/>
      </svg>
    `},{id:"chatgpt",name:"ChatGPT",category:"Flagship LLM",ring:3,position:"bottom",color:"#10a37f",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="2" stroke-linecap="round">
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10A10 10 0 0 1 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    `},{id:"midjourney",name:"Midjourney",category:"Generative Art",ring:3,position:"left",color:"#c084fc",logo:`
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 17l8 3 8-3-2-2H6l-2 2z" fill="#c084fc"/>
        <polygon points="12,4 12,15 19,15" fill="#a855f7"/>
        <polygon points="10,6 10,15 5,15" fill="#e879f9"/>
      </svg>
    `}];function Kl(){const r=zr.filter(i=>i.ring===1),e=zr.filter(i=>i.ring===2),t=zr.filter(i=>i.ring===3);return`
    <div class="hero-orb-stage" aria-label="AI Tools 3D Orbital Universe">
      <!-- Ambient Multi-Layer Radial Glow -->
      <div class="orb-ambient-glow orb-ambient-glow-1"></div>
      <div class="orb-ambient-glow orb-ambient-glow-2"></div>

      <!-- Center 3D Floating Assembly -->
      <div class="orb-floating-assembly">
        <!-- The Glowing 3D AI Orb Sphere Body -->
        <div class="ai-sphere-core">
          <!-- Inner Deep Rotating Plasma Mesh -->
          <div class="sphere-plasma-mesh"></div>
          <!-- Internal Caustic Luminous Glow Spot -->
          <div class="sphere-caustic-core"></div>
          <!-- Specular Light Highlights -->
          <div class="sphere-specular-spot"></div>
          <div class="sphere-specular-subspot"></div>
          <!-- Fresnel Outer Rim Light Ring -->
          <div class="sphere-rim-fresnel"></div>
        </div>

        <!-- Drifting Ambient Star Particles -->
        <div class="orb-star-dot star-dot-1"></div>
        <div class="orb-star-dot star-dot-2"></div>
        <div class="orb-star-dot star-dot-3"></div>
        <div class="orb-star-dot star-dot-4"></div>
        <div class="orb-star-dot star-dot-5"></div>
        <div class="orb-star-dot star-dot-6"></div>
      </div>

      <!-- ================================================================== -->
      <!-- 3 CONCENTRIC 3D REVOLVING ORBITAL TRACKS WITH AI TOOLS (Gool Gool) -->
      <!-- ================================================================== -->

      <!-- ORBIT RING 1: INNER RING (340px) - Clockwise Rotation (22s) -->
      <div class="hero-orbit-ring ring-inner" data-ring="1">
        <!-- SVG glowing circular track with wave particle -->
        <div class="orbit-visual-circle ring-circle-inner"></div>
        <div class="orbit-glow-tracer tracer-1"></div>

        ${r.map(i=>`
          <div class="orbit-tool-slot slot-${i.position}">
            <div class="orbit-tool-card tool-item-${i.id} counter-anim-cw" data-tool-name="${i.name}" style="--tool-glow: ${i.color};" title="Explore ${i.name}">
              <div class="orbit-tool-icon" style="box-shadow: 0 0 12px ${i.color}40;">
                ${i.logo}
              </div>
              <div class="orbit-tool-meta">
                <span class="orbit-tool-title">${i.name}</span>
                <span class="orbit-tool-subtitle">${i.category}</span>
              </div>
              <span class="orbit-tool-dot" style="background: ${i.color}; box-shadow: 0 0 8px ${i.color};"></span>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- ORBIT RING 2: MIDDLE RING (460px) - Counter-Clockwise Rotation (32s) -->
      <div class="hero-orbit-ring ring-middle" data-ring="2">
        <div class="orbit-visual-circle ring-circle-middle"></div>
        <div class="orbit-glow-tracer tracer-2"></div>

        ${e.map(i=>`
          <div class="orbit-tool-slot slot-${i.position}">
            <div class="orbit-tool-card tool-item-${i.id} counter-anim-ccw" data-tool-name="${i.name}" style="--tool-glow: ${i.color};" title="Explore ${i.name}">
              <div class="orbit-tool-icon" style="box-shadow: 0 0 12px ${i.color}40;">
                ${i.logo}
              </div>
              <div class="orbit-tool-meta">
                <span class="orbit-tool-title">${i.name}</span>
                <span class="orbit-tool-subtitle">${i.category}</span>
              </div>
              <span class="orbit-tool-dot" style="background: ${i.color}; box-shadow: 0 0 8px ${i.color};"></span>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- ORBIT RING 3: OUTER RING (580px) - Clockwise Rotation (44s) -->
      <div class="hero-orbit-ring ring-outer" data-ring="3">
        <div class="orbit-visual-circle ring-circle-outer"></div>
        <div class="orbit-glow-tracer tracer-3"></div>

        ${t.map(i=>`
          <div class="orbit-tool-slot slot-${i.position}">
            <div class="orbit-tool-card tool-item-${i.id} counter-anim-cw-outer" data-tool-name="${i.name}" style="--tool-glow: ${i.color};" title="Explore ${i.name}">
              <div class="orbit-tool-icon" style="box-shadow: 0 0 12px ${i.color}40;">
                ${i.logo}
              </div>
              <div class="orbit-tool-meta">
                <span class="orbit-tool-title">${i.name}</span>
                <span class="orbit-tool-subtitle">${i.category}</span>
              </div>
              <span class="orbit-tool-dot" style="background: ${i.color}; box-shadow: 0 0 8px ${i.color};"></span>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Quick Hint Overlay on Stage Hover -->
      <div class="orbit-hover-hint">
        <span>⚡ Hover to Pause Orbit • Click Any Tool to Explore</span>
      </div>
    </div>
  `}typeof window<"u"&&!window.__orbHeroEventsBound&&(window.__orbHeroEventsBound=!0,document.addEventListener("click",r=>{const e=r.target.closest(".orbit-tool-card");if(e){r.preventDefault();const t=e.dataset.toolName;t&&(window.location.hash=`#/tools?q=${encodeURIComponent(t)}`)}}));async function na(r,e={}){await H.getCurrentUser()?typeof r=="function"&&r():Er({defaultTab:e.defaultTab||"signup",onAuthenticated:()=>{typeof r=="function"&&r()}})}const aa="ai_tools_favorites_v1";function sa(){try{const r=localStorage.getItem(aa);return r?JSON.parse(r):[]}catch{return[]}}function Vl(r,e="Tool"){const t=sa(),i=t.indexOf(r);let n=!1;i>=0?(t.splice(i,1),_(g("card.removedFavToast")||"Removed from saved favorites","info")):(t.push(r),n=!0,_(g("card.addedFavToast")||"Added to your favorites!","success"));try{localStorage.setItem(aa,JSON.stringify(t))}catch(a){console.warn("Failed to save favorite:",a)}return document.querySelectorAll(`.btn-favorite[data-tool-id="${r}"]`).forEach(a=>{a.classList.toggle("active",n),a.setAttribute("aria-checked",String(n))}),n}function gi(r){const e=ta(r),t=pi(e.id,e.name),i=H.getUserCountry()||"Pakistan",n=Tr(e,i),a=n.discountedPrice,s=Yn(e.whatsappUrl,e.name,n.discountedPrice,i,n.originalPrice,n.discountPercent),o=sa().includes(e.id);let l=e.themeColor||"blue";if(!e.themeColor){const h=(e.category||"").toLowerCase();h.includes("writing")||h.includes("text")||e.id.includes("write")?l="purple":h.includes("image")||h.includes("artify")||h.includes("midjourney")?l="teal":l="blue"}const{amount:c,periodHtml:d}=Ar(a,`/${g("card.perMonth")||"month"}`),u=e.rating?e.rating.toFixed(1):"4.8",p=e.userCount||`${e.reviewCount?(e.reviewCount/10).toFixed(1):"12.4"}K`;return`
    <div class="futuristic-tool-card theme-${l} ${e.image?"has-media-banner":""}" data-tool-id="${e.id}">
      <!-- Dynamic Mouse-Tracking Glow Overlay -->
      <div class="card-mouse-glow"></div>

      <!-- Animated Abstract Mesh & Particles Background -->
      <div class="card-mesh-bg">
        <svg class="mesh-waves-svg" viewBox="0 0 400 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad-${e.id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${l==="purple"?"#a855f7":l==="teal"?"#10b981":"#3b82f6"}" stop-opacity="0.35"/>
              <stop offset="60%" stop-color="${l==="purple"?"#6366f1":l==="teal"?"#06b6d4":"#60a5fa"}" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path class="mesh-path mesh-path-1" fill="url(#waveGrad-${e.id})" d="M0,80 Q100,140 200,80 T400,90 L400,240 L0,240 Z" />
          <path class="mesh-path mesh-path-2" fill="url(#waveGrad-${e.id})" d="M0,110 Q120,50 240,110 T400,100 L400,240 L0,240 Z" />
        </svg>
        <div class="card-particles-layer"></div>
      </div>

      <!-- Card Top: Media Banner OR Logo Container & Favorite Button -->
      ${e.image?`
        <div class="card-media-banner-container">
          <div class="card-media-banner">
            <img src="${e.image}" alt="${e.name}" class="card-media-ambient" aria-hidden="true" onerror="this.style.display='none';" />
            <img src="${e.image}" alt="${e.name} banner" class="card-media-img" loading="lazy" onerror="this.style.opacity='0.3';" />
            <div class="card-media-gradient"></div>
          </div>
          <button 
            class="btn-favorite btn-favorite-floating ${o?"active":""}" 
            data-tool-id="${e.id}" 
            data-tool-name="${e.name}"
            title="${g("card.saveFav")}"
            aria-label="${g("card.saveFav")}"
          >
            <svg class="heart-icon" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      `:`
        <div class="card-header-row">
          <div class="card-logo-box">
            <div class="logo-inner-icon">
              ${t}
            </div>
          </div>

          <button 
            class="btn-favorite ${o?"active":""}" 
            data-tool-id="${e.id}" 
            data-tool-name="${e.name}"
            title="${g("card.saveFav")}"
            aria-label="${g("card.saveFav")}"
          >
            <svg class="heart-icon" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      `}

      <!-- Category Pill Badge & Optional Discount Badge -->
      <div class="card-badge-row" style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
        <span class="card-category-pill">${e.category}</span>
        ${n.hasDiscount?`
          <span class="badge" style="background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; font-weight: 800; font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 999px; box-shadow: 0 0 12px rgba(239, 68, 68, 0.5); letter-spacing: 0.03em;">
            🔥 ${n.discountPercent}% OFF
          </span>
        `:""}
      </div>

      <!-- Tool Title & Description (Bullet Points Supported) -->
      <div class="card-body-content">
        <h3 class="card-tool-name">${e.name}</h3>
        <div class="card-tool-desc">
          ${ti(e.shortDescription||e.description||"",{isCard:!0,maxPoints:3})}
        </div>
      </div>

      <!-- Rating & User Stats Row -->
      <div class="card-stats-row">
        <div class="rating-item" title="${g("card.rating")}: ${u}">
          <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span class="rating-val">${u}</span>
        </div>
        <span class="stat-separator">•</span>
        <div class="users-item">
          <svg class="users-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span class="users-val">${p} ${g("card.users")}</span>
        </div>
      </div>

      <!-- Price & Primary Buy Now Row (Side-by-Side with Clean Adjusted Layout) -->
      <div class="card-price-buy-row">
        <div class="card-price-block">
          ${n.hasDiscount?`
            <div class="card-price-strike-row">
              <span class="card-price-original">${n.originalAmount}</span>
              <span class="card-price-discount-pill">-${n.discountPercent}%</span>
            </div>
          `:""}
          <div class="card-price-main-row">
            <span class="price-currency ${n.hasDiscount?"has-discount":""}">${n.discountedAmount}</span>
            ${n.periodHtml?`<span class="price-period-wrap">${n.periodHtml}</span>`:""}
            <span class="price-country-badge" title="Live rate for ${i}">${Ze(i)}</span>
          </div>
        </div>

        <a 
          href="${s}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-card-buy-primary"
          data-buy-url="${s}"
          data-tool-id="${e.id}"
          data-tool-name="${e.name}"
          data-tool-price="${a}"
          data-user-country="${i}"
          title="${g("card.buyNow")}: ${e.name}"
        >
          <svg class="btn-bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>${g("card.buyNow")}</span>
        </a>
      </div>

      <!-- Secondary Actions Row: How to Use & View Details -->
      <div class="card-secondary-actions-row">
        <a 
          href="#/tool/${e.id}?section=how-to-use" 
          class="btn-sub-card btn-how-to-use" 
          data-tool-id="${e.id}"
          title="${g("card.howToUse")}: ${e.name}"
        >
          <svg class="btn-sub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
          </svg>
          <span>${g("card.howToUse")}</span>
        </a>

        <a href="#/tool/${e.id}" class="btn-sub-card btn-view-details" title="${g("card.viewDetails")}: ${e.name}">
          <span>${g("card.viewDetails")}</span>
          <svg class="btn-sub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </div>
  `}function oa(){document.querySelectorAll(".btn-favorite").forEach(r=>{r.onclick=e=>{e.preventDefault(),e.stopPropagation();const t=r.dataset.toolId,i=r.dataset.toolName;Vl(t,i)}}),document.querySelectorAll(".btn-card-buy-primary").forEach(r=>{r.onclick=e=>{e.preventDefault();const t=r.dataset.buyUrl||r.getAttribute("href"),i=r.dataset.toolId,n=r.dataset.toolName||"AI Tool",a=r.dataset.toolPrice||"$19 /month";na(async s=>{if(W)try{const o=(s==null?void 0:s.user)||H.currentUser;await N.from("orders").insert([{tool_id:i||null,tool_name:n,price:a,user_id:(o==null?void 0:o.id)||null,user_email:(o==null?void 0:o.email)||"guest@anonymous.com",status:"inquiry_whatsapp",created_at:new Date().toISOString()}])}catch(o){console.warn("[ToolCard] Order log warning:",o)}window.open(t,"_blank","noopener,noreferrer")},{defaultTab:"signup"})}}),document.querySelectorAll(".btn-how-to-use").forEach(r=>{r.onclick=e=>{const t=r.dataset.toolId;t&&(window.location.hash=`#/tool/${t}?section=how-to-use`)}}),document.querySelectorAll(".futuristic-tool-card").forEach(r=>{r.onmousemove=e=>{const t=r.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;r.style.setProperty("--mouse-x",`${i}px`),r.style.setProperty("--mouse-y",`${n}px`)}})}function mi(){return`
    <section class="whatsapp-cta-section">
      <div class="container">
        <div class="whatsapp-banner-card">
          <!-- 3D Isometric AI Cube Graphic -->
          <div class="whatsapp-cube-box">
            <img 
              src="/assets/ai_cube_3d.jpg" 
              alt="3D AI Holographic Cube" 
              class="whatsapp-cube-img"
              loading="lazy"
            />
          </div>

          <!-- Banner Copy -->
          <div class="whatsapp-banner-content">
            <h3>Supercharge your productivity with the best AI tools</h3>
            <p>
              Join thousands of creators, entrepreneurs and teams who are building the future with AI. Get first access to verified licenses, exclusive pricing, and weekly prompt packs.
            </p>
            <div class="whatsapp-trust-note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>No spam. Only valuable updates and exclusive offers.</span>
            </div>
          </div>

          <!-- Direct WhatsApp Join Action Button -->
          <div>
            <a 
              href="${Ee}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-whatsapp-large"
              id="bottom-whatsapp-join-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
              </svg>
              <span>Join WhatsApp Community</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `}function _e(){const r=Ee;return`
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Info -->
          <div class="footer-brand">
            <a href="#/" class="nav-brand" style="margin-bottom: 0.5rem;">
              <div class="nav-brand-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z" />
                </svg>
              </div>
              <span>${g("nav.brand")}</span>
            </a>
            <p>
              ${g("footer.desc")}
            </p>
            <div style="margin-top: 1.25rem;">
              <a href="${r}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav" style="padding: 0.45rem 0.95rem; font-size: 0.8rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
                </svg>
                <span>${g("nav.joinWhatsApp")}</span>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-col">
            <h4>${g("footer.exploreHeading")}</h4>
            <ul class="footer-links">
              <li><a href="#/">${g("nav.home")}</a></li>
              <li><a href="#/tools">${g("nav.allTools")}</a></li>
              <li><a href="#/categories">${g("nav.categories")}</a></li>
              <li><a href="#/about">${g("nav.about")}</a></li>
              <li><a href="#/contact">${g("nav.contact")}</a></li>
              <li><a href="#/policy">${g("nav.policy")}</a></li>
              <li><a href="#/admin">${g("nav.admin")}</a></li>
            </ul>
          </div>

          <!-- Categories -->
          <div class="footer-col">
            <h4>${g("nav.categories")}</h4>
            <ul class="footer-links">
              <li><a href="#/categories">${g("categories.viewAll")}</a></li>
              <li><a href="#/tools">${g("nav.allTools")}</a></li>
              <li><a href="#/tools?category=Ai%20Tools">Ai Tools</a></li>
            </ul>
          </div>

          <!-- Trust & WhatsApp Direct -->
          <div class="footer-col">
            <h4>${g("footer.communityHeading")}</h4>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 1rem;">
              ${g("benefits.b3Desc")}
            </p>
            <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.4rem;">
              <div>⚡ ${g("toolDetails.guaranteesActivation")}</div>
              <div>🛡 ${g("toolDetails.guaranteesLicensing")}</div>
              <div>💬 ${g("toolDetails.guaranteesSupport")}</div>
            </div>
          </div>
        </div>

        <!-- Copyright & Legal -->
        <div class="footer-bottom">
          <div>
            &copy; 2026 ${g("nav.brand")}. ${g("footer.allRightsReserved")}
          </div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/about">${g("nav.about")}</a>
            <a href="#/contact">${g("nav.contact")}</a>
            <a href="#/policy">${g("nav.policy")}</a>
          </div>
        </div>
      </div>
    </footer>
  `}async function bn(r){document.title=`${g("nav.brand")} | ${g("hero.headlinePart1")} ${g("hero.headlineGradient")}`;const e=await V.getTools(),t=await V.getCategories(),i=e;r.innerHTML=`
    ${xe("/")}

    <main class="main-content fade-in">
      <!-- HERO SECTION (THE INTELLIGENT TOOL INDEX) -->
      <section class="hero-section">
        <!-- Ambient Floating Aurora Light Blobs -->
        <div class="hero-aurora-blob hero-aurora-1"></div>
        <div class="hero-aurora-blob hero-aurora-2"></div>

        <div class="container hero-grid">
          <!-- Left Hero Copy -->
          <div class="hero-content">
            <!-- Small Green Label -->
            <div class="hero-green-index-label">
              <span class="index-dot-pulse"></span>
              <span>THE INTELLIGENT TOOL INDEX</span>
            </div>

            <!-- Large Heading -->
            <h1 class="hero-title-main">
              <span class="title-line-1">Discover the</span>
              <span class="title-line-2">
                <span class="text-gradient-violet-blue">Future</span> of <span class="text-gradient-violet-blue">AI Tools</span>
              </span>
            </h1>

            <!-- Supporting Text -->
            <p class="hero-desc-intelligent">
              A sharper way to find the software that moves your work forward. Explore a living catalog of powerful tools, tested by people who build with AI.
            </p>

            <!-- Rounded Search Bar with Mint Button -->
            <form id="hero-search-form" class="hero-search-capsule" action="#/tools" method="get">
              <div class="search-capsule-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="search-capsule-icon">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                  type="text" 
                  id="hero-search-input" 
                  placeholder="What are you looking to create?" 
                  class="search-capsule-input"
                  autocomplete="off"
                />
              </div>
              <button type="submit" class="btn-search-mint" title="Search tools">
                <span>Search tools</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </form>

            <!-- Trending Quick-Search Pills -->
            <div class="hero-trending-row">
              <span class="hero-trending-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Trending:
              </span>
              <button type="button" class="hero-trending-chip" data-search="ChatGPT">ChatGPT</button>
              <button type="button" class="hero-trending-chip" data-search="Midjourney">Midjourney</button>
              <button type="button" class="hero-trending-chip" data-search="Claude">Claude 3.5</button>
              <button type="button" class="hero-trending-chip" data-search="Cursor">Cursor AI</button>
              <button type="button" class="hero-trending-chip" data-search="n8n">n8n</button>
              <button type="button" class="hero-trending-chip" data-search="Lovable">Lovable</button>
            </div>

            <!-- Indexed Count Metadata Row -->
            <div class="hero-indexed-meta">
              <svg class="indexed-pulse-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span>Over <strong>4,200 tools</strong> indexed and reviewed</span>
            </div>

            <!-- Action Buttons Row -->
            <div class="hero-actions-row">
              <a href="#/tools" class="btn-start-discovering">
                <span>Start discovering</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>
              <a href="#/categories" class="link-browse-catalog">
                <span>Browse the catalog</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>

            <!-- Value Proposition Trust Badges -->
            <div class="hero-trust-row">
              <div class="hero-trust-item">
                <div class="hero-trust-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div class="hero-trust-text">
                  <h4>${g("hero.trust1Title")}</h4>
                  <p>${g("hero.trust1Desc")}</p>
                </div>
              </div>

              <div class="hero-trust-item">
                <div class="hero-trust-icon" style="color: #38bdf8;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <div class="hero-trust-text">
                  <h4>${g("hero.trust2Title")}</h4>
                  <p>${g("hero.trust2Desc")}</p>
                </div>
              </div>

              <div class="hero-trust-item">
                <div class="hero-trust-icon" style="color: #c084fc;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <div class="hero-trust-text">
                  <h4>${g("hero.trust3Title")}</h4>
                  <p>${g("hero.trust3Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right 3D Glowing AI Orb System with Orbits & Floating Glass Labels -->
          ${Kl()}
        </div>
      </section>

      <!-- BROWSE CATEGORIES SECTION -->
      <section class="categories-section">
        <div class="container">
          <div class="section-header-row">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.4rem;">${g("categories.badge")}</span>
              <h2 class="section-title">${g("categories.title")}</h2>
            </div>
            <a href="#/categories" class="section-view-all">
              <span>${g("categories.viewAll")}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <!-- Category Pill Tags Row with Hover Glow -->
          <div class="categories-pills-wrap">
            ${t.map(c=>`
              <a href="#/tools?category=${encodeURIComponent(c.name)}" class="category-pill" title="${c.name}">
                ${c.image?`<img src="${c.image}" alt="" style="width: 20px; height: 20px; border-radius: 4px; object-fit: cover; vertical-align: middle;" />`:`<span class="category-pill-icon">${c.icon}</span>`}
                <span>${c.name}</span>
                <span style="font-size: 0.72rem; opacity: 0.65; margin-left: 0.2rem; background: rgba(255,255,255,0.1); padding: 0.1rem 0.45rem; border-radius: 9999px;">${c.count||"PRO"}</span>
              </a>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- FEATURED TOOLS SECTION (3-Column Animated Cards) -->
      <section class="featured-section">
        <div class="container">
          <div class="section-header-row">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.45rem;">${g("featured.badge")}</span>
              <h2 class="section-title">
                <span>${g("featured.title")}</span>
                <span style="font-size: 1.1rem; color: #38bdf8;">✨</span>
              </h2>
              <p style="color: var(--text-secondary); font-size: 0.92rem; margin-top: 0.25rem;">
                ${g("featured.subtitle")}
              </p>
            </div>
            <a href="#/tools" class="section-view-all">
              <span>${g("featured.viewAll")}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <!-- 3-Column Responsive Grid with Equal Heights -->
          <div class="tools-grid-3">
            ${i.length>0?i.slice(0,6).map(c=>gi(c)).join(""):`<div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 20px;">
                   <h3 style="color: var(--text-pure); margin-bottom: 0.5rem;">${g("featured.emptyTitle")}</h3>
                   <p style="max-width: 500px; margin: 0 auto 1.5rem auto; font-size: 0.9rem;">
                     ${g("featured.emptyDesc")}
                   </p>
                   ${H.isAdmin()?`<a href="#/admin" class="btn btn-primary" style="font-size: 0.85rem;">${g("featured.openAdmin")}</a>`:`<a href="#/tools" class="btn btn-primary" style="font-size: 0.85rem;">${g("featured.viewAll")}</a>`}
                 </div>`}
          </div>
        </div>
      </section>

      <!-- WHY CHOOSE AI TOOLS STORE (4 BENEFITS SECTION) -->
      <section class="benefits-section">
        <div class="container">
          <div class="section-header-row" style="margin-bottom: 2rem;">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.5rem;">${g("benefits.badge")}</span>
              <h2 class="section-title">${g("benefits.title")}</h2>
              <p style="margin-top: 0.35rem; color: var(--text-secondary);">
                ${g("benefits.subtitle")}
              </p>
            </div>
          </div>

          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z"/>
                </svg>
              </div>
              <h4>${g("benefits.b1Title")}</h4>
              <p>${g("benefits.b1Desc")}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #c084fc; border-color: rgba(192, 132, 252, 0.3); background: rgba(192, 132, 252, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <h4>${g("benefits.b2Title")}</h4>
              <p>${g("benefits.b2Desc")}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                </svg>
              </div>
              <h4>${g("benefits.b3Title")}</h4>
              <p>${g("benefits.b3Desc")}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #34d399; border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
              </div>
              <h4>${g("benefits.b4Title")}</h4>
              <p>${g("benefits.b4Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CALL TO ACTION (FINAL SECTION) -->
      <section class="final-cta-section">
        <div class="container">
          <div class="final-cta-card">
            <span class="final-cta-badge">${g("finalCta.badge")}</span>
            <h2 class="final-cta-title">${g("finalCta.title")}</h2>
            <p class="final-cta-subtitle">
              ${g("finalCta.subtitle")}
            </p>
            <div class="final-cta-actions">
              <button type="button" id="final-cta-signup-btn" class="btn-cta-primary">
                <span>${g("finalCta.getStarted")}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <a href="#/tools" class="btn-cta-secondary">
                <span>${g("finalCta.browseTools")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- BOTTOM WHATSAPP COMMUNITY CTA BANNER -->
      ${mi()}
    </main>

    ${_e()}
  `,Se(),oa();const n=document.getElementById("final-cta-signup-btn");n&&(n.onclick=()=>{Er({defaultTab:"signup"})});const a=document.getElementById("hero-search-form"),s=document.getElementById("hero-search-input");a&&s&&(a.onsubmit=c=>{c.preventDefault();const d=s.value.trim();window.location.hash=`#/tools?q=${encodeURIComponent(d)}`}),document.querySelectorAll(".hero-trending-chip").forEach(c=>{c.addEventListener("click",d=>{d.preventDefault();const u=c.dataset.search||c.textContent.trim();s&&(s.value=u),window.location.hash=`#/tools?q=${encodeURIComponent(u)}`})}),document.querySelectorAll(".orbit-tool-card").forEach(c=>{c.addEventListener("click",d=>{d.stopPropagation();const u=c.dataset.toolName||"";u&&(window.location.hash=`#/tools?q=${encodeURIComponent(u)}`)})});const o=document.querySelector(".hero-section"),l=document.querySelector(".hero-orb-stage");if(o&&l){let c=0,d=0,u=0,p=0;const h=v=>{const y=o.getBoundingClientRect(),w=(v.clientX-y.left)/y.width-.5,k=(v.clientY-y.top)/y.height-.5;c=w*18,d=-k*18},m=()=>{c=0,d=0};o.addEventListener("mousemove",h,{passive:!0}),o.addEventListener("mouseleave",m,{passive:!0});const f=()=>{u+=(c-u)*.08,p+=(d-p)*.08,l&&(l.style.transform=`perspective(1200px) rotateY(${u.toFixed(2)}deg) rotateX(${p.toFixed(2)}deg)`),requestAnimationFrame(f)};requestAnimationFrame(f)}}async function Gl(r,{queryParams:e}){document.title=`${g("nav.allTools")} | ${g("nav.brand")}`;const t=(e==null?void 0:e.get("category"))||"All",i=(e==null?void 0:e.get("q"))||"",n=await V.getTools(),a=await V.getCategories();let s=H.getUserCountry()||"Pakistan";r.innerHTML=`
    ${xe("/tools")}

    <main class="main-content container marketplace-page fade-in">
      <header class="marketplace-header">
        <span class="badge badge-new" style="margin-bottom: 0.6rem;">${g("categories.badge")}</span>
        <h1>${g("allTools.headerTitle")}</h1>
        <p>${g("allTools.headerSubtitle")}</p>
      </header>

      ${H.isAdmin()?`
        <!-- Currency & Country Quick-Filter Bar (Admin Preview Only) -->
        <div class="catalog-currency-bar">
          <div class="currency-bar-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span style="display: flex; align-items: center; gap: 0.4rem;">
              <span>Pricing Inspector:</span>
              <span class="badge badge-popular" style="font-size: 0.62rem; padding: 0.05rem 0.35rem;">Admin Preview</span>
            </span>
          </div>
          <div class="currency-bar-options" id="catalog-currency-options">
            <button type="button" class="currency-chip ${s==="Pakistan"?"active":""}" data-country="Pakistan" title="View pricing in PKR">
              <span>🇵🇰</span>
              <span>Pakistan (PKR)</span>
            </button>
            <button type="button" class="currency-chip ${s==="United States"?"active":""}" data-country="United States" title="View pricing in USD ($)">
              <span>🇺🇸</span>
              <span>USD ($)</span>
            </button>
            <button type="button" class="currency-chip ${s==="India"?"active":""}" data-country="India" title="View pricing in INR (₹)">
              <span>🇮🇳</span>
              <span>India (INR ₹)</span>
            </button>
            <button type="button" class="currency-chip ${s==="United Arab Emirates"?"active":""}" data-country="United Arab Emirates" title="View pricing in AED">
              <span>🇦🇪</span>
              <span>UAE (AED)</span>
            </button>
            <button type="button" class="currency-chip ${s==="Saudi Arabia"?"active":""}" data-country="Saudi Arabia" title="View pricing in SAR">
              <span>🇸🇦</span>
              <span>Saudi (SAR)</span>
            </button>
            <button type="button" class="currency-chip ${s==="Global"||s==="Other"?"active":""}" data-country="Global" title="View Global pricing in USD ($)">
              <span>🌐</span>
              <span>Global ($)</span>
            </button>
          </div>
        </div>
      `:""}

      <!-- Controls & Filter Bar -->
      <section class="marketplace-controls">
        <div class="controls-top-row">
          <!-- Search Input -->
          <div class="search-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              id="catalog-search-input" 
              placeholder="${g("allTools.searchPlaceholder")}" 
              value="${i}"
              class="search-input-field"
            />
          </div>

          <!-- Sort and View Mode -->
          <div class="filter-actions">
            <select id="catalog-sort-select" class="sort-select">
              <option value="popular">${g("allTools.sortPopular")}</option>
              <option value="rating">${g("allTools.sortRating")}</option>
              <option value="price-asc">${g("allTools.sortPriceLow")}</option>
              <option value="price-desc">${g("allTools.sortPriceHigh")}</option>
              <option value="alpha">${g("allTools.sortName")}</option>
            </select>

            <!-- Grid vs List View Toggle -->
            <div class="view-toggle-group">
              <button id="view-grid-btn" class="view-toggle-btn active" title="Grid View">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                </svg>
              </button>
              <button id="view-list-btn" class="view-toggle-btn" title="List View">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="4" cy="6" r="1.5"/>
                  <circle cx="4" cy="12" r="1.5"/>
                  <circle cx="4" cy="18" r="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Category Filter Pills -->
        <div class="filter-chips-row" id="catalog-category-chips">
          <button class="filter-chip ${t==="All"?"active":""}" data-category="All">
            ${g("allTools.allCategories")} (${n.length})
          </button>
          ${a.map(S=>`
            <button class="filter-chip ${t.toLowerCase()===S.name.toLowerCase()?"active":""}" data-category="${S.name}">
              ${S.image?`<img src="${S.image}" alt="" style="width: 16px; height: 16px; border-radius: 3px; object-fit: cover; vertical-align: middle; margin-right: 4px;" />`:`${S.icon} `}${S.name} (${S.count})
            </button>
          `).join("")}
        </div>
      </section>

      <!-- Active Filter Status & Count -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
        <div id="catalog-results-count">Showing tools...</div>
        <div id="catalog-clear-wrap" style="display: none;">
          <button id="catalog-clear-btn" class="btn-details" style="font-size: 0.78rem; padding: 0.25rem 0.65rem;">
            ${g("allTools.clearFilters")}
          </button>
        </div>
      </div>

      <!-- Tools Grid Container -->
      <div id="catalog-tools-container" class="catalog-grid"></div>

      <!-- Load More / Pagination Action -->
      <div id="catalog-load-more-wrap" style="text-align: center; margin-top: 3rem; display: none;">
        <button id="catalog-load-more-btn" class="btn btn-secondary" style="padding: 0.8rem 2.5rem;">
          ${g("allTools.loadMore")}
        </button>
      </div>
    </main>

    ${_e()}
  `,Se();let o=t,l=i,c="popular",d=!1,u=12;const p=document.getElementById("catalog-tools-container"),h=document.getElementById("catalog-results-count"),m=document.getElementById("catalog-clear-wrap"),f=document.getElementById("catalog-clear-btn"),v=document.getElementById("catalog-load-more-wrap"),y=document.getElementById("catalog-load-more-btn"),w=document.getElementById("catalog-search-input"),k=document.getElementById("catalog-sort-select"),P=document.getElementById("view-grid-btn"),D=document.getElementById("view-list-btn"),I=document.getElementById("catalog-category-chips");function E(){let S=[...n];if(o&&o!=="All"&&(S=S.filter(j=>(j.category||"").toLowerCase()===o.toLowerCase())),l){const j=l.toLowerCase().trim();S=S.filter(x=>x.name.toLowerCase().includes(j)||x.category.toLowerCase().includes(j)||x.shortDescription&&x.shortDescription.toLowerCase().includes(j)||x.features&&x.features.some(U=>U.toLowerCase().includes(j)))}return c==="latest"?S.reverse():c==="price-asc"?S.sort((j,x)=>j.priceValue-x.priceValue):c==="price-desc"?S.sort((j,x)=>x.priceValue-j.priceValue):c==="alpha"?S.sort((j,x)=>j.name.localeCompare(x.name)):S.sort((j,x)=>(x.featured?1:0)-(j.featured?1:0)||(x.rating||0)-(j.rating||0)),S}function K(){var x;const S=E(),j=S.slice(0,u);if(h.textContent=g("allTools.resultsCount",{count:`${j.length} / ${S.length}`}),m.style.display=l||o!=="All"?"block":"none",S.length===0){p.innerHTML=`
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3>${g("allTools.noResultsTitle")}</h3>
          <p>${g("allTools.noResultsDesc")}</p>
          <button id="empty-clear-btn" class="btn btn-primary">${g("allTools.resetFilters")}</button>
        </div>
      `,(x=document.getElementById("empty-clear-btn"))==null||x.addEventListener("click",O),v.style.display="none";return}p.className=d?"catalog-grid list-view":"catalog-grid tools-grid-3",p.innerHTML=j.map(U=>gi(U)).join(""),v.style.display=j.length<S.length?"block":"none",oa()}function O(){o="All",l="",w.value="",I.querySelectorAll(".filter-chip").forEach(S=>{S.classList.toggle("active",S.dataset.category==="All")}),K()}w.oninput=S=>{l=S.target.value.trim(),u=12,K()},k.onchange=S=>{c=S.target.value,K()},I.onclick=S=>{const j=S.target.closest(".filter-chip");j&&(I.querySelectorAll(".filter-chip").forEach(x=>x.classList.remove("active")),j.classList.add("active"),o=j.dataset.category,u=12,K())},f.onclick=O,P.onclick=()=>{d=!1,P.classList.add("active"),D.classList.remove("active"),K()},D.onclick=()=>{d=!0,D.classList.add("active"),P.classList.remove("active"),K()},y.onclick=()=>{u+=8,K()};const q=document.getElementById("catalog-currency-options");q&&(q.onclick=S=>{const j=S.target.closest(".currency-chip");if(!j)return;const x=j.dataset.country;s=x,H.setUserCountry(x),q.querySelectorAll(".currency-chip").forEach(U=>U.classList.remove("active")),j.classList.add("active"),_(`Pricing updated for ${x}`,"info"),K()}),K()}function Jl(r){if(!r)return"";const e=r.tutorialVideoUrl||r.videoUrl||r.tutorial_video_url||"",t=Il(e),i=Array.isArray(r.howToUse)&&r.howToUse.length>0?r.howToUse:[{step:1,title:"Open the Tool",text:`Access the official ${r.name} interface using the credentials sent to you.`},{step:2,title:"Create or Verify Account",text:"Ensure your VIP plan is active in your profile settings."},{step:3,title:"Select Required AI Feature",text:"Choose from the available templates or multimodal prompts."},{step:4,title:"Input Content or Prompt",text:"Enter your custom instructions, parameters, or uploaded media."},{step:5,title:"Generate & Export Result",text:"Run generation and export in high-definition format."}],n=t.endsWith(".mp4")||t.endsWith(".webm");return`
    <section class="how-to-use-section" id="how-to-use">
      <div class="section-header-row" style="margin-bottom: 2rem;">
        <div>
          <span class="badge badge-popular" style="margin-bottom: 0.5rem;">Interactive Guide</span>
          <h2 class="section-title">How to Use ${r.name}</h2>
          <p style="margin-top: 0.35rem; color: var(--text-secondary);">
            Master ${r.name} with this step-by-step video breakdown and instructions.
          </p>
        </div>
      </div>

      <div class="how-to-use-grid">
        <!-- Tutorial Video Player -->
        <div class="video-player-card">
          <div class="video-frame-wrap">
            ${n?`<video src="${t}" controls playsinline poster="/assets/ai_hologram_orb.jpg"></video>`:t?`<iframe 
                     src="${t}" 
                     title="${r.name} Tutorial Video" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                     allowfullscreen>
                   </iframe>`:`<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--text-muted); flex-direction: column; gap: 0.5rem;">
                     <span>No tutorial video provided</span>
                   </div>`}
          </div>

          <div class="video-card-meta">
            <div>
              <h4>Official Walkthrough & Mastery</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Dynamically loaded for ${r.name}</p>
            </div>
            <span class="video-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              HD Video
            </span>
          </div>
        </div>

        <!-- Step-by-Step Instructions -->
        <div class="steps-container">
          <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Step-by-Step Instructions</h3>
          ${i.map((a,s)=>{const o=a.step||s+1;return`
              <div class="step-card">
                <div class="step-number">${String(o).padStart(2,"0")}</div>
                <div class="step-content">
                  <h4>${a.title||`Step ${o}`}</h4>
                  <p>${a.text||""}</p>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </section>
  `}async function Yl(r,{pathParams:e}){const t=e==null?void 0:e.id,i=await V.getToolById(t);if(!i){document.title=`${g("toolDetails.notFoundTitle")} | ${g("nav.brand")}`,r.innerHTML=`
      ${xe("/tools")}
      <main class="main-content container empty-state" style="margin-top: 5rem;">
        <div class="empty-state-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="10" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2>${g("toolDetails.notFoundTitle")}</h2>
        <p>${g("toolDetails.notFoundDesc")}</p>
        <a href="#/tools" class="btn btn-primary">${g("toolDetails.backToTools")}</a>
      </main>
      ${_e()}
    `,Se();return}const n=ta(i);document.title=`${n.name} | ${g("nav.brand")}`;const a=H.getUserCountry()||"Pakistan",s=Tr(n,a),o=s.discountedPrice,c=(await V.getTools()).filter(f=>f.category===n.category&&f.id!==n.id).slice(0,4),d=Yn(n.whatsappUrl,n.name,s.discountedPrice,a,s.originalPrice,s.discountPercent),{amount:u,periodText:p}=Ar(o,`/${g("card.perMonth")||"month"}`);r.innerHTML=`
    ${xe("/tools")}

    <main class="main-content container tool-details-page fade-in">
      <!-- Breadcrumbs Navigation -->
      <nav class="breadcrumbs-bar">
        <a href="#/">${g("nav.home")}</a>
        <span class="breadcrumbs-separator">/</span>
        <a href="#/tools">${g("nav.allTools")}</a>
        <span class="breadcrumbs-separator">/</span>
        <a href="#/tools?category=${encodeURIComponent(n.category)}">${n.category}</a>
        <span class="breadcrumbs-separator">/</span>
        <span style="color: var(--text-pure); font-weight: 600;">${n.name}</span>
      </nav>

      <!-- Main Two-Column Layout -->
      <div class="details-layout">
        <!-- Left Column: Tool Specs & Descriptions -->
        <div class="details-main-content">
          ${n.image?`
            <div class="details-banner-preview" style="margin-bottom: 1.5rem; border-radius: 20px; overflow: hidden; position: relative; height: 260px; background: rgba(15,23,42,0.9); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px -8px rgba(0,0,0,0.6);">
              <img src="${n.image}" alt="${n.name}" style="position: absolute; inset: -20px; width: calc(100% + 40px); height: calc(100% + 40px); object-fit: cover; filter: blur(25px); opacity: 0.45;" aria-hidden="true" />
              <img src="${n.image}" alt="${n.name} banner" style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; object-position: center;" />
              <div style="position: absolute; inset: 0; z-index: 2; background: linear-gradient(180deg, transparent 60%, rgba(10,15,30,0.4) 100%); pointer-events: none;"></div>
            </div>
          `:""}

          <div class="details-header">
            <div class="details-logo-box" style="background: ${n.iconGradient||"linear-gradient(135deg, #4f46e5, #06b6d4)"}; color: #ffffff;">
              ${n.image?`<img src="${n.image}" alt="${n.name} Logo" style="width: 100%; height: 100%; object-fit: contain;" />`:pi(n.id,n.name)}
            </div>

            <div class="details-title-wrap">
              <h1>${n.name}</h1>
              <div class="details-badges-row">
                <span class="badge badge-popular">${n.category}</span>
                ${s.hasDiscount?`
                  <span class="badge" style="background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; font-weight: 800; font-size: 0.78rem; padding: 0.25rem 0.7rem; border-radius: 999px; box-shadow: 0 0 12px rgba(239, 68, 68, 0.5);">
                    🔥 ${s.discountPercent}% OFF
                  </span>
                `:""}
                ${n.badge?`<span class="badge badge-hot">★ ${n.badge}</span>`:""}
                <span style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: #fbbf24; font-weight: 700;">
                  ★ ${n.rating||4.9} <span style="color: var(--text-muted); font-weight: 400;">(${n.reviewCount||150}+ reviews)</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Formatted Short Description / Summary Points -->
          <div class="details-short-desc">
            ${ti(n.shortDescription||"")}
          </div>

          <!-- Full Description Card with formatted points -->
          <div class="details-full-desc-card">
            <h3>${n.name}</h3>
            <div style="color: var(--text-secondary); line-height: 1.65; margin-top: 0.5rem;">
              ${ti(n.fullDescription||n.description||n.shortDescription||"")}
            </div>

            <!-- Key Features Checklist -->
            <div style="margin-top: 1.75rem;">
              <h4 style="font-size: 1rem; color: var(--text-pure); margin-bottom: 0.85rem;">${g("toolDetails.featuresTab")}</h4>
              <div class="features-checklist">
                ${(n.features||[]).map(f=>`
                  <div class="feature-check-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>${f}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- DYNAMIC HOW TO USE SECTION (Video & Step-by-Step Instructions) -->
          ${Jl(n)}
        </div>

        <!-- Right Column: Sticky Purchase & License Box -->
        <aside class="details-sidebar">
          <div class="purchase-card-sticky">
            <div class="purchase-price-block">
              ${s.hasDiscount?`
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span style="font-size: 0.88rem; text-decoration: line-through; color: var(--text-muted);">${s.originalAmount}</span>
                  <span style="font-size: 0.72rem; font-weight: 800; background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); padding: 0.1rem 0.4rem; border-radius: 4px;">-${s.discountPercent}% OFF</span>
                </div>
              `:""}
              <div style="display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap;">
                <div class="purchase-price-val" style="${s.hasDiscount?"color: #38bdf8;":""}">${s.discountedAmount}</div>
                <span class="price-country-badge" style="font-size: 0.78rem; padding: 0.2rem 0.55rem;" title="Price for ${a}">
                  ${Ze(a)} ${a}
                </span>
              </div>
              <div class="purchase-price-period">${p} &bull; ${g("hero.trust2Title")}</div>
            </div>

            <!-- BUY NOW BUTTON (Redirects to backend WhatsApp link) -->
            <a 
              href="${d}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-buy-whatsapp-main"
              id="tool-buy-now-btn"
              data-tool-price="${o}"
              data-user-country="${a}"
              title="${g("toolDetails.buyNowWhatsApp")}: ${n.name}"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
              </svg>
              <span>${g("toolDetails.buyNowWhatsApp")}</span>
            </a>

            <!-- Official Website Direct Link -->
            ${n.toolUrl&&n.toolUrl!=="#"?`
              <a href="${n.toolUrl}" target="_blank" rel="noopener noreferrer" class="btn-visit-tool">
                <span>${g("toolDetails.visitWebsite")}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            `:""}

            <!-- Purchase Guarantees & Features -->
            <ul class="purchase-guarantees">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${g("toolDetails.guaranteesSupport")}</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${g("toolDetails.guaranteesActivation")}</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${g("toolDetails.guaranteesLicensing")}</span>
              </li>
            </ul>

            <!-- WhatsApp Purchase Guarantee -->
            <div style="font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
              <span style="color: var(--accent-mint);">✓</span> ${g("toolDetails.purchaseVerified")}
            </div>
          </div>
        </aside>
      </div>

      <!-- Related Tools Row -->
      ${c.length>0?`
        <section style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle);">
          <div class="section-header-row">
            <h3 class="section-title">Similar AI Tools in ${n.category}</h3>
            <a href="#/tools?category=${encodeURIComponent(n.category)}" class="section-view-all">
              <span>Explore Category</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
          <div class="tools-grid-3">
            ${c.map(f=>gi(f)).join("")}
          </div>
        </section>
      `:""}
    </main>

    ${_e()}
  `,Se(),initCardInteractions(),((queryParams==null?void 0:queryParams.get("section"))==="how-to-use"||(queryParams==null?void 0:queryParams.get("tab"))==="how-to-use"||window.location.hash.includes("how-to-use"))&&setTimeout(()=>{const f=document.getElementById("how-to-use");if(f){f.scrollIntoView({behavior:"smooth",block:"start"});const v=f.querySelector(".video-player-card");v&&(v.classList.add("video-focus-glow"),setTimeout(()=>v.classList.remove("video-focus-glow"),3500))}},150);const m=document.getElementById("tool-buy-now-btn");m&&(m.onclick=f=>{f.preventDefault();const v=m.getAttribute("href");na(async y=>{if(W)try{const w=(y==null?void 0:y.user)||H.currentUser;await N.from("orders").insert([{tool_id:n.id||null,tool_name:n.name||"AI Tool",price:o||n.price||"$19 /month",user_id:(w==null?void 0:w.id)||null,user_email:(w==null?void 0:w.email)||"guest@anonymous.com",status:"inquiry_whatsapp",created_at:new Date().toISOString()}])}catch(w){console.warn("[ToolDetailsPage] Order record error:",w)}window.open(v,"_blank","noopener,noreferrer")},{defaultTab:"signup"})})}async function Ql(r){document.title="AI Categories Directory | AI Tools Store";const e=await V.getCategories();r.innerHTML=`
    ${xe("/categories")}

    <main class="main-content container categories-directory-page fade-in">
      <header class="marketplace-header">
        <span class="badge badge-popular" style="margin-bottom: 0.6rem;">Taxonomy</span>
        <h1>Browse by <span class="text-gradient-ai">AI Category</span></h1>
        <p>Explore software tailored to your specific creative, engineering, and business workflows.</p>
      </header>

      <div class="categories-grid-cards">
        ${e.map(t=>`
          <a href="#/tools?category=${encodeURIComponent(t.name)}" class="category-card-large ${t.image?"has-category-image":""}">
            ${t.image?`
              <div class="category-card-banner-wrap">
                <img src="${t.image}" alt="${t.name}" class="category-card-banner-ambient" aria-hidden="true" onerror="this.style.display='none';" />
                <img src="${t.image}" alt="${t.name} banner" class="category-card-banner-img" loading="lazy" onerror="this.style.opacity='0.3';" />
                <div class="category-card-banner-overlay"></div>
                <div class="category-banner-icon-badge" style="background: ${t.color||"#6366f1"};">
                  ${t.icon||"✨"}
                </div>
                <span class="cat-card-count cat-card-count-floating">${t.count} ${t.count===1?"Tool":"Tools"}</span>
              </div>
            `:`
              <div class="cat-card-header">
                <div class="cat-card-icon" style="background: ${t.color}20; color: ${t.color}; border: 1px solid ${t.color}40;">
                  <span>${t.icon}</span>
                </div>
                <span class="cat-card-count">${t.count} ${t.count===1?"Tool":"Tools"}</span>
              </div>
            `}

            <div class="cat-card-body">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <h3>${t.name}</h3>
                ${t.image?'<span style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 600;">Explore &rarr;</span>':""}
              </div>
              <p style="margin-top: 0.4rem;">${t.description||t.desc||`Explore premium tools in ${t.name}.`}</p>
            </div>

            <div class="cat-explore-link">
              <span>Explore ${t.name}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>
        `).join("")}
      </div>
    </main>

    ${_e()}
  `,Se()}async function Xl(r){document.title="About Us | AI Tools Store",r.innerHTML=`
    ${xe("/about")}

    <main class="main-content container about-page fade-in">
      <section class="about-hero-block">
        <span class="badge badge-popular" style="margin-bottom: 0.8rem;">Our Mission</span>
        <h1>Democratizing Access to the <span class="text-gradient-ai">World's Best AI</span></h1>
        <p style="font-size: 1.12rem; line-height: 1.7; color: var(--text-secondary);">
          We simplify AI software procurement for builders, creators, and agencies. Get verified licenses, fast onboarding, step-by-step video tutorials, and dedicated WhatsApp concierge support in one place.
        </p>
      </section>

      <!-- Key Metrics Strip -->
      <div class="about-stats-strip">
        <div class="about-stat-box">
          <div class="about-stat-number">25,000+</div>
          <div class="about-stat-label">Active Community Members</div>
        </div>
        <div class="about-stat-box">
          <div class="about-stat-number" style="color: var(--accent-mint);">99.8%</div>
          <div class="about-stat-label">License Delivery Success Rate</div>
        </div>
        <div class="about-stat-box">
          <div class="about-stat-number" style="color: #c084fc;">&lt; 5m</div>
          <div class="about-stat-label">Average WhatsApp Response</div>
        </div>
        <div class="about-stat-box">
          <div class="about-stat-number" style="color: #38bdf8;">100%</div>
          <div class="about-stat-label">Verified Software Guarantee</div>
        </div>
      </div>

      <!-- Story & Quality Standards -->
      <div class="about-story-grid" style="margin-bottom: 4rem;">
        <div class="glass-panel about-story-card">
          <h3 style="font-size: 1.35rem; color: var(--text-pure); margin-bottom: 1rem;">Why We Built AI Tools Store</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem; margin-bottom: 1rem;">
            Subscribing to dozens of separate AI platforms across multiple credit cards, regional billing restrictions, and convoluted dashboards is a massive hassle for creators and agencies.
          </p>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">
            AI Tools Store solves this by offering a unified marketplace with direct human activation via WhatsApp, pre-configured enterprise accounts, and curated tutorials for every tool.
          </p>
        </div>

        <div class="glass-panel about-story-card">
          <h3 style="font-size: 1.35rem; color: var(--text-pure); margin-bottom: 1rem;">Our 4-Point Curation Standard</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem; color: var(--text-secondary); font-size: 0.92rem;">
            <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <span style="color: var(--accent-mint); font-weight: 800;">✓</span>
              <span><strong>Production Tested:</strong> Every tool is evaluated by our team for stability and output quality before listing.</span>
            </li>
            <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <span style="color: var(--accent-mint); font-weight: 800;">✓</span>
              <span><strong>Guaranteed Legitimate:</strong> 100% genuine licenses with zero shared password lockouts.</span>
            </li>
            <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <span style="color: var(--accent-mint); font-weight: 800;">✓</span>
              <span><strong>Dedicated Video Onboarding:</strong> Clear, actionable tutorials and step guides provided with each tool.</span>
            </li>
            <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <span style="color: var(--accent-mint); font-weight: 800;">✓</span>
              <span><strong>Instant Human Support:</strong> Immediate resolution for any login or billing question via WhatsApp.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- WhatsApp Banner -->
      ${mi()}
    </main>

    ${_e()}
  `,Se()}async function Zl(r){document.title="Contact & Support | AI Tools Store";const e=Ee;r.innerHTML=`
    ${xe("/contact")}

    <main class="main-content container contact-page fade-in">
      <!-- Ambient Background Glows -->
      <div class="contact-ambient-glow contact-ambient-glow-1" aria-hidden="true"></div>
      <div class="contact-ambient-glow contact-ambient-glow-2" aria-hidden="true"></div>

      <!-- Header Section -->
      <header class="marketplace-header" style="position: relative; z-index: 1;">
        <span class="badge-contact-status">
          <span class="status-dot-pulse"></span>
          24/7 Priority Support Desk • Average Reply &lt; 5 Mins
        </span>
        <h1>We're Here to <span class="text-gradient-ai">Help You Succeed</span></h1>
        <p>Questions about instant tool access, account activations, enterprise licensing, or video tutorials? Reach our team anytime.</p>
      </header>

      <!-- Trust Metrics Badges -->
      <div class="contact-perks-row">
        <div class="contact-perk-item">
          <span>⚡</span>
          <span><span class="perk-highlight">&lt; 5-Min</span> Delivery on WhatsApp</span>
        </div>
        <div class="contact-perk-item">
          <span>🛡️</span>
          <span><span class="perk-highlight">100%</span> Replacement Warranty</span>
        </div>
        <div class="contact-perk-item">
          <span>💬</span>
          <span><span class="perk-highlight">Direct</span> 1-on-1 VIP Support</span>
        </div>
        <div class="contact-perk-item">
          <span>🌐</span>
          <span>PKR, INR, USD &amp; Global Currencies</span>
        </div>
      </div>

      <div class="contact-grid-wrap">
        <!-- Contact Form Card -->
        <div class="contact-form-card">
          <div class="card-icon-title-row">
            <div class="form-header-icon-box">💬</div>
            <div>
              <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800; margin: 0;">Send Us a Message</h3>
              <p style="font-size: 0.84rem; color: var(--text-secondary); margin: 0.25rem 0 0 0;">
                Fill in the details below and our team will respond to your email promptly.
              </p>
            </div>
          </div>

          <form id="contact-form">
            <!-- Full Name -->
            <div class="form-group">
              <label for="contact-name">Your Full Name *</label>
              <div class="form-input-wrapper">
                <span class="form-input-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input type="text" id="contact-name" class="form-input-stylish" placeholder="e.g. Alex Morgan" required />
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label for="contact-email">Email Address *</label>
              <div class="form-input-wrapper">
                <span class="form-input-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input type="email" id="contact-email" class="form-input-stylish" placeholder="e.g. alex@example.com" required />
              </div>
            </div>

            <!-- WhatsApp Number -->
            <div class="form-group">
              <label for="contact-whatsapp">WhatsApp Number *</label>
              <div class="form-input-wrapper">
                <span class="form-input-icon" style="color: #25D366;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                  </svg>
                </span>
                <input type="tel" id="contact-whatsapp" class="form-input-stylish" placeholder="e.g. +92 300 1234567" required />
              </div>
            </div>

            <!-- Topic with Quick Chips & Dropdown -->
            <div class="form-group">
              <div class="quick-topic-label">
                <label for="contact-subject" style="margin-bottom: 0;">Inquiry Topic *</label>
                <span style="font-size: 0.72rem; color: var(--accent-cyan);">Tap a chip or select from dropdown</span>
              </div>
              <div class="quick-topic-chips" id="topic-chips-group">
                <button type="button" class="topic-chip active" data-topic="License Activation">🔑 License Activation</button>
                <button type="button" class="topic-chip" data-topic="Video Tutorial Help">🎥 Tutorial Help</button>
                <button type="button" class="topic-chip" data-topic="Enterprise & Bulk Order">💼 Bulk Order</button>
                <button type="button" class="topic-chip" data-topic="Other">✨ Other</button>
              </div>
              <div class="form-input-wrapper">
                <span class="form-input-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </span>
                <select id="contact-subject" class="form-input-stylish" required>
                  <option value="License Activation" selected>🔑 License Activation</option>
                  <option value="Video Tutorial Help">🎥 Video Tutorial Help</option>
                  <option value="Enterprise & Bulk Order">💼 Enterprise & Bulk Order</option>
                  <option value="Other">✨ Other (Custom Inquiry)</option>
                </select>
              </div>

              <!-- Custom Topic Field (Visible when 'Other' is selected) -->
              <div id="other-topic-field" style="display: none; margin-top: 0.75rem;">
                <div class="form-input-wrapper">
                  <span class="form-input-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    id="contact-custom-topic" 
                    class="form-input-stylish" 
                    placeholder="Please specify your inquiry topic..." 
                    maxlength="100"
                  />
                </div>
              </div>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label for="contact-message">How can we help you? *</label>
              <textarea id="contact-message" class="form-textarea-stylish" placeholder="Describe your question, required tool, or issue in detail..." required></textarea>
            </div>

            <button type="submit" class="btn-contact-submit">
              <span>Send Message</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>

        <!-- Right Column: WhatsApp VIP Concierge & FAQ -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- Instant VIP WhatsApp Card -->
          <div class="whatsapp-vip-card">
            <div class="vip-wa-header-row">
              <div class="vip-wa-icon-glow">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                </svg>
              </div>
              <div>
                <span class="vip-wa-badge-pill">
                  <span class="status-dot-pulse" style="width: 6px; height: 6px;"></span>
                  Online Now • Verified Concierge
                </span>
                <h4 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 800; margin: 0;">Direct WhatsApp VIP Support</h4>
                <p style="font-size: 0.78rem; color: #34d399; margin: 0.2rem 0 0 0;">Average reply in &lt; 3 minutes</p>
              </div>
            </div>

            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0.75rem 0;">
              Connect directly with our dedicated concierge on WhatsApp for real-time order activation, instant credentials transfer, and priority replacements.
            </p>

            <div class="vip-perks-list">
              <div class="vip-perk-point">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Instant private credentials delivery within 5 minutes</span>
              </div>
              <div class="vip-perk-point">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Dedicated 1-on-1 human support for all setups</span>
              </div>
              <div class="vip-perk-point">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Instant replacements if any tool needs renewal</span>
              </div>
            </div>

            <a href="${e}" target="_blank" rel="noopener noreferrer" class="btn-vip-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
              </svg>
              <span>Chat on WhatsApp Now &rarr;</span>
            </a>
          </div>

          <!-- FAQ Accordion Box -->
          <div class="faq-accordion-box">
            <div class="faq-header-row">
              <span class="faq-header-icon">💡</span>
              <h3 style="font-size: 1.18rem; color: var(--text-pure); font-weight: 800; margin: 0;">Frequently Asked Questions</h3>
            </div>

            <div class="faq-accordion-list">
              <!-- FAQ 1 (Open by default) -->
              <div class="faq-item-card is-open">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">🔑</span>
                    <span>How do I receive my tool login after buying?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body" style="display: block;">
                  Immediately after clicking <strong>Buy Now</strong>, you connect directly to our dedicated WhatsApp concierge who verifies your order and transfers your private access credentials and instructions within <strong>5 minutes</strong>.
                </div>
              </div>

              <!-- FAQ 2 -->
              <div class="faq-item-card">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">🎥</span>
                    <span>Can I watch tutorials before purchasing?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body">
                  Yes! Every tool card has a dedicated <strong>"How to Use"</strong> button that takes you straight to the full video walkthrough and step-by-step instructions before you buy.
                </div>
              </div>

              <!-- FAQ 3 -->
              <div class="faq-item-card">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">💳</span>
                    <span>What payment methods are supported?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body">
                  We support localized payments in Pakistan (Easypaisa, JazzCash, Bank Transfer PKR), plus International Debit/Credit Cards, PayPal, Crypto (USDT/BTC), Apple Pay, and Google Pay coordinated directly via WhatsApp.
                </div>
              </div>

              <!-- FAQ 4 -->
              <div class="faq-item-card">
                <button class="faq-question-btn" type="button">
                  <div class="faq-question-left">
                    <span class="faq-topic-icon">🛡️</span>
                    <span>What if my tool access stops working?</span>
                  </div>
                  <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="faq-answer-body">
                  Every tool subscription includes our <strong>Full Replacement Guarantee</strong>. If you ever face an authentication or access issue, simply message our WhatsApp support and we provide an instant replacement account within minutes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    ${_e()}
  `,Se();const t=document.querySelectorAll(".topic-chip"),i=document.getElementById("contact-subject"),n=document.getElementById("other-topic-field"),a=document.getElementById("contact-custom-topic"),s=l=>{i&&i.value!==l&&(i.value=l),t.forEach(c=>{c.classList.toggle("active",c.dataset.topic===l)}),n&&(l==="Other"?(n.style.display="block",a&&a.focus()):n.style.display="none")};t.forEach(l=>{l.onclick=()=>{s(l.dataset.topic)}}),i&&(i.onchange=()=>{s(i.value)});const o=document.getElementById("contact-form");o&&(o.onsubmit=async l=>{var v,y,w,k,P,D,I,E,K;l.preventDefault();const c=o.querySelector('button[type="submit"]'),d=c?c.innerHTML:"<span>Send Message</span>",u=((y=(v=document.getElementById("contact-name"))==null?void 0:v.value)==null?void 0:y.trim())||"",p=((k=(w=document.getElementById("contact-email"))==null?void 0:w.value)==null?void 0:k.trim())||"",h=((D=(P=document.getElementById("contact-whatsapp"))==null?void 0:P.value)==null?void 0:D.trim())||"";let m=(i==null?void 0:i.value)||"License Activation";if(m==="Other"){const O=(I=a==null?void 0:a.value)==null?void 0:I.trim();m=O?`Other: ${O}`:"Other Inquiry"}const f=((K=(E=document.getElementById("contact-message"))==null?void 0:E.value)==null?void 0:K.trim())||"";c&&(c.disabled=!0,c.innerHTML="<span>Sending Message...</span>");try{if(W){const q=h?`📱 WhatsApp: ${h}

${f}`:f,{error:S}=await N.from("contact_messages").insert([{full_name:u,email:p,subject:m,message:q,created_at:new Date().toISOString()}]);S&&console.warn("[ContactPage] Supabase insert warning:",S.message)}const O=ct();if(O.mcpWebhookUrl&&O.mcpWebhookUrl.trim().startsWith("http")){ze.setServerUrl(O.mcpWebhookUrl),ze.setSecretKey(O.mcpSecretKey||"");try{await ze.submitInquiry({name:u,email:p,whatsapp:h,topic:m,message:f})}catch(q){console.warn("[ContactPage] n8n submission notice:",q.message)}}_(`Thank you, ${u}! Your message has been received. Our team will contact you shortly.`,"success"),o.reset(),s("License Activation"),a&&(a.value="")}catch(O){console.error("[ContactPage] Error submitting form:",O),_(`Thank you, ${u}! Your message has been received.`,"success"),o.reset(),s("License Activation"),a&&(a.value="")}finally{c&&(c.disabled=!1,c.innerHTML=d)}}),document.querySelectorAll(".faq-question-btn").forEach(l=>{l.onclick=()=>{const c=l.closest(".faq-item-card"),d=c.querySelector(".faq-answer-body");c.classList.contains("is-open")?(c.classList.remove("is-open"),d.style.display="none"):(c.classList.add("is-open"),d.style.display="block")}})}async function ec(r,{queryParams:e}={}){var i;document.title="Policies & Guidelines | AI Tools Store";const t=((i=e==null?void 0:e.get)==null?void 0:i.call(e,"tab"))||"rules";r.innerHTML=`
    ${xe("/policy")}

    <main class="main-content container policy-page fade-in">
      <!-- Hero Header -->
      <section class="policy-hero-block">
        <span class="badge badge-popular" style="margin-bottom: 0.8rem;">Transparency & Trust</span>
        <h1>Official <span class="text-gradient-ai">Store Policies</span></h1>
        <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-secondary); max-width: 680px; margin: 0 auto;">
          Clear, fair, and friendly standards designed to guarantee instant activations, verified software licenses, and smooth customer experiences.
        </p>
      </section>

      <!-- Main Layout: Sidebar on Left, Content Area on Right -->
      <div class="policy-layout">
        <!-- Left Sidebar Navigation -->
        <aside class="policy-sidebar">
          <div class="policy-sidebar-inner glass-panel">
            <div class="policy-sidebar-header">
              <span class="policy-sidebar-title">Policy Directory</span>
              <span class="policy-sidebar-badge">3 Topics</span>
            </div>

            <nav class="policy-nav-tabs" role="tablist">
              <button 
                type="button" 
                class="policy-tab-btn ${t==="rules"?"active":""}" 
                data-tab="rules"
                role="tab"
                aria-selected="${t==="rules"?"true":"false"}"
              >
                <div class="policy-tab-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div class="policy-tab-meta">
                  <span class="policy-tab-title">1. Rules & Regulations</span>
                  <span class="policy-tab-desc">Fixed pricing & customer guidelines</span>
                </div>
                <div class="policy-tab-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </button>

              <button 
                type="button" 
                class="policy-tab-btn ${t==="refund"?"active":""}" 
                data-tab="refund"
                role="tab"
                aria-selected="${t==="refund"?"true":"false"}"
              >
                <div class="policy-tab-icon" style="background: rgba(244, 63, 94, 0.12); color: #fb7185; border-color: rgba(244, 63, 94, 0.25);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                  </svg>
                </div>
                <div class="policy-tab-meta">
                  <span class="policy-tab-title">2. Refund Policy</span>
                  <span class="policy-tab-desc">Digital licenses & replacement criteria</span>
                </div>
                <div class="policy-tab-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </button>

              <button 
                type="button" 
                class="policy-tab-btn ${t==="activation"?"active":""}" 
                data-tab="activation"
                role="tab"
                aria-selected="${t==="activation"?"true":"false"}"
              >
                <div class="policy-tab-icon" style="background: rgba(16, 185, 129, 0.12); color: #34d399; border-color: rgba(16, 185, 129, 0.25);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <div class="policy-tab-meta">
                  <span class="policy-tab-title">3. Activation Procedure</span>
                  <span class="policy-tab-desc">Reference video & setup compliance</span>
                </div>
                <div class="policy-tab-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </button>
            </nav>

            <!-- Quick WhatsApp Concierge Card in Sidebar -->
            <div class="policy-sidebar-help">
              <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-pure); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
                <span style="font-size: 1rem;">💬</span> Need Policy Clarification?
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
                Our WhatsApp team is available 24/7 to answer onboarding or license queries.
              </p>
              <a href="${Ee}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav" style="width: 100%; justify-content: center; font-size: 0.78rem; padding: 0.45rem 0.75rem;">
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>

        <!-- Right Content Details Area -->
        <section class="policy-content-area" id="policy-content-area">
          ${la(t)}
        </section>
      </div>

      <!-- Bottom WhatsApp Community Banner -->
      ${mi()}
    </main>

    ${_e()}
  `,Se(),nc()}function la(r){switch(r){case"refund":return rc();case"activation":return ic();case"rules":default:return tc()}}function tc(){return`
    <article class="policy-panel glass-panel fade-in" id="panel-rules">
      <div class="policy-panel-header">
        <div class="policy-badge-row">
          <span class="policy-pill-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            Section 1
          </span>
          <span class="policy-pill-badge" style="background: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3);">
            Fixed Pricing & Guidelines
          </span>
        </div>
        <h2 class="policy-panel-title">Rules & Regulations</h2>
        <p class="policy-panel-subtitle">
          Essential standards on our fixed pricing structure, support etiquette, and fair usage guidelines.
        </p>
      </div>

      <!-- Friendly Notice Banner -->
      <div class="policy-alert-box policy-alert-cyan">
        <div class="policy-alert-icon">💡</div>
        <div class="policy-alert-body">
          <strong>A Friendly Note for Our Valued Customers:</strong>
          <p>
            We take pride in delivering premium AI software licenses at industry-leading low rates. Our prices are benchmarked to be as low as humanly possible while sustaining verified premium accounts and 24/7 concierge assistance.
          </p>
        </div>
      </div>

      <!-- Policy Detail Cards -->
      <div class="policy-cards-stack">
        <!-- 1. Strictly Fixed Pricing -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee;">
              🏷️
            </div>
            <div>
              <h3 class="policy-card-title">1. Transparent & 100% Fixed Pricing</h3>
              <span class="policy-card-tag">Strict Company Policy</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Every price listed on the AI Tools Store website is strictly <strong>fixed, finalized, and standardized</strong>. There are no hidden fees, unexpected subscription renewal spikes, or arbitrary markups.
            </p>
            <div class="policy-highlight-box">
              <span class="highlight-title">No Price Bargaining or Arguments Needed:</span>
              <p>
                Our customer support agents and WhatsApp concierge team work under rigid pricing automation. <strong>They have zero authority to negotiate, lower, or alter tool prices for individual requests.</strong>
              </p>
              <p style="margin-top: 0.5rem;">
                We kindly request you <strong>not to engage in price debates or bargaining</strong> with our team members. This friendly understanding saves your valuable time and lets our engineers focus on swift activation and setup.
              </p>
            </div>
          </div>
        </div>

        <!-- 2. Looking for Discounts? -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(249, 115, 22, 0.15); color: #fb923c;">
              🔥
            </div>
            <div>
              <h3 class="policy-card-title">2. Official Offers & Hot Deals</h3>
              <span class="policy-card-tag">Special Promotions</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              If you want special discounts or bundle promotions, please explore our dedicated <a href="#/deals" style="color: var(--accent-cyan); text-decoration: underline; font-weight: 700;">Hot Deals</a> section!
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              Whenever discounts, seasonal sales, or <strong>Buy 1 Get 1</strong> packages are active, they are automatically published directly on the store with pre-applied rates. No negotiation is ever required.
            </p>
          </div>
        </div>

        <!-- 3. Courteous Communication -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">
              🤝
            </div>
            <div>
              <h3 class="policy-card-title">3. Respectful & Friendly Community Ethics</h3>
              <span class="policy-card-tag">Mutual Respect</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Our support team strives to assist you with patience, speed, and diligence. We treat every single customer with the utmost courtesy and expect the same friendly, professional respect in return across WhatsApp, email, and live chats.
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              Inappropriate language, aggressive behavior, or repetitive harassment regarding fixed prices will result in immediate termination of the support conversation and potential account suspension.
            </p>
          </div>
        </div>

        <!-- 4. Single-User License Integrity -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              🛡️
            </div>
            <div>
              <h3 class="policy-card-title">4. License Integrity & Fair Usage</h3>
              <span class="policy-card-tag">Security & Compliance</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Each account or software key provided is strictly for the licensed customer or team size specified during purchase. Reselling, sub-leasing, public credential leaks, or abusing shared server quotas is strictly prohibited and results in immediate automated forfeiture without refund.
            </p>
          </div>
        </div>
      </div>
    </article>
  `}function rc(){return`
    <article class="policy-panel glass-panel fade-in" id="panel-refund">
      <div class="policy-panel-header">
        <div class="policy-badge-row">
          <span class="policy-pill-badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3);">
            Section 2
          </span>
          <span class="policy-pill-badge" style="background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.3);">
            Digital Products & Eligibility
          </span>
        </div>
        <h2 class="policy-panel-title">Refund & Replacement Policy</h2>
        <p class="policy-panel-subtitle">
          Comprehensive explanation on digital goods, subscription activations, and replacement terms.
        </p>
      </div>

      <!-- Critical Notice Box -->
      <div class="policy-alert-box policy-alert-amber">
        <div class="policy-alert-icon">⚠️</div>
        <div class="policy-alert-body">
          <strong>Important Industry Standard Notice:</strong>
          <p>
            All subscriptions, software licenses, account credentials, and API access sold on AI Tools Store are <strong>digital products</strong>, not physical merchandise. Please review the terms below before completing your purchase.
          </p>
        </div>
      </div>

      <div class="policy-cards-stack">
        <!-- 1. Nature of Digital Products -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">
              ⚡
            </div>
            <div>
              <h3 class="policy-card-title">1. No Returns After Successful Activation</h3>
              <span class="policy-card-tag">Digital Asset Rule</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Once your tool subscription has been provisioned and <strong>activated on your account or device</strong>, the digital license is immediately consumed and registered with the service provider.
            </p>
            <div class="policy-highlight-box" style="border-left-color: #f43f5e;">
              <span class="highlight-title" style="color: #fb7185;">Non-Returnable Nature of Activated Subscriptions:</span>
              <p>
                Unlike a physical item that can be placed back in a box, <strong>an activated digital tool cannot be re-activated or returned to reverse the upstream licensing cost</strong>. Therefore, once working access is delivered, payments cannot be returned or refunded simply due to change of mind.
              </p>
            </div>
          </div>
        </div>

        <!-- 2. When Replacement or Refund IS Granted -->
        <div class="policy-card" style="border-color: rgba(16, 185, 129, 0.35);">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              ✅
            </div>
            <div>
              <h3 class="policy-card-title" style="color: #34d399;">2. When You ARE Eligible for a Replacement or Refund</h3>
              <span class="policy-card-tag" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">Guaranteed Protection</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              We firmly stand behind the quality of our offerings. You are 100% entitled to a <strong>free replacement tool or refund</strong> under the following mandatory criteria:
            </p>
            
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div class="policy-check-item">
                <span class="check-icon">✓</span>
                <div>
                  <strong>Strict Compliance with Tool Description:</strong> You have carefully read and followed all prerequisites, instructions, and usage limitations explicitly detailed in the tool's product description.
                </div>
              </div>

              <div class="policy-check-item">
                <span class="check-icon">✓</span>
                <div>
                  <strong>Verified Service Disruption or Invalid Credential:</strong> If the tool ceases functioning, credentials fail authentication, or an unexpected server lock occurs that our technical support team <strong>cannot resolve within our SLA (24–48 hours)</strong>.
                </div>
              </div>

              <div class="policy-check-item">
                <span class="check-icon">✓</span>
                <div>
                  <strong>Prompt Reporting:</strong> The issue was reported to our WhatsApp concierge team within your active warranty window alongside relevant screenshots or error logs.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Ineligible Scenarios -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185;">
              ❌
            </div>
            <div>
              <h3 class="policy-card-title">3. Ineligible Scenarios (Void Warranty)</h3>
              <span class="policy-card-tag">Exclusions</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              Refunds, cancellations, or free replacements will <strong>NOT</strong> be issued under any of the following conditions:
            </p>
            <ul class="policy-bullet-list">
              <li>You purchased the subscription but decided you no longer want or need it after credentials were dispatched.</li>
              <li>You failed to read the tool requirements, compatibility notes, or VPN requirements written in the description below the tool.</li>
              <li>You disregarded the official onboarding reference video and attempted an unauthorized setup.</li>
              <li>You altered account passwords, modified recovery emails, or attempted multi-person sharing contrary to the tool's rules.</li>
              <li>Your personal internet connection, local ISP block, or personal computer hardware does not meet minimum application requirements.</li>
            </ul>
          </div>
        </div>

        <!-- 4. How to Claim -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              📩
            </div>
            <div>
              <h3 class="policy-card-title">4. How to Request Replacement Assistance</h3>
              <span class="policy-card-tag">Quick Support</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              If your tool meets the eligibility criteria above, message our WhatsApp support team with:
            </p>
            <div style="background: rgba(15, 23, 42, 0.7); padding: 0.85rem 1rem; border-radius: 8px; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.82rem; color: #cbd5e1; border: 1px solid var(--border-glass);">
              1. Your Registered Email or WhatsApp Phone Number<br/>
              2. Name of the Purchased AI Tool<br/>
              3. Screenshot of the issue showing full screen & error message<br/>
              4. Confirmation that the description guidelines were followed
            </div>
          </div>
        </div>
      </div>
    </article>
  `}function ic(){return`
    <article class="policy-panel glass-panel fade-in" id="panel-activation">
      <div class="policy-panel-header">
        <div class="policy-badge-row">
          <span class="policy-pill-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
            Section 3
          </span>
          <span class="policy-pill-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            Setup & Reference Guide
          </span>
        </div>
        <h2 class="policy-panel-title">Active Procedure & Setup Compliance</h2>
        <p class="policy-panel-subtitle">
          Follow the mandatory reference video and step guides to ensure permanent, uninterrupted access.
        </p>
      </div>

      <!-- Compliance Notice Box -->
      <div class="policy-alert-box policy-alert-cyan">
        <div class="policy-alert-icon">🎥</div>
        <div class="policy-alert-body">
          <strong>Mandatory Reference Video Included with Every Tool:</strong>
          <p>
            To prevent account lockouts and protect your subscription, <strong>every tool page includes an official walkthrough video tutorial and step description</strong>. Watching this video is a mandatory prerequisite for activation.
          </p>
        </div>
      </div>

      <div class="policy-cards-stack">
        <!-- 1. The Reference Video Protocol -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              ▶️
            </div>
            <div>
              <h3 class="policy-card-title">1. Watch the Reference Video Step-by-Step</h3>
              <span class="policy-card-tag">Mandatory Step</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              When you purchase or inspect any tool on AI Tools Store, scroll down to the <strong>"How to Use & Tutorial"</strong> tab. There you will find a dedicated reference video and detailed sequential guide.
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              This reference video visually walks you through every click: from accessing the verified portal, inserting session credentials or keys, to managing your workspace safely without triggering security locks.
            </p>
          </div>
        </div>

        <!-- 2. Customer Responsibility & Service Loss Disclaimer -->
        <div class="policy-card" style="border-color: rgba(244, 63, 94, 0.4);">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185;">
              ⚠️
            </div>
            <div>
              <h3 class="policy-card-title" style="color: #fb7185;">2. Strict Compliance & Loss of Service Disclaimer</h3>
              <span class="policy-card-tag" style="background: rgba(244, 63, 94, 0.15); color: #fb7185;">Important Disclaimer</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              You must activate your account <strong>strictly by following the provided reference video and instructions</strong>.
            </p>
            
            <div class="policy-highlight-box" style="border-left-color: #f43f5e; background: rgba(244, 63, 94, 0.08);">
              <span class="highlight-title" style="color: #fda4af;">Company Not Responsible If You Act Independently:</span>
              <p>
                <strong>If you act upon your own discretion</strong>—such as altering security settings, changing master passwords, modifying linked recovery email addresses, logging in from untrusted automated scrapers, or skipping the video guide—<strong>the company (AI Tools Store) will NOT be held responsible for any loss of service, account ban, or license termination.</strong>
              </p>
              <p style="margin-top: 0.5rem; font-weight: 600; color: #fecdd3;">
                Any loss of service arising from willful disregard of the official reference video voids all replacement and refund guarantees immediately.
              </p>
            </div>
          </div>
        </div>

        <!-- 3. Unsure of Anything? Ask Support Before Trying -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              💬
            </div>
            <div>
              <h3 class="policy-card-title">3. Unsure? Ask Concierge Before Modifying Anything</h3>
              <span class="policy-card-tag">Safe Path</span>
            </div>
          </div>
          <div class="policy-card-body">
            <p>
              If a screen looks unfamiliar, a prompt asks for a code you don't recognize, or you feel confused at any moment during the video tutorial, <strong>DO NOT guess or experiment on your own</strong>.
            </p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
              Simply take a screenshot, pause your screen, and message our WhatsApp Concierge. Our specialists will guide you through the exact button to click within minutes.
            </p>
          </div>
        </div>

        <!-- 4. Step-by-Step Activation Checklist -->
        <div class="policy-card">
          <div class="policy-card-header">
            <div class="policy-card-icon-badge" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">
              📋
            </div>
            <div>
              <h3 class="policy-card-title">4. Quick 4-Step Activation Checklist</h3>
              <span class="policy-card-tag">Standard Workflow</span>
            </div>
          </div>
          <div class="policy-card-body">
            <ol class="policy-num-list">
              <li>
                <strong>Inspect Tool Details:</strong> Read the prerequisite system requirements and usage guidelines on the tool's page.
              </li>
              <li>
                <strong>Watch the Reference Video:</strong> Play the full tutorial video from start to finish before opening the software.
              </li>
              <li>
                <strong>Execute Exactly As Shown:</strong> Copy credentials or extensions accurately as demonstrated in the walkthrough.
              </li>
              <li>
                <strong>Verify & Confirm:</strong> Confirm your workspace is active. If any unexpected error appears, reach out to WhatsApp support immediately.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </article>
  `}function nc(){const r=document.querySelectorAll(".policy-tab-btn"),e=document.getElementById("policy-content-area");r.forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const n=t.getAttribute("data-tab");r.forEach(a=>{a.classList.remove("active"),a.setAttribute("aria-selected","false")}),t.classList.add("active"),t.setAttribute("aria-selected","true"),e&&(e.innerHTML=la(n),window.innerWidth<900&&e.scrollIntoView({behavior:"smooth",block:"start"}));try{const a=new URL(window.location.href);a.hash=`#/policy?tab=${n}`,window.history.replaceState(null,"",a.toString())}catch{}})})}async function ac(r,{queryParams:e}){document.title=`🔥 Hot Deals & BOGO Offers | ${g("nav.brand")}`;let t=await V.getHotDeals(),i=H.getUserCountry()||"Pakistan",n="All",a="";const s=["All",...new Set(t.map(f=>f.category||"Hot Deals").filter(Boolean))];function o(f){return!f||f.length===0?`
        <div class="empty-state-container" style="text-align: center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-glass); border-radius: 16px; margin: 2rem 0;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔥</div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); margin-bottom: 0.5rem; font-weight: 700;">No Hot Deals Found</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.5rem auto; font-size: 0.95rem;">
            No promotions match your current search or category filter. Check back soon for fresh BOGO drops!
          </p>
          <button id="btn-reset-deals-filters" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.6rem 1.5rem;">
            Reset Filters
          </button>
        </div>
      `:`
      <div class="hot-deals-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 1.85rem; margin-top: 1.75rem;">
        ${f.map(v=>{const y=Tr(v,i),w=y.discountedPrice,{amount:k,periodHtml:P}=Ar(w,"/mo"),D=v.regularPrice||(y.hasDiscount?y.originalPrice:"PKR 4,999 /mo"),I=v.buyQuantity||1,E=v.freeQuantity||1,K=v.offerLabel||"BUY 1 GET 1 FREE",O=(v.whatsappUrl||"").includes("wa.me")||(v.whatsappUrl||"").includes("whatsapp.com")?v.whatsappUrl:"https://wa.me/923001234567",q=y.hasDiscount?` (${y.discountPercent}% OFF, regular ${y.originalPrice})`:"",S=encodeURIComponent(`🔥 *HOT DEAL ORDER INQUIRY*
• Deal: ${v.name}
• Offer: ${K} (Buy: ${I} | Get Free: ${E})
• Validity / Duration: ${v.duration||"1 Month"}
• Price: ${w}${q}
• Region: ${i}

Please share payment details and activate my deal access.`);let j=O;return O.includes("chat.whatsapp.com")||O.includes("/channel/")?j=O:O.includes("?")?j=`${O}&text=${S}`:j=`${O}?text=${S}`,`
            <div class="hot-deal-card" data-deal-id="${v.id}" style="position: relative; background: linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%); border: 1.5px solid rgba(249, 115, 22, 0.35); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(249, 115, 22, 0.25); display: flex; flex-direction: column; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;">
              
              <!-- Fiery Glow Accent Overlay -->
              <div style="position: absolute; top: -40px; right: -40px; width: 140px; height: 140px; background: radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%); pointer-events: none; filter: blur(20px);"></div>
              
              <!-- Top Banner & Image -->
              <div style="position: relative; height: 180px; overflow: hidden; background: #0b1120;">
                <img 
                  src="${v.image||"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"}" 
                  alt="${v.name}" 
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
                  loading="lazy"
                  onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';"
                />
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%);"></div>
                
                <!-- Main Offer & Validity Badges -->
                <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  <span class="badge" style="background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; font-weight: 800; font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 999px; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.5); letter-spacing: 0.02em;">
                    🔥 ${K}
                  </span>
                  <span class="badge" style="background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.5); font-weight: 800; font-size: 0.75rem; padding: 0.3rem 0.7rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>⏳</span> <span>${v.duration||"1 Month"}</span>
                  </span>
                </div>

                <!-- Stock Scarcity Tag -->
                <div style="position: absolute; bottom: 10px; right: 12px;">
                  <span style="font-size: 0.72rem; color: #fde047; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); padding: 0.25rem 0.6rem; border-radius: 6px; border: 1px solid rgba(253, 224, 71, 0.3); font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>⚡</span> <span>${v.stockLeft||"Limited slots left"}</span>
                  </span>
                </div>
              </div>

              <!-- Deal Body -->
              <div style="padding: 1.35rem 1.35rem 1.25rem 1.35rem; display: flex; flex-direction: column; flex: 1;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.75rem; color: #fb923c; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                    ${v.category||"Special Promotion"}
                  </span>
                  <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: #fbbf24; font-weight: 700;">
                    <span>★</span>
                    <span>${v.rating?v.rating.toFixed(1):"4.9"}</span>
                  </div>
                </div>

                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-pure); margin: 0 0 0.5rem 0; line-height: 1.35;">
                  ${v.name}
                </h3>

                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${v.shortDescription||v.description||"Exclusive bundle offer with bonus free tools and instant WhatsApp activation."}
                </p>

                <!-- BUY X GET Y FREE QUANTITY BREAKDOWN BOX -->
                <div style="background: rgba(15, 23, 42, 0.8); border: 1px dashed rgba(249, 115, 22, 0.4); border-radius: 12px; padding: 0.85rem; margin-bottom: 1.15rem;">
                  <div style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.5rem; text-align: center;">
                    <div style="background: rgba(30, 41, 59, 0.6); padding: 0.5rem 0.25rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.06);">
                      <div style="font-size: 0.65rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">YOU BUY</div>
                      <div style="font-size: 0.95rem; font-weight: 800; color: #38bdf8; margin-top: 0.15rem;">
                        ${I} Qty
                      </div>
                    </div>

                    <div style="font-size: 1.1rem; font-weight: 800; color: #f97316;">+</div>

                    <div style="background: rgba(239, 68, 68, 0.12); padding: 0.5rem 0.25rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.35);">
                      <div style="font-size: 0.65rem; color: #fca5a5; font-weight: 800; text-transform: uppercase;">YOU GET FREE</div>
                      <div style="font-size: 0.95rem; font-weight: 800; color: #ef4444; margin-top: 0.15rem;">
                        ${E} FREE 🎁
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Price Row -->
                <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1.1rem;">
                  <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block; text-transform: uppercase; font-weight: 600;">
                      ${y.hasDiscount?`<span style="color: #f87171; font-weight: 800;">🔥 ${y.discountPercent}% OFF:</span>`:"Promo Price:"}
                    </span>
                    <div style="display: flex; align-items: baseline; gap: 0.4rem;">
                      <span style="font-size: 1.35rem; font-weight: 900; color: #34d399; letter-spacing: -0.02em;">
                        ${k}
                      </span>
                      <span style="font-size: 0.78rem; color: var(--text-muted);">${P||""}</span>
                    </div>
                  </div>

                  <div style="text-align: right;">
                    <span style="font-size: 0.68rem; color: var(--text-muted); display: block; text-transform: uppercase;">
                      ${y.hasDiscount?"Before Discount:":"Regular Value:"}
                    </span>
                    <span style="font-size: 0.88rem; color: #94a3b8; text-decoration: line-through; font-weight: 600;">
                      ${y.hasDiscount?y.originalAmount:D}
                    </span>
                  </div>
                </div>

                <!-- Action Button: Claim Deal on WhatsApp -->
                <a 
                  href="${j}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-primary btn-claim-deal"
                  style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.8rem 1.25rem; font-size: 0.92rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #10b981, #059669); border: none; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35); text-decoration: none; color: #ffffff; transition: transform 0.2s ease, box-shadow 0.2s ease;"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
                  </svg>
                  <span>Claim Deal on WhatsApp</span>
                </a>
              </div>
            </div>
          `}).join("")}
      </div>
    `}function l(){let f=[...t];if(n&&n!=="All"&&(f=f.filter(v=>(v.category||"").toLowerCase()===n.toLowerCase())),a.trim()){const v=a.toLowerCase().trim();f=f.filter(y=>(y.name||"").toLowerCase().includes(v)||(y.shortDescription||"").toLowerCase().includes(v)||(y.offerLabel||"").toLowerCase().includes(v)||(y.category||"").toLowerCase().includes(v))}return f}r.innerHTML=`
    ${xe("/deals")}

    <main class="main-content container hot-deals-page fade-in" style="padding-top: 2rem; padding-bottom: 5rem;">
      <!-- Hero Header -->
      <header class="marketplace-header" style="text-align: center; max-width: 800px; margin: 0 auto 2.5rem auto;">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.2)); border: 1px solid rgba(249, 115, 22, 0.4); padding: 0.35rem 1rem; border-radius: 999px; margin-bottom: 1rem;">
          <span style="font-size: 1.1rem; filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8));">🔥</span>
          <span style="font-size: 0.82rem; font-weight: 800; color: #fb923c; text-transform: uppercase; letter-spacing: 0.05em;">
            Limited-Time Promotional Drops & BOGO
          </span>
        </div>
        
        <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; letter-spacing: -0.02em; color: var(--text-pure); margin-bottom: 0.85rem; line-height: 1.2;">
          Exclusive <span style="background: linear-gradient(135deg, #f97316 0%, #ef4444 50%, #f43f5e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Hot Deals</span> & Combos
        </h1>
        
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
          Unlock Buy 1 Get 1 Free subscriptions, combo packs, and special multi-tool discounts. Each deal is activated instantly with 24/7 dedicated replacement warranty.
        </p>
      </header>

      <!-- Search & Filters -->
      <section class="marketplace-controls" style="margin-bottom: 2rem;">
        <div class="controls-top-row">
          <div class="search-input-wrap" style="flex: 1; max-width: 480px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              id="deals-search-input" 
              placeholder="Search deals by tool name or offer..." 
              value="${a}"
              class="search-input-field"
            />
          </div>

          <div style="font-size: 0.88rem; color: var(--text-muted);">
            Active Offers: <strong id="deals-counter" style="color: #fb923c;">${t.length}</strong>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="filter-chips-row" id="deals-category-chips" style="margin-top: 1rem;">
          ${s.map(f=>`
            <button class="filter-chip ${n===f?"active":""}" data-category="${f}">
              ${f==="All"?"🔥 All Offers":f}
            </button>
          `).join("")}
        </div>
      </section>

      <!-- Deals Grid Container -->
      <div id="hot-deals-container">
        ${o(t)}
      </div>
    </main>

    ${_e()}
  `,Se();const c=r.querySelector("#deals-search-input"),d=r.querySelector("#hot-deals-container"),u=r.querySelector("#deals-counter");function p(){const f=l();d&&(d.innerHTML=o(f)),u&&(u.textContent=f.length),m()}c&&c.addEventListener("input",f=>{a=f.target.value,p()});const h=r.querySelector("#deals-category-chips");h&&h.addEventListener("click",f=>{const v=f.target.closest(".filter-chip");v&&(h.querySelectorAll(".filter-chip").forEach(y=>y.classList.remove("active")),v.classList.add("active"),n=v.dataset.category||"All",p())});function m(){const f=r.querySelector("#btn-reset-deals-filters");f&&f.addEventListener("click",()=>{a="",n="All",c&&(c.value=""),h&&h.querySelectorAll(".filter-chip").forEach(v=>{v.classList.toggle("active",v.dataset.category==="All")}),p()})}if(m(),window._publicDealsRealtimeUnsub)try{window._publicDealsRealtimeUnsub()}catch{}window._publicDealsRealtimeUnsub=V.subscribeToHotDeals(async()=>{try{t=await V.getHotDeals(),p()}catch{}})}async function sc(r){document.title=`🚀 Upcoming AI Tools & New Releases | ${g("nav.brand")}`;let e=[];try{e=await V.getUpcomingTools()}catch(s){console.warn("[UpcomingToolsPage] Load warning:",s),e=[]}let t="";function i(){if(!t.trim())return e;const s=t.toLowerCase().trim();return e.filter(o=>{const l=(o.title||"").toLowerCase(),c=(o.description||"").toLowerCase();return l.includes(s)||c.includes(s)})}function n(s){return!s||s.length===0?`
        <div class="empty-state-container" style="text-align: center; padding: 4.5rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-glass); border-radius: 20px; margin: 2rem 0; box-shadow: var(--shadow-card);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem; filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.4));">🚀</div>
          <h3 style="font-size: 1.45rem; color: var(--text-pure); margin-bottom: 0.5rem; font-weight: 700;">No Upcoming Tools Found</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem auto; font-size: 0.95rem; line-height: 1.6;">
            We are curating next-generation AI tools to release soon. Check back shortly or join our WhatsApp VIP community for instant release drops!
          </p>
          <a href="${Ee}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.75rem 1.75rem;">
            Join VIP WhatsApp Drop Channel
          </a>
        </div>
      `:`
      <div class="upcoming-tools-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem; margin-top: 2rem;">
        ${s.map(o=>{const l="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",c=o.image&&o.image.trim()?o.image.trim():l,d=o.badge||"🚀 UPCOMING",u=o.expectedDate||"Coming Soon",p=encodeURIComponent(`🚀 *UPCOMING AI TOOL INQUIRY*
• Tool: ${o.title}
• Status: ${u}
Please notify me when this tool becomes available for purchase or preorder!`);let h=Ee||"https://wa.me/923001234567";return h.includes("chat.whatsapp.com")||h.includes("/channel/")||(h.includes("?")?h=`${h}&text=${p}`:h=`${h}?text=${p}`),`
            <div class="upcoming-tool-card" data-id="${o.id}" style="position: relative; background: linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(10, 15, 30, 0.98) 100%); border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(56, 189, 248, 0.2); display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
              
              <!-- Subtle Cyber Neon Overlay -->
              <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%); pointer-events: none; filter: blur(25px);"></div>
              
              <!-- Picture / Media Banner Container -->
              <div style="position: relative; height: 210px; overflow: hidden; background: #060d1a;">
                <img 
                  src="${c}" 
                  alt="${o.title}" 
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
                  loading="lazy"
                  onerror="this.src='${l}';"
                  class="upcoming-card-img"
                />
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(10, 15, 30, 0.98) 0%, rgba(10, 15, 30, 0.4) 50%, transparent 100%);"></div>
                
                <!-- Badge Tag -->
                <div style="position: absolute; top: 14px; left: 14px; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <span class="badge" style="background: linear-gradient(135deg, #0284c7, #38bdf8); color: #ffffff; font-weight: 800; font-size: 0.75rem; padding: 0.32rem 0.8rem; border-radius: 999px; box-shadow: 0 4px 12px rgba(56, 189, 248, 0.45); letter-spacing: 0.03em;">
                    ${d}
                  </span>
                  <span class="badge" style="background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); font-weight: 700; font-size: 0.75rem; padding: 0.32rem 0.75rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>⏳</span> <span>${u}</span>
                  </span>
                </div>
              </div>

              <!-- Content Body -->
              <div style="padding: 1.6rem 1.6rem 1.4rem 1.6rem; flex: 1; display: flex; flex-direction: column;">
                <!-- Title -->
                <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-pure); margin-bottom: 0.75rem; line-height: 1.35; letter-spacing: -0.01em;">
                  ${o.title}
                </h3>

                <!-- Description -->
                <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.65; margin-bottom: 1.5rem; flex: 1; white-space: pre-line;">
                  ${o.description||"Exclusive upcoming tool joining the AI Tools Store catalog very soon."}
                </p>

                <!-- Action Button: Early Access / Notify Me -->
                <div style="padding-top: 1rem; border-top: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: space-between; gap: 0.85rem;">
                  <span style="font-size: 0.78rem; color: #38bdf8; font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></span>
                    In Pre-Launch Pipeline
                  </span>

                  <a 
                    href="${h}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn-upcoming-notify" 
                    style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.55rem 1.15rem; border-radius: 12px; background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.2)); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-weight: 700; font-size: 0.82rem; text-decoration: none; transition: all 0.2s ease;"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                    </svg>
                    <span>Notify Me</span>
                  </a>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `}function a(){const s=i();r.innerHTML=`
      ${xe("/upcoming")}

      <main class="main-content container upcoming-page fade-in" style="padding-top: 2rem; padding-bottom: 4rem;">
        
        <!-- Hero Header -->
        <div class="deals-hero-section" style="position: relative; text-align: center; padding: 3rem 1.5rem 2.5rem 1.5rem; background: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.5) 75%); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 28px; margin-bottom: 2.5rem; overflow: hidden; box-shadow: 0 15px 40px -15px rgba(56, 189, 248, 0.25);">
          
          <div style="position: absolute; top: -70px; left: 50%; transform: translateX(-50%); width: 450px; height: 180px; background: radial-gradient(ellipse, rgba(56, 189, 248, 0.3) 0%, transparent 70%); filter: blur(40px); pointer-events: none;"></div>

          <div style="display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.4rem 1rem; border-radius: 999px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); margin-bottom: 1.25rem;">
            <span style="font-size: 1.1rem;">🚀</span>
            <span style="font-size: 0.82rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em;">Roadmap & Pre-Launches</span>
          </div>

          <h1 style="font-size: 2.6rem; font-weight: 900; color: var(--text-pure); margin-bottom: 0.85rem; letter-spacing: -0.02em;">
            Upcoming <span style="background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI Tools</span>
          </h1>

          <p style="max-width: 620px; margin: 0 auto 1.75rem auto; color: var(--text-secondary); font-size: 1.05rem; line-height: 1.65;">
            Get a sneak peek at revolutionary AI tools landing soon. Reserve early access, pre-order member slots, or request notification right before launch.
          </p>

          <!-- Search Filter Bar -->
          <div style="max-width: 500px; margin: 0 auto; position: relative;">
            <input 
              type="text" 
              id="upcoming-search-input" 
              placeholder="Search upcoming AI tools..." 
              value="${t}" 
              style="width: 100%; padding: 0.85rem 1.25rem 0.85rem 2.85rem; border-radius: 999px; background: rgba(15, 23, 42, 0.8); border: 1.5px solid rgba(56, 189, 248, 0.35); color: var(--text-pure); font-size: 0.95rem; outline: none; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);"
            />
            <svg style="position: absolute; left: 1.15rem; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: var(--accent-cyan);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        <!-- Upcoming Tools Grid Container -->
        <div id="upcoming-grid-wrap">
          ${n(s)}
        </div>

      </main>

      ${_e()}
    `,Se();const o=document.getElementById("upcoming-search-input");o&&(o.oninput=l=>{t=l.target.value;const c=document.getElementById("upcoming-grid-wrap");c&&(c.innerHTML=n(i()))})}a()}function ca(r){return!r||r.length===0?`
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">🚀</div>
        <p style="font-weight: 700; color: var(--text-pure); font-size: 1.1rem;">No upcoming tools scheduled yet.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Click "+ Add Upcoming Tool" to publish an upcoming tool with Picture, Title, and Description.</p>
      </div>
    `:`
    <table class="admin-table">
      <thead>
        <tr>
          <th style="width: 75px;">Picture</th>
          <th>Tool Title</th>
          <th>Description Preview</th>
          <th>Expected Date / Badge</th>
          <th>Visibility</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(e=>{const t="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";return`
            <tr>
              <td>
                <div style="width: 58px; height: 44px; border-radius: 8px; overflow: hidden; background: #070d18; border: 1px solid rgba(56, 189, 248, 0.4);">
                  <img src="${e.image&&e.image.trim()?e.image.trim():t}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${t}';" />
                </div>
              </td>
              <td>
                <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                  <strong style="color: var(--text-pure); font-size: 0.95rem;">${e.title}</strong>
                  <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">slug: ${e.slug||"auto"}</span>
                </div>
              </td>
              <td style="max-width: 320px;">
                <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${e.description||"No description added yet."}
                </p>
              </td>
              <td>
                <div style="display: flex; flex-direction: column; gap: 0.3rem; align-items: flex-start;">
                  <span class="badge" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.25), rgba(56, 189, 248, 0.3)); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.45); font-weight: 800; font-size: 0.72rem; padding: 0.2rem 0.55rem;">
                    ${e.badge||"🚀 UPCOMING"}
                  </span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">
                    ⏳ ${e.expectedDate||"Coming Soon"}
                  </span>
                </div>
              </td>
              <td>
                <button 
                  type="button"
                  class="badge toggle-upcoming-active-btn" 
                  data-id="${e.id}" 
                  data-active="${!!e.active}"
                  style="cursor: pointer; border: none; ${e.active?"background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35);":"background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.35);"}"
                  title="Click to toggle upcoming tool active status"
                >
                  ${e.active?"● Active":"○ Inactive"}
                </button>
              </td>
              <td>
                <div style="display: flex; gap: 0.4rem;">
                  <a href="#/upcoming" class="btn-details" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="Preview on /upcoming">Preview</a>
                  <button type="button" class="btn-details edit-upcoming-btn" data-id="${e.id}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: var(--accent-cyan);" title="Edit upcoming tool">Edit</button>
                  <button type="button" class="btn-details delete-upcoming-btn" data-id="${e.id}" data-title="${e.title}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #f87171;" title="Delete upcoming tool">Delete</button>
                </div>
              </td>
            </tr>
          `}).join("")}
      </tbody>
    </table>
  `}function da(r,e,t){document.querySelectorAll(".toggle-upcoming-active-btn").forEach(a=>{a.onclick=async()=>{const s=a.dataset.id,l=!(a.dataset.active==="true");try{await V.adminToggleUpcomingToolActive(s,l),_(`Upcoming tool visibility: ${l?"Active":"Inactive"}`,"success"),typeof t=="function"&&t("upcoming")}catch(c){_(`Error: ${c.message}`,"error")}}}),document.querySelectorAll(".edit-upcoming-btn").forEach(a=>{a.onclick=()=>{const s=a.dataset.id,o=r.find(l=>l.id===s);o&&si(o,e,t)}}),document.querySelectorAll(".delete-upcoming-btn").forEach(a=>{a.onclick=async()=>{const s=a.dataset.id,o=a.dataset.title;if(confirm(`Are you sure you want to delete upcoming tool "${o}"?`))try{await V.adminDeleteUpcomingTool(s),_(`Deleted upcoming tool "${o}".`,"success"),typeof t=="function"&&t("upcoming")}catch(l){_(`Error deleting: ${l.message}`,"error")}}});const i=document.getElementById("upcoming-admin-search-input");i&&(i.oninput=()=>{const a=(i.value||"").toLowerCase().trim(),s=r.filter(c=>!a||(c.title||"").toLowerCase().includes(a)||(c.description||"").toLowerCase().includes(a)),o=document.getElementById("admin-upcoming-table-container"),l=document.getElementById("upcoming-admin-count-badge");l&&(l.textContent=s.length),o&&(o.innerHTML=ca(s),da(s,e,t))});const n=document.getElementById("admin-add-upcoming-btn");n&&(n.onclick=()=>si(null,e,t))}function si(r=null,e,t){const i=!!r,n=r||{id:"",title:"",image:"",description:"",expectedDate:"Coming Soon",badge:"🚀 UPCOMING",active:!0},a=document.createElement("div");a.className="modal-backdrop auth-backdrop-fade",a.innerHTML=`
    <div class="modal-card" style="max-width: 680px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-pure); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>🚀</span>
            <span>${i?"Edit Upcoming Tool":"Add New Upcoming Tool"}</span>
          </h2>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.25rem 0 0 0;">
            Share updates on upcoming tools with Picture, Title, and Description.
          </p>
        </div>
        <button type="button" class="btn-modal-close" id="modal-close-upcoming-btn">✕</button>
      </div>

      <form id="upcoming-tool-editor-form">
        <!-- 1. Tool Title -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label" for="upcoming-title" style="font-weight: 700; color: var(--text-pure);">
            Tool Title / Name *
          </label>
          <input 
            type="text" 
            id="upcoming-title" 
            class="form-input" 
            required 
            placeholder="e.g. Sora AI Studio, Claude 3.7 Pro, GPT-5" 
            value="${n.title||""}" 
            style="font-size: 1.05rem; font-weight: 700;"
          />
        </div>

        <!-- 2. Tool Picture / Banner with Live Preview & Upload -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <label class="form-label" for="upcoming-image-url" style="font-weight: 700; color: var(--text-pure); margin: 0;">
              Tool Picture / Image URL *
            </label>
            <span style="font-size: 0.75rem; color: #38bdf8;">Upload file or paste direct image link</span>
          </div>

          <div style="display: flex; gap: 0.6rem; margin-bottom: 0.6rem;">
            <input 
              type="text" 
              id="upcoming-image-url" 
              class="form-input" 
              placeholder="https://images.unsplash.com/... or paste image URL" 
              value="${n.image||""}" 
              style="flex: 1;"
            />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="upcoming-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="upcoming-upload-status" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-bottom: 0.5rem;"></span>

          <!-- Preview Container -->
          <div style="padding: 0.85rem; background: rgba(0,0,0,0.4); border: 1px dashed rgba(56, 189, 248, 0.4); border-radius: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-pure);">Picture Preview:</span>
              <button type="button" id="upcoming-clear-img-btn" class="btn-details" style="color: #f87171; font-size: 0.75rem; display: ${n.image?"inline-block":"none"};">Clear</button>
            </div>
            <div id="upcoming-preview-box" style="width: 100%; height: 160px; border-radius: 10px; overflow: hidden; background: #080e1a; position: relative; display: flex; align-items: center; justify-content: center;">
              <img 
                id="upcoming-img-preview" 
                src="${n.image||"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"}" 
                alt="Preview" 
                style="width: 100%; height: 100%; object-fit: cover; opacity: ${n.image?"1":"0.4"};" 
              />
              <div style="position: absolute; bottom: 8px; left: 8px;" class="badge" id="upcoming-preview-badge">
                ${n.badge||"🚀 UPCOMING"}
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Tool Description -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label" for="upcoming-description" style="font-weight: 700; color: var(--text-pure);">
            Tool Description *
          </label>
          <textarea 
            id="upcoming-description" 
            class="form-textarea" 
            rows="4" 
            required 
            placeholder="Write a clear, compelling description of what this upcoming AI tool does, its key features, and why users should get excited..."
            style="line-height: 1.6;"
          >${n.description||""}</textarea>
        </div>

        <!-- 4. Status Badge & Launch Timing -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label" for="upcoming-expected-date">Expected Launch Status</label>
            <input 
              type="text" 
              id="upcoming-expected-date" 
              class="form-input" 
              value="${n.expectedDate||"Coming Soon"}" 
              placeholder="e.g. Coming Next Month, In Beta Testing"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="upcoming-badge">Badge Label</label>
            <input 
              type="text" 
              id="upcoming-badge" 
              class="form-input" 
              value="${n.badge||"🚀 UPCOMING"}" 
              placeholder="e.g. 🚀 UPCOMING, ✦ IN BETA"
            />
          </div>
        </div>

        <!-- 5. Visibility Checkbox -->
        <div class="form-group" style="margin-bottom: 1.5rem; background: rgba(255,255,255,0.03); padding: 0.85rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; user-select: none;">
            <input type="checkbox" id="upcoming-active" ${n.active!==!1?"checked":""} style="width: 18px; height: 18px; accent-color: var(--accent-cyan);" />
            <div>
              <span style="font-weight: 700; color: var(--text-pure); font-size: 0.92rem;">Active &amp; Published on Storefront</span>
              <p style="margin: 0.15rem 0 0 0; font-size: 0.78rem; color: var(--text-muted);">
                When checked, this upcoming tool is instantly visible on the public Upcoming Tools showcase page.
              </p>
            </div>
          </label>
        </div>

        <!-- Submit & Actions -->
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" class="btn btn-secondary" id="modal-cancel-upcoming-btn">Cancel</button>
          <button type="submit" class="btn btn-primary" id="upcoming-submit-btn" style="background: linear-gradient(135deg, #0284c7, #38bdf8); border: none; font-weight: 700; padding: 0.75rem 1.6rem;">
            ${i?"Save Changes":"Publish Upcoming Tool"}
          </button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(a);const s=()=>{a.classList.add("auth-backdrop-out"),setTimeout(()=>a.remove(),250)};a.onclick=y=>{y.target===a&&s()},document.getElementById("modal-close-upcoming-btn").onclick=s,document.getElementById("modal-cancel-upcoming-btn").onclick=s;const o=document.getElementById("upcoming-image-url"),l=document.getElementById("upcoming-img-preview"),c=document.getElementById("upcoming-clear-img-btn"),d=document.getElementById("upcoming-image-file"),u=document.getElementById("upcoming-upload-status"),p=document.getElementById("upcoming-badge"),h=document.getElementById("upcoming-preview-badge");p&&h&&(p.oninput=()=>{h.textContent=p.value||"🚀 UPCOMING"});const m=y=>{l&&(l.src=y||"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",l.style.opacity=y?"1":"0.4"),c&&(c.style.display=y?"inline-block":"none")};o&&(o.oninput=()=>m(o.value.trim())),c&&(c.onclick=()=>{o.value="",m("")}),d&&(d.onchange=async y=>{const w=y.target.files[0];if(w){u.textContent="Uploading image...",u.style.display="block";try{const k=await ci(w,"logos");o.value=k,m(k),u.textContent="✓ Image uploaded successfully!",u.style.color="var(--accent-mint)"}catch(k){u.textContent=`Upload failed: ${k.message}`,u.style.color="#f87171"}}});const f=document.getElementById("upcoming-tool-editor-form"),v=document.getElementById("upcoming-submit-btn");f.onsubmit=async y=>{y.preventDefault(),v.textContent="Saving...",v.disabled=!0;const w={id:n.id,title:document.getElementById("upcoming-title").value.trim(),image:document.getElementById("upcoming-image-url").value.trim(),description:document.getElementById("upcoming-description").value.trim(),expectedDate:document.getElementById("upcoming-expected-date").value.trim()||"Coming Soon",badge:document.getElementById("upcoming-badge").value.trim()||"🚀 UPCOMING",active:document.getElementById("upcoming-active").checked};try{await V.adminSaveUpcomingTool(w),_(`Upcoming tool "${w.title}" saved successfully!`,"success"),s(),typeof t=="function"&&t("upcoming")}catch(k){_(`Error: ${k.message}`,"error"),v.textContent=i?"Save Changes":"Publish Upcoming Tool",v.disabled=!1}}}function oc(r,e,t,i="Pakistan"){const n=t.globalDiscountActive===!0,a=t.globalDiscountPercent||0;return`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- 1. GLOBAL STOREWIDE DISCOUNT CARD -->
      <div class="admin-table-card" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1.5px solid rgba(239, 68, 68, 0.4); box-shadow: 0 10px 30px -10px rgba(239, 68, 68, 0.3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;">
              <span style="font-size: 1.5rem;">🌐</span>
              <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800; margin: 0;">
                Global Storewide Sale Discount
              </h3>
              <span class="badge" id="global-discount-status-badge" style="${n?"background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); font-weight: 800;":"background: rgba(148, 163, 184, 0.2); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.35);"}">
                ${n?`● LIVE: ${a}% OFF ON ALL PRODUCTS`:"○ Inactive"}
              </span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">
              Apply a universal percentage off to ALL products in the store with one click. When active, all tool cards, details pages, and deals show the discount badge and recalculated price!
            </p>
          </div>
        </div>

        <form id="global-discount-form" style="display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; background: rgba(0,0,0,0.35); padding: 1.25rem; border-radius: 14px; border: 1px dashed rgba(239, 68, 68, 0.35);">
          <label style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer; user-select: none;">
            <input type="checkbox" id="global-discount-toggle" ${n?"checked":""} style="width: 20px; height: 20px; accent-color: #ef4444;" />
            <span style="font-weight: 800; color: var(--text-pure); font-size: 0.98rem;">Enable Global Storewide Discount</span>
          </label>

          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <label for="global-discount-val" style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">Storewide Discount %:</label>
            <input 
              type="number" 
              id="global-discount-val" 
              min="0" 
              max="100" 
              value="${a||20}" 
              style="width: 100px; padding: 0.55rem 0.85rem; border-radius: 8px; background: #070d18; border: 1.5px solid rgba(239, 68, 68, 0.6); color: #f87171; font-weight: 800; font-size: 1.1rem; outline: none; text-align: center;" 
            />
            <span style="font-weight: 800; color: #f87171; font-size: 1.1rem;">% OFF</span>
          </div>

          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="10">10%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="20">20%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="30">30%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="50">50%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="70">70%</button>
          </div>

          <div style="display: flex; gap: 0.6rem; align-items: center; margin-left: auto; flex-wrap: wrap;">
            <button type="submit" id="btn-save-global-discount" class="btn btn-primary" style="background: linear-gradient(135deg, #ef4444, #f97316); border: none; padding: 0.7rem 1.6rem; font-weight: 800; box-shadow: 0 0 20px rgba(239, 68, 68, 0.45);">
              ⚡ Apply &amp; Save to ALL Tools
            </button>
            <button type="button" id="btn-reset-all-discounts" class="btn btn-secondary" style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5; padding: 0.7rem 1.15rem; font-weight: 700;">
              Reset All (0%)
            </button>
          </div>
        </form>
      </div>

      <!-- 2. INDIVIDUAL PRODUCTS DISCOUNT MANAGER -->
      <div class="admin-table-card">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <h3 style="font-size: 1.2rem; color: var(--text-pure); font-weight: 800; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>🎯</span> Individual Product Discount Manager
            </h3>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
              Set custom % off for any specific tool or hot deal. Shows original price, discount input, and live calculated latest price for <strong>${i}</strong>.
            </p>
          </div>

          <div style="display: flex; gap: 0.6rem; align-items: center;">
            <input 
              type="text" 
              id="discount-table-search-input" 
              class="admin-search-input" 
              placeholder="Search by tool name or deal..." 
              style="max-width: 320px;" 
            />
          </div>
        </div>

        <div id="discounts-table-container">
          ${ua(r,e,i,t)}
        </div>
      </div>
    </div>
  `}function ua(r,e,t="Pakistan",i=null,n=""){const a=i||ct(),s=a.globalDiscountActive===!0,o=a.globalDiscountPercent||0,l=[...r.map(u=>({...u,_itemType:"tool"})),...e.map(u=>({...u,_itemType:"deal"}))],c=n.toLowerCase().trim(),d=l.filter(u=>{if(!c)return!0;const p=(u.name||"").toLowerCase(),h=(u.category||"").toLowerCase();return p.includes(c)||h.includes(c)});return d.length===0?`
      <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
        No products match your search query.
      </div>
    `:`
    <table class="admin-table">
      <thead>
        <tr>
          <th style="width: 50px;">Type</th>
          <th>Product Name</th>
          <th>Regular Price (${t})</th>
          <th>Custom Discount (% OFF)</th>
          <th>Effective Status</th>
          <th>Calculated Latest Price</th>
          <th style="width: 140px;">Action</th>
        </tr>
      </thead>
      <tbody>
        ${d.map(u=>{const p=Tr(u,t),h=u.discountPercent||0;return`
            <tr data-id="${u.id}" data-type="${u._itemType}">
              <td>
                <span class="badge" style="${u._itemType==="tool"?"background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.68rem;":"background: rgba(249, 115, 22, 0.2); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.4); font-size: 0.68rem;"}">
                  ${u._itemType==="tool"?"Tool":"🔥 Deal"}
                </span>
              </td>
              <td>
                <div style="display: flex; flex-direction: column;">
                  <strong style="color: var(--text-pure); font-size: 0.92rem;">${u.name}</strong>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">${u.category||"AI Tool"}</span>
                </div>
              </td>
              <td>
                <span style="font-size: 0.88rem; color: var(--text-secondary); font-family: var(--font-mono);">
                  ${p.originalPrice}
                </span>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <input 
                    type="number" 
                    class="discount-item-input" 
                    data-id="${u.id}" 
                    data-type="${u._itemType}"
                    min="0" 
                    max="100" 
                    value="${h}" 
                    style="width: 75px; padding: 0.35rem 0.5rem; border-radius: 6px; background: #070d18; border: 1px solid ${h>0?"#ef4444":"rgba(255,255,255,0.15)"}; color: ${h>0?"#f87171":"var(--text-pure)"}; font-weight: 700; text-align: center;" 
                  />
                  <span style="font-size: 0.82rem; font-weight: 700; color: #f87171;">%</span>
                </div>
              </td>
              <td>
                ${h>0?`
                  <span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); font-size: 0.72rem; font-weight: 800;">
                    🔥 ${h}% OFF (Item)
                  </span>
                `:s&&o>0?`
                  <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.72rem;">
                    🌐 ${o}% OFF (Global)
                  </span>
                `:`
                  <span style="font-size: 0.75rem; color: var(--text-muted);">Normal Price</span>
                `}
              </td>
              <td>
                <div>
                  <strong style="color: ${p.hasDiscount?"#38bdf8":"var(--text-pure)"}; font-size: 0.95rem;">
                    ${p.discountedPrice}
                  </strong>
                  ${p.hasDiscount?`
                    <div style="font-size: 0.72rem; color: var(--text-muted); text-decoration: line-through;">
                      ${p.originalPrice}
                    </div>
                  `:""}
                </div>
              </td>
              <td>
                <div style="display: flex; gap: 0.35rem;">
                  <button 
                    type="button" 
                    class="btn-details btn-save-item-discount" 
                    data-id="${u.id}" 
                    data-type="${u._itemType}" 
                    style="font-size: 0.75rem; padding: 0.3rem 0.65rem; color: var(--accent-cyan); font-weight: 700;"
                    title="Save discount percentage for this product"
                  >
                    Save
                  </button>
                  ${h>0?`
                    <button 
                      type="button" 
                      class="btn-details btn-clear-item-discount" 
                      data-id="${u.id}" 
                      data-type="${u._itemType}" 
                      style="font-size: 0.75rem; padding: 0.3rem 0.55rem; color: #f87171;"
                      title="Reset discount to 0%"
                    >
                      Clear
                    </button>
                  `:""}
                </div>
              </td>
            </tr>
          `}).join("")}
      </tbody>
    </table>
  `}function lc(r,e,t,i="Pakistan",n){const a=document.getElementById("global-discount-toggle"),s=document.getElementById("global-discount-val"),o=document.getElementById("global-discount-form"),l=document.getElementById("btn-save-global-discount"),c=document.getElementById("btn-reset-all-discounts");s&&s.addEventListener("input",()=>{const u=parseInt(s.value,10)||0;a&&u>0&&(a.checked=!0)}),document.querySelectorAll(".preset-global-chip").forEach(u=>{u.onclick=()=>{s&&(s.value=u.dataset.val),a&&(a.checked=!0)}}),o&&(o.onsubmit=async u=>{u.preventDefault();const p=a?a.checked:!0,h=parseInt(s?s.value:0,10)||0,m=p?Math.max(0,Math.min(100,h)):0;l&&(l.disabled=!0,l.textContent="Applying to all products...");try{await V.adminApplyGlobalDiscountToAllProducts(m),r.forEach(f=>{f.discountPercent=m,f.discount_percent=m}),e.forEach(f=>{f.discountPercent=m,f.discount_percent=m}),vr({globalDiscountActive:m>0,globalDiscountPercent:m}),_(m>0?`✓ Successfully applied ${m}% OFF to ALL tools & deals and updated their settings!`:"✓ Storewide discount disabled and reset to 0%.","success"),typeof n=="function"&&n("discounts")}catch(f){_(`Failed to update products: ${f.message}`,"error"),l&&(l.disabled=!1,l.textContent="⚡ Apply & Save to ALL Tools")}}),c&&(c.onclick=async()=>{if(confirm("Are you sure you want to reset all product discounts to 0% (Regular Price)?")){c.disabled=!0,c.textContent="Resetting...";try{await V.adminApplyGlobalDiscountToAllProducts(0),r.forEach(u=>{u.discountPercent=0,u.discount_percent=0}),e.forEach(u=>{u.discountPercent=0,u.discount_percent=0}),vr({globalDiscountActive:!1,globalDiscountPercent:0}),s&&(s.value=0),a&&(a.checked=!1),_("✓ All product discounts reset to 0% (Normal prices restored).","info"),typeof n=="function"&&n("discounts")}catch(u){_(`Error resetting discounts: ${u.message}`,"error"),c.disabled=!1,c.textContent="Reset All (0%)"}}});const d=document.getElementById("discount-table-search-input");d&&(d.oninput=()=>{const u=d.value,p=document.getElementById("discounts-table-container");p&&(p.innerHTML=ua(r,e,i,null,u),wn(r,e,t,i,n))}),wn(r,e,t,i,n)}function wn(r,e,t,i,n){document.querySelectorAll(".btn-save-item-discount").forEach(a=>{a.onclick=async()=>{const s=a.dataset.id,o=a.dataset.type,l=document.querySelector(`.discount-item-input[data-id="${s}"]`);if(!l)return;const c=Math.max(0,Math.min(100,parseInt(l.value,10)||0));a.textContent="Saving...";try{if(o==="tool"){await V.adminUpdateToolDiscount(s,c);const d=r.find(u=>u.id===s);d&&(d.discountPercent=c)}else{await V.adminUpdateDealDiscount(s,c);const d=e.find(u=>u.id===s);d&&(d.discountPercent=c)}_(`✓ Discount updated to ${c}% OFF!`,"success"),typeof n=="function"&&n("discounts")}catch(d){_(`Error: ${d.message}`,"error"),a.textContent="Save"}}}),document.querySelectorAll(".btn-clear-item-discount").forEach(a=>{a.onclick=async()=>{const s=a.dataset.id,o=a.dataset.type;try{if(o==="tool"){await V.adminUpdateToolDiscount(s,0);const l=r.find(c=>c.id===s);l&&(l.discountPercent=0)}else{await V.adminUpdateDealDiscount(s,0);const l=e.find(c=>c.id===s);l&&(l.discountPercent=0)}_("Reset discount to 0%.","info"),typeof n=="function"&&n("discounts")}catch(l){_(`Error: ${l.message}`,"error")}}})}let ee="tools",se="Pakistan";async function de(r){var j,x,U,Q,Y,F,G,ue,pe,he,ce,Ce,Ae,ve,Be,be,fe,Ie;if(document.title="Admin Management | AI Tools Store",!W){r.innerHTML=`
      ${xe("/admin")}
      <main class="main-content container admin-page fade-in" style="max-width: 720px; margin-top: 3rem;">
        <div class="glass-panel" style="padding: 2.5rem; text-align: center; border-color: rgba(245, 158, 11, 0.4);">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; color: #f59e0b;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h2 style="font-size: 1.6rem; color: var(--text-pure); margin-bottom: 0.75rem;">Supabase Connection Required</h2>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Please add your Supabase credentials to your <code style="color: var(--accent-cyan);">.env</code> file:
          </p>
          <pre class="code-block" style="text-align: left; margin-bottom: 1.5rem;">VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key</pre>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            Next, run the SQL script in <code style="color: var(--accent-cyan);">supabase/schema.sql</code> in your Supabase SQL Editor to initialize database tables and Row Level Security.
          </p>
          <a href="#/" class="btn btn-secondary">Return to Store</a>
        </div>
      </main>
      ${_e()}
    `,Se();return}const e=await H.getCurrentUser(),t=H.currentProfile;if(!e){r.innerHTML=`
      ${xe("/admin")}
      <main class="main-content container admin-page fade-in" style="max-width: 480px; margin-top: 3.5rem;">
        <div class="glass-panel" style="padding: 2.5rem; box-shadow: var(--shadow-card-hover);">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; color: var(--accent-cyan);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 style="font-size: 1.65rem; color: var(--text-pure); font-weight: 800;">Admin Sign In</h2>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.35rem;">
              Sign in with your verified administrator credentials to access the store management console
            </p>
          </div>

          <form id="admin-login-form">
            <div class="form-group">
              <label class="form-label" for="admin-email">Admin Email</label>
              <input type="email" id="admin-email" class="form-input" placeholder="admin@aitools.store" required autocomplete="email" />
            </div>

            <div class="form-group" style="margin-bottom: 1.75rem;">
              <label class="form-label" for="admin-password">Password</label>
              <input type="password" id="admin-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" />
            </div>

            <button type="submit" id="admin-login-btn" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.85rem; font-weight: 700;">
              Sign In to Admin Panel
            </button>
          </form>

          <div style="margin-top: 1.5rem; font-size: 0.78rem; text-align: center; color: var(--text-muted);">
            Secured via Supabase Row Level Security (RLS) & Role Authentication
          </div>
        </div>
      </main>
      ${_e()}
    `,Se();const b=document.getElementById("admin-login-form"),$=document.getElementById("admin-login-btn");b.onsubmit=async B=>{B.preventDefault();const M=document.getElementById("admin-email").value.trim(),J=document.getElementById("admin-password").value;$.textContent="Authenticating...",$.disabled=!0;try{await H.signIn({email:M,password:J}),H.isAdmin()?(_("Signed in successfully as Administrator.","success"),de(r)):(_("Signed in, but this account is not registered as an administrator.","warning"),de(r))}catch(te){_(`Authentication failed: ${te.message}`,"error"),$.textContent="Sign In to Admin Panel",$.disabled=!1}};return}if(!H.isAdmin(e,t)){r.innerHTML=`
      ${xe("/admin")}
      <main class="main-content container admin-page fade-in" style="max-width: 540px; margin-top: 3.5rem;">
        <div class="glass-panel" style="padding: 2.5rem; text-align: center; border-color: rgba(239, 68, 68, 0.4);">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; color: #f87171;">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 style="font-size: 1.6rem; color: var(--text-pure); margin-bottom: 0.5rem; font-weight: 800;">Administrator Access Required</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">
            You are currently signed in as <strong style="color: var(--text-pure);">${e.email}</strong> with <strong style="color: var(--accent-mint);">VIP Member</strong> status. This panel is restricted exclusively to store administrators.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <a href="#/" class="btn btn-secondary">Return to Store</a>
            <button id="admin-switch-account-btn" class="btn btn-primary">Sign in as Administrator</button>
          </div>
        </div>
      </main>
      ${_e()}
    `,Se(),(j=document.getElementById("admin-switch-account-btn"))==null||j.addEventListener("click",async()=>{await H.signOut(),de(r)});return}let i=[];try{i=await V.adminGetTools()}catch(b){_(`Failed to load tools from Supabase: ${b.message}`,"error")}let n=[];try{n=await V.adminGetCategories()}catch(b){console.warn("Could not load categories:",b)}let a=[];try{a=await H.getRegisteredUsers()}catch(b){console.warn("Could not load registered users:",b)}let s=[];try{s=await V.adminGetHotDeals()}catch(b){console.warn("Could not load hot deals:",b)}let o=[];try{o=await V.adminGetUpcomingTools()}catch(b){console.warn("Could not load upcoming tools:",b)}const l=i.filter(b=>b.active).length,c=i.filter(b=>b.featured).length,d=n.map(b=>b.name),u=a.filter(b=>b.role==="admin").length,p=ct();r.innerHTML=`
    ${xe("/admin")}

    <main class="main-content container admin-page fade-in">
      <!-- Admin Top Header -->
      <div class="section-header-row" style="margin-bottom: 2rem; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-popular" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">
              🛡️ Administrator Console
            </span>
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
              ● Supabase Connected
            </span>
            <span style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">${e.email}</span>
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-pure);">Admin Store Management</h1>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">
            Complete control over AI tool listings, custom categories, customer directory, live analytics, and settings.
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <button id="admin-add-tool-btn" class="btn btn-primary" style="font-size: 0.88rem; padding: 0.65rem 1.35rem; font-weight: 700;">
            + Add New AI Tool
          </button>
          <button id="admin-add-deal-top-btn" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.65rem 1.25rem; font-weight: 700; border-color: rgba(249, 115, 22, 0.4); color: #fb923c;">
            🔥 + Add Hot Deal
          </button>
          <button id="admin-add-upcoming-top-btn" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.65rem 1.25rem; font-weight: 700; border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;">
            🚀 + Add Upcoming Tool
          </button>
          <button id="admin-add-cat-top-btn" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.65rem 1.25rem; font-weight: 700; border-color: rgba(168, 85, 247, 0.4); color: #c084fc;">
            + Add Category
          </button>
          <a href="/api/knowledge-pdf" target="_blank" id="admin-export-pdf-top-btn" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.65rem 1.25rem; font-weight: 700; border-color: rgba(16, 185, 129, 0.4); color: #34d399; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;" title="Download Real-Time Knowledge Base PDF for n8n RAG">
            <span>📄</span> Knowledge Base PDF
          </a>
          <a href="#/" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.15rem; text-decoration: none;">
            View Store
          </a>
          <button id="admin-signout-btn" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.15rem; border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
            Sign Out
          </button>
        </div>
      </div>

      <!-- Admin Navigation Tabs -->
      <div class="admin-tabs-nav">
        <button class="admin-tab-btn ${ee==="tools"?"active":""}" data-tab="tools">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>AI Tools Inventory (${i.length})</span>
        </button>

        <button class="admin-tab-btn ${ee==="deals"?"active":""}" data-tab="deals" style="${ee==="deals"?"border-color: #fb923c;":""}">
          <span style="font-size: 1.05rem;">🔥</span>
          <span>Hot Deals &amp; BOGO (${s.length})</span>
        </button>

        <button class="admin-tab-btn ${ee==="upcoming"?"active":""}" data-tab="upcoming" style="${ee==="upcoming"?"border-color: #38bdf8;":""}">
          <span style="font-size: 1.05rem;">🚀</span>
          <span>Upcoming Tools (${o.length})</span>
        </button>

        <button class="admin-tab-btn ${ee==="discounts"?"active":""}" data-tab="discounts" style="${ee==="discounts"?"border-color: #ef4444;":""}">
          <span style="font-size: 1.05rem;">🏷️</span>
          <span>Discounts &amp; % OFF</span>
        </button>

        <button class="admin-tab-btn ${ee==="categories"?"active":""}" data-tab="categories">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Categories Catalog (${n.length})</span>
        </button>

        <button class="admin-tab-btn ${ee==="users"?"active":""}" data-tab="users">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Registered Members (${a.length})</span>
        </button>

        <button class="admin-tab-btn ${ee==="analytics"?"active":""}" data-tab="analytics">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span>Store Analytics & KPIs</span>
        </button>

        <button class="admin-tab-btn ${ee==="settings"?"active":""}" data-tab="settings">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Store & WhatsApp Settings</span>
        </button>
      </div>

      <!-- TAB 1: AI TOOLS INVENTORY -->
      <div id="tab-content-tools" style="${ee==="tools"?"display: block;":"display: none;"}">
        <!-- KPI METRIC CARDS -->
        <div class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Catalog Products</h4>
              <div class="kpi-number">${i.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Synced with Supabase Cloud</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Active Live Tools</h4>
              <div class="kpi-number">${l}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Visible to store visitors</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Featured Selection</h4>
              <div class="kpi-number">${c}</div>
              <div class="kpi-delta" style="color: #fb923c;">Highlighted on Home Page</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(249, 115, 22, 0.15); color: #fb923c;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Filter and Search Bar -->
        <div class="admin-filter-bar">
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; flex: 1;">
            <input 
              type="text" 
              id="tools-search-input" 
              class="admin-search-input" 
              placeholder="Search tools by name or slug..." 
            />

            <select id="tools-category-filter" class="admin-search-input" style="min-width: 170px;">
              <option value="ALL">All Categories (${d.length})</option>
              ${d.map(b=>`<option value="${b}">${b}</option>`).join("")}
            </select>

            <select id="tools-status-filter" class="admin-search-input" style="min-width: 150px;">
              <option value="ALL">All Status (${i.length})</option>
              <option value="ACTIVE">Active Only (${l})</option>
              <option value="INACTIVE">Inactive Only (${i.length-l})</option>
              <option value="FEATURED">Featured (${c})</option>
            </select>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            Showing <strong id="tools-count-badge" style="color: var(--text-pure);">${i.length}</strong> products
          </div>
        </div>

        <!-- Inventory Table Card -->
        <div class="admin-table-card">
          <!-- View Pricing Mode for Admin -->
          <div class="admin-pricing-mode-bar" style="margin-bottom: 1.5rem; padding: 1.1rem 1.35rem; background: linear-gradient(135deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.9)); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 16px; box-shadow: 0 8px 24px -6px rgba(0,0,0,0.5);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem;">
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); display: flex; align-items: center; justify-content: center; font-size: 1.15rem;">
                  🌍
                </div>
                <div>
                  <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-pure); display: flex; align-items: center; gap: 0.5rem;">
                    <span>View Pricing Mode & Live Country Inspector</span>
                    <span class="badge badge-popular" style="font-size: 0.65rem; padding: 0.1rem 0.45rem;">Admin Panel Only</span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.1rem;">
                    Select any country below to see what localized prices are displayed for store visitors in that country.
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button type="button" id="admin-sync-store-country-btn" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.45rem 0.85rem; border-color: rgba(56, 189, 248, 0.4); color: var(--accent-cyan);" title="Sync active storefront preview to this country">
                  <span>Sync Storefront to <strong id="admin-preview-country-label">${se}</strong> ↗</span>
                </button>
              </div>
            </div>

            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="admin-pricing-country-chips">
              <button type="button" class="currency-chip ${se==="Pakistan"?"active":""}" data-country="Pakistan">
                <span>🇵🇰</span> <span>Pakistan (PKR)</span>
              </button>
              <button type="button" class="currency-chip ${se==="India"?"active":""}" data-country="India">
                <span>🇮🇳</span> <span>India (INR ₹)</span>
              </button>
              <button type="button" class="currency-chip ${se==="United Arab Emirates"?"active":""}" data-country="United Arab Emirates">
                <span>🇦🇪</span> <span>UAE (AED)</span>
              </button>
              <button type="button" class="currency-chip ${se==="Saudi Arabia"?"active":""}" data-country="Saudi Arabia">
                <span>🇸🇦</span> <span>Saudi Arabia (SAR)</span>
              </button>
              <button type="button" class="currency-chip ${se==="United States"?"active":""}" data-country="United States">
                <span>🇺🇸</span> <span>United States (USD $)</span>
              </button>
              <button type="button" class="currency-chip ${se==="United Kingdom"?"active":""}" data-country="United Kingdom">
                <span>🇬🇧</span> <span>United Kingdom (GBP £)</span>
              </button>
              <button type="button" class="currency-chip ${se==="Global"?"active":""}" data-country="Global">
                <span>🌐</span> <span>Global / Others (USD)</span>
              </button>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                <span>AI Tools Inventory</span>
                <span id="admin-table-country-pill" class="badge badge-new" style="font-size: 0.72rem; font-weight: 700;">
                  ${Ze(se)} Showing ${se} Pricing
                </span>
              </h3>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Real-time Supabase Database Sync</span>
          </div>

          <div id="tools-table-container">
            ${kn(i,se)}
          </div>
        </div>
      </div>

      <!-- TAB DEALS: HOT DEALS & PROMOTIONS -->
      <div id="tab-content-deals" style="${ee==="deals"?"display: block;":"display: none;"}">
        <!-- Hot Deals KPI Summary Row -->
        <div class="kpi-row" style="margin-bottom: 2rem;">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Hot Deals</h4>
              <div class="kpi-number">${s.length}</div>
              <div class="kpi-delta" style="color: #fb923c;">Promotional offerings</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(249, 115, 22, 0.15); color: #fb923c; font-size: 1.3rem;">
              🔥
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Active Live Deals</h4>
              <div class="kpi-number">${s.filter(b=>b.active).length}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Visible on /deals storefront</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 1.3rem;">
              ✓
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>BOGO &amp; Combo Offers</h4>
              <div class="kpi-number">${s.filter(b=>(b.offerLabel||"").toLowerCase().includes("get")||b.freeQuantity>0).length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Buy 1 Get 1 free specials</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 1.3rem;">
              🎁
            </div>
          </div>
        </div>

        <!-- Filter and Action Bar for Deals -->
        <div class="admin-filter-bar">
          <div style="display: flex; gap: 0.75rem; align-items: center; flex: 1; max-width: 450px;">
            <input 
              type="text" 
              id="deals-admin-search-input" 
              class="admin-search-input" 
              placeholder="Search deals by product name, offer, or slug..." 
              style="width: 100%;"
            />
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Total <strong id="deals-admin-count-badge" style="color: var(--text-pure);">${s.length}</strong> deals
            </div>
            <button id="admin-add-deal-btn" class="btn btn-primary" style="font-size: 0.88rem; padding: 0.65rem 1.35rem; font-weight: 700; background: linear-gradient(135deg, #ef4444, #f97316); border: none;">
              🔥 + Add New Hot Deal
            </button>
          </div>
        </div>

        <!-- Deals Inventory Table Card -->
        <div class="admin-table-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                <span>Hot Deals &amp; Promotional Catalog</span>
                <span class="badge" style="background: rgba(249, 115, 22, 0.2); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.4); font-size: 0.72rem; font-weight: 700;">
                  BOGO / Bundles
                </span>
              </h3>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Syncs with /deals page</span>
          </div>

          <div id="admin-deals-table-container">
            ${jr(s,se)}
          </div>
        </div>
      </div>

      <!-- TAB UPCOMING TOOLS -->
      <div id="tab-content-upcoming" style="${ee==="upcoming"?"display: block;":"display: none;"}">
        <div class="kpi-row" style="margin-bottom: 2rem;">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Upcoming Tools</h4>
              <div class="kpi-number" id="upcoming-total-count">${o.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">In Pre-Launch Pipeline</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 1.4rem;">
              🚀
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Active on Storefront</h4>
              <div class="kpi-number">${o.filter(b=>b.active!==!1).length}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Visible on /upcoming</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 1.4rem;">
              ✓
            </div>
          </div>
        </div>

        <div class="admin-filter-bar">
          <div style="display: flex; gap: 0.75rem; align-items: center; flex: 1; max-width: 450px;">
            <input 
              type="text" 
              id="upcoming-admin-search-input" 
              class="admin-search-input" 
              placeholder="Search upcoming tools by title or description..." 
              style="width: 100%;"
            />
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Total <strong id="upcoming-admin-count-badge" style="color: var(--text-pure);">${o.length}</strong> upcoming tools
            </div>
            <button id="admin-add-upcoming-btn" class="btn btn-primary" style="font-size: 0.88rem; padding: 0.65rem 1.35rem; font-weight: 700; background: linear-gradient(135deg, #0284c7, #38bdf8); border: none;">
              🚀 + Add Upcoming Tool
            </button>
          </div>
        </div>

        <div class="admin-table-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                <span>Upcoming Tools Roadmap</span>
                <span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); font-size: 0.72rem; font-weight: 700;">
                  Picture + Title + Description
                </span>
              </h3>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Syncs with /upcoming page</span>
          </div>

          <div id="admin-upcoming-table-container">
            ${ca(o)}
          </div>
        </div>
      </div>

      <!-- TAB DISCOUNTS & OFFERS -->
      <div id="tab-content-discounts" style="${ee==="discounts"?"display: block;":"display: none;"}">
        <div id="admin-discounts-container">
          ${oc(i,s,p,se)}
        </div>
      </div>

      <!-- TAB 2: CATEGORIES MANAGEMENT -->
      <div id="tab-content-categories" style="${ee==="categories"?"display: block;":"display: none;"}">
        <!-- Categories KPI Summary Row -->
        <div class="kpi-row" style="margin-bottom: 2rem;">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Active Categories</h4>
              <div class="kpi-number">${n.length}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Organized taxonomy</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(168, 85, 247, 0.15); color: #c084fc;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Catalog Tools</h4>
              <div class="kpi-number">${i.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Across all categories</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Average Products / Category</h4>
              <div class="kpi-number">${n.length?(i.length/n.length).toFixed(1):0}</div>
              <div class="kpi-delta" style="color: #fb923c;">Balanced distribution</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(249, 115, 22, 0.15); color: #fb923c;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Filter and Search Bar for Categories -->
        <div class="admin-filter-bar">
          <div style="display: flex; gap: 0.75rem; align-items: center; flex: 1; max-width: 450px;">
            <input 
              type="text" 
              id="categories-search-input" 
              class="admin-search-input" 
              placeholder="Search categories by name, details, or slug..." 
              style="width: 100%;"
            />
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Total <strong id="categories-count-badge" style="color: var(--text-pure);">${n.length}</strong> categories
            </div>
            <button id="admin-add-category-btn" class="btn btn-primary" style="font-size: 0.88rem; padding: 0.65rem 1.35rem; font-weight: 700;">
              + Add New Category
            </button>
          </div>
        </div>

        <!-- Categories Table Card -->
        <div class="admin-table-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700;">Store Taxonomy & Categories</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                Manage categories, custom descriptions, icons, theme colors, and banners.
              </p>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Instant Live Sync</span>
          </div>

          <div id="admin-categories-table-container">
            ${An(n)}
          </div>
        </div>
      </div>

      <!-- TAB 3: REGISTERED MEMBERS DIRECTORY -->
      <div id="tab-content-users" style="${ee==="users"?"display: block;":"display: none;"}">
        <!-- Members Summary KPIs -->
        <div class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Registered Members</h4>
              <div class="kpi-number">${a.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Community Profiles</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>System Administrators</h4>
              <div class="kpi-number">${u}</div>
              <div class="kpi-delta" style="color: #c084fc;">Full administrative privileges</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
              </svg>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>VIP Members</h4>
              <div class="kpi-number">${a.length-u}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Active store consumers</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Users Filter Bar -->
        <div class="admin-filter-bar">
          <input 
            type="text" 
            id="users-search-input" 
            class="admin-search-input" 
            placeholder="Search members by name, email, or WhatsApp..." 
            style="min-width: 320px;"
          />
          <span style="font-size: 0.85rem; color: var(--text-muted);">
            Total users: <strong style="color: var(--text-pure);">${a.length}</strong>
          </span>
        </div>

        <!-- Users Table Card -->
        <div class="admin-table-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700;">Customer & Member Directory</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Role access controls & WhatsApp direct concierge</span>
          </div>

          <div id="users-table-container">
            ${Sn(a)}
          </div>
        </div>
      </div>

      <!-- TAB 3: STORE ANALYTICS & KPIS -->
      <div id="tab-content-analytics" style="${ee==="analytics"?"display: block;":"display: none;"}">
        <div class="kpi-row kpi-grid-4">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Catalog</h4>
              <div class="kpi-number">${i.length}</div>
              <div class="kpi-delta" style="color: var(--accent-cyan);">Listed Tools</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Active Ratio</h4>
              <div class="kpi-number">${i.length>0?Math.round(l/i.length*100):0}%</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">${l} active / ${i.length} total</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Taxonomy Categories</h4>
              <div class="kpi-number">${d.length}</div>
              <div class="kpi-delta" style="color: #fb923c;">Distinct verticals</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>WhatsApp Inquiries</h4>
              <div class="kpi-number">3.8K+</div>
              <div class="kpi-delta" style="color: #38bdf8;">High-intent purchase leads</div>
            </div>
          </div>
        </div>

        <!-- Categories Distribution Bar Card -->
        <div class="admin-table-card" style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; margin-bottom: 1.5rem;">
            Products Distribution by Category
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${n.map(b=>{const $=i.filter(M=>(M.category||"").toLowerCase()===b.name.toLowerCase()).length,B=i.length>0?Math.round($/i.length*100):0;return`
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.35rem;">
                    <span style="font-weight: 600; color: var(--text-pure);">${b.icon||"✨"} ${b.name}</span>
                    <span style="color: var(--text-secondary);">${$} tools (${B}%)</span>
                  </div>
                  <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden;">
                    <div style="width: ${B}%; height: 100%; background: linear-gradient(90deg, ${b.color||"#38bdf8"}, #818cf8); border-radius: 999px;"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Database Health Checklist Card -->
        <div class="admin-table-card">
          <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; margin-bottom: 1rem;">
            Store Health & Security Status
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(16, 185, 129, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Supabase Cloud Database</div>
              <div style="font-size: 1rem; font-weight: 700; color: #34d399; margin-top: 0.25rem;">✓ Connected & Healthy</div>
            </div>
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(16, 185, 129, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Storage Bucket ('tool-images')</div>
              <div style="font-size: 1rem; font-weight: 700; color: #34d399; margin-top: 0.25rem;">✓ Active & Public</div>
            </div>
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(16, 185, 129, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Row Level Security (RLS)</div>
              <div style="font-size: 1rem; font-weight: 700; color: #34d399; margin-top: 0.25rem;">✓ Enforced</div>
            </div>
            <div class="glass-panel" style="padding: 1rem; border-radius: 12px; border-color: rgba(56, 189, 248, 0.3);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">WhatsApp Concierge Link</div>
              <div style="font-size: 1rem; font-weight: 700; color: #38bdf8; margin-top: 0.25rem;">✓ Configured</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: STORE, MCP & WHATSAPP SETTINGS -->
      <div id="tab-content-settings" style="${ee==="settings"?"display: block;":"display: none;"}">
        <!-- Card 0: AI Knowledge Base PDF Generator for n8n RAG Vector Store -->
        <div class="admin-table-card" style="max-width: 920px; margin-bottom: 2.25rem; background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.96)); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 18px; padding: 2.25rem; box-shadow: 0 14px 44px rgba(0, 0, 0, 0.5);">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 54px; height: 54px; border-radius: 14px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.35)); border: 1.5px solid rgba(16, 185, 129, 0.6); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; box-shadow: 0 0 24px rgba(16, 185, 129, 0.25);">
                📄
              </div>
              <div>
                <h3 style="font-size: 1.35rem; color: #ffffff; font-weight: 800; margin: 0; letter-spacing: -0.01em;">
                  AI Knowledge Base PDF (for n8n RAG & AI Agent)
                </h3>
                <p style="font-size: 0.88rem; color: #94a3b8; margin: 0.3rem 0 0 0;">
                  Real-time generated document containing all active tools, regional pricing, store policies, and onboarding guides.
                </p>
              </div>
            </div>
            <span class="badge" style="background: rgba(16, 185, 129, 0.25); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.5); font-size: 0.82rem; font-weight: 700; padding: 0.4rem 0.85rem; border-radius: 999px;">
              ● Real-Time Auto Sync
            </span>
          </div>

          <!-- URL & Action row -->
          <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; padding: 1.25rem; margin-bottom: 1.5rem;">
            <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; margin-bottom: 0.4rem; display: block;">
              n8n HTTP Request Endpoint URL:
            </label>
            <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
              <input 
                type="text" 
                id="admin-knowledge-pdf-url" 
                class="form-input" 
                readonly 
                value="${window.location.origin}/api/knowledge-pdf" 
                style="flex: 1; min-width: 280px; font-family: 'JetBrains Mono', monospace; font-size: 0.88rem; background: #070d18 !important; border: 1px solid rgba(16, 185, 129, 0.4) !important; color: #34d399 !important;"
              />
              <button 
                type="button" 
                id="btn-copy-pdf-url" 
                class="btn btn-secondary" 
                style="padding: 0.65rem 1.15rem; font-size: 0.85rem; font-weight: 700;"
              >
                📋 Copy URL
              </button>
              <a 
                href="/api/knowledge-pdf" 
                target="_blank" 
                class="btn btn-primary" 
                style="padding: 0.65rem 1.35rem; font-size: 0.85rem; font-weight: 700; background: linear-gradient(135deg, #059669, #10b981); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;"
              >
                <span>⬇️</span> Download PDF Now
              </a>
            </div>
          </div>

          <!-- n8n Workflow Instructions Box -->
          <div style="background: rgba(6, 182, 212, 0.06); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 12px; padding: 1.25rem; color: #cbd5e1; font-size: 0.88rem; line-height: 1.6;">
            <div style="font-weight: 700; color: #38bdf8; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>🤖</span> n8n HTTP Request Configuration Guide:
            </div>
            <ul style="padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.35rem;">
              <li><strong>Method:</strong> <code style="color: #34d399;">GET</code></li>
              <li><strong>URL:</strong> <code style="color: #38bdf8;">${window.location.origin}/api/knowledge-pdf</code></li>
              <li><strong>Response Format:</strong> Set to <code style="color: #fb923c;">File</code> (Binary) so n8n receives the complete downloadable PDF.</li>
              <li><strong>RAG Processing:</strong> In n8n, connect this binary output to <strong>Default Data Loader / PDF Loader</strong> &rarr; <strong>Text Splitter</strong> &rarr; <strong>Vector Store</strong> (Qdrant, Pinecone, Supabase Vector).</li>
              <li><strong>Zero Admin Exposure:</strong> Excludes admin accounts, admin passwords, system routes, and internal database tables. Safe for all customer queries!</li>
              <li><strong>Automated Future Updates:</strong> Whenever you add, delete, or edit tools in this Admin Panel, the PDF is generated dynamically on every fetch with zero manual re-exports required.</li>
            </ul>
          </div>
        </div>

        <!-- Card 1: n8n MCP Server Trigger Integration (Model Context Protocol) -->
        <div class="admin-table-card" style="max-width: 920px; margin-bottom: 2.25rem; background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.12), rgba(15, 23, 42, 0.96)); border: 2px solid rgba(99, 102, 241, 0.4); border-radius: 18px; padding: 2.25rem; box-shadow: 0 14px 44px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 54px; height: 54px; border-radius: 14px; background: linear-gradient(135deg, rgba(234, 88, 12, 0.3), rgba(99, 102, 241, 0.35)); border: 1.5px solid rgba(234, 88, 12, 0.6); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; box-shadow: 0 0 24px rgba(234, 88, 12, 0.25);">
                ⚡
              </div>
              <div>
                <h3 style="font-size: 1.35rem; color: #ffffff; font-weight: 800; margin: 0; letter-spacing: -0.01em;">
                  n8n MCP (Model Context Protocol) Server Trigger
                </h3>
                <p style="font-size: 0.88rem; color: #94a3b8; margin: 0.3rem 0 0 0;">
                  Native Model Context Protocol integration via Server-Sent Events (SSE) and JSON-RPC 2.0.
                </p>
              </div>
            </div>
            <span class="badge" style="background: rgba(99, 102, 241, 0.25); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.5); font-size: 0.82rem; font-weight: 700; padding: 0.4rem 0.85rem; border-radius: 999px;">
              ⚡ MCP Protocol Transport
            </span>
          </div>

          <!-- Environment Mode Switcher: Test vs Production URL -->
          <div style="margin-bottom: 1.5rem; padding: 0.85rem 1.25rem; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.85rem;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #f8fafc;">Select Active MCP URL Environment:</div>
              <div style="font-size: 0.78rem; color: #94a3b8;">Switch between your active n8n Development (Test) URL and Live Production URL.</div>
            </div>
            <div style="display: flex; gap: 0.5rem;" id="mcp-env-switch-group">
              <button 
                id="btn-switch-test-url" 
                type="button" 
                class="admin-tab-btn ${p.mcpUrlType!=="production"?"active":""}"
                style="padding: 0.45rem 1rem; font-size: 0.82rem; font-weight: 700;"
              >
                🧪 Development / Test URL
              </button>
              <button 
                id="btn-switch-prod-url" 
                type="button" 
                class="admin-tab-btn ${p.mcpUrlType==="production"?"active":""}"
                style="padding: 0.45rem 1rem; font-size: 0.82rem; font-weight: 700;"
              >
                🚀 Production MCP URL
              </button>
            </div>
          </div>

          <!-- MCP Endpoint URL Input Container -->
          <div style="margin-bottom: 1.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.5rem;">
              <label style="font-size: 1.05rem; font-weight: 800; color: #f8fafc; display: flex; align-items: center; gap: 0.5rem; margin: 0;">
                <span style="color: #38bdf8;">🔗</span> n8n MCP Server Trigger Endpoint URL:
              </label>
              <div style="display: flex; gap: 0.5rem;">
                <button 
                  id="btn-paste-mcp-url" 
                  type="button" 
                  style="background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-size: 0.82rem; font-weight: 700; padding: 0.35rem 0.85rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: all 0.2s;"
                  title="Clipboard se link paste karein"
                >
                  📋 Paste Link
                </button>
                <button 
                  id="btn-reset-test-url" 
                  type="button" 
                  style="background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.4); color: #a5b4fc; font-size: 0.82rem; font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                  title="Reset to Active Development Test URL"
                >
                  🔄 Reset Test URL
                </button>
                <button 
                  id="btn-clear-mcp-url" 
                  type="button" 
                  style="background: rgba(248, 113, 113, 0.12); border: 1px solid rgba(248, 113, 113, 0.3); color: #f87171; font-size: 0.82rem; font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                  title="Link ko clear karein"
                >
                  ✕ Clear
                </button>
              </div>
            </div>

            <!-- Big, high-contrast, wide input box -->
            <div style="position: relative; width: 100%;">
              <input 
                type="url" 
                id="settings-mcp-webhook-url" 
                value="${p.mcpWebhookUrl||ir}" 
                placeholder="https://n8n-1rsy.srv1898856.hstgr.cloud/mcp-test/69318bf8-f20c-4dab-91cf-604c84ce94b1"
                style="width: 100% !important; min-height: 58px !important; font-size: 1.05rem !important; font-family: 'JetBrains Mono', monospace !important; padding: 0.95rem 1.25rem 0.95rem 3.2rem !important; background: #070d18 !important; border: 2px solid #6366f1 !important; border-radius: 12px !important; color: #38bdf8 !important; box-shadow: 0 0 25px rgba(99, 102, 241, 0.22) !important; outline: none !important; box-sizing: border-box !important; display: block !important;"
              />
              <span style="position: absolute; left: 1.1rem; top: 50%; transform: translateY(-50%); font-size: 1.35rem; color: #818cf8; pointer-events: none;">
                🌐
              </span>
            </div>

            <!-- Architecture & Protocol note -->
            <div style="margin-top: 0.85rem; padding: 0.9rem 1.25rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; border-left: 4px solid #38bdf8;">
              <div style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
                💡 MCP Transport Specification (How it connects):
              </div>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.25rem 0; line-height: 1.5;">
                This endpoint connects via the official <strong>Model Context Protocol (MCP)</strong>. It establishes an SSE stream using <code style="color: #7dd3fc;">Accept: application/json, text/event-stream</code> and initializes via JSON-RPC 2.0.
              </p>
              <p style="font-size: 0.78rem; color: #94a3b8; margin: 0.3rem 0 0 0;">
                ⚠️ <strong>For Test URL:</strong> Click the orange <strong>"Execute step"</strong> button in n8n before testing so n8n is actively listening. For Production, switch to <strong>Production URL</strong> and activate the workflow.
              </p>
            </div>
          </div>

          <!-- Secret Token / Key (Optional - Secure Server Proxy) -->
          <div style="margin-bottom: 1.75rem;">
            <label style="font-size: 0.95rem; font-weight: 700; color: #f8fafc; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              🛡️ MCP Secret Token / Header Key <span style="font-size: 0.8rem; font-weight: 400; color: #94a3b8;">(Optional - Transmitted securely via server proxy headers; never exposed)</span>:
            </label>
            <input 
              type="password" 
              id="settings-mcp-secret" 
              value="${p.mcpSecretKey||""}" 
              placeholder="e.g. bearer_token_or_secret_header (Leave blank if Authentication is None)"
              style="width: 100% !important; min-height: 50px !important; font-size: 0.95rem !important; font-family: 'JetBrains Mono', monospace !important; padding: 0.85rem 1.25rem !important; background: #070d18 !important; border: 1.5px solid rgba(255, 255, 255, 0.15) !important; border-radius: 10px !important; color: #e2e8f0 !important; box-sizing: border-box !important; display: block !important;"
            />
          </div>

          <!-- Test Action & Diagnostics Panel -->
          <div style="padding-top: 1.25rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
              <button 
                id="btn-test-mcp-connection" 
                type="button" 
                style="background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; font-size: 0.95rem; font-weight: 800; padding: 0.85rem 1.8rem; border-radius: 10px; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.45); display: flex; align-items: center; gap: 0.6rem; transition: transform 0.15s;"
              >
                ⚡ Test MCP Connection
              </button>
              <div id="mcp-ping-status" style="font-size: 0.9rem; font-weight: 600; color: #94a3b8;"></div>
            </div>

            <!-- Diagnostics Result Panel (Shows: Connected, Connection failed, HTTP status, Error message) -->
            <div id="mcp-diagnostics-panel" style="display: none; margin-top: 1rem; padding: 1.25rem; background: #070d18; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px;">
              <!-- Dynamically populated by MCP test listener -->
            </div>
          </div>
        </div>

        <!-- Card 2: WhatsApp & Support Contact Settings -->
        <div class="admin-table-card" style="max-width: 920px; margin-bottom: 2.25rem; background: radial-gradient(circle at top right, rgba(37, 211, 102, 0.08), rgba(15, 23, 42, 0.95)); border: 2px solid rgba(37, 211, 102, 0.3); border-radius: 18px; padding: 2rem; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 1.25rem;">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(37, 211, 102, 0.2); border: 1.5px solid rgba(37, 211, 102, 0.5); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #25D366; box-shadow: 0 0 20px rgba(37, 211, 102, 0.2);">
              📱
            </div>
            <div>
              <h3 style="font-size: 1.35rem; color: #ffffff; font-weight: 800; margin: 0;">
                WhatsApp &amp; Direct Support Concierge
              </h3>
              <p style="font-size: 0.88rem; color: #94a3b8; margin: 0.3rem 0 0 0;">
                Configure your official WhatsApp numbers and community links used for customer order fulfillments.
              </p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 1.75rem;">
            <div>
              <label style="font-size: 0.95rem; font-weight: 700; color: #f8fafc; display: block; margin-bottom: 0.5rem;">
                📞 Admin WhatsApp Contact Number:
              </label>
              <input 
                type="text" 
                id="settings-admin-whatsapp-number" 
                value="${p.adminWhatsappNumber||""}" 
                placeholder="e.g. +92 300 1234567"
                style="width: 100% !important; min-height: 52px !important; font-size: 1rem !important; padding: 0.85rem 1.25rem !important; background: #070d18 !important; border: 1.5px solid rgba(37, 211, 102, 0.4) !important; border-radius: 10px !important; color: #4ade80 !important; box-sizing: border-box !important; display: block !important;"
              />
              <p style="font-size: 0.76rem; color: #94a3b8; margin-top: 0.35rem;">
                Used for automated WhatsApp direct chat and support routing.
              </p>
            </div>

            <div>
              <label style="font-size: 0.95rem; font-weight: 700; color: #f8fafc; display: block; margin-bottom: 0.5rem;">
                🌐 WhatsApp Community / Channel URL:
              </label>
              <input 
                type="text" 
                id="settings-admin-whatsapp-url" 
                value="${p.adminWhatsappUrl||Ee}" 
                placeholder="https://chat.whatsapp.com/..."
                style="width: 100% !important; min-height: 52px !important; font-size: 1rem !important; padding: 0.85rem 1.25rem !important; background: #070d18 !important; border: 1.5px solid rgba(37, 211, 102, 0.4) !important; border-radius: 10px !important; color: #4ade80 !important; box-sizing: border-box !important; display: block !important;"
              />
              <p style="font-size: 0.76rem; color: #94a3b8; margin-top: 0.35rem;">
                Official group/channel invite link for users.
              </p>
            </div>
          </div>

          <!-- Save Button -->
          <div style="display: flex; gap: 1.25rem; align-items: center; padding-top: 1.25rem; border-top: 1px solid rgba(255, 255, 255, 0.1); flex-wrap: wrap;">
            <button 
              id="btn-save-all-settings" 
              type="button" 
              style="background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; font-size: 1rem; font-weight: 800; padding: 0.9rem 2.5rem; border-radius: 12px; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4); display: flex; align-items: center; gap: 0.6rem; transition: transform 0.15s;"
            >
              💾 Save All Settings &amp; Apply
            </button>
            <span id="settings-save-status" style="font-size: 0.95rem; font-weight: 700; color: #34d399;"></span>
          </div>
        </div>

        <!-- Card 3: Cloud Database Status & Webhooks -->
        <div class="admin-table-card" style="max-width: 920px; margin-bottom: 2rem;">
          <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; margin-bottom: 0.5rem;">
            Database Connection Diagnostics
          </h3>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Supabase Cloud Project URL</label>
            <input 
              type="text" 
              class="form-input" 
              value="${Xe("VITE_SUPABASE_URL","https://rqemoitjanmxsmcmveso.supabase.co")}" 
              readonly 
            />
          </div>
          <div style="display: flex; gap: 1rem; align-items: center; padding-top: 0.5rem; margin-bottom: 1.5rem;">
            <button id="btn-test-db-ping" type="button" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              Test Database Ping
            </button>
            <span id="db-ping-status" style="font-size: 0.85rem; color: var(--text-muted);"></span>
          </div>

          <!-- n8n New User Registration Webhook Section -->
          <div style="padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="font-size: 1.35rem;">⚡</span>
                <div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: #fb923c; margin: 0;">
                    n8n New User Registration Webhook
                  </h4>
                  <p style="font-size: 0.78rem; color: #94a3b8; margin: 0.15rem 0 0 0;">
                    Trigger an n8n webhook workflow whenever a <strong>new user creates an account</strong> (Sign Up).
                  </p>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button id="btn-paste-new-user-webhook" type="button" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.85rem;">
                  📋 Paste Link
                </button>
                <button id="btn-clear-new-user-webhook" type="button" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem; color: #f87171;">
                  ✕ Clear
                </button>
              </div>
            </div>

            <div style="margin-bottom: 0.85rem;">
              <label class="form-label" style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.35rem; display: block;">
                Webhook URL:
              </label>
              <input 
                type="url" 
                id="settings-new-user-webhook-url" 
                class="form-input" 
                value="${p.newUserWebhookUrl||""}" 
                placeholder="https://n8n-1rsy.srv1898856.hstgr.cloud/webhook/..."
                style="width: 100% !important; min-height: 52px !important; font-size: 0.95rem !important; font-family: 'JetBrains Mono', monospace !important; padding: 0.85rem 1.25rem !important; background: #070d18 !important; border: 1.5px solid rgba(234, 88, 12, 0.45) !important; border-radius: 10px !important; color: #fb923c !important; box-sizing: border-box !important; display: block !important;"
              />
            </div>

            <!-- Enable/Disable Checkbox -->
            <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 1.25rem;">
              <input 
                type="checkbox" 
                id="settings-new-user-webhook-enabled" 
                ${p.newUserWebhookEnabled!==!1?"checked":""} 
                style="width: 18px; height: 18px; accent-color: #ea580c; cursor: pointer;"
              />
              <label for="settings-new-user-webhook-enabled" style="font-size: 0.88rem; font-weight: 600; color: #e2e8f0; cursor: pointer;">
                Active: Trigger webhook automatically on new user registration
              </label>
            </div>

            <!-- Action buttons: Test Webhook & Save Webhook -->
            <div style="display: flex; gap: 0.85rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
              <button 
                id="btn-test-new-user-webhook" 
                type="button" 
                style="background: linear-gradient(135deg, #ea580c, #c2410c); color: #ffffff; font-size: 0.88rem; font-weight: 700; padding: 0.65rem 1.4rem; border-radius: 10px; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.35); display: flex; align-items: center; gap: 0.45rem;"
              >
                ⚡ Test Webhook Connection
              </button>
              <button 
                id="btn-save-new-user-webhook" 
                type="button" 
                class="btn btn-secondary" 
                style="font-size: 0.88rem; padding: 0.65rem 1.25rem; font-weight: 700; border-color: rgba(234, 88, 12, 0.4);"
              >
                💾 Save Webhook URL
              </button>
              <span id="new-user-webhook-status" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>

            <!-- Payload Schema Guide -->
            <div style="padding: 0.85rem 1.1rem; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(234, 88, 12, 0.25); border-radius: 10px; font-size: 0.8rem; color: #cbd5e1;">
              <span style="color: #fb923c; font-weight: 700;">📦 Data Format Dispatched to n8n:</span>
              <pre style="margin: 0.4rem 0 0 0; font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; color: #fdba74; overflow-x: auto;">{
  "event": "user.signup",
  "user_id": "...",
  "full_name": "...",
  "email": "...",
  "whatsapp_number": "...",
  "country": "...",
  "role": "member",
  "created_at": "..."
}</pre>
            </div>
          </div>
        </div>
      </div>
    </main>

    ${_e()}
  `,Se();const h=document.getElementById("btn-copy-pdf-url");h&&(h.onclick=()=>{const b=document.getElementById("admin-knowledge-pdf-url");b&&(navigator.clipboard.writeText(b.value),_("Knowledge Base PDF URL copied to clipboard!","success"),h.textContent="✓ Copied!",setTimeout(()=>{h.textContent="📋 Copy URL"},2e3))}),document.querySelectorAll(".admin-tab-btn").forEach(b=>{b.onclick=()=>{const $=b.dataset.tab;ee=$,document.querySelectorAll(".admin-tab-btn").forEach(B=>B.classList.remove("active")),b.classList.add("active"),["tools","deals","upcoming","discounts","categories","users","analytics","settings"].forEach(B=>{const M=document.getElementById(`tab-content-${B}`);M&&(M.style.display=B===$?"block":"none")})}});const m=document.getElementById("tools-search-input"),f=document.getElementById("tools-category-filter"),v=document.getElementById("tools-status-filter"),y=()=>{const b=((m==null?void 0:m.value)||"").toLowerCase().trim(),$=(f==null?void 0:f.value)||"ALL",B=(v==null?void 0:v.value)||"ALL",M=i.filter(ge=>{const oe=!b||(ge.name||"").toLowerCase().includes(b)||(ge.slug||"").toLowerCase().includes(b)||(ge.shortDescription||"").toLowerCase().includes(b),re=$==="ALL"||ge.category===$,Me=B==="ALL"||B==="ACTIVE"&&ge.active||B==="INACTIVE"&&!ge.active||B==="FEATURED"&&ge.featured;return oe&&re&&Me}),J=document.getElementById("tools-table-container"),te=document.getElementById("tools-count-badge");te&&(te.textContent=M.length),J&&(J.innerHTML=kn(M,se),xn(M,r))};m&&(m.oninput=y),f&&(f.onchange=y),v&&(v.onchange=y);const w=document.getElementById("admin-pricing-country-chips");w&&w.querySelectorAll(".currency-chip").forEach(b=>{b.onclick=$=>{$.preventDefault();const B=b.dataset.country;se=B,w.querySelectorAll(".currency-chip").forEach(te=>te.classList.remove("active")),b.classList.add("active");const M=document.getElementById("admin-preview-country-label");M&&(M.textContent=B);const J=document.getElementById("admin-table-country-pill");J&&(J.innerHTML=`${Ze(B)} Showing ${B} Pricing`),y(),_(`Admin Pricing Inspector: Showing ${B} rates`,"info")}});const k=document.getElementById("admin-sync-store-country-btn");k&&(k.onclick=()=>{H.setUserCountry(se),_(`✓ Storefront synchronized to ${se} rates!`,"success")}),xn(i,r);const P=document.getElementById("categories-search-input");P&&(P.oninput=()=>{const b=(P.value||"").toLowerCase().trim(),$=n.filter(J=>!b||(J.name||"").toLowerCase().includes(b)||(J.slug||"").toLowerCase().includes(b)||(J.description||J.desc||"").toLowerCase().includes(b)),B=document.getElementById("admin-categories-table-container"),M=document.getElementById("categories-count-badge");M&&(M.textContent=$.length),B&&(B.innerHTML=An($),Tn($,r,n))}),Tn(n,r,n);const D=document.getElementById("users-search-input");D&&(D.oninput=()=>{const b=(D.value||"").toLowerCase().trim(),$=a.filter(M=>!b||(M.full_name||"").toLowerCase().includes(b)||(M.email||"").toLowerCase().includes(b)||(M.whatsapp_number||"").toLowerCase().includes(b)),B=document.getElementById("users-table-container");B&&(B.innerHTML=Sn($),_n($,r))}),_n(a,r);const I=document.getElementById("deals-admin-search-input");if(I&&(I.oninput=()=>{const b=(I.value||"").toLowerCase().trim(),$=s.filter(J=>!b||(J.name||"").toLowerCase().includes(b)||(J.slug||"").toLowerCase().includes(b)||(J.offerLabel||"").toLowerCase().includes(b)||(J.category||"").toLowerCase().includes(b)),B=document.getElementById("admin-deals-table-container"),M=document.getElementById("deals-admin-count-badge");M&&(M.textContent=$.length),B&&(B.innerHTML=jr($,se),Mr($,r,i))}),Mr(s,r,i),window._adminDealsRealtimeUnsub)try{window._adminDealsRealtimeUnsub()}catch{}window._adminDealsRealtimeUnsub=V.subscribeToHotDeals(async()=>{try{s=await V.adminGetHotDeals();const b=document.getElementById("admin-deals-table-container"),$=document.getElementById("deals-admin-count-badge");$&&($.textContent=s.length),b&&(b.innerHTML=jr(s,se),Mr(s,r,i))}catch{}}),(x=document.getElementById("admin-add-deal-btn"))==null||x.addEventListener("click",()=>{oi(null,r,i)}),(U=document.getElementById("admin-add-deal-top-btn"))==null||U.addEventListener("click",()=>{oi(null,r,i)}),da(o,r,b=>{ee=b||"upcoming",de(r)}),(Q=document.getElementById("admin-add-upcoming-top-btn"))==null||Q.addEventListener("click",()=>{si(null,r,b=>{ee=b||"upcoming",de(r)})}),lc(i,s,r,se,b=>{ee=b||"discounts",de(r)}),(Y=document.getElementById("admin-signout-btn"))==null||Y.addEventListener("click",async()=>{await H.signOut(),_("Signed out from Administrator Console.","info"),de(r)}),(F=document.getElementById("admin-add-tool-btn"))==null||F.addEventListener("click",()=>{pa(null,r,n)}),(G=document.getElementById("admin-add-category-btn"))==null||G.addEventListener("click",()=>{wr(null,r,n)}),(ue=document.getElementById("admin-add-cat-top-btn"))==null||ue.addEventListener("click",()=>{wr(null,r,n)}),(pe=document.getElementById("btn-test-db-ping"))==null||pe.addEventListener("click",async()=>{const b=document.getElementById("db-ping-status");b&&(b.textContent="Pinging Supabase...");const $=performance.now();try{const{count:B,error:M}=await N.from("tools").select("*",{count:"exact",head:!0}),J=Math.round(performance.now()-$);if(!M)b&&(b.textContent=`✓ Connected! Roundtrip latency: ${J}ms (Total tools: ${B})`,b.style.color="#34d399");else throw M}catch(B){b&&(b.textContent=`Ping failed: ${B.message}`,b.style.color="#f87171")}});const E=document.getElementById("settings-mcp-webhook-url"),K=document.getElementById("btn-switch-test-url"),O=document.getElementById("btn-switch-prod-url"),q=document.getElementById("btn-reset-test-url");K==null||K.addEventListener("click",()=>{K.classList.add("active"),O==null||O.classList.remove("active"),E&&((!E.value||E.value.includes("/mcp/"))&&(E.value=ir),E.focus()),_("Switched to n8n MCP Development / Test URL mode","info")}),O==null||O.addEventListener("click",()=>{O.classList.add("active"),K==null||K.classList.remove("active"),E&&(E.value.includes("/mcp-test/")?E.value=E.value.replace("/mcp-test/","/mcp/"):E.value||(E.value=ir.replace("/mcp-test/","/mcp/")),E.focus()),_("Switched to n8n MCP Live Production URL mode","info")}),q==null||q.addEventListener("click",()=>{E&&(E.value=ir,E.focus()),K==null||K.classList.add("active"),O==null||O.classList.remove("active"),_("Active Test MCP URL restored.","success")}),(he=document.getElementById("btn-paste-mcp-url"))==null||he.addEventListener("click",async()=>{try{const b=await navigator.clipboard.readText();b?E&&(E.value=b.trim(),E.focus(),_("✓ Link clipboard se paste ho gaya!","success")):_("Clipboard mein koi text nahi mila.","info")}catch{_("Clipboard direct access nahi mila. Input box mein Ctrl + V karein.","info")}}),(ce=document.getElementById("btn-clear-mcp-url"))==null||ce.addEventListener("click",()=>{E&&(E.value="",E.focus(),_("Link clear ho gaya.","info"))});const S=async()=>{var te,ge;const b=document.getElementById("settings-mcp-secret"),$=document.getElementById("mcp-ping-status"),B=document.getElementById("mcp-diagnostics-panel"),M=((te=E==null?void 0:E.value)==null?void 0:te.trim())||"",J=((ge=b==null?void 0:b.value)==null?void 0:ge.trim())||"";if(!M){_("Please enter an n8n MCP URL first.","error"),$&&($.textContent="URL required",$.style.color="#f87171");return}$&&($.textContent="Connecting to n8n MCP Server via SSE + JSON-RPC...",$.style.color="var(--accent-cyan)"),B&&(B.style.display="block",B.innerHTML=`
        <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--accent-cyan);">
          <span class="status-dot-pulse" style="background: var(--accent-cyan);"></span>
          <span style="font-size: 0.9rem; font-weight: 600;">Initiating Model Context Protocol handshake...</span>
        </div>
      `);try{const oe=await ze.testConnection(M,J),re=!!oe.connected,Me=oe.status||0,Ke=oe.statusText||(re?"OK":"Failed"),et=oe.latencyMs?`${oe.latencyMs}ms`:"—",tt=oe.protocol||"MCP/1.0 (SSE + JSON-RPC 2.0)",rt=oe.error||"",it=oe.message||"Connected successfully to n8n MCP Server Trigger!";$&&($.textContent=re?"✓ MCP Connected!":"✕ Connection failed",$.style.color=re?"#34d399":"#f87171"),B&&(B.style.display="block",B.innerHTML=`
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Top Status Row -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.85rem;">
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <span class="status-dot-pulse" style="background: ${re?"#34d399":"#f87171"}; width: 10px; height: 10px;"></span>
                <span style="font-size: 1.05rem; font-weight: 800; color: ${re?"#34d399":"#f87171"};">
                  ${re?"Connected":"Connection failed"}
                </span>
              </div>
              <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
                <span class="badge" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #f8fafc; font-family: monospace; font-size: 0.82rem;">
                  HTTP Status: ${Me} ${Ke}
                </span>
                <span class="badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; font-size: 0.8rem;">
                  Latency: ${et}
                </span>
                <span class="badge" style="background: rgba(99, 102, 241, 0.15); color: #a5b4fc; font-size: 0.8rem;">
                  ${tt}
                </span>
              </div>
            </div>

            <!-- Detailed Message Box -->
            <div style="padding: 0.85rem 1rem; border-radius: 8px; background: ${re?"rgba(16, 185, 129, 0.1)":"rgba(239, 68, 68, 0.1)"}; border: 1px solid ${re?"rgba(16, 185, 129, 0.3)":"rgba(239, 68, 68, 0.3)"};">
              <div style="font-size: 0.88rem; font-weight: 700; color: ${re?"#34d399":"#f87171"}; margin-bottom: 0.25rem;">
                ${re?"MCP Handshake Verified":"Error Message / Diagnostics:"}
              </div>
              <p style="font-size: 0.84rem; color: #cbd5e1; margin: 0; line-height: 1.5;">
                ${re?it:rt}
              </p>
            </div>

            ${!re&&M.includes("mcp-test")?`
              <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.45;">
                👉 <strong>How to resolve:</strong> Make sure your n8n workflow tab is open, click the orange <strong>"Execute step"</strong> button on the MCP Server Trigger node, and then click <strong>"Test MCP Connection"</strong> again within 120 seconds.
              </div>
            `:""}
          </div>
        `),_(re?"MCP Server connection verified!":`MCP connection: ${Ke}`,re?"success":"error")}catch(oe){$&&($.textContent=`Connection failed: ${oe.message}`,$.style.color="#f87171"),B&&(B.style.display="block",B.innerHTML=`
          <div style="color: #f87171; font-weight: 700; font-size: 0.9rem;">
            ✕ Connection failed (HTTP Status: 0 Network Error)
          </div>
          <p style="color: #cbd5e1; font-size: 0.82rem; margin: 0.4rem 0 0 0;">
            ${oe.message}
          </p>
        `),_(`MCP connection failed: ${oe.message}`,"error")}};(Ce=document.getElementById("btn-test-mcp-connection"))==null||Ce.addEventListener("click",S),(Ae=document.getElementById("btn-test-mcp-ping"))==null||Ae.addEventListener("click",S),(ve=document.getElementById("btn-paste-new-user-webhook"))==null||ve.addEventListener("click",async()=>{try{const b=await navigator.clipboard.readText(),$=document.getElementById("settings-new-user-webhook-url");$&&b&&($.value=b.trim(),$.focus(),_("Webhook link pasted from clipboard!","success"))}catch{_("Clipboard access denied. Please paste manually (Ctrl+V).","warning")}}),(Be=document.getElementById("btn-clear-new-user-webhook"))==null||Be.addEventListener("click",()=>{const b=document.getElementById("settings-new-user-webhook-url");b&&(b.value="",b.focus()),_("Webhook URL cleared","info")}),(be=document.getElementById("btn-test-new-user-webhook"))==null||be.addEventListener("click",async()=>{var J;const b=document.getElementById("settings-new-user-webhook-url"),$=document.getElementById("new-user-webhook-status"),B=((J=b==null?void 0:b.value)==null?void 0:J.trim())||"";if(!B){_("Please enter an n8n Webhook URL first.","warning"),b&&b.focus();return}$&&($.textContent="⏳ Dispatching test sign-up data to n8n...",$.style.color="#fb923c");const M=document.getElementById("btn-test-new-user-webhook");M&&(M.disabled=!0);try{const te=await El(B);$&&(te.success?($.textContent=te.message||"✓ Connected! n8n accepted test sign-up payload.",$.style.color="#34d399",_("n8n Webhook connection verified successfully!","success")):($.textContent=te.message||"Connection test failed.",$.style.color="#f87171",_(te.message||"Webhook test failed","error")))}catch(te){$&&($.textContent=`Error: ${te.message}`,$.style.color="#f87171"),_(`Webhook test error: ${te.message}`,"error")}finally{M&&(M.disabled=!1)}}),(fe=document.getElementById("btn-save-new-user-webhook"))==null||fe.addEventListener("click",()=>{var M,J,te;const b=((J=(M=document.getElementById("settings-new-user-webhook-url"))==null?void 0:M.value)==null?void 0:J.trim())||"",$=((te=document.getElementById("settings-new-user-webhook-enabled"))==null?void 0:te.checked)??!0,B=document.getElementById("new-user-webhook-status");vr({newUserWebhookUrl:b,newUserWebhookEnabled:$}),B&&(B.textContent="✓ Webhook URL saved successfully!",B.style.color="#34d399",setTimeout(()=>{B&&(B.textContent="")},3500)),_("n8n New User Webhook saved!","success")}),(Ie=document.getElementById("btn-save-all-settings"))==null||Ie.addEventListener("click",()=>{var oe,re,Me,Ke,et,tt,rt,it,xt,St,_t;const b=((re=(oe=document.getElementById("settings-mcp-webhook-url"))==null?void 0:oe.value)==null?void 0:re.trim())||"",$=((Ke=(Me=document.getElementById("settings-mcp-secret"))==null?void 0:Me.value)==null?void 0:Ke.trim())||"",B=((tt=(et=document.getElementById("settings-admin-whatsapp-number"))==null?void 0:et.value)==null?void 0:tt.trim())||"",M=((it=(rt=document.getElementById("settings-admin-whatsapp-url"))==null?void 0:rt.value)==null?void 0:it.trim())||"",J=((St=(xt=document.getElementById("settings-new-user-webhook-url"))==null?void 0:xt.value)==null?void 0:St.trim())||"",te=((_t=document.getElementById("settings-new-user-webhook-enabled"))==null?void 0:_t.checked)??!0,ge=document.getElementById("settings-save-status");vr({mcpWebhookUrl:b,mcpSecretKey:$,adminWhatsappNumber:B,adminWhatsappUrl:M,newUserWebhookUrl:J,newUserWebhookEnabled:te}),ge&&(ge.textContent="✓ All settings saved successfully!",setTimeout(()=>{ge&&(ge.textContent="")},3500)),_("All settings (n8n Webhook, MCP & WhatsApp) saved!","success")})}function kn(r,e=se){return!r||r.length===0?`
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="margin-bottom: 0.5rem; font-size: 1rem; color: var(--text-pure); font-weight: 700;">No tools match your criteria.</p>
        <p style="font-size: 0.85rem;">Click "+ Add New AI Tool" above to insert a new tool, or clear your search filter.</p>
      </div>
    `:`
    <table class="admin-table">
      <thead>
        <tr>
          <th>Tool / Image</th>
          <th>Category</th>
          <th>Price (${Ze(e)} ${e})</th>
          <th>All Rates Set</th>
          <th>WhatsApp Link</th>
          <th>Video Tutorial</th>
          <th>Featured</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(i=>{const n=ui(i,e),a=i.countryPricing||{},s=!!(a[e]||e==="Pakistan"&&(a.Pakistan||a.pakistan||a.PK)||e==="India"&&(a.India||a.india||a.IN)||e==="United Arab Emirates"&&(a["United Arab Emirates"]||a.UAE||a.AE)||e==="Saudi Arabia"&&(a["Saudi Arabia"]||a.Saudi||a.SAR||a.SA)||e==="United States"&&(a["United States"]||a.US||a.USD)||e==="United Kingdom"&&(a["United Kingdom"]||a.UK||a.GBP||a.GB)),o=a.Pakistan||a.PK||"—",l=a.India||a.IN||"—",c=a["United Arab Emirates"]||a.UAE||"—",d=a["Saudi Arabia"]||a.SAR||"—",u=a["United States"]||a.USD||a.DEFAULT||i.price||"—";return`
          <tr data-tool-id="${i.id}">
            <td>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 56px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                  ${i.image?`<img src="${i.image}" alt="${i.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='';this.parentNode.innerHTML='<span style=\\'font-weight:700;color:var(--accent-cyan);\\'>${i.name.slice(0,2).toUpperCase()}</span>';" />`:`<span style="font-weight: 700; color: var(--accent-cyan); font-size: 0.85rem;">${i.name.slice(0,2).toUpperCase()}</span>`}
                </div>
                <div>
                  <div style="font-weight: 700; color: var(--text-pure);">${i.name}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">/${i.slug}</div>
                </div>
              </div>
            </td>
            <td><span class="badge badge-popular">${i.category}</span></td>
            <td>
              <div style="font-size: 0.95rem; font-weight: 800; color: ${s?"#34d399":"var(--accent-cyan)"}; white-space: nowrap;">
                ${n}
              </div>
              <div style="margin-top: 0.2rem;">
                ${s?'<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.65rem; border: 1px solid rgba(16, 185, 129, 0.35);">✓ Custom Rate</span>':'<span class="badge" style="background: rgba(148, 163, 184, 0.12); color: var(--text-muted); font-size: 0.65rem; border: 1px solid rgba(148, 163, 184, 0.2);">Default / USD</span>'}
              </div>
            </td>
            <td>
              <div style="font-size: 0.72rem; display: flex; flex-direction: column; gap: 0.15rem; color: var(--text-secondary); max-width: 170px;">
                <div><strong style="color: var(--text-muted);">🇵🇰 PK:</strong> <span style="color: var(--text-pure);">${o}</span></div>
                <div><strong style="color: var(--text-muted);">🇮🇳 IN:</strong> <span style="color: var(--text-pure);">${l}</span></div>
                <div><strong style="color: var(--text-muted);">🇦🇪 AE:</strong> <span style="color: var(--text-pure);">${c}</span></div>
                <div><strong style="color: var(--text-muted);">🇸🇦 SA:</strong> <span style="color: var(--text-pure);">${d}</span></div>
                <div><strong style="color: var(--text-muted);">🌐 USD:</strong> <span style="color: var(--text-pure);">${u}</span></div>
              </div>
            </td>
            <td>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); display: inline-block; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${i.whatsappUrl||""}">
                ${i.whatsappUrl?"wa.me linked":'<span style="color: #64748b;">None</span>'}
              </span>
            </td>
            <td>
              ${i.videoUrl||i.tutorialVideoUrl?'<span style="color: #38bdf8; font-size: 0.8rem; font-weight: 600;">✓ Linked</span>':'<span style="color: var(--text-muted); font-size: 0.8rem;">None</span>'}
            </td>
            <td>
              <button 
                class="badge ${i.featured?"badge-popular":""} toggle-featured-btn" 
                data-id="${i.id}" 
                data-featured="${!!i.featured}"
                style="cursor: pointer; border: 1px solid var(--border-glass); background: ${i.featured?"rgba(249, 115, 22, 0.2)":"transparent"}; color: ${i.featured?"#fb923c":"var(--text-muted)"};"
                title="Click to toggle featured status"
              >
                ${i.featured?"★ Featured":"☆ Normal"}
              </button>
            </td>
            <td>
              <button 
                class="badge ${i.active?"badge-popular":"badge-hot"} toggle-active-btn" 
                data-id="${i.id}" 
                data-active="${i.active}"
                style="cursor: pointer; border: none;"
                title="Click to toggle active status"
              >
                ${i.active?"● Active":"○ Inactive"}
              </button>
            </td>
            <td>
              <div style="display: flex; gap: 0.4rem;">
                <a href="#/tool/${i.slug||i.id}" class="btn-details" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="Preview tool in store">Preview</a>
                <button class="btn-details edit-tool-btn" data-id="${i.id}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: var(--accent-cyan);" title="Edit tool details">Edit</button>
                <button class="btn-details delete-tool-btn" data-id="${i.id}" data-name="${i.name}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #f87171;" title="Delete tool">Delete</button>
              </div>
            </td>
          </tr>
          `}).join("")}
      </tbody>
    </table>
  `}function xn(r,e){document.querySelectorAll(".toggle-active-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.id,a=!(t.dataset.active==="true");try{await V.adminToggleActive(i,a),_(`Tool status changed to ${a?"Active":"Inactive"}.`,"success"),de(e)}catch(s){_(`Error: ${s.message}`,"error")}}}),document.querySelectorAll(".toggle-featured-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.id,a=!(t.dataset.featured==="true");try{const s=r.find(o=>o.id===i);s&&(await V.adminSaveTool({...s,featured:a}),_(`Tool marked as ${a?"Featured":"Standard"}.`,"success"),de(e))}catch(s){_(`Error updating featured: ${s.message}`,"error")}}}),document.querySelectorAll(".edit-tool-btn").forEach(t=>{t.onclick=()=>{const i=t.dataset.id,n=r.find(a=>a.id===i);n&&pa(n,e,categories)}}),document.querySelectorAll(".delete-tool-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.id,n=t.dataset.name;if(confirm(`Are you sure you want to permanently delete "${n}" from Supabase?`))try{await V.adminDeleteTool(i),_(`Deleted "${n}" from Supabase.`,"success"),de(e)}catch(a){_(`Failed to delete: ${a.message}`,"error")}}})}function Sn(r){return!r||r.length===0?`
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-weight: 700; color: var(--text-pure);">No registered members found.</p>
      </div>
    `:`
    <table class="admin-table">
      <thead>
        <tr>
          <th>Member</th>
          <th>Email Address</th>
          <th>WhatsApp Number</th>
          <th>Country / Region</th>
          <th>Language</th>
          <th>Registered On</th>
          <th>Last Login</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(e=>{const t=e.role==="admin",i=(e.full_name||e.email||"U").charAt(0).toUpperCase(),n=(e.whatsapp_number||"").replace(/\D/g,""),a=e.created_at?new Date(e.created_at).toLocaleDateString():"Active",s=e.last_sign_in_at?new Date(e.last_sign_in_at).toLocaleDateString():"—",o=H.currentUser,l=(o==null?void 0:o.id)&&o.id===e.id||(o==null?void 0:o.email)&&o.email.toLowerCase()===(e.email||"").toLowerCase();return`
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: ${t?"linear-gradient(135deg, #0284c7, #6366f1)":"rgba(255,255,255,0.08)"}; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 0.85rem; border: 1px solid ${t?"rgba(56,189,248,0.5)":"var(--border-glass)"};">
                    ${i}
                  </div>
                  <span style="font-weight: 700; color: var(--text-pure);">${e.full_name||"VIP Member"}</span>
                </div>
              </td>
              <td style="color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.85rem;">${e.email}</td>
              <td>
                ${n?`
                  <a href="https://wa.me/${n}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-mint); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;" title="Chat on WhatsApp">
                    <span>${e.whatsapp_number}</span>
                    <span style="font-size: 0.7rem;">↗</span>
                  </a>
                `:'<span style="color: var(--text-muted); font-size: 0.82rem;">None</span>'}
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.4rem; font-weight: 600; color: var(--text-pure); font-size: 0.85rem;">
                  <span>${Ze(e.country)}</span>
                  <span>${e.country||"Pakistan"}</span>
                </div>
              </td>
              <td><span style="text-transform: uppercase; font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">${e.preferred_language||"en"}</span></td>
              <td style="font-size: 0.82rem; color: var(--text-muted);">${a}</td>
              <td style="font-size: 0.82rem; color: var(--accent-cyan); font-family: var(--font-mono);">${s}</td>
              <td>
                <span style="font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 999px; ${t?"background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4);":"background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);"}">
                  ${t?"🛡️ Administrator":"VIP Member"}
                </span>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                  <button 
                    class="btn-details toggle-user-role-btn" 
                    data-user-id="${e.id}" 
                    data-user-role="${e.role}"
                    ${l?'disabled title="You cannot change your own role"':""}
                    style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: ${t?"#f59e0b":"var(--accent-cyan)"}; ${l?"opacity: 0.45; cursor: not-allowed;":""}"
                  >
                    ${t?"Demote to Member":"Promote to Admin"}
                  </button>

                  ${l?`
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-style: italic; padding: 0.3rem 0.5rem; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px solid var(--border-glass);">(You)</span>
                  `:`
                    <button 
                      class="btn-details delete-user-btn" 
                      data-user-id="${e.id}" 
                      data-user-email="${e.email}"
                      data-user-name="${(e.full_name||e.email||"User").replace(/"/g,"&quot;")}"
                      style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.08); display: inline-flex; align-items: center; gap: 0.3rem;"
                      title="Delete user permanently from Supabase"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                  `}
                </div>
              </td>
            </tr>
          `}).join("")}
      </tbody>
    </table>
  `}function _n(r,e){document.querySelectorAll(".toggle-user-role-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.userId,a=t.dataset.userRole==="admin"?"member":"admin";if(confirm(`Change this user's role to "${a.toUpperCase()}"?`))try{await H.updateUserRole(i,a),_(`User role updated to ${a}.`,"success"),de(e)}catch(s){_(`Failed to update role: ${s.message}`,"error")}}}),document.querySelectorAll(".delete-user-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.userId,n=t.dataset.userEmail,a=t.dataset.userName||n;if(!confirm(`Are you sure you want to permanently delete user "${a}" (${n})?

This will remove their profile and login access from Supabase database.`))return;t.disabled=!0;const s=t.innerHTML;t.innerHTML='<span style="color: #ef4444;">Deleting...</span>';try{await H.deleteUser(i),_(`User "${a}" has been successfully deleted from Supabase.`,"success"),de(e)}catch(o){_(`Failed to delete user: ${o.message}`,"error"),t.disabled=!1,t.innerHTML=s}}})}function An(r){return!r||r.length===0?`
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</div>
        <p style="font-weight: 700; color: var(--text-pure); font-size: 1.05rem;">No categories found.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Click "+ Add New Category" above to create your first category.</p>
      </div>
    `:`
    <table class="admin-table">
      <thead>
        <tr>
          <th style="width: 70px;">Media</th>
          <th>Category & Slug</th>
          <th>Description & Details</th>
          <th>Theme Color</th>
          <th>Assigned Tools</th>
          <th>Sort Order</th>
          <th style="text-align: right;">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(e=>`
          <tr data-category-id="${e.id}">
            <td>
              <div style="width: 44px; height: 44px; border-radius: 12px; background: ${e.color||"#6366f1"}20; border: 1px solid ${e.color||"#6366f1"}40; display: flex; align-items: center; justify-content: center; overflow: hidden; font-size: 1.35rem; flex-shrink: 0;">
                ${e.image?`<img src="${e.image}" alt="${e.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.style.display='none';this.parentNode.innerHTML='<span>${e.icon||"✨"}</span>';" />`:`<span>${e.icon||"✨"}</span>`}
              </div>
            </td>
            <td>
              <div>
                <div style="font-weight: 700; color: var(--text-pure); font-size: 0.95rem;">${e.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">/${e.slug||e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}</div>
              </div>
            </td>
            <td style="max-width: 320px;">
              <div style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" title="${e.description||e.desc||""}">
                ${e.description||e.desc||'<span style="color: #64748b; font-style: italic;">No description provided</span>'}
              </div>
            </td>
            <td>
              <div style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.25rem 0.65rem; border-radius: 9999px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); font-size: 0.75rem; font-family: var(--font-mono);">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${e.color||"#6366f1"};"></span>
                <span>${e.color||"#6366f1"}</span>
              </div>
            </td>
            <td>
              <span class="badge ${e.count>0?"badge-popular":""}" style="font-size: 0.78rem;">
                ${e.count||0} ${e.count===1?"Tool":"Tools"}
              </span>
            </td>
            <td style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">
              #${e.sortOrder??0}
            </td>
            <td style="text-align: right;">
              <div style="display: inline-flex; gap: 0.4rem; justify-content: flex-end;">
                <a href="#/tools?category=${encodeURIComponent(e.name)}" class="btn-details" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="View category in store">Store</a>
                <button class="btn-details edit-category-btn" data-id="${e.id}" data-name="${e.name}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: var(--accent-cyan);" title="Edit category details">Edit</button>
                <button class="btn-details delete-category-btn" data-id="${e.id}" data-name="${e.name}" data-count="${e.count||0}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #f87171;" title="Delete category">Delete</button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function Tn(r,e,t=[]){document.querySelectorAll(".edit-category-btn").forEach(i=>{i.onclick=()=>{const n=i.dataset.id,a=i.dataset.name,s=r.find(o=>o.id===n||o.name===a);s&&wr(s,e,t)}}),document.querySelectorAll(".delete-category-btn").forEach(i=>{i.onclick=async()=>{const n=i.dataset.id,a=i.dataset.name,s=parseInt(i.dataset.count,10)||0,o=s>0?`⚠️ Category "${a}" currently has ${s} tool(s) assigned to it.

Are you sure you want to permanently delete this category?`:`Are you sure you want to permanently delete category "${a}"?`;if(confirm(o))try{await V.adminDeleteCategory(n,a),_(`Category "${a}" deleted successfully.`,"success"),de(e)}catch(l){_(`Failed to delete category: ${l.message}`,"error")}}})}function wr(r,e,t=[]){const i=document.getElementById("modal-root")||document.body,n=!!r,a=r||{name:"",slug:"",icon:"✨",color:"#6366f1",description:"",image:"",sortOrder:t.length+1},s=document.createElement("div");s.className="modal-backdrop auth-backdrop-fade",s.innerHTML=`
    <div class="modal-card" style="max-width: 640px; max-height: 92vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800;">
            ${n?`Edit Category: ${a.name}`:"Create New AI Category"}
          </h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
            Configure category metadata, icon, theme color, custom details, and banner image.
          </p>
        </div>
        <button id="cat-editor-close" class="modal-close-btn">&times;</button>
      </div>

      <form id="category-editor-form">
        <!-- Name & Slug -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Category Name *</label>
            <input type="text" id="cat-name" class="form-input" value="${a.name||""}" placeholder="e.g. AI Video Creation" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="cat-slug" class="form-input" value="${a.slug||""}" placeholder="e.g. ai-video-creation" required />
          </div>
        </div>

        <!-- Icon, Color & Sort Order -->
        <div style="display: grid; grid-template-columns: 0.6fr 1fr 0.6fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Icon (Emoji) *</label>
            <input type="text" id="cat-icon" class="form-input" value="${a.icon||"✨"}" placeholder="🎬" required style="font-size: 1.2rem; text-align: center;" />
          </div>
          <div class="form-group">
            <label class="form-label">Theme Color *</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input type="color" id="cat-color-picker" value="${a.color||"#6366f1"}" style="width: 44px; height: 40px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: transparent; cursor: pointer; padding: 2px;" />
              <input type="text" id="cat-color-text" class="form-input" value="${a.color||"#6366f1"}" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Sort Order</label>
            <input type="number" id="cat-sort-order" class="form-input" value="${a.sortOrder??0}" min="0" />
          </div>
        </div>

        <!-- Preset Color Badges Row -->
        <div style="margin: -0.5rem 0 1.25rem 0; display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${["#a855f7","#3b82f6","#10b981","#f97316","#ec4899","#eab308","#06b6d4","#6366f1","#14b8a6","#ef4444"].map(D=>`
            <button type="button" class="preset-color-btn" data-color="${D}" style="width: 24px; height: 24px; border-radius: 50%; background: ${D}; border: 2px solid ${a.color===D?"#ffffff":"transparent"}; cursor: pointer; transition: transform 0.15s;"></button>
          `).join("")}
        </div>

        <!-- Details / Description -->
        <div class="form-group">
          <label class="form-label">Category Description & Details *</label>
          <textarea id="cat-description" class="form-textarea" style="min-height: 85px;" placeholder="Comprehensive details explaining what AI tools and creative workflows belong in this category..." required>${a.description||a.desc||""}</textarea>
        </div>

        <!-- Category Image Upload & Preview -->
        <div class="form-group">
          <label class="form-label">Category Image / Banner (Optional)</label>
          <div style="display: flex; gap: 0.75rem; margin-bottom: 0.6rem;">
            <input type="text" id="cat-image-url" class="form-input" value="${a.image||""}" placeholder="https://example.com/category-banner.png" style="flex: 1;" />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="cat-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="cat-upload-status" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-bottom: 0.5rem;"></span>

          <!-- Live Image Preview Container -->
          <div id="cat-image-preview-wrap" style="${a.image?"display: flex;":"display: none;"} align-items: center; gap: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-glass); border-radius: var(--radius-md);">
            <img id="cat-image-preview" src="${a.image||""}" alt="Preview" style="width: 70px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-glass);" />
            <div style="flex: 1; font-size: 0.8rem; color: var(--text-muted);">
              Live Image / Banner Preview
            </div>
            <button type="button" id="cat-image-clear" class="btn-details" style="color: #f87171; font-size: 0.75rem;">Clear Image</button>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem; margin-top: 1.5rem;">
          <button type="button" id="cat-cancel-btn" class="btn btn-secondary">Cancel</button>
          <button type="submit" id="cat-submit-btn" class="btn btn-primary" style="padding: 0.75rem 1.75rem; font-weight: 700;">
            ${n?"Save Category Changes":"Create Category"}
          </button>
        </div>
      </form>
    </div>
  `,i.appendChild(s);const o=()=>s.remove();s.onclick=o,document.getElementById("cat-editor-close").onclick=o,document.getElementById("cat-cancel-btn").onclick=o;const l=document.getElementById("cat-name"),c=document.getElementById("cat-slug");n||(l.oninput=()=>{c.value=l.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")});const d=document.getElementById("cat-color-picker"),u=document.getElementById("cat-color-text");d.oninput=()=>{u.value=d.value},u.oninput=()=>{/^#[0-9a-f]{6}$/i.test(u.value)&&(d.value=u.value)},document.querySelectorAll(".preset-color-btn").forEach(D=>{D.onclick=()=>{const I=D.dataset.color;d.value=I,u.value=I,document.querySelectorAll(".preset-color-btn").forEach(E=>E.style.borderColor="transparent"),D.style.borderColor="#ffffff"}});const p=document.getElementById("cat-image-file"),h=document.getElementById("cat-image-url"),m=document.getElementById("cat-upload-status"),f=document.getElementById("cat-image-preview-wrap"),v=document.getElementById("cat-image-preview"),y=document.getElementById("cat-image-clear"),w=D=>{D?(v.src=D,f.style.display="flex"):(f.style.display="none",v.src="")};h.oninput=()=>w(h.value.trim()),y&&(y.onclick=()=>{h.value="",w("")}),p.onchange=async D=>{const I=D.target.files[0];if(I){m.textContent="Processing & uploading category image...",m.style.display="block";try{const E=await ci(I,"categories");h.value=E,w(E),m.textContent="✓ Image uploaded successfully!",m.style.color="var(--accent-mint)"}catch(E){m.textContent=`Upload error: ${E.message}`,m.style.color="#f87171"}}};const k=document.getElementById("category-editor-form"),P=document.getElementById("cat-submit-btn");k.onsubmit=async D=>{D.preventDefault(),P.textContent="Saving Category...",P.disabled=!0;const I={id:a.id,name:l.value.trim(),slug:c.value.trim(),icon:document.getElementById("cat-icon").value.trim()||"✨",color:u.value.trim()||"#6366f1",description:document.getElementById("cat-description").value.trim(),image:h.value.trim(),sortOrder:parseInt(document.getElementById("cat-sort-order").value,10)||0};try{await V.adminSaveCategory(I),_(`Category "${I.name}" saved successfully!`,"success"),o(),ee="categories",de(e)}catch(E){_(`Category save error: ${E.message}`,"error"),P.textContent=n?"Save Category Changes":"Create Category",P.disabled=!1}}}function pa(r,e,t=[]){var $,B,M,J,te,ge,oe,re,Me,Ke,et,tt,rt,it,xt,St,_t,fi,vi,yi,bi,wi;const i=document.getElementById("modal-root")||document.body,n=t.length>0?typeof t[0]=="string"?t[0]:t[0].name:"Ai Tools",a=r||{name:"",slug:"",category:n,price:"$19 /month",shortDescription:"",fullDescription:"",image:"",tutorialVideoUrl:"",whatsappUrl:"",toolUrl:"",rating:4.8,userCount:"10.5K",featured:!1,active:!0,sortOrder:0,features:["Instant Access","Video Tutorial Included","24/7 Priority Support"],howToUse:[{step:1,title:"Open the tool",text:"Sign in using the credentials provided."},{step:2,title:"Input your prompt",text:"Choose your desired template or generate content."}]},s=(a.price||"$19 /month").trim();let o="USD",l="19",c="month",d="";/pkr/i.test(s)||/rs/i.test(s)?o="PKR":/inr/i.test(s)||/₹/.test(s)?o="INR":/aed/i.test(s)?o="AED":(/\$/.test(s)||/usd/i.test(s))&&(o="USD");const u=s.match(/[\d,.]+/);if(u&&(l=u[0].replace(/,/g,"")),s.includes("/")){const A=s.split("/")[1].trim(),R=A.toLowerCase();R==="month"||R==="mo"?c="month":R==="year"||R==="yr"?c="year":R.includes("3 month")?c="3months":R.includes("6 month")?c="6months":R.includes("12 month")?c="12months":R.includes("18 month")?c="18months":R.includes("lifetime")||R.includes("one-time")?c="lifetime":(c="custom",d=A)}else/lifetime|one-time/i.test(s)&&(c="lifetime");const p=document.createElement("div");p.className="modal-backdrop auth-backdrop-fade",p.innerHTML=`
    <div class="modal-card" style="max-width: 720px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800;">
            ${isEdit?`Edit AI Tool: ${a.name}`:"Add New AI Tool to Supabase"}
          </h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
            Fill in product information, dynamic category, pricing, WhatsApp links, and media.
          </p>
        </div>
        <button id="editor-modal-close" class="modal-close-btn">&times;</button>
      </div>

      <form id="supabase-tool-form">
        <!-- Name & Slug -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Tool Name *</label>
            <input type="text" id="tool-name" class="form-input" value="${a.name||""}" placeholder="e.g. WriteGen AI" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="tool-slug" class="form-input" value="${a.slug||""}" placeholder="e.g. writegen-ai" required />
          </div>
        </div>

        <!-- Category & Base Price -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label class="form-label" style="margin-bottom: 0;">Category *</label>
              <button type="button" id="quick-add-cat-btn" style="background: none; border: none; color: var(--accent-cyan); font-size: 0.78rem; font-weight: 600; cursor: pointer; text-decoration: underline;">
                + New Category
              </button>
            </div>
            <select id="tool-category" class="sort-select" style="width: 100%; border-radius: var(--radius-md);">
              ${t.length>0?t.map(A=>{const R=typeof A=="string"?A:A.name,C=typeof A=="object"&&A.icon?A.icon:"✨";return`
                      <option value="${R}" ${(a.category||"").toLowerCase()===R.toLowerCase()?"selected":""}>
                        ${C} ${R}
                      </option>
                    `}).join(""):`
                  <option value="${a.category||"Ai Tools"}" selected>✨ ${a.category||"Ai Tools"}</option>
                `}
            </select>
          </div>
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label class="form-label" style="margin-bottom: 0;">Global / Default Price *</label>
              <span style="font-size: 0.72rem; color: var(--accent-mint); font-weight: 600;">Auto-syncs with Builder</span>
            </div>
            <input type="text" id="tool-price" class="form-input" value="${a.price||"$19 /month"}" placeholder="e.g. 500 PKR / 18 Months" required />
          </div>
        </div>

        <!-- Interactive Pricing & Duration Studio / Builder -->
        <div class="pricing-studio-container">
          <div class="pricing-studio-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.45rem;">
                <span style="font-size: 1.1rem;">💎</span>
                <span style="font-weight: 800; color: var(--text-pure); font-size: 0.95rem;">Payment Duration & Currency Studio</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
                Set monthly, yearly, 18-month, or custom plans with instant PKR, $, and currency presets:
              </p>
            </div>
            <div class="pricing-live-pill" id="pricing-live-preview-pill" title="Live Preview of Formatted Rate">
              <span>✦ Live Price:</span>
              <span id="pricing-live-text" style="color: #ffffff;">${a.price||"$19 /month"}</span>
            </div>
          </div>

          <!-- 1. Billing Duration Options -->
          <div style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 0.35rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Billing Duration / Plan Period:
            </label>
            <div class="pricing-duration-grid" id="pricing-duration-buttons">
              <button type="button" class="duration-pill-btn ${c==="month"?"active":""}" data-duration="month">Monthly (/month)</button>
              <button type="button" class="duration-pill-btn ${c==="year"?"active":""}" data-duration="year">Yearly (/year)</button>
              <button type="button" class="duration-pill-btn ${c==="3months"?"active":""}" data-duration="3months">3 Months Plan</button>
              <button type="button" class="duration-pill-btn ${c==="6months"?"active":""}" data-duration="6months">6 Months Plan</button>
              <button type="button" class="duration-pill-btn ${c==="12months"?"active":""}" data-duration="12months">12 Months Plan</button>
              <button type="button" class="duration-pill-btn ${c==="18months"?"active":""}" data-duration="18months">18 Months Plan</button>
              <button type="button" class="duration-pill-btn ${c==="lifetime"?"active":""}" data-duration="lifetime">Lifetime (One-Time)</button>
              <button type="button" class="duration-pill-btn ${c==="custom"?"active":""}" data-duration="custom">✏️ Custom Duration</button>
            </div>
            
            <!-- Custom Duration Input Row (shown when Custom is selected) -->
            <div id="custom-duration-row" style="display: ${c==="custom"?"flex":"none"}; align-items: center; gap: 0.75rem; margin-top: 0.4rem;">
              <span style="font-size: 0.78rem; color: var(--text-secondary); white-space: nowrap;">Custom Plan Name / Period:</span>
              <input type="text" id="custom-duration-input" class="form-input" style="padding: 0.4rem 0.75rem; font-size: 0.85rem;" value="${d||"18 Months"}" placeholder="e.g. 18 Months, 2 Years, or 90 Days" />
            </div>
          </div>

          <!-- 2. Currency Selector & Quick Presets -->
          <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 1rem; align-items: start;">
            <div>
              <label class="form-label" style="font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--accent-cyan);">
                Primary Currency:
              </label>
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="pricing-currency-buttons">
                <button type="button" class="currency-select-btn ${o==="PKR"?"active":""}" data-curr="PKR">🇵🇰 PKR (Rs)</button>
                <button type="button" class="currency-select-btn ${o==="USD"?"active":""}" data-curr="USD">🇺🇸 USD ($)</button>
                <button type="button" class="currency-select-btn ${o==="INR"?"active":""}" data-curr="INR">🇮🇳 INR (₹)</button>
                <button type="button" class="currency-select-btn ${o==="AED"?"active":""}" data-curr="AED">🇦🇪 AED</button>
              </div>
              <div style="margin-top: 0.6rem;">
                <label class="form-label" style="font-size: 0.76rem; margin-bottom: 0.25rem;">Numeric Price / Amount:</label>
                <input type="number" id="pricing-numeric-amount" class="form-input" value="${l||500}" min="0" step="any" placeholder="e.g. 500 or 19" style="font-weight: 700; font-family: var(--font-mono);" />
              </div>
            </div>

            <div>
              <label class="form-label" style="font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--accent-cyan);">
                Quick Fill Amount Presets:
              </label>
              
              <!-- PKR Fillers -->
              <div id="presets-pkr-row" style="display: ${o==="PKR"?"block":"none"};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular PKR rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="250">Rs 250</button>
                  <button type="button" class="quick-amount-chip" data-amount="500">500 PKR</button>
                  <button type="button" class="quick-amount-chip" data-amount="1000">Rs 1,000</button>
                  <button type="button" class="quick-amount-chip" data-amount="1500">1,500 PKR</button>
                  <button type="button" class="quick-amount-chip" data-amount="2500">2,500 PKR</button>
                  <button type="button" class="quick-amount-chip" data-amount="5000">5,000 PKR</button>
                </div>
              </div>

              <!-- USD Fillers -->
              <div id="presets-usd-row" style="display: ${o==="USD"?"block":"none"};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular USD ($) rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="5">$5</button>
                  <button type="button" class="quick-amount-chip" data-amount="9">$9</button>
                  <button type="button" class="quick-amount-chip" data-amount="15">$15</button>
                  <button type="button" class="quick-amount-chip" data-amount="19">$19</button>
                  <button type="button" class="quick-amount-chip" data-amount="29">$29</button>
                  <button type="button" class="quick-amount-chip" data-amount="49">$49</button>
                  <button type="button" class="quick-amount-chip" data-amount="99">$99</button>
                </div>
              </div>

              <!-- INR Fillers -->
              <div id="presets-inr-row" style="display: ${o==="INR"?"block":"none"};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular INR (₹) rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="299">₹299</button>
                  <button type="button" class="quick-amount-chip" data-amount="499">₹499</button>
                  <button type="button" class="quick-amount-chip" data-amount="999">₹999</button>
                  <button type="button" class="quick-amount-chip" data-amount="1499">₹1,499</button>
                </div>
              </div>

              <!-- AED Fillers -->
              <div id="presets-aed-row" style="display: ${o==="AED"?"block":"none"};">
                <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Popular AED rates:</span>
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <button type="button" class="quick-amount-chip" data-amount="29">AED 29</button>
                  <button type="button" class="quick-amount-chip" data-amount="49">AED 49</button>
                  <button type="button" class="quick-amount-chip" data-amount="89">AED 89</button>
                  <button type="button" class="quick-amount-chip" data-amount="149">AED 149</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Country-Specific Pricing (Geo-Targeted Rates) -->
        <div class="geo-pricing-container">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <div style="display: flex; align-items: center; gap: 0.45rem;">
              <span style="font-size: 1.1rem;">🌍</span>
              <label class="form-label" style="margin-bottom: 0; font-weight: 800; color: var(--text-pure);">
                Country-Specific Pricing (Geo-Pricing)
              </label>
            </div>
            <span style="font-size: 0.72rem; color: var(--accent-mint); font-weight: 700;">✓ Live Verification Synced</span>
          </div>
          <p style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 0.75rem;">
            Define exact localized prices for Pakistan, India, UAE, and Global visitors:
          </p>

          <!-- Master Geo Auto-Fill Bar -->
          <div class="geo-auto-fill-bar">
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--accent-cyan); white-space: nowrap;">⚡ Quick Fillers:</span>
            <button type="button" id="geo-fill-all-smart" class="admin-chip-btn" style="color: var(--accent-mint); border-color: rgba(16, 185, 129, 0.35);" title="Auto-fill all countries with their native currencies using the current plan duration">
              ⚡ Smart Fill All (PKR + $ + ₹ + AED)
            </button>
            <button type="button" id="geo-fill-pkr-all" class="admin-chip-btn" title="Set PKR rate across all countries">
              🇵🇰 Set All to PKR
            </button>
            <button type="button" id="geo-fill-usd-all" class="admin-chip-btn" title="Set USD ($) rate across all countries">
              🇺🇸 Set All to USD ($)
            </button>
            <button type="button" id="geo-sync-duration-all" class="admin-chip-btn" style="color: #a855f7; border-color: rgba(168, 85, 247, 0.35);" title="Keep current amounts but sync duration suffix across all country inputs">
              ⏱️ Sync Duration to All
            </button>
          </div>

          <div class="geo-pricing-grid">
            <!-- Pakistan -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇵🇰</span>
                <span>Pakistan Price (PKR)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-pakistan" 
                class="form-input geo-price-input" 
                value="${(($=a.countryPricing)==null?void 0:$.Pakistan)||((B=a.countryPricing)==null?void 0:B.pakistan)||""}" 
                placeholder="e.g. 500 PKR / 18 Months" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="500">500 PKR</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="1000">1,000 PKR</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="1500">1,500 PKR</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-pakistan" data-prefix="PKR" data-val="2500">2,500 PKR</button>
              </div>
            </div>

            <!-- India -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇮🇳</span>
                <span>India Price (INR)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-india" 
                class="form-input geo-price-input" 
                value="${((M=a.countryPricing)==null?void 0:M.India)||((J=a.countryPricing)==null?void 0:J.india)||""}" 
                placeholder="e.g. ₹499 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-india" data-prefix="INR" data-val="299">₹299</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-india" data-prefix="INR" data-val="499">₹499</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-india" data-prefix="INR" data-val="999">₹999</button>
              </div>
            </div>

            <!-- UAE -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇦🇪</span>
                <span>UAE / Middle East (AED)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-uae" 
                class="form-input geo-price-input" 
                value="${((te=a.countryPricing)==null?void 0:te["United Arab Emirates"])||((ge=a.countryPricing)==null?void 0:ge.UAE)||""}" 
                placeholder="e.g. AED 49 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uae" data-prefix="AED" data-val="29">AED 29</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uae" data-prefix="AED" data-val="49">AED 49</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uae" data-prefix="AED" data-val="89">AED 89</button>
              </div>
            </div>

            <!-- Saudi Arabia -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇸🇦</span>
                <span>Saudi Arabia (SAR)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-saudi" 
                class="form-input geo-price-input" 
                value="${((oe=a.countryPricing)==null?void 0:oe["Saudi Arabia"])||((re=a.countryPricing)==null?void 0:re.Saudi)||((Me=a.countryPricing)==null?void 0:Me.SAR)||""}" 
                placeholder="e.g. SAR 49 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-saudi" data-prefix="SAR" data-val="29">SAR 29</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-saudi" data-prefix="SAR" data-val="49">SAR 49</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-saudi" data-prefix="SAR" data-val="89">SAR 89</button>
              </div>
            </div>

            <!-- United States -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇺🇸</span>
                <span>United States (USD)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-us" 
                class="form-input geo-price-input" 
                value="${((Ke=a.countryPricing)==null?void 0:Ke["United States"])||((et=a.countryPricing)==null?void 0:et.US)||((tt=a.countryPricing)==null?void 0:tt.USD)||""}" 
                placeholder="e.g. $19 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-us" data-prefix="USD" data-val="9">$9</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-us" data-prefix="USD" data-val="19">$19</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-us" data-prefix="USD" data-val="29">$29</button>
              </div>
            </div>

            <!-- United Kingdom -->
            <div class="geo-country-card">
              <div class="geo-country-label">
                <span>🇬🇧</span>
                <span>United Kingdom (GBP)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-uk" 
                class="form-input geo-price-input" 
                value="${((rt=a.countryPricing)==null?void 0:rt["United Kingdom"])||((it=a.countryPricing)==null?void 0:it.UK)||((xt=a.countryPricing)==null?void 0:xt.GBP)||""}" 
                placeholder="e.g. £15 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uk" data-prefix="GBP" data-val="9">£9</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uk" data-prefix="GBP" data-val="15">£15</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-uk" data-prefix="GBP" data-val="25">£25</button>
              </div>
            </div>

            <!-- Global / Others -->
            <div class="geo-country-card" style="border-color: rgba(56, 189, 248, 0.35);">
              <div class="geo-country-label" style="color: var(--accent-cyan);">
                <span>🌐</span>
                <span>Other Countries (USD)</span>
              </div>
              <input 
                type="text" 
                id="geo-price-default" 
                class="form-input geo-price-input" 
                value="${((St=a.countryPricing)==null?void 0:St.DEFAULT)||((_t=a.countryPricing)==null?void 0:_t.default)||a.price||"$19 /month"}" 
                placeholder="e.g. $19 /month" 
              />
              <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-top: 0.2rem;">
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="9">$9</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="19">$19</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="29">$29</button>
                <button type="button" class="quick-amount-chip country-quick-chip" data-target="geo-price-default" data-prefix="USD" data-val="49">$49</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tool Special Discount (% OFF) -->
        <div class="form-group" style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.5rem;">
            <label class="form-label" for="tool-discount-percent" style="color: #fca5a5; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>🔥</span> Tool Special Discount (% OFF):
            </label>
            <span style="font-size: 0.72rem; color: #f87171;">Leave 0 for regular price</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <input 
              type="number" 
              id="tool-discount-percent" 
              class="form-input" 
              min="0" 
              max="100" 
              value="${a.discountPercent||0}" 
              placeholder="e.g. 20" 
              style="width: 110px; font-weight: 700; color: #f87171; text-align: center;" 
            />
            <span style="font-size: 0.88rem; font-weight: 800; color: #f87171;">% OFF</span>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
              <button type="button" class="quick-amount-chip" onclick="document.getElementById('tool-discount-percent').value='10'">10%</button>
              <button type="button" class="quick-amount-chip" onclick="document.getElementById('tool-discount-percent').value='20'">20%</button>
              <button type="button" class="quick-amount-chip" onclick="document.getElementById('tool-discount-percent').value='30'">30%</button>
              <button type="button" class="quick-amount-chip" onclick="document.getElementById('tool-discount-percent').value='50'">50%</button>
              <button type="button" class="quick-amount-chip" onclick="document.getElementById('tool-discount-percent').value='0'" style="color: #94a3b8;">Clear (0%)</button>
            </div>
          </div>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0.4rem 0 0 0;">
            When set &gt; 0%, the storefront card and details page will highlight the discount badge and strikethrough original price with updated latest price.
          </p>
        </div>

        <!-- Tool Image / Media Banner with Live High-Fidelity Preview -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label class="form-label" style="margin-bottom: 0;">Tool Image / Media Banner *</label>
            <span style="font-size: 0.72rem; color: var(--accent-cyan);">✦ Renders prominent high-res banner on storefront</span>
          </div>
          <div style="display: flex; gap: 0.75rem; margin-bottom: 0.6rem;">
            <input type="text" id="tool-image-url" class="form-input" value="${a.image||""}" placeholder="https://example.com/banner-or-logo.png" style="flex: 1;" />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="tool-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="upload-status-text" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-bottom: 0.5rem;"></span>

          <!-- Live Card Media Banner Preview Container -->
          <div id="tool-image-preview-wrap" style="padding: 0.85rem; background: rgba(0,0,0,0.35); border: 1px dashed var(--border-glass); border-radius: var(--radius-md);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-pure);">Live Card Banner Preview:</span>
              <button type="button" id="tool-image-clear" class="btn-details" style="color: #f87171; font-size: 0.75rem; display: ${a.image?"inline-block":"none"};">Clear Image</button>
            </div>
            
            <div class="tool-modal-banner-preview" id="modal-banner-box">
              ${a.image?`
                <div class="tool-modal-banner-ambient" id="modal-banner-ambient" style="background-image: url('${a.image}');"></div>
                <img class="tool-modal-banner-img" id="tool-image-preview" src="${a.image}" alt="Banner Preview" />
                <div style="position: absolute; top: 10px; left: 10px; z-index: 3;" class="badge badge-popular" id="modal-preview-cat-badge">${a.category||"AI Tool"}</div>
                <div style="position: absolute; bottom: 10px; right: 10px; z-index: 3; background: rgba(0,0,0,0.75); border: 1px solid var(--accent-cyan); color: #38bdf8; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;" id="modal-preview-price-badge">${a.price||"$19 /month"}</div>
              `:`
                <div style="text-align: center; color: var(--text-muted); padding: 1.5rem;" id="modal-banner-empty">
                  <div style="font-size: 2rem; margin-bottom: 0.35rem;">🖼️</div>
                  <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">No Image Selected Yet</div>
                  <div style="font-size: 0.72rem; margin-top: 0.2rem;">Upload a file or paste an image URL above to preview how your banner displays</div>
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Short Description with Bullet Points Support -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label class="form-label" style="margin-bottom: 0;">Short Description (Card Summary Points) *</label>
            <span style="font-size: 0.72rem; color: var(--accent-cyan);">✦ Paste with points (• or -) or 1 per line</span>
          </div>
          <textarea id="tool-short-desc" class="form-textarea" style="min-height: 85px;" placeholder="• Point 1: Key capability&#10;• Point 2: Instant activation&#10;• Point 3: Best monthly price" required>${a.shortDescription||""}</textarea>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">
            Points pasted with bullets or on newlines will be rendered as clean vertical list items on the tool cards.
          </p>
        </div>

        <!-- Full Description -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label class="form-label" style="margin-bottom: 0;">Full Description (Tool Details Page) *</label>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Points & paragraphs supported</span>
          </div>
          <textarea id="tool-full-desc" class="form-textarea" style="min-height: 95px;" placeholder="Comprehensive overview of capabilities, use cases, and prompt styles..." required>${a.fullDescription||a.description||""}</textarea>
        </div>

        <!-- WhatsApp Purchase URL -->
        <div class="form-group">
          <label class="form-label">WhatsApp Purchase URL *</label>
          <input type="text" id="tool-whatsapp-url" class="form-input" value="${a.whatsappUrl||""}" placeholder="https://wa.me/1234567890?text=I+want+to+buy" required />
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
            This link is opened when visitors click "Buy Now" on the tool card or details page.
          </p>
        </div>

        <!-- Tutorial Video URL -->
        <div class="form-group">
          <label class="form-label">Tutorial Video URL (YouTube embed or MP4)</label>
          <input type="text" id="tool-video-url" class="form-input" value="${a.tutorialVideoUrl||a.videoUrl||""}" placeholder="https://www.youtube.com/embed/..." />
        </div>

        <!-- Tool Official URL -->
        <div class="form-group">
          <label class="form-label">Official Tool Website URL</label>
          <input type="text" id="tool-official-url" class="form-input" value="${a.toolUrl||""}" placeholder="https://tool.ai" />
        </div>

        <!-- Rating, Users Count, Sort Order -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Rating</label>
            <input type="number" step="0.05" min="1" max="5" id="tool-rating" class="form-input" value="${a.rating||4.8}" />
          </div>
          <div class="form-group">
            <label class="form-label">Users Count</label>
            <input type="text" id="tool-users-count" class="form-input" value="${a.userCount||"10.5K"}" />
          </div>
          <div class="form-group">
            <label class="form-label">Sort Order</label>
            <input type="number" id="tool-sort-order" class="form-input" value="${a.sortOrder||0}" />
          </div>
        </div>

        <!-- Features List (Comma or newline separated) -->
        <div class="form-group">
          <label class="form-label">Features (1 per line)</label>
          <textarea id="tool-features" class="form-textarea" style="min-height: 70px;" placeholder="Feature 1&#10;Feature 2&#10;Feature 3">${Array.isArray(a.features)?a.features.join(`
`):""}</textarea>
        </div>

        <!-- Toggles: Featured & Active -->
        <div style="display: flex; gap: 2rem; margin: 1rem 0 1.5rem 0;">
          <label style="display: flex; align-items: center; gap: 0.55rem; cursor: pointer; color: var(--text-pure);">
            <input type="checkbox" id="tool-featured" ${a.featured?"checked":""} style="width: 18px; height: 18px; cursor: pointer;" />
            <span style="font-weight: 600;">Mark as Featured Tool</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.55rem; cursor: pointer; color: var(--text-pure);">
            <input type="checkbox" id="tool-active" ${a.active!==!1?"checked":""} style="width: 18px; height: 18px; cursor: pointer;" />
            <span style="font-weight: 600;">Active (Visible on public store)</span>
          </label>
        </div>

        <!-- Submit & Cancel Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
          <button type="button" id="editor-cancel-btn" class="btn btn-secondary">Cancel</button>
          <button type="submit" id="editor-submit-btn" class="btn btn-primary" style="padding: 0.75rem 1.75rem; font-weight: 700;">
            ${isEdit?"Save Changes in Supabase":"Add Tool to Supabase"}
          </button>
        </div>
      </form>
    </div>
  `,i.appendChild(p);const h=()=>p.remove();p.onclick=h,document.getElementById("editor-modal-close").onclick=h,document.getElementById("editor-cancel-btn").onclick=h,(fi=document.getElementById("quick-add-cat-btn"))==null||fi.addEventListener("click",()=>{h(),wr(null,e,t)});const m=document.getElementById("tool-name"),f=document.getElementById("tool-slug");isEdit||(m.oninput=()=>{f.value=m.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")});let v=c,y=o;const w=A=>{var R;if(A==="month")return"/month";if(A==="year")return"/year";if(A==="3months")return"/3 Months";if(A==="6months")return"/6 Months";if(A==="12months")return"/12 Months";if(A==="18months")return"/18 Months";if(A==="lifetime")return"(Lifetime)";if(A==="custom"){const C=((R=document.getElementById("custom-duration-input"))==null?void 0:R.value.trim())||"18 Months";return/lifetime|one-time/i.test(C)?`(${C})`:`/${C}`}return"/month"},k=()=>{var X;const A=((X=document.getElementById("pricing-numeric-amount"))==null?void 0:X.value.trim())||"500",R=w(v);let C="";return y==="PKR"?C=`${A} PKR ${R}`:y==="USD"?C=`$${A} ${R}`:y==="INR"?C=`₹${A} ${R}`:y==="AED"?C=`AED ${A} ${R}`:C=`${A} ${R}`,C.replace(/\s+/g," ").trim()},P=A=>{const R=document.getElementById("tool-price"),C=document.getElementById("pricing-live-text"),X=document.getElementById("modal-preview-price-badge");R&&(R.value=A),C&&(C.textContent=A),X&&(X.textContent=A)},D=p.querySelectorAll("#pricing-duration-buttons .duration-pill-btn"),I=document.getElementById("custom-duration-row"),E=document.getElementById("custom-duration-input");D.forEach(A=>{A.addEventListener("click",()=>{D.forEach(C=>C.classList.remove("active")),A.classList.add("active"),v=A.getAttribute("data-duration"),v==="custom"?(I&&(I.style.display="flex"),E&&E.focus()):I&&(I.style.display="none");const R=k();P(R)})}),E&&E.addEventListener("input",()=>{if(v==="custom"){const A=k();P(A)}});const K=p.querySelectorAll("#pricing-currency-buttons .currency-select-btn"),O=document.getElementById("presets-pkr-row"),q=document.getElementById("presets-usd-row"),S=document.getElementById("presets-inr-row"),j=document.getElementById("presets-aed-row"),x=document.getElementById("pricing-numeric-amount");K.forEach(A=>{A.addEventListener("click",()=>{K.forEach(C=>C.classList.remove("active")),A.classList.add("active"),y=A.getAttribute("data-curr"),O&&(O.style.display=y==="PKR"?"block":"none"),q&&(q.style.display=y==="USD"?"block":"none"),S&&(S.style.display=y==="INR"?"block":"none"),j&&(j.style.display=y==="AED"?"block":"none"),y==="PKR"&&x&&(x.value==="19"||!x.value)?x.value="500":y==="USD"&&x&&x.value==="500"&&(x.value="19");const R=k();P(R)})}),p.querySelectorAll(".pricing-studio-container .quick-amount-chip").forEach(A=>{A.addEventListener("click",()=>{const R=A.getAttribute("data-amount");if(R&&x){x.value=R;const C=k();P(C)}})}),x&&x.addEventListener("input",()=>{const A=k();P(A)});const U=document.getElementById("tool-price");U&&U.addEventListener("input",()=>{const A=U.value.trim(),R=document.getElementById("pricing-live-text"),C=document.getElementById("modal-preview-price-badge");R&&(R.textContent=A||"$19 /month"),C&&(C.textContent=A||"$19 /month")});const Q=document.getElementById("tool-category");Q&&Q.addEventListener("change",()=>{const A=document.getElementById("modal-preview-cat-badge");A&&(A.textContent=Q.value||"AI Tool")});const Y=document.getElementById("geo-price-pakistan"),F=document.getElementById("geo-price-india"),G=document.getElementById("geo-price-uae"),ue=document.getElementById("geo-price-saudi"),pe=document.getElementById("geo-price-us"),he=document.getElementById("geo-price-uk"),ce=document.getElementById("geo-price-default");(vi=document.getElementById("geo-fill-all-smart"))==null||vi.addEventListener("click",()=>{const A=w(v),R=(x==null?void 0:x.value.trim())||"500";Y&&(Y.value=`${y==="PKR"?R:"500"} PKR ${A}`),F&&(F.value=`₹${y==="INR"?R:"499"} ${A}`),G&&(G.value=`AED ${y==="AED"?R:"49"} ${A}`),ue&&(ue.value=`SAR ${y==="SAR"?R:"49"} ${A}`),pe&&(pe.value=`$${y==="USD"?R:"19"} ${A}`),he&&(he.value=`£${y==="GBP"?R:"15"} ${A}`),ce&&(ce.value=`$${y==="USD"?R:"19"} ${A}`),_(`⚡ All country rates filled with ${A}`)}),(yi=document.getElementById("geo-fill-pkr-all"))==null||yi.addEventListener("click",()=>{const A=w(v),C=`${(x==null?void 0:x.value.trim())||"500"} PKR ${A}`;Y&&(Y.value=C),F&&(F.value=C),G&&(G.value=C),ue&&(ue.value=C),pe&&(pe.value=C),he&&(he.value=C),ce&&(ce.value=C),U&&(U.value=C,P(C)),_(`🇵🇰 Set all country rates to ${C}`)}),(bi=document.getElementById("geo-fill-usd-all"))==null||bi.addEventListener("click",()=>{const A=w(v),C=`$${y==="USD"&&(x==null?void 0:x.value.trim())||"19"} ${A}`;Y&&(Y.value=C),F&&(F.value=C),G&&(G.value=C),ue&&(ue.value=C),pe&&(pe.value=C),he&&(he.value=C),ce&&(ce.value=C),U&&(U.value=C,P(C)),_(`🇺🇸 Set all country rates to ${C}`)}),(wi=document.getElementById("geo-sync-duration-all"))==null||wi.addEventListener("click",()=>{const A=w(v),R=C=>{if(!C||!C.value.trim())return;let X=C.value.trim();X.includes("/")?X=X.split("/")[0].trim()+" "+A:/\(.*\)/.test(X)?X=X.replace(/\(.*\)/,"").trim()+" "+A:X=X+" "+A,C.value=X.replace(/\s+/g," ").trim()};R(Y),R(F),R(G),R(ue),R(pe),R(he),R(ce),R(U),U&&P(U.value),_(`⏱️ Synced duration "${A}" to all countries!`)}),p.querySelectorAll(".country-quick-chip").forEach(A=>{A.addEventListener("click",()=>{const R=A.getAttribute("data-target"),C=A.getAttribute("data-prefix"),X=A.getAttribute("data-val"),we=document.getElementById(R),Pe=w(v);we&&(C==="PKR"?we.value=`${X} PKR ${Pe}`:C==="INR"?we.value=`₹${X} ${Pe}`:C==="AED"?we.value=`AED ${X} ${Pe}`:C==="SAR"?we.value=`SAR ${X} ${Pe}`:C==="USD"?we.value=`$${X} ${Pe}`:C==="GBP"&&(we.value=`£${X} ${Pe}`))})});const Ce=document.getElementById("tool-image-file"),Ae=document.getElementById("tool-image-url"),ve=document.getElementById("upload-status-text"),Be=document.getElementById("modal-banner-box"),be=document.getElementById("tool-image-clear"),fe=A=>{var R,C;if(A){const X=((R=document.getElementById("tool-category"))==null?void 0:R.value)||"AI Tool",we=((C=document.getElementById("tool-price"))==null?void 0:C.value)||"$19 /month";Be.innerHTML=`
        <div class="tool-modal-banner-ambient" id="modal-banner-ambient" style="background-image: url('${A}');"></div>
        <img class="tool-modal-banner-img" id="tool-image-preview" src="${A}" alt="Banner Preview" />
        <div style="position: absolute; top: 10px; left: 10px; z-index: 3;" class="badge badge-popular" id="modal-preview-cat-badge">${X}</div>
        <div style="position: absolute; bottom: 10px; right: 10px; z-index: 3; background: rgba(0,0,0,0.75); border: 1px solid var(--accent-cyan); color: #38bdf8; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;" id="modal-preview-price-badge">${we}</div>
      `,be&&(be.style.display="inline-block")}else Be.innerHTML=`
        <div style="text-align: center; color: var(--text-muted); padding: 1.5rem;" id="modal-banner-empty">
          <div style="font-size: 2rem; margin-bottom: 0.35rem;">🖼️</div>
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">No Image Selected Yet</div>
          <div style="font-size: 0.72rem; margin-top: 0.2rem;">Upload a file or paste an image URL above to preview how your banner displays</div>
        </div>
      `,be&&(be.style.display="none")};Ae.oninput=()=>fe(Ae.value.trim()),be&&(be.onclick=()=>{Ae.value="",fe("")}),Ce.onchange=async A=>{const R=A.target.files[0];if(R){ve.textContent="Processing & uploading image...",ve.style.display="block";try{const C=await ci(R,"logos");Ae.value=C,fe(C),ve.textContent="✓ Image uploaded successfully!",ve.style.color="var(--accent-mint)"}catch(C){ve.textContent=`Upload failed: ${C.message}`,ve.style.color="#f87171"}}};const Ie=document.getElementById("supabase-tool-form"),b=document.getElementById("editor-submit-btn");Ie.onsubmit=async A=>{var xi,Si,_i,Ai,Ti,Ei,$i,Ci,Ii;A.preventDefault(),b.textContent="Saving to Supabase...",b.disabled=!0;const C=document.getElementById("tool-features").value.split(`
`).map($r=>$r.trim()).filter(Boolean),X=((xi=document.getElementById("tool-price"))==null?void 0:xi.value.trim())||"$19 /month",we=((Si=document.getElementById("geo-price-pakistan"))==null?void 0:Si.value.trim())||"",Pe=((_i=document.getElementById("geo-price-india"))==null?void 0:_i.value.trim())||"",Vt=((Ai=document.getElementById("geo-price-uae"))==null?void 0:Ai.value.trim())||"",At=((Ti=document.getElementById("geo-price-saudi"))==null?void 0:Ti.value.trim())||"",Gt=((Ei=document.getElementById("geo-price-us"))==null?void 0:Ei.value.trim())||"",Tt=(($i=document.getElementById("geo-price-uk"))==null?void 0:$i.value.trim())||"",ha=((Ci=document.getElementById("geo-price-default"))==null?void 0:Ci.value.trim())||X,ne={...a.countryPricing||{},DEFAULT:ha};we&&(ne.Pakistan=we,ne.pakistan=we,ne.PK=we),Pe&&(ne.India=Pe,ne.india=Pe,ne.IN=Pe),Vt&&(ne["United Arab Emirates"]=Vt,ne.UAE=Vt,ne.AE=Vt),At&&(ne["Saudi Arabia"]=At,ne.Saudi=At,ne.SAR=At,ne.SA=At),Gt&&(ne["United States"]=Gt,ne.US=Gt,ne.USD=Gt),Tt&&(ne["United Kingdom"]=Tt,ne.UK=Tt,ne.GBP=Tt,ne.GB=Tt);const ki={id:a.id,name:m.value.trim(),slug:f.value.trim(),category:document.getElementById("tool-category").value,price:X,countryPricing:ne,image:Ae.value.trim(),shortDescription:document.getElementById("tool-short-desc").value.trim(),fullDescription:document.getElementById("tool-full-desc").value.trim(),whatsappUrl:document.getElementById("tool-whatsapp-url").value.trim(),tutorialVideoUrl:document.getElementById("tool-video-url").value.trim(),toolUrl:document.getElementById("tool-official-url").value.trim(),rating:parseFloat(document.getElementById("tool-rating").value)||4.8,userCount:document.getElementById("tool-users-count").value.trim()||"10.5K",sortOrder:parseInt(document.getElementById("tool-sort-order").value,10)||0,featured:document.getElementById("tool-featured").checked,active:document.getElementById("tool-active").checked,discountPercent:parseInt((Ii=document.getElementById("tool-discount-percent"))==null?void 0:Ii.value,10)||0,features:C.length>0?C:a.features||[],howToUse:a.howToUse||[]};try{await V.adminSaveTool(ki),_(`Tool "${ki.name}" successfully saved in Supabase!`,"success"),h(),ee="tools",de(e)}catch($r){_(`Supabase save error: ${$r.message}`,"error"),b.textContent=isEdit?"Save Changes in Supabase":"Add Tool to Supabase",b.disabled=!1}}}function jr(r,e="Pakistan"){return!r||r.length===0?`
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">🔥</div>
        <p style="font-weight: 700; color: var(--text-pure); font-size: 1.1rem;">No hot deals in promotional catalog.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Click "+ Add New Hot Deal" above to configure your first BOGO / promotional deal.</p>
      </div>
    `:`
    <table class="admin-table">
      <thead>
        <tr>
          <th style="width: 70px;">Media</th>
          <th>Product / Deal Title</th>
          <th>Offer Tag</th>
          <th>Quantities (Buy / Free)</th>
          <th>Promo Deal Price (${e})</th>
          <th>Stock Scarcity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(t=>{const i=ui(t,e),n=t.buyQuantity||1,a=t.freeQuantity||1,s=t.offerLabel||"BUY 1 GET 1 FREE";return`
            <tr>
              <td>
                <div style="width: 52px; height: 40px; border-radius: 8px; overflow: hidden; background: #070d18; border: 1px solid rgba(249, 115, 22, 0.4);">
                  <img src="${t.image||"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';" />
                </div>
              </td>
              <td>
                <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                  <strong style="color: var(--text-pure); font-size: 0.95rem;">${t.name}</strong>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; color: #fb923c;">${t.category||"Hot Deals"}</span>
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">slug: ${t.slug}</span>
                  </div>
                </div>
              </td>
              <td>
                <div style="display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start;">
                  <span class="badge" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(249, 115, 22, 0.3)); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.45); font-weight: 800; font-size: 0.75rem; padding: 0.25rem 0.65rem;">
                    🔥 ${s}
                  </span>
                  <span style="display: inline-flex; align-items: center; gap: 0.3rem; background: rgba(139, 92, 246, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.35); font-weight: 700; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 6px;">
                    ⏳ ${t.duration||"1 Month"}
                  </span>
                </div>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px;">
                    Buy: ${n}
                  </span>
                  <span style="color: #f97316; font-weight: 800;">+</span>
                  <span style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4); font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px;">
                    Get: ${a} Free
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <strong style="color: #34d399; font-size: 0.95rem;">${i}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted); text-decoration: line-through;">
                    ${t.regularPrice||""}
                  </div>
                </div>
              </td>
              <td>
                <span style="font-size: 0.78rem; color: #fde047; font-weight: 600;">
                  ⚡ ${t.stockLeft||"Limited slots"}
                </span>
              </td>
              <td>
                <button 
                  class="badge toggle-deal-active-btn" 
                  data-deal-id="${t.id}" 
                  data-active="${!!t.active}"
                  style="cursor: pointer; border: none; ${t.active?"background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35);":"background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.35);"}"
                  title="Click to toggle deal active status"
                >
                  ${t.active?"● Active":"○ Inactive"}
                </button>
              </td>
              <td>
                <div style="display: flex; gap: 0.4rem;">
                  <a href="#/deals" class="btn-details" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="Preview deal on /deals">Preview</a>
                  <button class="btn-details edit-deal-btn" data-deal-id="${t.id}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: var(--accent-cyan);" title="Edit deal details">Edit</button>
                  <button class="btn-details delete-deal-btn" data-deal-id="${t.id}" data-deal-name="${t.name}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #f87171;" title="Delete deal">Delete</button>
                </div>
              </td>
            </tr>
          `}).join("")}
      </tbody>
    </table>
  `}function Mr(r,e,t=[]){document.querySelectorAll(".toggle-deal-active-btn").forEach(i=>{i.onclick=async()=>{const n=i.dataset.dealId,s=!(i.dataset.active==="true");try{await V.adminToggleHotDealActive(n,s),_(`Hot Deal status changed to ${s?"Active":"Inactive"}.`,"success"),de(e)}catch(o){_(`Error: ${o.message}`,"error")}}}),document.querySelectorAll(".edit-deal-btn").forEach(i=>{i.onclick=()=>{const n=i.dataset.dealId,a=r.find(s=>s.id===n);a&&oi(a,e,t)}}),document.querySelectorAll(".delete-deal-btn").forEach(i=>{i.onclick=async()=>{const n=i.dataset.dealId,a=i.dataset.dealName;if(confirm(`Are you sure you want to permanently delete the Hot Deal "${a}"?`))try{await V.adminDeleteHotDeal(n),_(`Deleted deal "${a}".`,"success"),de(e)}catch(s){_(`Failed to delete deal: ${s.message}`,"error")}}})}function oi(r=null,e,t=[]){var m,f,v,y,w,k,P,D,I,E,K,O;const i=!!r,n=r||{id:"",name:"",slug:"",duration:(r==null?void 0:r.duration)||"1 Month",category:"Promotions & Bundles",offerLabel:"BUY 1 GET 1 FREE",buyQuantity:1,freeQuantity:1,dealPrice:"PKR 1,999 /mo",regularPrice:"PKR 3,999 /mo",image:"",shortDescription:"",stockLeft:"Only 5 spots left today",countryPricing:{Pakistan:"PKR 1,999 /mo",India:"INR 999 /mo","United Arab Emirates":"AED 45 /mo","Saudi Arabia":"SAR 49 /mo","United States":"USD $14.99 /mo","United Kingdom":"GBP £11.99 /mo"},active:!0},a=document.createElement("div");a.className="modal-backdrop auth-backdrop-fade",a.innerHTML=`
    <div class="modal-card" style="max-width: 780px; max-height: 92vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔥</span>
            <span>${i?`Edit Hot Deal: ${n.name}`:"Create New Hot Deal / Promotion"}</span>
          </h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
            Configure Buy 1 Get 1 Free, custom quantities, promotional pricing, and stock urgency.
          </p>
        </div>
        <button id="deal-editor-close" class="modal-close-btn">&times;</button>
      </div>

      <!-- Quick Template / Existing Tool Pre-filler -->
      ${t&&t.length>0?`
        <div style="margin-bottom: 1.25rem; padding: 0.85rem 1rem; background: rgba(30, 41, 59, 0.6); border: 1px dashed rgba(56, 189, 248, 0.35); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div>
            <div style="font-size: 0.82rem; font-weight: 700; color: #f8fafc;">Select Existing Tool to Pre-Fill:</div>
            <div style="font-size: 0.74rem; color: #94a3b8;">Automatically populate name, image, description, and category.</div>
          </div>
          <select id="deal-prefill-tool" class="admin-search-input" style="min-width: 220px; font-size: 0.82rem;">
            <option value="">-- Choose a tool (Optional) --</option>
            ${t.map(q=>`<option value="${q.id}">${q.name} (${q.category})</option>`).join("")}
          </select>
        </div>
      `:""}

      <form id="hot-deal-editor-form">
        <!-- Deal Name & Slug -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Deal Title / Product Name *</label>
            <input type="text" id="deal-name" class="form-input" value="${n.name||""}" placeholder="e.g. ChatGPT Plus & Claude Pro Duo Bundle" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="deal-slug" class="form-input" value="${n.slug||""}" placeholder="e.g. chatgpt-claude-duo-bogo" required />
          </div>
        </div>

        <!-- OFFER CONFIGURATION: Offer Tag, Buy Qty, Free Qty -->
        <div style="background: rgba(15, 23, 42, 0.75); border: 1.5px solid rgba(249, 115, 22, 0.4); border-radius: 14px; padding: 1.15rem; margin-bottom: 1.25rem;">
          <div style="font-size: 0.88rem; font-weight: 800; color: #fb923c; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>🎁</span> <span>Offer Specification (Buy X Get Y Free)</span>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 0.8fr 0.8fr; gap: 1rem; margin-bottom: 0.75rem;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Offer Tag / Label *</label>
              <input type="text" id="deal-offer-label" class="form-input" value="${n.offerLabel||"BUY 1 GET 1 FREE"}" placeholder="e.g. BUY 1 GET 1 FREE" required />
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Buy Quantity *</label>
              <input type="number" id="deal-buy-qty" class="form-input" value="${n.buyQuantity||1}" min="1" required />
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Free Bonus Quantity *</label>
              <input type="number" id="deal-free-qty" class="form-input" value="${n.freeQuantity||1}" min="0" required />
            </div>
          </div>

          <!-- Quick Offer Chips -->
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center; margin-top: 0.5rem;">
            <span style="font-size: 0.72rem; color: var(--text-muted);">Quick Presets:</span>
            <button type="button" class="currency-chip preset-offer-chip" data-offer="BUY 1 GET 1 FREE" data-buy="1" data-free="1" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">Buy 1 Get 1 Free</button>
            <button type="button" class="currency-chip preset-offer-chip" data-offer="BUY 2 GET 1 FREE" data-buy="2" data-free="1" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">Buy 2 Get 1 Free</button>
            <button type="button" class="currency-chip preset-offer-chip" data-offer="BUY 1 GET 2 FREE" data-buy="1" data-free="2" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">Buy 1 Get 2 Free</button>
            <button type="button" class="currency-chip preset-offer-chip" data-offer="BUY 3 GET 2 FREE" data-buy="3" data-free="2" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">Buy 3 Get 2 Free</button>
            <button type="button" class="currency-chip preset-offer-chip" data-offer="FLASH SALE 50% OFF" data-buy="1" data-free="0" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">50% Off Flash</button>
          </div>
        </div>

        <!-- OFFER VALIDITY & DURATION (Days / Months / Years / Lifetime) -->
        <div style="background: rgba(30, 41, 59, 0.55); border: 1.5px solid rgba(168, 85, 247, 0.4); border-radius: 14px; padding: 1.15rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-size: 0.88rem; font-weight: 800; color: #c084fc; display: flex; align-items: center; gap: 0.4rem;">
              <span>⏳</span> <span>Offer Validity & Duration (Days / Months / Year) *</span>
            </div>
            <span style="font-size: 0.72rem; color: #94a3b8;">Kitny din, month, ya saal ke liye offer hai</span>
          </div>

          <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 1rem; align-items: flex-end;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Duration / Validity Period *</label>
              <input 
                type="text" 
                id="deal-duration" 
                class="form-input" 
                value="${n.duration||"1 Month"}" 
                placeholder="e.g. 18 Months, 1 Month, 1 Year, 30 Days, Lifetime" 
                required 
              />
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Quick Period Picker</label>
              <select id="deal-duration-preset-select" class="form-input" style="cursor: pointer;">
                <option value="">-- Select Period --</option>
                <option value="7 Days">7 Days (Weekly)</option>
                <option value="15 Days">15 Days (Half-Month)</option>
                <option value="30 Days">30 Days</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months (Quarterly)</option>
                <option value="6 Months">6 Months (Half-Year)</option>
                <option value="1 Year">1 Year (12 Months)</option>
                <option value="18 Months">18 Months (1.5 Years)</option>
                <option value="2 Years">2 Years</option>
                <option value="Lifetime">Lifetime Access</option>
              </select>
            </div>
          </div>

          <!-- Quick Duration Preset Chips -->
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center; margin-top: 0.75rem;">
            <span style="font-size: 0.72rem; color: var(--text-muted);">Quick Presets:</span>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="7 Days" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">7 Days</button>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="15 Days" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">15 Days</button>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="1 Month" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">1 Month</button>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="3 Months" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">3 Months</button>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="6 Months" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">6 Months</button>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="1 Year" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">1 Year</button>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="18 Months" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-color: #fb923c; color: #fb923c;">18 Months</button>
            <button type="button" class="currency-chip preset-duration-chip" data-duration="Lifetime" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-color: #34d399; color: #34d399;">Lifetime</button>
          </div>
        </div>

        <!-- PRICING & LOCALIZATION -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Deal Promo Price (Base) *</label>
            <input type="text" id="deal-base-price" class="form-input" value="${n.dealPrice||n.price||"PKR 1,999 /mo"}" placeholder="e.g. PKR 1,999 /mo" required />
          </div>
          <div class="form-group">
            <label class="form-label">Regular Price (Strikethrough)</label>
            <input type="text" id="deal-regular-price" class="form-input" value="${n.regularPrice||"PKR 3,999 /mo"}" placeholder="e.g. PKR 3,999 /mo" />
          </div>
          <div class="form-group">
            <label class="form-label">Stock Scarcity / Urgency</label>
            <input type="text" id="deal-stock-left" class="form-input" value="${n.stockLeft||"Only 5 slots left today"}" placeholder="e.g. Only 5 slots left today" />
          </div>
        </div>

        <!-- MULTI-COUNTRY PRICING ACCORDION -->
        <details style="margin-bottom: 1.25rem; background: rgba(15, 23, 42, 0.5); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 0.85rem;" open>
          <summary style="cursor: pointer; font-size: 0.88rem; font-weight: 700; color: var(--accent-cyan); display: flex; align-items: center; justify-content: space-between;">
            <span>🌍 Multi-Country Localized Deal Pricing</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">PKR, INR, AED, SAR, USD, GBP</span>
          </summary>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 1rem;">
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇵🇰 Pakistan (PKR)</label>
              <input type="text" id="deal-geo-pk" class="form-input" value="${((m=n.countryPricing)==null?void 0:m.Pakistan)||n.dealPrice||"PKR 1,999 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇮🇳 India (INR ₹)</label>
              <input type="text" id="deal-geo-in" class="form-input" value="${((f=n.countryPricing)==null?void 0:f.India)||"INR 999 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇦🇪 UAE (AED)</label>
              <input type="text" id="deal-geo-ae" class="form-input" value="${((v=n.countryPricing)==null?void 0:v["United Arab Emirates"])||((y=n.countryPricing)==null?void 0:y.UAE)||"AED 45 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇸🇦 Saudi (SAR)</label>
              <input type="text" id="deal-geo-sa" class="form-input" value="${((w=n.countryPricing)==null?void 0:w["Saudi Arabia"])||((k=n.countryPricing)==null?void 0:k.Saudi)||"SAR 49 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇺🇸 US (USD $)</label>
              <input type="text" id="deal-geo-us" class="form-input" value="${((P=n.countryPricing)==null?void 0:P["United States"])||((D=n.countryPricing)==null?void 0:D.USD)||"USD $14.99 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇬🇧 UK (GBP £)</label>
              <input type="text" id="deal-geo-gb" class="form-input" value="${((I=n.countryPricing)==null?void 0:I["United Kingdom"])||((E=n.countryPricing)==null?void 0:E.GBP)||"GBP £11.99 /mo"}" />
            </div>
          </div>
        </details>

        <!-- Category & Description -->
        <div style="display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Category *</label>
            <input type="text" id="deal-category" class="form-input" value="${n.category||"Promotions & Bundles"}" placeholder="e.g. Text / Reasoning" required />
          </div>

          <div class="form-group">
            <label class="form-label">Banner Image URL</label>
            <input type="text" id="deal-image" class="form-input" value="${n.image||""}" placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Deal Details &amp; Promotion Description *</label>
          <textarea id="deal-description" class="form-textarea" style="min-height: 80px;" placeholder="Describe what tools are included in this bundle, how the customer gets access, and why this is a high-value offer..." required>${n.shortDescription||n.description||""}</textarea>
        </div>

        <!-- Extra Deal Discount (% OFF) -->
        <div class="form-group" style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.5rem;">
            <label class="form-label" for="deal-discount-percent" style="color: #fca5a5; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>🔥</span> Extra Deal Discount (% OFF):
            </label>
            <span style="font-size: 0.72rem; color: #f87171;">Leave 0 for default deal price</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <input 
              type="number" 
              id="deal-discount-percent" 
              class="form-input" 
              min="0" 
              max="100" 
              value="${n.discountPercent||0}" 
              placeholder="e.g. 15" 
              style="width: 110px; font-weight: 700; color: #f87171; text-align: center;" 
            />
            <span style="font-size: 0.88rem; font-weight: 800; color: #f87171;">% OFF</span>
          </div>
        </div>

        <!-- Active Checkbox & Sort Order -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(0,0,0,0.25); border-radius: 10px; margin-bottom: 1.5rem;">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.92rem; font-weight: 700; color: #f8fafc;">
            <input type="checkbox" id="deal-active" ${n.active!==!1?"checked":""} style="width: 18px; height: 18px; accent-color: #f97316;" />
            <span>Active Promotion (Instantly visible on /deals storefront)</span>
          </label>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label style="font-size: 0.78rem; color: var(--text-muted);">Sort Order:</label>
            <input type="number" id="deal-sort-order" class="form-input" value="${n.sortOrder??0}" style="width: 70px; text-align: center; padding: 0.35rem;" />
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
          <button type="button" id="deal-cancel-btn" class="btn btn-secondary">Cancel</button>
          <button type="submit" id="deal-submit-btn" class="btn btn-primary" style="padding: 0.75rem 2rem; font-weight: 800; background: linear-gradient(135deg, #ef4444, #f97316); border: none;">
            ${i?"Save Deal Changes":"Publish Hot Deal"}
          </button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(a);const s=()=>{a.remove()};a.onclick=q=>{q.target===a&&s()},(K=document.getElementById("deal-editor-close"))==null||K.addEventListener("click",s),(O=document.getElementById("deal-cancel-btn"))==null||O.addEventListener("click",s);const o=document.getElementById("deal-name"),l=document.getElementById("deal-slug");o&&l&&!i&&o.addEventListener("input",()=>{l.value=o.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")});const c=document.getElementById("deal-prefill-tool");c&&c.addEventListener("change",()=>{const q=c.value;if(!q)return;const S=t.find(j=>j.id===q);if(S){o&&(o.value=`${S.name} (BOGO Deal)`),l&&(l.value=`${S.slug||S.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-bogo`);const j=document.getElementById("deal-image");j&&S.image&&(j.value=S.image);const x=document.getElementById("deal-category");x&&S.category&&(x.value=S.category);const U=document.getElementById("deal-description");U&&(U.value=`Buy 1 ${S.name} subscription and get 1 extra seat/month free! ${S.shortDescription||""}`),S.countryPricing&&(S.countryPricing.Pakistan&&(document.getElementById("deal-geo-pk").value=S.countryPricing.Pakistan),S.countryPricing.India&&(document.getElementById("deal-geo-in").value=S.countryPricing.India),S.countryPricing["United Arab Emirates"]&&(document.getElementById("deal-geo-ae").value=S.countryPricing["United Arab Emirates"]),S.countryPricing["Saudi Arabia"]&&(document.getElementById("deal-geo-sa").value=S.countryPricing["Saudi Arabia"]),S.countryPricing["United States"]&&(document.getElementById("deal-geo-us").value=S.countryPricing["United States"]),S.countryPricing["United Kingdom"]&&(document.getElementById("deal-geo-gb").value=S.countryPricing["United Kingdom"])),_(`Pre-filled details from "${S.name}"`,"info")}});const d=document.getElementById("deal-duration"),u=document.getElementById("deal-duration-preset-select");u&&d&&u.addEventListener("change",()=>{u.value&&(d.value=u.value)}),document.querySelectorAll(".preset-duration-chip").forEach(q=>{q.onclick=()=>{d&&(d.value=q.dataset.duration,u&&(u.value=q.dataset.duration))}}),document.querySelectorAll(".preset-offer-chip").forEach(q=>{q.onclick=()=>{document.getElementById("deal-offer-label").value=q.dataset.offer,document.getElementById("deal-buy-qty").value=q.dataset.buy,document.getElementById("deal-free-qty").value=q.dataset.free}});const p=document.getElementById("hot-deal-editor-form"),h=document.getElementById("deal-submit-btn");p.onsubmit=async q=>{var pe,he,ce,Ce,Ae,ve,Be,be;q.preventDefault(),h.textContent="Saving Deal...",h.disabled=!0;const S=document.getElementById("deal-base-price").value.trim(),j=((pe=document.getElementById("deal-geo-pk"))==null?void 0:pe.value.trim())||S,x=((he=document.getElementById("deal-geo-in"))==null?void 0:he.value.trim())||"",U=((ce=document.getElementById("deal-geo-ae"))==null?void 0:ce.value.trim())||"",Q=((Ce=document.getElementById("deal-geo-sa"))==null?void 0:Ce.value.trim())||"",Y=((Ae=document.getElementById("deal-geo-us"))==null?void 0:Ae.value.trim())||"",F=((ve=document.getElementById("deal-geo-gb"))==null?void 0:ve.value.trim())||"",G={...n.countryPricing||{},DEFAULT:S,Pakistan:j,pakistan:j,PK:j};x&&(G.India=x,G.IN=x),U&&(G["United Arab Emirates"]=U,G.UAE=U,G.AE=U),Q&&(G["Saudi Arabia"]=Q,G.SAR=Q),Y&&(G["United States"]=Y,G.USD=Y),F&&(G["United Kingdom"]=F,G.GBP=F);const ue={id:n.id,name:o.value.trim(),slug:l.value.trim(),category:document.getElementById("deal-category").value.trim(),offerLabel:document.getElementById("deal-offer-label").value.trim(),buyQuantity:parseInt(document.getElementById("deal-buy-qty").value,10)||1,freeQuantity:parseInt(document.getElementById("deal-free-qty").value,10)||0,duration:((Be=document.getElementById("deal-duration"))==null?void 0:Be.value.trim())||"1 Month",dealPrice:S,price:S,regularPrice:document.getElementById("deal-regular-price").value.trim(),stockLeft:document.getElementById("deal-stock-left").value.trim(),countryPricing:G,image:document.getElementById("deal-image").value.trim(),shortDescription:document.getElementById("deal-description").value.trim(),fullDescription:document.getElementById("deal-description").value.trim(),active:document.getElementById("deal-active").checked,discountPercent:parseInt((be=document.getElementById("deal-discount-percent"))==null?void 0:be.value,10)||0,sortOrder:parseInt(document.getElementById("deal-sort-order").value,10)||0};try{await V.adminSaveHotDeal(ue),_(`Hot Deal "${ue.name}" successfully published!`,"success"),s(),ee="deals",de(e)}catch(fe){_(`Error saving deal: ${fe.message}`,"error"),h.textContent=i?"Save Deal Changes":"Publish Hot Deal",h.disabled=!1}}}const cc={"/":bn,"/tools":Gl,"/deals":ac,"/upcoming":sc,"/tool/:id":Yl,"/categories":Ql,"/about":Xl,"/contact":Zl,"/policy":ec,"/admin":de,"*":bn};let Je=null;async function En(){console.log("[AI Tools Store] Initializing marketplace client..."),Tl().catch(()=>{}),V.getTools().catch(r=>{console.warn("[AI Tools Store] API initialized with offline fallback dataset:",r)}),Je=new ga(cc,"#app"),window.__appRouter=Je,Zn(()=>{Je&&Je.handleRouting()}),window.addEventListener("ai_tools_country_changed",()=>{Je&&Je.handleRouting()}),window.addEventListener("ai_tools_settings_changed",()=>{Je&&Je.handleRouting()})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",En):En();
//# sourceMappingURL=index-DnLiD5sO.js.map

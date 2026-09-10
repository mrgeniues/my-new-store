(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class sn{constructor(e,t="#app"){this.routes=e,this.root=document.querySelector(t),this.currentRoute=null,window.addEventListener("hashchange",()=>this.handleRouting()),window.addEventListener("load",()=>this.handleRouting())}getRouteInfo(){let t=window.location.hash.slice(1)||"/",i="";const s=t.indexOf("#");s!==-1&&(i=t.slice(s+1),t=t.slice(0,s));const[n,a]=t.split("?"),o=n.startsWith("/")?n:`/${n}`,l=new URLSearchParams(a||"");return i&&!l.has("section")&&l.set("section",i),{path:o,params:l,anchor:i}}navigate(e,t={}){let i=e.startsWith("/")?e:`/${e}`;const s=new URLSearchParams(t).toString();s&&(i+=`?${s}`),window.location.hash=i}async handleRouting(){const{path:e,params:t}=this.getRouteInfo();let i=null,s={};for(const[n,a]of Object.entries(this.routes)){if(n===e){i=a;break}const o=n.split("/"),l=e.split("/");if(o.length===l.length){let c=!0;const d={};for(let u=0;u<o.length;u++)if(o[u].startsWith(":")){const h=o[u].slice(1);d[h]=decodeURIComponent(l[u])}else if(o[u]!==l[u]){c=!1;break}if(c){i=a,s=d;break}}}i||(i=this.routes["*"]||this.routes["/"]),this.currentRoute=e,window.scrollTo(0,0),this.root&&await i(this.root,{pathParams:s,queryParams:t,router:this})}}function dr(r,e){var t={};for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(r);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(r,i[s])&&(t[i[s]]=r[i[s]]);return t}function nn(r,e,t,i){function s(n){return n instanceof t?n:new t(function(a){a(n)})}return new(t||(t=Promise))(function(n,a){function o(d){try{c(i.next(d))}catch(u){a(u)}}function l(d){try{c(i.throw(d))}catch(u){a(u)}}function c(d){d.done?n(d.value):s(d.value).then(o,l)}c((i=i.apply(r,e||[])).next())})}const an=r=>r?(...e)=>r(...e):(...e)=>fetch(...e);class Vr extends Error{constructor(e,t="FunctionsError",i){super(e),this.name=t,this.context=i}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class on extends Vr{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class xi extends Vr{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class _i extends Vr{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Cr;(function(r){r.Any="any",r.ApNortheast1="ap-northeast-1",r.ApNortheast2="ap-northeast-2",r.ApSouth1="ap-south-1",r.ApSoutheast1="ap-southeast-1",r.ApSoutheast2="ap-southeast-2",r.CaCentral1="ca-central-1",r.EuCentral1="eu-central-1",r.EuWest1="eu-west-1",r.EuWest2="eu-west-2",r.EuWest3="eu-west-3",r.SaEast1="sa-east-1",r.UsEast1="us-east-1",r.UsWest1="us-west-1",r.UsWest2="us-west-2"})(Cr||(Cr={}));class ln{constructor(e,{headers:t={},customFetch:i,region:s=Cr.Any}={}){this.url=e,this.headers=t,this.region=s,this.fetch=an(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return nn(this,arguments,void 0,function*(t,i={}){var s;let n,a;try{const{headers:o,method:l,body:c,signal:d,timeout:u}=i;let h={},{region:p}=i;p||(p=this.region);const g=new URL(`${this.url}/${t}`);p&&p!=="any"&&(h["x-region"]=p,g.searchParams.set("forceFunctionRegion",p));let f;const v=!!o&&Object.keys(o).some(T=>T.toLowerCase()==="content-type");c&&!v?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(h["Content-Type"]="application/octet-stream",f=c):typeof c=="string"?(h["Content-Type"]="text/plain",f=c):typeof FormData<"u"&&c instanceof FormData?f=c:(h["Content-Type"]="application/json",f=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?f=JSON.stringify(c):f=c;let y=d;u&&(a=new AbortController,n=setTimeout(()=>a.abort(),u),d?(y=a.signal,d.addEventListener("abort",()=>a.abort())):y=a.signal);const w=yield this.fetch(g.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},h),this.headers),o),body:f,signal:y}).catch(T=>{throw new on(T)}),S=w.headers.get("x-relay-error");if(S&&S==="true")throw new xi(w);if(!w.ok)throw new _i(w);let $=((s=w.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),A;return $==="application/json"?A=yield w.json():$==="application/octet-stream"||$==="application/pdf"?A=yield w.blob():$==="text/event-stream"?A=w:$==="multipart/form-data"?A=yield w.formData():A=yield w.text(),{data:A,error:null,response:w}}catch(o){return{data:null,error:o,response:o instanceof _i||o instanceof xi?o.context:void 0}}finally{n&&clearTimeout(n)}})}}const ys=3,Ai=r=>Math.min(1e3*2**r,3e4),cn=[520,503],bs=["GET","HEAD","OPTIONS"];var Ei=class extends Error{constructor(r){super(r.message),this.name="PostgrestError",this.details=r.details,this.hint=r.hint,this.code=r.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function Ti(r,e){return new Promise(t=>{if(e!=null&&e.aborted){t();return}const i=setTimeout(()=>{e==null||e.removeEventListener("abort",s),t()},r);function s(){clearTimeout(i),t()}e==null||e.addEventListener("abort",s)})}function dn(r,e,t,i){return!(!i||t>=ys||!bs.includes(r)||!cn.includes(e))}var un=class{constructor(r){var e,t,i,s,n;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=r.method,this.url=r.url,this.headers=new Headers(r.headers),this.schema=r.schema,this.body=r.body,this.shouldThrowOnError=(e=r.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=r.signal,this.isMaybeSingle=(t=r.isMaybeSingle)!==null&&t!==void 0?t:!1,this.shouldStripNulls=(i=r.shouldStripNulls)!==null&&i!==void 0?i:!1,this.urlLengthLimit=(s=r.urlLengthLimit)!==null&&s!==void 0?s:8e3,this.retryEnabled=(n=r.retry)!==null&&n!==void 0?n:!0,r.fetch?this.fetch=r.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(r,e){return this.headers=new Headers(this.headers),this.headers.set(r,e),this}retry(r){return this.retryEnabled=r,this}then(r,e){var t=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const a=this.headers.get("Accept");a==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!a||a==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const i=this.fetch;let n=(async()=>{let a=0;for(;;){const c={};t.headers.forEach((u,h)=>{c[h]=u}),a>0&&(c["X-Retry-Count"]=String(a));let d;try{d=await i(t.url.toString(),{method:t.method,headers:c,body:JSON.stringify(t.body,(u,h)=>typeof h=="bigint"?h.toString():h),signal:t.signal})}catch(u){if((u==null?void 0:u.name)==="AbortError"||(u==null?void 0:u.code)==="ABORT_ERR"||!bs.includes(t.method))throw u;if(t.retryEnabled&&a<ys){const h=Ai(a);a++,await Ti(h,t.signal);continue}throw u}if(dn(t.method,d.status,a,t.retryEnabled)){var o,l;const u=(o=(l=d.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,h=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:Ai(a);await d.text(),a++,await Ti(h,t.signal);continue}return await t.processResponse(d)}})();return this.shouldThrowOnError||(n=n.catch(a=>{var o;let l="",c="",d="";const u=a==null?void 0:a.cause;if(u){var h,p,g,f;const w=(h=u==null?void 0:u.message)!==null&&h!==void 0?h:"",S=(p=u==null?void 0:u.code)!==null&&p!==void 0?p:"";l=`${(g=a==null?void 0:a.name)!==null&&g!==void 0?g:"FetchError"}: ${a==null?void 0:a.message}`,l+=`

Caused by: ${(f=u==null?void 0:u.name)!==null&&f!==void 0?f:"Error"}: ${w}`,S&&(l+=` (${S})`),u!=null&&u.stack&&(l+=`
${u.stack}`)}else{var v;l=(v=a==null?void 0:a.stack)!==null&&v!==void 0?v:""}const y=this.url.toString().length;return(a==null?void 0:a.name)==="AbortError"||(a==null?void 0:a.code)==="ABORT_ERR"?(d="",c="Request was aborted (timeout or manual cancellation)",y>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${y} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",c="HTTP headers exceeded server limits (typically 16KB)",y>this.urlLengthLimit&&(c+=`. Your request URL is ${y} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=a==null?void 0:a.name)!==null&&o!==void 0?o:"FetchError"}: ${a==null?void 0:a.message}`,details:l,hint:c,code:d},data:null,count:null,status:0,statusText:""}})),n.then(r,e)}async processResponse(r){var e=this;let t=null,i=null,s=null,n=r.status,a=r.statusText;if(r.ok){var o,l;if(e.method!=="HEAD"){var c;const h=await r.text();if(h!=="")if(e.headers.get("Accept")==="text/csv")i=h;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))i=h;else try{i=JSON.parse(h)}catch{if(t={message:h},i=null,e.shouldThrowOnError)throw new Ei({message:h,details:"",hint:"",code:""})}}const d=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),u=(l=r.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");d&&u&&u.length>1&&(s=parseInt(u[1])),e.isMaybeSingle&&Array.isArray(i)&&(i.length>1?(t={code:"PGRST116",details:`Results contain ${i.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},i=null,s=null,n=406,a="Not Acceptable"):i.length===1?i=i[0]:i=null)}else{const d=await r.text();try{t=JSON.parse(d),Array.isArray(t)&&r.status===404&&(i=[],t=null,n=200,a="OK")}catch{r.status===404&&d===""?(n=204,a="No Content"):t={message:d}}if(t&&e.shouldThrowOnError)throw new Ei(t)}return{success:t===null,error:t,data:i,count:s,status:n,statusText:a}}returns(){return this}overrideTypes(){return this}},hn=class extends un{throwOnError(){return super.throwOnError()}select(r){let e=!1;const t=(r??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",t),this.headers.append("Prefer","return=representation"),this}order(r,{ascending:e=!0,nullsFirst:t,foreignTable:i,referencedTable:s=i}={}){const n=s?`${s}.order`:"order",a=this.url.searchParams.get(n);return this.url.searchParams.set(n,`${a?`${a},`:""}${r}.${e?"asc":"desc"}${t===void 0?"":t?".nullsfirst":".nullslast"}`),this}limit(r,{foreignTable:e,referencedTable:t=e}={}){const i=typeof t>"u"?"limit":`${t}.limit`;return this.url.searchParams.set(i,`${r}`),this}range(r,e,{foreignTable:t,referencedTable:i=t}={}){const s=typeof i>"u"?"offset":`${i}.offset`,n=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(s,`${r}`),this.url.searchParams.set(n,`${e-r+1}`),this}abortSignal(r){return this.signal=r,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:r=!1,verbose:e=!1,settings:t=!1,buffers:i=!1,wal:s=!1,format:n="text"}={}){var a;const o=[r?"analyze":null,e?"verbose":null,t?"settings":null,i?"buffers":null,s?"wal":null].filter(Boolean).join("|"),l=(a=this.headers.get("Accept"))!==null&&a!==void 0?a:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${n}; for="${l}"; options=${o};`),n==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(r){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${r}`),this}};const Ci=new RegExp("[,()]");var st=class extends hn{throwOnError(){return super.throwOnError()}eq(r,e){return this.url.searchParams.append(r,`eq.${e}`),this}neq(r,e){return this.url.searchParams.append(r,`neq.${e}`),this}gt(r,e){return this.url.searchParams.append(r,`gt.${e}`),this}gte(r,e){return this.url.searchParams.append(r,`gte.${e}`),this}lt(r,e){return this.url.searchParams.append(r,`lt.${e}`),this}lte(r,e){return this.url.searchParams.append(r,`lte.${e}`),this}like(r,e){return this.url.searchParams.append(r,`like.${e}`),this}likeAllOf(r,e){return this.url.searchParams.append(r,`like(all).{${e.join(",")}}`),this}likeAnyOf(r,e){return this.url.searchParams.append(r,`like(any).{${e.join(",")}}`),this}ilike(r,e){return this.url.searchParams.append(r,`ilike.${e}`),this}ilikeAllOf(r,e){return this.url.searchParams.append(r,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(r,e){return this.url.searchParams.append(r,`ilike(any).{${e.join(",")}}`),this}regexMatch(r,e){return this.url.searchParams.append(r,`match.${e}`),this}regexIMatch(r,e){return this.url.searchParams.append(r,`imatch.${e}`),this}is(r,e){return this.url.searchParams.append(r,`is.${e}`),this}isDistinct(r,e){return this.url.searchParams.append(r,`isdistinct.${e}`),this}in(r,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Ci.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(r,`in.(${t})`),this}notIn(r,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Ci.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(r,`not.in.(${t})`),this}contains(r,e){return typeof e=="string"?this.url.searchParams.append(r,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(r,`cs.{${e.join(",")}}`):this.url.searchParams.append(r,`cs.${JSON.stringify(e)}`),this}containedBy(r,e){return typeof e=="string"?this.url.searchParams.append(r,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(r,`cd.{${e.join(",")}}`):this.url.searchParams.append(r,`cd.${JSON.stringify(e)}`),this}rangeGt(r,e){return this.url.searchParams.append(r,`sr.${e}`),this}rangeGte(r,e){return this.url.searchParams.append(r,`nxl.${e}`),this}rangeLt(r,e){return this.url.searchParams.append(r,`sl.${e}`),this}rangeLte(r,e){return this.url.searchParams.append(r,`nxr.${e}`),this}rangeAdjacent(r,e){return this.url.searchParams.append(r,`adj.${e}`),this}overlaps(r,e){return typeof e=="string"?this.url.searchParams.append(r,`ov.${e}`):this.url.searchParams.append(r,`ov.{${e.join(",")}}`),this}textSearch(r,e,{config:t,type:i}={}){let s="";i==="plain"?s="pl":i==="phrase"?s="ph":i==="websearch"&&(s="w");const n=t===void 0?"":`(${t})`;return this.url.searchParams.append(r,`${s}fts${n}.${e}`),this}match(r){return Object.entries(r).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(r,e,t){return this.url.searchParams.append(r,`not.${e}.${t}`),this}or(r,{foreignTable:e,referencedTable:t=e}={}){const i=t?`${t}.or`:"or";return this.url.searchParams.append(i,`(${r})`),this}filter(r,e,t){return this.url.searchParams.append(r,`${e}.${t}`),this}},pn=class{constructor(r,{headers:e={},schema:t,fetch:i,urlLengthLimit:s=8e3,retry:n}){this.url=r,this.headers=new Headers(e),this.schema=t,this.fetch=i,this.urlLengthLimit=s,this.retry=n}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(r,e){const{head:t=!1,count:i}=e??{},s=t?"HEAD":"GET";let n=!1;const a=(r??"*").split("").map(c=>/\s/.test(c)&&!n?"":(c==='"'&&(n=!n),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",a),i&&l.append("Prefer",`count=${i}`),new st({method:s,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(r,{count:e,defaultToNull:t=!0}={}){var i;const s="POST",{url:n,headers:a}=this.cloneRequestState();if(e&&a.append("Prefer",`count=${e}`),t||a.append("Prefer","missing=default"),Array.isArray(r)){const o=r.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);n.searchParams.set("columns",l.join(","))}}return new st({method:s,url:n,headers:a,schema:this.schema,body:r,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(r,{onConflict:e,ignoreDuplicates:t=!1,count:i,defaultToNull:s=!0}={}){var n;const a="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${t?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),s||l.append("Prefer","missing=default"),Array.isArray(r)){const c=r.reduce((d,u)=>d.concat(Object.keys(u)),[]);if(c.length>0){const d=[...new Set(c)].map(u=>`"${u}"`);o.searchParams.set("columns",d.join(","))}}return new st({method:a,url:o,headers:l,schema:this.schema,body:r,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(r,{count:e}={}){var t;const i="PATCH",{url:s,headers:n}=this.cloneRequestState();return e&&n.append("Prefer",`count=${e}`),new st({method:i,url:s,headers:n,schema:this.schema,body:r,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:r}={}){var e;const t="DELETE",{url:i,headers:s}=this.cloneRequestState();return r&&s.append("Prefer",`count=${r}`),new st({method:t,url:i,headers:s,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function At(r){"@babel/helpers - typeof";return At=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},At(r)}function mn(r,e){if(At(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var i=t.call(r,e);if(At(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function gn(r){var e=mn(r,"string");return At(e)=="symbol"?e:e+""}function fn(r,e,t){return(e=gn(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function $i(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(r,s).enumerable})),t.push.apply(t,i)}return t}function zt(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?$i(Object(t),!0).forEach(function(i){fn(r,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):$i(Object(t)).forEach(function(i){Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(t,i))})}return r}var vn=class ws{constructor(e,{headers:t={},schema:i,fetch:s,timeout:n,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=i,this.urlLengthLimit=a;const l=s??globalThis.fetch;n!==void 0&&n>0?this.fetch=(c,d)=>{const u=new AbortController,h=setTimeout(()=>u.abort(),n),p=d==null?void 0:d.signal;if(p){if(p.aborted)return clearTimeout(h),l(c,d);const g=()=>{clearTimeout(h),u.abort()};return p.addEventListener("abort",g,{once:!0}),l(c,zt(zt({},d),{},{signal:u.signal})).finally(()=>{clearTimeout(h),p.removeEventListener("abort",g)})}return l(c,zt(zt({},d),{},{signal:u.signal})).finally(()=>clearTimeout(h))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new pn(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new ws(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,t={},{head:i=!1,get:s=!1,count:n}={}){var a;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=p=>p!==null&&typeof p=="object"&&(!Array.isArray(p)||p.some(d)),u=i&&Object.values(t).some(d);u?(o="POST",c=t):i||s?(o=i?"HEAD":"GET",Object.entries(t).filter(([p,g])=>g!==void 0).map(([p,g])=>[p,Array.isArray(g)?`{${g.join(",")}}`:`${g}`]).forEach(([p,g])=>{l.searchParams.append(p,g)})):(o="POST",c=t);const h=new Headers(this.headers);return u?h.set("Prefer",n?`count=${n},return=minimal`:"return=minimal"):n&&h.set("Prefer",`count=${n}`),new st({method:o,url:l,headers:h,schema:this.schemaName,body:c,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class yn{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const t=globalThis;if(typeof globalThis<"u"&&typeof t.WebSocket<"u")return{type:"native",wsConstructor:t.WebSocket};const i=typeof global<"u"?global:void 0;if(i&&typeof i.WebSocket<"u")return{type:"native",wsConstructor:i.WebSocket};if(typeof globalThis<"u"&&typeof t.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&t.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const s=globalThis.process;if(s){const n=s.versions;if(n&&n.node){const a=n.node,o=parseInt(a.replace(/^v/,"").split(".")[0]);return o>=22?typeof globalThis.WebSocket<"u"?{type:"native",wsConstructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${o} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${o} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const bn="2.109.0",wn=`realtime-js/${bn}`,kn="1.0.0",ks="2.0.0",Sn=ks,xn=1e4,_n=100,Me={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Ss={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},$r={connecting:"connecting",closing:"closing",closed:"closed"};class An{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,i;const s=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(e){var t,i;const s=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:{},a=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,a)}_encodeUserBroadcastPush(e,t,i){var s,n;const a=e.topic,o=(s=e.ref)!==null&&s!==void 0?s:"",l=(n=e.join_ref)!==null&&n!==void 0?n:"",c=e.payload.event,d=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},u=Object.keys(d).length===0?"":JSON.stringify(d);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`topic length ${a.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+a.length+c.length+u.length,p=new ArrayBuffer(this.HEADER_LENGTH+h);let g=new DataView(p),f=0;g.setUint8(f++,this.KINDS.userBroadcastPush),g.setUint8(f++,l.length),g.setUint8(f++,o.length),g.setUint8(f++,a.length),g.setUint8(f++,c.length),g.setUint8(f++,u.length),g.setUint8(f++,t),Array.from(l,y=>g.setUint8(f++,y.charCodeAt(0))),Array.from(o,y=>g.setUint8(f++,y.charCodeAt(0))),Array.from(a,y=>g.setUint8(f++,y.charCodeAt(0))),Array.from(c,y=>g.setUint8(f++,y.charCodeAt(0))),Array.from(u,y=>g.setUint8(f++,y.charCodeAt(0)));var v=new Uint8Array(p.byteLength+i.byteLength);return v.set(new Uint8Array(p),0),v.set(new Uint8Array(i),p.byteLength),v.buffer}decode(e,t){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return t(i)}if(typeof e=="string"){const i=JSON.parse(e),[s,n,a,o,l]=i;return t({join_ref:s,ref:n,topic:a,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),i=t.getUint8(0),s=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,s)}}_decodeUserBroadcast(e,t,i){const s=t.getUint8(1),n=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+s));l=l+s;const d=i.decode(e.slice(l,l+n));l=l+n;const u=i.decode(e.slice(l,l+a));l=l+a;const h=e.slice(l,e.byteLength),p=o===this.JSON_ENCODING?JSON.parse(i.decode(h)):h,g={type:this.BROADCAST_EVENT,event:d,payload:p};return a>0&&(g.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:g}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>t.includes(i)))}}var Z;(function(r){r.abstime="abstime",r.bool="bool",r.date="date",r.daterange="daterange",r.float4="float4",r.float8="float8",r.int2="int2",r.int4="int4",r.int4range="int4range",r.int8="int8",r.int8range="int8range",r.json="json",r.jsonb="jsonb",r.money="money",r.numeric="numeric",r.oid="oid",r.reltime="reltime",r.text="text",r.time="time",r.timestamp="timestamp",r.timestamptz="timestamptz",r.timetz="timetz",r.tsrange="tsrange",r.tstzrange="tstzrange"})(Z||(Z={}));const Ii=(r,e,t={})=>{var i;const s=(i=t.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((n,a)=>(n[a]=En(a,r,e,s),n),{}):{}},En=(r,e,t,i)=>{const s=e.find(o=>o.name===r),n=s==null?void 0:s.type,a=t[r];return n&&!i.includes(n)?xs(n,a):Ir(a)},xs=(r,e)=>{if(r.charAt(0)==="_"){const t=r.slice(1,r.length);return In(e,t)}switch(r){case Z.bool:return Tn(e);case Z.float4:case Z.float8:case Z.int2:case Z.int4:case Z.int8:case Z.numeric:case Z.oid:return Cn(e);case Z.json:case Z.jsonb:return $n(e);case Z.timestamp:return Pn(e);case Z.abstime:case Z.date:case Z.daterange:case Z.int4range:case Z.int8range:case Z.money:case Z.reltime:case Z.text:case Z.time:case Z.timestamptz:case Z.timetz:case Z.tsrange:case Z.tstzrange:return Ir(e);default:return Ir(e)}},Ir=r=>r,Tn=r=>{switch(r){case"t":return!0;case"f":return!1;default:return r}},Cn=r=>{if(typeof r=="string"){const e=parseFloat(r);if(!Number.isNaN(e))return e}return r},$n=r=>{if(typeof r=="string")try{return JSON.parse(r)}catch{return r}return r},In=(r,e)=>{if(typeof r!="string")return r;const t=r.length-1,i=r[t];if(r[0]==="{"&&i==="}"){let n;const a=r.slice(1,t);try{n=JSON.parse("["+a+"]")}catch{n=a?a.split(","):[]}return n.map(o=>xs(e,o))}return r},Pn=r=>typeof r=="string"?r.replace(" ","T"):r,_s=r=>{const e=new URL(r);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var kt=r=>typeof r=="function"?r:function(){return r},Rn=typeof self<"u"?self:null,nt=typeof window<"u"?window:null,$e=Rn||nt||globalThis,Ln="2.0.0",On=1e4,Un=1e3,Ie={connecting:0,open:1,closing:2,closed:3},ye={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Ue={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},Pr={longpoll:"longpoll",websocket:"websocket"},Bn={complete:4},Rr="base64url.bearer.phx.",Mt=class{constructor(r,e,t,i){this.channel=r,this.event=e,this.payload=t||function(){return{}},this.receivedResp=null,this.timeout=i,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(r){this.timeout=r,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(r,e){return this.hasReceived(r)&&e(this.receivedResp.response),this.recHooks.push({status:r,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:r,response:e,_ref:t}){this.recHooks.filter(i=>i.status===r).forEach(i=>i.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,r=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=r,this.matchReceive(r)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(r){return this.receivedResp&&this.receivedResp.status===r}trigger(r,e){this.channel.trigger(this.refEvent,{status:r,response:e})}},As=class{constructor(r,e){this.callback=r,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},Dn=class{constructor(r,e,t){this.state=ye.closed,this.topic=r,this.params=kt(e||{}),this.socket=t,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Mt(this,Ue.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new As(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=ye.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this.joinPush.receive("error",i=>{this.state=ye.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=ye.closed,this.socket.remove(this)}),this.onError(i=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.isJoining()&&this.joinPush.reset(),this.state=ye.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Mt(this,Ue.leave,kt({}),this.timeout).send(),this.state=ye.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Ue.reply,(i,s)=>{this.trigger(this.replyEventName(s),i)})}join(r=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=r,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(r=>r.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=ye.closed,this.bindings=[]}onClose(r){this.on(Ue.close,r)}onError(r){return this.on(Ue.error,e=>r(e))}on(r,e){let t=this.bindingRef++;return this.bindings.push({event:r,ref:t,callback:e}),t}off(r,e){this.bindings=this.bindings.filter(t=>!(t.event===r&&(typeof e>"u"||e===t.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(r,e,t=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${r}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let i=new Mt(this,r,function(){return e},t);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}leave(r=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=ye.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(Ue.close,"leave")},t=new Mt(this,Ue.leave,kt({}),r);return t.receive("ok",()=>e()).receive("timeout",()=>e()),t.send(),this.canPush()||t.trigger("ok",{}),t}onMessage(r,e,t){return e}filterBindings(r,e,t){return!0}isMember(r,e,t,i){return this.topic!==r?!1:i&&i!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:r,event:e,payload:t,joinRef:i}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(r=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=ye.joining,this.joinPush.resend(r))}trigger(r,e,t,i){let s=this.onMessage(r,e,t,i);if(e&&!s)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let n=this.bindings.filter(a=>a.event===r&&this.filterBindings(a,e,t));for(let a=0;a<n.length;a++)n[a].callback(s,t,i||this.joinRef())}replyEventName(r){return`chan_reply_${r}`}isClosed(){return this.state===ye.closed}isErrored(){return this.state===ye.errored}isJoined(){return this.state===ye.joined}isJoining(){return this.state===ye.joining}isLeaving(){return this.state===ye.leaving}},Zt=class{static request(r,e,t,i,s,n,a){if($e.XDomainRequest){let o=new $e.XDomainRequest;return this.xdomainRequest(o,r,e,i,s,n,a)}else if($e.XMLHttpRequest){let o=new $e.XMLHttpRequest;return this.xhrRequest(o,r,e,t,i,s,n,a)}else{if($e.fetch&&$e.AbortController)return this.fetchRequest(r,e,t,i,s,n,a);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(r,e,t,i,s,n,a){let o={method:r,headers:t,body:i},l=null;return s&&(l=new AbortController,setTimeout(()=>l.abort(),s),o.signal=l.signal),$e.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>a&&a(c)).catch(c=>{c.name==="AbortError"&&n?n():a&&a(null)}),l}static xdomainRequest(r,e,t,i,s,n,a){return r.timeout=s,r.open(e,t),r.onload=()=>{let o=this.parseJSON(r.responseText);a&&a(o)},n&&(r.ontimeout=n),r.onprogress=()=>{},r.send(i),r}static xhrRequest(r,e,t,i,s,n,a,o){r.open(e,t,!0),r.timeout=n;for(let[l,c]of Object.entries(i))r.setRequestHeader(l,c);return r.onerror=()=>o&&o(null),r.onreadystatechange=()=>{if(r.readyState===Bn.complete&&o){let l=this.parseJSON(r.responseText);o(l)}},a&&(r.ontimeout=a),r.send(s),r}static parseJSON(r){if(!r||r==="")return null;try{return JSON.parse(r)}catch{return console&&console.log("failed to parse JSON response",r),null}}static serialize(r,e){let t=[];for(var i in r){if(!Object.prototype.hasOwnProperty.call(r,i))continue;let s=e?`${e}[${i}]`:i,n=r[i];typeof n=="object"?t.push(this.serialize(n,s)):t.push(encodeURIComponent(s)+"="+encodeURIComponent(n))}return t.join("&")}static appendParams(r,e){if(Object.keys(e).length===0)return r;let t=r.match(/\?/)?"&":"?";return`${r}${t}${this.serialize(e)}`}},Nn=r=>{let e="",t=new Uint8Array(r),i=t.byteLength;for(let s=0;s<i;s++)e+=String.fromCharCode(t[s]);return btoa(e)},Xe=class{constructor(r,e){e&&e.length===2&&e[1].startsWith(Rr)&&(this.authToken=atob(e[1].slice(Rr.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(r),this.readyState=Ie.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(r){return r.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+Pr.websocket),"$1/"+Pr.longpoll)}endpointURL(){return Zt.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(r,e,t){this.close(r,e,t),this.readyState=Ie.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===Ie.open||this.readyState===Ie.connecting}poll(){const r={Accept:"application/json"};this.authToken&&(r["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",r,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:i,messages:s}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=i}else t=0;switch(t){case 200:s.forEach(n=>{setTimeout(()=>this.onmessage({data:n}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=Ie.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${t}`)}})}send(r){typeof r!="string"&&(r=Nn(r)),this.currentBatch?this.currentBatch.push(r):this.awaitingBatchAck?this.batchBuffer.push(r):(this.currentBatch=[r],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(r){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},r.join(`
`),()=>this.onerror("timeout"),e=>{this.awaitingBatchAck=!1,!e||e.status!==200?(this.onerror(e&&e.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(r,e,t){for(let s of this.reqs)s.abort();this.readyState=Ie.closed;let i=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:r,reason:e,wasClean:t});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",i)):this.onclose(i)}ajax(r,e,t,i,s){let n,a=()=>{this.reqs.delete(n),i()};n=Zt.request(r,this.endpointURL(),e,t,this.timeout,a,o=>{this.reqs.delete(n),this.isActive()&&s(o)}),this.reqs.add(n)}},jn=class vt{constructor(e,t={}){let i=t.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(i.state,s=>{let{onJoin:n,onLeave:a,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=vt.syncState(this.state,s,n,a),this.pendingDiffs.forEach(l=>{this.state=vt.syncDiff(this.state,l,n,a)}),this.pendingDiffs=[],o()}),this.channel.on(i.diff,s=>{let{onJoin:n,onLeave:a,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=vt.syncDiff(this.state,s,n,a),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return vt.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,i,s){let n=this.clone(e),a={},o={};return this.map(n,(l,c)=>{t[l]||(o[l]=c)}),this.map(t,(l,c)=>{let d=n[l];if(d){let u=c.metas.map(f=>f.phx_ref),h=d.metas.map(f=>f.phx_ref),p=c.metas.filter(f=>h.indexOf(f.phx_ref)<0),g=d.metas.filter(f=>u.indexOf(f.phx_ref)<0);p.length>0&&(a[l]=c,a[l].metas=p),g.length>0&&(o[l]=this.clone(d),o[l].metas=g)}else a[l]=c}),this.syncDiff(n,{joins:a,leaves:o},i,s)}static syncDiff(e,t,i,s){let{joins:n,leaves:a}=this.clone(t);return i||(i=function(){}),s||(s=function(){}),this.map(n,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let d=e[o].metas.map(h=>h.phx_ref),u=c.metas.filter(h=>d.indexOf(h.phx_ref)<0);e[o].metas.unshift(...u)}i(o,c,l)}),this.map(a,(o,l)=>{let c=e[o];if(!c)return;let d=l.metas.map(u=>u.phx_ref);c.metas=c.metas.filter(u=>d.indexOf(u.phx_ref)<0),s(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,t){return t||(t=function(i,s){return s}),this.map(e,(i,s)=>t(i,s))}static map(e,t){return Object.getOwnPropertyNames(e).map(i=>t(i,e[i]))}static clone(e){return JSON.parse(JSON.stringify(e))}},qt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(r,e){if(r.payload.constructor===ArrayBuffer)return e(this.binaryEncode(r));{let t=[r.join_ref,r.ref,r.topic,r.event,r.payload];return e(JSON.stringify(t))}},decode(r,e){if(r.constructor===ArrayBuffer)return e(this.binaryDecode(r));{let[t,i,s,n,a]=JSON.parse(r);return e({join_ref:t,ref:i,topic:s,event:n,payload:a})}},binaryEncode(r){let{join_ref:e,ref:t,event:i,topic:s,payload:n}=r,a=this.META_LENGTH+e.length+t.length+s.length+i.length,o=new ArrayBuffer(this.HEADER_LENGTH+a),l=new DataView(o),c=0;l.setUint8(c++,this.KINDS.push),l.setUint8(c++,e.length),l.setUint8(c++,t.length),l.setUint8(c++,s.length),l.setUint8(c++,i.length),Array.from(e,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(t,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(s,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(i,u=>l.setUint8(c++,u.charCodeAt(0)));var d=new Uint8Array(o.byteLength+n.byteLength);return d.set(new Uint8Array(o),0),d.set(new Uint8Array(n),o.byteLength),d.buffer},binaryDecode(r){let e=new DataView(r),t=e.getUint8(0),i=new TextDecoder;switch(t){case this.KINDS.push:return this.decodePush(r,e,i);case this.KINDS.reply:return this.decodeReply(r,e,i);case this.KINDS.broadcast:return this.decodeBroadcast(r,e,i)}},decodePush(r,e,t){let i=e.getUint8(1),s=e.getUint8(2),n=e.getUint8(3),a=this.HEADER_LENGTH+this.META_LENGTH-1,o=t.decode(r.slice(a,a+i));a=a+i;let l=t.decode(r.slice(a,a+s));a=a+s;let c=t.decode(r.slice(a,a+n));a=a+n;let d=r.slice(a,r.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:d}},decodeReply(r,e,t){let i=e.getUint8(1),s=e.getUint8(2),n=e.getUint8(3),a=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=t.decode(r.slice(o,o+i));o=o+i;let c=t.decode(r.slice(o,o+s));o=o+s;let d=t.decode(r.slice(o,o+n));o=o+n;let u=t.decode(r.slice(o,o+a));o=o+a;let h=r.slice(o,r.byteLength),p={status:u,response:h};return{join_ref:l,ref:c,topic:d,event:Ue.reply,payload:p}},decodeBroadcast(r,e,t){let i=e.getUint8(1),s=e.getUint8(2),n=this.HEADER_LENGTH+2,a=t.decode(r.slice(n,n+i));n=n+i;let o=t.decode(r.slice(n,n+s));n=n+s;let l=r.slice(n,r.byteLength);return{join_ref:null,ref:null,topic:a,event:o,payload:l}}},zn=class{constructor(r,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||On,this.transport=e.transport||$e.WebSocket||Xe,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let t=null;try{t=$e&&$e.sessionStorage}catch{}this.sessionStore=e.sessionStorage||t,this.establishedConnections=0,this.defaultEncoder=qt.encode.bind(qt),this.defaultDecoder=qt.decode.bind(qt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==Xe?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let i=null;nt&&nt.addEventListener&&(nt.addEventListener("pagehide",s=>{this.conn&&(this.disconnect(),i=this.connectClock)}),nt.addEventListener("pageshow",s=>{i===this.connectClock&&(i=null,this.connect())}),nt.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=s=>e.rejoinAfterMs?e.rejoinAfterMs(s):[1e3,2e3,5e3][s-1]||1e4,this.reconnectAfterMs=s=>e.reconnectAfterMs?e.reconnectAfterMs(s):[10,50,100,150,200,250,500,1e3,2e3][s-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(s,n,a)=>{console.log(`${s}: ${n}`,a)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=kt(e.params||{}),this.endPoint=`${r}/${Pr.websocket}`,this.vsn=e.vsn||Ln,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new As(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken}getLongPollTransport(){return Xe}replaceTransport(r){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=r}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let r=Zt.appendParams(Zt.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return r.charAt(0)!=="/"?r:r.charAt(1)==="/"?`${this.protocol()}:${r}`:`${this.protocol()}://${location.host}${r}`}disconnect(r,e,t){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,r&&r()},e,t)}connect(r){r&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=kt(r)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Xe?this.connectWithFallback(Xe,this.longPollFallbackMs):this.transportConnect())}log(r,e,t){this.logger&&this.logger(r,e,t)}hasLogger(){return this.logger!==null}onOpen(r){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,r]),e}onClose(r){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,r]),e}onError(r){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,r]),e}onMessage(r){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,r]),e}onHeartbeat(r){this.heartbeatCallback=r}ping(r){if(!this.isConnected())return!1;let e=this.makeRef(),t=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let i=this.onMessage(s=>{s.ref===e&&(this.off([i]),r(Date.now()-t))});return!0}transportName(r){switch(r){case Xe:return"LongPoll";default:return r.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let r;this.authToken&&(r=["phoenix",`${Rr}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),r),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(r){return this.sessionStore&&this.sessionStore.getItem(r)}storeSession(r,e){this.sessionStore&&this.sessionStore.setItem(r,e)}connectWithFallback(r,e=2500){clearTimeout(this.fallbackTimer);let t=!1,i=!0,s,n,a=this.transportName(r),o=l=>{this.log("transport",`falling back to ${a}...`,l),this.off([s,n]),i=!1,this.replaceTransport(r),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),n=this.onError(l=>{this.log("transport","error",l),i&&!t&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(t=!0,!i){let l=this.transportName(r);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(r){this.log("error","error in heartbeat callback",r)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),Un,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(r,e,t){if(!this.conn)return r&&r();const i=this.conn;this.waitForBufferDone(i,()=>{e?i.close(e,t||""):i.close(),this.waitForSocketClosed(i,()=>{this.conn===i&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),r&&r()})})}waitForBufferDone(r,e,t=1){if(t===5||!r.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(r,e,t+1)},150*t)}waitForSocketClosed(r,e,t=1){if(t===5||r.readyState===Ie.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(r,e,t+1)},150*t)}onConnClose(r){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",r),this.triggerChanError(r),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",r)}onConnError(r){this.hasLogger()&&this.log("transport","error",r);let e=this.transport,t=this.establishedConnections;this.triggerStateCallbacks("error",r,e,t),(e===this.transport||t>0)&&this.triggerChanError(r)}triggerChanError(r){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(Ue.error,r)})}connectionState(){switch(this.conn&&this.conn.readyState){case Ie.connecting:return"connecting";case Ie.open:return"open";case Ie.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(r){this.off(r.stateChangeRefs),this.channels=this.channels.filter(e=>e!==r)}off(r){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([t])=>r.indexOf(t)===-1)}channel(r,e={}){let t=new Dn(r,e,this);return this.channels.push(t),t}push(r){if(this.hasLogger()){let{topic:e,event:t,payload:i,ref:s,join_ref:n}=r;this.log("push",`${e} ${t} (${n}, ${s})`,i)}this.isConnected()?this.encode(r,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(r,e=>this.conn.send(e)))}makeRef(){let r=this.ref+1;return r===this.ref?this.ref=0:this.ref=r,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(r){this.log("error","error in heartbeat callback",r)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(r){this.log("error","error in heartbeat callback",r)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(r=>r()),this.sendBuffer=[])}onConnMessage(r){this.decode(r.data,e=>{let{topic:t,event:i,payload:s,ref:n,join_ref:a}=e;if(n&&n===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(s.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${s.status||""} ${t} ${i} ${n&&"("+n+")"||""}`.trim(),s);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(t,i,s,a)&&l.trigger(i,s,n,a)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(r,...e){try{this.stateChangeCallbacks[r].forEach(([t,i])=>{try{i(...e)}catch(s){this.log("error",`error in ${r} callback`,s)}})}catch(t){this.log("error",`error triggering ${r} callbacks`,t)}}leaveOpenTopic(r){let e=this.channels.find(t=>t.topic===r&&(t.isJoined()||t.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${r}"`),e.leave())}};class St{constructor(e,t){const i=qn(t);this.presence=new jn(e.getChannel(),i),this.presence.onJoin((s,n,a)=>{const o=St.onJoinPayload(s,n,a);e.getChannel().trigger("presence",o)}),this.presence.onLeave((s,n,a)=>{const o=St.onLeavePayload(s,n,a);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return St.transformState(this.presence.state)}static transformState(e){return e=Mn(e),Object.getOwnPropertyNames(e).reduce((t,i)=>{const s=e[i];return t[i]=Qt(s),t},{})}static onJoinPayload(e,t,i){const s=Pi(t),n=Qt(i);return{event:"join",key:e,currentPresences:s,newPresences:n}}static onLeavePayload(e,t,i){const s=Pi(t),n=Qt(i);return{event:"leave",key:e,currentPresences:s,leftPresences:n}}}function Qt(r){return r.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))}function Mn(r){return JSON.parse(JSON.stringify(r))}function qn(r){return(r==null?void 0:r.events)&&{events:r.events}}function Pi(r){return r!=null&&r.metas?Qt(r):[]}var Ri;(function(r){r.SYNC="sync",r.JOIN="join",r.LEAVE="leave"})(Ri||(Ri={}));class Hn{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new St(this.channel.channelAdapter,t)}}function Fn(r){if(r instanceof Error)return r;if(typeof r=="string")return new Error(r);if(r&&typeof r=="object"){const e=r;if(typeof e.code=="number"){const t=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${t}`,{cause:r})}return new Error("channel error: transport failure",{cause:r})}return new Error("channel error: connection lost")}class Kn{constructor(e,t,i){const s=Wn(i);this.channel=e.getSocket().channel(t,s),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,i){let s;try{s=this.channel.push(e,t,i)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>_n){const n=this.channel.pushBuffer.shift();n.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${n.event}`,n.payload())}return s}updateJoinPayload(e){const t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===Me.joined}isJoined(){return this.state===Me.joined}isJoining(){return this.state===Me.joining}isClosed(){return this.state===Me.closed}isLeaving(){return this.state===Me.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function Wn(r){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config)}}const Vn=/[,()"\\]/,Gn=r=>Vn.test(r)||r!==r.trim(),Jn=r=>`"${r.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,Li=r=>{const e=r===null?"null":String(r);return Gn(e)?Jn(e):e},Yn=r=>r===null?"null":String(r),Qn=(r,e)=>{if(r==="in"){const t=Array.isArray(e)?e:[e];if(t.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(t)).map(s=>Li(s)).join(",")})`}return r==="is"?`is.${Yn(e)}`:`${r}.${Li(e)}`};class Xn{constructor(){this.filters=[]}add(e,t,i,s=!1){const n=s?"not.":"";return this.filters.push(`${e}=${n}${Qn(t,i)}`),this}eq(e,t){return this.add(e,"eq",t)}neq(e,t){return this.add(e,"neq",t)}gt(e,t){return this.add(e,"gt",t)}gte(e,t){return this.add(e,"gte",t)}lt(e,t){return this.add(e,"lt",t)}lte(e,t){return this.add(e,"lte",t)}in(e,t){return this.add(e,"in",t)}like(e,t){return this.add(e,"like",t)}ilike(e,t){return this.add(e,"ilike",t)}match(e,t){return this.add(e,"match",t)}imatch(e,t){return this.add(e,"imatch",t)}is(e,t){return this.add(e,"is",t)}isDistinct(e,t){return this.add(e,"isdistinct",t)}not(e,t,i){return this.add(e,t,i,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var Oi;(function(r){r.ALL="*",r.INSERT="INSERT",r.UPDATE="UPDATE",r.DELETE="DELETE"})(Oi||(Oi={}));var ot;(function(r){r.BROADCAST="broadcast",r.PRESENCE="presence",r.POSTGRES_CHANGES="postgres_changes",r.SYSTEM="system"})(ot||(ot={}));var Be;(function(r){r.SUBSCRIBED="SUBSCRIBED",r.TIMED_OUT="TIMED_OUT",r.CLOSED="CLOSED",r.CHANNEL_ERROR="CHANNEL_ERROR"})(Be||(Be={}));class xt{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},i){var s,n;if(this.topic=e,this.params=t,this.socket=i,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.channelAdapter=new Kn(this.socket.socketAdapter,e,this.params),this.presence=new Hn(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=_s(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((n=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||n===void 0)&&n.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){var i,s,n;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:a,presence:o,private:l}}=this.params,c=(s=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(p=>p.filter))!==null&&s!==void 0?s:[],d=!!this.bindings[ot.PRESENCE]&&this.bindings[ot.PRESENCE].length>0||((n=this.params.config.presence)===null||n===void 0?void 0:n.enabled)===!0,u={},h={broadcast:a,presence:Object.assign(Object.assign({},o),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(p=>{e==null||e(Be.CHANNEL_ERROR,Fn(p))}),this._onClose(()=>e==null?void 0:e(Be.CLOSED)),this.updateJoinPayload(Object.assign({config:h},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(t).receive("ok",async({postgres_changes:p})=>{if(this.socket._isManualToken()||this.socket.setAuth(),p===void 0){e==null||e(Be.SUBSCRIBED);return}this._updatePostgresBindings(p,e)}).receive("error",p=>{this.state=Me.errored;const g=Object.values(p).join(", ")||"error";e==null||e(Be.CHANNEL_ERROR,new Error(g,{cause:p}))}).receive("timeout",()=>{e==null||e(Be.TIMED_OUT)})}return this}_updatePostgresBindings(e,t){var i;const s=this.bindings.postgres_changes,n=(i=s==null?void 0:s.length)!==null&&i!==void 0?i:0,a=[];for(let o=0;o<n;o++){const l=s[o],{filter:{event:c,schema:d,table:u,filter:h}}=l,p=e&&e[o];if(p&&p.event===c&&xt.isFilterValueEqual(p.schema,d)&&xt.isFilterValueEqual(p.table,u)&&xt.isFilterValueEqual(p.filter,h))a.push(Object.assign(Object.assign({},l),{id:p.id}));else{this.unsubscribe(),this.state=Me.errored,t==null||t(Be.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=a,this.state!=Me.errored&&t&&t(Be.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,i){const s=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),n=e===ot.PRESENCE||e===ot.POSTGRES_CHANGES;if(s&&n)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,i)}async httpSend(e,t,i={}){var s;if(t==null)return Promise.reject(new Error("Payload is required for httpSend()"));const n=t instanceof ArrayBuffer||ArrayBuffer.isView(t),a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":n?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:a,body:n?t:JSON.stringify(t)},c=await this._fetchWithTimeout(o.toString(),l,(s=i.timeout)!==null&&s!==void 0?s:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=c.statusText;try{const u=await c.json();d=u.error||u.message||d}catch{}return Promise.reject(new Error(d))}async send(e,t={}){var i,s;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:n,payload:a}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:a,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(i=t.timeout)!==null&&i!==void 0?i:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c instanceof Error&&c.name==="AbortError"?"timed out":"error"}}else return new Promise(n=>{var a,o,l;const c=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(a=this.params)===null||a===void 0?void 0:a.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&n("ok"),c.receive("ok",()=>n("ok")),c.receive("error",()=>n("error")),c.receive("timeout",()=>n("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>t("ok")).receive("timeout",()=>t("timed out")).receive("error",()=>t("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,i){const s=new AbortController,n=setTimeout(()=>s.abort(),i),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:s.signal}));return clearTimeout(n),a}_on(e,t,i){const s=e.toLocaleLowerCase(),n=t==null?void 0:t.filter;(n instanceof Xn||typeof n=="object"&&n!==null&&typeof n.build=="function")&&(t=Object.assign(Object.assign({},t),{filter:n.build()}));const a=this.channelAdapter.on(e,i),o={type:s,filter:t,callback:i,ref:a};return this.bindings[s]?this.bindings[s].push(o):this.bindings[s]=[o],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,i)=>{var s,n,a,o,l,c,d;const u=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,i))return!1;const h=(s=this.bindings[u])===null||s===void 0?void 0:s.find(p=>p.ref===e.ref);if(!h)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in h){const p=h.id,g=(n=h.filter)===null||n===void 0?void 0:n.event;return p&&((a=t.ids)===null||a===void 0?void 0:a.includes(p))&&(g==="*"||(g==null?void 0:g.toLocaleLowerCase())===((o=t.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const p=(c=(l=h==null?void 0:h.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return p==="*"||p===((d=t==null?void 0:t.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===u})}_notThisChannelEvent(e,t){const{close:i,error:s,leave:n,join:a}=Ss;return t&&[i,s,n,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,i)=>{if(typeof t=="object"&&"ids"in t){const s=t.data,{schema:n,table:a,commit_timestamp:o,type:l,errors:c}=s;return Object.assign(Object.assign({},{schema:n,table:a,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(s))}return t})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const t in e.bindings)for(const i of e.bindings[t])this._on(i.type,i.filter,i.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Ii(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Ii(e.columns,e.old_record)),t}}class Zn{constructor(e,t){this.socket=new zn(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,i,s=1e4){return new Promise(n=>{setTimeout(()=>n("timeout"),s),this.socket.disconnect(()=>{e(),n("ok")},t,i)})}push(e){this.socket.push(e)}log(e,t,i){this.socket.log(e,t,i)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==$r.connecting}isDisconnecting(){return this.socket.connectionState()==$r.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Ui={HEARTBEAT_INTERVAL:25e3},ea=[1e3,2e3,5e3,1e4],ta=1e4;function ra(){const r=new Map;return{get length(){return r.size},clear(){r.clear()},getItem(e){return r.has(e)?r.get(e):null},key(e){var t;return(t=Array.from(r.keys())[e])!==null&&t!==void 0?t:null},removeItem(e){r.delete(e)},setItem(e,t){r.set(e,String(t))}}}function ia(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return ra()}const sa=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class na{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){var i;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new An,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=n=>n?(...a)=>n(...a):(...a)=>fetch(...a),!(!((i=t==null?void 0:t.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey;const s=this._initializeOptions(t);this.socketAdapter=new Zn(e,s),this.httpEndpoint=_s(e),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return t==="ok"&&e.teardown(),t}async removeAllChannels(){const e=this.channels.map(async i=>{const s=await i.unsubscribe();return i.teardown(),s}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,i){this.socketAdapter.log(e,t,i)}connectionState(){return this.socketAdapter.connectionState()||$r.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){const i=`realtime:${e}`,s=this.getChannels().find(n=>n.topic===i);if(s)return s;{const n=new xt(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e=null){let t,i=!1;if(e)t=e,i=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),t=this.accessTokenValue}else t=this.accessTokenValue;i?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(s=>{const n={access_token:t,version:wn};t&&s.updateJoinPayload(n),s.joinedOnce&&s.channelAdapter.isJoined()&&s.channelAdapter.push(Ss.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(t=>{this.log("error",`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(t=>{this.log("error","error waiting for auth on connect",t)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,i)=>{t=="sent"&&this._setAuthSafely(),e&&e(t,i)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{const i=new Blob([sa],{type:"application/javascript"});t=URL.createObjectURL(i)}return t}_initializeOptions(e){var t,i,s,n,a,o,l,c,d,u,h,p;this.worker=(t=e==null?void 0:e.worker)!==null&&t!==void 0?t:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null;const g={};g.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:xn,g.heartbeatIntervalMs=(n=e==null?void 0:e.heartbeatIntervalMs)!==null&&n!==void 0?n:Ui.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(a=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&a!==void 0?a:2*((o=e==null?void 0:e.heartbeatIntervalMs)!==null&&o!==void 0?o:Ui.HEARTBEAT_INTERVAL),g.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:yn.getWebSocketConstructor(),g.params=e==null?void 0:e.params,g.logger=e==null?void 0:e.logger,g.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),g.sessionStorage=(c=e==null?void 0:e.sessionStorage)!==null&&c!==void 0?c:ia(),g.reconnectAfterMs=(d=e==null?void 0:e.reconnectAfterMs)!==null&&d!==void 0?d:w=>ea[w-1]||ta;let f,v;const y=(u=e==null?void 0:e.vsn)!==null&&u!==void 0?u:Sn;switch(y){case kn:f=(w,S)=>S(JSON.stringify(w)),v=(w,S)=>S(JSON.parse(w));break;case ks:f=this.serializer.encode.bind(this.serializer),v=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${g.vsn}`)}if(g.vsn=y,g.encode=(h=e==null?void 0:e.encode)!==null&&h!==void 0?h:f,g.decode=(p=e==null?void 0:e.decode)!==null&&p!==void 0?p:v,g.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,g.params=Object.assign(Object.assign({},g.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,g.autoSendHeartbeat=!this.worker}return g}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var Et=class extends Error{constructor(r,e){var t;super(r),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function aa(r,e,t){const i=new URL(e,r);if(t)for(const[s,n]of Object.entries(t))n!==void 0&&i.searchParams.set(s,n);return i.toString()}async function oa(r){return!r||r.type==="none"?{}:r.type==="bearer"?{Authorization:`Bearer ${r.token}`}:r.type==="header"?{[r.name]:r.value}:r.type==="custom"?await r.getHeaders():{}}function la(r){const e=r.fetchImpl??globalThis.fetch;return{async request({method:t,path:i,query:s,body:n,headers:a}){const o=aa(r.baseUrl,i,s),l=await oa(r.auth),c=await e(o,{method:t,headers:{...n?{"Content-Type":"application/json"}:{},...l,...a},body:n?JSON.stringify(n):void 0}),d=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),h=u&&d?JSON.parse(d):d;if(!c.ok){const p=u?h:void 0,g=p==null?void 0:p.error;throw new Et((g==null?void 0:g.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:g==null?void 0:g.type,icebergCode:g==null?void 0:g.code,details:p})}return{status:c.status,headers:c.headers,data:h}}}}function Ht(r){return r.join("")}var ca=class{constructor(r,e=""){this.client=r,this.prefix=e}async listNamespaces(r){const e=r?{parent:Ht(r.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(r,e){const t={namespace:r.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(r){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ht(r.namespace)}`})}async loadNamespaceMetadata(r){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ht(r.namespace)}`})).data.properties}}async namespaceExists(r){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ht(r.namespace)}`}),!0}catch(e){if(e instanceof Et&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(r,e){try{return await this.createNamespace(r,e)}catch(t){if(t instanceof Et&&t.status===409)return;throw t}}};function Ze(r){return r.join("")}var da=class{constructor(r,e="",t){this.client=r,this.prefix=e,this.accessDelegation=t}async listTables(r){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ze(r.namespace)}/tables`})).data.identifiers}async createTable(r,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ze(r.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(r,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ze(r.namespace)}/tables/${r.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(r,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ze(r.namespace)}/tables/${r.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(r){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ze(r.namespace)}/tables/${r.name}`,headers:e})).data.metadata}async tableExists(r){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ze(r.namespace)}/tables/${r.name}`,headers:e}),!0}catch(t){if(t instanceof Et&&t.status===404)return!1;throw t}}async createTableIfNotExists(r,e){try{return await this.createTable(r,e)}catch(t){if(t instanceof Et&&t.status===409)return await this.loadTable({namespace:r.namespace,name:e.name});throw t}}},ua=class{constructor(r){var i;let e="v1";r.catalogName&&(e+=`/${r.catalogName}`);const t=r.baseUrl.endsWith("/")?r.baseUrl:`${r.baseUrl}/`;this.client=la({baseUrl:t,auth:r.auth,fetchImpl:r.fetch}),this.accessDelegation=(i=r.accessDelegation)==null?void 0:i.join(","),this.namespaceOps=new ca(this.client,e),this.tableOps=new da(this.client,e,this.accessDelegation)}async listNamespaces(r){return this.namespaceOps.listNamespaces(r)}async createNamespace(r,e){return this.namespaceOps.createNamespace(r,e)}async dropNamespace(r){await this.namespaceOps.dropNamespace(r)}async loadNamespaceMetadata(r){return this.namespaceOps.loadNamespaceMetadata(r)}async listTables(r){return this.tableOps.listTables(r)}async createTable(r,e){return this.tableOps.createTable(r,e)}async updateTable(r,e){return this.tableOps.updateTable(r,e)}async dropTable(r,e){await this.tableOps.dropTable(r,e)}async loadTable(r){return this.tableOps.loadTable(r)}async namespaceExists(r){return this.namespaceOps.namespaceExists(r)}async tableExists(r){return this.tableOps.tableExists(r)}async createNamespaceIfNotExists(r,e){return this.namespaceOps.createNamespaceIfNotExists(r,e)}async createTableIfNotExists(r,e){return this.tableOps.createTableIfNotExists(r,e)}};function Tt(r){"@babel/helpers - typeof";return Tt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Tt(r)}function ha(r,e){if(Tt(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var i=t.call(r,e);if(Tt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function pa(r){var e=ha(r,"string");return Tt(e)=="symbol"?e:e+""}function ma(r,e,t){return(e=pa(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Bi(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(r,s).enumerable})),t.push.apply(t,i)}return t}function D(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Bi(Object(t),!0).forEach(function(i){ma(r,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Bi(Object(t)).forEach(function(i){Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(t,i))})}return r}var ur=class extends Error{constructor(r,e="storage",t,i){super(r),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=t,this.statusCode=i}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function hr(r){return typeof r=="object"&&r!==null&&"__isStorageError"in r}var Lr=class extends ur{constructor(r,e,t,i="storage"){super(r,i,e,t),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=t}toJSON(){return D({},super.toJSON())}},Es=class extends ur{constructor(r,e,t="storage"){super(r,t),this.name=t==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function er(r,e,t){const i=D({},r),s=e.toLowerCase();for(const n of Object.keys(i))n.toLowerCase()===s&&delete i[n];return i[s]=t,i}function ga(r){const e={};for(const[t,i]of Object.entries(r))e[t.toLowerCase()]=i;return e}const fa=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),va=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},Or=r=>{if(Array.isArray(r))return r.map(t=>Or(t));if(typeof r=="function"||r!==Object(r))return r;const e={};return Object.entries(r).forEach(([t,i])=>{const s=t.replace(/([-_][a-z])/gi,n=>n.toUpperCase().replace(/[-_]/g,""));e[s]=Or(i)}),e},ya=r=>!r||typeof r!="string"||r.length===0||r.length>100||r.trim()!==r||r.includes("/")||r.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(r),Di=r=>{if(typeof r=="object"&&r!==null){const e=r;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const t=e.error;if(typeof t.message=="string")return t.message}}return JSON.stringify(r)},ba=async(r,e,t,i)=>{if(r!==null&&typeof r=="object"&&"json"in r&&typeof r.json=="function"){const s=r;let n=parseInt(String(s.status),10);Number.isFinite(n)||(n=500),s.json().then(a=>{const o=(a==null?void 0:a.statusCode)||(a==null?void 0:a.code)||n+"";e(new Lr(Di(a),n,o,i))}).catch(()=>{const a=n+"";e(new Lr(s.statusText||`HTTP ${n} error`,n,a,i))})}else e(new Es(Di(r),r,i))},wa=(r,e,t,i)=>{const s={method:r,headers:(e==null?void 0:e.headers)||{}};if(r==="GET"||r==="HEAD"||!i)return D(D({},s),t);if(va(i)){var n;const a=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(a))l.toLowerCase()==="content-type"&&(o=c);s.headers=er(a,"Content-Type",(n=o)!==null&&n!==void 0?n:"application/json"),s.body=JSON.stringify(i)}else s.body=i;return e!=null&&e.duplex&&(s.duplex=e.duplex),D(D({},s),t)};async function gt(r,e,t,i,s,n,a){return new Promise((o,l)=>{r(t,wa(e,i,s,n)).then(c=>{if(!c.ok)throw c;if(i!=null&&i.noResolveJson)return c;if(a==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>ba(c,l,i,a))})}function Ts(r="storage"){return{get:async(e,t,i,s)=>gt(e,"GET",t,i,s,void 0,r),post:async(e,t,i,s,n)=>gt(e,"POST",t,s,n,i,r),put:async(e,t,i,s,n)=>gt(e,"PUT",t,s,n,i,r),head:async(e,t,i,s)=>gt(e,"HEAD",t,D(D({},i),{},{noResolveJson:!0}),s,void 0,r),remove:async(e,t,i,s,n)=>gt(e,"DELETE",t,s,n,i,r)}}const ka=Ts("storage"),{get:Ct,post:Te,put:Ur,head:Sa,remove:$t}=ka,be=Ts("vectors");var ut=class{constructor(r,e={},t,i="storage"){this.shouldThrowOnError=!1,this.url=r,this.headers=ga(e),this.fetch=fa(t),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(r,e){return this.headers=er(this.headers,r,e),this}async handleOperation(r){var e=this;try{return{data:await r(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(hr(t))return{data:null,error:t};throw t}}};let Cs;Cs=Symbol.toStringTag;var xa=class{constructor(r,e){this.downloadFn=r,this.shouldThrowOnError=e,this[Cs]="StreamDownloadBuilder",this.promise=null}then(r,e){return this.getPromise().then(r,e)}catch(r){return this.getPromise().catch(r)}finally(r){return this.getPromise().finally(r)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var r=this;try{return{data:(await r.downloadFn()).body,error:null}}catch(e){if(r.shouldThrowOnError)throw e;if(hr(e))return{data:null,error:e};throw e}}};let $s;$s=Symbol.toStringTag;var _a=class{constructor(r,e){this.downloadFn=r,this.shouldThrowOnError=e,this[$s]="BlobDownloadBuilder",this.promise=null}asStream(){return new xa(this.downloadFn,this.shouldThrowOnError)}then(r,e){return this.getPromise().then(r,e)}catch(r){return this.getPromise().catch(r)}finally(r){return this.getPromise().finally(r)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var r=this;try{return{data:await(await r.downloadFn()).blob(),error:null}}catch(e){if(r.shouldThrowOnError)throw e;if(hr(e))return{data:null,error:e};throw e}}};const fr={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Ni={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Aa=class extends ut{constructor(r,e={},t,i){super(r,e,i,"storage"),this.bucketId=t}async uploadOrUpdate(r,e,t,i){var s=this;return s.handleOperation(async()=>{let n;const a=D(D({},Ni),i);let o=D(D({},s.headers),r==="POST"&&{"x-upsert":String(a.upsert)});const l=a.metadata;if(typeof Blob<"u"&&t instanceof Blob?(n=new FormData,n.append("cacheControl",a.cacheControl),l&&n.append("metadata",s.encodeMetadata(l)),n.append("",t)):typeof FormData<"u"&&t instanceof FormData?(n=t,n.has("cacheControl")||n.append("cacheControl",a.cacheControl),l&&!n.has("metadata")&&n.append("metadata",s.encodeMetadata(l))):(n=t,o["cache-control"]=`max-age=${a.cacheControl}`,o["content-type"]=a.contentType,l&&(o["x-metadata"]=s.toBase64(s.encodeMetadata(l))),(typeof ReadableStream<"u"&&n instanceof ReadableStream||n&&typeof n=="object"&&"pipe"in n&&typeof n.pipe=="function")&&!a.duplex&&(a.duplex="half")),i!=null&&i.headers)for(const[h,p]of Object.entries(i.headers))o=er(o,h,p);const c=s._removeEmptyFolders(e),d=s._getFinalPath(c),u=await(r=="PUT"?Ur:Te)(s.fetch,`${s.url}/object/${d}`,n,D({headers:o},a!=null&&a.duplex?{duplex:a.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}})}async upload(r,e,t){return this.uploadOrUpdate("POST",r,e,t)}async uploadToSignedUrl(r,e,t,i){var s=this;const n=s._removeEmptyFolders(r),a=s._getFinalPath(n),o=new URL(s.url+`/object/upload/sign/${a}`);return o.searchParams.set("token",e),s.handleOperation(async()=>{let l;const c=D(D({},Ni),i);let d=D(D({},s.headers),{"x-upsert":String(c.upsert)});const u=c.metadata;if(typeof Blob<"u"&&t instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),u&&l.append("metadata",s.encodeMetadata(u)),l.append("",t)):typeof FormData<"u"&&t instanceof FormData?(l=t,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),u&&!l.has("metadata")&&l.append("metadata",s.encodeMetadata(u))):(l=t,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType,u&&(d["x-metadata"]=s.toBase64(s.encodeMetadata(u))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),i!=null&&i.headers)for(const[h,p]of Object.entries(i.headers))d=er(d,h,p);return{path:n,fullPath:(await Ur(s.fetch,o.toString(),l,D({headers:d},c!=null&&c.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(r,e){var t=this;return t.handleOperation(async()=>{let i=t._getFinalPath(r);const s=D({},t.headers);e!=null&&e.upsert&&(s["x-upsert"]="true");const n=await Te(t.fetch,`${t.url}/object/upload/sign/${i}`,{},{headers:s}),a=new URL(t.url+n.url),o=a.searchParams.get("token");if(!o)throw new ur("No token returned by API");return{signedUrl:a.toString(),path:r,token:o}})}async update(r,e,t){return this.uploadOrUpdate("PUT",r,e,t)}async move(r,e,t){var i=this;return i.handleOperation(async()=>await Te(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:r,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers}))}async copy(r,e,t){var i=this;return i.handleOperation(async()=>({path:(await Te(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:r,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:i.headers})).Key}))}async createSignedUrl(r,e,t){var i=this;return i.handleOperation(async()=>{let s=i._getFinalPath(r);const n=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0;let a=await Te(i.fetch,`${i.url}/object/sign/${s}`,D({expiresIn:e},n?{transform:t.transform}:{}),{headers:i.headers});const o=new URLSearchParams;t!=null&&t.download&&o.set("download",t.download===!0?"":t.download),(t==null?void 0:t.cacheNonce)!=null&&o.set("cacheNonce",String(t.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${i.url}${a.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(r,e,t){var i=this;return i.handleOperation(async()=>{const s=await Te(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:r},{headers:i.headers}),n=new URLSearchParams;t!=null&&t.download&&n.set("download",t.download===!0?"":t.download),(t==null?void 0:t.cacheNonce)!=null&&n.set("cacheNonce",String(t.cacheNonce));const a=n.toString();return s.map(o=>D(D({},o),{},{signedUrl:o.signedURL?encodeURI(`${i.url}${o.signedURL}${a?`&${a}`:""}`):null}))})}download(r,e,t){const i=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",s=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(s,e.transform),(e==null?void 0:e.cacheNonce)!=null&&s.set("cacheNonce",String(e.cacheNonce));const n=s.toString(),a=this._getFinalPath(r),o=()=>Ct(this.fetch,`${this.url}/${i}/${a}${n?`?${n}`:""}`,{headers:this.headers,noResolveJson:!0},t);return new _a(o,this.shouldThrowOnError)}async info(r){var e=this;const t=e._getFinalPath(r);return e.handleOperation(async()=>Or(await Ct(e.fetch,`${e.url}/object/info/${t}`,{headers:e.headers})))}async exists(r){var e=this;const t=e._getFinalPath(r);try{return await Sa(e.fetch,`${e.url}/object/${t}`,{headers:e.headers}),{data:!0,error:null}}catch(s){if(e.shouldThrowOnError)throw s;if(hr(s)){var i;const n=s instanceof Lr?s.status:s instanceof Es?(i=s.originalError)===null||i===void 0?void 0:i.status:void 0;if(n!==void 0&&[400,404].includes(n))return{data:!1,error:s}}throw s}}getPublicUrl(r,e){const t=this._getFinalPath(r),i=new URLSearchParams;e!=null&&e.download&&i.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(i,e.transform),(e==null?void 0:e.cacheNonce)!=null&&i.set("cacheNonce",String(e.cacheNonce));const s=i.toString(),n=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${n}/public/${t}`)+(s?`?${s}`:"")}}}async remove(r){var e=this;return e.handleOperation(async()=>await $t(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:r},{headers:e.headers}))}async purgeCache(r,e,t){var i=this;return i.handleOperation(async()=>{const s=i._getFinalPath(r),n=new URLSearchParams;e!=null&&e.transformations&&n.set("transformations","true");const a=n.toString();return await $t(i.fetch,`${i.url}/cdn/${s}${a?`?${a}`:""}`,{},{headers:i.headers},t)})}async list(r,e,t){var i=this;return i.handleOperation(async()=>{const s=e!=null&&e.sortBy?D(D({},fr.sortBy),e.sortBy):fr.sortBy,n=D(D(D({},fr),e),{},{sortBy:s,prefix:r||""});return await Te(i.fetch,`${i.url}/object/list/${i.bucketId}`,n,{headers:i.headers},t)})}async listV2(r,e){var t=this;return t.handleOperation(async()=>{const i=D({},r);return await Te(t.fetch,`${t.url}/object/list-v2/${t.bucketId}`,i,{headers:t.headers},e)})}encodeMetadata(r){return JSON.stringify(r)}toBase64(r){return typeof Buffer<"u"?Buffer.from(r).toString("base64"):btoa(r)}_getFinalPath(r){return`${this.bucketId}/${r.replace(/^\/+/,"")}`}_removeEmptyFolders(r){return r.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(r,e){return e.width&&r.set("width",e.width.toString()),e.height&&r.set("height",e.height.toString()),e.resize&&r.set("resize",e.resize),e.format&&r.set("format",e.format),e.quality&&r.set("quality",e.quality.toString()),r}};const Ea="2.109.0",Ot={"X-Client-Info":`storage-js/${Ea}`};var Ta=class extends ut{constructor(r,e={},t,i){const s=new URL(r);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const n=s.href.replace(/\/$/,""),a=D(D({},Ot),e);super(n,a,t,"storage")}async listBuckets(r){var e=this;return e.handleOperation(async()=>{const t=e.listBucketOptionsToQueryString(r);return await Ct(e.fetch,`${e.url}/bucket${t}`,{headers:e.headers})})}async getBucket(r){var e=this;return e.handleOperation(async()=>await Ct(e.fetch,`${e.url}/bucket/${r}`,{headers:e.headers}))}async createBucket(r,e={public:!1}){var t=this;return t.handleOperation(async()=>await Te(t.fetch,`${t.url}/bucket`,{id:r,name:r,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async updateBucket(r,e){var t=this;return t.handleOperation(async()=>await Ur(t.fetch,`${t.url}/bucket/${r}`,{id:r,name:r,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async emptyBucket(r){var e=this;return e.handleOperation(async()=>await Te(e.fetch,`${e.url}/bucket/${r}/empty`,{},{headers:e.headers}))}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await $t(e.fetch,`${e.url}/bucket/${r}`,{},{headers:e.headers}))}async purgeBucketCache(r,e,t){var i=this;return i.handleOperation(async()=>{const s=new URLSearchParams;e!=null&&e.transformations&&s.set("transformations","true");const n=s.toString();return await $t(i.fetch,`${i.url}/cdn/${r}${n?`?${n}`:""}`,{},{headers:i.headers},t)})}listBucketOptionsToQueryString(r){const e={};return r&&("limit"in r&&(e.limit=String(r.limit)),"offset"in r&&(e.offset=String(r.offset)),r.search&&(e.search=r.search),r.sortColumn&&(e.sortColumn=r.sortColumn),r.sortOrder&&(e.sortOrder=r.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Ca=class extends ut{constructor(r,e={},t){const i=r.replace(/\/$/,""),s=D(D({},Ot),e);super(i,s,t,"storage")}async createBucket(r){var e=this;return e.handleOperation(async()=>await Te(e.fetch,`${e.url}/bucket`,{name:r},{headers:e.headers}))}async listBuckets(r){var e=this;return e.handleOperation(async()=>{const t=new URLSearchParams;(r==null?void 0:r.limit)!==void 0&&t.set("limit",r.limit.toString()),(r==null?void 0:r.offset)!==void 0&&t.set("offset",r.offset.toString()),r!=null&&r.sortColumn&&t.set("sortColumn",r.sortColumn),r!=null&&r.sortOrder&&t.set("sortOrder",r.sortOrder),r!=null&&r.search&&t.set("search",r.search);const i=t.toString(),s=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await Ct(e.fetch,s,{headers:e.headers})})}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await $t(e.fetch,`${e.url}/bucket/${r}`,{},{headers:e.headers}))}from(r){var e=this;if(!ya(r))throw new ur("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const t=new ua({baseUrl:this.url,catalogName:r,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(t,{get(s,n){const a=s[n];return typeof a!="function"?a:async(...o)=>{try{return{data:await a.apply(s,o),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},$a=class extends ut{constructor(r,e={},t){const i=r.replace(/\/$/,""),s=D(D({},Ot),{},{"Content-Type":"application/json"},e);super(i,s,t,"vectors")}async createIndex(r){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/CreateIndex`,r,{headers:e.headers})||{})}async getIndex(r,e){var t=this;return t.handleOperation(async()=>await be.post(t.fetch,`${t.url}/GetIndex`,{vectorBucketName:r,indexName:e},{headers:t.headers}))}async listIndexes(r){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/ListIndexes`,r,{headers:e.headers}))}async deleteIndex(r,e){var t=this;return t.handleOperation(async()=>await be.post(t.fetch,`${t.url}/DeleteIndex`,{vectorBucketName:r,indexName:e},{headers:t.headers})||{})}},Ia=class extends ut{constructor(r,e={},t){const i=r.replace(/\/$/,""),s=D(D({},Ot),{},{"Content-Type":"application/json"},e);super(i,s,t,"vectors")}async putVectors(r){var e=this;if(r.vectors.length<1||r.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/PutVectors`,r,{headers:e.headers})||{})}async getVectors(r){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/GetVectors`,r,{headers:e.headers}))}async listVectors(r){var e=this;if(r.segmentCount!==void 0){if(r.segmentCount<1||r.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(r.segmentIndex!==void 0&&(r.segmentIndex<0||r.segmentIndex>=r.segmentCount))throw new Error(`segmentIndex must be between 0 and ${r.segmentCount-1}`)}return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/ListVectors`,r,{headers:e.headers}))}async queryVectors(r){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/QueryVectors`,r,{headers:e.headers}))}async deleteVectors(r){var e=this;if(r.keys.length<1||r.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/DeleteVectors`,r,{headers:e.headers})||{})}},Pa=class extends ut{constructor(r,e={},t){const i=r.replace(/\/$/,""),s=D(D({},Ot),{},{"Content-Type":"application/json"},e);super(i,s,t,"vectors")}async createBucket(r){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:r},{headers:e.headers})||{})}async getBucket(r){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:r},{headers:e.headers}))}async listBuckets(r={}){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/ListVectorBuckets`,r,{headers:e.headers}))}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await be.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:r},{headers:e.headers})||{})}},Ra=class extends Pa{constructor(r,e={}){super(r,e.headers||{},e.fetch)}from(r){return new La(this.url,this.headers,r,this.fetch)}async createBucket(r){var e=()=>super.createBucket,t=this;return e().call(t,r)}async getBucket(r){var e=()=>super.getBucket,t=this;return e().call(t,r)}async listBuckets(r={}){var e=()=>super.listBuckets,t=this;return e().call(t,r)}async deleteBucket(r){var e=()=>super.deleteBucket,t=this;return e().call(t,r)}},La=class extends $a{constructor(r,e,t,i){super(r,e,i),this.vectorBucketName=t}async createIndex(r){var e=()=>super.createIndex,t=this;return e().call(t,D(D({},r),{},{vectorBucketName:t.vectorBucketName}))}async listIndexes(r={}){var e=()=>super.listIndexes,t=this;return e().call(t,D(D({},r),{},{vectorBucketName:t.vectorBucketName}))}async getIndex(r){var e=()=>super.getIndex,t=this;return e().call(t,t.vectorBucketName,r)}async deleteIndex(r){var e=()=>super.deleteIndex,t=this;return e().call(t,t.vectorBucketName,r)}index(r){return new Oa(this.url,this.headers,this.vectorBucketName,r,this.fetch)}},Oa=class extends Ia{constructor(r,e,t,i,s){super(r,e,s),this.vectorBucketName=t,this.indexName=i}async putVectors(r){var e=()=>super.putVectors,t=this;return e().call(t,D(D({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(r){var e=()=>super.getVectors,t=this;return e().call(t,D(D({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(r={}){var e=()=>super.listVectors,t=this;return e().call(t,D(D({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(r){var e=()=>super.queryVectors,t=this;return e().call(t,D(D({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(r){var e=()=>super.deleteVectors,t=this;return e().call(t,D(D({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},Ua=class extends Ta{constructor(r,e={},t,i){super(r,e,t,i)}from(r){return new Aa(this.url,this.headers,r,this.fetch)}get vectors(){return new Ra(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Ca(this.url+"/iceberg",this.headers,this.fetch)}};const Is="2.109.0",De=30*1e3,yt=3,vr=yt*De,Ba=2*De,Da="http://localhost:9999",Na="supabase.auth.token",ja={"X-Client-Info":`gotrue-js/${Is}`},Br="X-Supabase-Api-Version",Ps={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},za=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Ma=10*60*1e3;class It extends Error{constructor(e,t,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=i}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function E(r){return typeof r=="object"&&r!==null&&"__isAuthError"in r}class qa extends It{constructor(e,t,i){super(e,t,i),this.name="AuthApiError",this.status=t,this.code=i}}function Ha(r){return E(r)&&r.name==="AuthApiError"}class Ce extends It{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class Re extends It{constructor(e,t,i,s){super(e,i,s),this.name=t,this.status=i}}class pe extends Re{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Ft(r){return E(r)&&r.name==="AuthSessionMissingError"}class et extends Re{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Kt extends Re{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Wt extends Re{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function Fa(r){return E(r)&&r.name==="AuthImplicitGrantRedirectError"}class ji extends Re{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class Ka extends Re{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Dr extends Re{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function zi(r){return E(r)&&r.name==="AuthRetryableFetchError"}class Mi extends Re{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function Wa(r){return E(r)&&r.name==="AuthRefreshDiscardedError"}class qi extends Re{constructor(e,t,i){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=i}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class tr extends Re{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const rr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Hi=` 	
\r=`.split(""),Va=(()=>{const r=new Array(128);for(let e=0;e<r.length;e+=1)r[e]=-1;for(let e=0;e<Hi.length;e+=1)r[Hi[e].charCodeAt(0)]=-2;for(let e=0;e<rr.length;e+=1)r[rr[e].charCodeAt(0)]=e;return r})();function Fi(r,e,t){if(r!==null)for(e.queue=e.queue<<8|r,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(rr[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(rr[i]),e.queuedBits-=6}}function Rs(r,e,t){const i=Va[r];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(r)}"`)}}function Ki(r){const e=[],t=a=>{e.push(String.fromCodePoint(a))},i={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},n=a=>{Ya(a,i,t)};for(let a=0;a<r.length;a+=1)Rs(r.charCodeAt(a),s,n);return e.join("")}function Ga(r,e){if(r<=127){e(r);return}else if(r<=2047){e(192|r>>6),e(128|r&63);return}else if(r<=65535){e(224|r>>12),e(128|r>>6&63),e(128|r&63);return}else if(r<=1114111){e(240|r>>18),e(128|r>>12&63),e(128|r>>6&63),e(128|r&63);return}throw new Error(`Unrecognized Unicode codepoint: ${r.toString(16)}`)}function Ja(r,e){for(let t=0;t<r.length;t+=1){let i=r.charCodeAt(t);if(i>55295&&i<=56319){const s=(i-55296)*1024&65535;i=(r.charCodeAt(t+1)-56320&65535|s)+65536,t+=1}Ga(i,e)}}function Ya(r,e,t){if(e.utf8seq===0){if(r<=127){t(r);return}for(let i=1;i<6;i+=1)if(!(r>>7-i&1)){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=r&31;else if(e.utf8seq===3)e.codepoint=r&15;else if(e.utf8seq===4)e.codepoint=r&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(r<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|r&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function ct(r){const e=[],t={queue:0,queuedBits:0},i=s=>{e.push(s)};for(let s=0;s<r.length;s+=1)Rs(r.charCodeAt(s),t,i);return new Uint8Array(e)}function Qa(r){const e=[];return Ja(r,t=>e.push(t)),new Uint8Array(e)}function Ye(r){const e=[],t={queue:0,queuedBits:0},i=s=>{e.push(s)};return r.forEach(s=>Fi(s,t,i)),Fi(null,t,i),e.join("")}function Xa(r){return Math.round(Date.now()/1e3)+r}function Za(){return Symbol("auth-callback")}const ge=()=>typeof window<"u"&&typeof document<"u",Ve={tested:!1,writable:!1},Ls=()=>{if(!ge())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Ve.tested)return Ve.writable;const r=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(r,r),globalThis.localStorage.removeItem(r),Ve.tested=!0,Ve.writable=!0}catch{Ve.tested=!0,Ve.writable=!1}return Ve.writable};function eo(r){const e={},t=new URL(r);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((s,n)=>{e[n]=s})}catch{}return t.searchParams.forEach((i,s)=>{e[s]=i}),e}const Os=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),to=r=>typeof r=="object"&&r!==null&&"status"in r&&"ok"in r&&"json"in r&&typeof r.json=="function",at=async(r,e,t)=>{await r.setItem(e,JSON.stringify(t))},Ae=async(r,e)=>{const t=await r.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return null}},ae=async(r,e)=>{await r.removeItem(e)};class pr{constructor(){this.promise=new pr.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}pr.promiseConstructor=Promise;function Vt(r){const e=r.split(".");if(e.length!==3)throw new tr("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!za.test(e[i]))throw new tr("JWT not in base64url format");return{header:JSON.parse(Ki(e[0])),payload:JSON.parse(Ki(e[1])),signature:ct(e[2]),raw:{header:e[0],payload:e[1]}}}async function ro(r){return await new Promise(e=>{setTimeout(()=>e(null),r)})}function io(r,e){return new Promise((i,s)=>{(async()=>{for(let n=0;n<1/0;n++)try{const a=await r(n);if(!e(n,null,a)){i(a);return}}catch(a){if(!e(n,a)){s(a);return}}})()})}function so(r){return("0"+r.toString(16)).substr(-2)}function no(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=t.length;let s="";for(let n=0;n<56;n++)s+=t.charAt(Math.floor(Math.random()*i));return s}return crypto.getRandomValues(e),Array.from(e,so).join("")}async function ao(r){const t=new TextEncoder().encode(r),i=await crypto.subtle.digest("SHA-256",t),s=new Uint8Array(i);return Array.from(s).map(n=>String.fromCharCode(n)).join("")}async function oo(r){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),r;const t=await ao(r);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Ge(r,e,t=!1){const i=no();let s=i;t&&(s+="/recovery"),await at(r,`${e}-code-verifier`,s);const n=await oo(i);return[n,i===n?"plain":"s256"]}const lo=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function co(r){const e=r.headers.get(Br);if(!e||!e.match(lo))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function uo(r){if(!r)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(r<=e)throw new Error("JWT has expired")}function ho(r){switch(r){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const po=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Oe(r){if(!po.test(r))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Ee(r){if(!r.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function yr(){const r={};return new Proxy(r,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const i=t.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function mo(r,e){return new Proxy(r,{get:(t,i,s)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const n=i.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)"||n==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,i,s)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,i,s)}})}function Wi(r){return JSON.parse(JSON.stringify(r))}const Je=r=>{if(typeof r=="object"&&r!==null){const e=r;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(r)},go=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function Vi(r){var e;if(!to(r))throw new Dr(Je(r),0);if(go.includes(r.status))throw new Dr(Je(r),r.status);let t;try{t=await r.json()}catch(n){throw new Ce(Je(n),n)}let i;const s=co(r);if(s&&s.getTime()>=Ps["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?i=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(i=t.error_code),i){if(i==="weak_password")throw new qi(Je(t),r.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new pe}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((n,a)=>n&&typeof a=="string",!0))throw new qi(Je(t),r.status,t.weak_password.reasons);throw new qa(Je(t),r.status||500,i)}const fo=(r,e,t,i)=>{const s={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),s.body=JSON.stringify(i),Object.assign(Object.assign({},s),t))};async function P(r,e,t,i){var s;const n=Object.assign({},i==null?void 0:i.headers);n[Br]||(n[Br]=Ps["2024-01-01"].name),i!=null&&i.jwt&&(n.Authorization=`Bearer ${i.jwt}`);const a=(s=i==null?void 0:i.query)!==null&&s!==void 0?s:{};i!=null&&i.redirectTo&&(a.redirect_to=i.redirectTo);const o=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",l=await vo(r,e,t+o,{headers:n,noResolveJson:i==null?void 0:i.noResolveJson},{},i==null?void 0:i.body);return i!=null&&i.xform?i==null?void 0:i.xform(l):{data:Object.assign({},l),error:null}}async function vo(r,e,t,i,s,n){const a=fo(e,i,s,n);let o;try{o=await r(t,Object.assign({},a))}catch(l){throw console.error(l),new Dr(Je(l),0)}if(o.ok||await Vi(o),i!=null&&i.noResolveJson)return o;try{return await o.json()}catch(l){await Vi(l)}}function we(r){var e;let t=null;wo(r)&&(t=Object.assign({},r),r.expires_at||(t.expires_at=Xa(r.expires_in)));const i=(e=r.user)!==null&&e!==void 0?e:typeof(r==null?void 0:r.id)=="string"?r:null;return{data:{session:t,user:i},error:null}}function Gi(r){const e=we(r);return!e.error&&r.weak_password&&typeof r.weak_password=="object"&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.message&&typeof r.weak_password.message=="string"&&r.weak_password.reasons.reduce((t,i)=>t&&typeof i=="string",!0)&&(e.data.weak_password=r.weak_password),e}function qe(r){var e;return{data:{user:(e=r.user)!==null&&e!==void 0?e:r},error:null}}function yo(r){return{data:r,error:null}}function bo(r){const{action_link:e,email_otp:t,hashed_token:i,redirect_to:s,verification_type:n}=r,a=dr(r,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:i,redirect_to:s,verification_type:n},l=Object.assign({},a);return{data:{properties:o,user:l},error:null}}function Ji(r){return r}function wo(r){return!!r.access_token&&!!r.refresh_token&&!!r.expires_in}const br=["global","local","others"];class ko{constructor({url:e="",headers:t={},fetch:i,experimental:s}){this.url=e,this.headers=t,this.fetch=Os(i),this.experimental=s??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=br[0]){if(br.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${br.join(", ")}`);try{return await P(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if(E(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,t={}){try{return await P(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:qe})}catch(i){if(E(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:t}=e,i=dr(e,["options"]),s=Object.assign(Object.assign({},i),t);return"newEmail"in i&&(s.new_email=i==null?void 0:i.newEmail,delete s.newEmail),await P(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:bo,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(E(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await P(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:qe})}catch(t){if(E(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,i,s,n,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await P(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(n=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&n!==void 0?n:""},xform:Ji});if(d.error)throw d.error;const u=await d.json(),h=(a=d.headers.get("x-total-count"))!==null&&a!==void 0?a:0,p=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(g=>{const f=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(g.split(";")[1].split("=")[1]);c[`${v}Page`]=f}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(E(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Oe(e);try{return await P(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:qe})}catch(t){if(E(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){Oe(e);try{return await P(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:qe})}catch(i){if(E(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,t=!1){Oe(e);try{return await P(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:qe})}catch(i){if(E(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){Oe(e.userId);try{const{data:t,error:i}=await P(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:t,error:i}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _deleteFactor(e){Oe(e.userId),Oe(e.id);try{return{data:await P(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,i,s,n,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await P(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(n=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&n!==void 0?n:""},xform:Ji});if(d.error)throw d.error;const u=await d.json(),h=(a=d.headers.get("x-total-count"))!==null&&a!==void 0?a:0,p=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(g=>{const f=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(g.split(";")[1].split("=")[1]);c[`${v}Page`]=f}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(E(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await P(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await P(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await P(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(E(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await P(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await P(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _listCustomProviders(e){try{const t={};return e!=null&&e.type&&(t.type=e.type),await P(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:i=>{var s;return{data:{providers:(s=i==null?void 0:i.providers)!==null&&s!==void 0?s:[]},error:null}}})}catch(t){if(E(t))return{data:{providers:[]},error:t};throw t}}async _createCustomProvider(e){try{return await P(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _getCustomProvider(e){try{return await P(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _updateCustomProvider(e,t){try{return await P(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(E(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await P(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _adminListPasskeys(e){Ee(this.experimental),Oe(e.userId);try{return await P(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _adminDeletePasskey(e){Ee(this.experimental),Oe(e.userId),Oe(e.passkeyId);try{return await P(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}}function Yi(r={}){return{getItem:e=>r[e]||null,setItem:(e,t)=>{r[e]=t},removeItem:e=>{delete r[e]}}}globalThis&&Ls()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class So extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function xo(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Us(r){if(!/^0x[a-fA-F0-9]{40}$/.test(r))throw new Error(`@supabase/auth-js: Address "${r}" is invalid.`);return r.toLowerCase()}function _o(r){return parseInt(r,16)}function Ao(r){const e=new TextEncoder().encode(r);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function Eo(r){var e;const{chainId:t,domain:i,expirationTime:s,issuedAt:n=new Date,nonce:a,notBefore:o,requestId:l,resources:c,scheme:d,uri:u,version:h}=r;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(a&&a.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(h!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);if(!((e=r.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${r.statement}`)}const p=Us(r.address),g=d?`${d}://${i}`:i,f=r.statement?`${r.statement}
`:"",v=`${g} wants you to sign in with your Ethereum account:
${p}

${f}`;let y=`URI: ${u}
Version: ${h}
Chain ID: ${t}${a?`
Nonce: ${a}`:""}
Issued At: ${n.toISOString()}`;if(s&&(y+=`
Expiration Time: ${s.toISOString()}`),o&&(y+=`
Not Before: ${o.toISOString()}`),l&&(y+=`
Request ID: ${l}`),c){let w=`
Resources:`;for(const S of c){if(!S||typeof S!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${S}`);w+=`
- ${S}`}y+=w}return`${v}
${y}`}class oe extends Error{constructor({message:e,code:t,cause:i,name:s}){var n;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(n=s??(i instanceof Error?i.name:void 0))!==null&&n!==void 0?n:"Unknown Error",this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class ir extends oe{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function To({error:r,options:e}){var t,i,s;const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new oe({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else if(r.name==="ConstraintError"){if(((t=n.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new oe({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:r});if(e.mediation==="conditional"&&((i=n.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new oe({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:r});if(((s=n.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new oe({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:r})}else{if(r.name==="InvalidStateError")return new oe({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:r});if(r.name==="NotAllowedError")return new oe({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="NotSupportedError")return n.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new oe({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:r}):new oe({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:r});if(r.name==="SecurityError"){const a=window.location.hostname;if(Bs(a)){if(n.rp.id!==a)return new oe({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new oe({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new oe({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:r})}else if(r.name==="UnknownError")return new oe({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new oe({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}function Co({error:r,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new oe({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else{if(r.name==="NotAllowedError")return new oe({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="SecurityError"){const i=window.location.hostname;if(Bs(i)){if(t.rpId!==i)return new oe({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new oe({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="UnknownError")return new oe({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new oe({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}class $o{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Nr=new $o;function Qi(r){if(!r)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(r);const{challenge:e,user:t,excludeCredentials:i}=r,s=dr(r,["challenge","user","excludeCredentials"]),n=ct(e).buffer,a=Object.assign(Object.assign({},t),{id:ct(t.id).buffer}),o=Object.assign(Object.assign({},s),{challenge:n,user:a});if(i&&i.length>0){o.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:ct(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function Xi(r){if(!r)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(r);const{challenge:e,allowCredentials:t}=r,i=dr(r,["challenge","allowCredentials"]),s=ct(e).buffer,n=Object.assign(Object.assign({},i),{challenge:s});if(t&&t.length>0){n.allowCredentials=new Array(t.length);for(let a=0;a<t.length;a++){const o=t[a];n.allowCredentials[a]=Object.assign(Object.assign({},o),{id:ct(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return n}function Zi(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r;return{id:r.id,rawId:r.id,response:{attestationObject:Ye(new Uint8Array(r.response.attestationObject)),clientDataJSON:Ye(new Uint8Array(r.response.clientDataJSON))},type:"public-key",clientExtensionResults:r.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function es(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r,i=r.getClientExtensionResults(),s=r.response;return{id:r.id,rawId:r.id,response:{authenticatorData:Ye(new Uint8Array(s.authenticatorData)),clientDataJSON:Ye(new Uint8Array(s.clientDataJSON)),signature:Ye(new Uint8Array(s.signature)),userHandle:s.userHandle?Ye(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Bs(r){return r==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(r)}function sr(){var r,e;return!!(ge()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((r=navigator==null?void 0:navigator.credentials)===null||r===void 0?void 0:r.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Ds(r){try{const e=await navigator.credentials.create(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ir("Browser returned unexpected credential type",e)}:{data:null,error:new ir("Empty credential response",e)}}catch(e){return{data:null,error:To({error:e,options:r})}}}async function Ns(r){try{const e=await navigator.credentials.get(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ir("Browser returned unexpected credential type",e)}:{data:null,error:new ir("Empty credential response",e)}}catch(e){return{data:null,error:Co({error:e,options:r})}}}const Io={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Po={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function nr(...r){const e=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),t=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),i={};for(const s of r)if(s)for(const n in s){const a=s[n];if(a!==void 0)if(Array.isArray(a))i[n]=a;else if(t(a))i[n]=a;else if(e(a)){const o=i[n];e(o)?i[n]=nr(o,a):i[n]=nr(a)}else i[n]=a}return i}function Ro(r,e){return nr(Io,r,e||{})}function Lo(r,e){return nr(Po,r,e||{})}class Oo{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:i,signal:s},n){var a;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!o)return{data:null,error:l};const c=s??Nr.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:d}=o.webauthn.credential_options.publicKey;if(!d.name){const u=i;if(u)d.name=`${d.id}:${u}`;else{const p=(await this.client.getUser()).data.user,g=((a=p==null?void 0:p.user_metadata)===null||a===void 0?void 0:a.name)||(p==null?void 0:p.email)||(p==null?void 0:p.id)||"User";d.name=`${d.id}:${g}`}}d.displayName||(d.displayName=d.name)}switch(o.webauthn.type){case"create":{const d=Ro(o.webauthn.credential_options.publicKey,n==null?void 0:n.create),{data:u,error:h}=await Ds({publicKey:d,signal:c});return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}case"request":{const d=Lo(o.webauthn.credential_options.publicKey,n==null?void 0:n.request),{data:u,error:h}=await Ns(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:d,signal:c}));return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}}}catch(o){return E(o)?{data:null,error:o}:{data:null,error:new Ce("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:t,webauthn:i}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},n){if(!t)return{data:null,error:new It("rpId is required for WebAuthn authentication")};try{if(!sr())return{data:null,error:new Ce("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:i},signal:s},{request:n});if(!a)return{data:null,error:o};const{webauthn:l}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:i,credential_response:l.credential_response}})}catch(a){return E(a)?{data:null,error:a}:{data:null,error:new Ce("Unexpected error in authenticate",a)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},n){if(!t)return{data:null,error:new It("rpId is required for WebAuthn registration")};try{if(!sr())return{data:null,error:new Ce("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(d=>{var u;return(u=d.data)===null||u===void 0?void 0:u.all.find(h=>h.factor_type==="webauthn"&&h.friendly_name===e&&h.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:i},signal:s},{create:n});return l?this._verify({factorId:a.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(a){return E(a)?{data:null,error:a}:{data:null,error:new Ce("Unexpected error in register",a)}}}}xo();const Uo={url:Da,storageKey:Na,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:ja,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},tt={};class Pt{get jwks(){var e,t;return(t=(e=tt[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){tt[this.storageKey]=Object.assign(Object.assign({},tt[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=tt[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){tt[this.storageKey]=Object.assign(Object.assign({},tt[this.storageKey]),{cachedAt:e})}constructor(e){var t,i,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const n=Object.assign(Object.assign({},Uo),e);if(this.storageKey=n.storageKey,this.instanceID=(t=Pt.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,Pt.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!n.debug,typeof n.debug=="function"&&(this.logger=n.debug),this.instanceID>0&&ge()){const a=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(a),this.logDebugMessages&&console.trace(a)}if(this.persistSession=n.persistSession,this.autoRefreshToken=n.autoRefreshToken,this.experimental=(i=n.experimental)!==null&&i!==void 0?i:{},this.admin=new ko({url:n.url,headers:n.headers,fetch:n.fetch,experimental:this.experimental}),this.url=n.url,this.headers=n.headers,this.fetch=Os(n.fetch),this.detectSessionInUrl=n.detectSessionInUrl,this.flowType=n.flowType,this.hasCustomAuthorizationHeader=n.hasCustomAuthorizationHeader,this.throwOnError=n.throwOnError,this.lockAcquireTimeout=n.lockAcquireTimeout,n.lock!=null&&(this.lock=n.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Oo(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(n.storage?this.storage=n.storage:Ls()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Yi(this.memoryStorage)),n.userStorage&&(this.userStorage=n.userStorage)):(this.memoryStorage={},this.storage=Yi(this.memoryStorage)),ge()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(a){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",a)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async a=>{this._debug("received broadcast notification from other tab or client",a),(a.data.event==="TOKEN_REFRESHED"||a.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(a.data.event,a.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}n.skipAutoInitialize||this.initialize().catch(a=>{this._debug("#initialize()","error",a)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Is}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())(),await this.initializePromise)}async _initialize(){var e;try{let t={},i="none";if(ge()&&(t=eo(window.location.href),this._isImplicitGrantCallback(t)?i="implicit":await this._isPKCECallback(t)&&(i="pkce")),ge()&&this.detectSessionInUrl&&i!=="none"){const{data:s,error:n}=await this._getSessionFromURL(t,i);if(n){if(this._debug("#_initialize()","error detecting session from URL",n),Fa(n)){const l=(e=n.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:n}}return{error:n}}const{session:a,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",a,"redirect type",o),await this._saveSession(a),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",a):await this._notifyAllSubscribers("SIGNED_IN",a)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return E(t)?this._returnResult({error:t}):this._returnResult({error:new Ce("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,i,s;try{const n=await P(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}},xform:we}),{data:a,error:o}=n;if(o||!a)return this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(E(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signUp(e){var t,i,s;try{let n;if("email"in e){const{email:d,password:u,options:h}=e;let p=null,g=null;this.flowType==="pkce"&&([p,g]=await Ge(this.storage,this.storageKey)),n=await P(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:h==null?void 0:h.emailRedirectTo,body:{email:d,password:u,data:(t=h==null?void 0:h.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:p,code_challenge_method:g},xform:we})}else if("phone"in e){const{phone:d,password:u,options:h}=e;n=await P(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:d,password:u,data:(i=h==null?void 0:h.data)!==null&&i!==void 0?i:{},channel:(s=h==null?void 0:h.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:we})}else throw new Kt("You must provide either an email or phone number and a password");const{data:a,error:o}=n;if(o||!a)return await ae(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithPassword(e){try{let t;if("email"in e){const{email:n,password:a,options:o}=e;t=await P(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Gi})}else if("phone"in e){const{phone:n,password:a,options:o}=e;t=await P(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Gi})}else throw new Kt("You must provide either an email or phone number and a password");const{data:i,error:s}=t;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!i||!i.session||!i.user){const n=new et;return this._returnResult({data:{user:null,session:null},error:n})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:s})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,i,s,n;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(n=e.options)===null||n===void 0?void 0:n.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e)):this._exchangeCodeForSession(e)}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,i,s,n,a,o,l,c,d,u,h;let p,g;if("message"in e)p=e.message,g=e.signature;else{const{chain:f,wallet:v,statement:y,options:w}=e;let S;if(ge())if(typeof v=="object")S=v;else{const j=window;if("ethereum"in j&&typeof j.ethereum=="object"&&"request"in j.ethereum&&typeof j.ethereum.request=="function")S=j.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(w!=null&&w.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");S=v}const $=new URL((t=w==null?void 0:w.url)!==null&&t!==void 0?t:window.location.href),A=await S.request({method:"eth_requestAccounts"}).then(j=>j).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!A||A.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const T=Us(A[0]);let R=(i=w==null?void 0:w.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!R){const j=await S.request({method:"eth_chainId"});R=_o(j)}const K={domain:$.host,address:T,statement:y,uri:$.href,version:"1",chainId:R,nonce:(s=w==null?void 0:w.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(a=(n=w==null?void 0:w.signInWithEthereum)===null||n===void 0?void 0:n.issuedAt)!==null&&a!==void 0?a:new Date,expirationTime:(o=w==null?void 0:w.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=w==null?void 0:w.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=w==null?void 0:w.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=w==null?void 0:w.signInWithEthereum)===null||d===void 0?void 0:d.resources};p=Eo(K),g=await S.request({method:"personal_sign",params:[Ao(p),T]})}try{const{data:f,error:v}=await P(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:p,signature:g},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:we});if(v)throw v;if(!f||!f.session||!f.user){const y=new et;return this._returnResult({data:{user:null,session:null},error:y})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:v})}catch(f){if(E(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async signInWithSolana(e){var t,i,s,n,a,o,l,c,d,u,h,p;let g,f;if("message"in e)g=e.message,f=e.signature;else{const{chain:v,wallet:y,statement:w,options:S}=e;let $;if(ge())if(typeof y=="object")$=y;else{const T=window;if("solana"in T&&typeof T.solana=="object"&&("signIn"in T.solana&&typeof T.solana.signIn=="function"||"signMessage"in T.solana&&typeof T.solana.signMessage=="function"))$=T.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(S!=null&&S.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");$=y}const A=new URL((t=S==null?void 0:S.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in $&&$.signIn){const T=await $.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},S==null?void 0:S.signInWithSolana),{version:"1",domain:A.host,uri:A.href}),w?{statement:w}:null));let R;if(Array.isArray(T)&&T[0]&&typeof T[0]=="object")R=T[0];else if(T&&typeof T=="object"&&"signedMessage"in T&&"signature"in T)R=T;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in R&&"signature"in R&&(typeof R.signedMessage=="string"||R.signedMessage instanceof Uint8Array)&&R.signature instanceof Uint8Array)g=typeof R.signedMessage=="string"?R.signedMessage:new TextDecoder().decode(R.signedMessage),f=R.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in $)||typeof $.signMessage!="function"||!("publicKey"in $)||typeof $!="object"||!$.publicKey||!("toBase58"in $.publicKey)||typeof $.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");g=[`${A.host} wants you to sign in with your Solana account:`,$.publicKey.toBase58(),...w?["",w,""]:[""],"Version: 1",`URI: ${A.href}`,`Issued At: ${(s=(i=S==null?void 0:S.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((n=S==null?void 0:S.signInWithSolana)===null||n===void 0)&&n.notBefore?[`Not Before: ${S.signInWithSolana.notBefore}`]:[],...!((a=S==null?void 0:S.signInWithSolana)===null||a===void 0)&&a.expirationTime?[`Expiration Time: ${S.signInWithSolana.expirationTime}`]:[],...!((o=S==null?void 0:S.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${S.signInWithSolana.chainId}`]:[],...!((l=S==null?void 0:S.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${S.signInWithSolana.nonce}`]:[],...!((c=S==null?void 0:S.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${S.signInWithSolana.requestId}`]:[],...!((u=(d=S==null?void 0:S.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||u===void 0)&&u.length?["Resources",...S.signInWithSolana.resources.map(R=>`- ${R}`)]:[]].join(`
`);const T=await $.signMessage(new TextEncoder().encode(g),"utf8");if(!T||!(T instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");f=T}}try{const{data:v,error:y}=await P(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:g,signature:Ye(f)},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:we});if(y)throw y;if(!v||!v.session||!v.user){const w=new et;return this._returnResult({data:{user:null,session:null},error:w})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:y})}catch(v){if(E(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async _exchangeCodeForSession(e){const t=await Ae(this.storage,`${this.storageKey}-code-verifier`),[i,s]=(t??"").split("/");try{if(!i&&this.flowType==="pkce")throw new Ka;const{data:n,error:a}=await P(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:i},xform:we});if(await ae(this.storage,`${this.storageKey}-code-verifier`),a)throw a;if(!n||!n.session||!n.user){const o=new et;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(s==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",n.session)),this._returnResult({data:Object.assign(Object.assign({},n),{redirectType:s??null}),error:a})}catch(n){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(n))return this._returnResult({data:{user:null,session:null,redirectType:null},error:n});throw n}}async signInWithIdToken(e){try{const{options:t,provider:i,token:s,access_token:n,nonce:a}=e,o=await P(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:s,access_token:n,nonce:a,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:we}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new et;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,i,s,n,a;try{if("email"in e){const{email:o,options:l}=e;let c=null,d=null;this.flowType==="pkce"&&([c,d]=await Ge(this.storage,this.storageKey));const{error:u}=await P(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:d},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:d}=await P(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=l==null?void 0:l.data)!==null&&s!==void 0?s:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(a=l==null?void 0:l.channel)!==null&&a!==void 0?a:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:d})}throw new Kt("You must provide either an email or phone number.")}catch(o){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var t,i;try{let s,n;"options"in e&&(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo,n=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:a,error:o}=await P(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:s,xform:we});if(o)throw o;if(!a)throw new Error("An error occurred on token verification.");const l=a.session,c=a.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(s){if(E(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(e){var t,i,s,n,a;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await Ge(this.storage,this.storageKey));const c=await P(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&i!==void 0?i:void 0}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:yo});return!((n=c.data)===null||n===void 0)&&n.url&&ge()&&!(!((a=e.options)===null||a===void 0)&&a.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)throw i;if(!t)throw new pe;const{error:s}=await P(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(e){if(E(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:i,type:s,options:n}=e;let a=null,o=null;this.flowType==="pkce"&&([a,o]=await Ge(this.storage,this.storageKey));const{error:l}=await P(this.fetch,"POST",t,{headers:this.headers,body:{email:i,type:s,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken},code_challenge:a,code_challenge_method:o},redirectTo:n==null?void 0:n.emailRedirectTo});return l&&await ae(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:l})}else if("phone"in e){const{phone:i,type:s,options:n}=e,{data:a,error:o}=await P(this.fetch,"POST",t,{headers:this.headers,body:{phone:i,type:s,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a==null?void 0:a.message_id},error:o})}throw new Kt("You must provide either an email or phone number and a type")}catch(t){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await i,await t()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=t();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await Ae(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<vr:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i){if(this.userStorage){const a=await Ae(this.userStorage,this.storageKey+"-user");a!=null&&a.user?e.user=a.user:e.user=yr()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const a={value:this.suppressGetSessionWarning};e.user=mo(e.user,a),a.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:s,error:n}=await this._callRefreshToken(e.refresh_token);if(n){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const o=await Ae(this.storage,this.storageKey);if(o&&o.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:n})}return this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t;return this.lock!=null?t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):t=await this._getUser(),t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await P(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:qe}):await this._useSession(async t=>{var i,s,n;const{data:a,error:o}=t;if(o)throw o;return!(!((i=a.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new pe}:await P(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(n=(s=a.session)===null||s===void 0?void 0:s.access_token)!==null&&n!==void 0?n:void 0,xform:qe})})}catch(t){if(E(t))return Ft(t)&&(await this._removeSession(),await ae(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t)):await this._updateUser(e,t)}async _updateUser(e,t={}){try{return await this._useSession(async i=>{const{data:s,error:n}=i;if(n)throw n;if(!s.session)throw new pe;const a=s.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await Ge(this.storage,this.storageKey));const{data:c,error:d}=await P(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:a.access_token,xform:qe});if(d)throw d;return a.user=c.user,await this._saveSession(a),await this._notifyAllSubscribers("USER_UPDATED",a),this._returnResult({data:{user:a.user},error:null})})}catch(i){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(i))return this._returnResult({data:{user:null},error:i});throw i}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new pe;const t=Date.now()/1e3;let i=t,s=!0,n=null;const{payload:a}=Vt(e.access_token);if(a.exp&&(i=a.exp,s=i<=t),s){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};n=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});n={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:i-t,expires_at:i},await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)}return this._returnResult({data:{user:n.user,session:n},error:null})}catch(t){if(E(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async t=>{var i;if(!e){const{data:a,error:o}=t;if(o)throw o;e=(i=a.session)!==null&&i!==void 0?i:void 0}if(!(e!=null&&e.refresh_token))throw new pe;const{data:s,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{user:null,session:null},error:n}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){var i;try{if(!ge())throw new Wt("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Wt(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new ji("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Wt("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new ji("No code detected.");const{data:S,error:$}=await this._exchangeCodeForSession(e.code);if($)throw $;const A=new URL(window.location.href);return A.searchParams.delete("code"),window.history.replaceState(window.history.state,"",A.toString()),{data:{session:S.session,redirectType:(i=S.redirectType)!==null&&i!==void 0?i:null},error:null}}const{provider_token:s,provider_refresh_token:n,access_token:a,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=e;if(!a||!l||!o||!d)throw new Wt("No session defined in URL");const u=Math.round(Date.now()/1e3),h=parseInt(l);let p=u+h;c&&(p=parseInt(c));const g=p-u;g*1e3<=De&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${h}s`);const f=p-h;u-f>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",f,p,u):u-f<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",f,p,u);const{data:v,error:y}=await this._getUser(a);if(y)throw y;const w={provider_token:s,provider_refresh_token:n,access_token:a,expires_in:h,expires_at:p,refresh_token:o,token_type:d,user:v.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:w,redirectType:e.type},error:null})}catch(s){if(E(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){const t=await Ae(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var i;const{data:s,error:n}=t;if(n&&!Ft(n))return this._returnResult({error:n});const a=(i=s.session)===null||i===void 0?void 0:i.access_token;if(a){const{error:o}=await this.admin.signOut(a,e);if(o&&!(Ha(o)&&(o.status===404||o.status===401||o.status===403)||Ft(o)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await ae(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=Za(),i={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,i),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)}):await this._emitInitialSession(t)))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async t=>{var i,s;try{const{data:{session:n},error:a}=t;if(a)throw a;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",n)),this._debug("INITIAL_SESSION","callback id",e,"session",n)}catch(n){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",n),Ft(n)?console.warn(n):console.error(n)}})}async resetPasswordForEmail(e,t={}){let i=null,s=null;this.flowType==="pkce"&&([i,s]=await Ge(this.storage,this.storageKey,!0));try{return await P(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:s,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(n){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(n))return this._returnResult({data:null,error:n});throw n}}async getUserIdentities(){var e;try{const{data:t,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:i,error:s}=await this._useSession(async n=>{var a,o,l,c,d;const{data:u,error:h}=n;if(h)throw h;const p=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(a=e.options)===null||a===void 0?void 0:a.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await P(this.fetch,"GET",p,{headers:this.headers,jwt:(d=(c=u.session)===null||c===void 0?void 0:c.access_token)!==null&&d!==void 0?d:void 0})});if(s)throw s;return ge()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(i==null?void 0:i.url),this._returnResult({data:{provider:e.provider,url:i==null?void 0:i.url},error:null})}catch(i){if(E(i))return this._returnResult({data:{provider:e.provider,url:null},error:i});throw i}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var i;try{const{error:s,data:{session:n}}=t;if(s)throw s;const{options:a,provider:o,token:l,access_token:c,nonce:d}=e,u=await P(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=n==null?void 0:n.access_token)!==null&&i!==void 0?i:void 0,body:{provider:o,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:we}),{data:h,error:p}=u;return p?this._returnResult({data:{user:null,session:null},error:p}):!h||!h.session||!h.user?this._returnResult({data:{user:null,session:null},error:new et}):(h.session&&(await this._saveSession(h.session),await this._notifyAllSubscribers("USER_UPDATED",h.session)),this._returnResult({data:h,error:p}))}catch(s){if(await ae(this.storage,`${this.storageKey}-code-verifier`),E(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var i,s;const{data:n,error:a}=t;if(a)throw a;return await P(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(i=n.session)===null||i===void 0?void 0:i.access_token)!==null&&s!==void 0?s:void 0})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t="#_refreshAccessToken()";this._debug(t,"begin");try{const i=Date.now();return await io(async s=>(s>0&&await ro(200*Math.pow(2,s-1)),this._debug(t,"refreshing attempt",s),await P(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:we})),(s,n)=>{const a=200*Math.pow(2,s);return n&&zi(n)&&Date.now()+a-i<De})}catch(i){if(this._debug(t,"error",i),E(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const i=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",i),ge()&&!t.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i},error:null}}async _recoverAndRefresh(){var e,t;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const s=await Ae(this.storage,this.storageKey);if(s&&this.userStorage){let a=await Ae(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!a&&(a={user:s.user},await at(this.userStorage,this.storageKey+"-user",a)),s.user=(e=a==null?void 0:a.user)!==null&&e!==void 0?e:yr()}else if(s&&!s.user&&!s.user){const a=await Ae(this.storage,this.storageKey+"-user");a&&(a!=null&&a.user)?(s.user=a.user,await ae(this.storage,this.storageKey+"-user"),await at(this.storage,this.storageKey,s)):s.user=yr()}if(this._debug(i,"session from storage",s),!this._isValidSession(s)){this._debug(i,"session is not valid"),s!==null&&await this._removeSession();return}const n=((t=s.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<vr;if(this._debug(i,`session has${n?"":" not"} expired with margin of ${vr}s`),n){if(this.autoRefreshToken&&s.refresh_token){const{error:a}=await this._callRefreshToken(s.refresh_token);a&&(Wa(a)?this._debug(i,"refresh discarded by commit guard",a):this._debug(i,"refresh failed",a))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:a,error:o}=await this._getUser(s.access_token);!o&&(a!=null&&a.user)?(s.user=a.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(a){console.error("Error getting user data:",a),this._debug(i,"error getting user data, skipping SIGNED_IN notification",a)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(i,"error",s),console.error(s);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var t,i;if(!e)throw new pe;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const s="#_callRefreshToken()";this._debug(s,"begin");try{this.refreshingDeferred=new pr;const n=await Ae(this.storage,this.storageKey),{data:a,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!a.session)throw new pe;const l=await Ae(this.storage,this.storageKey);if(n!==null&&(l===null||l.refresh_token!==n.refresh_token)){this._debug(s,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const h={data:null,error:new Mi};return this.refreshingDeferred.resolve(h),h}const d=this._sessionRemovalEpoch;if(await this._saveSession(a.session),this._sessionRemovalEpoch!==d){this._debug(s,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await ae(this.storage,this.storageKey),this.userStorage&&await ae(this.userStorage,this.storageKey+"-user");const h={data:null,error:new Mi};return this.refreshingDeferred.resolve(h),h}await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const u={data:a.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(u),u}catch(n){if(this._debug(s,"error",n),E(n)){const a={data:null,error:n};if(!zi(n)){const o=await Ae(this.storage,this.storageKey);!!(o!=null&&o.expires_at&&o.expires_at*1e3>Date.now())?this._debug(s,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:a,expiresAt:Date.now()+Ba},(t=this.refreshingDeferred)===null||t===void 0||t.resolve(a),a}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(n),n}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,t,i=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",t,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:t});const n=[],a=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){n.push(l)}});if(await Promise.all(a),n.length>0){for(let o=0;o<n.length;o+=1)console.error(n[o]);throw n[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await ae(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),i=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&t.user&&await at(this.userStorage,this.storageKey+"-user",{user:t.user});const s=Object.assign({},t);delete s.user;const n=Wi(s);await at(this.storage,this.storageKey,n)}else{const s=Wi(t);await at(this.storage,this.storageKey,s)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await ae(this.storage,this.storageKey),await ae(this.storage,this.storageKey+"-code-verifier"),await ae(this.storage,this.storageKey+"-user"),this.userStorage&&await ae(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&ge()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),De);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((i.expires_at*1e3-e)/De);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${De}ms, refresh threshold is ${yt} ticks`),s<=yt&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof So)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((i.expires_at*1e3-e)/De);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${De}ms, refresh threshold is ${yt} ticks`),s<=yt&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!ge()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;if(this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(t,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,i){const s=[`provider=${encodeURIComponent(t)}`];if(i!=null&&i.redirectTo&&s.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),i!=null&&i.scopes&&s.push(`scopes=${encodeURIComponent(i.scopes)}`),this.flowType==="pkce"){const[n,a]=await Ge(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(n)}`,code_challenge_method:`${encodeURIComponent(a)}`});s.push(o.toString())}if(i!=null&&i.queryParams){const n=new URLSearchParams(i.queryParams);s.push(n.toString())}return i!=null&&i.skipBrowserRedirect&&s.push(`skip_http_redirect=${i.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var i;const{data:s,error:n}=t;return n?this._returnResult({data:null,error:n}):await P(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=s==null?void 0:s.session)===null||i===void 0?void 0:i.access_token})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var i,s;const{data:n,error:a}=t;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await P(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(i=n==null?void 0:n.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){const t=async()=>{try{return await this._useSession(async i=>{var s;const{data:n,error:a}=i;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Zi(e.webauthn.credential_response):es(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await P(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,t):t()}async _challenge(e){const t=async()=>{try{return await this._useSession(async i=>{var s;const{data:n,error:a}=i;if(a)return this._returnResult({data:null,error:a});const o=await P(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Qi(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Xi(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,t):t()}async _challengeAndVerify(e){const{data:t,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:i}=await this.getUser();if(i)return{data:null,error:i};const s={all:[],phone:[],totp:[],webauthn:[]};for(const n of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])s.all.push(n),n.status==="verified"&&s[n.factor_type].push(n);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(e){var t,i,s,n;if(e)try{const{payload:p}=Vt(e);let g=null;p.aal&&(g=p.aal);let f=g;const{data:{user:v},error:y}=await this.getUser(e);if(y)return this._returnResult({data:null,error:y});((i=(t=v==null?void 0:v.factors)===null||t===void 0?void 0:t.filter($=>$.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(f="aal2");const S=p.amr||[];return{data:{currentLevel:g,nextLevel:f,currentAuthenticationMethods:S},error:null}}catch(p){if(E(p))return this._returnResult({data:null,error:p});throw p}const{data:{session:a},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!a)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Vt(a.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((n=(s=a.user.factors)===null||s===void 0?void 0:s.filter(p=>p.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(d="aal2");const h=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:h},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:i},error:s}=t;return s?this._returnResult({data:null,error:s}):i?await P(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new pe})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:s},error:n}=i;if(n)return this._returnResult({data:null,error:n});if(!s)return this._returnResult({data:null,error:new pe});const a=await P(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&ge()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:s},error:n}=i;if(n)return this._returnResult({data:null,error:n});if(!s)return this._returnResult({data:null,error:new pe});const a=await P(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&ge()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;return i?this._returnResult({data:null,error:i}):t?await P(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new pe})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:i},error:s}=t;return s?this._returnResult({data:null,error:s}):i?(await P(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new pe})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let i=t.keys.find(o=>o.kid===e);if(i)return i;const s=Date.now();if(i=this.jwks.keys.find(o=>o.kid===e),i&&this.jwks_cached_at+Ma>s)return i;const{data:n,error:a}=await P(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!n.keys||n.keys.length===0||(this.jwks=n,this.jwks_cached_at=s,i=n.keys.find(o=>o.kid===e),!i)?null:i}async getClaims(e,t={}){try{let i=e;if(!i){const{data:p,error:g}=await this.getSession();if(g||!p.session)return this._returnResult({data:null,error:g});i=p.session.access_token}const{header:s,payload:n,signature:a,raw:{header:o,payload:l}}=Vt(i);if(!(t!=null&&t.allowExpired))try{uo(n.exp)}catch(p){throw new tr(p instanceof Error?p.message:"JWT validation failed")}const c=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:p}=await this.getUser(i);if(p)throw p;return{data:{claims:n,header:s,signature:a},error:null}}const d=ho(s.alg),u=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,u,a,Qa(`${o}.${l}`)))throw new tr("Invalid JWT signature");return{data:{claims:n,header:s,signature:a},error:null}}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async signInWithPasskey(e){var t,i,s;Ee(this.experimental);try{if(!sr())return this._returnResult({data:null,error:new Ce("Browser does not support WebAuthn",null)});const{data:n,error:a}=await this._startPasskeyAuthentication({options:{captchaToken:(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.captchaToken}});if(a||!n)return this._returnResult({data:null,error:a});const o=Xi(n.options),l=(s=(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.signal)!==null&&s!==void 0?s:Nr.createNewAbortSignal(),{data:c,error:d}=await Ns({publicKey:o,signal:l});if(d||!c)return this._returnResult({data:null,error:d??new Ce("WebAuthn ceremony failed",null)});const u=es(c);return this._verifyPasskeyAuthentication({challengeId:n.challenge_id,credential:u})}catch(n){if(E(n))return this._returnResult({data:null,error:n});throw n}}async registerPasskey(e){var t,i;Ee(this.experimental);try{if(!sr())return this._returnResult({data:null,error:new Ce("Browser does not support WebAuthn",null)});const{data:s,error:n}=await this._startPasskeyRegistration();if(n||!s)return this._returnResult({data:null,error:n});const a=Qi(s.options),o=(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.signal)!==null&&i!==void 0?i:Nr.createNewAbortSignal(),{data:l,error:c}=await Ds({publicKey:a,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new Ce("WebAuthn ceremony failed",null)});const d=Zi(l);return this._verifyPasskeyRegistration({challengeId:s.challenge_id,credential:d})}catch(s){if(E(s))return this._returnResult({data:null,error:s});throw s}}async _startPasskeyRegistration(){Ee(this.experimental);try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!t)return this._returnResult({data:null,error:new pe});const{data:s,error:n}=await P(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:s,error:null})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){Ee(this.experimental);try{return await this._useSession(async t=>{const{data:{session:i},error:s}=t;if(s)return this._returnResult({data:null,error:s});if(!i)return this._returnResult({data:null,error:new pe});const{data:n,error:a}=await P(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:i.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _startPasskeyAuthentication(e){var t;Ee(this.experimental);try{const{data:i,error:s}=await P(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.captchaToken}}});return s?this._returnResult({data:null,error:s}):this._returnResult({data:i,error:null})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async _verifyPasskeyAuthentication(e){Ee(this.experimental);try{const{data:t,error:i}=await P(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:we});return i?this._returnResult({data:null,error:i}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers("SIGNED_IN",t.session)),this._returnResult({data:t,error:null}))}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _listPasskeys(){Ee(this.experimental);try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!t)return this._returnResult({data:null,error:new pe});const{data:s,error:n}=await P(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:a=>({data:a,error:null})});return n?this._returnResult({data:null,error:n}):this._returnResult({data:s,error:null})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){Ee(this.experimental);try{return await this._useSession(async t=>{const{data:{session:i},error:s}=t;if(s)return this._returnResult({data:null,error:s});if(!i)return this._returnResult({data:null,error:new pe});const{data:n,error:a}=await P(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _deletePasskey(e){Ee(this.experimental);try{return await this._useSession(async t=>{const{data:{session:i},error:s}=t;if(s)return this._returnResult({data:null,error:s});if(!i)return this._returnResult({data:null,error:new pe});const{error:n}=await P(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,noResolveJson:!0});return n?this._returnResult({data:null,error:n}):this._returnResult({data:null,error:null})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}}Pt.nextInstanceID={};const Bo=Pt,Do="2.109.0";let bt="",ar;if(typeof Deno<"u"){var wr;bt="deno",ar=(wr=Deno.version)===null||wr===void 0?void 0:wr.deno}else if(typeof document<"u")bt="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")bt="react-native";else{var kr;bt="node",ar=typeof process<"u"?(kr=process.version)===null||kr===void 0?void 0:kr.replace(/^v/,""):void 0}const js=[`runtime=${bt}`];ar&&js.push(`runtime-version=${ar}`);const No={"X-Client-Info":`supabase-js/${Do}; ${js.join("; ")}`},jo={headers:No},zo={schema:"public"},Mo={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},qo={},Ho={enabled:!1,respectSamplingDecision:!0};function Fo(r,e,t,i){function s(n){return n instanceof t?n:new t(function(a){a(n)})}return new(t||(t=Promise))(function(n,a){function o(d){try{c(i.next(d))}catch(u){a(u)}}function l(d){try{c(i.throw(d))}catch(u){a(u)}}function c(d){d.done?n(d.value):s(d.value).then(o,l)}c((i=i.apply(r,[])).next())})}let Sr=null;const Ko="@opentelemetry/api";function Wo(){return Sr===null&&(Sr=import(Ko).catch(()=>null)),Sr}function Vo(){return Fo(this,void 0,void 0,function*(){try{const r=yield Wo();if(!r||!r.propagation||!r.context)return null;const e={};r.propagation.inject(r.context.active(),e);const t=e.traceparent;return t?{traceparent:t,tracestate:e.tracestate,baggage:e.baggage}:null}catch{return null}})}function Go(r){if(!r||typeof r!="string")return null;const e=r.split("-");if(e.length!==4)return null;const[t,i,s,n]=e;if(t.length!==2||i.length!==32||s.length!==16||n.length!==2)return null;const a=/^[0-9a-f]+$/i;return!a.test(t)||!a.test(i)||!a.test(s)||!a.test(n)||i==="00000000000000000000000000000000"||s==="0000000000000000"?null:{version:t,traceId:i,parentId:s,traceFlags:n,isSampled:(parseInt(n,16)&1)===1}}function Jo(r,e){if(!r||!e||e.length===0)return!1;let t;if(r instanceof URL)t=r;else try{t=new URL(r)}catch{return!1}for(const i of e)try{if(typeof i=="string"){if(Yo(t.hostname,i))return!0}else if(i instanceof RegExp){if(i.test(t.hostname))return!0}else if(typeof i=="function"&&i(t))return!0}catch{continue}return!1}function Yo(r,e){if(e===r)return!0;if(e.startsWith("*.")){const t=e.slice(2);if(r.endsWith(t)&&(r===t||r.endsWith("."+t)))return!0}return!1}function Qo(r){const e=[];try{const t=new URL(r);e.push(t.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function Rt(r){"@babel/helpers - typeof";return Rt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Rt(r)}function Xo(r,e){if(Rt(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var i=t.call(r,e);if(Rt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Zo(r){var e=Xo(r,"string");return Rt(e)=="symbol"?e:e+""}function el(r,e,t){return(e=Zo(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function ts(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(r,s).enumerable})),t.push.apply(t,i)}return t}function se(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ts(Object(t),!0).forEach(function(i){el(r,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ts(Object(t)).forEach(function(i){Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(t,i))})}return r}const tl=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),rl=()=>Headers,il=(r,e,t,i,s)=>{const n=tl(i),a=rl(),o=(s==null?void 0:s.enabled)===!0,l=(s==null?void 0:s.respectSamplingDecision)!==!1,c=o?Qo(e):null;return async(d,u)=>{var h;const p=(h=await t())!==null&&h!==void 0?h:r;let g=new a(u==null?void 0:u.headers);if(g.has("apikey")||g.set("apikey",r),g.has("Authorization")||g.set("Authorization",`Bearer ${p}`),c){const f=await sl(d,c,l);f&&(f.traceparent&&!g.has("traceparent")&&g.set("traceparent",f.traceparent),f.tracestate&&!g.has("tracestate")&&g.set("tracestate",f.tracestate),f.baggage&&!g.has("baggage")&&g.set("baggage",f.baggage))}return n(d,se(se({},u),{},{headers:g}))}};async function sl(r,e,t){if(!Jo(typeof r=="string"||r instanceof URL?r:r.url,e))return null;const i=await Vo();if(!i||!i.traceparent)return null;if(t){const s=Go(i.traceparent);if(s&&!s.isSampled)return null}return i}function rs(r){return typeof r=="boolean"?{enabled:r}:r}function nl(r){return r.endsWith("/")?r:r+"/"}function al(r,e){var t,i,s,n,a,o;const{db:l,auth:c,realtime:d,global:u}=r,{db:h,auth:p,realtime:g,global:f}=e,v=rs(r.tracePropagation),y=rs(e.tracePropagation),w={db:se(se({},h),l),auth:se(se({},p),c),realtime:se(se({},g),d),storage:{},global:se(se(se({},f),u),{},{headers:se(se({},(t=f==null?void 0:f.headers)!==null&&t!==void 0?t:{}),(i=u==null?void 0:u.headers)!==null&&i!==void 0?i:{})}),tracePropagation:{enabled:(s=(n=v==null?void 0:v.enabled)!==null&&n!==void 0?n:y==null?void 0:y.enabled)!==null&&s!==void 0?s:!1,respectSamplingDecision:(a=(o=v==null?void 0:v.respectSamplingDecision)!==null&&o!==void 0?o:y==null?void 0:y.respectSamplingDecision)!==null&&a!==void 0?a:!0},accessToken:async()=>""};return r.accessToken?w.accessToken=r.accessToken:delete w.accessToken,w}function ol(r){const e=r==null?void 0:r.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(nl(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var ll=class extends Bo{constructor(r){super(r)}},cl=class{constructor(r,e,t){var i,s;this.supabaseUrl=r,this.supabaseKey=e;const n=ol(r);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",n),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",n),this.storageUrl=new URL("storage/v1",n),this.functionsUrl=new URL("functions/v1",n);const a=`sb-${n.hostname.split(".")[0]}-auth-token`,o={db:zo,realtime:qo,auth:se(se({},Mo),{},{storageKey:a}),global:jo,tracePropagation:Ho},l=al(t??{},o);if(this.settings=l,this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(s=l.global.headers)!==null&&s!==void 0?s:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=il(e,r,this._getAccessToken.bind(this),l.global.fetch,l.tracePropagation),this.realtime=this._initRealtimeClient(se({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new vn(new URL("rest/v1",n).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Ua(this.storageUrl.href,this.headers,this.fetch,t==null?void 0:t.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new ln(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(r){return this.rest.from(r)}schema(r){return this.rest.schema(r)}rpc(r,e={},t={head:!1,get:!1,count:void 0}){return this.rest.rpc(r,e,t)}channel(r,e={config:{}}){return this.realtime.channel(r,e)}getChannels(){return this.realtime.getChannels()}removeChannel(r){return this.realtime.removeChannel(r)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var r=this,e,t;if(r.accessToken)return await r.accessToken();const{data:i}=await r.auth.getSession();return(e=(t=i.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:r.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:r,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:s,storageKey:n,flowType:a,lock:o,debug:l,throwOnError:c,experimental:d,lockAcquireTimeout:u,skipAutoInitialize:h},p,g){const f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new ll({url:this.authUrl.href,headers:se(se({},f),p),storageKey:n,autoRefreshToken:r,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:s,flowType:a,lock:o,debug:l,throwOnError:c,experimental:d,fetch:g,lockAcquireTimeout:u,skipAutoInitialize:h,hasCustomAuthorizationHeader:Object.keys(this.headers).some(v=>v.toLowerCase()==="authorization")})}_initRealtimeClient(r){return new na(this.realtimeUrl.href,se(se({},r),{},{params:se(se({},{apikey:this.supabaseKey}),r==null?void 0:r.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((r,e)=>{this._handleTokenChanged(r,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(r,e,t){(r==="TOKEN_REFRESHED"||r==="SIGNED_IN")&&this.changedAccessToken!==t?(this.changedAccessToken=t,this.realtime.setAuth(t)):r==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const is=(r,e,t)=>new cl(r,e,t);function dl(){if(typeof window<"u")return!1;const r=globalThis.process;if(!r)return!1;const e=r.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=18:!1}dl()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const rt={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_DEFAULT_WHATSAPP_URL:"https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q",VITE_SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk",VITE_SUPABASE_URL:"https://rqemoitjanmxsmcmveso.supabase.co"},ul="https://rqemoitjanmxsmcmveso.supabase.co",hl="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk",pl="https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q",dt=(r,e="")=>{if(typeof window<"u"&&window.__ENV__&&window.__ENV__[r])return window.__ENV__[r];if(r==="VITE_SUPABASE_URL")return"https://rqemoitjanmxsmcmveso.supabase.co";if(r==="VITE_SUPABASE_ANON_KEY")return"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk";if(r==="VITE_DEFAULT_WHATSAPP_URL")return"https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q";if(!(r==="VITE_ADMIN_EMAILS"&&(rt!=null&&rt.VITE_ADMIN_EMAILS)))return typeof import.meta<"u"&&rt&&rt[r]?rt[r]:e},jr=dt("VITE_SUPABASE_URL",ul),zr=dt("VITE_SUPABASE_ANON_KEY",hl),Pe=dt("VITE_DEFAULT_WHATSAPP_URL",pl),G=!!(jr&&zr&&!jr.includes("your-project")&&!zr.includes("your-anon-key")),F=G?is(jr,zr,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}):is("https://placeholder.supabase.co","placeholder-key",{auth:{persistSession:!1}});async function zs(r,e="logos"){if(!r)throw new Error("No image file selected.");if(G)try{const t=(r.name||"image.png").split(".").pop()||"png",i=`${Date.now()}-${Math.random().toString(36).substring(2,9)}.${t}`,s=`${e}/${i}`,{data:n,error:a}=await F.storage.from("tool-images").upload(s,r,{cacheControl:"3600",upsert:!1});if(!a&&n){const{data:o}=F.storage.from("tool-images").getPublicUrl(s);if(o!=null&&o.publicUrl)return o.publicUrl}else a&&console.warn("[Storage] Supabase storage upload notice, using local data URL fallback:",a.message)}catch(t){console.warn("[Storage] Supabase storage exception, using local data URL fallback:",t)}return new Promise((t,i)=>{const s=new FileReader;s.onload=()=>t(s.result),s.onerror=()=>i(new Error("Failed to process image file.")),s.readAsDataURL(r)})}class ml{normalizeTool(e){return e?{id:e.id,slug:e.slug||e.id,name:e.name||"Untitled Tool",image:e.image||"",shortDescription:e.short_description||"",description:e.full_description||e.short_description||"",fullDescription:e.full_description||"",price:e.price||"$19 /month",countryPricing:typeof e.country_pricing=="object"&&e.country_pricing!==null?e.country_pricing:{},category:e.category||"Text / Writing",badge:e.badge||"",badgeType:e.badge_type||"new",features:Array.isArray(e.features)?e.features:[],howToUse:Array.isArray(e.how_to_use)?e.how_to_use:[],videoUrl:e.tutorial_video_url||"",tutorialVideoUrl:e.tutorial_video_url||"",toolUrl:e.tool_url||"#",whatsappUrl:e.whatsapp_url||Pe||"https://chat.whatsapp.com/invite/aitools-store-vip",rating:typeof e.rating=="number"?e.rating:4.8,userCount:e.users_count||"10.5K",themeColor:e.theme_color||"blue",featured:!!e.featured,active:!!e.active,sortOrder:e.sort_order||0,createdAt:e.created_at,updatedAt:e.updated_at}:null}async getTools(){if(!G)return console.warn("[AI Tools Store] Supabase URL or Anon Key not yet configured in .env."),[];try{const{data:e,error:t}=await F.from("tools").select("*").eq("active",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});return t?(console.error("[AI Tools Store] Supabase query error:",t.message),[]):(e||[]).map(i=>this.normalizeTool(i))}catch(e){return console.error("[AI Tools Store] Failed to connect to Supabase:",e),[]}}async getToolById(e){if(!G||!e)return null;try{const t=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);let i=F.from("tools").select("*");t?i=i.or(`id.eq.${e},slug.eq.${e}`):i=i.eq("slug",e);const{data:s,error:n}=await i.maybeSingle();return n?(console.error(`[AI Tools Store] Error fetching tool "${e}":`,n.message),null):s?this.normalizeTool(s):null}catch(t){return console.error(`[AI Tools Store] Exception fetching tool "${e}":`,t),null}}async getRawCategories(){const e="ai_tools_custom_categories_v2",t="ai_tools_deleted_categories_v2",i=new Set(["ai writing","ai-writing","cat-writing","ai image","ai-image","cat-image","ai video","ai-video","cat-video","ai audio","ai-audio","cat-audio","ai coding","ai-coding","cat-coding","ai automation","ai-automation","cat-automation","ai marketing","ai-marketing","cat-marketing","productivity","cat-productivity"]);let s=[];try{s=JSON.parse(localStorage.getItem(t)||"[]")}catch{}let n=[];if(G)try{const{data:o,error:l}=await F.from("categories").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});!l&&Array.isArray(o)&&o.length>0&&(n=o.filter(c=>!i.has((c.name||"").trim().toLowerCase())&&!i.has((c.slug||"").trim().toLowerCase())).map(c=>({id:c.id,name:c.name,slug:c.slug||c.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),icon:c.icon||"✨",color:c.color||"#6366f1",desc:c.description||"",description:c.description||"",image:c.image||"",sortOrder:typeof c.sort_order=="number"?c.sort_order:0})))}catch(o){console.warn("[AI Tools Store] Notice fetching Supabase categories:",o.message)}const a=new Map;if(n.length>0)n.forEach(o=>{const l=o.name.toLowerCase();a.set(l,{...o,count:0})});else try{const l=JSON.parse(localStorage.getItem(e)||"[]").filter(c=>{const d=(c.name||"").trim().toLowerCase(),u=(c.slug||"").trim().toLowerCase(),h=(c.id||"").trim().toLowerCase();return!i.has(d)&&!i.has(u)&&!i.has(h)});localStorage.setItem(e,JSON.stringify(l)),l.forEach(c=>{const d=c.name.toLowerCase();!s.includes(d)&&!s.includes(c.slug)&&a.set(d,{...c,count:0})})}catch{}return Array.from(a.values()).sort((o,l)=>(o.sortOrder||0)-(l.sortOrder||0))}async getCategories(){const e=await this.getTools(),t=await this.getRawCategories(),i=new Map;return t.forEach(s=>{i.set(s.name.toLowerCase(),{...s,count:0})}),e.forEach(s=>{const n=(s.category||"").trim();if(!n)return;const a=n.toLowerCase();let o=null;if(i.has(a))o=i.get(a);else{for(const[l,c]of i.entries())if(l.includes(a)||a.includes(l)){o=c;break}o||(o={id:"cat-"+a.replace(/[^a-z0-9]+/g,"-"),name:n,slug:a.replace(/[^a-z0-9]+/g,"-"),icon:"✨",color:"#6366f1",desc:`Curated AI tools in ${n}.`,description:`Curated AI tools in ${n}.`,image:"",sortOrder:99,count:0},i.set(a,o))}o.count++,!o.image&&s.image&&(o.image=s.image)}),Array.from(i.values()).sort((s,n)=>(s.sortOrder||0)-(n.sortOrder||0))}async adminGetCategories(){const e=await this.adminGetTools().catch(()=>[]),t=await this.getRawCategories(),i=new Map;return t.forEach(s=>{i.set(s.name.toLowerCase(),{...s,count:0})}),e.forEach(s=>{const n=(s.category||"").trim();if(!n)return;const a=n.toLowerCase();let o=null;if(i.has(a))o=i.get(a);else{for(const[l,c]of i.entries())if(l.includes(a)||a.includes(l)){o=c;break}o||(o={id:"cat-"+a.replace(/[^a-z0-9]+/g,"-"),name:n,slug:a.replace(/[^a-z0-9]+/g,"-"),icon:"✨",color:"#6366f1",desc:`Curated AI tools in ${n}.`,description:`Curated AI tools in ${n}.`,image:"",sortOrder:99,count:0},i.set(a,o))}o.count++,!o.image&&s.image&&(o.image=s.image)}),Array.from(i.values()).sort((s,n)=>(s.sortOrder||0)-(n.sortOrder||0))}async adminSaveCategory(e){if(!e||!e.name||!e.name.trim())throw new Error("Category name is required.");const t=e.name.trim(),i=(e.slug||t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")).trim(),s=(e.description||e.desc||"").trim(),n=(e.icon||"✨").trim(),a=(e.image||"").trim(),o=e.color||"#6366f1",l=parseInt(e.sortOrder??e.sort_order,10)||0,c={id:e.id||"cat-"+Date.now().toString(36),name:t,slug:i,description:s,desc:s,icon:n,image:a,color:o,sortOrder:l};if(G)try{const d={name:t,slug:i,description:s,icon:n,image:a,color:o,sort_order:l};e.id&&e.id.length>20&&e.id.includes("-")?await F.from("categories").update(d).eq("id",e.id):await F.from("categories").upsert(d,{onConflict:"slug"})}catch(d){console.warn("[AI Tools Store] Supabase category save notice:",d.message)}try{const d="ai_tools_custom_categories_v2",u="ai_tools_deleted_categories_v2";let h=JSON.parse(localStorage.getItem(d)||"[]");const p=h.findIndex(f=>f.id===c.id||f.slug===c.slug||f.name.toLowerCase()===t.toLowerCase());p>=0?h[p]={...h[p],...c}:h.push(c),localStorage.setItem(d,JSON.stringify(h));let g=JSON.parse(localStorage.getItem(u)||"[]");g=g.filter(f=>f!==t.toLowerCase()&&f!==i),localStorage.setItem(u,JSON.stringify(g))}catch(d){console.warn("[AI Tools Store] localStorage save category error:",d)}return c}async adminDeleteCategory(e,t){const i=(t||"").trim().toLowerCase(),s=(e||"").trim();if(G)try{let n=F.from("categories").delete();s&&s.length>20&&s.includes("-")?n=n.eq("id",s):i&&(n=n.or(`name.ilike.${i},slug.eq.${s}`)),await n}catch(n){console.warn("[AI Tools Store] Supabase category delete notice:",n.message)}try{const n="ai_tools_custom_categories_v2",a="ai_tools_deleted_categories_v2";let o=JSON.parse(localStorage.getItem(n)||"[]");o=o.filter(c=>c.id!==s&&c.name.toLowerCase()!==i&&c.slug!==s),localStorage.setItem(n,JSON.stringify(o));let l=JSON.parse(localStorage.getItem(a)||"[]");i&&!l.includes(i)&&l.push(i),s&&!l.includes(s)&&l.push(s),localStorage.setItem(a,JSON.stringify(l))}catch(n){console.warn("[AI Tools Store] localStorage delete category error:",n)}return!0}async adminGetTools(){if(!G)return[];const{data:e,error:t}=await F.from("tools").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(t)throw t;return(e||[]).map(i=>this.normalizeTool(i))}async adminSaveTool(e){if(!G)throw new Error("Supabase is not configured.");const t={name:e.name.trim(),slug:(e.slug||e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")).trim(),image:e.image||null,short_description:e.shortDescription||null,full_description:e.fullDescription||e.description||null,price:e.price||"$19 /month",country_pricing:e.countryPricing&&typeof e.countryPricing=="object"?e.countryPricing:{},category:e.category||"Text / Writing",badge:e.badge||null,badge_type:e.badgeType||"new",theme_color:e.themeColor||"blue",features:Array.isArray(e.features)?e.features:[],how_to_use:Array.isArray(e.howToUse)?e.howToUse:[],tutorial_video_url:e.tutorialVideoUrl||e.videoUrl||null,tool_url:e.toolUrl||null,whatsapp_url:e.whatsappUrl||null,rating:parseFloat(e.rating)||4.8,users_count:e.userCount||e.users_count||"10.5K",featured:!!e.featured,active:e.active!==!1,sort_order:parseInt(e.sortOrder||e.sort_order,10)||0};if(e.id&&e.id.length>20){const{data:i,error:s}=await F.from("tools").update(t).eq("id",e.id).select().single();if(s)throw s;return this.normalizeTool(i)}else{const{data:i,error:s}=await F.from("tools").insert([t]).select().single();if(s)throw s;return this.normalizeTool(i)}}async adminDeleteTool(e){if(!G)throw new Error("Supabase not configured.");const{error:t}=await F.from("tools").delete().eq("id",e);if(t)throw t;return!0}async adminToggleActive(e,t){if(!G)throw new Error("Supabase not configured.");const{data:i,error:s}=await F.from("tools").update({active:t}).eq("id",e).select().single();if(s)throw s;return this.normalizeTool(i)}normalizeHotDeal(e){return e?{id:e.id,slug:e.slug||e.id,name:e.name||"Untitled Hot Deal",image:e.image||"",shortDescription:e.short_description||"",description:e.full_description||e.short_description||"",fullDescription:e.full_description||"",category:e.category||"Hot Deals",offerLabel:e.offer_label||"BUY 1 GET 1 FREE",buyQuantity:typeof e.buy_quantity=="number"?e.buy_quantity:parseInt(e.buy_quantity,10)||1,freeQuantity:typeof e.free_quantity=="number"?e.free_quantity:parseInt(e.free_quantity,10)||1,duration:e.duration||"1 Month",dealPrice:e.deal_price||e.price||"PKR 1,999 /mo",price:e.deal_price||e.price||"PKR 1,999 /mo",regularPrice:e.regular_price||"PKR 3,999 /mo",countryPricing:typeof e.country_pricing=="object"&&e.country_pricing!==null?e.country_pricing:{},badge:e.badge||"🔥 HOT DEAL",badgeType:e.badge_type||"hot",themeColor:e.theme_color||"orange",stockLeft:e.stock_left||"Limited slots available",features:Array.isArray(e.features)?e.features:["Instant WhatsApp Concierge Activation","Official private seat or workspace invite","24/7 dedicated replacement warranty","Full commercial usage rights"],howToUse:Array.isArray(e.how_to_use)?e.how_to_use:[],tutorialVideoUrl:e.tutorial_video_url||"",toolUrl:e.tool_url||"#",whatsappUrl:e.whatsapp_url||Pe,rating:typeof e.rating=="number"?e.rating:4.9,userCount:e.users_count||"2.5K claimed",featured:e.featured!==!1,active:e.active!==!1,sortOrder:e.sort_order||0,createdAt:e.created_at,updatedAt:e.updated_at}:null}purgeLegacyMockDeals(){const e="ai_tools_hot_deals_v1";try{if(typeof window<"u"&&window.localStorage){const t=localStorage.getItem(e);t&&(t.includes("deal-chatgpt-claude")||t.includes("deal-midjourney")||t.includes("deal-cursor"))&&localStorage.removeItem(e)}}catch{}}async getHotDeals(){const e="ai_tools_hot_deals_v1";this.purgeLegacyMockDeals();let t=[];if(G)try{const{data:i,error:s}=await F.from("hot_deals").select("*").eq("active",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(!s&&Array.isArray(i)){t=i.map(n=>this.normalizeHotDeal(n));try{localStorage.setItem(e,JSON.stringify(t))}catch{}return t}else s&&console.error("[AI Tools Store] Hot deals Supabase error:",s.message)}catch(i){console.error("[AI Tools Store] Hot deals Supabase notice:",i.message)}try{const i=JSON.parse(localStorage.getItem(e)||"[]");Array.isArray(i)&&(t=i.filter(s=>{var n,a,o;return s.active!==!1&&!((n=s.id)!=null&&n.startsWith("deal-chatgpt"))&&!((a=s.id)!=null&&a.startsWith("deal-midjourney"))&&!((o=s.id)!=null&&o.startsWith("deal-cursor"))}).map(s=>this.normalizeHotDeal(s)))}catch{}return t}async getHotDealById(e){return e&&(await this.getHotDeals()).find(i=>i.id===e||i.slug===e)||null}async adminGetHotDeals(){const e="ai_tools_hot_deals_v1";this.purgeLegacyMockDeals();let t=[];if(G)try{const{data:i,error:s}=await F.from("hot_deals").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(!s&&Array.isArray(i)){t=i.map(n=>this.normalizeHotDeal(n));try{localStorage.setItem(e,JSON.stringify(t))}catch{}return t}else s&&console.error("[AI Tools Store] Admin hot deals Supabase error:",s.message)}catch(i){console.error("[AI Tools Store] Admin hot deals Supabase notice:",i.message)}try{const i=JSON.parse(localStorage.getItem(e)||"[]");Array.isArray(i)&&(t=i.filter(s=>{var n,a,o;return!((n=s.id)!=null&&n.startsWith("deal-chatgpt"))&&!((a=s.id)!=null&&a.startsWith("deal-midjourney"))&&!((o=s.id)!=null&&o.startsWith("deal-cursor"))}).map(s=>this.normalizeHotDeal(s)))}catch{}return t}async adminSaveHotDeal(e){if(!e||!e.name||!e.name.trim())throw new Error("Deal product name is required.");const t="ai_tools_hot_deals_v1",i=e.name.trim(),s=(e.slug||i.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")).trim(),n={id:e.id||"",name:i,slug:s,image:e.image||"",shortDescription:e.shortDescription||e.description||"",fullDescription:e.fullDescription||e.description||"",category:e.category||"Promotions & Bundles",offerLabel:e.offerLabel||"BUY 1 GET 1 FREE",buyQuantity:parseInt(e.buyQuantity,10)||1,freeQuantity:parseInt(e.freeQuantity,10)||0,duration:e.duration||"1 Month",dealPrice:e.dealPrice||e.price||"PKR 1,999 /mo",price:e.dealPrice||e.price||"PKR 1,999 /mo",regularPrice:e.regularPrice||"",countryPricing:e.countryPricing&&typeof e.countryPricing=="object"?e.countryPricing:{},badge:e.badge||`🔥 ${e.offerLabel||"HOT DEAL"}`,badgeType:e.badgeType||"hot",themeColor:e.themeColor||"orange",stockLeft:e.stockLeft||"Only 5 slots left today",features:Array.isArray(e.features)?e.features:["Instant activation via WhatsApp concierge","Official private account or invite link","24/7 dedicated replacement warranty","Full commercial license included"],howToUse:Array.isArray(e.howToUse)?e.howToUse:["Order your deal via WhatsApp with one click","Receive your activation credentials instantly","Enjoy full access with your bonus free tool/quantity"],tutorialVideoUrl:e.tutorialVideoUrl||"",toolUrl:e.toolUrl||"#",whatsappUrl:e.whatsappUrl||Pe,rating:parseFloat(e.rating)||4.9,userCount:e.userCount||"2.8K claimed",featured:e.featured!==!1,active:e.active!==!1,sortOrder:parseInt(e.sortOrder,10)||0,updatedAt:new Date().toISOString()};if(G){const a={name:n.name,slug:n.slug,image:n.image,short_description:n.shortDescription,full_description:n.fullDescription,category:n.category,offer_label:n.offerLabel,buy_quantity:n.buyQuantity,free_quantity:n.freeQuantity,duration:n.duration,deal_price:n.dealPrice,regular_price:n.regularPrice,country_pricing:n.countryPricing,badge:n.badge,badge_type:n.badgeType,theme_color:n.themeColor,stock_left:n.stockLeft,rating:n.rating,users_count:n.userCount,featured:n.featured,active:n.active,sort_order:n.sortOrder,updated_at:new Date().toISOString()},o=!!(e.id&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.id));let l;if(o?l=await F.from("hot_deals").update(a).eq("id",e.id).select().single():l=await F.from("hot_deals").insert(a).select().single(),l.error)throw console.error("[AI Tools Store] Supabase hot deal save error:",l.error),new Error(l.error.message||"Failed to save deal to Supabase.");if(l.data){const c=this.normalizeHotDeal(l.data);try{let d=JSON.parse(localStorage.getItem(t)||"[]");d=d.filter(u=>u.id!==c.id&&u.slug!==c.slug),d.push(c),localStorage.setItem(t,JSON.stringify(d))}catch{}return c}}return n}async adminDeleteHotDeal(e){const t="ai_tools_hot_deals_v1";if(G){const{error:i}=await F.from("hot_deals").delete().eq("id",e);if(i)throw console.error("[AI Tools Store] Supabase hot deal delete error:",i),new Error(i.message||"Failed to delete deal from Supabase.")}try{let i=JSON.parse(localStorage.getItem(t)||"[]");i=i.filter(s=>s.id!==e&&s.slug!==e),localStorage.setItem(t,JSON.stringify(i))}catch{}return!0}async adminToggleHotDealActive(e,t){const i="ai_tools_hot_deals_v1";if(G){const{error:s}=await F.from("hot_deals").update({active:t,updated_at:new Date().toISOString()}).eq("id",e);if(s)throw console.error("[AI Tools Store] Supabase hot deal toggle error:",s),new Error(s.message||"Failed to update deal status in Supabase.")}try{let s=JSON.parse(localStorage.getItem(i)||"[]");const n=s.find(a=>a.id===e||a.slug===e);n&&(n.active=t,localStorage.setItem(i,JSON.stringify(s)))}catch{}return!0}subscribeToHotDeals(e){if(!G||typeof window>"u")return()=>{};try{const t=F.channel(`hot_deals_realtime_${Math.random().toString(36).substring(2,8)}`).on("postgres_changes",{event:"*",schema:"public",table:"hot_deals"},i=>{typeof e=="function"&&e(i)}).subscribe();return()=>{try{F.removeChannel(t)}catch{}}}catch(t){return console.warn("[AI Tools Store] Supabase realtime subscription error:",t),()=>{}}}}const ee=new ml,ft="ai_tools_user_session_v1",je="ai_tools_admin_authorized",ze="ai_tools_admin_email";class gl{constructor(){this.currentUser=null,this.currentProfile=null,this.listeners=new Set,this.purgeLegacyDummyAccounts(),this.initSupabaseAuth()}purgeLegacyDummyAccounts(){var e;try{localStorage.removeItem("ai_tools_users_store_v1");const t=localStorage.getItem(ft);if(t){const i=JSON.parse(t),s=((e=i==null?void 0:i.user)==null?void 0:e.id)||"";/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)||(localStorage.removeItem(ft),localStorage.removeItem(je),localStorage.removeItem(ze))}}catch{}}async initSupabaseAuth(){if(!G){console.warn("[AI Tools Store Auth] Supabase is not configured. User accounts will not work without Supabase.");return}try{const{data:{session:e}}=await F.auth.getSession();e!=null&&e.user?(this.currentUser=e.user,await this.fetchProfile(this.currentUser.id),this.saveLocalSession(this.currentUser,this.currentProfile)):this.restoreLocalSession(),this.notifyListeners()}catch(e){console.warn("[AI Tools Store Auth] getSession error:",e)}F.auth.onAuthStateChange(async(e,t)=>{t!=null&&t.user?(this.currentUser=t.user,await this.fetchProfile(this.currentUser.id),this.saveLocalSession(this.currentUser,this.currentProfile)):e==="SIGNED_OUT"&&(this.currentUser=null,this.currentProfile=null,this.clearLocalSession()),this.notifyListeners()})}restoreLocalSession(){var e;try{const t=localStorage.getItem(ft);if(t){const i=JSON.parse(t),s=((e=i==null?void 0:i.user)==null?void 0:e.id)||"";/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)&&(i!=null&&i.user)?(this.currentUser=i.user,this.currentProfile=i.profile||null):this.clearLocalSession()}}catch(t){console.warn("[AI Tools Store Auth] Could not restore local session:",t)}}saveLocalSession(e,t){try{if(!e||!e.id)return;localStorage.setItem(ft,JSON.stringify({user:e,profile:t}))}catch(i){console.warn("[AI Tools Store Auth] Could not save local session:",i)}}clearLocalSession(){try{localStorage.removeItem(ft),localStorage.removeItem(je),localStorage.removeItem(ze),localStorage.removeItem("ai_tools_users_store_v1")}catch(e){console.warn("[AI Tools Store Auth] Could not clear local session:",e)}}subscribe(e){this.listeners.add(e);try{e({user:this.currentUser,profile:this.currentProfile})}catch(t){console.error("Error in initial auth listener call:",t)}return()=>this.listeners.delete(e)}notifyListeners(){const e={user:this.currentUser,profile:this.currentProfile};this.listeners.forEach(t=>{try{t(e)}catch(i){console.error("Error in auth listener notification:",i)}})}async fetchProfile(e){if(!e||!G)return null;try{const{data:t,error:i}=await F.from("profiles").select("*").eq("id",e).maybeSingle();if(!i&&t)return this.currentProfile=t,this.saveLocalSession(this.currentUser,this.currentProfile),this.currentProfile;if(this.currentUser){const s=this.currentUser.user_metadata||{},n=(this.currentUser.email||"").toLowerCase().trim(),a=s.full_name||n.split("@")[0]||"VIP Member",o=s.whatsapp_number||"",l=this.isAdmin(this.currentUser),c=s.country||this.getUserCountry()||"Pakistan",{data:d,error:u}=await F.from("profiles").upsert({id:e,full_name:a,email:n,whatsapp_number:o,country:c,role:l?"admin":"member",preferred_language:"en",last_sign_in_at:new Date().toISOString()}).select().maybeSingle();if(!u&&d)return this.currentProfile=d,d.country&&localStorage.setItem("ai_tools_user_country_v1",d.country),this.saveLocalSession(this.currentUser,this.currentProfile),this.currentProfile}}catch(t){console.warn("Could not fetch Supabase profile:",t)}return this.currentProfile}getUserCountry(){var e,t,i;if((e=this.currentProfile)!=null&&e.country)return this.currentProfile.country;if((i=(t=this.currentUser)==null?void 0:t.user_metadata)!=null&&i.country)return this.currentUser.user_metadata.country;try{const s=localStorage.getItem("ai_tools_user_country_v1");if(s)return s}catch{}return"Pakistan"}setUserCountry(e){var t;if(e){try{localStorage.setItem("ai_tools_user_country_v1",e)}catch{}this.currentProfile&&(this.currentProfile.country=e,this.saveLocalSession(this.currentUser,this.currentProfile),G&&((t=this.currentUser)!=null&&t.id)&&F.from("profiles").update({country:e,updated_at:new Date().toISOString()}).eq("id",this.currentUser.id).then(()=>{}).catch(i=>console.warn("Could not update profile country in Supabase:",i))),this.notifyListeners(),typeof window<"u"&&window.dispatchEvent(new CustomEvent("ai_tools_country_changed",{detail:{country:e}}))}}async getCurrentUser(){if(this.currentUser)return this.currentUser;if(G)try{const{data:{session:e}}=await F.auth.getSession();if(e!=null&&e.user)return this.currentUser=e.user,this.currentUser}catch(e){console.warn("Supabase getSession error:",e)}return this.restoreLocalSession(),this.currentUser}isAuthenticated(){return!!(this.currentUser&&this.currentUser.id)}isAdmin(e=this.currentUser,t=this.currentProfile){var n,a;if(!e)return!1;const i=(e.email||"").toLowerCase().trim(),s=(dt("VITE_ADMIN_EMAILS","")||dt("VITE_ADMIN_EMAIL","")).toLowerCase().split(",").map(o=>o.trim()).filter(Boolean);if(i==="numanali1n@gmail.com"||i.startsWith("admin@")||i.startsWith("superadmin@")||i==="admin@aitools.store"||i==="admin@aitools.vip"||s.includes(i)||(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.is_admin)===!0||((n=e==null?void 0:e.user_metadata)==null?void 0:n.role)==="admin"||((a=e==null?void 0:e.app_metadata)==null?void 0:a.role)==="admin")return!0;if(localStorage.getItem(je)==="true"){const o=localStorage.getItem(ze);if(o&&o.toLowerCase()===i)return!0}return!1}setAdminAuthorized(e=!0,t=null){var i,s;e?(localStorage.setItem(je,"true"),(t||(i=this.currentUser)!=null&&i.email)&&localStorage.setItem(ze,t||((s=this.currentUser)==null?void 0:s.email)),this.currentProfile&&(this.currentProfile.role="admin")):(localStorage.removeItem(je),localStorage.removeItem(ze),this.currentProfile&&this.currentProfile.role==="admin"&&(this.currentProfile.role="member")),this.notifyListeners()}async getRegisteredUsers(){if(!G)return console.warn("[AI Tools Store Auth] Supabase not configured for getRegisteredUsers."),[];try{const{data:e,error:t}=await F.from("profiles").select("*").order("created_at",{ascending:!1});return t?(console.error("[AI Tools Store Auth] Supabase profiles query error:",t.message),[]):(e||[]).map(i=>{const s=(i.email||"").toLowerCase(),n=i.role==="admin"||s==="numanali1n@gmail.com"||s.startsWith("admin@")||s.startsWith("superadmin@")||s==="admin@aitools.store";return{id:i.id,full_name:i.full_name||"VIP Member",email:i.email||"",whatsapp_number:i.whatsapp_number||"",country:i.country||"Pakistan",preferred_language:i.preferred_language||"en",role:n?"admin":"member",last_sign_in_at:i.last_sign_in_at||null,created_at:i.created_at||new Date().toISOString()}})}catch(e){return console.error("[AI Tools Store Auth] Error fetching profiles:",e),[]}}async updateUserRole(e,t){var s;if(!G)throw new Error("Supabase is not configured.");const{error:i}=await F.from("profiles").update({role:t,updated_at:new Date().toISOString()}).eq("id",e);if(i)throw new Error(i.message);return((s=this.currentUser)==null?void 0:s.id)===e&&this.currentProfile&&(this.currentProfile.role=t,t==="admin"?(localStorage.setItem(je,"true"),localStorage.setItem(ze,this.currentUser.email)):(localStorage.removeItem(je),localStorage.removeItem(ze)),this.saveLocalSession(this.currentUser,this.currentProfile),this.notifyListeners()),!0}async signUp({fullName:e,email:t,whatsappNumber:i,password:s,country:n="Pakistan"}){const a=(t||"").trim(),o=(e||"").trim()||"VIP Member",l=(i||"").trim(),c=(n||"Pakistan").trim();if(!a)throw new Error("Please enter a valid email address.");if(!s||s.length<6)throw new Error("Password must be at least 6 characters long.");if(!G)throw new Error("Supabase backend is not connected. Please check your Supabase configuration.");const{data:d,error:u}=await F.auth.signUp({email:a,password:s,options:{data:{full_name:o,whatsapp_number:l,country:c}}});if(u)throw new Error(u.message);if(!(d!=null&&d.user))throw new Error("Failed to create account in Supabase. Please try again.");const h=d.user,p=a.toLowerCase()==="numanali1n@gmail.com"||a.toLowerCase().startsWith("admin@")||a.toLowerCase().startsWith("superadmin@")||a.toLowerCase()==="admin@aitools.store"||a.toLowerCase()==="admin@aitools.vip";let g=null;try{const{data:f,error:v}=await F.from("profiles").upsert({id:h.id,full_name:o,email:a,whatsapp_number:l,country:c,role:p?"admin":"member",preferred_language:"en",last_sign_in_at:new Date().toISOString()}).select().single();v?console.warn("[AI Tools Store Auth] Profile upsert notice:",v.message):g=f}catch(f){console.warn("[AI Tools Store Auth] Profile upsert error:",f)}return this.setUserCountry(c),d.session?(this.currentUser=h,this.currentProfile=g||await this.fetchProfile(h.id),this.saveLocalSession(this.currentUser,this.currentProfile),this.notifyListeners(),{user:this.currentUser,profile:this.currentProfile,session:d.session}):{user:h,profile:g,needsConfirmation:!0,message:"Account registered in Supabase! If email confirmation is enabled, please verify your email before signing in."}}async signIn({email:e,password:t}){const i=(e||"").trim();if(!i)throw new Error("Please enter your email address.");if(!t)throw new Error("Please enter your password.");if(!G)throw new Error("Supabase backend is not connected.");const{data:s,error:n}=await F.auth.signInWithPassword({email:i,password:t});if(n)throw n.message&&n.message.toLowerCase().includes("email not confirmed")?new Error('Email not confirmed yet. In Supabase Dashboard > Authentication > Providers > Email, turn off "Confirm email" or check your inbox.'):new Error(n.message||"Invalid email or password.");if(!(s!=null&&s.user))throw new Error("Sign in failed: No user returned from Supabase.");return this.currentUser=s.user,this.currentProfile=await this.fetchProfile(s.user.id),this.isAdmin(this.currentUser,this.currentProfile)&&(localStorage.setItem(je,"true"),localStorage.setItem(ze,this.currentUser.email),this.currentProfile&&(this.currentProfile.role="admin")),this.saveLocalSession(this.currentUser,this.currentProfile),this.notifyListeners(),{user:this.currentUser,profile:this.currentProfile,session:s.session}}async signOut(){if(this.clearLocalSession(),this.currentUser=null,this.currentProfile=null,G)try{await F.auth.signOut()}catch(e){console.warn("Supabase signOut error:",e)}return this.notifyListeners(),!0}}const H=new gl;function fl(r){if(!r)return"";const e=r.trim();if(e.includes("/embed/"))return e;const t=e.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);return t&&t[1]?`https://www.youtube.com/embed/${t[1]}?autoplay=0&rel=0`:e}function Fe(r=""){const e=(r||"").toLowerCase().trim();return e.includes("pakistan")?"🇵🇰":e.includes("india")?"🇮🇳":e.includes("emirates")||e.includes("uae")||e.includes("dubai")?"🇦🇪":e.includes("saudi")?"🇸🇦":e.includes("united states")||e.includes("usa")||e==="us"?"🇺🇸":e.includes("united kingdom")||e.includes("uk")||e.includes("britain")?"🇬🇧":e.includes("canada")?"🇨🇦":e.includes("australia")?"🇦🇺":e.includes("germany")?"🇩🇪":e.includes("france")?"🇫🇷":e.includes("bangladesh")?"🇧🇩":e.includes("turkey")||e.includes("turkiye")?"🇹🇷":"🌐"}function Ut(r,e=""){if(!r)return"$19 /month";const t=r.countryPricing||r.country_pricing||{};let i=e;if(!i)try{const o=localStorage.getItem("ai_tools_user_country_v1");o&&(i=o)}catch{}i||(i="Pakistan");const s=i.toLowerCase().trim(),n={pakistan:["pakistan","pk","pkr"],india:["india","in","inr"],"united arab emirates":["united arab emirates","uae","emirates","ae","aed"],"saudi arabia":["saudi arabia","saudi","sar","ksa","sa"],"united states":["united states","usa","us","usd","america"],"united kingdom":["united kingdom","uk","gbp","britain","gb"]};let a=[s];for(const[o,l]of Object.entries(n))if(s===o||l.includes(s)||s.includes(o)){a=l;break}for(const[o,l]of Object.entries(t))if(l&&typeof l=="string"&&l.trim()){const c=o.toLowerCase().trim();if(a.includes(c)||c===s)return l.trim()}for(const[o,l]of Object.entries(t))if(l&&typeof l=="string"&&l.trim()){const c=o.toLowerCase().trim();if(["default","global","other","others","world"].includes(c))return l.trim()}return r.price||"$19 /month"}function Gr(r,e="/month"){if(!r)return{amount:"$19",unit:"month",periodText:e,periodHtml:`<span class="price-period">${e}</span>`};let t=String(r).trim(),i=t,s="";if(t.includes("/")){const o=t.split("/");i=o[0].trim(),s=o.slice(1).join("/").trim()}else if(/\s+(?:per|for)\s+/i.test(t)){const o=t.split(/\s+(?:per|for)\s+/i);i=o[0].trim(),s=o.slice(1).join(" ").trim()}else if(/\(([^)]+)\)$/.test(t)){const o=t.match(/\(([^)]+)\)$/);i=t.replace(/\(([^)]+)\)$/,"").trim(),s=o[1].trim()}s=s.replace(/^[\/\s]+/,"").replace(/[\)\(]/g,"").trim(),/^\d+\s*pkr$/i.test(i)?i=i.replace(/pkr$/i,"").trim()+" PKR":/^pkr\s*\d+$/i.test(i)?i=i.replace(/^pkr\s*/i,"").trim()+" PKR":/^rs\.?\s*\d+$/i.test(i)&&(i=i.replace(/^rs\.?\s*/i,"Rs ").trim());let n="",a="";if(s){const o=s.toLowerCase().trim();o==="month"||o==="mo"||o==="monthly"||o==="per month"?(a="/month",n='<span class="price-period">/month</span>'):o==="year"||o==="yr"||o==="yearly"||o==="annually"||o==="per year"?(a="/year",n='<span class="price-period">/year</span>'):o.includes("lifetime")||o.includes("one-time")||o.includes("onetime")?(a="Lifetime Plan",n='<span class="price-period price-period-badge">Lifetime</span>'):(a=`/${s}`,n=`<span class="price-period price-period-custom">/${s}</span>`)}else a="",n="";return{amount:i,unit:s,periodText:a,periodHtml:n}}function Mr(r,e={}){if(!r)return"";const t=!!e.isCard,i=e.maxPoints||3,s=String(r).replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim();if(!s)return"";const n=s.split(`
`),a=/^[\s]*[•\-\*\+✔✓✦\>»]\s*/,o=/^[\s]*\d+[\.\)]\s*/;let l=[];if(n.length>1?l=n.map(d=>d.trim()).filter(Boolean).map(d=>d.replace(a,"").replace(o,"").trim()).filter(Boolean):(s.includes("•")||s.includes("✦")||s.includes(" - "))&&(l=s.split(/(?:[•✦]|\s+-\s+)/).map(d=>d.trim()).filter(Boolean)),l.length>=2||l.length===1&&(a.test(r)||n.length>1)){const u=(t?l.slice(0,i):l).map(p=>`<li class="tool-bullet-item"><span class="tool-bullet-dot">✦</span><span class="tool-bullet-text">${p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span></li>`).join(""),h=t&&l.length>i?`<li class="tool-bullet-more">+ ${l.length-i} more points...</li>`:"";return`<ul class="tool-desc-bullets ${t?"tool-desc-bullets-card":""}">${u}${h}</ul>`}return`<span class="tool-desc-plain">${s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span>`}function Ms(r,e="",t="",i=""){if(r&&r.startsWith("http")&&!t)return r;const s="https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q";if(!e)return s;let n=`Hello! I would like to purchase and activate ${e} from AI Tools Store.`;if(t){const a=i?` for ${i}`:"";n=`Hello! I would like to purchase ${e} at ${t}${a} from AI Tools Store. Please share activation details.`}if(r&&r.includes("wa.me/")){const a=r.match(/wa\.me\/([0-9+]+)/);if(a&&a[1])return`https://wa.me/${a[1].replace(/\D/g,"")}?text=${encodeURIComponent(n)}`}return`https://wa.me/1234567890?text=${encodeURIComponent(n)}`}function Jr(r,e=""){const t=(r||"").toLowerCase();return t.includes("writegen")?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  </svg>`}function B(r,e="info"){const t=document.getElementById("toast-container");if(!t)return;const i=document.createElement("div");i.className=`toast toast-${e}`,i.innerHTML=`
    <span>${e==="success"?"✓":"ℹ"}</span>
    <span>${r}</span>
  `,t.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(10px)",i.style.transition="all 0.3s ease",setTimeout(()=>i.remove(),300)},3200)}let xr=!1;async function ss(){if(xr)return;xr=!0;const r=document.getElementById("modal-root");if(!r)return;const e=await ee.getTools(),t=document.createElement("div");t.className="modal-backdrop",t.id="search-modal-backdrop",t.innerHTML=`
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
        ${ns(e.slice(0,6))}
      </div>

      <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); flex-wrap: wrap; gap: 0.5rem;">
        <span>Tip: Press <kbd class="kbd-shortcut">ESC</kbd> to exit</span>
        <span>${e.length} tools indexed</span>
      </div>
    </div>
  `,r.appendChild(t);let i;const s=()=>{xr=!1,i&&window.removeEventListener("keydown",i),t.remove()};t.onclick=s,document.getElementById("search-modal-close").onclick=s;const n=document.getElementById("modal-search-input"),a=document.getElementById("modal-search-results");a&&(a.onclick=o=>{o.target.closest("a")&&s()}),setTimeout(()=>n==null?void 0:n.focus(),50),n&&(n.oninput=o=>{const l=o.target.value.toLowerCase().trim(),c=e.filter(d=>d.name.toLowerCase().includes(l)||d.category.toLowerCase().includes(l)||d.shortDescription&&d.shortDescription.toLowerCase().includes(l));a.innerHTML=c.length>0?ns(c):`<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No matching tools found for "${o.target.value}"</div>`},n.onkeydown=o=>{if(o.key==="Enter"){const l=a==null?void 0:a.querySelector("a");l&&(o.preventDefault(),l.click())}}),i=o=>{o.key==="Escape"&&s()},window.addEventListener("keydown",i)}function ns(r){return r.map(e=>`
    <a 
      href="#/tool/${e.id}" 
      style="display: flex; align-items: center; gap: 0.85rem; padding: 0.65rem 0.85rem; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); text-decoration: none; transition: background 150ms ease;"
    >
      <div style="width: 36px; height: 36px; border-radius: 8px; background: ${e.iconGradient||"#4f46e5"}; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
        ${Jr(e.id,e.name)}
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
  `).join("")}const wt=[{code:"en",name:"English",nativeName:"English",flag:"🇺🇸",dir:"ltr"},{code:"ur",name:"Urdu",nativeName:"اردو",flag:"🇵🇰",dir:"rtl"},{code:"ar",name:"Arabic",nativeName:"العربية",flag:"🇸🇦",dir:"rtl"},{code:"hi",name:"Hindi",nativeName:"हिन्दी",flag:"🇮🇳",dir:"ltr"},{code:"es",name:"Spanish",nativeName:"Español",flag:"🇪🇸",dir:"ltr"},{code:"fr",name:"French",nativeName:"Français",flag:"🇫🇷",dir:"ltr"},{code:"de",name:"German",nativeName:"Deutsch",flag:"🇩🇪",dir:"ltr"},{code:"zh",name:"Chinese (Simplified)",nativeName:"中文 (简体)",flag:"🇨🇳",dir:"ltr"},{code:"zh-TW",name:"Chinese (Traditional)",nativeName:"中文 (繁體)",flag:"🇹🇼",dir:"ltr"},{code:"ja",name:"Japanese",nativeName:"日本語",flag:"🇯🇵",dir:"ltr"},{code:"ko",name:"Korean",nativeName:"한국어",flag:"🇰🇷",dir:"ltr"},{code:"ru",name:"Russian",nativeName:"Русский",flag:"🇷🇺",dir:"ltr"},{code:"pt",name:"Portuguese",nativeName:"Português",flag:"🇧🇷",dir:"ltr"},{code:"it",name:"Italian",nativeName:"Italiano",flag:"🇮🇹",dir:"ltr"},{code:"tr",name:"Turkish",nativeName:"Türkçe",flag:"🇹🇷",dir:"ltr"},{code:"nl",name:"Dutch",nativeName:"Nederlands",flag:"🇳🇱",dir:"ltr"},{code:"pl",name:"Polish",nativeName:"Polski",flag:"🇵🇱",dir:"ltr"},{code:"id",name:"Indonesian",nativeName:"Bahasa Indonesia",flag:"🇮🇩",dir:"ltr"},{code:"ms",name:"Malay",nativeName:"Bahasa Melayu",flag:"🇲🇾",dir:"ltr"},{code:"bn",name:"Bengali",nativeName:"বাংলা",flag:"🇧🇩",dir:"ltr"},{code:"pa",name:"Punjabi",nativeName:"ਪੰਜਾਬੀ / پنجابی",flag:"🇮🇳",dir:"ltr"},{code:"fa",name:"Persian",nativeName:"فارسی",flag:"🇮🇷",dir:"rtl"},{code:"th",name:"Thai",nativeName:"ไทย",flag:"🇹🇭",dir:"ltr"},{code:"vi",name:"Vietnamese",nativeName:"Tiếng Việt",flag:"🇻🇳",dir:"ltr"},{code:"he",name:"Hebrew",nativeName:"עבריت",flag:"🇮🇱",dir:"rtl"},{code:"el",name:"Greek",nativeName:"Ελληνικά",flag:"🇬🇷",dir:"ltr"},{code:"cs",name:"Czech",nativeName:"Čeština",flag:"🇨🇿",dir:"ltr"},{code:"ro",name:"Romanian",nativeName:"Română",flag:"🇷🇴",dir:"ltr"},{code:"hu",name:"Hungarian",nativeName:"Magyar",flag:"🇭🇺",dir:"ltr"},{code:"sv",name:"Swedish",nativeName:"Svenska",flag:"🇸🇪",dir:"ltr"},{code:"da",name:"Danish",nativeName:"Dansk",flag:"🇩🇰",dir:"ltr"},{code:"no",name:"Norwegian",nativeName:"Norsk",flag:"🇳🇴",dir:"ltr"},{code:"fi",name:"Finnish",nativeName:"Suomi",flag:"🇫🇮",dir:"ltr"},{code:"uk",name:"Ukrainian",nativeName:"Українська",flag:"🇺🇦",dir:"ltr"},{code:"ta",name:"Tamil",nativeName:"தமிழ்",flag:"🇮🇳",dir:"ltr"},{code:"te",name:"Telugu",nativeName:"తెలుగు",flag:"🇮🇳",dir:"ltr"},{code:"mr",name:"Marathi",nativeName:"मराठी",flag:"🇮🇳",dir:"ltr"},{code:"gu",name:"Gujarati",nativeName:"ગુજરાતી",flag:"🇮🇳",dir:"ltr"},{code:"kn",name:"Kannada",nativeName:"ಕನ್ನಡ",flag:"🇮🇳",dir:"ltr"},{code:"ml",name:"Malayalam",nativeName:"മലയാളം",flag:"🇮🇳",dir:"ltr"},{code:"ne",name:"Nepali",nativeName:"नेपाली",flag:"🇳🇵",dir:"ltr"},{code:"tl",name:"Filipino",nativeName:"Filipino",flag:"🇵🇭",dir:"ltr"},{code:"sw",name:"Swahili",nativeName:"Kiswahili",flag:"🇰🇪",dir:"ltr"},{code:"sk",name:"Slovak",nativeName:"Slovenčina",flag:"🇸🇰",dir:"ltr"},{code:"bg",name:"Bulgarian",nativeName:"Български",flag:"🇧🇬",dir:"ltr"},{code:"sr",name:"Serbian",nativeName:"Српски",flag:"🇷🇸",dir:"ltr"},{code:"hr",name:"Croatian",nativeName:"Hrvatski",flag:"🇭🇷",dir:"ltr"}];function Lt(r){if(!r)return wt[0];const e=r.toLowerCase().trim();return wt.find(t=>t.code.toLowerCase()===e)||wt.find(t=>t.code.toLowerCase().startsWith(e.split("-")[0]))||wt[0]}const vl=["ur","ar","fa","he"],yl={nav:{brand:"AI Tools Store",home:"Home",allTools:"All Tools",hotDeals:"Hot Deals",categories:"Categories",about:"About",contact:"Contact",admin:"Admin",adminPanel:"Admin Panel",administrator:"Administrator",searchTitle:"Search Tools (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"Join WhatsApp",signIn:"Sign In",signUp:"✦ Sign Up",account:"My Account",logout:"Log Out",selectLanguage:"Select Language"},hero:{headlinePart1:"Discover the Best",headlineGradient:"AI Tools",headlinePart2:"in One Place",desc:"Find, explore, and master cutting-edge AI tools to accelerate your productivity, automate tasks, and build the future.",searchPlaceholder:"Search AI tools...",searchSubmit:"Search Tools",exploreBtn:"Explore AI Tools",communityBtn:"Join Our Community",trust1Title:"Trusted & Verified",trust1Desc:"Quality tools you can trust",trust2Title:"Instant Access",trust2Desc:"Get started in seconds",trust3Title:"Best Prices",trust3Desc:"Affordable & transparent"},categories:{badge:"Browse Catalog",title:"Browse AI Tools by Category",viewAll:"View All Categories",countLabel:"Tools"},featured:{badge:"Featured Selection",title:"Explore Powerful AI Tools",subtitle:"Hand-picked AI tools designed to supercharge your workflow",viewAll:"View All Tools",emptyTitle:"Supabase Database Connected",emptyDesc:"Run supabase/schema.sql in your Supabase SQL editor to seed products, or open the Admin Panel.",openAdmin:"Open Admin Panel"},benefits:{badge:"Why AI Tools Store",title:"Why Choose AI Tools Store",subtitle:"Everything you need to discover, activate, and master AI tools without friction.",b1Title:"Curated AI Tools",b1Desc:"Only high-quality and tested AI tools.",b2Title:"Step-by-Step Tutorials",b2Desc:"Learn how to use every tool effectively.",b3Title:"Instant Access & Support",b3Desc:"Get immediate access and support via WhatsApp.",b4Title:"Always Updated",b4Desc:"Discover new tools and updates regularly."},finalCta:{badge:"✦ Unlock AI Superpowers",title:"Ready to Explore the Future of AI?",subtitle:"Join thousands of creators, builders, and developers using AI Tools Store to stay ahead.",getStarted:"✦ Get Started Now",browseTools:"Browse Tools"},card:{buyNow:"Buy Now",howToUse:"How to Use",viewDetails:"View Details",perMonth:"/month",rating:"Rating",users:"users",saveFav:"Save to favorites",addedFavToast:"Added to your favorites!",removedFavToast:"Removed from saved favorites"},auth:{createAccountHeading:"Create your AI Tools Store account",welcomeBackHeading:"Welcome back to AI Tools Store",createAccountSub:"✦ Join thousands of creators, builders and innovators.",signInSub:"✦ Sign in to continue discovering powerful AI tools.",tabSignUp:"Sign Up",tabSignIn:"Sign In",fullNameLabel:"Full Name",fullNamePlaceholder:"Enter your full name",emailLabel:"Email Address",emailPlaceholder:"Enter your email address",whatsappLabel:"WhatsApp Number",whatsappPlaceholder:"Enter WhatsApp number",passwordLabel:"Password",passwordPlaceholder:"Create password (min 6 characters)",confirmPasswordLabel:"Confirm Password",confirmPasswordPlaceholder:"Confirm password",btnCreateAccount:"✦ Create Account",btnSignIn:"→ Sign In",alreadyHaveAccount:"Already have an account?",dontHaveAccount:"Don't have an account?",linkSignIn:"Sign in",linkSignUp:"Sign up",passwordsMismatch:"Passwords do not match. Please verify your confirmation password.",minLengthError:"Password must be at least 6 characters long.",requiredError:"Please fill in all required fields.",creatingAccount:"Creating Account...",signingIn:"Signing In...",welcomeToast:"Welcome to AI Tools Store",signedInToast:"Signed in successfully!",signedOutToast:"Signed out successfully."},account:{title:"Account Details",verified:"● Verified Account",emailLabel:"Email Address",whatsappLabel:"WhatsApp Number",memberSince:"Member Since",signOutBtn:"Sign Out of Account"},toolDetails:{notFoundTitle:"Tool Not Found",notFoundDesc:"The tool you are looking for does not exist or has been retired.",backToTools:"Back to All Tools",buyNowWhatsApp:"Buy Now via WhatsApp",visitWebsite:"Visit Official Website",overviewTab:"Overview",featuresTab:"Features & Benefits",howToUseTab:"How to Use & Tutorial",videoTutorial:"Video Walkthrough",guaranteesSupport:"Direct WhatsApp concierge support",guaranteesActivation:"Instant activation under 5 minutes",guaranteesLicensing:"100% verified genuine software license",purchaseVerified:"Verified Purchase Link: Directly redirects to WhatsApp concierge.",similarTools:"Similar AI Tools in"},allTools:{headerTitle:"Explore Hand-Picked AI Tools",headerSubtitle:"Discover, compare, and unlock premium software licenses with instant activation.",searchPlaceholder:"Search by tool name or capability...",allCategories:"All",sortPopular:"Most Popular",sortRating:"Highest Rated",sortPriceLow:"Price: Low to High",sortPriceHigh:"Price: High to Low",sortName:"Alphabetical",resultsCount:"Showing {count} AI tools",clearFilters:"Clear Filters",loadMore:"Load More AI Tools",noResultsTitle:"No tools found matching your search",noResultsDesc:"Try searching for a different keyword or select another category above.",resetFilters:"Reset Filters"},footer:{desc:"The leading futuristic marketplace to discover, activate, and master hand-curated AI tools with instant WhatsApp access.",exploreHeading:"Explore",resourcesHeading:"Resources",communityHeading:"Community",allRightsReserved:"All rights reserved. Built for modern AI pioneers."}},bl={nav:{brand:"اے آئی ٹولز اسٹور",home:"ہوم",allTools:"تمام ٹولز",hotDeals:"ہاٹ ڈیلز 🔥",categories:"اقسام",about:"ہمارے بارے میں",contact:"رابطہ کریں",admin:"ایڈمن",adminPanel:"ایڈمن پینل",administrator:"ایڈمنسٹریٹر",searchTitle:"ٹولز تلاش کریں (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"واٹس ایپ پر جڑیں",signIn:"لاگ ان کریں",signUp:"✦ سائن اپ کریں",account:"میرا اکاؤنٹ",logout:"لاگ آؤٹ",selectLanguage:"زبان منتخب کریں"},hero:{headlinePart1:"بہترین اور جدید ترین",headlineGradient:"اے آئی ٹولز",headlinePart2:"ایک ہی جگہ پر",desc:"اپنی پیداواری صلاحیت کو کئی گنا بڑھانے، کاموں کو خودکار بنانے اور مستقبل کی تعمیر کے لیے جدید ترین اے آئی ٹولز دریافت کریں۔",searchPlaceholder:"اے آئی ٹولز تلاش کریں...",searchSubmit:"ٹولز تلاش کریں",exploreBtn:"ٹولز دریافت کریں",communityBtn:"ہماری کمیونٹی میں شامل ہوں",trust1Title:"تصدیق شدہ اور محفوظ",trust1Desc:"معیاری ٹولز جن پر آپ بھروسہ کر سکتے ہیں",trust2Title:"فوری رسائی",trust2Desc:"چند سیکنڈز میں آغاز کریں",trust3Title:"بہترین قیمتیں",trust3Desc:"مناسب اور شفاف فیس"},categories:{badge:"کیٹلاگ دیکھیں",title:"اقسام کے لحاظ سے اے آئی ٹولز تلاش کریں",viewAll:"تمام اقسام دیکھیں",countLabel:"ٹولز"},featured:{badge:"نمایاں انتخاب",title:"طاقتور اور جدید اے آئی ٹولز دیکھیں",subtitle:"آپ کے ورک فلو کو تیز ترین بنانے کے لیے منتخب کردہ اعلیٰ معیار کے ٹولز",viewAll:"تمام ٹولز دیکھیں",emptyTitle:"سُپابیس ڈیٹا بیس منسلک ہے",emptyDesc:"مصنوعات شامل کرنے کے لیے سُپابیس میں سکیما چلائیں یا ایڈمن پینل کھولیں۔",openAdmin:"ایڈمن پینل کھولیں"},benefits:{badge:"اے آئی ٹولز اسٹور کیوں؟",title:"اے آئی ٹولز اسٹور کا انتخاب کیوں کریں؟",subtitle:"اے آئی ٹولز کو تلاش کرنے، فعال کرنے اور آسانی سے سیکھنے کا مکمل حل۔",b1Title:"منتخب کردہ معیاری ٹولز",b1Desc:"صرف تصدیق شدہ اور آزمودہ اعلیٰ معیار کے ٹولز۔",b2Title:"مرحلہ وار گائیڈز",b2Desc:"ہر ٹول کو مؤثر انداز میں استعمال کرنا سیکھیں۔",b3Title:"فوری رسائی اور سپورٹ",b3Desc:"واٹس ایپ کے ذریعے فوری ایکٹیویشن اور مدد حاصل کریں۔",b4Title:"ہمیشہ اپ ڈیٹ شدہ",b4Desc:"مسلسل نئے ٹولز اور اپ ڈیٹس سے باخبر رہیں۔"},finalCta:{badge:"✦ جدید ٹیکنالوجی کی دنیا",title:"کیا آپ اے آئی کے مستقبل میں قدم رکھنے کے لیے تیار ہیں؟",subtitle:"ہزاروں تخلیق کاروں اور ڈویلپرز میں شامل ہوں جو آگے رہنے کے لیے اے آئی ٹولز اسٹور استعمال کرتے ہیں۔",getStarted:"✦ ابھی آغاز کریں",browseTools:"ٹولز براؤز کریں"},card:{buyNow:"ابھی خریدیں",howToUse:"استعمال کا طریقہ",viewDetails:"تفصیلات دیکھیں",perMonth:"/ماہانہ",rating:"ریٹنگ",users:"صارفین",saveFav:"پسندیدہ میں شامل کریں",addedFavToast:"پسندیدہ فہرست میں شامل کر دیا گیا!",removedFavToast:"پسندیدہ فہرست سے ہٹا دیا گیا"},auth:{createAccountHeading:"اپنا اے آئی ٹولز اسٹور اکاؤنٹ بنائیں",welcomeBackHeading:"اے آئی ٹولز اسٹور میں دوبارہ خوش آمدید",createAccountSub:"✦ ہزاروں تخلیق کاروں، بلڈرز اور موجدوں میں شامل ہوں۔",signInSub:"✦ طاقتور اے آئی ٹولز دریافت کرنا جاری رکھنے کے لیے لاگ ان کریں۔",tabSignUp:"سائن اپ",tabSignIn:"لاگ ان",fullNameLabel:"پورا نام",fullNamePlaceholder:"اپنا پورا نام درج کریں",emailLabel:"ای میل ایڈریس",emailPlaceholder:"اپنا ای میل درج کریں",whatsappLabel:"واٹس ایپ نمبر",whatsappPlaceholder:"اپنا واٹس ایپ نمبر درج کریں",passwordLabel:"پاس ورڈ",passwordPlaceholder:"پاس ورڈ بنائیں (کم از کم 6 حروف)",confirmPasswordLabel:"پاس ورڈ کی تصدیق کریں",confirmPasswordPlaceholder:"پاس ورڈ دوبارہ درج کریں",btnCreateAccount:"✦ اکاؤنٹ بنائیں",btnSignIn:"→ لاگ ان کریں",alreadyHaveAccount:"پہلے سے اکاؤنٹ موجود ہے؟",dontHaveAccount:"کیا آپ کا اکاؤنٹ نہیں ہے؟",linkSignIn:"لاگ ان کریں",linkSignUp:"سائن اپ کریں",passwordsMismatch:"پاس ورڈ مماثل نہیں ہیں۔ براہ کرم تصدیقی پاس ورڈ چیک کریں۔",minLengthError:"پاس ورڈ کم از کم 6 حروف پر مشتمل ہونا چاہیے۔",requiredError:"براہ کرم تمام مطلوبہ خانے پر کریں۔",creatingAccount:"اکاؤنٹ بنایا جا رہا ہے...",signingIn:"لاگ ان کیا جا رہا ہے...",welcomeToast:"اے آئی ٹولز اسٹور میں خوش آمدید",signedInToast:"کامیابی سے لاگ ان ہو گیا!",signedOutToast:"کامیابی سے لاگ آؤٹ ہو گیا۔"},account:{title:"اکاؤنٹ کی تفصیلات",verified:"● تصدیق شدہ اکاؤنٹ",emailLabel:"ای میل ایڈریس",whatsappLabel:"واٹس ایپ نمبر",memberSince:"رکنیت کی تاریخ",signOutBtn:"اکاؤنٹ سے لاگ آؤٹ کریں"},toolDetails:{notFoundTitle:"ٹول نہیں ملا",notFoundDesc:"جو ٹول آپ تلاش کر رہے ہیں وہ موجود نہیں ہے یا ہٹا دیا گیا ہے۔",backToTools:"تمام ٹولز کی طرف واپس",buyNowWhatsApp:"واٹس ایپ کے ذریعے خریدیں",visitWebsite:"سرکاری ویب سائٹ ملاحظہ کریں",overviewTab:"جائزہ",featuresTab:"خصوصیات اور فوائد",howToUseTab:"استعمال کا طریقہ اور گائیڈ",videoTutorial:"ویڈیو ٹیوٹوریل",guaranteesSupport:"براہ راست واٹس ایپ کسٹمر سپورٹ",guaranteesActivation:"5 منٹ کے اندر فوری ایکٹیویشن",guaranteesLicensing:"100% تصدیق شدہ حقیقی سافٹ ویئر لائسنس",purchaseVerified:"تصدیق شدہ خریداری لنک: سیدھا واٹس ایپ پر منتقل کرتا ہے۔",similarTools:"ملتے جلتے اے آئی ٹولز برائے"},allTools:{headerTitle:"منتخب کردہ اے آئی ٹولز تلاش کریں",headerSubtitle:"بہترین سافٹ ویئر لائسنس دریافت کریں، موازنہ کریں اور فوری فعال کریں۔",searchPlaceholder:"ٹول کے نام یا کام کے لحاظ سے تلاش کریں...",allCategories:"تمام",sortPopular:"سب سے مقبول",sortRating:"اعلیٰ ریٹنگ والے",sortPriceLow:"قیمت: کم سے زیادہ",sortPriceHigh:"قیمت: زیادہ سے کم",sortName:"حروف تہجی کے اعتبار سے",resultsCount:"{count} اے آئی ٹولز دکھائے جا رہے ہیں",clearFilters:"فلٹرز ختم کریں",loadMore:"مزید ٹولز لوڈ کریں",noResultsTitle:"آپ کی تلاش کے مطابق کوئی ٹول نہیں ملا",noResultsDesc:"کسی دوسرے لفظ سے تلاش کریں یا اوپر دی گئی فہرست سے کوئی دوسری قسم منتخب کریں۔",resetFilters:"فلٹرز دوبارہ ترتیب دیں"},footer:{desc:"واٹس ایپ کے ذریعے فوری رسائی کے ساتھ تصدیق شدہ اے آئی ٹولز تلاش کرنے اور سیکھنے کا جدید ترین پلیٹ فارم۔",exploreHeading:"دریافت کریں",resourcesHeading:"وسائل",communityHeading:"کمیونٹی",allRightsReserved:"جملہ حقوق محفوظ ہیں۔ جدید اے آئی صارفین کے لیے تیار کردہ۔"}},wl={nav:{brand:"متجر أدوات الذكاء الاصطناعي",home:"الرئيسية",allTools:"جميع الأدوات",categories:"التصنيفات",about:"من نحن",contact:"اتصل بنا",admin:"لوحة التحكم",searchTitle:"البحث عن الأدوات (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"انضم عبر واتساب",signIn:"تسجيل الدخول",signUp:"✦ إنشاء حساب",account:"حسابي",logout:"تسجيل الخروج",selectLanguage:"اختر اللغة"},hero:{headlinePart1:"اكتشف أفضل وأحدث",headlineGradient:"أدوات الذكاء الاصطناعي",headlinePart2:"في مكان واحد",desc:"ابحث عن أحدث أدوات الذكاء الاصطناعي واستكشفها لتسريع إنتاجيتك وأتمتة مهامك وبناء المستقبل بكل سهولة.",searchPlaceholder:"ابحث عن أدوات الذكاء الاصطناعي...",searchSubmit:"بحث عن الأدوات",exploreBtn:"استكشاف الأدوات",communityBtn:"انضم إلى مجتمعنا",trust1Title:"موثوق ومعتمد",trust1Desc:"أدوات عالية الجودة يمكنك الوثوق بها",trust2Title:"وصول فوري",trust2Desc:"ابدأ خلال ثوانٍ معدودة",trust3Title:"أفضل الأسعار",trust3Desc:"أسعار معقولة وشفافة"},categories:{badge:"تصفح الدليل",title:"تصفح أدوات الذكاء الاصطناعي حسب التصنيف",viewAll:"عرض جميع التصنيفات",countLabel:"أداة"},featured:{badge:"تشكيلة مميزة",title:"استكشف أدوات الذكاء الاصطناعي القوية",subtitle:"أدوات مختارة بعناية لتعزيز وتطوير سير عملك إلى أقصى حد",viewAll:"عرض جميع الأدوات",emptyTitle:"تم ربط قاعدة بيانات Supabase",emptyDesc:"قم بتشغيل ملف السكيما في Supabase لإضافة المنتجات، أو افتح لوحة التحكم.",openAdmin:"فتح لوحة التحكم"},benefits:{badge:"لماذا متجر أدوات الذكاء الاصطناعي",title:"لماذا تختار متجر أدوات الذكاء الاصطناعي؟",subtitle:"كل ما تحتاجه لاكتشاف وتفعيل وإتقان أدوات الذكاء الاصطناعي دون أي عناء.",b1Title:"أدوات ذكاء اصطناعي منتقاة",b1Desc:"أدوات عالية الجودة ومختبرة بعناية فقط.",b2Title:"دروس إرشادية خطوة بخطوة",b2Desc:"تعلم كيفية استخدام كل أداة بفاعلية واحترافية.",b3Title:"وصول فوري ودعم متواصل",b3Desc:"احصل على تفعيل فوري ومساعدة مباشرة عبر واتساب.",b4Title:"تحديثات مستمرة",b4Desc:"اكتشف أحدث الأدوات والترقيات بشكل دوري."},finalCta:{badge:"✦ أطلق العنان لإمكانياتك",title:"هل أنت مستعد لاستكشاف مستقبل الذكاء الاصطناعي؟",subtitle:"انضم إلى آلاف المبدعين والمطورين الذين يستخدمون متجر أدوات الذكاء الاصطناعي للتميز.",getStarted:"✦ ابدأ الآن",browseTools:"تصفح الأدوات"},card:{buyNow:"شراء الآن",howToUse:"كيفية الاستخدام",viewDetails:"عرض التفاصيل",perMonth:"/شهرياً",rating:"التقييم",users:"مستخدم",saveFav:"إضافة إلى المفضلة",addedFavToast:"تمت الإضافة إلى المفضلة!",removedFavToast:"تمت الإزالة من المفضلة"},auth:{createAccountHeading:"إنشاء حساب جديد في متجر أدوات الذكاء الاصطناعي",welcomeBackHeading:"مرحباً بعودتك إلى متجر أدوات الذكاء الاصطناعي",createAccountSub:"✦ انضم إلى آلاف المبدعين والمبتكرين.",signInSub:"✦ سجل دخولك لمتابعة استكشاف أفضل الأدوات.",tabSignUp:"إنشاء حساب",tabSignIn:"تسجيل الدخول",fullNameLabel:"الاسم الكامل",fullNamePlaceholder:"أدخل اسمك الكامل",emailLabel:"البريد الإلكتروني",emailPlaceholder:"أدخل بريدك الإلكتروني",whatsappLabel:"رقم الواتساب",whatsappPlaceholder:"أدخل رقم الواتساب الخاص بك",passwordLabel:"كلمة المرور",passwordPlaceholder:"أنشئ كلمة مرور (6 أحرف على الأقل)",confirmPasswordLabel:"تأكيد كلمة المرور",confirmPasswordPlaceholder:"أعد إدخال كلمة المرور",btnCreateAccount:"✦ إنشاء الحساب",btnSignIn:"→ تسجيل الدخول",alreadyHaveAccount:"هل لديك حساب بالفعل؟",dontHaveAccount:"ليس لديك حساب؟",linkSignIn:"تسجيل الدخول",linkSignUp:"إنشاء حساب",passwordsMismatch:"كلمات المرور غير متطابقة. يرجى التحقق مرة أخرى.",minLengthError:"يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",requiredError:"يرجى ملء جميع الحقول المطلوبة.",creatingAccount:"جارٍ إنشاء الحساب...",signingIn:"جارٍ تسجيل الدخول...",welcomeToast:"مرحباً بك في متجر أدوات الذكاء الاصطناعي",signedInToast:"تم تسجيل الدخول بنجاح!",signedOutToast:"تم تسجيل الخروج بنجاح."},account:{title:"تفاصيل الحساب",verified:"● حساب موثق",emailLabel:"البريد الإلكتروني",whatsappLabel:"رقم الواتساب",memberSince:"عضو منذ",signOutBtn:"تسجيل الخروج من الحساب"},toolDetails:{notFoundTitle:"الأداة غير موجودة",notFoundDesc:"الأداة التي تبحث عنها غير متوفرة حالياً أو تم إيقافها.",backToTools:"العودة لجميع الأدوات",buyNowWhatsApp:"الشراء عبر واتساب",visitWebsite:"زيارة الموقع الرسمي",overviewTab:"نظرة عامة",featuresTab:"الميزات والفوائد",howToUseTab:"طريقة الاستخدام والشرح",videoTutorial:"فيديو توضيحي",guaranteesSupport:"دعم مباشر ومخصص عبر واتساب",guaranteesActivation:"تفعيل فوري خلال أقل من 5 دقائق",guaranteesLicensing:"ترخيص برمجي أصلي وموثوق 100%",purchaseVerified:"رابط شراء معتمد: يحولك مباشرة إلى محادثة واتساب الرسمية.",similarTools:"أدوات ذكاء اصطناعي مشابهة في"},allTools:{headerTitle:"استكشف أدوات الذكاء الاصطناعي المختارة",headerSubtitle:"اكتشف وقارن وفعل اشتراكات البرامج الأصلية مع تفعيل فوري.",searchPlaceholder:"ابحث باسم الأداة أو ميزاتها...",allCategories:"الكل",sortPopular:"الأكثر شعبية",sortRating:"الأعلى تقييماً",sortPriceLow:"السعر: من الأقل للأعلى",sortPriceHigh:"السعر: من الأعلى للأقل",sortName:"أبجدياً",resultsCount:"عرض {count} أداة ذكاء اصطناعي",clearFilters:"مسح التصفية",loadMore:"تحميل المزيد من الأدوات",noResultsTitle:"لم نتمكن من العثور على أي أدوات مطابقة لبحثك",noResultsDesc:"جرب البحث بكلمات مختلفة أو اختر تصنيفاً آخر من القائمة أعلاه.",resetFilters:"إعادة ضبط التصفية"},footer:{desc:"المنصة الرائدة لاكتشاف وتفعيل وتطوير مهارات أدوات الذكاء الاصطناعي مع وصول فوري عبر واتساب.",exploreHeading:"استكشف",resourcesHeading:"المصادر",communityHeading:"المجتمع",allRightsReserved:"جميع الحقوق محفوظة. صُمم لرواد الذكاء الاصطناعي الحديث."}},kl={nav:{brand:"एआई टूल्स स्टोर",home:"होम",allTools:"सभी टूल्स",categories:"श्रेणियाँ",about:"हमारे बारे में",contact:"संपर्क करें",admin:"एडमिन",searchTitle:"टूल्स खोजें (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"व्हाट्सएप से जुड़ें",signIn:"साइन इन",signUp:"✦ साइन अप",account:"मेरा खाता",logout:"लॉग आउट",selectLanguage:"भाषा चुनें"},hero:{headlinePart1:"सर्वश्रेष्ठ और आधुनिक",headlineGradient:"एआई टूल्स",headlinePart2:"एक ही स्थान पर खोजें",desc:"अपनी उत्पादकता बढ़ाने, कार्यों को स्वचालित करने और भविष्य के निर्माण के लिए अत्याधुनिक एआई टूल्स का अन्वेषण करें।",searchPlaceholder:"एआई टूल्स खोजें...",searchSubmit:"टूल्स खोजें",exploreBtn:"टूल्स देखें",communityBtn:"कम्युनिटी से जुड़ें",trust1Title:"सत्यापित और सुरक्षित",trust1Desc:"गुणवत्तापूर्ण टूल्स जिन पर आप भरोसा कर सकते हैं",trust2Title:"तुरंत एक्सेस",trust2Desc:"कुछ ही सेकंड में शुरू करें",trust3Title:"किफायती कीमतें",trust3Desc:"पारदर्शी और उचित मूल्य"},categories:{badge:"कैटलॉग देखें",title:"श्रेणी के अनुसार एआई टूल्स खोजें",viewAll:"सभी श्रेणियाँ देखें",countLabel:"टूल्स"},featured:{badge:"विशेष चयन",title:"शक्तिशाली एआई टूल्स एक्सप्लोर करें",subtitle:"आपके वर्कफ़्लो को तेज़ और आसान बनाने के लिए चुने गए प्रीमियम टूल्स",viewAll:"सभी टूल्स देखें",emptyTitle:"Supabase डेटाबेस कनेक्टेड है",emptyDesc:"उत्पाद जोड़ने के लिए Supabase में स्कीमा चलाएं या एडमिन पैनल खोलें।",openAdmin:"एडमिन पैनल खोलें"},benefits:{badge:"एआई टूल्स स्टोर क्यों?",title:"एआई टूल्स स्टोर क्यों चुनें?",subtitle:"एआई टूल्स को खोजने, सक्रिय करने और सीखने का सबसे सरल और बेहतरीन समाधान।",b1Title:"चुनिंदा बेहतरीन टूल्स",b1Desc:"केवल उच्च गुणवत्ता और परीक्षण किए गए एआई टूल्स।",b2Title:"कदम-दर-कदम ट्यूटोरियल",b2Desc:"हर टूल का प्रभावी ढंग से उपयोग करना सीखें।",b3Title:"तुरंत एक्सेस और सहायता",b3Desc:"व्हाट्सएप पर तत्काल एक्टिवेशन और सहायता प्राप्त करें।",b4Title:"हमेशा अपडेटेड",b4Desc:"नियमित रूप से नए टूल्स और अपडेट प्राप्त करें।"},finalCta:{badge:"✦ एआई की शक्ति अनलॉक करें",title:"क्या आप एआई के भविष्य में प्रवेश करने के लिए तैयार हैं?",subtitle:"हजारों क्रिएटर्स और डेवलपर्स से जुड़ें जो आगे रहने के लिए एआई टूल्स स्टोर का उपयोग करते हैं।",getStarted:"✦ अभी शुरू करें",browseTools:"टूल्स देखें"},card:{buyNow:"अभी खरीदें",howToUse:"उपयोग विधि",viewDetails:"विवरण देखें",perMonth:"/माह",rating:"रेटिंग",users:"उपयोगकर्ता",saveFav:"पसंदीदा में जोड़ें",addedFavToast:"पसंदीदा सूची में जोड़ दिया गया!",removedFavToast:"पसंदीदा सूची से हटा दिया गया"},auth:{createAccountHeading:"अपना एआई टूल्स स्टोर खाता बनाएं",welcomeBackHeading:"एआई टूल्स स्टोर में पुनः स्वागत है",createAccountSub:"✦ हजारों इनोवेटर्स और क्रिएटर्स से जुड़ें।",signInSub:"✦ शक्तिशाली एआई टूल्स खोजने के लिए साइन इन करें।",tabSignUp:"साइन अप",tabSignIn:"साइन इन",fullNameLabel:"पूरा नाम",fullNamePlaceholder:"अपना पूरा नाम दर्ज करें",emailLabel:"ईमेल पता",emailPlaceholder:"अपना ईमेल दर्ज करें",whatsappLabel:"व्हाट्सएप नंबर",whatsappPlaceholder:"अपना व्हाट्सएप नंबर दर्ज करें",passwordLabel:"पासवर्ड",passwordPlaceholder:"पासवर्ड बनाएं (कम से कम 6 अक्षर)",confirmPasswordLabel:"पासवर्ड की पुष्टि करें",confirmPasswordPlaceholder:"पासवर्ड पुनः दर्ज करें",btnCreateAccount:"✦ खाता बनाएं",btnSignIn:"→ साइन इन करें",alreadyHaveAccount:"क्या पहले से खाता है?",dontHaveAccount:"क्या खाता नहीं है?",linkSignIn:"साइन इन करें",linkSignUp:"साइन अप करें",passwordsMismatch:"पासवर्ड मेल नहीं खाते। कृपया पुष्टि पासवर्ड जांचें।",minLengthError:"पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",requiredError:"कृपया सभी आवश्यक फ़ील्ड भरें।",creatingAccount:"खाता बनाया जा रहा है...",signingIn:"साइन इन किया जा रहा है...",welcomeToast:"एआई टूल्स स्टोर में आपका स्वागत है",signedInToast:"सफलतापूर्वक साइन इन किया गया!",signedOutToast:"सफलतापूर्वक साइन आउट किया गया।"},account:{title:"खाता विवरण",verified:"● सत्यापित खाता",emailLabel:"ईमेल पता",whatsappLabel:"व्हाट्सएप नंबर",memberSince:"सदस्यता तिथि",signOutBtn:"खाते से साइन आउट करें"},toolDetails:{notFoundTitle:"टूल नहीं मिला",notFoundDesc:"जो टूल आप ढूंढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है।",backToTools:"सभी टूल्स पर वापस जाएं",buyNowWhatsApp:"व्हाट्सएप से खरीदें",visitWebsite:"आधिकारिक वेबसाइट देखें",overviewTab:"अवलोकन",featuresTab:"विशेषताएं और लाभ",howToUseTab:"उपयोग विधि और ट्यूटोरियल",videoTutorial:"वीडियो वॉकथ्रू",guaranteesSupport:"सीधा व्हाट्सएप सपोर्ट",guaranteesActivation:"5 मिनट के भीतर तुरंत एक्टिवेशन",guaranteesLicensing:"100% सत्यापित वास्तविक सॉफ़्टवेयर लाइसेंस",purchaseVerified:"सत्यापित खरीद लिंक: सीधे आधिकारिक व्हाट्सएप पर रीडायरेक्ट करता है।",similarTools:"समान एआई टूल्स -"},allTools:{headerTitle:"हस्तनिर्मित एआई टूल्स एक्सप्लोर करें",headerSubtitle:"प्रीमियम सॉफ्टवेयर लाइसेंस खोजें, तुलना करें और तुरंत सक्रिय करें।",searchPlaceholder:"टूल के नाम या क्षमता से खोजें...",allCategories:"सभी",sortPopular:"सर्वाधिक लोकप्रिय",sortRating:"सर्वोच्च रेटेड",sortPriceLow:"कीमत: कम से अधिक",sortPriceHigh:"कीमत: अधिक से कम",sortName:"वर्णमाला क्रम",resultsCount:"{count} एआई टूल्स प्रदर्शित",clearFilters:"फ़िल्टर हटाएं",loadMore:"और टूल्स लोड करें",noResultsTitle:"आपकी खोज से मेल खाने वाला कोई टूल नहीं मिला",noResultsDesc:"कृपया किसी अन्य कीवर्ड से खोजें या ऊपर दी गई श्रेणी चुनें।",resetFilters:"फ़िल्टर रीसेट करें"},footer:{desc:"व्हाट्सएप के माध्यम से त्वरित पहुंच के साथ सत्यापित एआई टूल्स खोजने और सीखने का अग्रणी प्लेटफॉर्म।",exploreHeading:"अन्वेषण",resourcesHeading:"संसाधन",communityHeading:"कम्युनिटी",allRightsReserved:"सर्वाधिकार सुरक्षित। आधुनिक एआई अग्रदूतों के लिए निर्मित।"}},Sl={nav:{brand:"AI Tools Store",home:"Inicio",allTools:"Todas las Herramientas",categories:"Categorías",about:"Nosotros",contact:"Contacto",admin:"Admin",searchTitle:"Buscar Herramientas (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"Unirse a WhatsApp",signIn:"Iniciar Sesión",signUp:"✦ Registrarse",account:"Mi Cuenta",logout:"Cerrar Sesión",selectLanguage:"Seleccionar Idioma"},hero:{headlinePart1:"Descubre las Mejores",headlineGradient:"Herramientas de IA",headlinePart2:"en un Solo Lugar",desc:"Encuentra, explora y domina herramientas de IA de vanguardia para acelerar tu productividad, automatizar tareas y construir el futuro.",searchPlaceholder:"Buscar herramientas de IA...",searchSubmit:"Buscar Herramientas",exploreBtn:"Explorar Herramientas",communityBtn:"Únete a la Comunidad",trust1Title:"Confiable y Verificado",trust1Desc:"Herramientas de calidad garantizada",trust2Title:"Acceso Instantáneo",trust2Desc:"Comienza en cuestión de segundos",trust3Title:"Mejores Precios",trust3Desc:"Económico y transparente"},categories:{badge:"Explorar Catálogo",title:"Explorar Herramientas de IA por Categoría",viewAll:"Ver Todas las Categorías",countLabel:"Herramientas"},featured:{badge:"Selección Destacada",title:"Explora Potentes Herramientas de IA",subtitle:"Herramientas seleccionadas a mano para potenciar tu flujo de trabajo diario",viewAll:"Ver Todas las Herramientas",emptyTitle:"Base de Datos Supabase Conectada",emptyDesc:"Ejecuta supabase/schema.sql en el editor SQL para inicializar productos, o abre el Panel de Admin.",openAdmin:"Abrir Panel de Admin"},benefits:{badge:"¿Por qué AI Tools Store?",title:"¿Por qué Elegir AI Tools Store?",subtitle:"Todo lo que necesitas para descubrir, activar y dominar herramientas de IA sin fricción.",b1Title:"Herramientas Curadas",b1Desc:"Solo herramientas de alta calidad y verificadas.",b2Title:"Tutoriales Paso a Paso",b2Desc:"Aprende a usar cada herramienta de manera efectiva.",b3Title:"Acceso y Soporte Inmediato",b3Desc:"Obtén activación inmediata y asistencia vía WhatsApp.",b4Title:"Siempre Actualizado",b4Desc:"Descubre nuevas herramientas y mejoras periódicamente."},finalCta:{badge:"✦ Desbloquea Superpoderes con IA",title:"¿Listo para Explorar el Futuro de la IA?",subtitle:"Únete a miles de creadores, desarrolladores e innovadores que usan AI Tools Store.",getStarted:"✦ Comenzar Ahora",browseTools:"Explorar Herramientas"},card:{buyNow:"Comprar Ahora",howToUse:"Cómo Usar",viewDetails:"Ver Detalles",perMonth:"/mes",rating:"Calificación",users:"usuarios",saveFav:"Guardar en favoritos",addedFavToast:"¡Añadido a tus favoritos!",removedFavToast:"Eliminado de tus favoritos"},auth:{createAccountHeading:"Crea tu cuenta en AI Tools Store",welcomeBackHeading:"Bienvenido de nuevo a AI Tools Store",createAccountSub:"✦ Únete a miles de creadores, constructores e innovadores.",signInSub:"✦ Inicia sesión para continuar descubriendo potentes herramientas.",tabSignUp:"Registrarse",tabSignIn:"Iniciar Sesión",fullNameLabel:"Nombre Completo",fullNamePlaceholder:"Ingresa tu nombre completo",emailLabel:"Correo Electrónico",emailPlaceholder:"Ingresa tu correo electrónico",whatsappLabel:"Número de WhatsApp",whatsappPlaceholder:"Ingresa tu número de WhatsApp",passwordLabel:"Contraseña",passwordPlaceholder:"Crea una contraseña (mínimo 6 caracteres)",confirmPasswordLabel:"Confirmar Contraseña",confirmPasswordPlaceholder:"Confirma tu contraseña",btnCreateAccount:"✦ Crear Cuenta",btnSignIn:"→ Iniciar Sesión",alreadyHaveAccount:"¿Ya tienes una cuenta?",dontHaveAccount:"¿No tienes una cuenta?",linkSignIn:"Inicia sesión",linkSignUp:"Regístrate",passwordsMismatch:"Las contraseñas no coinciden. Por favor verifica de nuevo.",minLengthError:"La contraseña debe tener al menos 6 caracteres.",requiredError:"Por favor completa todos los campos requeridos.",creatingAccount:"Creando cuenta...",signingIn:"Iniciando sesión...",welcomeToast:"Bienvenido a AI Tools Store",signedInToast:"¡Inicio de sesión exitoso!",signedOutToast:"Sesión cerrada correctamente."},account:{title:"Detalles de la Cuenta",verified:"● Cuenta Verificada",emailLabel:"Correo Electrónico",whatsappLabel:"Número de WhatsApp",memberSince:"Miembro Desde",signOutBtn:"Cerrar Sesión de la Cuenta"},toolDetails:{notFoundTitle:"Herramienta No Encontrada",notFoundDesc:"La herramienta que buscas no existe o ha sido descontinuada.",backToTools:"Volver a Todas las Herramientas",buyNowWhatsApp:"Comprar vía WhatsApp",visitWebsite:"Visitar Sitio Oficial",overviewTab:"Resumen",featuresTab:"Características y Beneficios",howToUseTab:"Cómo Usar y Tutorial",videoTutorial:"Video Tutorial",guaranteesSupport:"Soporte directo y dedicado por WhatsApp",guaranteesActivation:"Activación instantánea en menos de 5 minutos",guaranteesLicensing:"Licencia de software 100% genuina y verificada",purchaseVerified:"Enlace de compra verificado: redirige directamente a WhatsApp.",similarTools:"Herramientas de IA Similares en"},allTools:{headerTitle:"Explora Herramientas de IA Seleccionadas",headerSubtitle:"Descubre, compara y adquiere licencias de software con activación inmediata.",searchPlaceholder:"Buscar por nombre o funcionalidad...",allCategories:"Todas",sortPopular:"Más Populares",sortRating:"Mejor Calificadas",sortPriceLow:"Precio: Menor a Mayor",sortPriceHigh:"Precio: Mayor a Menor",sortName:"Alfabético",resultsCount:"Mostrando {count} herramientas de IA",clearFilters:"Limpiar Filtros",loadMore:"Cargar Más Herramientas",noResultsTitle:"No se encontraron herramientas que coincidan con tu búsqueda",noResultsDesc:"Intenta buscar con otra palabra clave o selecciona otra categoría.",resetFilters:"Restablecer Filtros"},footer:{desc:"El mercado líder para descubrir, activar y dominar herramientas de IA con acceso instantáneo vía WhatsApp.",exploreHeading:"Explorar",resourcesHeading:"Recursos",communityHeading:"Comunidad",allRightsReserved:"Todos los derechos reservados. Creado para pioneros de la IA."}},xl={nav:{brand:"AI Tools Store",home:"Accueil",allTools:"Tous les Outils",categories:"Catégories",about:"À Propos",contact:"Contact",admin:"Admin",searchTitle:"Rechercher des outils (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"Rejoindre WhatsApp",signIn:"Connexion",signUp:"✦ Inscription",account:"Mon Compte",logout:"Déconnexion",selectLanguage:"Choisir la langue"},hero:{headlinePart1:"Découvrez les Meilleurs",headlineGradient:"Outils IA",headlinePart2:"en un Seul Endroit",desc:"Trouvez, explorez et maîtrisez des outils d’IA de pointe pour décupler votre productivité, automatiser vos flux et construire le futur.",searchPlaceholder:"Rechercher des outils IA...",searchSubmit:"Rechercher",exploreBtn:"Explorer les Outils",communityBtn:"Rejoindre la Communauté",trust1Title:"Vérifié & Fiable",trust1Desc:"Des outils de qualité certifiée",trust2Title:"Accès Instantané",trust2Desc:"Commencez en quelques secondes",trust3Title:"Meilleurs Prix",trust3Desc:"Tarifs transparents et abordables"},categories:{badge:"Catalogue",title:"Explorer les Outils IA par Catégorie",viewAll:"Voir Toutes les Catégories",countLabel:"Outils"},featured:{badge:"Sélection Exclusive",title:"Explorez des Outils IA Puissants",subtitle:"Une sélection rigoureuse pour propulser vos projets vers de nouveaux sommets",viewAll:"Voir Tous les Outils",emptyTitle:"Base de Données Supabase Connectée",emptyDesc:"Exécutez supabase/schema.sql dans Supabase pour importer les outils, ou ouvrez le panneau Admin.",openAdmin:"Ouvrir le Panneau Admin"},benefits:{badge:"Pourquoi AI Tools Store",title:"Pourquoi Choisir AI Tools Store ?",subtitle:"Tout ce dont vous avez besoin pour découvrir, activer et maîtriser l’IA sans effort.",b1Title:"Outils IA Sélectionnés",b1Desc:"Uniquement des solutions performantes et éprouvées.",b2Title:"Tutoriels Pas à Pas",b2Desc:"Apprenez à tirer le meilleur parti de chaque outil.",b3Title:"Accès Immédiat & Support",b3Desc:"Activation rapide et assistance directe sur WhatsApp.",b4Title:"Mises à Jour Constantes",b4Desc:"Découvrez de nouveaux outils et fonctionnalités régulièrement."},finalCta:{badge:"✦ Révélez Vos Superpouvoirs IA",title:"Prêt à Découvrir le Futur de l’IA ?",subtitle:"Rejoignez des milliers de créateurs, développeurs et entreprises qui innovent avec nous.",getStarted:"✦ Commencer Maintenant",browseTools:"Parcourir les Outils"},card:{buyNow:"Acheter",howToUse:"Tutoriel",viewDetails:"Détails",perMonth:"/mois",rating:"Note",users:"utilisateurs",saveFav:"Ajouter aux favoris",addedFavToast:"Ajouté à vos favoris !",removedFavToast:"Retiré des favoris"},auth:{createAccountHeading:"Créer votre compte AI Tools Store",welcomeBackHeading:"Bon retour sur AI Tools Store",createAccountSub:"✦ Rejoignez des milliers de créateurs et innovateurs.",signInSub:"✦ Connectez-vous pour continuer à explorer les meilleurs outils IA.",tabSignUp:"Inscription",tabSignIn:"Connexion",fullNameLabel:"Nom Complet",fullNamePlaceholder:"Entrez votre nom complet",emailLabel:"Adresse E-mail",emailPlaceholder:"Entrez votre e-mail",whatsappLabel:"Numéro WhatsApp",whatsappPlaceholder:"Entrez votre numéro WhatsApp",passwordLabel:"Mot de Passe",passwordPlaceholder:"Créez un mot de passe (min 6 caractères)",confirmPasswordLabel:"Confirmer le Mot de Passe",confirmPasswordPlaceholder:"Confirmez votre mot de passe",btnCreateAccount:"✦ Créer un Compte",btnSignIn:"→ Se Connecter",alreadyHaveAccount:"Vous avez déjà un compte ?",dontHaveAccount:"Pas encore de compte ?",linkSignIn:"Connexion",linkSignUp:"Inscription",passwordsMismatch:"Les mots de passe ne correspondent pas.",minLengthError:"Le mot de passe doit comporter au moins 6 caractères.",requiredError:"Veuillez remplir tous les champs obligatoires.",creatingAccount:"Création du compte...",signingIn:"Connexion en cours...",welcomeToast:"Bienvenue sur AI Tools Store",signedInToast:"Connexion réussie !",signedOutToast:"Déconnexion réussie."},account:{title:"Détails du Compte",verified:"● Compte Vérifié",emailLabel:"Adresse E-mail",whatsappLabel:"Numéro WhatsApp",memberSince:"Membre Depuis",signOutBtn:"Se Déconnecter"},toolDetails:{notFoundTitle:"Outil Introuvable",notFoundDesc:"L’outil demandé n’existe pas ou n’est plus disponible.",backToTools:"Retour aux Outils",buyNowWhatsApp:"Acheter via WhatsApp",visitWebsite:"Site Officiel",overviewTab:"Aperçu",featuresTab:"Fonctionnalités",howToUseTab:"Guide d’Utilisation",videoTutorial:"Tutoriel Vidéo",guaranteesSupport:"Support direct dédié via WhatsApp",guaranteesActivation:"Activation garantie en moins de 5 minutes",guaranteesLicensing:"Licence logicielle 100% officielle et vérifiée",purchaseVerified:"Lien d’achat vérifié : redirection sécurisée vers WhatsApp.",similarTools:"Outils IA similaires dans"},allTools:{headerTitle:"Explorez Notre Sélection d’Outils IA",headerSubtitle:"Comparez, découvrez et obtenez vos accès avec activation instantanée.",searchPlaceholder:"Rechercher par nom ou fonctionnalité...",allCategories:"Tous",sortPopular:"Plus Populaires",sortRating:"Mieux Notés",sortPriceLow:"Prix : Croissant",sortPriceHigh:"Prix : Décroissant",sortName:"Alphabétique",resultsCount:"{count} outils IA affichés",clearFilters:"Effacer les Filtres",loadMore:"Charger Plus d’Outils",noResultsTitle:"Aucun outil correspondant à votre recherche",noResultsDesc:"Essayez avec d’autres mots-clés ou sélectionnez une autre catégorie.",resetFilters:"Réinitialiser"},footer:{desc:"La plateforme de référence pour découvrir, activer et maîtriser les meilleurs outils d’IA avec assistance instantanée WhatsApp.",exploreHeading:"Explorer",resourcesHeading:"Ressources",communityHeading:"Communauté",allRightsReserved:"Tous droits réservés. Conçu pour les bâtisseurs de demain."}},_l={nav:{brand:"AI Tools Store",home:"Startseite",allTools:"Alle Tools",categories:"Kategorien",about:"Über uns",contact:"Kontakt",admin:"Admin",searchTitle:"Tools suchen (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"WhatsApp beitreten",signIn:"Anmelden",signUp:"✦ Registrieren",account:"Mein Konto",logout:"Abmelden",selectLanguage:"Sprache wählen"},hero:{headlinePart1:"Entdecke die besten",headlineGradient:"KI-Tools",headlinePart2:"an einem Ort",desc:"Finde, teste und meistere bahnbrechende KI-Tools, um deine Produktivität zu steigern, Abläufe zu automatisieren und die Zukunft zu gestalten.",searchPlaceholder:"KI-Tools durchsuchen...",searchSubmit:"Tools suchen",exploreBtn:"Tools erkunden",communityBtn:"Community beitreten",trust1Title:"Geprüft & Sicher",trust1Desc:"Hochwertige Tools mit Qualitätsgarantie",trust2Title:"Sofortiger Zugriff",trust2Desc:"In wenigen Sekunden startklar",trust3Title:"Beste Preise",trust3Desc:"Faire & transparente Konditionen"},categories:{badge:"Katalog durchstöbern",title:"KI-Tools nach Kategorien entdecken",viewAll:"Alle Kategorien ansehen",countLabel:"Tools"},featured:{badge:"Empfohlene Auswahl",title:"Leistungsstarke KI-Tools entdecken",subtitle:"Handverlesene Softwarelösungen zur Optimierung deiner Arbeitsabläufe",viewAll:"Alle Tools anzeigen",emptyTitle:"Supabase-Datenbank verbunden",emptyDesc:"Führe schema.sql in Supabase aus, um Produkte anzulegen, oder öffne das Admin-Panel.",openAdmin:"Admin-Panel öffnen"},benefits:{badge:"Warum AI Tools Store",title:"Warum AI Tools Store wählen?",subtitle:"Alles, was du brauchst, um moderne KI-Tools nahtlos zu entdecken und zu nutzen.",b1Title:"Kuratierte KI-Tools",b1Desc:"Nur sorgfältig geprüfte Spitzenwerkzeuge.",b2Title:"Schritt-für-Schritt-Anleitungen",b2Desc:"Lerne den optimalen Einsatz für jedes Tool.",b3Title:"Sofortzugang & WhatsApp-Support",b3Desc:"Schnelle Freischaltung und direkte Unterstützung.",b4Title:"Stets aktuell",b4Desc:"Regelmäßig neue Tools und exklusive Updates."},finalCta:{badge:"✦ KI-Superkräfte freischalten",title:"Bereit für die Zukunft der künstlichen Intelligenz?",subtitle:"Schließe dich tausenden Entwicklern und Innovatoren an, die AI Tools Store nutzen.",getStarted:"✦ Jetzt starten",browseTools:"Tools durchstöbern"},card:{buyNow:"Jetzt kaufen",howToUse:"Anleitung",viewDetails:"Details ansehen",perMonth:"/Monat",rating:"Bewertung",users:"Nutzer",saveFav:"Zu Favoriten hinzufügen",addedFavToast:"Zu Favoriten hinzugefügt!",removedFavToast:"Aus Favoriten entfernt"},auth:{createAccountHeading:"Erstelle dein AI Tools Store Konto",welcomeBackHeading:"Willkommen zurück bei AI Tools Store",createAccountSub:"✦ Schließe dich tausenden Kreativen und Entwicklern an.",signInSub:"✦ Melde dich an, um innovative KI-Tools zu nutzen.",tabSignUp:"Registrieren",tabSignIn:"Anmelden",fullNameLabel:"Vollständiger Name",fullNamePlaceholder:"Name eingeben",emailLabel:"E-Mail-Adresse",emailPlaceholder:"E-Mail-Adresse eingeben",whatsappLabel:"WhatsApp-Nummer",whatsappPlaceholder:"WhatsApp-Nummer eingeben",passwordLabel:"Passwort",passwordPlaceholder:"Passwort erstellen (mind. 6 Zeichen)",confirmPasswordLabel:"Passwort bestätigen",confirmPasswordPlaceholder:"Passwort wiederholen",btnCreateAccount:"✦ Konto erstellen",btnSignIn:"→ Anmelden",alreadyHaveAccount:"Bereits registriert?",dontHaveAccount:"Noch kein Konto?",linkSignIn:"Anmelden",linkSignUp:"Registrieren",passwordsMismatch:"Passwörter stimmen nicht überein.",minLengthError:"Das Passwort muss mindestens 6 Zeichen lang sein.",requiredError:"Bitte fülle alle Pflichtfelder aus.",creatingAccount:"Konto wird erstellt...",signingIn:"Anmeldung läuft...",welcomeToast:"Willkommen bei AI Tools Store",signedInToast:"Erfolgreich angemeldet!",signedOutToast:"Erfolgreich abgemeldet."},account:{title:"Kontodetails",verified:"● Verifiziertes Konto",emailLabel:"E-Mail-Adresse",whatsappLabel:"WhatsApp-Nummer",memberSince:"Mitglied seit",signOutBtn:"Abmelden"},toolDetails:{notFoundTitle:"Tool nicht gefunden",notFoundDesc:"Das gesuchte Tool existiert nicht oder ist derzeit nicht verfügbar.",backToTools:"Zurück zur Übersicht",buyNowWhatsApp:"Über WhatsApp kaufen",visitWebsite:"Offizielle Website besuchen",overviewTab:"Überblick",featuresTab:"Funktionen & Vorteile",howToUseTab:"Bedienungsanleitung",videoTutorial:"Video-Tutorial",guaranteesSupport:"Direkter WhatsApp-Concierge-Support",guaranteesActivation:"Sofortige Aktivierung in unter 5 Minuten",guaranteesLicensing:"100% verifizierte Original-Lizenz",purchaseVerified:"Verifizierter Kauflink: Leitet direkt zu WhatsApp weiter.",similarTools:"Ähnliche KI-Tools in"},allTools:{headerTitle:"Entdecke ausgewählte KI-Tools",headerSubtitle:"Vergleiche und aktiviere Premium-Softwarelizenzen im Handumdrehen.",searchPlaceholder:"Nach Name oder Funktion suchen...",allCategories:"Alle",sortPopular:"Beliebteste",sortRating:"Beste Bewertung",sortPriceLow:"Preis: Aufsteigend",sortPriceHigh:"Preis: Absteigend",sortName:"Alphabetisch",resultsCount:"{count} KI-Tools angezeigt",clearFilters:"Filter zurücksetzen",loadMore:"Mehr Tools laden",noResultsTitle:"Keine Tools gefunden",noResultsDesc:"Probiere andere Suchbegriffe oder wähle eine andere Kategorie.",resetFilters:"Filter zurücksetzen"},footer:{desc:"Der führende Marktplatz zum Entdecken, Aktivieren und Erlernen moderner KI-Tools mit WhatsApp-Support.",exploreHeading:"Erkunden",resourcesHeading:"Ressourcen",communityHeading:"Community",allRightsReserved:"Alle Rechte vorbehalten. Entwickelt für KI-Pioniere."}},Al={nav:{brand:"AI Tools Store",home:"首页",allTools:"所有工具",categories:"分类",about:"关于我们",contact:"联系我们",admin:"管理后台",searchTitle:"搜索工具 (Ctrl+K)",searchKbd:"⌘K",joinWhatsApp:"加入 WhatsApp",signIn:"登录",signUp:"✦ 注册",account:"我的账户",logout:"退出登录",selectLanguage:"选择语言"},hero:{headlinePart1:"一站式探索前沿",headlineGradient:"AI 神器与工具",headlinePart2:"赋能未来",desc:"发现、探索并掌握顶尖人工智能工具，倍增您的工作效率，实现业务自动化，引领智能新时代。",searchPlaceholder:"搜索 AI 工具...",searchSubmit:"搜索工具",exploreBtn:"探索全部工具",communityBtn:"加入官方社群",trust1Title:"官方正版验证",trust1Desc:"精选高品质、值得信赖的工具",trust2Title:"即时极速开通",trust2Desc:"数秒内即可激活使用",trust3Title:"高性价比优惠",trust3Desc:"透明公开、实惠透明的价格"},categories:{badge:"分类目录",title:"按分类浏览 AI 工具",viewAll:"查看所有分类",countLabel:"款工具"},featured:{badge:"精选推荐",title:"探索强大的 AI 效率工具",subtitle:"经过严选与实测的高效工具，全面升级您的工作流",viewAll:"查看所有工具",emptyTitle:"已连接 Supabase 数据库",emptyDesc:"在 Supabase SQL 编辑器中运行 schema.sql 以导入工具数据，或进入管理后台。",openAdmin:"打开管理后台"},benefits:{badge:"为什么选择我们",title:"为什么选择 AI Tools Store？",subtitle:"助您轻松发掘、激活和掌握人工智能全生态工具，毫无阻碍。",b1Title:"精选前沿 AI 工具",b1Desc:"仅收录高质量、通过严格测试的 AI 软件。",b2Title:"保姆级实操教程",b2Desc:"手把手教您高效发挥每一款工具的最大价值。",b3Title:"即时交付与专属客服",b3Desc:"通过 WhatsApp 获得急速激活与 1 对 1 咨询。",b4Title:"持续同步更新",b4Desc:"紧跟全球 AI 浪潮，定期上线全新工具和功能。"},finalCta:{badge:"✦ 开启 AI 超能力",title:"准备好拥抱人工智能的未来了吗？",subtitle:"与成千上万的创作者、开发者与先锋团队一同使用 AI Tools Store 保持领先。",getStarted:"✦ 立即开启",browseTools:"浏览工具"},card:{buyNow:"立即购买",howToUse:"使用教程",viewDetails:"查看详情",perMonth:"/月",rating:"评分",users:"位用户",saveFav:"收藏工具",addedFavToast:"已成功添加至收藏夹！",removedFavToast:"已从收藏夹中移除"},auth:{createAccountHeading:"创建您的 AI Tools Store 账户",welcomeBackHeading:"欢迎回到 AI Tools Store",createAccountSub:"✦ 与数万名创作者、开发者和先驱者同行。",signInSub:"✦ 登录以继续探索更多强大 AI 工具。",tabSignUp:"注册",tabSignIn:"登录",fullNameLabel:"姓名",fullNamePlaceholder:"输入您的真实姓名",emailLabel:"电子邮箱",emailPlaceholder:"输入您的电子邮箱",whatsappLabel:"WhatsApp 电话",whatsappPlaceholder:"输入您的 WhatsApp 手机号",passwordLabel:"密码",passwordPlaceholder:"设置密码（至少 6 位字符）",confirmPasswordLabel:"确认密码",confirmPasswordPlaceholder:"请再次输入密码",btnCreateAccount:"✦ 立即注册",btnSignIn:"→ 登录",alreadyHaveAccount:"已有账户？",dontHaveAccount:"还没有账户？",linkSignIn:"直接登录",linkSignUp:"免费注册",passwordsMismatch:"两次输入的密码不一致，请核对。",minLengthError:"密码长度至少需为 6 个字符。",requiredError:"请填写所有必填字段。",creatingAccount:"正在创建账户...",signingIn:"正在登录...",welcomeToast:"欢迎来到 AI Tools Store",signedInToast:"登录成功！",signedOutToast:"已成功退出登录。"},account:{title:"账户信息",verified:"● 官方认证账户",emailLabel:"电子邮箱",whatsappLabel:"WhatsApp 电话",memberSince:"注册时间",signOutBtn:"退出账户"},toolDetails:{notFoundTitle:"未找到该工具",notFoundDesc:"您访问的工具不存在或已下架。",backToTools:"返回所有工具",buyNowWhatsApp:"通过 WhatsApp 购买",visitWebsite:"访问官方网站",overviewTab:"概览",featuresTab:"核心功能与优势",howToUseTab:"使用教程与技巧",videoTutorial:"视频演示",guaranteesSupport:"专属 WhatsApp 1 对 1 客服支持",guaranteesActivation:"5 分钟内极速授权激活",guaranteesLicensing:"100% 正版官方授权保障",purchaseVerified:"官方认证购买通道：直接转接至 WhatsApp 顾问。",similarTools:"更多同类 AI 工具："},allTools:{headerTitle:"探索精选 AI 工具库",headerSubtitle:"发现、对比并立即解锁顶级正版 AI 软件授权与极速开通服务。",searchPlaceholder:"输入工具名称或功能特性进行搜索...",allCategories:"全部",sortPopular:"最受欢迎",sortRating:"最高评分",sortPriceLow:"价格：从低到高",sortPriceHigh:"价格：从高到低",sortName:"名称字母排序",resultsCount:"当前显示 {count} 款 AI 工具",clearFilters:"清空筛选",loadMore:"加载更多工具",noResultsTitle:"未找到符合搜索条件的工具",noResultsDesc:"请尝试更换关键词搜索，或在上方选择不同的类别。",resetFilters:"重置筛选"},footer:{desc:"领先的前沿 AI 工具发现、激活与学习平台，提供极速 WhatsApp 咨询开通支持。",exploreHeading:"探索",resourcesHeading:"资源指南",communityHeading:"交流社区",allRightsReserved:"版权所有。专为现代 AI 先锋创作者打造。"}},Gt={en:yl,ur:bl,ar:wl,hi:kl,es:Sl,fr:xl,de:_l,zh:Al},El={ur:{"writegen-ai":{name:"رائٹ جین اے آئی",tagline:"اعلیٰ معیار کا مواد، بلاگ اور کاپی سیکنڈز میں لکھیں",description:"جدید ترین اے آئی ٹیکنالوجی کی مدد سے بلاگ پوسٹس، مارکیٹنگ کاپی، ای میلز اور سوشل میڈیا مواد تیار کریں۔ تیز، مؤثر اور 100 فیصد اصل تحریر۔"},"artify-studio":{name:"آرٹیفائی اسٹوڈیو",tagline:"اپنے تخیل کو حیرت انگیز ڈیجیٹل شاہکاروں میں تبدیل کریں",description:"جدید نیورل آرٹ جنریٹر جو آپ کے خیالات کو سیکنڈوں میں شاندار تصاویر اور ویژولز میں تبدیل کر دیتا ہے۔"},"codepilot-ai":{name:"کوڈ پائلٹ اے آئی",tagline:"آپ کا ذہین پروگرامنگ پارٹنر اور کوڈ جنریٹر",description:"کوڈ جنریشن، غلطیوں کی اصلاح اور آٹومیشن کے ذریعے اپنی کوڈنگ کی رفتار کو 10 گنا تیز کریں۔ تمام جدید زبانوں کے لیے تیار۔"}},ar:{"writegen-ai":{name:"رايت جين للذكاء الاصطناعي",tagline:"أنشئ محتوى ومقالات إبداعية عالية الجودة في ثوانٍ",description:"أداة كتابة احترافية بالذكاء الاصطناعي لكتابة المقالات، والنصوص التسويقية، ورسائل البريد الإلكتروني بسرعة ودقة متناهية."},"artify-studio":{name:"استوديو أرتيفاي",tagline:"حول خيالك وأفكارك إلى أعمال فنية بصرية مذهلة",description:"منشئ فنون بصرية مدعوم بالذكاء الاصطناعي التوليدي لإنشاء تصاميم وصور فائقة الجودة في لمح البصر."},"codepilot-ai":{name:"كود بايلوت الذكي",tagline:"مساعد البرمجة الذكي لتسريع كتابة وتصحيح الأكواد",description:"اكتب كوداً نظيفاً، واكتشف الأخطاء البرمجية تلقائياً، وضاعف سرعتك البرمجية بفضل نماذج الذكاء الاصطناعي المتطورة."}},hi:{"writegen-ai":{name:"राइटजेन एआई",tagline:"सेकंडों में उच्च गुणवत्ता वाली सामग्री और ब्लॉग लिखें",description:"उन्नत एआई तकनीक से ब्लॉग पोस्ट, मार्केटिंग कॉपी, ईमेल और सोशल मीडिया सामग्री तुरंत तैयार करें।"},"artify-studio":{name:"आर्टिफ़ाई स्टूडियो",tagline:"अपनी कल्पना को शानदार डिजिटल कलाकृतियों में बदलें",description:"शक्तिशाली न्यूरल आर्ट जनरेटर जो आपके विचारों को सेकंडों में आकर्षक कला और तस्वीरों में बदल देता है।"},"codepilot-ai":{name:"कोडपायलट एआई",tagline:"आपका बुद्धिमान प्रोग्रामिंग सहायक और कोड जनरेटर",description:"कोड जनरेशन, बग फिक्सिंग और ऑटोमेशन के साथ अपनी कोडिंग गति को 10 गुना तेज करें।"}},es:{"writegen-ai":{name:"WriteGen AI",tagline:"Crea contenido y artículos de alta calidad en segundos",description:"Asistente de escritura de IA para generar publicaciones de blog, textos publicitarios y correos con máxima velocidad y creatividad."},"artify-studio":{name:"Artify Studio",tagline:"Transforma tu imaginación en impresionante arte digital",description:"Generador de imágenes y arte impulsado por IA que convierte texto en obras de arte de alta fidelidad al instante."},"codepilot-ai":{name:"CodePilot AI",tagline:"Tu copiloto inteligente para escribir y depurar código",description:"Acelera tu desarrollo de software con autocompletado inteligente, detección de errores y generación de código multifuncional."}}},qs="ai_tools_preferred_language",qr=new Set;function Tl(){try{const r=localStorage.getItem(qs);if(r&&Lt(r))return r;const e=(navigator.language||navigator.userLanguage||"en").split("-")[0].toLowerCase();if(Lt(e))return e}catch{}return"en"}let ht=Tl();function Hs(r=ht){return vl.includes(r.toLowerCase())}function Yr(){return ht}function Fs(r){return qr.add(r),()=>qr.delete(r)}function m(r,e={}){const t=Gt[ht]||Gt.en;function i(n,a){if(!(!n||typeof n!="object"))return a.split(".").reduce((o,l)=>o&&o[l]!==void 0?o[l]:void 0,n)}let s=i(t,r);return s===void 0&&t!==Gt.en&&(s=i(Gt.en,r)),s===void 0?r:typeof s!="string"?s:s.replace(/\{(\w+)\}/g,(n,a)=>e[a]!==void 0?e[a]:n)}function Ks(r){if(typeof document>"u")return;const e=Hs(r),t=document.documentElement,i=document.body;!t||!i||(t.setAttribute("lang",r),t.setAttribute("dir",e?"rtl":"ltr"),e?(t.classList.add("rtl"),i.classList.add("rtl-layout")):(t.classList.remove("rtl"),i.classList.remove("rtl-layout")),r==="ur"?(t.classList.add("lang-ur"),t.classList.remove("lang-ar")):r==="ar"?(t.classList.add("lang-ar"),t.classList.remove("lang-ur")):t.classList.remove("lang-ur","lang-ar"))}async function Cl(r){Lt(r)||(console.warn(`[i18n] Language '${r}' not recognized, falling back to 'en'.`),r="en"),ht=r;try{localStorage.setItem(qs,r)}catch(e){console.warn("[i18n] Could not persist language to localStorage:",e)}Ks(r);try{const e=H.getCurrentUser();e&&e.id&&F&&F.from("profiles").update({preferred_language:r}).eq("id",e.id).then(()=>{}).catch(()=>{})}catch{}return qr.forEach(e=>{try{e(r,Hs(r))}catch(t){console.error("[i18n] Error in language listener:",t)}}),r}function Ws(r){var t;if(!r)return r;const e=(t=El[ht])==null?void 0:t[r.slug];return e?{...r,name:e.name||r.name,tagline:e.tagline||r.tagline,description:e.description||r.description}:r}typeof document<"u"&&Ks(ht);const Hr=[{name:"Pakistan",code:"+92",iso:"PK",flag:"🇵🇰"},{name:"India",code:"+91",iso:"IN",flag:"🇮🇳"},{name:"United Arab Emirates",code:"+971",iso:"AE",flag:"🇦🇪"},{name:"Saudi Arabia",code:"+966",iso:"SA",flag:"🇸🇦"},{name:"United States",code:"+1",iso:"US",flag:"🇺🇸"},{name:"United Kingdom",code:"+44",iso:"GB",flag:"🇬🇧"},{name:"Canada",code:"+1",iso:"CA",flag:"🇨🇦"},{name:"Australia",code:"+61",iso:"AU",flag:"🇦🇺"},{name:"Germany",code:"+49",iso:"DE",flag:"🇩🇪"},{name:"Oman",code:"+968",iso:"OM",flag:"🇴🇲"},{name:"Qatar",code:"+974",iso:"QA",flag:"🇶🇦"},{name:"Kuwait",code:"+965",iso:"KW",flag:"🇰🇼"},{name:"Bahrain",code:"+973",iso:"BH",flag:"🇧🇭"},{name:"Turkey",code:"+90",iso:"TR",flag:"🇹🇷"},{name:"Bangladesh",code:"+880",iso:"BD",flag:"🇧🇩"},{name:"Sri Lanka",code:"+94",iso:"LK",flag:"🇱🇰"},{name:"Nepal",code:"+977",iso:"NP",flag:"🇳🇵"},{name:"Afghanistan",code:"+93",iso:"AF",flag:"🇦🇫"},{name:"Malaysia",code:"+60",iso:"MY",flag:"🇲🇾"},{name:"Singapore",code:"+65",iso:"SG",flag:"🇸🇬"},{name:"Indonesia",code:"+62",iso:"ID",flag:"🇮🇩"},{name:"Philippines",code:"+63",iso:"PH",flag:"🇵🇭"},{name:"Thailand",code:"+66",iso:"TH",flag:"🇹🇭"},{name:"Vietnam",code:"+84",iso:"VN",flag:"🇻🇳"},{name:"China",code:"+86",iso:"CN",flag:"🇨🇳"},{name:"Hong Kong",code:"+852",iso:"HK",flag:"🇭🇰"},{name:"Japan",code:"+81",iso:"JP",flag:"🇯🇵"},{name:"South Korea",code:"+82",iso:"KR",flag:"🇰🇷"},{name:"France",code:"+33",iso:"FR",flag:"🇫🇷"},{name:"Italy",code:"+39",iso:"IT",flag:"🇮🇹"},{name:"Spain",code:"+34",iso:"ES",flag:"🇪🇸"},{name:"Netherlands",code:"+31",iso:"NL",flag:"🇳🇱"},{name:"Switzerland",code:"+41",iso:"CH",flag:"🇨🇭"},{name:"Sweden",code:"+46",iso:"SE",flag:"🇸🇪"},{name:"Norway",code:"+47",iso:"NO",flag:"🇳🇴"},{name:"Denmark",code:"+45",iso:"DK",flag:"🇩🇰"},{name:"Ireland",code:"+353",iso:"IE",flag:"🇮🇪"},{name:"Belgium",code:"+32",iso:"BE",flag:"🇧🇪"},{name:"Austria",code:"+43",iso:"AT",flag:"🇦🇹"},{name:"Portugal",code:"+351",iso:"PT",flag:"🇵🇹"},{name:"Poland",code:"+48",iso:"PL",flag:"🇵🇱"},{name:"Greece",code:"+30",iso:"GR",flag:"🇬🇷"},{name:"Czech Republic",code:"+420",iso:"CZ",flag:"🇨🇿"},{name:"Hungary",code:"+36",iso:"HU",flag:"🇭🇺"},{name:"Romania",code:"+40",iso:"RO",flag:"🇷🇴"},{name:"Russia",code:"+7",iso:"RU",flag:"🇷🇺"},{name:"Ukraine",code:"+380",iso:"UA",flag:"🇺🇦"},{name:"Egypt",code:"+20",iso:"EG",flag:"🇪🇬"},{name:"South Africa",code:"+27",iso:"ZA",flag:"🇿🇦"},{name:"Nigeria",code:"+234",iso:"NG",flag:"🇳🇬"},{name:"Kenya",code:"+254",iso:"KE",flag:"🇰🇪"},{name:"Morocco",code:"+212",iso:"MA",flag:"🇲🇦"},{name:"Algeria",code:"+213",iso:"DZ",flag:"🇩🇿"},{name:"Tunisia",code:"+216",iso:"TN",flag:"🇹🇳"},{name:"Jordan",code:"+962",iso:"JO",flag:"🇯🇴"},{name:"Lebanon",code:"+961",iso:"LB",flag:"🇱🇧"},{name:"Iraq",code:"+964",iso:"IQ",flag:"🇮🇶"},{name:"Yemen",code:"+967",iso:"YE",flag:"🇾🇪"},{name:"Ghana",code:"+233",iso:"GH",flag:"🇬🇭"},{name:"Tanzania",code:"+255",iso:"TZ",flag:"🇹🇿"},{name:"Uganda",code:"+256",iso:"UG",flag:"🇺🇬"},{name:"Ethiopia",code:"+251",iso:"ET",flag:"🇪🇹"},{name:"New Zealand",code:"+64",iso:"NZ",flag:"🇳🇿"},{name:"Brazil",code:"+55",iso:"BR",flag:"🇧🇷"},{name:"Mexico",code:"+52",iso:"MX",flag:"🇲🇽"},{name:"Argentina",code:"+54",iso:"AR",flag:"🇦🇷"},{name:"Colombia",code:"+57",iso:"CO",flag:"🇨🇴"},{name:"Chile",code:"+56",iso:"CL",flag:"🇨🇱"},{name:"Peru",code:"+51",iso:"PE",flag:"🇵🇪"},{name:"Venezuela",code:"+58",iso:"VE",flag:"🇻🇪"},{name:"Cyprus",code:"+357",iso:"CY",flag:"🇨🇾"},{name:"Maldives",code:"+960",iso:"MV",flag:"🇲🇻"},{name:"Mauritius",code:"+230",iso:"MU",flag:"🇲🇺"},{name:"Azerbaijan",code:"+994",iso:"AZ",flag:"🇦🇿"},{name:"Kazakhstan",code:"+7",iso:"KZ",flag:"🇰🇿"},{name:"Uzbekistan",code:"+998",iso:"UZ",flag:"🇺🇿"}];function as(r){if(!r)return null;const e=r.toLowerCase().trim();return Hr.find(t=>t.name.toLowerCase()===e||t.code===e||t.iso.toLowerCase()===e||t.name.toLowerCase().includes(e))||null}function Jt(){const r=document.getElementById("auth-modal-backdrop");r&&(r.classList.add("fade-out"),setTimeout(()=>{try{r.remove()}catch{}},150))}function mr(r={}){if(document.getElementById("auth-modal-backdrop")){const y=(r.defaultTab||"signin")==="signin"?document.getElementById("tab-btn-signin"):document.getElementById("tab-btn-signup");y&&y.click();return}const t=document.getElementById("modal-root")||document.body;let i=r.defaultTab||"signin";const s=r.onAuthenticated||null;let n="",a="",o="",l=H.getUserCountry()||"Pakistan",c=as(l)||Hr[0];const d=document.createElement("div");d.className="modal-backdrop auth-backdrop-fade",d.id="auth-modal-backdrop";function u(){const v=i==="signup";return`
      <div class="auth-modal-card" onclick="event.stopPropagation();">
        <!-- Ambient Radial Glow Backdrop -->
        <div class="auth-card-ambient-glow"></div>

        <!-- Close Button -->
        <button type="button" id="auth-modal-close" class="auth-close-btn" aria-label="Close modal">&times;</button>

        <!-- Top Pill Toggle: [ Sign In ] [ Sign Up ] -->
        <div class="auth-toggle-pill-container" role="tablist">
          <button type="button" id="tab-btn-signin" class="auth-toggle-pill-btn ${v?"":"active"}" role="tab" aria-selected="${!v}">
            ${m("auth.tabSignIn")}
          </button>
          <button type="button" id="tab-btn-signup" class="auth-toggle-pill-btn ${v?"active":""}" role="tab" aria-selected="${v}">
            ${m("auth.tabSignUp")}
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
            ${m(v?"auth.createAccountHeading":"auth.welcomeBackHeading")}
          </h2>
          <p class="auth-subtitle">
            ${m(v?"auth.createAccountSub":"auth.signInSub")}
          </p>
        </div>

        <!-- Error Notification Banner -->
        <div id="auth-error-banner" class="auth-error-box" style="display: none;"></div>

        <!-- Authentication Form -->
        <form id="auth-main-form" autocomplete="on">
          ${v?`
            <!-- Full Name -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-fullname">${m("auth.fullNameLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input 
                  type="text" 
                  id="auth-fullname" 
                  class="auth-input-field" 
                  placeholder="${m("auth.fullNamePlaceholder")}" 
                  value="${a}"
                  required 
                  autocomplete="name"
                />
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-email">${m("auth.emailLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input 
                  type="email" 
                  id="auth-email" 
                  class="auth-input-field" 
                  placeholder="${m("auth.emailPlaceholder")}" 
                  value="${n}"
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
                <label class="auth-field-label" for="auth-whatsapp" style="margin-bottom: 0;">${m("auth.whatsappLabel")}</label>
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
                    placeholder="${m("auth.whatsappPlaceholder")}" 
                    value="${o}"
                    required 
                    autocomplete="tel"
                  />
                </div>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-password">${m("auth.passwordLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-password" 
                  class="auth-input-field" 
                  placeholder="${m("auth.passwordPlaceholder")}" 
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
              <label class="auth-field-label" for="auth-confirm-password">${m("auth.confirmPasswordLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-confirm-password" 
                  class="auth-input-field" 
                  placeholder="${m("auth.confirmPasswordPlaceholder")}" 
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
              <span>${m("auth.btnCreateAccount")}</span>
            </button>

            <!-- Switch Link -->
            <div class="auth-bottom-switch-row">
              <span>${m("auth.alreadyHaveAccount")}</span>
              <button type="button" id="switch-to-signin-link" class="auth-switch-text-btn">${m("auth.linkSignIn")}</button>
            </div>
            `:`
            <!-- Sign In Email or Phone -->
            <div class="form-group">
              <label class="auth-field-label" for="auth-email">${m("auth.emailLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input 
                  type="text" 
                  id="auth-email" 
                  class="auth-input-field" 
                  placeholder="${m("auth.emailPlaceholder")}" 
                  value="${n}"
                  required 
                  autocomplete="username"
                  autofocus
                />
              </div>
            </div>

            <!-- Sign In Password -->
            <div class="form-group" style="margin-bottom: 2rem;">
              <label class="auth-field-label" for="auth-password">${m("auth.passwordLabel")}</label>
              <div class="auth-input-wrapper">
                <svg class="auth-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  id="auth-password" 
                  class="auth-input-field" 
                  placeholder="${m("auth.passwordPlaceholder")}" 
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
              <span>${m("auth.btnSignIn")}</span>
            </button>

            <!-- Switch Link -->
            <div class="auth-bottom-switch-row">
              <span>${m("auth.dontHaveAccount")}</span>
              <button type="button" id="switch-to-signup-link" class="auth-switch-text-btn">${m("auth.linkSignUp")}</button>
            </div>
            `}
        </form>
      </div>
    `}function h(){const v=d.querySelector("#auth-email");v&&(n=v.value.trim());const y=d.querySelector("#auth-fullname");y&&(a=y.value.trim());const w=d.querySelector("#auth-whatsapp");w&&(o=w.value.trim());const S=d.querySelector("#auth-country");S&&(l=S.value)}function p(v){h(),i=v,f();const y=d.querySelector(v==="signup"?"#auth-fullname":"#auth-email");y&&setTimeout(()=>y.focus(),60)}function g(){const v=d.querySelector("#auth-modal-close");v&&(v.onclick=b=>{b.preventDefault(),b.stopPropagation(),Jt()});function y(b){if(!b)return;c=b;const L=d.querySelector("#auth-dial-flag"),Q=d.querySelector("#auth-dial-code-val"),J=d.querySelector("#auth-selected-dial-code");L&&(L.textContent=b.flag),Q&&(Q.textContent=b.code),J&&(J.value=b.code)}function w(b=""){const L=d.querySelector("#country-picker-list");if(!L)return;const Q=(b||"").toLowerCase().trim(),J=Hr.filter(z=>Q?z.name.toLowerCase().includes(Q)||z.code.includes(Q)||z.iso.toLowerCase().includes(Q):!0);if(J.length===0){L.innerHTML=`<div class="country-picker-empty">No country found matching "${b}"</div>`;return}L.innerHTML=J.map(z=>`
        <button type="button" class="country-picker-item ${z.code===c.code&&z.name===c.name?"selected":""}" data-country-name="${z.name}" data-country-code="${z.code}" data-country-flag="${z.flag}">
          <div class="country-picker-item-left">
            <span class="country-picker-item-flag">${z.flag}</span>
            <span class="country-picker-item-name">${z.name}</span>
          </div>
          <span class="country-picker-item-code">${z.code}</span>
        </button>
      `).join(""),L.querySelectorAll(".country-picker-item").forEach(z=>{z.onclick=V=>{V.preventDefault(),V.stopPropagation();const de=z.dataset.countryName,ue=z.dataset.countryCode,he=z.dataset.countryFlag;y({name:de,code:ue,flag:he}),$();const le=d.querySelector("#auth-whatsapp");le&&le.focus()}})}function S(){const b=d.querySelector("#auth-country-picker-dropdown"),L=d.querySelector("#auth-dial-code-btn"),Q=d.querySelector("#country-picker-search");b&&L&&(b.style.display="flex",L.classList.add("active"),w(Q?Q.value:""),Q&&setTimeout(()=>Q.focus(),60))}function $(){const b=d.querySelector("#auth-country-picker-dropdown"),L=d.querySelector("#auth-dial-code-btn");b&&L&&(b.style.display="none",L.classList.remove("active"))}const A=d.querySelector("#auth-dial-code-btn");A&&(A.onclick=b=>{b.preventDefault(),b.stopPropagation();const L=d.querySelector("#auth-country-picker-dropdown");L&&L.style.display==="flex"?$():S()});const T=d.querySelector("#country-picker-search");T&&(T.oninput=()=>{w(T.value)},T.onclick=b=>b.stopPropagation());const R=d.querySelector("#auth-country");R&&(R.onchange=()=>{const b=R.value;if(l=b,b==="Global")S(),T&&(T.value="",w(""),T.focus());else{const L=as(b);L&&y(L),$()}}),d.addEventListener("click",b=>{b.target.closest("#auth-dial-code-wrapper")||$()}),d.querySelectorAll("#tab-btn-signup, #switch-to-signup-link").forEach(b=>{b.onclick=L=>{L.preventDefault(),L.stopPropagation(),p("signup")}}),d.querySelectorAll("#tab-btn-signin, #switch-to-signin-link").forEach(b=>{b.onclick=L=>{L.preventDefault(),L.stopPropagation(),p("signin")}}),d.querySelectorAll(".password-toggle-btn").forEach(b=>{b.onclick=L=>{L.preventDefault(),L.stopPropagation();const Q=b.dataset.target,J=d.querySelector(`#${Q}`);if(J){const z=J.type==="password";J.type=z?"text":"password",b.style.color=z?"var(--accent-cyan)":"var(--text-muted)"}}});const K=d.querySelector("#auth-main-form"),j=d.querySelector("#auth-submit-btn"),M=d.querySelector("#auth-error-banner");function _(b){M&&(M.textContent=b,M.style.display="block")}const N=async b=>{b&&(b.preventDefault(),b.stopPropagation()),M&&(M.style.display="none");const L=d.querySelector("#auth-email"),Q=d.querySelector("#auth-password"),J=L?L.value.trim():"",z=Q?Q.value:"";if(!J){_(m("auth.requiredError")||"Please fill in your credentials.");return}if(!z){_(m("auth.requiredError")||"Please enter your password.");return}if(i==="signup"){const V=d.querySelector("#auth-fullname"),de=d.querySelector("#auth-country"),ue=d.querySelector("#auth-selected-dial-code"),he=d.querySelector("#auth-whatsapp"),le=d.querySelector("#auth-confirm-password"),k=V?V.value.trim():"VIP Member",U=de?de.value:l||"Pakistan",O=ue?ue.value.trim():(c==null?void 0:c.code)||"+92",q=he?he.value.trim():"",W=le?le.value:"";if(!k){_(m("auth.requiredError")||"Please enter your full name.");return}if(z!==W){_(m("auth.passwordsMismatch")||"Passwords do not match.");return}if(z.length<6){_(m("auth.minLengthError")||"Password must be at least 6 characters.");return}let te=q.replace(/\s+/g,""),ie="";te?te.startsWith(O)||te.startsWith("+")?ie=te:te.startsWith("0")?ie=`${O} ${te.substring(1)}`:ie=`${O} ${te}`:ie="",j&&(j.innerHTML=`<span>${m("auth.creatingAccount")||"Creating account..."}</span>`,j.disabled=!0);try{const Y=await H.signUp({fullName:k,email:J,whatsappNumber:ie,password:z,country:U});if(Y!=null&&Y.needsConfirmation){B("Account registered in Supabase! You can now sign in.","success"),p("signin");const re=d.querySelector("#auth-email");re&&(re.value=J),_("Account created in Supabase! Please enter your password to sign in (or verify your email if required).");return}B(`${m("auth.welcomeToast")||"Welcome"}, ${k}!`,"success"),Jt(),typeof s=="function"&&s(Y)}catch(Y){_(Y.message||"Failed to create account. Please try again."),j&&(j.innerHTML=`<span>${m("auth.btnCreateAccount")||"✦ Create Account"}</span>`,j.disabled=!1)}}else{j&&(j.innerHTML=`<span>${m("auth.signingIn")||"Signing in..."}</span>`,j.disabled=!0);try{const V=await H.signIn({email:J,password:z});B(m("auth.signedInToast")||"Signed in successfully!","success"),Jt(),typeof s=="function"&&s(V)}catch(V){_(V.message||"Invalid email or password."),j&&(j.innerHTML=`<span>${m("auth.btnSignIn")||"→ Sign In"}</span>`,j.disabled=!1)}}};K&&(K.onsubmit=N)}function f(){d.innerHTML=u(),g()}d.onclick=Jt,t.appendChild(d),f()}let _r=!1;function Fr(){if(_r)return;_r=!0;const r=document.getElementById("modal-root")||document.body,e=H.currentUser,t=H.currentProfile||{};if(!e)return;const i=H.isAdmin(e,t),s=document.createElement("div");s.className="modal-backdrop auth-backdrop-fade",s.id="account-modal-backdrop";const n=e.created_at?new Date(e.created_at).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"}):"Active Member";s.innerHTML=`
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
          `:m("account.verified")}
        </p>
      </div>

      <!-- Account Details Grid -->
      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.75rem;">
        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${m("account.emailLabel")}</span>
          <span style="font-size: 0.88rem; color: var(--text-pure); font-weight: 600;">${e.email}</span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">${m("account.whatsappLabel")}</span>
          <span style="font-size: 0.88rem; color: var(--text-pure); font-weight: 600;">${t.whatsapp_number||"Not provided"}</span>
        </div>

        <div class="glass-panel" style="padding: 0.9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-radius: 14px;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Country / Geo Pricing</span>
          <span style="font-size: 0.88rem; color: var(--accent-cyan); font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
            <span>${Fe(t.country||H.getUserCountry())}</span>
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
          <span style="font-size: 0.82rem; color: var(--text-muted);">${m("account.memberSince")}</span>
          <span style="font-size: 0.88rem; color: var(--text-secondary);">${n}</span>
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
        <span>${m("account.signOutBtn")}</span>
      </button>
    </div>
  `;const a=()=>{_r=!1,s.remove()};s.onclick=a,s.querySelector("#account-modal-close").onclick=a;const o=s.querySelector("#account-admin-btn");o&&(o.onclick=()=>{a()}),s.querySelector("#account-logout-btn").onclick=async()=>{await H.signOut(),B("Signed out successfully.","info"),a()},r.appendChild(s)}let or=!1,_t="";function os(r="nav"){const e=Yr(),t=Lt(e)||{flag:"🌐",code:e.toUpperCase(),nativeName:"English"};return`
    <div class="lang-selector-wrapper" id="${r}-lang-selector-wrapper">
      <button 
        type="button" 
        class="lang-selector-btn" 
        id="${r}-lang-selector-btn"
        aria-haspopup="dialog"
        aria-expanded="false"
        title="${m("nav.selectLanguage")}: ${t.nativeName} (${t.name})"
      >
        <span class="lang-btn-flag">${t.flag}</span>
        <span class="lang-btn-code">${t.code.toUpperCase()}</span>
        <svg class="lang-btn-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  `}function Vs(){let r=document.getElementById("lang-selector-modal");if(r)return r;r=document.createElement("div"),r.id="lang-selector-modal",r.className="lang-modal-overlay",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.style.display="none",r.innerHTML=`
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
            <h3 class="lang-modal-title" id="lang-modal-heading">${m("nav.selectLanguage")}</h3>
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
  `,document.body.appendChild(r);const e=r.querySelector("#lang-modal-backdrop"),t=r.querySelector("#lang-modal-close-btn"),i=r.querySelector("#lang-filter-input"),s=r.querySelector("#lang-filter-clear");return e.addEventListener("click",Xt),t.addEventListener("click",Xt),i.addEventListener("input",n=>{_t=n.target.value.toLowerCase().trim(),s.style.display=_t?"block":"none",Kr()}),s.addEventListener("click",()=>{i.value="",_t="",s.style.display="none",Kr(),i.focus()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&or&&Xt()}),r}function Kr(){const r=document.getElementById("lang-list-container");if(!r)return;const e=Yr(),t=_t,i=wt.filter(s=>t?s.name.toLowerCase().includes(t)||s.nativeName.toLowerCase().includes(t)||s.code.toLowerCase().includes(t):!0);if(i.length===0){r.innerHTML=`
      <div class="lang-empty-state">
        <p>No languages found matching "${t}"</p>
      </div>
    `;return}r.innerHTML=i.map(s=>{const n=s.code.toLowerCase()===e.toLowerCase(),a=s.dir==="rtl";return`
      <button 
        type="button" 
        class="lang-option-btn ${n?"active":""}" 
        data-lang-code="${s.code}"
        title="${s.nativeName} (${s.name})"
      >
        <span class="lang-option-flag">${s.flag}</span>
        <div class="lang-option-info">
          <div class="lang-option-native ${a?"rtl-text":""}">${s.nativeName}</div>
          <div class="lang-option-english">${s.name} ${a?'<span class="lang-rtl-tag">RTL</span>':""}</div>
        </div>
        <div class="lang-option-meta">
          <span class="lang-option-code">${s.code.toUpperCase()}</span>
          ${n?`
            <span class="lang-option-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          `:""}
        </div>
      </button>
    `}).join(""),r.querySelectorAll(".lang-option-btn").forEach(s=>{s.addEventListener("click",async()=>{const n=s.dataset.langCode;await $l(n)})})}async function $l(r){await Cl(r),Gs(),Xt()}function Gs(){const r=Yr(),e=Lt(r)||{flag:"🌐",code:r.toUpperCase(),nativeName:"English"};document.querySelectorAll(".lang-selector-btn").forEach(t=>{const i=t.querySelector(".lang-btn-flag"),s=t.querySelector(".lang-btn-code");i&&(i.textContent=e.flag),s&&(s.textContent=e.code.toUpperCase()),t.setAttribute("title",`${m("nav.selectLanguage")}: ${e.nativeName} (${e.name})`)})}function Il(){const r=Vs();or=!0,r.style.display="flex",document.body.classList.add("lang-modal-open");const e=r.querySelector("#lang-filter-input");if(e){e.value="",_t="";const t=r.querySelector("#lang-filter-clear");t&&(t.style.display="none")}Kr(),setTimeout(()=>{r.classList.add("is-active"),e&&e.focus()},10)}function Xt(){const r=document.getElementById("lang-selector-modal");r&&(r.classList.remove("is-active"),or=!1,document.body.classList.remove("lang-modal-open"),setTimeout(()=>{or||(r.style.display="none")},200))}function Pl(r=document){Vs(),r.querySelectorAll(".lang-selector-btn").forEach(e=>{e.dataset.initialized||(e.dataset.initialized="true",e.addEventListener("click",t=>{t.stopPropagation(),Il()}))}),Fs(()=>{Gs()})}function ls(r="nav"){const e=H.getUserCountry()||"Pakistan",t=Fe(e),i=e==="Pakistan"?"PKR":e==="India"?"INR":e==="United Arab Emirates"?"AED":e==="Saudi Arabia"?"SAR":e==="United Kingdom"?"GBP":"USD";return H.isAdmin()?`
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
    `}function lr(r,e,t=!1){var i,s;if(r){const n=(e==null?void 0:e.full_name)||((i=r.user_metadata)==null?void 0:i.full_name)||((s=r.email)==null?void 0:s.split("@")[0])||"VIP Member",a=n.charAt(0).toUpperCase(),o=H.isAdmin(r,e);return t?`
        <div class="mobile-auth-user-box" style="display: flex; flex-direction: column; gap: 0.85rem; padding: 0.5rem 0;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="nav-profile-avatar" style="width: 42px; height: 42px; font-size: 1.05rem; ${o?"border-color: var(--accent-cyan); box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);":""}">
              ${a}
              <span class="avatar-status-dot" style="${o?"background: #38bdf8;":""}"></span>
            </div>
            <div style="display: flex; flex-direction: column; overflow: hidden;">
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <span style="font-weight: 700; color: var(--text-pure); font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${n}</span>
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
              <span>${m("nav.adminPanel")||"Admin Panel"}</span>
              <span style="background: rgba(56, 189, 248, 0.25); color: #38bdf8; font-size: 0.68rem; padding: 0.1rem 0.45rem; border-radius: 999px; font-weight: 800;">ADMIN</span>
            </a>
          `:""}

          <div style="display: flex; gap: 0.6rem;">
            <button type="button" class="btn-nav-account mobile-auth-account" style="flex: 1; justify-content: center; padding: 0.65rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>${m("nav.account")}</span>
            </button>
            <button type="button" class="btn-nav-logout mobile-auth-logout" style="flex: 1; justify-content: center; padding: 0.65rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>${m("nav.logout")}</span>
            </button>
          </div>
        </div>
      `:`
      <div class="nav-profile-dropdown-wrapper" id="nav-profile-dropdown-wrapper">
        <button type="button" class="btn-nav-profile-trigger ${o?"admin-active":""}" id="nav-profile-btn" aria-haspopup="true" aria-expanded="false" title="${n} ${o?"(Administrator)":""}">
          <div class="nav-profile-avatar" style="${o?"border-color: var(--accent-cyan); box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);":""}">
            ${a}
            <span class="avatar-status-dot" style="${o?"background: #38bdf8;":""}"></span>
          </div>
          <span class="nav-profile-name">${n.split(" ")[0]}</span>
          ${o?'<span class="badge badge-popular" style="font-size: 0.65rem; padding: 0.08rem 0.38rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">Admin</span>':""}
          <svg class="nav-profile-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div class="nav-profile-dropdown-menu" id="nav-profile-menu" style="display: none;">
          <div class="nav-profile-menu-header">
            <div class="nav-profile-menu-avatar" style="${o?"background: linear-gradient(135deg, #0ea5e9, #6366f1);":""}">${a}</div>
            <div class="nav-profile-menu-meta">
              <span class="nav-profile-menu-fullname">${n}</span>
              <span class="nav-profile-menu-email">${r.email||""}</span>
              <span class="nav-profile-badge" style="${o?"background: rgba(56, 189, 248, 0.18); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);":""}">
                ${o?`
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                  </svg>
                  ${m("nav.administrator")||"Administrator"}
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
                <span>${m("nav.adminPanel")||"Admin Panel"}</span>
                <span class="badge badge-popular" style="margin-left: auto; font-size: 0.65rem; padding: 0.15rem 0.5rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">ADMIN</span>
              </a>
            `:""}
            <button type="button" class="nav-profile-menu-item" id="nav-profile-item-account">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>${m("nav.account")}</span>
            </button>
            <button type="button" class="nav-profile-menu-item logout" id="nav-profile-item-logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>${m("nav.logout")}</span>
            </button>
          </div>
        </div>
      </div>
    `}return t?`
      <div style="display: flex; flex-direction: column;">
        <button type="button" class="btn-nav-signin mobile-auth-signin" id="mobile-nav-signin-btn" data-action="signin" title="${m("nav.signIn")}" style="width: 100%; justify-content: center; padding: 0.75rem 1.25rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          <span>${m("nav.signIn")}</span>
        </button>
      </div>
    `:`
    <button type="button" class="btn-nav-signin" id="nav-signin-btn" data-action="signin" title="${m("nav.signIn")}">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      <span>${m("nav.signIn")}</span>
    </button>
  `}function Qe(r=!1){const e=document.getElementById("nav-profile-menu"),t=document.getElementById("nav-profile-btn");e&&(r||e.style.display==="block"?(e.style.display="none",t&&(t.classList.remove("active"),t.setAttribute("aria-expanded","false"))):(e.style.display="block",t&&(t.classList.add("active"),t.setAttribute("aria-expanded","true"))))}function ke(r="/"){const e=r==="/"||r==="",t=r==="/tools",i=r==="/deals",s=r==="/categories",n=r==="/about",a=r==="/contact",o=Pe,l=H.currentUser,c=H.currentProfile;return`
    <header class="navbar">
      <div class="container navbar-container">
        <!-- Brand Logo -->
        <a href="#/" class="nav-brand">
          <div class="nav-brand-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L15 8.5L22 12L15 15.5L12 22L9 15.5L2 12L9 8.5L12 2Z" />
            </svg>
          </div>
          <span>${m("nav.brand")}</span>
        </a>

        <!-- Desktop Navigation Links (Public: Admin removed) -->
        <nav class="nav-menu">
          <a href="#/" class="nav-link ${e?"active":""}">${m("nav.home")}</a>
          <a href="#/tools" class="nav-link ${t?"active":""}">${m("nav.allTools")}</a>
          <a href="#/deals" class="nav-link nav-link-hot-deals ${i?"active":""}" style="display: inline-flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 0.95rem; filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.7));">🔥</span>
            <span>${m("nav.hotDeals")||"Hot Deals"}</span>
            <span class="nav-hot-pill" style="font-size: 0.62rem; padding: 0.08rem 0.38rem; background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; border-radius: 999px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; box-shadow: 0 0 10px rgba(239, 68, 68, 0.45);">OFFER</span>
          </a>
          <a href="#/categories" class="nav-link ${s?"active":""}">${m("nav.categories")}</a>
          <a href="#/about" class="nav-link ${n?"active":""}">${m("nav.about")}</a>
          <a href="#/contact" class="nav-link ${a?"active":""}">${m("nav.contact")}</a>
        </nav>

        <!-- Right Nav Actions -->
        <div class="nav-actions">
          <!-- Search, Country Selector & Language Selector: [ 🔍 ] [ 🇵🇰 PKR ▾ ] [ 🌐 EN ▾ ] -->
          <div class="nav-search-lang-group" id="nav-search-lang-group">
            <button id="nav-search-trigger" class="nav-search-btn" title="${m("nav.searchTitle")}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="kbd-shortcut">${m("nav.searchKbd")}</span>
            </button>
            ${ls("nav")}
            ${os("nav")}
          </div>

          <!-- Dynamic Auth Slot (Single Sign In when logged out, Profile circle + dropdown when logged in) -->
          <div id="nav-auth-slot" class="nav-auth-slot">
            ${lr(l,c,!1)}
          </div>

          <!-- WhatsApp Community Button -->
          <a href="${o}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
            </svg>
            <span>${m("nav.joinWhatsApp")}</span>
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
          <a href="#/" class="mobile-nav-link ${e?"active":""}">${m("nav.home")}</a>
          <a href="#/tools" class="mobile-nav-link ${t?"active":""}">${m("nav.allTools")}</a>
          <a href="#/deals" class="mobile-nav-link ${i?"active":""}" style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>🔥</span>
              <span style="font-weight: 700; color: #fb923c;">${m("nav.hotDeals")||"Hot Deals"}</span>
            </div>
            <span style="font-size: 0.65rem; padding: 0.12rem 0.5rem; background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff; border-radius: 999px; font-weight: 800;">BUY 1 GET 1</span>
          </a>
          <a href="#/categories" class="mobile-nav-link ${s?"active":""}">${m("nav.categories")}</a>
          <a href="#/about" class="mobile-nav-link ${n?"active":""}">${m("nav.about")}</a>
          <a href="#/contact" class="mobile-nav-link ${a?"active":""}">${m("nav.contact")}</a>

          <div class="mobile-country-wrap" style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-secondary);">Country Pricing:</span>
            ${ls("mobile-nav")}
          </div>

          <div class="mobile-lang-wrap" style="margin-top: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-secondary);">${m("nav.selectLanguage")}:</span>
            ${os("mobile-nav")}
          </div>

          <div id="mobile-nav-auth-slot" class="mobile-nav-auth-slot" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-glass);">
            ${lr(l,c,!0)}
          </div>
        </div>
      </div>
    </header>
  `}function Yt(r){if(!r)return;r.querySelectorAll("#nav-signin-btn, #mobile-nav-signin-btn, .mobile-auth-signin").forEach(n=>{n.onclick=a=>{a.preventDefault(),mr({defaultTab:"signin"})}});const e=r.querySelector("#nav-profile-btn");e&&(e.onclick=n=>{n.preventDefault(),n.stopPropagation(),Qe()});const t=r.querySelector("#nav-profile-item-admin");t&&(t.onclick=()=>{Qe(!0)}),r.querySelectorAll(".mobile-auth-admin").forEach(n=>{n.onclick=()=>{const a=document.getElementById("mobile-nav-drawer");a&&(a.style.display="none")}});const i=r.querySelector("#nav-profile-item-account");i&&(i.onclick=n=>{n.preventDefault(),Qe(!0),Fr()});const s=r.querySelector("#nav-profile-item-logout");s&&(s.onclick=async n=>{n.preventDefault(),Qe(!0);try{await H.signOut(),B("Signed out successfully.","info")}catch(a){console.error("Error signing out:",a)}}),r.querySelectorAll(".mobile-auth-account").forEach(n=>{n.onclick=a=>{a.preventDefault(),Fr()}}),r.querySelectorAll(".mobile-auth-logout").forEach(n=>{n.onclick=async a=>{a.preventDefault();try{await H.signOut(),B("Signed out successfully.","info")}catch(o){console.error("Error signing out:",o)}}})}typeof window<"u"&&!window.__authEventsDelegated&&(window.__authEventsDelegated=!0,document.addEventListener("click",r=>{r.target.closest(".nav-country-wrapper")||document.querySelectorAll(".nav-country-dropdown").forEach(a=>a.style.display="none");const e=document.getElementById("nav-profile-dropdown-wrapper");if(e&&!e.contains(r.target)&&Qe(!0),r.target.closest('#nav-signin-btn, #mobile-nav-signin-btn, .btn-nav-signin, [data-action="signin"]')){r.preventDefault(),mr({defaultTab:"signin"});return}if(r.target.closest('#nav-account-btn, .mobile-auth-account, [data-action="account"]')){r.preventDefault(),Fr();return}if(r.target.closest('#nav-logout-btn, .mobile-auth-logout, [data-action="logout"]')){r.preventDefault(),H.signOut().then(()=>{B("Signed out successfully.","info")});return}if(r.target.closest("#nav-profile-item-admin, .mobile-auth-admin")){Qe(!0);const a=document.getElementById("mobile-nav-drawer");a&&(a.style.display="none")}}),document.addEventListener("keydown",r=>{r.key==="Escape"&&Qe(!0)}));function Se(){Pl(document),["nav","mobile-nav"].forEach(n=>{const a=document.getElementById(`${n}-country-btn`),o=document.getElementById(`${n}-country-dropdown`);a&&o&&(a.onclick=l=>{l.preventDefault(),l.stopPropagation();const c=o.style.display==="flex";document.querySelectorAll(".nav-country-dropdown").forEach(d=>d.style.display="none"),o.style.display=c?"none":"flex"},o.querySelectorAll(".nav-country-option").forEach(l=>{l.onclick=c=>{c.preventDefault(),c.stopPropagation();const d=l.dataset.country;o.style.display="none",H.setUserCountry(d),B(`Store pricing switched to ${d}`,"info")}}))});const r=document.getElementById("nav-search-trigger");r&&(r.onclick=()=>ss());const e=document.getElementById("mobile-menu-toggle"),t=document.getElementById("mobile-nav-drawer");e&&t&&(e.onclick=n=>{n.stopPropagation();const a=t.style.display==="block";t.style.display=a?"none":"block",e.classList.toggle("active",!a)},t.querySelectorAll("a, button:not(#mobile-nav-country-btn):not(#mobile-nav-lang-btn)").forEach(n=>{n.addEventListener("click",()=>{t.style.display="none",e.classList.remove("active")})}),document.addEventListener("click",n=>{t.style.display==="block"&&!t.contains(n.target)&&!e.contains(n.target)&&(t.style.display="none",e.classList.remove("active"))}));const i=document.getElementById("nav-auth-slot"),s=document.getElementById("mobile-nav-auth-slot");Yt(i),Yt(s),H.subscribe(({user:n,profile:a})=>{const o=document.getElementById("nav-auth-slot"),l=document.getElementById("mobile-nav-auth-slot");o&&(o.innerHTML=lr(n,a,!1),Yt(o)),l&&(l.innerHTML=lr(n,a,!0),Yt(l))}),window.onkeydown=n=>{(n.metaKey||n.ctrlKey)&&n.key.toLowerCase()==="k"&&(n.preventDefault(),ss())}}const Ar=[{id:"gemini",name:"Gemini",category:"Multimodal AI",ring:1,position:"top",color:"#4285f4",logo:`
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
    `}];function Rl(){const r=Ar.filter(i=>i.ring===1),e=Ar.filter(i=>i.ring===2),t=Ar.filter(i=>i.ring===3);return`
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
  `}typeof window<"u"&&!window.__orbHeroEventsBound&&(window.__orbHeroEventsBound=!0,document.addEventListener("click",r=>{const e=r.target.closest(".orbit-tool-card");if(e){r.preventDefault();const t=e.dataset.toolName;t&&(window.location.hash=`#/tools?q=${encodeURIComponent(t)}`)}}));async function Js(r,e={}){await H.getCurrentUser()?typeof r=="function"&&r():mr({defaultTab:e.defaultTab||"signup",onAuthenticated:()=>{typeof r=="function"&&r()}})}const Ys="ai_tools_favorites_v1";function Qs(){try{const r=localStorage.getItem(Ys);return r?JSON.parse(r):[]}catch{return[]}}function Ll(r,e="Tool"){const t=Qs(),i=t.indexOf(r);let s=!1;i>=0?(t.splice(i,1),B(m("card.removedFavToast")||"Removed from saved favorites","info")):(t.push(r),s=!0,B(m("card.addedFavToast")||"Added to your favorites!","success"));try{localStorage.setItem(Ys,JSON.stringify(t))}catch(n){console.warn("Failed to save favorite:",n)}return document.querySelectorAll(`.btn-favorite[data-tool-id="${r}"]`).forEach(n=>{n.classList.toggle("active",s),n.setAttribute("aria-checked",String(s))}),s}function Qr(r){const e=Ws(r),t=Jr(e.id,e.name),i=H.getUserCountry()||"Pakistan",s=Ut(e,i),n=Ms(e.whatsappUrl,e.name,s,i),a=Qs().includes(e.id);let o=e.themeColor||"blue";if(!e.themeColor){const h=(e.category||"").toLowerCase();h.includes("writing")||h.includes("text")||e.id.includes("write")?o="purple":h.includes("image")||h.includes("artify")||h.includes("midjourney")?o="teal":o="blue"}const{amount:l,periodHtml:c}=Gr(s,`/${m("card.perMonth")||"month"}`),d=e.rating?e.rating.toFixed(1):"4.8",u=e.userCount||`${e.reviewCount?(e.reviewCount/10).toFixed(1):"12.4"}K`;return`
    <div class="futuristic-tool-card theme-${o} ${e.image?"has-media-banner":""}" data-tool-id="${e.id}">
      <!-- Dynamic Mouse-Tracking Glow Overlay -->
      <div class="card-mouse-glow"></div>

      <!-- Animated Abstract Mesh & Particles Background -->
      <div class="card-mesh-bg">
        <svg class="mesh-waves-svg" viewBox="0 0 400 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad-${e.id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${o==="purple"?"#a855f7":o==="teal"?"#10b981":"#3b82f6"}" stop-opacity="0.35"/>
              <stop offset="60%" stop-color="${o==="purple"?"#6366f1":o==="teal"?"#06b6d4":"#60a5fa"}" stop-opacity="0.12"/>
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
            class="btn-favorite btn-favorite-floating ${a?"active":""}" 
            data-tool-id="${e.id}" 
            data-tool-name="${e.name}"
            title="${m("card.saveFav")}"
            aria-label="${m("card.saveFav")}"
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
            class="btn-favorite ${a?"active":""}" 
            data-tool-id="${e.id}" 
            data-tool-name="${e.name}"
            title="${m("card.saveFav")}"
            aria-label="${m("card.saveFav")}"
          >
            <svg class="heart-icon" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      `}

      <!-- Category Pill Badge -->
      <div class="card-badge-row">
        <span class="card-category-pill">${e.category}</span>
      </div>

      <!-- Tool Title & Description (Bullet Points Supported) -->
      <div class="card-body-content">
        <h3 class="card-tool-name">${e.name}</h3>
        <div class="card-tool-desc">
          ${Mr(e.shortDescription||e.description||"",{isCard:!0,maxPoints:3})}
        </div>
      </div>

      <!-- Rating & User Stats Row -->
      <div class="card-stats-row">
        <div class="rating-item" title="${m("card.rating")}: ${d}">
          <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span class="rating-val">${d}</span>
        </div>
        <span class="stat-separator">•</span>
        <div class="users-item">
          <svg class="users-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span class="users-val">${u} ${m("card.users")}</span>
        </div>
      </div>

      <!-- Price & Primary Buy Now Row (Side-by-Side as in Reference) -->
      <div class="card-price-buy-row">
        <div class="card-price-block">
          <div style="display: flex; align-items: baseline; gap: 0.35rem; flex-wrap: wrap;">
            <span class="price-currency">${l}</span>
            <span class="price-country-badge" title="Live rate for ${i}">${Fe(i)}</span>
          </div>
          ${c}
        </div>

        <a 
          href="${n}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-card-buy-primary"
          data-buy-url="${n}"
          data-tool-id="${e.id}"
          data-tool-name="${e.name}"
          data-tool-price="${s}"
          data-user-country="${i}"
          title="${m("card.buyNow")}: ${e.name}"
        >
          <svg class="btn-bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>${m("card.buyNow")}</span>
        </a>
      </div>

      <!-- Secondary Actions Row: How to Use & View Details -->
      <div class="card-secondary-actions-row">
        <a 
          href="#/tool/${e.id}?section=how-to-use" 
          class="btn-sub-card btn-how-to-use" 
          data-tool-id="${e.id}"
          title="${m("card.howToUse")}: ${e.name}"
        >
          <svg class="btn-sub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
          </svg>
          <span>${m("card.howToUse")}</span>
        </a>

        <a href="#/tool/${e.id}" class="btn-sub-card btn-view-details" title="${m("card.viewDetails")}: ${e.name}">
          <span>${m("card.viewDetails")}</span>
          <svg class="btn-sub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </div>
  `}function Xs(){document.querySelectorAll(".btn-favorite").forEach(r=>{r.onclick=e=>{e.preventDefault(),e.stopPropagation();const t=r.dataset.toolId,i=r.dataset.toolName;Ll(t,i)}}),document.querySelectorAll(".btn-card-buy-primary").forEach(r=>{r.onclick=e=>{e.preventDefault();const t=r.dataset.buyUrl||r.getAttribute("href"),i=r.dataset.toolId,s=r.dataset.toolName||"AI Tool",n=r.dataset.toolPrice||"$19 /month";Js(async a=>{if(G)try{const o=(a==null?void 0:a.user)||H.currentUser;await F.from("orders").insert([{tool_id:i||null,tool_name:s,price:n,user_id:(o==null?void 0:o.id)||null,user_email:(o==null?void 0:o.email)||"guest@anonymous.com",status:"inquiry_whatsapp",created_at:new Date().toISOString()}])}catch(o){console.warn("[ToolCard] Order log warning:",o)}window.open(t,"_blank","noopener,noreferrer")},{defaultTab:"signup"})}}),document.querySelectorAll(".btn-how-to-use").forEach(r=>{r.onclick=e=>{const t=r.dataset.toolId;t&&(window.location.hash=`#/tool/${t}?section=how-to-use`)}}),document.querySelectorAll(".futuristic-tool-card").forEach(r=>{r.onmousemove=e=>{const t=r.getBoundingClientRect(),i=e.clientX-t.left,s=e.clientY-t.top;r.style.setProperty("--mouse-x",`${i}px`),r.style.setProperty("--mouse-y",`${s}px`)}})}function Zs(){return`
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
              href="${Pe}" 
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
  `}function xe(){const r=Pe;return`
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
              <span>${m("nav.brand")}</span>
            </a>
            <p>
              ${m("footer.desc")}
            </p>
            <div style="margin-top: 1.25rem;">
              <a href="${r}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-nav" style="padding: 0.45rem 0.95rem; font-size: 0.8rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.13.82.84-3.05-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.69 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z"/>
                </svg>
                <span>${m("nav.joinWhatsApp")}</span>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-col">
            <h4>${m("footer.exploreHeading")}</h4>
            <ul class="footer-links">
              <li><a href="#/">${m("nav.home")}</a></li>
              <li><a href="#/tools">${m("nav.allTools")}</a></li>
              <li><a href="#/categories">${m("nav.categories")}</a></li>
              <li><a href="#/about">${m("nav.about")}</a></li>
              <li><a href="#/contact">${m("nav.contact")}</a></li>
              <li><a href="#/admin">${m("nav.admin")}</a></li>
            </ul>
          </div>

          <!-- Categories -->
          <div class="footer-col">
            <h4>${m("nav.categories")}</h4>
            <ul class="footer-links">
              <li><a href="#/categories">${m("categories.viewAll")}</a></li>
              <li><a href="#/tools">${m("nav.allTools")}</a></li>
              <li><a href="#/tools?category=Ai%20Tools">Ai Tools</a></li>
            </ul>
          </div>

          <!-- Trust & WhatsApp Direct -->
          <div class="footer-col">
            <h4>${m("footer.communityHeading")}</h4>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 1rem;">
              ${m("benefits.b3Desc")}
            </p>
            <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.4rem;">
              <div>⚡ ${m("toolDetails.guaranteesActivation")}</div>
              <div>🛡 ${m("toolDetails.guaranteesLicensing")}</div>
              <div>💬 ${m("toolDetails.guaranteesSupport")}</div>
            </div>
          </div>
        </div>

        <!-- Copyright & Legal -->
        <div class="footer-bottom">
          <div>
            &copy; 2026 ${m("nav.brand")}. ${m("footer.allRightsReserved")}
          </div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/about">${m("nav.about")}</a>
            <a href="#/contact">${m("nav.contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  `}async function cs(r){document.title=`${m("nav.brand")} | ${m("hero.headlinePart1")} ${m("hero.headlineGradient")}`;const e=await ee.getTools(),t=await ee.getCategories(),i=e;r.innerHTML=`
    ${ke("/")}

    <main class="main-content fade-in">
      <!-- HERO SECTION (THE INTELLIGENT TOOL INDEX) -->
      <section class="hero-section">
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
                  <h4>${m("hero.trust1Title")}</h4>
                  <p>${m("hero.trust1Desc")}</p>
                </div>
              </div>

              <div class="hero-trust-item">
                <div class="hero-trust-icon" style="color: #38bdf8;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <div class="hero-trust-text">
                  <h4>${m("hero.trust2Title")}</h4>
                  <p>${m("hero.trust2Desc")}</p>
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
                  <h4>${m("hero.trust3Title")}</h4>
                  <p>${m("hero.trust3Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right 3D Glowing AI Orb System with Orbits & Floating Glass Labels -->
          ${Rl()}
        </div>
      </section>

      <!-- BROWSE CATEGORIES SECTION -->
      <section class="categories-section">
        <div class="container">
          <div class="section-header-row">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.4rem;">${m("categories.badge")}</span>
              <h2 class="section-title">${m("categories.title")}</h2>
            </div>
            <a href="#/categories" class="section-view-all">
              <span>${m("categories.viewAll")}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <!-- Category Pill Tags Row with Hover Glow -->
          <div class="categories-pills-wrap">
            ${t.map(o=>`
              <a href="#/tools?category=${encodeURIComponent(o.name)}" class="category-pill" title="${o.name}">
                ${o.image?`<img src="${o.image}" alt="" style="width: 20px; height: 20px; border-radius: 4px; object-fit: cover; vertical-align: middle;" />`:`<span class="category-pill-icon">${o.icon}</span>`}
                <span>${o.name}</span>
                <span style="font-size: 0.72rem; opacity: 0.65; margin-left: 0.2rem; background: rgba(255,255,255,0.1); padding: 0.1rem 0.45rem; border-radius: 9999px;">${o.count||"PRO"}</span>
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
              <span class="badge badge-popular" style="margin-bottom: 0.45rem;">${m("featured.badge")}</span>
              <h2 class="section-title">
                <span>${m("featured.title")}</span>
                <span style="font-size: 1.1rem; color: #38bdf8;">✨</span>
              </h2>
              <p style="color: var(--text-secondary); font-size: 0.92rem; margin-top: 0.25rem;">
                ${m("featured.subtitle")}
              </p>
            </div>
            <a href="#/tools" class="section-view-all">
              <span>${m("featured.viewAll")}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <!-- 3-Column Responsive Grid with Equal Heights -->
          <div class="tools-grid-3">
            ${i.length>0?i.slice(0,6).map(o=>Qr(o)).join(""):`<div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 20px;">
                   <h3 style="color: var(--text-pure); margin-bottom: 0.5rem;">${m("featured.emptyTitle")}</h3>
                   <p style="max-width: 500px; margin: 0 auto 1.5rem auto; font-size: 0.9rem;">
                     ${m("featured.emptyDesc")}
                   </p>
                   ${H.isAdmin()?`<a href="#/admin" class="btn btn-primary" style="font-size: 0.85rem;">${m("featured.openAdmin")}</a>`:`<a href="#/tools" class="btn btn-primary" style="font-size: 0.85rem;">${m("featured.viewAll")}</a>`}
                 </div>`}
          </div>
        </div>
      </section>

      <!-- WHY CHOOSE AI TOOLS STORE (4 BENEFITS SECTION) -->
      <section class="benefits-section">
        <div class="container">
          <div class="section-header-row" style="margin-bottom: 2rem;">
            <div>
              <span class="badge badge-popular" style="margin-bottom: 0.5rem;">${m("benefits.badge")}</span>
              <h2 class="section-title">${m("benefits.title")}</h2>
              <p style="margin-top: 0.35rem; color: var(--text-secondary);">
                ${m("benefits.subtitle")}
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
              <h4>${m("benefits.b1Title")}</h4>
              <p>${m("benefits.b1Desc")}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #c084fc; border-color: rgba(192, 132, 252, 0.3); background: rgba(192, 132, 252, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <h4>${m("benefits.b2Title")}</h4>
              <p>${m("benefits.b2Desc")}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                </svg>
              </div>
              <h4>${m("benefits.b3Title")}</h4>
              <p>${m("benefits.b3Desc")}</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon-box" style="color: #34d399; border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.1);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
              </div>
              <h4>${m("benefits.b4Title")}</h4>
              <p>${m("benefits.b4Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CALL TO ACTION (FINAL SECTION) -->
      <section class="final-cta-section">
        <div class="container">
          <div class="final-cta-card">
            <span class="final-cta-badge">${m("finalCta.badge")}</span>
            <h2 class="final-cta-title">${m("finalCta.title")}</h2>
            <p class="final-cta-subtitle">
              ${m("finalCta.subtitle")}
            </p>
            <div class="final-cta-actions">
              <button type="button" id="final-cta-signup-btn" class="btn-cta-primary">
                <span>${m("finalCta.getStarted")}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <a href="#/tools" class="btn-cta-secondary">
                <span>${m("finalCta.browseTools")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- BOTTOM WHATSAPP COMMUNITY CTA BANNER -->
      ${Zs()}
    </main>

    ${xe()}
  `,Se(),Xs();const s=document.getElementById("final-cta-signup-btn");s&&(s.onclick=()=>{mr({defaultTab:"signup"})});const n=document.getElementById("hero-search-form"),a=document.getElementById("hero-search-input");n&&a&&(n.onsubmit=o=>{o.preventDefault();const l=a.value.trim();window.location.hash=`#/tools?q=${encodeURIComponent(l)}`})}async function Ol(r,{queryParams:e}){document.title=`${m("nav.allTools")} | ${m("nav.brand")}`;const t=(e==null?void 0:e.get("category"))||"All",i=(e==null?void 0:e.get("q"))||"",s=await ee.getTools(),n=await ee.getCategories();let a=H.getUserCountry()||"Pakistan";r.innerHTML=`
    ${ke("/tools")}

    <main class="main-content container marketplace-page fade-in">
      <header class="marketplace-header">
        <span class="badge badge-new" style="margin-bottom: 0.6rem;">${m("categories.badge")}</span>
        <h1>${m("allTools.headerTitle")}</h1>
        <p>${m("allTools.headerSubtitle")}</p>
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
            <button type="button" class="currency-chip ${a==="Pakistan"?"active":""}" data-country="Pakistan" title="View pricing in PKR">
              <span>🇵🇰</span>
              <span>Pakistan (PKR)</span>
            </button>
            <button type="button" class="currency-chip ${a==="United States"?"active":""}" data-country="United States" title="View pricing in USD ($)">
              <span>🇺🇸</span>
              <span>USD ($)</span>
            </button>
            <button type="button" class="currency-chip ${a==="India"?"active":""}" data-country="India" title="View pricing in INR (₹)">
              <span>🇮🇳</span>
              <span>India (INR ₹)</span>
            </button>
            <button type="button" class="currency-chip ${a==="United Arab Emirates"?"active":""}" data-country="United Arab Emirates" title="View pricing in AED">
              <span>🇦🇪</span>
              <span>UAE (AED)</span>
            </button>
            <button type="button" class="currency-chip ${a==="Saudi Arabia"?"active":""}" data-country="Saudi Arabia" title="View pricing in SAR">
              <span>🇸🇦</span>
              <span>Saudi (SAR)</span>
            </button>
            <button type="button" class="currency-chip ${a==="Global"||a==="Other"?"active":""}" data-country="Global" title="View Global pricing in USD ($)">
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
              placeholder="${m("allTools.searchPlaceholder")}" 
              value="${i}"
              class="search-input-field"
            />
          </div>

          <!-- Sort and View Mode -->
          <div class="filter-actions">
            <select id="catalog-sort-select" class="sort-select">
              <option value="popular">${m("allTools.sortPopular")}</option>
              <option value="rating">${m("allTools.sortRating")}</option>
              <option value="price-asc">${m("allTools.sortPriceLow")}</option>
              <option value="price-desc">${m("allTools.sortPriceHigh")}</option>
              <option value="alpha">${m("allTools.sortName")}</option>
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
            ${m("allTools.allCategories")} (${s.length})
          </button>
          ${n.map(_=>`
            <button class="filter-chip ${t.toLowerCase()===_.name.toLowerCase()?"active":""}" data-category="${_.name}">
              ${_.image?`<img src="${_.image}" alt="" style="width: 16px; height: 16px; border-radius: 3px; object-fit: cover; vertical-align: middle; margin-right: 4px;" />`:`${_.icon} `}${_.name} (${_.count})
            </button>
          `).join("")}
        </div>
      </section>

      <!-- Active Filter Status & Count -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
        <div id="catalog-results-count">Showing tools...</div>
        <div id="catalog-clear-wrap" style="display: none;">
          <button id="catalog-clear-btn" class="btn-details" style="font-size: 0.78rem; padding: 0.25rem 0.65rem;">
            ${m("allTools.clearFilters")}
          </button>
        </div>
      </div>

      <!-- Tools Grid Container -->
      <div id="catalog-tools-container" class="catalog-grid"></div>

      <!-- Load More / Pagination Action -->
      <div id="catalog-load-more-wrap" style="text-align: center; margin-top: 3rem; display: none;">
        <button id="catalog-load-more-btn" class="btn btn-secondary" style="padding: 0.8rem 2.5rem;">
          ${m("allTools.loadMore")}
        </button>
      </div>
    </main>

    ${xe()}
  `,Se();let o=t,l=i,c="popular",d=!1,u=12;const h=document.getElementById("catalog-tools-container"),p=document.getElementById("catalog-results-count"),g=document.getElementById("catalog-clear-wrap"),f=document.getElementById("catalog-clear-btn"),v=document.getElementById("catalog-load-more-wrap"),y=document.getElementById("catalog-load-more-btn"),w=document.getElementById("catalog-search-input"),S=document.getElementById("catalog-sort-select"),$=document.getElementById("view-grid-btn"),A=document.getElementById("view-list-btn"),T=document.getElementById("catalog-category-chips");function R(){let _=[...s];if(o&&o!=="All"&&(_=_.filter(N=>(N.category||"").toLowerCase()===o.toLowerCase())),l){const N=l.toLowerCase().trim();_=_.filter(b=>b.name.toLowerCase().includes(N)||b.category.toLowerCase().includes(N)||b.shortDescription&&b.shortDescription.toLowerCase().includes(N)||b.features&&b.features.some(L=>L.toLowerCase().includes(N)))}return c==="latest"?_.reverse():c==="price-asc"?_.sort((N,b)=>N.priceValue-b.priceValue):c==="price-desc"?_.sort((N,b)=>b.priceValue-N.priceValue):c==="alpha"?_.sort((N,b)=>N.name.localeCompare(b.name)):_.sort((N,b)=>(b.featured?1:0)-(N.featured?1:0)||(b.rating||0)-(N.rating||0)),_}function K(){var b;const _=R(),N=_.slice(0,u);if(p.textContent=m("allTools.resultsCount",{count:`${N.length} / ${_.length}`}),g.style.display=l||o!=="All"?"block":"none",_.length===0){h.innerHTML=`
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3>${m("allTools.noResultsTitle")}</h3>
          <p>${m("allTools.noResultsDesc")}</p>
          <button id="empty-clear-btn" class="btn btn-primary">${m("allTools.resetFilters")}</button>
        </div>
      `,(b=document.getElementById("empty-clear-btn"))==null||b.addEventListener("click",j),v.style.display="none";return}h.className=d?"catalog-grid list-view":"catalog-grid tools-grid-3",h.innerHTML=N.map(L=>Qr(L)).join(""),v.style.display=N.length<_.length?"block":"none",Xs()}function j(){o="All",l="",w.value="",T.querySelectorAll(".filter-chip").forEach(_=>{_.classList.toggle("active",_.dataset.category==="All")}),K()}w.oninput=_=>{l=_.target.value.trim(),u=12,K()},S.onchange=_=>{c=_.target.value,K()},T.onclick=_=>{const N=_.target.closest(".filter-chip");N&&(T.querySelectorAll(".filter-chip").forEach(b=>b.classList.remove("active")),N.classList.add("active"),o=N.dataset.category,u=12,K())},f.onclick=j,$.onclick=()=>{d=!1,$.classList.add("active"),A.classList.remove("active"),K()},A.onclick=()=>{d=!0,A.classList.add("active"),$.classList.remove("active"),K()},y.onclick=()=>{u+=8,K()};const M=document.getElementById("catalog-currency-options");M&&(M.onclick=_=>{const N=_.target.closest(".currency-chip");if(!N)return;const b=N.dataset.country;a=b,H.setUserCountry(b),M.querySelectorAll(".currency-chip").forEach(L=>L.classList.remove("active")),N.classList.add("active"),B(`Pricing updated for ${b}`,"info"),K()}),K()}function Ul(r){if(!r)return"";const e=r.tutorialVideoUrl||r.videoUrl||r.tutorial_video_url||"",t=fl(e),i=Array.isArray(r.howToUse)&&r.howToUse.length>0?r.howToUse:[{step:1,title:"Open the Tool",text:`Access the official ${r.name} interface using the credentials sent to you.`},{step:2,title:"Create or Verify Account",text:"Ensure your VIP plan is active in your profile settings."},{step:3,title:"Select Required AI Feature",text:"Choose from the available templates or multimodal prompts."},{step:4,title:"Input Content or Prompt",text:"Enter your custom instructions, parameters, or uploaded media."},{step:5,title:"Generate & Export Result",text:"Run generation and export in high-definition format."}],s=t.endsWith(".mp4")||t.endsWith(".webm");return`
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
            ${s?`<video src="${t}" controls playsinline poster="/assets/ai_hologram_orb.jpg"></video>`:t?`<iframe 
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
          ${i.map((n,a)=>{const o=n.step||a+1;return`
              <div class="step-card">
                <div class="step-number">${String(o).padStart(2,"0")}</div>
                <div class="step-content">
                  <h4>${n.title||`Step ${o}`}</h4>
                  <p>${n.text||""}</p>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </section>
  `}async function Bl(r,{pathParams:e}){const t=e==null?void 0:e.id,i=await ee.getToolById(t);if(!i){document.title=`${m("toolDetails.notFoundTitle")} | ${m("nav.brand")}`,r.innerHTML=`
      ${ke("/tools")}
      <main class="main-content container empty-state" style="margin-top: 5rem;">
        <div class="empty-state-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="10" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2>${m("toolDetails.notFoundTitle")}</h2>
        <p>${m("toolDetails.notFoundDesc")}</p>
        <a href="#/tools" class="btn btn-primary">${m("toolDetails.backToTools")}</a>
      </main>
      ${xe()}
    `,Se();return}const s=Ws(i);document.title=`${s.name} | ${m("nav.brand")}`;const n=H.getUserCountry()||"Pakistan",a=Ut(s,n),l=(await ee.getTools()).filter(g=>g.category===s.category&&g.id!==s.id).slice(0,4),c=Ms(s.whatsappUrl,s.name,a,n),{amount:d,periodText:u}=Gr(a,`/${m("card.perMonth")||"month"}`);r.innerHTML=`
    ${ke("/tools")}

    <main class="main-content container tool-details-page fade-in">
      <!-- Breadcrumbs Navigation -->
      <nav class="breadcrumbs-bar">
        <a href="#/">${m("nav.home")}</a>
        <span class="breadcrumbs-separator">/</span>
        <a href="#/tools">${m("nav.allTools")}</a>
        <span class="breadcrumbs-separator">/</span>
        <a href="#/tools?category=${encodeURIComponent(s.category)}">${s.category}</a>
        <span class="breadcrumbs-separator">/</span>
        <span style="color: var(--text-pure); font-weight: 600;">${s.name}</span>
      </nav>

      <!-- Main Two-Column Layout -->
      <div class="details-layout">
        <!-- Left Column: Tool Specs & Descriptions -->
        <div class="details-main-content">
          ${s.image?`
            <div class="details-banner-preview" style="margin-bottom: 1.5rem; border-radius: 20px; overflow: hidden; position: relative; height: 260px; background: rgba(15,23,42,0.9); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px -8px rgba(0,0,0,0.6);">
              <img src="${s.image}" alt="${s.name}" style="position: absolute; inset: -20px; width: calc(100% + 40px); height: calc(100% + 40px); object-fit: cover; filter: blur(25px); opacity: 0.45;" aria-hidden="true" />
              <img src="${s.image}" alt="${s.name} banner" style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; object-position: center;" />
              <div style="position: absolute; inset: 0; z-index: 2; background: linear-gradient(180deg, transparent 60%, rgba(10,15,30,0.4) 100%); pointer-events: none;"></div>
            </div>
          `:""}

          <div class="details-header">
            <div class="details-logo-box" style="background: ${s.iconGradient||"linear-gradient(135deg, #4f46e5, #06b6d4)"}; color: #ffffff;">
              ${s.image?`<img src="${s.image}" alt="${s.name} Logo" style="width: 100%; height: 100%; object-fit: contain;" />`:Jr(s.id,s.name)}
            </div>

            <div class="details-title-wrap">
              <h1>${s.name}</h1>
              <div class="details-badges-row">
                <span class="badge badge-popular">${s.category}</span>
                ${s.badge?`<span class="badge badge-hot">★ ${s.badge}</span>`:""}
                <span style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: #fbbf24; font-weight: 700;">
                  ★ ${s.rating||4.9} <span style="color: var(--text-muted); font-weight: 400;">(${s.reviewCount||150}+ reviews)</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Formatted Short Description / Summary Points -->
          <div class="details-short-desc">
            ${Mr(s.shortDescription||"")}
          </div>

          <!-- Full Description Card with formatted points -->
          <div class="details-full-desc-card">
            <h3>${s.name}</h3>
            <div style="color: var(--text-secondary); line-height: 1.65; margin-top: 0.5rem;">
              ${Mr(s.fullDescription||s.description||s.shortDescription||"")}
            </div>

            <!-- Key Features Checklist -->
            <div style="margin-top: 1.75rem;">
              <h4 style="font-size: 1rem; color: var(--text-pure); margin-bottom: 0.85rem;">${m("toolDetails.featuresTab")}</h4>
              <div class="features-checklist">
                ${(s.features||[]).map(g=>`
                  <div class="feature-check-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>${g}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- DYNAMIC HOW TO USE SECTION (Video & Step-by-Step Instructions) -->
          ${Ul(s)}
        </div>

        <!-- Right Column: Sticky Purchase & License Box -->
        <aside class="details-sidebar">
          <div class="purchase-card-sticky">
            <div class="purchase-price-block">
              <div style="display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap;">
                <div class="purchase-price-val">${d}</div>
                <span class="price-country-badge" style="font-size: 0.78rem; padding: 0.2rem 0.55rem;" title="Price for ${n}">
                  ${Fe(n)} ${n}
                </span>
              </div>
              <div class="purchase-price-period">${u} &bull; ${m("hero.trust2Title")}</div>
            </div>

            <!-- BUY NOW BUTTON (Redirects to backend WhatsApp link) -->
            <a 
              href="${c}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-buy-whatsapp-main"
              id="tool-buy-now-btn"
              data-tool-price="${a}"
              data-user-country="${n}"
              title="${m("toolDetails.buyNowWhatsApp")}: ${s.name}"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
              </svg>
              <span>${m("toolDetails.buyNowWhatsApp")}</span>
            </a>

            <!-- Official Website Direct Link -->
            ${s.toolUrl&&s.toolUrl!=="#"?`
              <a href="${s.toolUrl}" target="_blank" rel="noopener noreferrer" class="btn-visit-tool">
                <span>${m("toolDetails.visitWebsite")}</span>
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
                <span>${m("toolDetails.guaranteesSupport")}</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${m("toolDetails.guaranteesActivation")}</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${m("toolDetails.guaranteesLicensing")}</span>
              </li>
            </ul>

            <!-- WhatsApp Purchase Guarantee -->
            <div style="font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
              <span style="color: var(--accent-mint);">✓</span> ${m("toolDetails.purchaseVerified")}
            </div>
          </div>
        </aside>
      </div>

      <!-- Related Tools Row -->
      ${l.length>0?`
        <section style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle);">
          <div class="section-header-row">
            <h3 class="section-title">Similar AI Tools in ${s.category}</h3>
            <a href="#/tools?category=${encodeURIComponent(s.category)}" class="section-view-all">
              <span>Explore Category</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
          <div class="tools-grid-3">
            ${l.map(g=>Qr(g)).join("")}
          </div>
        </section>
      `:""}
    </main>

    ${xe()}
  `,Se(),initCardInteractions(),((queryParams==null?void 0:queryParams.get("section"))==="how-to-use"||(queryParams==null?void 0:queryParams.get("tab"))==="how-to-use"||window.location.hash.includes("how-to-use"))&&setTimeout(()=>{const g=document.getElementById("how-to-use");if(g){g.scrollIntoView({behavior:"smooth",block:"start"});const f=g.querySelector(".video-player-card");f&&(f.classList.add("video-focus-glow"),setTimeout(()=>f.classList.remove("video-focus-glow"),3500))}},150);const p=document.getElementById("tool-buy-now-btn");p&&(p.onclick=g=>{g.preventDefault();const f=p.getAttribute("href");Js(async v=>{if(G)try{const y=(v==null?void 0:v.user)||H.currentUser;await F.from("orders").insert([{tool_id:s.id||null,tool_name:s.name||"AI Tool",price:a||s.price||"$19 /month",user_id:(y==null?void 0:y.id)||null,user_email:(y==null?void 0:y.email)||"guest@anonymous.com",status:"inquiry_whatsapp",created_at:new Date().toISOString()}])}catch(y){console.warn("[ToolDetailsPage] Order record error:",y)}window.open(f,"_blank","noopener,noreferrer")},{defaultTab:"signup"})})}async function Dl(r){document.title="AI Categories Directory | AI Tools Store";const e=await ee.getCategories();r.innerHTML=`
    ${ke("/categories")}

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

    ${xe()}
  `,Se()}async function Nl(r){document.title="About Us | AI Tools Store",r.innerHTML=`
    ${ke("/about")}

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
      ${Zs()}
    </main>

    ${xe()}
  `,Se()}const ds={ACCEPT:"application/json, text/event-stream",CONTENT_TYPE:"application/json"};class jl{constructor(e={}){this.serverUrl=e.serverUrl||"",this.secretKey=e.secretKey||"",this.status="IDLE",this.lastResult=null,this.listeners=[]}setServerUrl(e){this.serverUrl=(e||"").trim()}setSecretKey(e){this.secretKey=(e||"").trim()}onStateChange(e){typeof e=="function"&&this.listeners.push(e)}_notify(e,t=null){this.status=e,this.lastResult=t,this.listeners.forEach(i=>{try{i(this.status,t)}catch(s){console.warn("[McpClient] Listener error:",s)}})}async testConnection(e=this.serverUrl,t=this.secretKey){const i=(e||this.serverUrl||"").trim();if(!i){const n={connected:!1,status:400,statusText:"Bad Request",error:"Please enter an n8n MCP Server Trigger URL first."};return this._notify("FAILED",n),n}this._notify("CONNECTING",{url:i});try{const a=await(await fetch("/api/mcp/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:i,secret:t||""})})).json();return a.connected?(this._notify("CONNECTED",a),a):(this._notify("FAILED",a),a)}catch(n){console.warn("[McpClient] Proxy unavailable, attempting direct MCP client-side check...",n)}const s=Date.now();try{const n=new AbortController,a=setTimeout(()=>n.abort(),6e3),o=i.includes("/webhook"),l={Accept:ds.ACCEPT,"Content-Type":ds.CONTENT_TYPE,...t?{Authorization:`Bearer ${t}`,"X-MCP-Secret":t}:{}};let c,d=o;if(o)c=await fetch(i,{method:"POST",headers:l,body:JSON.stringify({action:"ping",test:!0,timestamp:Date.now()}),signal:n.signal});else if(c=await fetch(i,{method:"GET",headers:l,signal:n.signal}),c.status===404||c.status===405)try{const v=await fetch(i,{method:"POST",headers:l,body:JSON.stringify({action:"ping",test:!0,timestamp:Date.now()}),signal:n.signal});(v.ok||v.status===200||v.status===201)&&(c=v,d=!0)}catch{}clearTimeout(a);const u=Date.now()-s,h=c.status,p=c.statusText||(h===200?"OK":"Error");if(h===200||h===201){const v={connected:!0,status:200,statusText:"OK",latencyMs:u,message:d?"✓ Connected! n8n Webhook / MCP Server accepted test payload.":"✓ Connected! n8n MCP Server Trigger accepted the connection."};return this._notify("CONNECTED",v),v}let g=`Server returned HTTP ${h} (${p})`;h===406?g="HTTP 406 Not Acceptable: n8n MCP Server Trigger requires SSE transport and JSON content negotiation.":h===404&&(g=i.includes("mcp-test")||i.includes("webhook-test")?'HTTP 404: n8n is waiting for test events. Click "Listen for test event" / "Execute step" in n8n first, then test again.':"HTTP 404: Production URL not found or workflow is inactive. Ensure n8n workflow is Active (On).");const f={connected:!1,status:h,statusText:p,latencyMs:u,error:g};return this._notify("FAILED",f),f}catch(n){const a=Date.now()-s;let o=n.message||"Network error";if(n.name==="AbortError"){const c={connected:!0,status:200,statusText:"OK",latencyMs:a,message:"✓ Connected! MCP SSE stream established."};return this._notify("CONNECTED",c),c}i.includes("srv189856.")&&(o='DNS Host Not Found: "srv189856" does not exist. Did you mean "srv1898856" (three 8s)?');const l={connected:!1,status:0,statusText:"Network Error",latencyMs:a,error:o};return this._notify("FAILED",l),l}}async submitInquiry(e){if(!this.serverUrl)throw new Error("No n8n Webhook / MCP URL configured.");const t={name:e.name||e.full_name||"",email:e.email||"",whatsapp:e.whatsapp||e.whatsapp_number||"",topic:e.topic||e.subject||"",message:e.message||""};try{const a=await fetch("/api/mcp/call-tool",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:this.serverUrl,secret:this.secretKey,toolName:"submit_customer_inquiry",args:t})});if(a.ok)return await a.json();console.warn("[McpClient] Proxy returned HTTP "+a.status+", attempting direct POST...")}catch(a){console.warn("[McpClient] Proxy call failed, attempting direct POST...",a)}const s=this.serverUrl.includes("/mcp-test")||this.serverUrl.includes("/mcp/")?{jsonrpc:"2.0",id:`mcp-${Date.now()}`,method:"tools/call",params:{name:"submit_customer_inquiry",arguments:t}}:t,n=await fetch(this.serverUrl,{method:"POST",headers:{Accept:"application/json, text/event-stream","Content-Type":"application/json",...this.secretKey?{Authorization:`Bearer ${this.secretKey}`,"X-MCP-Secret":this.secretKey}:{}},body:JSON.stringify(s)});if(!n.ok)throw new Error(`Direct POST failed with HTTP ${n.status} (${n.statusText})`);try{return await n.json()}catch{return{status:n.status,ok:!0}}}}const He=new jl,en="ai_tools_app_settings_v1",lt="https://n8n-1rsy.srv1898856.hstgr.cloud/mcp-test/69318bf8-f20c-4dab-91cf-604c84ce94b1";function Xr(){var r;try{const e=localStorage.getItem(en),t=e?JSON.parse(e):{},i={mcpWebhookUrl:t.mcpWebhookUrl||lt,mcpUrlType:t.mcpUrlType||((r=t.mcpWebhookUrl)!=null&&r.includes("mcp-test")?"test":"production"),mcpSecretKey:t.mcpSecretKey||"",adminWhatsappNumber:t.adminWhatsappNumber||"",adminWhatsappUrl:t.adminWhatsappUrl||Pe||""};return He.setServerUrl(i.mcpWebhookUrl),He.setSecretKey(i.mcpSecretKey),i}catch{return{mcpWebhookUrl:lt,mcpUrlType:"test",mcpSecretKey:"",adminWhatsappNumber:"",adminWhatsappUrl:Pe||""}}}function zl(r){const t={...Xr(),...r};try{localStorage.setItem(en,JSON.stringify(t)),He.setServerUrl(t.mcpWebhookUrl),He.setSecretKey(t.mcpSecretKey)}catch(i){console.warn("[Settings] Failed to save settings to localStorage:",i)}return t}async function Ml(r){document.title="Contact & Support | AI Tools Store";const e=Pe;r.innerHTML=`
    ${ke("/contact")}

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

            <!-- Topic with Quick Chips -->
            <div class="form-group">
              <div class="quick-topic-label">
                <label for="contact-subject" style="margin-bottom: 0;">Inquiry Topic *</label>
                <span style="font-size: 0.72rem; color: var(--accent-cyan);">Tap a chip to auto-select</span>
              </div>
              <div class="quick-topic-chips" id="topic-chips-group">
                <button type="button" class="topic-chip active" data-topic="License Activation">🔑 License Activation</button>
                <button type="button" class="topic-chip" data-topic="Payment Inquiry">💳 Payment Inquiry</button>
                <button type="button" class="topic-chip" data-topic="Video Tutorial Help">🎥 Tutorial Help</button>
                <button type="button" class="topic-chip" data-topic="Enterprise & Bulk Order">💼 Bulk Order</button>
              </div>
              <div class="form-input-wrapper">
                <span class="form-input-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </span>
                <input type="text" id="contact-subject" class="form-input-stylish" value="License Activation" placeholder="Select or type your inquiry topic..." required />
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

    ${xe()}
  `,Se();const t=document.querySelectorAll(".topic-chip"),i=document.getElementById("contact-subject");t.forEach(n=>{n.onclick=()=>{t.forEach(a=>a.classList.remove("active")),n.classList.add("active"),i&&(i.value=n.dataset.topic)}});const s=document.getElementById("contact-form");s&&(s.onsubmit=async n=>{var p,g,f,v,y,w,S,$,A,T;n.preventDefault();const a=s.querySelector('button[type="submit"]'),o=a?a.innerHTML:"<span>Send Message</span>",l=((g=(p=document.getElementById("contact-name"))==null?void 0:p.value)==null?void 0:g.trim())||"",c=((v=(f=document.getElementById("contact-email"))==null?void 0:f.value)==null?void 0:v.trim())||"",d=((w=(y=document.getElementById("contact-whatsapp"))==null?void 0:y.value)==null?void 0:w.trim())||"",u=(($=(S=document.getElementById("contact-subject"))==null?void 0:S.value)==null?void 0:$.trim())||"General Inquiry",h=((T=(A=document.getElementById("contact-message"))==null?void 0:A.value)==null?void 0:T.trim())||"";a&&(a.disabled=!0,a.innerHTML="<span>Sending Message...</span>");try{if(G){const K=d?`📱 WhatsApp: ${d}

${h}`:h,{error:j}=await F.from("contact_messages").insert([{full_name:l,email:c,subject:u,message:K,created_at:new Date().toISOString()}]);j&&console.warn("[ContactPage] Supabase insert warning:",j.message)}const R=Xr();if(R.mcpWebhookUrl&&R.mcpWebhookUrl.trim().startsWith("http")){He.setServerUrl(R.mcpWebhookUrl),He.setSecretKey(R.mcpSecretKey||"");try{await He.submitInquiry({name:l,email:c,whatsapp:d,topic:u,message:h})}catch(K){console.warn("[ContactPage] n8n submission notice:",K.message)}}B(`Thank you, ${l}! Your message has been received. Our team will contact you shortly.`,"success"),s.reset(),t.forEach((K,j)=>K.classList.toggle("active",j===0)),i&&(i.value="License Activation")}catch(R){console.error("[ContactPage] Error submitting form:",R),B(`Thank you, ${l}! Your message has been received.`,"success"),s.reset()}finally{a&&(a.disabled=!1,a.innerHTML=o)}}),document.querySelectorAll(".faq-question-btn").forEach(n=>{n.onclick=()=>{const a=n.closest(".faq-item-card"),o=a.querySelector(".faq-answer-body");a.classList.contains("is-open")?(a.classList.remove("is-open"),o.style.display="none"):(a.classList.add("is-open"),o.style.display="block")}})}async function ql(r,{queryParams:e}){document.title=`🔥 Hot Deals & BOGO Offers | ${m("nav.brand")}`;let t=await ee.getHotDeals(),i=H.getUserCountry()||"Pakistan",s="All",n="";const a=["All",...new Set(t.map(f=>f.category||"Hot Deals").filter(Boolean))];function o(f){return!f||f.length===0?`
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
        ${f.map(v=>{const y=Ut(v,i),{amount:w,periodHtml:S}=Gr(y,"/mo"),$=v.regularPrice||"PKR 4,999 /mo",A=v.buyQuantity||1,T=v.freeQuantity||1,R=v.offerLabel||"BUY 1 GET 1 FREE",K=(v.whatsappUrl||"").includes("wa.me")||(v.whatsappUrl||"").includes("whatsapp.com")?v.whatsappUrl:"https://wa.me/923001234567",j=encodeURIComponent(`🔥 *HOT DEAL ORDER INQUIRY*
• Deal: ${v.name}
• Offer: ${R} (Buy: ${A} | Get Free: ${T})
• Validity / Duration: ${v.duration||"1 Month"}
• Price: ${y}
• Region: ${i}

Please share payment details and activate my deal access.`);let M=K;return K.includes("chat.whatsapp.com")||K.includes("/channel/")?M=K:K.includes("?")?M=`${K}&text=${j}`:M=`${K}?text=${j}`,`
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
                    🔥 ${R}
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
                        ${A} Qty
                      </div>
                    </div>

                    <div style="font-size: 1.1rem; font-weight: 800; color: #f97316;">+</div>

                    <div style="background: rgba(239, 68, 68, 0.12); padding: 0.5rem 0.25rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.35);">
                      <div style="font-size: 0.65rem; color: #fca5a5; font-weight: 800; text-transform: uppercase;">YOU GET FREE</div>
                      <div style="font-size: 0.95rem; font-weight: 800; color: #ef4444; margin-top: 0.15rem;">
                        ${T} FREE 🎁
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Price Row -->
                <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1.1rem;">
                  <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block; text-transform: uppercase; font-weight: 600;">Promo Price:</span>
                    <div style="display: flex; align-items: baseline; gap: 0.4rem;">
                      <span style="font-size: 1.35rem; font-weight: 900; color: #34d399; letter-spacing: -0.02em;">
                        ${w}
                      </span>
                      <span style="font-size: 0.78rem; color: var(--text-muted);">${S||""}</span>
                    </div>
                  </div>

                  <div style="text-align: right;">
                    <span style="font-size: 0.68rem; color: var(--text-muted); display: block; text-transform: uppercase;">Regular Value:</span>
                    <span style="font-size: 0.88rem; color: #94a3b8; text-decoration: line-through; font-weight: 600;">
                      ${$}
                    </span>
                  </div>
                </div>

                <!-- Action Button: Claim Deal on WhatsApp -->
                <a 
                  href="${M}" 
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
    `}function l(){let f=[...t];if(s&&s!=="All"&&(f=f.filter(v=>(v.category||"").toLowerCase()===s.toLowerCase())),n.trim()){const v=n.toLowerCase().trim();f=f.filter(y=>(y.name||"").toLowerCase().includes(v)||(y.shortDescription||"").toLowerCase().includes(v)||(y.offerLabel||"").toLowerCase().includes(v)||(y.category||"").toLowerCase().includes(v))}return f}r.innerHTML=`
    ${ke("/deals")}

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
              value="${n}"
              class="search-input-field"
            />
          </div>

          <div style="font-size: 0.88rem; color: var(--text-muted);">
            Active Offers: <strong id="deals-counter" style="color: #fb923c;">${t.length}</strong>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="filter-chips-row" id="deals-category-chips" style="margin-top: 1rem;">
          ${a.map(f=>`
            <button class="filter-chip ${s===f?"active":""}" data-category="${f}">
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

    ${xe()}
  `,Se();const c=r.querySelector("#deals-search-input"),d=r.querySelector("#hot-deals-container"),u=r.querySelector("#deals-counter");function h(){const f=l();d&&(d.innerHTML=o(f)),u&&(u.textContent=f.length),g()}c&&c.addEventListener("input",f=>{n=f.target.value,h()});const p=r.querySelector("#deals-category-chips");p&&p.addEventListener("click",f=>{const v=f.target.closest(".filter-chip");v&&(p.querySelectorAll(".filter-chip").forEach(y=>y.classList.remove("active")),v.classList.add("active"),s=v.dataset.category||"All",h())});function g(){const f=r.querySelector("#btn-reset-deals-filters");f&&f.addEventListener("click",()=>{n="",s="All",c&&(c.value=""),p&&p.querySelectorAll(".filter-chip").forEach(v=>{v.classList.toggle("active",v.dataset.category==="All")}),h()})}if(g(),window._publicDealsRealtimeUnsub)try{window._publicDealsRealtimeUnsub()}catch{}window._publicDealsRealtimeUnsub=ee.subscribeToHotDeals(async()=>{try{t=await ee.getHotDeals(),h()}catch{}})}let me="tools",ce="Pakistan";async function fe(r){var M,_,N,b,L,Q,J,z,V,de,ue,he,le;if(document.title="Admin Management | AI Tools Store",!G){r.innerHTML=`
      ${ke("/admin")}
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
      ${xe()}
    `,Se();return}const e=await H.getCurrentUser(),t=H.currentProfile;if(!e){r.innerHTML=`
      ${ke("/admin")}
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
      ${xe()}
    `,Se();const k=document.getElementById("admin-login-form"),U=document.getElementById("admin-login-btn");k.onsubmit=async O=>{O.preventDefault();const q=document.getElementById("admin-email").value.trim(),W=document.getElementById("admin-password").value;U.textContent="Authenticating...",U.disabled=!0;try{await H.signIn({email:q,password:W}),H.isAdmin()?(B("Signed in successfully as Administrator.","success"),fe(r)):(B("Signed in, but this account is not registered as an administrator.","warning"),fe(r))}catch(te){B(`Authentication failed: ${te.message}`,"error"),U.textContent="Sign In to Admin Panel",U.disabled=!1}};return}if(!H.isAdmin(e,t)){r.innerHTML=`
      ${ke("/admin")}
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
      ${xe()}
    `,Se(),(M=document.getElementById("admin-switch-account-btn"))==null||M.addEventListener("click",async()=>{await H.signOut(),fe(r)});return}let i=[];try{i=await ee.adminGetTools()}catch(k){B(`Failed to load tools from Supabase: ${k.message}`,"error")}let s=[];try{s=await ee.adminGetCategories()}catch(k){console.warn("Could not load categories:",k)}let n=[];try{n=await H.getRegisteredUsers()}catch(k){console.warn("Could not load registered users:",k)}let a=[];try{a=await ee.adminGetHotDeals()}catch(k){console.warn("Could not load hot deals:",k)}const o=i.filter(k=>k.active).length,l=i.filter(k=>k.featured).length,c=s.map(k=>k.name),d=n.filter(k=>k.role==="admin").length,u=Xr();r.innerHTML=`
    ${ke("/admin")}

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
          <button id="admin-add-cat-top-btn" class="btn btn-secondary" style="font-size: 0.88rem; padding: 0.65rem 1.25rem; font-weight: 700; border-color: rgba(168, 85, 247, 0.4); color: #c084fc;">
            + Add Category
          </button>
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
        <button class="admin-tab-btn ${me==="tools"?"active":""}" data-tab="tools">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>AI Tools Inventory (${i.length})</span>
        </button>

        <button class="admin-tab-btn ${me==="deals"?"active":""}" data-tab="deals" style="${me==="deals"?"border-color: #fb923c;":""}">
          <span style="font-size: 1.05rem;">🔥</span>
          <span>Hot Deals &amp; BOGO (${a.length})</span>
        </button>

        <button class="admin-tab-btn ${me==="categories"?"active":""}" data-tab="categories">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Categories Catalog (${s.length})</span>
        </button>

        <button class="admin-tab-btn ${me==="users"?"active":""}" data-tab="users">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Registered Members (${n.length})</span>
        </button>

        <button class="admin-tab-btn ${me==="analytics"?"active":""}" data-tab="analytics">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span>Store Analytics & KPIs</span>
        </button>

        <button class="admin-tab-btn ${me==="settings"?"active":""}" data-tab="settings">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Store & WhatsApp Settings</span>
        </button>
      </div>

      <!-- TAB 1: AI TOOLS INVENTORY -->
      <div id="tab-content-tools" style="${me==="tools"?"display: block;":"display: none;"}">
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
              <div class="kpi-number">${o}</div>
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
              <div class="kpi-number">${l}</div>
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
              <option value="ALL">All Categories (${c.length})</option>
              ${c.map(k=>`<option value="${k}">${k}</option>`).join("")}
            </select>

            <select id="tools-status-filter" class="admin-search-input" style="min-width: 150px;">
              <option value="ALL">All Status (${i.length})</option>
              <option value="ACTIVE">Active Only (${o})</option>
              <option value="INACTIVE">Inactive Only (${i.length-o})</option>
              <option value="FEATURED">Featured (${l})</option>
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
                  <span>Sync Storefront to <strong id="admin-preview-country-label">${ce}</strong> ↗</span>
                </button>
              </div>
            </div>

            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="admin-pricing-country-chips">
              <button type="button" class="currency-chip ${ce==="Pakistan"?"active":""}" data-country="Pakistan">
                <span>🇵🇰</span> <span>Pakistan (PKR)</span>
              </button>
              <button type="button" class="currency-chip ${ce==="India"?"active":""}" data-country="India">
                <span>🇮🇳</span> <span>India (INR ₹)</span>
              </button>
              <button type="button" class="currency-chip ${ce==="United Arab Emirates"?"active":""}" data-country="United Arab Emirates">
                <span>🇦🇪</span> <span>UAE (AED)</span>
              </button>
              <button type="button" class="currency-chip ${ce==="Saudi Arabia"?"active":""}" data-country="Saudi Arabia">
                <span>🇸🇦</span> <span>Saudi Arabia (SAR)</span>
              </button>
              <button type="button" class="currency-chip ${ce==="United States"?"active":""}" data-country="United States">
                <span>🇺🇸</span> <span>United States (USD $)</span>
              </button>
              <button type="button" class="currency-chip ${ce==="United Kingdom"?"active":""}" data-country="United Kingdom">
                <span>🇬🇧</span> <span>United Kingdom (GBP £)</span>
              </button>
              <button type="button" class="currency-chip ${ce==="Global"?"active":""}" data-country="Global">
                <span>🌐</span> <span>Global / Others (USD)</span>
              </button>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                <span>AI Tools Inventory</span>
                <span id="admin-table-country-pill" class="badge badge-new" style="font-size: 0.72rem; font-weight: 700;">
                  ${Fe(ce)} Showing ${ce} Pricing
                </span>
              </h3>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Real-time Supabase Database Sync</span>
          </div>

          <div id="tools-table-container">
            ${us(i,ce)}
          </div>
        </div>
      </div>

      <!-- TAB DEALS: HOT DEALS & PROMOTIONS -->
      <div id="tab-content-deals" style="${me==="deals"?"display: block;":"display: none;"}">
        <!-- Hot Deals KPI Summary Row -->
        <div class="kpi-row" style="margin-bottom: 2rem;">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Hot Deals</h4>
              <div class="kpi-number">${a.length}</div>
              <div class="kpi-delta" style="color: #fb923c;">Promotional offerings</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(249, 115, 22, 0.15); color: #fb923c; font-size: 1.3rem;">
              🔥
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Active Live Deals</h4>
              <div class="kpi-number">${a.filter(k=>k.active).length}</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">Visible on /deals storefront</div>
            </div>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 1.3rem;">
              ✓
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>BOGO &amp; Combo Offers</h4>
              <div class="kpi-number">${a.filter(k=>(k.offerLabel||"").toLowerCase().includes("get")||k.freeQuantity>0).length}</div>
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
              Total <strong id="deals-admin-count-badge" style="color: var(--text-pure);">${a.length}</strong> deals
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
            ${Er(a,ce)}
          </div>
        </div>
      </div>

      <!-- TAB 2: CATEGORIES MANAGEMENT -->
      <div id="tab-content-categories" style="${me==="categories"?"display: block;":"display: none;"}">
        <!-- Categories KPI Summary Row -->
        <div class="kpi-row" style="margin-bottom: 2rem;">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Active Categories</h4>
              <div class="kpi-number">${s.length}</div>
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
              <div class="kpi-number">${s.length?(i.length/s.length).toFixed(1):0}</div>
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
              Total <strong id="categories-count-badge" style="color: var(--text-pure);">${s.length}</strong> categories
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
            ${gs(s)}
          </div>
        </div>
      </div>

      <!-- TAB 3: REGISTERED MEMBERS DIRECTORY -->
      <div id="tab-content-users" style="${me==="users"?"display: block;":"display: none;"}">
        <!-- Members Summary KPIs -->
        <div class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Total Registered Members</h4>
              <div class="kpi-number">${n.length}</div>
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
              <div class="kpi-number">${d}</div>
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
              <div class="kpi-number">${n.length-d}</div>
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
            Total users: <strong style="color: var(--text-pure);">${n.length}</strong>
          </span>
        </div>

        <!-- Users Table Card -->
        <div class="admin-table-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700;">Customer & Member Directory</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Role access controls & WhatsApp direct concierge</span>
          </div>

          <div id="users-table-container">
            ${ps(n)}
          </div>
        </div>
      </div>

      <!-- TAB 3: STORE ANALYTICS & KPIS -->
      <div id="tab-content-analytics" style="${me==="analytics"?"display: block;":"display: none;"}">
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
              <div class="kpi-number">${i.length>0?Math.round(o/i.length*100):0}%</div>
              <div class="kpi-delta" style="color: var(--accent-mint);">${o} active / ${i.length} total</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-info">
              <h4>Taxonomy Categories</h4>
              <div class="kpi-number">${c.length}</div>
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
            ${s.map(k=>{const U=i.filter(q=>(q.category||"").toLowerCase()===k.name.toLowerCase()).length,O=i.length>0?Math.round(U/i.length*100):0;return`
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.35rem;">
                    <span style="font-weight: 600; color: var(--text-pure);">${k.icon||"✨"} ${k.name}</span>
                    <span style="color: var(--text-secondary);">${U} tools (${O}%)</span>
                  </div>
                  <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden;">
                    <div style="width: ${O}%; height: 100%; background: linear-gradient(90deg, ${k.color||"#38bdf8"}, #818cf8); border-radius: 999px;"></div>
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
      <div id="tab-content-settings" style="${me==="settings"?"display: block;":"display: none;"}">
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
                class="admin-tab-btn ${u.mcpUrlType!=="production"?"active":""}"
                style="padding: 0.45rem 1rem; font-size: 0.82rem; font-weight: 700;"
              >
                🧪 Development / Test URL
              </button>
              <button 
                id="btn-switch-prod-url" 
                type="button" 
                class="admin-tab-btn ${u.mcpUrlType==="production"?"active":""}"
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
                value="${u.mcpWebhookUrl||lt}" 
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
              value="${u.mcpSecretKey||""}" 
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
                value="${u.adminWhatsappNumber||""}" 
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
                value="${u.adminWhatsappUrl||Pe}" 
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

        <!-- Card 3: Cloud Database Status -->
        <div class="admin-table-card" style="max-width: 860px; margin-bottom: 2rem;">
          <h3 style="font-size: 1.15rem; color: var(--text-pure); font-weight: 700; margin-bottom: 0.5rem;">
            Database Connection Diagnostics
          </h3>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Supabase Cloud Project URL</label>
            <input 
              type="text" 
              class="form-input" 
              value="${dt("VITE_SUPABASE_URL","https://rqemoitjanmxsmcmveso.supabase.co")}" 
              readonly 
            />
          </div>
          <div style="display: flex; gap: 1rem; align-items: center; padding-top: 0.5rem;">
            <button id="btn-test-db-ping" type="button" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              Test Database Ping
            </button>
            <span id="db-ping-status" style="font-size: 0.85rem; color: var(--text-muted);"></span>
          </div>
        </div>
      </div>
    </main>

    ${xe()}
  `,Se(),document.querySelectorAll(".admin-tab-btn").forEach(k=>{k.onclick=()=>{const U=k.dataset.tab;me=U,document.querySelectorAll(".admin-tab-btn").forEach(O=>O.classList.remove("active")),k.classList.add("active"),["tools","deals","categories","users","analytics","settings"].forEach(O=>{const q=document.getElementById(`tab-content-${O}`);q&&(q.style.display=O===U?"block":"none")})}});const h=document.getElementById("tools-search-input"),p=document.getElementById("tools-category-filter"),g=document.getElementById("tools-status-filter"),f=()=>{const k=((h==null?void 0:h.value)||"").toLowerCase().trim(),U=(p==null?void 0:p.value)||"ALL",O=(g==null?void 0:g.value)||"ALL",q=i.filter(ie=>{const Y=!k||(ie.name||"").toLowerCase().includes(k)||(ie.slug||"").toLowerCase().includes(k)||(ie.shortDescription||"").toLowerCase().includes(k),re=U==="ALL"||ie.category===U,Le=O==="ALL"||O==="ACTIVE"&&ie.active||O==="INACTIVE"&&!ie.active||O==="FEATURED"&&ie.featured;return Y&&re&&Le}),W=document.getElementById("tools-table-container"),te=document.getElementById("tools-count-badge");te&&(te.textContent=q.length),W&&(W.innerHTML=us(q,ce),hs(q,r))};h&&(h.oninput=f),p&&(p.onchange=f),g&&(g.onchange=f);const v=document.getElementById("admin-pricing-country-chips");v&&v.querySelectorAll(".currency-chip").forEach(k=>{k.onclick=U=>{U.preventDefault();const O=k.dataset.country;ce=O,v.querySelectorAll(".currency-chip").forEach(te=>te.classList.remove("active")),k.classList.add("active");const q=document.getElementById("admin-preview-country-label");q&&(q.textContent=O);const W=document.getElementById("admin-table-country-pill");W&&(W.innerHTML=`${Fe(O)} Showing ${O} Pricing`),f(),B(`Admin Pricing Inspector: Showing ${O} rates`,"info")}});const y=document.getElementById("admin-sync-store-country-btn");y&&(y.onclick=()=>{H.setUserCountry(ce),B(`✓ Storefront synchronized to ${ce} rates!`,"success")}),hs(i,r);const w=document.getElementById("categories-search-input");w&&(w.oninput=()=>{const k=(w.value||"").toLowerCase().trim(),U=s.filter(W=>!k||(W.name||"").toLowerCase().includes(k)||(W.slug||"").toLowerCase().includes(k)||(W.description||W.desc||"").toLowerCase().includes(k)),O=document.getElementById("admin-categories-table-container"),q=document.getElementById("categories-count-badge");q&&(q.textContent=U.length),O&&(O.innerHTML=gs(U),fs(U,r,s))}),fs(s,r,s);const S=document.getElementById("users-search-input");S&&(S.oninput=()=>{const k=(S.value||"").toLowerCase().trim(),U=n.filter(q=>!k||(q.full_name||"").toLowerCase().includes(k)||(q.email||"").toLowerCase().includes(k)||(q.whatsapp_number||"").toLowerCase().includes(k)),O=document.getElementById("users-table-container");O&&(O.innerHTML=ps(U),ms(U,r))}),ms(n,r);const $=document.getElementById("deals-admin-search-input");if($&&($.oninput=()=>{const k=($.value||"").toLowerCase().trim(),U=a.filter(W=>!k||(W.name||"").toLowerCase().includes(k)||(W.slug||"").toLowerCase().includes(k)||(W.offerLabel||"").toLowerCase().includes(k)||(W.category||"").toLowerCase().includes(k)),O=document.getElementById("admin-deals-table-container"),q=document.getElementById("deals-admin-count-badge");q&&(q.textContent=U.length),O&&(O.innerHTML=Er(U,ce),Tr(U,r,i))}),Tr(a,r,i),window._adminDealsRealtimeUnsub)try{window._adminDealsRealtimeUnsub()}catch{}window._adminDealsRealtimeUnsub=ee.subscribeToHotDeals(async()=>{try{a=await ee.adminGetHotDeals();const k=document.getElementById("admin-deals-table-container"),U=document.getElementById("deals-admin-count-badge");U&&(U.textContent=a.length),k&&(k.innerHTML=Er(a,ce),Tr(a,r,i))}catch{}}),(_=document.getElementById("admin-add-deal-btn"))==null||_.addEventListener("click",()=>{Wr(null,r,i)}),(N=document.getElementById("admin-add-deal-top-btn"))==null||N.addEventListener("click",()=>{Wr(null,r,i)}),(b=document.getElementById("admin-signout-btn"))==null||b.addEventListener("click",async()=>{await H.signOut(),B("Signed out from Administrator Console.","info"),fe(r)}),(L=document.getElementById("admin-add-tool-btn"))==null||L.addEventListener("click",()=>{tn(null,r,s)}),(Q=document.getElementById("admin-add-category-btn"))==null||Q.addEventListener("click",()=>{cr(null,r,s)}),(J=document.getElementById("admin-add-cat-top-btn"))==null||J.addEventListener("click",()=>{cr(null,r,s)}),(z=document.getElementById("btn-test-db-ping"))==null||z.addEventListener("click",async()=>{const k=document.getElementById("db-ping-status");k&&(k.textContent="Pinging Supabase...");const U=performance.now();try{const{count:O,error:q}=await F.from("tools").select("*",{count:"exact",head:!0}),W=Math.round(performance.now()-U);if(!q)k&&(k.textContent=`✓ Connected! Roundtrip latency: ${W}ms (Total tools: ${O})`,k.style.color="#34d399");else throw q}catch(O){k&&(k.textContent=`Ping failed: ${O.message}`,k.style.color="#f87171")}});const A=document.getElementById("settings-mcp-webhook-url"),T=document.getElementById("btn-switch-test-url"),R=document.getElementById("btn-switch-prod-url"),K=document.getElementById("btn-reset-test-url");T==null||T.addEventListener("click",()=>{T.classList.add("active"),R==null||R.classList.remove("active"),A&&((!A.value||A.value.includes("/mcp/"))&&(A.value=lt),A.focus()),B("Switched to n8n MCP Development / Test URL mode","info")}),R==null||R.addEventListener("click",()=>{R.classList.add("active"),T==null||T.classList.remove("active"),A&&(A.value.includes("/mcp-test/")?A.value=A.value.replace("/mcp-test/","/mcp/"):A.value||(A.value=lt.replace("/mcp-test/","/mcp/")),A.focus()),B("Switched to n8n MCP Live Production URL mode","info")}),K==null||K.addEventListener("click",()=>{A&&(A.value=lt,A.focus()),T==null||T.classList.add("active"),R==null||R.classList.remove("active"),B("Active Test MCP URL restored.","success")}),(V=document.getElementById("btn-paste-mcp-url"))==null||V.addEventListener("click",async()=>{try{const k=await navigator.clipboard.readText();k?A&&(A.value=k.trim(),A.focus(),B("✓ Link clipboard se paste ho gaya!","success")):B("Clipboard mein koi text nahi mila.","info")}catch{B("Clipboard direct access nahi mila. Input box mein Ctrl + V karein.","info")}}),(de=document.getElementById("btn-clear-mcp-url"))==null||de.addEventListener("click",()=>{A&&(A.value="",A.focus(),B("Link clear ho gaya.","info"))});const j=async()=>{var te,ie;const k=document.getElementById("settings-mcp-secret"),U=document.getElementById("mcp-ping-status"),O=document.getElementById("mcp-diagnostics-panel"),q=((te=A==null?void 0:A.value)==null?void 0:te.trim())||"",W=((ie=k==null?void 0:k.value)==null?void 0:ie.trim())||"";if(!q){B("Please enter an n8n MCP URL first.","error"),U&&(U.textContent="URL required",U.style.color="#f87171");return}U&&(U.textContent="Connecting to n8n MCP Server via SSE + JSON-RPC...",U.style.color="var(--accent-cyan)"),O&&(O.style.display="block",O.innerHTML=`
        <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--accent-cyan);">
          <span class="status-dot-pulse" style="background: var(--accent-cyan);"></span>
          <span style="font-size: 0.9rem; font-weight: 600;">Initiating Model Context Protocol handshake...</span>
        </div>
      `);try{const Y=await He.testConnection(q,W),re=!!Y.connected,Le=Y.status||0,Ne=Y.statusText||(re?"OK":"Failed"),Ke=Y.latencyMs?`${Y.latencyMs}ms`:"—",We=Y.protocol||"MCP/1.0 (SSE + JSON-RPC 2.0)",Bt=Y.error||"",Dt=Y.message||"Connected successfully to n8n MCP Server Trigger!";U&&(U.textContent=re?"✓ MCP Connected!":"✕ Connection failed",U.style.color=re?"#34d399":"#f87171"),O&&(O.style.display="block",O.innerHTML=`
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
                  HTTP Status: ${Le} ${Ne}
                </span>
                <span class="badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; font-size: 0.8rem;">
                  Latency: ${Ke}
                </span>
                <span class="badge" style="background: rgba(99, 102, 241, 0.15); color: #a5b4fc; font-size: 0.8rem;">
                  ${We}
                </span>
              </div>
            </div>

            <!-- Detailed Message Box -->
            <div style="padding: 0.85rem 1rem; border-radius: 8px; background: ${re?"rgba(16, 185, 129, 0.1)":"rgba(239, 68, 68, 0.1)"}; border: 1px solid ${re?"rgba(16, 185, 129, 0.3)":"rgba(239, 68, 68, 0.3)"};">
              <div style="font-size: 0.88rem; font-weight: 700; color: ${re?"#34d399":"#f87171"}; margin-bottom: 0.25rem;">
                ${re?"MCP Handshake Verified":"Error Message / Diagnostics:"}
              </div>
              <p style="font-size: 0.84rem; color: #cbd5e1; margin: 0; line-height: 1.5;">
                ${re?Dt:Bt}
              </p>
            </div>

            ${!re&&q.includes("mcp-test")?`
              <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.45;">
                👉 <strong>How to resolve:</strong> Make sure your n8n workflow tab is open, click the orange <strong>"Execute step"</strong> button on the MCP Server Trigger node, and then click <strong>"Test MCP Connection"</strong> again within 120 seconds.
              </div>
            `:""}
          </div>
        `),B(re?"MCP Server connection verified!":`MCP connection: ${Ne}`,re?"success":"error")}catch(Y){U&&(U.textContent=`Connection failed: ${Y.message}`,U.style.color="#f87171"),O&&(O.style.display="block",O.innerHTML=`
          <div style="color: #f87171; font-weight: 700; font-size: 0.9rem;">
            ✕ Connection failed (HTTP Status: 0 Network Error)
          </div>
          <p style="color: #cbd5e1; font-size: 0.82rem; margin: 0.4rem 0 0 0;">
            ${Y.message}
          </p>
        `),B(`MCP connection failed: ${Y.message}`,"error")}};(ue=document.getElementById("btn-test-mcp-connection"))==null||ue.addEventListener("click",j),(he=document.getElementById("btn-test-mcp-ping"))==null||he.addEventListener("click",j),(le=document.getElementById("btn-save-all-settings"))==null||le.addEventListener("click",()=>{var te,ie,Y,re,Le,Ne,Ke,We;const k=((ie=(te=document.getElementById("settings-mcp-webhook-url"))==null?void 0:te.value)==null?void 0:ie.trim())||"",U=((re=(Y=document.getElementById("settings-mcp-secret"))==null?void 0:Y.value)==null?void 0:re.trim())||"",O=((Ne=(Le=document.getElementById("settings-admin-whatsapp-number"))==null?void 0:Le.value)==null?void 0:Ne.trim())||"",q=((We=(Ke=document.getElementById("settings-admin-whatsapp-url"))==null?void 0:Ke.value)==null?void 0:We.trim())||"",W=document.getElementById("settings-save-status");zl({mcpWebhookUrl:k,mcpSecretKey:U,adminWhatsappNumber:O,adminWhatsappUrl:q}),W&&(W.textContent="✓ All settings saved successfully!",setTimeout(()=>{W&&(W.textContent="")},3500)),B("n8n MCP & WhatsApp settings saved!","success")})}function us(r,e=ce){return!r||r.length===0?`
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
          <th>Price (${Fe(e)} ${e})</th>
          <th>All Rates Set</th>
          <th>WhatsApp Link</th>
          <th>Video Tutorial</th>
          <th>Featured</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(i=>{const s=Ut(i,e),n=i.countryPricing||{},a=!!(n[e]||e==="Pakistan"&&(n.Pakistan||n.pakistan||n.PK)||e==="India"&&(n.India||n.india||n.IN)||e==="United Arab Emirates"&&(n["United Arab Emirates"]||n.UAE||n.AE)||e==="Saudi Arabia"&&(n["Saudi Arabia"]||n.Saudi||n.SAR||n.SA)||e==="United States"&&(n["United States"]||n.US||n.USD)||e==="United Kingdom"&&(n["United Kingdom"]||n.UK||n.GBP||n.GB)),o=n.Pakistan||n.PK||"—",l=n.India||n.IN||"—",c=n["United Arab Emirates"]||n.UAE||"—",d=n["Saudi Arabia"]||n.SAR||"—",u=n["United States"]||n.USD||n.DEFAULT||i.price||"—";return`
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
              <div style="font-size: 0.95rem; font-weight: 800; color: ${a?"#34d399":"var(--accent-cyan)"}; white-space: nowrap;">
                ${s}
              </div>
              <div style="margin-top: 0.2rem;">
                ${a?'<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.65rem; border: 1px solid rgba(16, 185, 129, 0.35);">✓ Custom Rate</span>':'<span class="badge" style="background: rgba(148, 163, 184, 0.12); color: var(--text-muted); font-size: 0.65rem; border: 1px solid rgba(148, 163, 184, 0.2);">Default / USD</span>'}
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
  `}function hs(r,e){document.querySelectorAll(".toggle-active-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.id,n=!(t.dataset.active==="true");try{await ee.adminToggleActive(i,n),B(`Tool status changed to ${n?"Active":"Inactive"}.`,"success"),fe(e)}catch(a){B(`Error: ${a.message}`,"error")}}}),document.querySelectorAll(".toggle-featured-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.id,n=!(t.dataset.featured==="true");try{const a=r.find(o=>o.id===i);a&&(await ee.adminSaveTool({...a,featured:n}),B(`Tool marked as ${n?"Featured":"Standard"}.`,"success"),fe(e))}catch(a){B(`Error updating featured: ${a.message}`,"error")}}}),document.querySelectorAll(".edit-tool-btn").forEach(t=>{t.onclick=()=>{const i=t.dataset.id,s=r.find(n=>n.id===i);s&&tn(s,e,categories)}}),document.querySelectorAll(".delete-tool-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.id,s=t.dataset.name;if(confirm(`Are you sure you want to permanently delete "${s}" from Supabase?`))try{await ee.adminDeleteTool(i),B(`Deleted "${s}" from Supabase.`,"success"),fe(e)}catch(n){B(`Failed to delete: ${n.message}`,"error")}}})}function ps(r){return!r||r.length===0?`
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
          <th>Role Action</th>
        </tr>
      </thead>
      <tbody>
        ${r.map(e=>{const t=e.role==="admin",i=(e.full_name||e.email||"U").charAt(0).toUpperCase(),s=(e.whatsapp_number||"").replace(/\D/g,""),n=e.created_at?new Date(e.created_at).toLocaleDateString():"Active",a=e.last_sign_in_at?new Date(e.last_sign_in_at).toLocaleDateString():"—";return`
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
                ${s?`
                  <a href="https://wa.me/${s}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-mint); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;" title="Chat on WhatsApp">
                    <span>${e.whatsapp_number}</span>
                    <span style="font-size: 0.7rem;">↗</span>
                  </a>
                `:'<span style="color: var(--text-muted); font-size: 0.82rem;">None</span>'}
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.4rem; font-weight: 600; color: var(--text-pure); font-size: 0.85rem;">
                  <span>${Fe(e.country)}</span>
                  <span>${e.country||"Pakistan"}</span>
                </div>
              </td>
              <td><span style="text-transform: uppercase; font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">${e.preferred_language||"en"}</span></td>
              <td style="font-size: 0.82rem; color: var(--text-muted);">${n}</td>
              <td style="font-size: 0.82rem; color: var(--accent-cyan); font-family: var(--font-mono);">${a}</td>
              <td>
                <span style="font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 999px; ${t?"background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4);":"background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);"}">
                  ${t?"🛡️ Administrator":"VIP Member"}
                </span>
              </td>
              <td>
                <button 
                  class="btn-details toggle-user-role-btn" 
                  data-user-id="${e.id}" 
                  data-user-role="${e.role}"
                  style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: ${t?"#f87171":"var(--accent-cyan)"};"
                >
                  ${t?"Demote to Member":"Promote to Admin"}
                </button>
              </td>
            </tr>
          `}).join("")}
      </tbody>
    </table>
  `}function ms(r,e){document.querySelectorAll(".toggle-user-role-btn").forEach(t=>{t.onclick=async()=>{const i=t.dataset.userId,n=t.dataset.userRole==="admin"?"member":"admin";if(confirm(`Change this user's role to "${n.toUpperCase()}"?`))try{await H.updateUserRole(i,n),B(`User role updated to ${n}.`,"success"),fe(e)}catch(a){B(`Failed to update role: ${a.message}`,"error")}}})}function gs(r){return!r||r.length===0?`
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
  `}function fs(r,e,t=[]){document.querySelectorAll(".edit-category-btn").forEach(i=>{i.onclick=()=>{const s=i.dataset.id,n=i.dataset.name,a=r.find(o=>o.id===s||o.name===n);a&&cr(a,e,t)}}),document.querySelectorAll(".delete-category-btn").forEach(i=>{i.onclick=async()=>{const s=i.dataset.id,n=i.dataset.name,a=parseInt(i.dataset.count,10)||0,o=a>0?`⚠️ Category "${n}" currently has ${a} tool(s) assigned to it.

Are you sure you want to permanently delete this category?`:`Are you sure you want to permanently delete category "${n}"?`;if(confirm(o))try{await ee.adminDeleteCategory(s,n),B(`Category "${n}" deleted successfully.`,"success"),fe(e)}catch(l){B(`Failed to delete category: ${l.message}`,"error")}}})}function cr(r,e,t=[]){const i=document.getElementById("modal-root")||document.body,s=!!r,n=r||{name:"",slug:"",icon:"✨",color:"#6366f1",description:"",image:"",sortOrder:t.length+1},a=document.createElement("div");a.className="modal-backdrop auth-backdrop-fade",a.innerHTML=`
    <div class="modal-card" style="max-width: 640px; max-height: 92vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800;">
            ${s?`Edit Category: ${n.name}`:"Create New AI Category"}
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
            <input type="text" id="cat-name" class="form-input" value="${n.name||""}" placeholder="e.g. AI Video Creation" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="cat-slug" class="form-input" value="${n.slug||""}" placeholder="e.g. ai-video-creation" required />
          </div>
        </div>

        <!-- Icon, Color & Sort Order -->
        <div style="display: grid; grid-template-columns: 0.6fr 1fr 0.6fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Icon (Emoji) *</label>
            <input type="text" id="cat-icon" class="form-input" value="${n.icon||"✨"}" placeholder="🎬" required style="font-size: 1.2rem; text-align: center;" />
          </div>
          <div class="form-group">
            <label class="form-label">Theme Color *</label>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <input type="color" id="cat-color-picker" value="${n.color||"#6366f1"}" style="width: 44px; height: 40px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: transparent; cursor: pointer; padding: 2px;" />
              <input type="text" id="cat-color-text" class="form-input" value="${n.color||"#6366f1"}" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Sort Order</label>
            <input type="number" id="cat-sort-order" class="form-input" value="${n.sortOrder??0}" min="0" />
          </div>
        </div>

        <!-- Preset Color Badges Row -->
        <div style="margin: -0.5rem 0 1.25rem 0; display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${["#a855f7","#3b82f6","#10b981","#f97316","#ec4899","#eab308","#06b6d4","#6366f1","#14b8a6","#ef4444"].map(A=>`
            <button type="button" class="preset-color-btn" data-color="${A}" style="width: 24px; height: 24px; border-radius: 50%; background: ${A}; border: 2px solid ${n.color===A?"#ffffff":"transparent"}; cursor: pointer; transition: transform 0.15s;"></button>
          `).join("")}
        </div>

        <!-- Details / Description -->
        <div class="form-group">
          <label class="form-label">Category Description & Details *</label>
          <textarea id="cat-description" class="form-textarea" style="min-height: 85px;" placeholder="Comprehensive details explaining what AI tools and creative workflows belong in this category..." required>${n.description||n.desc||""}</textarea>
        </div>

        <!-- Category Image Upload & Preview -->
        <div class="form-group">
          <label class="form-label">Category Image / Banner (Optional)</label>
          <div style="display: flex; gap: 0.75rem; margin-bottom: 0.6rem;">
            <input type="text" id="cat-image-url" class="form-input" value="${n.image||""}" placeholder="https://example.com/category-banner.png" style="flex: 1;" />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="cat-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="cat-upload-status" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-bottom: 0.5rem;"></span>

          <!-- Live Image Preview Container -->
          <div id="cat-image-preview-wrap" style="${n.image?"display: flex;":"display: none;"} align-items: center; gap: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-glass); border-radius: var(--radius-md);">
            <img id="cat-image-preview" src="${n.image||""}" alt="Preview" style="width: 70px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-glass);" />
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
            ${s?"Save Category Changes":"Create Category"}
          </button>
        </div>
      </form>
    </div>
  `,i.appendChild(a);const o=()=>a.remove();a.onclick=o,document.getElementById("cat-editor-close").onclick=o,document.getElementById("cat-cancel-btn").onclick=o;const l=document.getElementById("cat-name"),c=document.getElementById("cat-slug");s||(l.oninput=()=>{c.value=l.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")});const d=document.getElementById("cat-color-picker"),u=document.getElementById("cat-color-text");d.oninput=()=>{u.value=d.value},u.oninput=()=>{/^#[0-9a-f]{6}$/i.test(u.value)&&(d.value=u.value)},document.querySelectorAll(".preset-color-btn").forEach(A=>{A.onclick=()=>{const T=A.dataset.color;d.value=T,u.value=T,document.querySelectorAll(".preset-color-btn").forEach(R=>R.style.borderColor="transparent"),A.style.borderColor="#ffffff"}});const h=document.getElementById("cat-image-file"),p=document.getElementById("cat-image-url"),g=document.getElementById("cat-upload-status"),f=document.getElementById("cat-image-preview-wrap"),v=document.getElementById("cat-image-preview"),y=document.getElementById("cat-image-clear"),w=A=>{A?(v.src=A,f.style.display="flex"):(f.style.display="none",v.src="")};p.oninput=()=>w(p.value.trim()),y&&(y.onclick=()=>{p.value="",w("")}),h.onchange=async A=>{const T=A.target.files[0];if(T){g.textContent="Processing & uploading category image...",g.style.display="block";try{const R=await zs(T,"categories");p.value=R,w(R),g.textContent="✓ Image uploaded successfully!",g.style.color="var(--accent-mint)"}catch(R){g.textContent=`Upload error: ${R.message}`,g.style.color="#f87171"}}};const S=document.getElementById("category-editor-form"),$=document.getElementById("cat-submit-btn");S.onsubmit=async A=>{A.preventDefault(),$.textContent="Saving Category...",$.disabled=!0;const T={id:n.id,name:l.value.trim(),slug:c.value.trim(),icon:document.getElementById("cat-icon").value.trim()||"✨",color:u.value.trim()||"#6366f1",description:document.getElementById("cat-description").value.trim(),image:p.value.trim(),sortOrder:parseInt(document.getElementById("cat-sort-order").value,10)||0};try{await ee.adminSaveCategory(T),B(`Category "${T.name}" saved successfully!`,"success"),o(),me="categories",fe(e)}catch(R){B(`Category save error: ${R.message}`,"error"),$.textContent=s?"Save Category Changes":"Create Category",$.disabled=!1}}}function tn(r,e,t=[]){var re,Le,Ne,Ke,We,Bt,Dt,Zr,ei,ti,ri,ii,si,ni,ai,oi,li,ci,di,ui,hi,pi;const i=document.getElementById("modal-root")||document.body,s=t.length>0?typeof t[0]=="string"?t[0]:t[0].name:"Ai Tools",n=r||{name:"",slug:"",category:s,price:"$19 /month",shortDescription:"",fullDescription:"",image:"",tutorialVideoUrl:"",whatsappUrl:"",toolUrl:"",rating:4.8,userCount:"10.5K",featured:!1,active:!0,sortOrder:0,features:["Instant Access","Video Tutorial Included","24/7 Priority Support"],howToUse:[{step:1,title:"Open the tool",text:"Sign in using the credentials provided."},{step:2,title:"Input your prompt",text:"Choose your desired template or generate content."}]},a=(n.price||"$19 /month").trim();let o="USD",l="19",c="month",d="";/pkr/i.test(a)||/rs/i.test(a)?o="PKR":/inr/i.test(a)||/₹/.test(a)?o="INR":/aed/i.test(a)?o="AED":(/\$/.test(a)||/usd/i.test(a))&&(o="USD");const u=a.match(/[\d,.]+/);if(u&&(l=u[0].replace(/,/g,"")),a.includes("/")){const x=a.split("/")[1].trim(),I=x.toLowerCase();I==="month"||I==="mo"?c="month":I==="year"||I==="yr"?c="year":I.includes("3 month")?c="3months":I.includes("6 month")?c="6months":I.includes("12 month")?c="12months":I.includes("18 month")?c="18months":I.includes("lifetime")||I.includes("one-time")?c="lifetime":(c="custom",d=x)}else/lifetime|one-time/i.test(a)&&(c="lifetime");const h=document.createElement("div");h.className="modal-backdrop auth-backdrop-fade",h.innerHTML=`
    <div class="modal-card" style="max-width: 720px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800;">
            ${isEdit?`Edit AI Tool: ${n.name}`:"Add New AI Tool to Supabase"}
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
            <input type="text" id="tool-name" class="form-input" value="${n.name||""}" placeholder="e.g. WriteGen AI" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="tool-slug" class="form-input" value="${n.slug||""}" placeholder="e.g. writegen-ai" required />
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
              ${t.length>0?t.map(x=>{const I=typeof x=="string"?x:x.name,C=typeof x=="object"&&x.icon?x.icon:"✨";return`
                      <option value="${I}" ${(n.category||"").toLowerCase()===I.toLowerCase()?"selected":""}>
                        ${C} ${I}
                      </option>
                    `}).join(""):`
                  <option value="${n.category||"Ai Tools"}" selected>✨ ${n.category||"Ai Tools"}</option>
                `}
            </select>
          </div>
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label class="form-label" style="margin-bottom: 0;">Global / Default Price *</label>
              <span style="font-size: 0.72rem; color: var(--accent-mint); font-weight: 600;">Auto-syncs with Builder</span>
            </div>
            <input type="text" id="tool-price" class="form-input" value="${n.price||"$19 /month"}" placeholder="e.g. 500 PKR / 18 Months" required />
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
              <span id="pricing-live-text" style="color: #ffffff;">${n.price||"$19 /month"}</span>
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
                value="${((re=n.countryPricing)==null?void 0:re.Pakistan)||((Le=n.countryPricing)==null?void 0:Le.pakistan)||""}" 
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
                value="${((Ne=n.countryPricing)==null?void 0:Ne.India)||((Ke=n.countryPricing)==null?void 0:Ke.india)||""}" 
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
                value="${((We=n.countryPricing)==null?void 0:We["United Arab Emirates"])||((Bt=n.countryPricing)==null?void 0:Bt.UAE)||""}" 
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
                value="${((Dt=n.countryPricing)==null?void 0:Dt["Saudi Arabia"])||((Zr=n.countryPricing)==null?void 0:Zr.Saudi)||((ei=n.countryPricing)==null?void 0:ei.SAR)||""}" 
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
                value="${((ti=n.countryPricing)==null?void 0:ti["United States"])||((ri=n.countryPricing)==null?void 0:ri.US)||((ii=n.countryPricing)==null?void 0:ii.USD)||""}" 
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
                value="${((si=n.countryPricing)==null?void 0:si["United Kingdom"])||((ni=n.countryPricing)==null?void 0:ni.UK)||((ai=n.countryPricing)==null?void 0:ai.GBP)||""}" 
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
                value="${((oi=n.countryPricing)==null?void 0:oi.DEFAULT)||((li=n.countryPricing)==null?void 0:li.default)||n.price||"$19 /month"}" 
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

        <!-- Tool Image / Media Banner with Live High-Fidelity Preview -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label class="form-label" style="margin-bottom: 0;">Tool Image / Media Banner *</label>
            <span style="font-size: 0.72rem; color: var(--accent-cyan);">✦ Renders prominent high-res banner on storefront</span>
          </div>
          <div style="display: flex; gap: 0.75rem; margin-bottom: 0.6rem;">
            <input type="text" id="tool-image-url" class="form-input" value="${n.image||""}" placeholder="https://example.com/banner-or-logo.png" style="flex: 1;" />
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
              <button type="button" id="tool-image-clear" class="btn-details" style="color: #f87171; font-size: 0.75rem; display: ${n.image?"inline-block":"none"};">Clear Image</button>
            </div>
            
            <div class="tool-modal-banner-preview" id="modal-banner-box">
              ${n.image?`
                <div class="tool-modal-banner-ambient" id="modal-banner-ambient" style="background-image: url('${n.image}');"></div>
                <img class="tool-modal-banner-img" id="tool-image-preview" src="${n.image}" alt="Banner Preview" />
                <div style="position: absolute; top: 10px; left: 10px; z-index: 3;" class="badge badge-popular" id="modal-preview-cat-badge">${n.category||"AI Tool"}</div>
                <div style="position: absolute; bottom: 10px; right: 10px; z-index: 3; background: rgba(0,0,0,0.75); border: 1px solid var(--accent-cyan); color: #38bdf8; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;" id="modal-preview-price-badge">${n.price||"$19 /month"}</div>
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
          <textarea id="tool-short-desc" class="form-textarea" style="min-height: 85px;" placeholder="• Point 1: Key capability&#10;• Point 2: Instant activation&#10;• Point 3: Best monthly price" required>${n.shortDescription||""}</textarea>
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
          <textarea id="tool-full-desc" class="form-textarea" style="min-height: 95px;" placeholder="Comprehensive overview of capabilities, use cases, and prompt styles..." required>${n.fullDescription||n.description||""}</textarea>
        </div>

        <!-- WhatsApp Purchase URL -->
        <div class="form-group">
          <label class="form-label">WhatsApp Purchase URL *</label>
          <input type="text" id="tool-whatsapp-url" class="form-input" value="${n.whatsappUrl||""}" placeholder="https://wa.me/1234567890?text=I+want+to+buy" required />
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
            This link is opened when visitors click "Buy Now" on the tool card or details page.
          </p>
        </div>

        <!-- Tutorial Video URL -->
        <div class="form-group">
          <label class="form-label">Tutorial Video URL (YouTube embed or MP4)</label>
          <input type="text" id="tool-video-url" class="form-input" value="${n.tutorialVideoUrl||n.videoUrl||""}" placeholder="https://www.youtube.com/embed/..." />
        </div>

        <!-- Tool Official URL -->
        <div class="form-group">
          <label class="form-label">Official Tool Website URL</label>
          <input type="text" id="tool-official-url" class="form-input" value="${n.toolUrl||""}" placeholder="https://tool.ai" />
        </div>

        <!-- Rating, Users Count, Sort Order -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Rating</label>
            <input type="number" step="0.05" min="1" max="5" id="tool-rating" class="form-input" value="${n.rating||4.8}" />
          </div>
          <div class="form-group">
            <label class="form-label">Users Count</label>
            <input type="text" id="tool-users-count" class="form-input" value="${n.userCount||"10.5K"}" />
          </div>
          <div class="form-group">
            <label class="form-label">Sort Order</label>
            <input type="number" id="tool-sort-order" class="form-input" value="${n.sortOrder||0}" />
          </div>
        </div>

        <!-- Features List (Comma or newline separated) -->
        <div class="form-group">
          <label class="form-label">Features (1 per line)</label>
          <textarea id="tool-features" class="form-textarea" style="min-height: 70px;" placeholder="Feature 1&#10;Feature 2&#10;Feature 3">${Array.isArray(n.features)?n.features.join(`
`):""}</textarea>
        </div>

        <!-- Toggles: Featured & Active -->
        <div style="display: flex; gap: 2rem; margin: 1rem 0 1.5rem 0;">
          <label style="display: flex; align-items: center; gap: 0.55rem; cursor: pointer; color: var(--text-pure);">
            <input type="checkbox" id="tool-featured" ${n.featured?"checked":""} style="width: 18px; height: 18px; cursor: pointer;" />
            <span style="font-weight: 600;">Mark as Featured Tool</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.55rem; cursor: pointer; color: var(--text-pure);">
            <input type="checkbox" id="tool-active" ${n.active!==!1?"checked":""} style="width: 18px; height: 18px; cursor: pointer;" />
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
  `,i.appendChild(h);const p=()=>h.remove();h.onclick=p,document.getElementById("editor-modal-close").onclick=p,document.getElementById("editor-cancel-btn").onclick=p,(ci=document.getElementById("quick-add-cat-btn"))==null||ci.addEventListener("click",()=>{p(),cr(null,e,t)});const g=document.getElementById("tool-name"),f=document.getElementById("tool-slug");isEdit||(g.oninput=()=>{f.value=g.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")});let v=c,y=o;const w=x=>{var I;if(x==="month")return"/month";if(x==="year")return"/year";if(x==="3months")return"/3 Months";if(x==="6months")return"/6 Months";if(x==="12months")return"/12 Months";if(x==="18months")return"/18 Months";if(x==="lifetime")return"(Lifetime)";if(x==="custom"){const C=((I=document.getElementById("custom-duration-input"))==null?void 0:I.value.trim())||"18 Months";return/lifetime|one-time/i.test(C)?`(${C})`:`/${C}`}return"/month"},S=()=>{var X;const x=((X=document.getElementById("pricing-numeric-amount"))==null?void 0:X.value.trim())||"500",I=w(v);let C="";return y==="PKR"?C=`${x} PKR ${I}`:y==="USD"?C=`$${x} ${I}`:y==="INR"?C=`₹${x} ${I}`:y==="AED"?C=`AED ${x} ${I}`:C=`${x} ${I}`,C.replace(/\s+/g," ").trim()},$=x=>{const I=document.getElementById("tool-price"),C=document.getElementById("pricing-live-text"),X=document.getElementById("modal-preview-price-badge");I&&(I.value=x),C&&(C.textContent=x),X&&(X.textContent=x)},A=h.querySelectorAll("#pricing-duration-buttons .duration-pill-btn"),T=document.getElementById("custom-duration-row"),R=document.getElementById("custom-duration-input");A.forEach(x=>{x.addEventListener("click",()=>{A.forEach(C=>C.classList.remove("active")),x.classList.add("active"),v=x.getAttribute("data-duration"),v==="custom"?(T&&(T.style.display="flex"),R&&R.focus()):T&&(T.style.display="none");const I=S();$(I)})}),R&&R.addEventListener("input",()=>{if(v==="custom"){const x=S();$(x)}});const K=h.querySelectorAll("#pricing-currency-buttons .currency-select-btn"),j=document.getElementById("presets-pkr-row"),M=document.getElementById("presets-usd-row"),_=document.getElementById("presets-inr-row"),N=document.getElementById("presets-aed-row"),b=document.getElementById("pricing-numeric-amount");K.forEach(x=>{x.addEventListener("click",()=>{K.forEach(C=>C.classList.remove("active")),x.classList.add("active"),y=x.getAttribute("data-curr"),j&&(j.style.display=y==="PKR"?"block":"none"),M&&(M.style.display=y==="USD"?"block":"none"),_&&(_.style.display=y==="INR"?"block":"none"),N&&(N.style.display=y==="AED"?"block":"none"),y==="PKR"&&b&&(b.value==="19"||!b.value)?b.value="500":y==="USD"&&b&&b.value==="500"&&(b.value="19");const I=S();$(I)})}),h.querySelectorAll(".pricing-studio-container .quick-amount-chip").forEach(x=>{x.addEventListener("click",()=>{const I=x.getAttribute("data-amount");if(I&&b){b.value=I;const C=S();$(C)}})}),b&&b.addEventListener("input",()=>{const x=S();$(x)});const L=document.getElementById("tool-price");L&&L.addEventListener("input",()=>{const x=L.value.trim(),I=document.getElementById("pricing-live-text"),C=document.getElementById("modal-preview-price-badge");I&&(I.textContent=x||"$19 /month"),C&&(C.textContent=x||"$19 /month")});const Q=document.getElementById("tool-category");Q&&Q.addEventListener("change",()=>{const x=document.getElementById("modal-preview-cat-badge");x&&(x.textContent=Q.value||"AI Tool")});const J=document.getElementById("geo-price-pakistan"),z=document.getElementById("geo-price-india"),V=document.getElementById("geo-price-uae"),de=document.getElementById("geo-price-saudi"),ue=document.getElementById("geo-price-us"),he=document.getElementById("geo-price-uk"),le=document.getElementById("geo-price-default");(di=document.getElementById("geo-fill-all-smart"))==null||di.addEventListener("click",()=>{const x=w(v),I=(b==null?void 0:b.value.trim())||"500";J&&(J.value=`${y==="PKR"?I:"500"} PKR ${x}`),z&&(z.value=`₹${y==="INR"?I:"499"} ${x}`),V&&(V.value=`AED ${y==="AED"?I:"49"} ${x}`),de&&(de.value=`SAR ${y==="SAR"?I:"49"} ${x}`),ue&&(ue.value=`$${y==="USD"?I:"19"} ${x}`),he&&(he.value=`£${y==="GBP"?I:"15"} ${x}`),le&&(le.value=`$${y==="USD"?I:"19"} ${x}`),B(`⚡ All country rates filled with ${x}`)}),(ui=document.getElementById("geo-fill-pkr-all"))==null||ui.addEventListener("click",()=>{const x=w(v),C=`${(b==null?void 0:b.value.trim())||"500"} PKR ${x}`;J&&(J.value=C),z&&(z.value=C),V&&(V.value=C),de&&(de.value=C),ue&&(ue.value=C),he&&(he.value=C),le&&(le.value=C),L&&(L.value=C,$(C)),B(`🇵🇰 Set all country rates to ${C}`)}),(hi=document.getElementById("geo-fill-usd-all"))==null||hi.addEventListener("click",()=>{const x=w(v),C=`$${y==="USD"&&(b==null?void 0:b.value.trim())||"19"} ${x}`;J&&(J.value=C),z&&(z.value=C),V&&(V.value=C),de&&(de.value=C),ue&&(ue.value=C),he&&(he.value=C),le&&(le.value=C),L&&(L.value=C,$(C)),B(`🇺🇸 Set all country rates to ${C}`)}),(pi=document.getElementById("geo-sync-duration-all"))==null||pi.addEventListener("click",()=>{const x=w(v),I=C=>{if(!C||!C.value.trim())return;let X=C.value.trim();X.includes("/")?X=X.split("/")[0].trim()+" "+x:/\(.*\)/.test(X)?X=X.replace(/\(.*\)/,"").trim()+" "+x:X=X+" "+x,C.value=X.replace(/\s+/g," ").trim()};I(J),I(z),I(V),I(de),I(ue),I(he),I(le),I(L),L&&$(L.value),B(`⏱️ Synced duration "${x}" to all countries!`)}),h.querySelectorAll(".country-quick-chip").forEach(x=>{x.addEventListener("click",()=>{const I=x.getAttribute("data-target"),C=x.getAttribute("data-prefix"),X=x.getAttribute("data-val"),ve=document.getElementById(I),_e=w(v);ve&&(C==="PKR"?ve.value=`${X} PKR ${_e}`:C==="INR"?ve.value=`₹${X} ${_e}`:C==="AED"?ve.value=`AED ${X} ${_e}`:C==="SAR"?ve.value=`SAR ${X} ${_e}`:C==="USD"?ve.value=`$${X} ${_e}`:C==="GBP"&&(ve.value=`£${X} ${_e}`))})});const k=document.getElementById("tool-image-file"),U=document.getElementById("tool-image-url"),O=document.getElementById("upload-status-text"),q=document.getElementById("modal-banner-box"),W=document.getElementById("tool-image-clear"),te=x=>{var I,C;if(x){const X=((I=document.getElementById("tool-category"))==null?void 0:I.value)||"AI Tool",ve=((C=document.getElementById("tool-price"))==null?void 0:C.value)||"$19 /month";q.innerHTML=`
        <div class="tool-modal-banner-ambient" id="modal-banner-ambient" style="background-image: url('${x}');"></div>
        <img class="tool-modal-banner-img" id="tool-image-preview" src="${x}" alt="Banner Preview" />
        <div style="position: absolute; top: 10px; left: 10px; z-index: 3;" class="badge badge-popular" id="modal-preview-cat-badge">${X}</div>
        <div style="position: absolute; bottom: 10px; right: 10px; z-index: 3; background: rgba(0,0,0,0.75); border: 1px solid var(--accent-cyan); color: #38bdf8; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;" id="modal-preview-price-badge">${ve}</div>
      `,W&&(W.style.display="inline-block")}else q.innerHTML=`
        <div style="text-align: center; color: var(--text-muted); padding: 1.5rem;" id="modal-banner-empty">
          <div style="font-size: 2rem; margin-bottom: 0.35rem;">🖼️</div>
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">No Image Selected Yet</div>
          <div style="font-size: 0.72rem; margin-top: 0.2rem;">Upload a file or paste an image URL above to preview how your banner displays</div>
        </div>
      `,W&&(W.style.display="none")};U.oninput=()=>te(U.value.trim()),W&&(W.onclick=()=>{U.value="",te("")}),k.onchange=async x=>{const I=x.target.files[0];if(I){O.textContent="Processing & uploading image...",O.style.display="block";try{const C=await zs(I,"logos");U.value=C,te(C),O.textContent="✓ Image uploaded successfully!",O.style.color="var(--accent-mint)"}catch(C){O.textContent=`Upload failed: ${C.message}`,O.style.color="#f87171"}}};const ie=document.getElementById("supabase-tool-form"),Y=document.getElementById("editor-submit-btn");ie.onsubmit=async x=>{var gi,fi,vi,yi,bi,wi,ki,Si;x.preventDefault(),Y.textContent="Saving to Supabase...",Y.disabled=!0;const C=document.getElementById("tool-features").value.split(`
`).map(gr=>gr.trim()).filter(Boolean),X=((gi=document.getElementById("tool-price"))==null?void 0:gi.value.trim())||"$19 /month",ve=((fi=document.getElementById("geo-price-pakistan"))==null?void 0:fi.value.trim())||"",_e=((vi=document.getElementById("geo-price-india"))==null?void 0:vi.value.trim())||"",Nt=((yi=document.getElementById("geo-price-uae"))==null?void 0:yi.value.trim())||"",pt=((bi=document.getElementById("geo-price-saudi"))==null?void 0:bi.value.trim())||"",jt=((wi=document.getElementById("geo-price-us"))==null?void 0:wi.value.trim())||"",mt=((ki=document.getElementById("geo-price-uk"))==null?void 0:ki.value.trim())||"",rn=((Si=document.getElementById("geo-price-default"))==null?void 0:Si.value.trim())||X,ne={...n.countryPricing||{},DEFAULT:rn};ve&&(ne.Pakistan=ve,ne.pakistan=ve,ne.PK=ve),_e&&(ne.India=_e,ne.india=_e,ne.IN=_e),Nt&&(ne["United Arab Emirates"]=Nt,ne.UAE=Nt,ne.AE=Nt),pt&&(ne["Saudi Arabia"]=pt,ne.Saudi=pt,ne.SAR=pt,ne.SA=pt),jt&&(ne["United States"]=jt,ne.US=jt,ne.USD=jt),mt&&(ne["United Kingdom"]=mt,ne.UK=mt,ne.GBP=mt,ne.GB=mt);const mi={id:n.id,name:g.value.trim(),slug:f.value.trim(),category:document.getElementById("tool-category").value,price:X,countryPricing:ne,image:U.value.trim(),shortDescription:document.getElementById("tool-short-desc").value.trim(),fullDescription:document.getElementById("tool-full-desc").value.trim(),whatsappUrl:document.getElementById("tool-whatsapp-url").value.trim(),tutorialVideoUrl:document.getElementById("tool-video-url").value.trim(),toolUrl:document.getElementById("tool-official-url").value.trim(),rating:parseFloat(document.getElementById("tool-rating").value)||4.8,userCount:document.getElementById("tool-users-count").value.trim()||"10.5K",sortOrder:parseInt(document.getElementById("tool-sort-order").value,10)||0,featured:document.getElementById("tool-featured").checked,active:document.getElementById("tool-active").checked,features:C.length>0?C:n.features||[],howToUse:n.howToUse||[]};try{await ee.adminSaveTool(mi),B(`Tool "${mi.name}" successfully saved in Supabase!`,"success"),p(),me="tools",fe(e)}catch(gr){B(`Supabase save error: ${gr.message}`,"error"),Y.textContent=isEdit?"Save Changes in Supabase":"Add Tool to Supabase",Y.disabled=!1}}}function Er(r,e="Pakistan"){return!r||r.length===0?`
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
        ${r.map(t=>{const i=Ut(t,e),s=t.buyQuantity||1,n=t.freeQuantity||1,a=t.offerLabel||"BUY 1 GET 1 FREE";return`
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
                    🔥 ${a}
                  </span>
                  <span style="display: inline-flex; align-items: center; gap: 0.3rem; background: rgba(139, 92, 246, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.35); font-weight: 700; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 6px;">
                    ⏳ ${t.duration||"1 Month"}
                  </span>
                </div>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px;">
                    Buy: ${s}
                  </span>
                  <span style="color: #f97316; font-weight: 800;">+</span>
                  <span style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4); font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px;">
                    Get: ${n} Free
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
  `}function Tr(r,e,t=[]){document.querySelectorAll(".toggle-deal-active-btn").forEach(i=>{i.onclick=async()=>{const s=i.dataset.dealId,a=!(i.dataset.active==="true");try{await ee.adminToggleHotDealActive(s,a),B(`Hot Deal status changed to ${a?"Active":"Inactive"}.`,"success"),fe(e)}catch(o){B(`Error: ${o.message}`,"error")}}}),document.querySelectorAll(".edit-deal-btn").forEach(i=>{i.onclick=()=>{const s=i.dataset.dealId,n=r.find(a=>a.id===s);n&&Wr(n,e,t)}}),document.querySelectorAll(".delete-deal-btn").forEach(i=>{i.onclick=async()=>{const s=i.dataset.dealId,n=i.dataset.dealName;if(confirm(`Are you sure you want to permanently delete the Hot Deal "${n}"?`))try{await ee.adminDeleteHotDeal(s),B(`Deleted deal "${n}".`,"success"),fe(e)}catch(a){B(`Failed to delete deal: ${a.message}`,"error")}}})}function Wr(r=null,e,t=[]){var g,f,v,y,w,S,$,A,T,R,K,j;const i=!!r,s=r||{id:"",name:"",slug:"",duration:(r==null?void 0:r.duration)||"1 Month",category:"Promotions & Bundles",offerLabel:"BUY 1 GET 1 FREE",buyQuantity:1,freeQuantity:1,dealPrice:"PKR 1,999 /mo",regularPrice:"PKR 3,999 /mo",image:"",shortDescription:"",stockLeft:"Only 5 spots left today",countryPricing:{Pakistan:"PKR 1,999 /mo",India:"INR 999 /mo","United Arab Emirates":"AED 45 /mo","Saudi Arabia":"SAR 49 /mo","United States":"USD $14.99 /mo","United Kingdom":"GBP £11.99 /mo"},active:!0},n=document.createElement("div");n.className="modal-backdrop auth-backdrop-fade",n.innerHTML=`
    <div class="modal-card" style="max-width: 780px; max-height: 92vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔥</span>
            <span>${i?`Edit Hot Deal: ${s.name}`:"Create New Hot Deal / Promotion"}</span>
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
            ${t.map(M=>`<option value="${M.id}">${M.name} (${M.category})</option>`).join("")}
          </select>
        </div>
      `:""}

      <form id="hot-deal-editor-form">
        <!-- Deal Name & Slug -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Deal Title / Product Name *</label>
            <input type="text" id="deal-name" class="form-input" value="${s.name||""}" placeholder="e.g. ChatGPT Plus & Claude Pro Duo Bundle" required />
          </div>
          <div class="form-group">
            <label class="form-label">URL Slug *</label>
            <input type="text" id="deal-slug" class="form-input" value="${s.slug||""}" placeholder="e.g. chatgpt-claude-duo-bogo" required />
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
              <input type="text" id="deal-offer-label" class="form-input" value="${s.offerLabel||"BUY 1 GET 1 FREE"}" placeholder="e.g. BUY 1 GET 1 FREE" required />
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Buy Quantity *</label>
              <input type="number" id="deal-buy-qty" class="form-input" value="${s.buyQuantity||1}" min="1" required />
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Free Bonus Quantity *</label>
              <input type="number" id="deal-free-qty" class="form-input" value="${s.freeQuantity||1}" min="0" required />
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
                value="${s.duration||"1 Month"}" 
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
            <input type="text" id="deal-base-price" class="form-input" value="${s.dealPrice||s.price||"PKR 1,999 /mo"}" placeholder="e.g. PKR 1,999 /mo" required />
          </div>
          <div class="form-group">
            <label class="form-label">Regular Price (Strikethrough)</label>
            <input type="text" id="deal-regular-price" class="form-input" value="${s.regularPrice||"PKR 3,999 /mo"}" placeholder="e.g. PKR 3,999 /mo" />
          </div>
          <div class="form-group">
            <label class="form-label">Stock Scarcity / Urgency</label>
            <input type="text" id="deal-stock-left" class="form-input" value="${s.stockLeft||"Only 5 slots left today"}" placeholder="e.g. Only 5 slots left today" />
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
              <input type="text" id="deal-geo-pk" class="form-input" value="${((g=s.countryPricing)==null?void 0:g.Pakistan)||s.dealPrice||"PKR 1,999 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇮🇳 India (INR ₹)</label>
              <input type="text" id="deal-geo-in" class="form-input" value="${((f=s.countryPricing)==null?void 0:f.India)||"INR 999 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇦🇪 UAE (AED)</label>
              <input type="text" id="deal-geo-ae" class="form-input" value="${((v=s.countryPricing)==null?void 0:v["United Arab Emirates"])||((y=s.countryPricing)==null?void 0:y.UAE)||"AED 45 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇸🇦 Saudi (SAR)</label>
              <input type="text" id="deal-geo-sa" class="form-input" value="${((w=s.countryPricing)==null?void 0:w["Saudi Arabia"])||((S=s.countryPricing)==null?void 0:S.Saudi)||"SAR 49 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇺🇸 US (USD $)</label>
              <input type="text" id="deal-geo-us" class="form-input" value="${(($=s.countryPricing)==null?void 0:$["United States"])||((A=s.countryPricing)==null?void 0:A.USD)||"USD $14.99 /mo"}" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">🇬🇧 UK (GBP £)</label>
              <input type="text" id="deal-geo-gb" class="form-input" value="${((T=s.countryPricing)==null?void 0:T["United Kingdom"])||((R=s.countryPricing)==null?void 0:R.GBP)||"GBP £11.99 /mo"}" />
            </div>
          </div>
        </details>

        <!-- Category & Description -->
        <div style="display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Category *</label>
            <input type="text" id="deal-category" class="form-input" value="${s.category||"Promotions & Bundles"}" placeholder="e.g. Text / Reasoning" required />
          </div>

          <div class="form-group">
            <label class="form-label">Banner Image URL</label>
            <input type="text" id="deal-image" class="form-input" value="${s.image||""}" placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Deal Details &amp; Promotion Description *</label>
          <textarea id="deal-description" class="form-textarea" style="min-height: 80px;" placeholder="Describe what tools are included in this bundle, how the customer gets access, and why this is a high-value offer..." required>${s.shortDescription||s.description||""}</textarea>
        </div>

        <!-- Active Checkbox & Sort Order -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(0,0,0,0.25); border-radius: 10px; margin-bottom: 1.5rem;">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.92rem; font-weight: 700; color: #f8fafc;">
            <input type="checkbox" id="deal-active" ${s.active!==!1?"checked":""} style="width: 18px; height: 18px; accent-color: #f97316;" />
            <span>Active Promotion (Instantly visible on /deals storefront)</span>
          </label>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label style="font-size: 0.78rem; color: var(--text-muted);">Sort Order:</label>
            <input type="number" id="deal-sort-order" class="form-input" value="${s.sortOrder??0}" style="width: 70px; text-align: center; padding: 0.35rem;" />
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
  `,document.body.appendChild(n);const a=()=>{n.remove()};n.onclick=M=>{M.target===n&&a()},(K=document.getElementById("deal-editor-close"))==null||K.addEventListener("click",a),(j=document.getElementById("deal-cancel-btn"))==null||j.addEventListener("click",a);const o=document.getElementById("deal-name"),l=document.getElementById("deal-slug");o&&l&&!i&&o.addEventListener("input",()=>{l.value=o.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")});const c=document.getElementById("deal-prefill-tool");c&&c.addEventListener("change",()=>{const M=c.value;if(!M)return;const _=t.find(N=>N.id===M);if(_){o&&(o.value=`${_.name} (BOGO Deal)`),l&&(l.value=`${_.slug||_.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-bogo`);const N=document.getElementById("deal-image");N&&_.image&&(N.value=_.image);const b=document.getElementById("deal-category");b&&_.category&&(b.value=_.category);const L=document.getElementById("deal-description");L&&(L.value=`Buy 1 ${_.name} subscription and get 1 extra seat/month free! ${_.shortDescription||""}`),_.countryPricing&&(_.countryPricing.Pakistan&&(document.getElementById("deal-geo-pk").value=_.countryPricing.Pakistan),_.countryPricing.India&&(document.getElementById("deal-geo-in").value=_.countryPricing.India),_.countryPricing["United Arab Emirates"]&&(document.getElementById("deal-geo-ae").value=_.countryPricing["United Arab Emirates"]),_.countryPricing["Saudi Arabia"]&&(document.getElementById("deal-geo-sa").value=_.countryPricing["Saudi Arabia"]),_.countryPricing["United States"]&&(document.getElementById("deal-geo-us").value=_.countryPricing["United States"]),_.countryPricing["United Kingdom"]&&(document.getElementById("deal-geo-gb").value=_.countryPricing["United Kingdom"])),B(`Pre-filled details from "${_.name}"`,"info")}});const d=document.getElementById("deal-duration"),u=document.getElementById("deal-duration-preset-select");u&&d&&u.addEventListener("change",()=>{u.value&&(d.value=u.value)}),document.querySelectorAll(".preset-duration-chip").forEach(M=>{M.onclick=()=>{d&&(d.value=M.dataset.duration,u&&(u.value=M.dataset.duration))}}),document.querySelectorAll(".preset-offer-chip").forEach(M=>{M.onclick=()=>{document.getElementById("deal-offer-label").value=M.dataset.offer,document.getElementById("deal-buy-qty").value=M.dataset.buy,document.getElementById("deal-free-qty").value=M.dataset.free}});const h=document.getElementById("hot-deal-editor-form"),p=document.getElementById("deal-submit-btn");h.onsubmit=async M=>{var ue,he,le,k,U,O,q;M.preventDefault(),p.textContent="Saving Deal...",p.disabled=!0;const _=document.getElementById("deal-base-price").value.trim(),N=((ue=document.getElementById("deal-geo-pk"))==null?void 0:ue.value.trim())||_,b=((he=document.getElementById("deal-geo-in"))==null?void 0:he.value.trim())||"",L=((le=document.getElementById("deal-geo-ae"))==null?void 0:le.value.trim())||"",Q=((k=document.getElementById("deal-geo-sa"))==null?void 0:k.value.trim())||"",J=((U=document.getElementById("deal-geo-us"))==null?void 0:U.value.trim())||"",z=((O=document.getElementById("deal-geo-gb"))==null?void 0:O.value.trim())||"",V={...s.countryPricing||{},DEFAULT:_,Pakistan:N,pakistan:N,PK:N};b&&(V.India=b,V.IN=b),L&&(V["United Arab Emirates"]=L,V.UAE=L,V.AE=L),Q&&(V["Saudi Arabia"]=Q,V.SAR=Q),J&&(V["United States"]=J,V.USD=J),z&&(V["United Kingdom"]=z,V.GBP=z);const de={id:s.id,name:o.value.trim(),slug:l.value.trim(),category:document.getElementById("deal-category").value.trim(),offerLabel:document.getElementById("deal-offer-label").value.trim(),buyQuantity:parseInt(document.getElementById("deal-buy-qty").value,10)||1,freeQuantity:parseInt(document.getElementById("deal-free-qty").value,10)||0,duration:((q=document.getElementById("deal-duration"))==null?void 0:q.value.trim())||"1 Month",dealPrice:_,price:_,regularPrice:document.getElementById("deal-regular-price").value.trim(),stockLeft:document.getElementById("deal-stock-left").value.trim(),countryPricing:V,image:document.getElementById("deal-image").value.trim(),shortDescription:document.getElementById("deal-description").value.trim(),fullDescription:document.getElementById("deal-description").value.trim(),active:document.getElementById("deal-active").checked,sortOrder:parseInt(document.getElementById("deal-sort-order").value,10)||0};try{await ee.adminSaveHotDeal(de),B(`Hot Deal "${de.name}" successfully published!`,"success"),a(),me="deals",fe(e)}catch(W){B(`Error saving deal: ${W.message}`,"error"),p.textContent=i?"Save Deal Changes":"Publish Hot Deal",p.disabled=!1}}}const Hl={"/":cs,"/tools":Ol,"/deals":ql,"/tool/:id":Bl,"/categories":Dl,"/about":Nl,"/contact":Ml,"/admin":fe,"*":cs};let it=null;async function vs(){console.log("[AI Tools Store] Initializing marketplace client..."),ee.getTools().catch(r=>{console.warn("[AI Tools Store] API initialized with offline fallback dataset:",r)}),it=new sn(Hl,"#app"),window.__appRouter=it,Fs(()=>{it&&it.handleRouting()}),window.addEventListener("ai_tools_country_changed",()=>{it&&it.handleRouting()})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vs):vs();
//# sourceMappingURL=index-BLvgse2X.js.map

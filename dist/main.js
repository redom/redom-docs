function parseQuery(e){for(var t,r=e.split(/([#.])/),n="",a="",s=[],o=0;o<r.length;o++)t=r[o],"#"===t?a=r[++o]:"."===t?s.push(r[++o]):t.length&&(n=t);return{tag:n||"div",id:a,className:s.join(" ")}}function createElement(e,t){var r=parseQuery(e),n=r.tag,a=r.id,s=r.className,o=t?document.createElementNS(t,n):document.createElement(n);return a&&(o.id=a),s&&(t?o.setAttribute("class",s):o.className=s),o}function unmount(e,t){var r=getEl(e),n=getEl(t);return t===n&&n.__redom_view&&(t=n.__redom_view),n.parentNode&&(doUnmount(t,n,r),r.removeChild(n)),t}function doUnmount(e,t,r){var n=t.__redom_lifecycle;if(hooksAreEmpty(n))return void(t.__redom_lifecycle={});var a=r;for(t.__redom_mounted&&trigger(t,"onunmount");a;){var s=a.__redom_lifecycle||{};for(var o in n)s[o]&&(s[o]-=n[o]);hooksAreEmpty(s)&&(a.__redom_lifecycle=null),a=a.parentNode}}function hooksAreEmpty(e){if(null==e)return!0;for(var t in e)if(e[t])return!1;return!0}/* global Node, ShadowRoot */var hookNames=["onmount","onremount","onunmount"],shadowRootAvailable="undefined"!=typeof window&&"ShadowRoot"in window;function mount(e,t,r,n){var a=getEl(e),s=getEl(t);t===s&&s.__redom_view&&(t=s.__redom_view),t!==s&&(s.__redom_view=t);var o=s.__redom_mounted,l=s.parentNode;return o&&l!==a&&doUnmount(t,s,l),null==r?a.appendChild(s):n?a.replaceChild(s,getEl(r)):a.insertBefore(s,getEl(r)),doMount(t,s,a,l),t}function trigger(e,t){"onmount"===t||"onremount"===t?e.__redom_mounted=!0:"onunmount"===t&&(e.__redom_mounted=!1);var r=e.__redom_lifecycle;if(r){var n=e.__redom_view,a=0;for(var s in n&&n[t]&&n[t](),r)s&&a++;if(a)for(var o,l=e.firstChild;l;)o=l.nextSibling,trigger(l,t),l=o}}function doMount(e,t,r,n){for(var a,s=t.__redom_lifecycle||(t.__redom_lifecycle={}),o=r===n,l=!1,c=0,p=hookNames;c<p.length;c+=1)a=p[c],!o&&e!==t&&a in e&&(s[a]=(s[a]||0)+1),s[a]&&(l=!0);if(!l)return void(t.__redom_lifecycle={});var d=r,u=!1;for((o||d&&d.__redom_mounted)&&(trigger(t,o?"onremount":"onmount"),u=!0);d;){var h=d.parentNode,g=d.__redom_lifecycle||(d.__redom_lifecycle={});for(var m in s)g[m]=(g[m]||0)+s[m];if(u)break;else(d.nodeType===Node.DOCUMENT_NODE||shadowRootAvailable&&d instanceof ShadowRoot||h&&h.__redom_mounted)&&(trigger(d,o?"onremount":"onmount"),u=!0),d=h}}function setStyle(e,t,r){var n=getEl(e);if("object"==typeof t)for(var a in t)setStyleValue(n,a,t[a]);else setStyleValue(n,t,r)}function setStyleValue(e,t,r){e.style[t]=null==r?"":r}/* global SVGElement */var xlinkns="http://www.w3.org/1999/xlink";function setAttr(e,t,r){setAttrInternal(e,t,r)}function setAttrInternal(e,t,r,n){var a=getEl(e);if("object"==typeof t)for(var s in t)setAttrInternal(a,s,t[s],n);else{var o=a instanceof SVGElement,l="function"==typeof r;if("style"===t&&"object"==typeof r)setStyle(a,r);else if(o&&l)a[t]=r;else if("dataset"===t)setData(a,r);else if(!o&&(t in a||l)&&"list"!==t)a[t]=r;else{if(o&&"xlink"===t)return void setXlink(a,r);n&&"class"===t&&(r=a.className+" "+r),null==r?a.removeAttribute(t):a.setAttribute(t,r)}}}function setXlink(e,t,r){if("object"==typeof t)for(var n in t)setXlink(e,n,t[n]);else null==r?e.removeAttributeNS(xlinkns,t,r):e.setAttributeNS(xlinkns,t,r)}function setData(e,t,r){if("object"==typeof t)for(var n in t)setData(e,n,t[n]);else null==r?delete e.dataset[t]:e.dataset[t]=r}function text(e){return document.createTextNode(null==e?"":e)}function parseArgumentsInternal(e,t,r){for(var n,a=0,s=t;a<s.length;a+=1)if(n=s[a],0===n||n){var o=typeof n;"function"==o?n(e):"string"===o||"number"===o?e.appendChild(text(n)):isNode(getEl(n))?mount(e,n):n.length?parseArgumentsInternal(e,n,r):"object"===o&&setAttrInternal(e,n,null,r)}}function ensureEl(e){return"string"==typeof e?html(e):getEl(e)}function getEl(e){return e.nodeType&&e||!e.el&&e||getEl(e.el)}function isNode(e){return e&&e.nodeType}var htmlCache={};function html(e){for(var t=[],r=arguments.length-1;0<r--;)t[r]=arguments[r+1];var n,a=typeof e;if("string"===a)n=memoizeHTML(e).cloneNode(!1);else if(isNode(e))n=e.cloneNode(!1);else if("function"===a){n=new(Function.prototype.bind.apply(e,[null].concat(t)))}else throw new Error("At least one argument required");return parseArgumentsInternal(getEl(n),t,!0),n}var el=html;html.extend=function(e){for(var t=[],r=arguments.length-1;0<r--;)t[r]=arguments[r+1];var n=memoizeHTML(e);return html.bind.apply(html,[this,n].concat(t))};function memoizeHTML(e){return htmlCache[e]||(htmlCache[e]=createElement(e))}function setChildren(e){for(var t=[],r=arguments.length-1;0<r--;)t[r]=arguments[r+1];for(var n=getEl(e),a=traverse(e,t,n.firstChild);a;){var s=a.nextSibling;unmount(e,a),a=s}}function traverse(e,t,r){for(var n=r,a=Array(t.length),s=0;s<t.length;s++)a[s]=t[s]&&getEl(t[s]);for(var o,l=0;l<t.length;l++)if(o=t[l],!!o){var c=a[l];if(c===n){n=n.nextSibling;continue}if(isNode(c)){var p=n&&n.nextSibling,d=null!=o.__redom_index,u=d&&p===a[l+1];mount(e,o,n,u),u&&(n=p);continue}null!=o.length&&(n=traverse(e,o,n))}return n}var ListPool=function(e,t,r){this.View=e,this.initData=r,this.oldLookup={},this.lookup={},this.oldViews=[],this.views=[],null!=t&&(this.key="function"==typeof t?t:propKey(t))};ListPool.prototype.update=function(e,t){for(var r=this,n=r.View,a=r.key,s=r.initData,o=this.lookup,l={},c=Array(e.length),p=this.views,d=0;d<e.length;d++){var u=e[d],h=void 0;if(null!=a){var g=a(u);h=o[g]||new n(s,u,d,e),l[g]=h,h.__redom_id=g}else h=p[d]||new n(s,u,d,e);h.update&&h.update(u,d,e,t);var m=getEl(h.el);m.__redom_view=h,c[d]=h}this.oldViews=p,this.views=c,this.oldLookup=o,this.lookup=l};function propKey(e){return function(t){return t[e]}}function list(e,t,r,n){return new List(e,t,r,n)}var List=function(e,t,r,n){this.View=t,this.initData=n,this.views=[],this.pool=new ListPool(t,r,n),this.el=ensureEl(e),this.keySet=null!=r};List.prototype.update=function(e,t){void 0===e&&(e=[]);var r=this,n=r.keySet,a=this.views;this.pool.update(e,t);var s=this.pool,o=s.views,l=s.lookup;if(n)for(var c=0;c<a.length;c++){var p=a[c],d=p.__redom_id;null==l[d]&&(p.__redom_index=null,unmount(this,p))}for(var u,h=0;h<o.length;h++)u=o[h],u.__redom_index=h;setChildren(this,o),n&&(this.lookup=l),this.views=o},List.extend=function(e,t,r,n){return List.bind(List,e,t,r,n)},list.extend=List.extend;/* global Node */function router(e,t,r){return new Router(e,t,r)}var Router=function(e,t,r){this.el=ensureEl(e),this.Views=t,this.initData=r};Router.prototype.update=function(e,t){if(e!==this.route){var r=this.Views,n=r[e];this.route=e,this.view=n&&(n instanceof Node||n.el instanceof Node)?n:n&&new n(this.initData,t),setChildren(this.el,[this.view])}this.view&&this.view.update&&this.view.update(t,e)};var ns="http://www.w3.org/2000/svg",svgCache={};function svg(e){for(var t=[],r=arguments.length-1;0<r--;)t[r]=arguments[r+1];var n,a=typeof e;if("string"===a)n=memoizeSVG(e).cloneNode(!1);else if(isNode(e))n=e.cloneNode(!1);else if("function"===a){n=new(Function.prototype.bind.apply(e,[null].concat(t)))}else throw new Error("At least one argument required");return parseArgumentsInternal(getEl(n),t,!0),n}svg.extend=function(e){var t=memoizeSVG(e);return svg.bind(this,t)},svg.ns="http://www.w3.org/2000/svg";function memoizeSVG(e){return svgCache[e]||(svgCache[e]=createElement(e,ns))}var backers=[{name:"Joona Kulmala",image:"https://www.gravatar.com/avatar/4e09d3603a416da422d4fbab92601a21?default=404",website:"https://twitter.com/joona931",profile:"https://opencollective.com/joona",role:"BACKER"},{name:"Sasha Dzeletovic",image:"https://www.gravatar.com/avatar/53769ff7bfbe9cc774a37cbde55329c0?default=404",website:"null",profile:"https://opencollective.com/sasha-dzeletovic",role:"BACKER"},{name:"Joshua Dover",image:"null",website:"null",profile:"https://opencollective.com/joshua-dover",role:"BACKER"},{name:"SwissDev Jobs",image:"https://logo.clearbit.com/swissdevjobs.ch",website:"https://swissdevjobs.ch/jobs/Java/All",profile:"https://opencollective.com/swissdev-jobs",role:"BACKER"},{name:"SwissDev Jobs",image:"https://logo.clearbit.com/swissdevjobs.ch",website:"https://swissdevjobs.ch/jobs/Java/All",profile:"https://opencollective.com/swissdev-jobs",role:"BACKER"},{name:"Guest",image:"null",website:"null",profile:"https://opencollective.com/guest-48a089e4",role:"BACKER"},{name:"Andrei Vaduva",image:"https://www.gravatar.com/avatar/21ef7b785896171271ef8a564c040356?default=404",website:"null",profile:"https://opencollective.com/andrei-vaduva",role:"BACKER"}],contributors=[{html_url:"https://github.com/pakastin",avatar_url:"https://avatars.githubusercontent.com/u/1475902?v=4",login:"pakastin"},{html_url:"https://github.com/apps/dependabot-preview",avatar_url:"https://avatars.githubusercontent.com/in/2141?v=4",login:"dependabot-preview[bot]"},{html_url:"https://github.com/maciejhirsz",avatar_url:"https://avatars.githubusercontent.com/u/1096222?v=4",login:"maciejhirsz"},{html_url:"https://github.com/tomerigal",avatar_url:"https://avatars.githubusercontent.com/u/4153972?v=4",login:"tomerigal"},{html_url:"https://github.com/katywings",avatar_url:"https://avatars.githubusercontent.com/u/4012401?v=4",login:"katywings"},{html_url:"https://github.com/anttikissa",avatar_url:"https://avatars.githubusercontent.com/u/141618?v=4",login:"anttikissa"},{html_url:"https://github.com/talmobi",avatar_url:"https://avatars.githubusercontent.com/u/1460615?v=4",login:"talmobi"},{html_url:"https://github.com/andrejcremoznik",avatar_url:"https://avatars.githubusercontent.com/u/761287?v=4",login:"andrejcremoznik"},{html_url:"https://github.com/mrwanashraf",avatar_url:"https://avatars.githubusercontent.com/u/9576239?v=4",login:"mrwanashraf"},{html_url:"https://github.com/bfrengley",avatar_url:"https://avatars.githubusercontent.com/u/37278140?v=4",login:"bfrengley"},{html_url:"https://github.com/jscissr",avatar_url:"https://avatars.githubusercontent.com/u/4520820?v=4",login:"jscissr"},{html_url:"https://github.com/terkelg",avatar_url:"https://avatars.githubusercontent.com/u/2302254?v=4",login:"terkelg"},{html_url:"https://github.com/h-h-h-h",avatar_url:"https://avatars.githubusercontent.com/u/13482553?v=4",login:"h-h-h-h"},{html_url:"https://github.com/fishead",avatar_url:"https://avatars.githubusercontent.com/u/874813?v=4",login:"fishead"},{html_url:"https://github.com/EvandroLG",avatar_url:"https://avatars.githubusercontent.com/u/444054?v=4",login:"EvandroLG"},{html_url:"https://github.com/131",avatar_url:"https://avatars.githubusercontent.com/u/13545?v=4",login:"131"},{html_url:"https://github.com/monkeywithacupcake",avatar_url:"https://avatars.githubusercontent.com/u/7316730?v=4",login:"monkeywithacupcake"},{html_url:"https://github.com/joona",avatar_url:"https://avatars.githubusercontent.com/u/187605?v=4",login:"joona"},{html_url:"https://github.com/mauroreisvieira",avatar_url:"https://avatars.githubusercontent.com/u/3084774?v=4",login:"mauroreisvieira"},{html_url:"https://github.com/RauliL",avatar_url:"https://avatars.githubusercontent.com/u/8155018?v=4",login:"RauliL"},{html_url:"https://github.com/absolux",avatar_url:"https://avatars.githubusercontent.com/u/1226317?v=4",login:"absolux"},{html_url:"https://github.com/akx",avatar_url:"https://avatars.githubusercontent.com/u/58669?v=4",login:"akx"},{html_url:"https://github.com/bluenote10",avatar_url:"https://avatars.githubusercontent.com/u/3620703?v=4",login:"bluenote10"},{html_url:"https://github.com/sonicdoe",avatar_url:"https://avatars.githubusercontent.com/u/652793?v=4",login:"sonicdoe"},{html_url:"https://github.com/justushamalainen",avatar_url:"https://avatars.githubusercontent.com/u/1782573?v=4",login:"justushamalainen"},{html_url:"https://github.com/jung-kurt",avatar_url:"https://avatars.githubusercontent.com/u/5148839?v=4",login:"jung-kurt"},{html_url:"https://github.com/louisfoster",avatar_url:"https://avatars.githubusercontent.com/u/8028567?v=4",login:"louisfoster"},{html_url:"https://github.com/lukechinworth",avatar_url:"https://avatars.githubusercontent.com/u/5613424?v=4",login:"lukechinworth"},{html_url:"https://github.com/nikcorg",avatar_url:"https://avatars.githubusercontent.com/u/816988?v=4",login:"nikcorg"},{html_url:"https://github.com/petetnt",avatar_url:"https://avatars.githubusercontent.com/u/7641760?v=4",login:"petetnt"}],router$1=[{path:!1,text:"Guide",children:[{path:"#installation",text:"Installation",link:"docs/v3/guide/installation.md"},{path:"#introduction",text:"Introduction",link:"docs/v3/guide/introduction.md"},{path:"#elements",text:"Elements",link:"docs/v3/guide/elements.md"},{path:"#svg",text:"SVG",link:"docs/v3/guide/svg.md"},{path:"#set-children",text:"Set Children",link:"docs/v3/guide/set-children.md"},{path:"#update-elements",text:"Update elements",link:"docs/v3/guide/update-elements.md"},{path:"#mounting",text:"Mounting",link:"docs/v3/guide/mounting.md"},{path:"#components",text:"Components",link:"docs/v3/guide/components.md"},{path:"#lists",text:"Lists",link:"docs/v3/guide/lists.md"},{path:"#lifecycle",text:"Lifecycle",link:"docs/v3/guide/lifecycle.md"},{path:"#place",text:"Place",link:"docs/v3/guide/place.md"},{path:"#router",text:"Router",link:"docs/v3/guide/router.md"},{path:"#jsx",text:"JSX",link:"docs/v3/guide/jsx.md"}]},{path:!1,text:"Misc",children:[{path:"#api",text:"API Reference",link:"docs/v3/api/index.md"},{path:"#showcase",text:"Showcase",link:"docs/v3/showcase/index.md"}]},{path:!1,text:"Examples",children:[{path:"#hello-world",text:"Hello World",link:"docs/v3/examples/hello-world.md"},{path:"#todomvc",text:"TodoMVC",link:"docs/v3/examples/todomvc.md"},{path:"#commits",text:"GitHub Commits",link:"docs/v3/examples/commits.md"}]}],config={startPage:"https://redom.js.org/",contributors:contributors,backers:backers,docsRepo:"https://github.com/redom/redom-docs/blob/master/",version:"3.x",theme:{colors:{primary:"#d31b33",accent:"#673ab7"}},algolia:{applicationID:"<APPLICATION_ID>",apiKey:"<API_KEY>",index:"<INDEX_NAME>"},topNav:[{text:"Twitter",link:"https://twitter.com/redomjs/",icon:"<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current w-5 h-5\" viewBox=\"0 0 20 20\"><path d=\"M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84\"/></svg>"},{text:"Github",link:"https://github.com/redom/redom/",icon:"<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current w-5 h-5\" viewBox=\"0 0 20 20\"><path d=\"M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0\"/></svg>"}],sideNav:router$1},config_1=config.startPage,config_2=config.contributors,config_3=config.backers,config_4=config.docsRepo,config_5=config.version,config_6=config.theme,config_7=config.algolia,config_8=config.topNav,config_9=config.sideNav,data=/*#__PURE__*/Object.freeze({__proto__:null,default:config,__moduleExports:config,startPage:config_1,contributors:config_2,backers:config_3,docsRepo:config_4,version:config_5,theme:config_6,algolia:config_7,topNav:config_8,sideNav:config_9});class Home{constructor(){this.el=el("div",{},el("div#hero",{class:"z-40 w-full relative mx-auto px-6 pt-8 sm:pb-24 mb-16"},el("div",{class:"flex flex-col px-6 mx-auto items-center  max-w-4xl "},el("img",{src:"./static/images/redomjs.svg",alt:"RE:DOM Logo",class:"self-center w-32 sm:w-40  my-12"}),el("h1",{class:"text-2xl sm:text-4xl font-light leading-tight text-center"},"Tiny (2 KB) turboboosted JavaScript library for creating user interfaces."),el("div",{class:"flex flex-col sm:flex-row mt-12 w-full justify-center"},el("a",{href:"#installation",class:"sm:inline-flex items-center tracking-wider flex justify-center uppercase rounded-full px-8 py-3 sm:mr-4 mb-4 border border-primary text-base font-semibold text-primary",rel:"prerender"},"Get Started"),el("a",{href:"https://github.com/redom/redom/",target:"_blank",class:"sm:inline-flex items-center tracking-wider flex justify-center uppercase rounded-full px-8 pl-2 py-2 mb-4 border border-gray-200 bg-gray-200 text-base font-semibold text-gray-700",rel:"noopener"},svg("svg",{xmlns:"http://www.w3.org/2000/svg",class:"fill-current w-8 h-8 mr-3",viewBox:"0 0 20 20"},svg("path",{d:"M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"})),"Github")))),el("div",{class:"flex flex-col sm:flex-row mx-auto max-w-6xl mb-24 sm:mb-48 pb-8 text-center"},el("div",{class:"sm:w-1/3 pb-8 px-4"},el("h2",{class:"text-xl font-medium mb-4 text-gray-700"},"Small & Powerful"),el("p",{},"Useful helpers to create DOM elements and keeping them in sync with the data.")),el("div",{class:"sm:w-1/3 pb-8 px-4"},el("h2",{class:"text-xl font-medium mb-4 text-gray-700"},"High Performance"),el("p",{},"Close to the metal and",el("strong",{}," doesn't use virtual DOM "),"it's actually",el("strong",{},"  faster "),"and uses",el("strong",{},"  less memory "),"than almost all virtual DOM based libraries, including React ",el("a",{class:"text-primary hover:underline",target:"_blank",title:"Benchmark",href:"https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html",rel:"noopener"},"(benchmark)"),".")),el("div",{class:"sm:w-1/3 pb-8 px-4"},el("h2",{class:"text-xl font-medium mb-4 text-gray-700"},"Easy to Learn"),el("p",{},"You can use just",el("strong",{}," pure JavaScript "),"so no complicated templating languages to learn and hassle with."))),el("div#contributors",{class:"text-center relative text-gray-700"},svg("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"},svg("path",{fill:"currentColor",d:"M0 288h48c48 0 144 0 240-5.3C384 277 480 267 576 240c96-27 192-69 288-69.3 96 .3 192 42.3 288 69.3s192 37 240 42.7l48 5.3v32H0z"})),el("div",{class:"w-full max-w-6xl relative mx-auto px-6"},el("h2",{class:"text-gray-700 text-xl font-medium mb-4"},"Contributors"),el("p",{class:"mb-8"},"This project exists thanks to all the people who contribute."),this.contributors=list("div.flex.flex-wrap.justify-center",Contributor,"id"))),el("div#backers",{class:"text-center text-gray-700"},el("div",{class:"w-full max-w-6xl relative mx-auto px-6 pt-16 pb-4"},el("h2",{class:"text-gray-700 text-xl font-medium mb-4"},"Backers"),el("p",{class:"mb-8"},"Thank you to all our backers!"),this.backers=list("div.flex.flex-wrap.justify-center.mb-6",Backer,"id"),el("a",{href:"https://opencollective.com/redom#backers",target:"_blank",class:"tracking-wider mb-4 rounded-full px-6 py-2 sm:mr-4 border border-primary text-sm font-semibold text-primary",rel:"noopener"},"Become a Backer!"))),el("div#sponsors",{class:"text-center text-gray-700"},el("div",{class:"w-full max-w-6xl relative mx-auto px-6 pt-16 pb-24"},el("h2",{class:"text-gray-700 text-xl font-medium mb-4"},"Sponsors"),el("p",{class:"mb-8"},"Support this project by becoming a sponsor. Your logo will show up here with a link to your website."),this.sponsors=list("div.flex.flex-wrap.justify-center.mb-6",Backer,"id"),el("a",{href:"https://opencollective.com/redom/sponsor/0/website",target:"_blank",class:"tracking-wider mb-4 rounded-full px-6 py-2 sm:mr-4 border border-primary text-sm font-semibold text-primary",rel:"noopener"},"Become a Sponsor!")))),this.contributors.update(config_2),this.backers.update(config_3)}}class Contributor{constructor(){this.el=el("a")}update(e){const{html_url:t,avatar_url:r,login:n}=e;this.el=el("a",{href:t,target:"_blank","data-title":n,title:n,class:"my-2 mx-2",rel:"noopener"},el("img",{class:"w-10 h-10 rounded-full",alt:n,src:r}))}}class Backer{constructor(){this.el=el("a")}update(e){const{name:t,image:r,website:n,profile:a}=e;let s;s="null"===r?el("div",{class:"flex items-center justify-center font-semibold bg-gray-300 w-16 h-16 rounded-full"},t[0]):el("img",{class:"w-16 h-16 rounded-full",alt:t,src:r}),this.el=el("a",{href:"null"===n?a:n,"data-title":t,title:t,target:"_blank",class:"my-2 mx-2 w-16 h-16",rel:"noopener"},s)}}class Link{constructor(){this.el=el("a",{class:"block flex items-center hover:text-gray-700 ml-5"})}update(e){const{link:t,text:r,icon:n}=e;this.el.target="_blank",this.el.href=t,this.el.title=r,this.el.rel="noopener",this.el.innerHTML=n}}class TopNav{constructor(){this.el=el("div",{class:"flex justify-start items-center text-gray-500"}),this.list=list(this.el,Link,"id")}update(e){this.list.update(e.map(e=>e))}}class Header{constructor(){this.el=el("header#header",{class:"flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-50 lg:z-40 px-6 items-center"},el("div",{class:"h-16  flex w-full mx-auto"},el("div",{class:"lg:w-1/4"},this.logo=el("a#logo",{class:"lg:hidden flex items-center h-full font-light text-xl",href:config_1},"RE:DOM")),el("div",{class:" max-w-screen-xl items-center flex flex-grow justify-end lg:w-3/4"},el("div",{class:"relative"},el("label",{id:"selectversion",class:"hidden"},"Select Version"),el("select",{role:"listbox","aria-labelledby":"selectversion",tabindex:"0",id:"version",class:"appearance-none block bg-white pl-2 pr-8 py-1 text-gray-500 font-medium text-base focus:outline-none"},el("option",{value:"v3"},config_5)),el("div",{class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"},svg("svg",{class:"fill-current h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},svg("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"})))),el("div",{class:"hidden lg:flex"},this.nav=new TopNav),this.button=el("button",{"aria-label":"Menu",role:"button",class:"flex pl-4 items-center lg:hidden text-gray-500 focus:outline-none focus:text-gray-700"},svg("svg",{class:"fill-current w-4 h-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},svg("path",{d:"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"})))))),this.nav.update(config_8),this.button.addEventListener("click",t=>{const e=new CustomEvent("on:click-button",{detail:t,bubbles:!0});this.button.dispatchEvent(e)})}}// List of valid entities
//
// Generate with ./support/entities.js script
//
/*eslint quotes:0*/var entities={Aacute:"\xC1",aacute:"\xE1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223E",acd:"\u223F",acE:"\u223E\u0333",Acirc:"\xC2",acirc:"\xE2",acute:"\xB4",Acy:"\u0410",acy:"\u0430",AElig:"\xC6",aelig:"\xE6",af:"\u2061",Afr:"\uD835\uDD04",afr:"\uD835\uDD1E",Agrave:"\xC0",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03B1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2A3F",AMP:"&",amp:"&",And:"\u2A53",and:"\u2227",andand:"\u2A55",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",ange:"\u29A4",angle:"\u2220",angmsd:"\u2221",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angst:"\xC5",angzarr:"\u237C",Aogon:"\u0104",aogon:"\u0105",Aopf:"\uD835\uDD38",aopf:"\uD835\uDD52",ap:"\u2248",apacir:"\u2A6F",apE:"\u2A70",ape:"\u224A",apid:"\u224B",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224A",Aring:"\xC5",aring:"\xE5",Ascr:"\uD835\uDC9C",ascr:"\uD835\uDCB6",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224D",Atilde:"\xC3",atilde:"\xE3",Auml:"\xC4",auml:"\xE4",awconint:"\u2233",awint:"\u2A11",backcong:"\u224C",backepsilon:"\u03F6",backprime:"\u2035",backsim:"\u223D",backsimeq:"\u22CD",Backslash:"\u2216",Barv:"\u2AE7",barvee:"\u22BD",Barwed:"\u2306",barwed:"\u2305",barwedge:"\u2305",bbrk:"\u23B5",bbrktbrk:"\u23B6",bcong:"\u224C",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201E",becaus:"\u2235",Because:"\u2235",because:"\u2235",bemptyv:"\u29B0",bepsi:"\u03F6",bernou:"\u212C",Bernoullis:"\u212C",Beta:"\u0392",beta:"\u03B2",beth:"\u2136",between:"\u226C",Bfr:"\uD835\uDD05",bfr:"\uD835\uDD1F",bigcap:"\u22C2",bigcirc:"\u25EF",bigcup:"\u22C3",bigodot:"\u2A00",bigoplus:"\u2A01",bigotimes:"\u2A02",bigsqcup:"\u2A06",bigstar:"\u2605",bigtriangledown:"\u25BD",bigtriangleup:"\u25B3",biguplus:"\u2A04",bigvee:"\u22C1",bigwedge:"\u22C0",bkarow:"\u290D",blacklozenge:"\u29EB",blacksquare:"\u25AA",blacktriangle:"\u25B4",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bNot:"\u2AED",bnot:"\u2310",Bopf:"\uD835\uDD39",bopf:"\uD835\uDD53",bot:"\u22A5",bottom:"\u22A5",bowtie:"\u22C8",boxbox:"\u29C9",boxDL:"\u2557",boxDl:"\u2556",boxdL:"\u2555",boxdl:"\u2510",boxDR:"\u2554",boxDr:"\u2553",boxdR:"\u2552",boxdr:"\u250C",boxH:"\u2550",boxh:"\u2500",boxHD:"\u2566",boxHd:"\u2564",boxhD:"\u2565",boxhd:"\u252C",boxHU:"\u2569",boxHu:"\u2567",boxhU:"\u2568",boxhu:"\u2534",boxminus:"\u229F",boxplus:"\u229E",boxtimes:"\u22A0",boxUL:"\u255D",boxUl:"\u255C",boxuL:"\u255B",boxul:"\u2518",boxUR:"\u255A",boxUr:"\u2559",boxuR:"\u2558",boxur:"\u2514",boxV:"\u2551",boxv:"\u2502",boxVH:"\u256C",boxVh:"\u256B",boxvH:"\u256A",boxvh:"\u253C",boxVL:"\u2563",boxVl:"\u2562",boxvL:"\u2561",boxvl:"\u2524",boxVR:"\u2560",boxVr:"\u255F",boxvR:"\u255E",boxvr:"\u251C",bprime:"\u2035",Breve:"\u02D8",breve:"\u02D8",brvbar:"\xA6",Bscr:"\u212C",bscr:"\uD835\uDCB7",bsemi:"\u204F",bsim:"\u223D",bsime:"\u22CD",bsol:"\\",bsolb:"\u29C5",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bump:"\u224E",bumpE:"\u2AAE",bumpe:"\u224F",Bumpeq:"\u224E",bumpeq:"\u224F",Cacute:"\u0106",cacute:"\u0107",Cap:"\u22D2",cap:"\u2229",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",capcup:"\u2A47",capdot:"\u2A40",CapitalDifferentialD:"\u2145",caps:"\u2229\uFE00",caret:"\u2041",caron:"\u02C7",Cayleys:"\u212D",ccaps:"\u2A4D",Ccaron:"\u010C",ccaron:"\u010D",Ccedil:"\xC7",ccedil:"\xE7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2A4C",ccupssm:"\u2A50",Cdot:"\u010A",cdot:"\u010B",cedil:"\xB8",Cedilla:"\xB8",cemptyv:"\u29B2",cent:"\xA2",CenterDot:"\xB7",centerdot:"\xB7",Cfr:"\u212D",cfr:"\uD835\uDD20",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03A7",chi:"\u03C7",cir:"\u25CB",circ:"\u02C6",circeq:"\u2257",circlearrowleft:"\u21BA",circlearrowright:"\u21BB",circledast:"\u229B",circledcirc:"\u229A",circleddash:"\u229D",CircleDot:"\u2299",circledR:"\xAE",circledS:"\u24C8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cirE:"\u29C3",cire:"\u2257",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201D",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",Colon:"\u2237",colon:":",Colone:"\u2A74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2A6D",Congruent:"\u2261",Conint:"\u222F",conint:"\u222E",ContourIntegral:"\u222E",Copf:"\u2102",copf:"\uD835\uDD54",coprod:"\u2210",Coproduct:"\u2210",COPY:"\xA9",copy:"\xA9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21B5",Cross:"\u2A2F",cross:"\u2717",Cscr:"\uD835\uDC9E",cscr:"\uD835\uDCB8",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",cuesc:"\u22DF",cularr:"\u21B6",cularrp:"\u293D",Cup:"\u22D3",cup:"\u222A",cupbrcap:"\u2A48",CupCap:"\u224D",cupcap:"\u2A46",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curarrm:"\u293C",curlyeqprec:"\u22DE",curlyeqsucc:"\u22DF",curlyvee:"\u22CE",curlywedge:"\u22CF",curren:"\xA4",curvearrowleft:"\u21B6",curvearrowright:"\u21B7",cuvee:"\u22CE",cuwed:"\u22CF",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232D",Dagger:"\u2021",dagger:"\u2020",daleth:"\u2138",Darr:"\u21A1",dArr:"\u21D3",darr:"\u2193",dash:"\u2010",Dashv:"\u2AE4",dashv:"\u22A3",dbkarow:"\u290F",dblac:"\u02DD",Dcaron:"\u010E",dcaron:"\u010F",Dcy:"\u0414",dcy:"\u0434",DD:"\u2145",dd:"\u2146",ddagger:"\u2021",ddarr:"\u21CA",DDotrahd:"\u2911",ddotseq:"\u2A77",deg:"\xB0",Del:"\u2207",Delta:"\u0394",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",Dfr:"\uD835\uDD07",dfr:"\uD835\uDD21",dHar:"\u2965",dharl:"\u21C3",dharr:"\u21C2",DiacriticalAcute:"\xB4",DiacriticalDot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",DiacriticalGrave:"`",DiacriticalTilde:"\u02DC",diam:"\u22C4",Diamond:"\u22C4",diamond:"\u22C4",diamondsuit:"\u2666",diams:"\u2666",die:"\xA8",DifferentialD:"\u2146",digamma:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231E",dlcrop:"\u230D",dollar:"$",Dopf:"\uD835\uDD3B",dopf:"\uD835\uDD55",Dot:"\xA8",dot:"\u02D9",DotDot:"\u20DC",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22A1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222F",DoubleDot:"\xA8",DoubleDownArrow:"\u21D3",DoubleLeftArrow:"\u21D0",DoubleLeftRightArrow:"\u21D4",DoubleLeftTee:"\u2AE4",DoubleLongLeftArrow:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",DoubleLongRightArrow:"\u27F9",DoubleRightArrow:"\u21D2",DoubleRightTee:"\u22A8",DoubleUpArrow:"\u21D1",DoubleUpDownArrow:"\u21D5",DoubleVerticalBar:"\u2225",DownArrow:"\u2193",Downarrow:"\u21D3",downarrow:"\u2193",DownArrowBar:"\u2913",DownArrowUpArrow:"\u21F5",DownBreve:"\u0311",downdownarrows:"\u21CA",downharpoonleft:"\u21C3",downharpoonright:"\u21C2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVector:"\u21BD",DownLeftVectorBar:"\u2956",DownRightTeeVector:"\u295F",DownRightVector:"\u21C1",DownRightVectorBar:"\u2957",DownTee:"\u22A4",DownTeeArrow:"\u21A7",drbkarow:"\u2910",drcorn:"\u231F",drcrop:"\u230C",Dscr:"\uD835\uDC9F",dscr:"\uD835\uDCB9",DScy:"\u0405",dscy:"\u0455",dsol:"\u29F6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",dtrif:"\u25BE",duarr:"\u21F5",duhar:"\u296F",dwangle:"\u29A6",DZcy:"\u040F",dzcy:"\u045F",dzigrarr:"\u27FF",Eacute:"\xC9",eacute:"\xE9",easter:"\u2A6E",Ecaron:"\u011A",ecaron:"\u011B",ecir:"\u2256",Ecirc:"\xCA",ecirc:"\xEA",ecolon:"\u2255",Ecy:"\u042D",ecy:"\u044D",eDDot:"\u2A77",Edot:"\u0116",eDot:"\u2251",edot:"\u0117",ee:"\u2147",efDot:"\u2252",Efr:"\uD835\uDD08",efr:"\uD835\uDD22",eg:"\u2A9A",Egrave:"\xC8",egrave:"\xE8",egs:"\u2A96",egsdot:"\u2A98",el:"\u2A99",Element:"\u2208",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",elsdot:"\u2A97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25FB",emptyv:"\u2205",EmptyVerySmallSquare:"\u25AB",emsp:"\u2003",emsp13:"\u2004",emsp14:"\u2005",ENG:"\u014A",eng:"\u014B",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\uD835\uDD3C",eopf:"\uD835\uDD56",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",Epsilon:"\u0395",epsilon:"\u03B5",epsiv:"\u03F5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2A96",eqslantless:"\u2A95",Equal:"\u2A75",equals:"=",EqualTilde:"\u2242",equest:"\u225F",Equilibrium:"\u21CC",equiv:"\u2261",equivDD:"\u2A78",eqvparsl:"\u29E5",erarr:"\u2971",erDot:"\u2253",Escr:"\u2130",escr:"\u212F",esdot:"\u2250",Esim:"\u2A73",esim:"\u2242",Eta:"\u0397",eta:"\u03B7",ETH:"\xD0",eth:"\xF0",Euml:"\xCB",euml:"\xEB",euro:"\u20AC",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",ExponentialE:"\u2147",exponentiale:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",Ffr:"\uD835\uDD09",ffr:"\uD835\uDD23",filig:"\uFB01",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",Fopf:"\uD835\uDD3D",fopf:"\uD835\uDD57",ForAll:"\u2200",forall:"\u2200",fork:"\u22D4",forkv:"\u2AD9",Fouriertrf:"\u2131",fpartint:"\u2A0D",frac12:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",Fscr:"\u2131",fscr:"\uD835\uDCBB",gacute:"\u01F5",Gamma:"\u0393",gamma:"\u03B3",Gammad:"\u03DC",gammad:"\u03DD",gap:"\u2A86",Gbreve:"\u011E",gbreve:"\u011F",Gcedil:"\u0122",Gcirc:"\u011C",gcirc:"\u011D",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",gE:"\u2267",ge:"\u2265",gEl:"\u2A8C",gel:"\u22DB",geq:"\u2265",geqq:"\u2267",geqslant:"\u2A7E",ges:"\u2A7E",gescc:"\u2AA9",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",Gfr:"\uD835\uDD0A",gfr:"\uD835\uDD24",Gg:"\u22D9",gg:"\u226B",ggg:"\u22D9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gl:"\u2277",gla:"\u2AA5",glE:"\u2A92",glj:"\u2AA4",gnap:"\u2A8A",gnapprox:"\u2A8A",gnE:"\u2269",gne:"\u2A88",gneq:"\u2A88",gneqq:"\u2269",gnsim:"\u22E7",Gopf:"\uD835\uDD3E",gopf:"\uD835\uDD58",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22DB",GreaterFullEqual:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2A7E",GreaterTilde:"\u2273",Gscr:"\uD835\uDCA2",gscr:"\u210A",gsim:"\u2273",gsime:"\u2A8E",gsiml:"\u2A90",GT:">",Gt:"\u226B",gt:">",gtcc:"\u2AA7",gtcir:"\u2A7A",gtdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrapprox:"\u2A86",gtrarr:"\u2978",gtrdot:"\u22D7",gtreqless:"\u22DB",gtreqqless:"\u2A8C",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",Hacek:"\u02C7",hairsp:"\u200A",half:"\xBD",hamilt:"\u210B",HARDcy:"\u042A",hardcy:"\u044A",hArr:"\u21D4",harr:"\u2194",harrcir:"\u2948",harrw:"\u21AD",Hat:"^",hbar:"\u210F",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22B9",Hfr:"\u210C",hfr:"\uD835\uDD25",HilbertSpace:"\u210B",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",hookrightarrow:"\u21AA",Hopf:"\u210D",hopf:"\uD835\uDD59",horbar:"\u2015",HorizontalLine:"\u2500",Hscr:"\u210B",hscr:"\uD835\uDCBD",hslash:"\u210F",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224E",HumpEqual:"\u224F",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xCD",iacute:"\xED",ic:"\u2063",Icirc:"\xCE",icirc:"\xEE",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xA1",iff:"\u21D4",Ifr:"\u2111",ifr:"\uD835\uDD26",Igrave:"\xCC",igrave:"\xEC",ii:"\u2148",iiiint:"\u2A0C",iiint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Im:"\u2111",Imacr:"\u012A",imacr:"\u012B",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",imof:"\u22B7",imped:"\u01B5",Implies:"\u21D2",in:"\u2208",incare:"\u2105",infin:"\u221E",infintie:"\u29DD",inodot:"\u0131",Int:"\u222C",int:"\u222B",intcal:"\u22BA",integers:"\u2124",Integral:"\u222B",intercal:"\u22BA",Intersection:"\u22C2",intlarhk:"\u2A17",intprod:"\u2A3C",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012E",iogon:"\u012F",Iopf:"\uD835\uDD40",iopf:"\uD835\uDD5A",Iota:"\u0399",iota:"\u03B9",iprod:"\u2A3C",iquest:"\xBF",Iscr:"\u2110",iscr:"\uD835\uDCBE",isin:"\u2208",isindot:"\u22F5",isinE:"\u22F9",isins:"\u22F4",isinsv:"\u22F3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xCF",iuml:"\xEF",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\uD835\uDD0D",jfr:"\uD835\uDD27",jmath:"\u0237",Jopf:"\uD835\uDD41",jopf:"\uD835\uDD5B",Jscr:"\uD835\uDCA5",jscr:"\uD835\uDCBF",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039A",kappa:"\u03BA",kappav:"\u03F0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041A",kcy:"\u043A",Kfr:"\uD835\uDD0E",kfr:"\uD835\uDD28",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040C",kjcy:"\u045C",Kopf:"\uD835\uDD42",kopf:"\uD835\uDD5C",Kscr:"\uD835\uDCA6",kscr:"\uD835\uDCC0",lAarr:"\u21DA",Lacute:"\u0139",lacute:"\u013A",laemptyv:"\u29B4",lagran:"\u2112",Lambda:"\u039B",lambda:"\u03BB",Lang:"\u27EA",lang:"\u27E8",langd:"\u2991",langle:"\u27E8",lap:"\u2A85",Laplacetrf:"\u2112",laquo:"\xAB",Larr:"\u219E",lArr:"\u21D0",larr:"\u2190",larrb:"\u21E4",larrbfs:"\u291F",larrfs:"\u291D",larrhk:"\u21A9",larrlp:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",lat:"\u2AAB",lAtail:"\u291B",latail:"\u2919",late:"\u2AAD",lates:"\u2AAD\uFE00",lBarr:"\u290E",lbarr:"\u290C",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",Lcaron:"\u013D",lcaron:"\u013E",Lcedil:"\u013B",lcedil:"\u013C",lceil:"\u2308",lcub:"{",Lcy:"\u041B",lcy:"\u043B",ldca:"\u2936",ldquo:"\u201C",ldquor:"\u201E",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",lE:"\u2266",le:"\u2264",LeftAngleBracket:"\u27E8",LeftArrow:"\u2190",Leftarrow:"\u21D0",leftarrow:"\u2190",LeftArrowBar:"\u21E4",LeftArrowRightArrow:"\u21C6",leftarrowtail:"\u21A2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVector:"\u21C3",LeftDownVectorBar:"\u2959",LeftFloor:"\u230A",leftharpoondown:"\u21BD",leftharpoonup:"\u21BC",leftleftarrows:"\u21C7",LeftRightArrow:"\u2194",Leftrightarrow:"\u21D4",leftrightarrow:"\u2194",leftrightarrows:"\u21C6",leftrightharpoons:"\u21CB",leftrightsquigarrow:"\u21AD",LeftRightVector:"\u294E",LeftTee:"\u22A3",LeftTeeArrow:"\u21A4",LeftTeeVector:"\u295A",leftthreetimes:"\u22CB",LeftTriangle:"\u22B2",LeftTriangleBar:"\u29CF",LeftTriangleEqual:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVector:"\u21BF",LeftUpVectorBar:"\u2958",LeftVector:"\u21BC",LeftVectorBar:"\u2952",lEg:"\u2A8B",leg:"\u22DA",leq:"\u2264",leqq:"\u2266",leqslant:"\u2A7D",les:"\u2A7D",lescc:"\u2AA8",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessapprox:"\u2A85",lessdot:"\u22D6",lesseqgtr:"\u22DA",lesseqqgtr:"\u2A8B",LessEqualGreater:"\u22DA",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2AA1",lesssim:"\u2272",LessSlantEqual:"\u2A7D",LessTilde:"\u2272",lfisht:"\u297C",lfloor:"\u230A",Lfr:"\uD835\uDD0F",lfr:"\uD835\uDD29",lg:"\u2276",lgE:"\u2A91",lHar:"\u2962",lhard:"\u21BD",lharu:"\u21BC",lharul:"\u296A",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",Ll:"\u22D8",ll:"\u226A",llarr:"\u21C7",llcorner:"\u231E",Lleftarrow:"\u21DA",llhard:"\u296B",lltri:"\u25FA",Lmidot:"\u013F",lmidot:"\u0140",lmoust:"\u23B0",lmoustache:"\u23B0",lnap:"\u2A89",lnapprox:"\u2A89",lnE:"\u2268",lne:"\u2A87",lneq:"\u2A87",lneqq:"\u2268",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",lobrk:"\u27E6",LongLeftArrow:"\u27F5",Longleftarrow:"\u27F8",longleftarrow:"\u27F5",LongLeftRightArrow:"\u27F7",Longleftrightarrow:"\u27FA",longleftrightarrow:"\u27F7",longmapsto:"\u27FC",LongRightArrow:"\u27F6",Longrightarrow:"\u27F9",longrightarrow:"\u27F6",looparrowleft:"\u21AB",looparrowright:"\u21AC",lopar:"\u2985",Lopf:"\uD835\uDD43",lopf:"\uD835\uDD5D",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25CA",lozenge:"\u25CA",lozf:"\u29EB",lpar:"(",lparlt:"\u2993",lrarr:"\u21C6",lrcorner:"\u231F",lrhar:"\u21CB",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",Lscr:"\u2112",lscr:"\uD835\uDCC1",Lsh:"\u21B0",lsh:"\u21B0",lsim:"\u2272",lsime:"\u2A8D",lsimg:"\u2A8F",lsqb:"[",lsquo:"\u2018",lsquor:"\u201A",Lstrok:"\u0141",lstrok:"\u0142",LT:"<",Lt:"\u226A",lt:"<",ltcc:"\u2AA6",ltcir:"\u2A79",ltdot:"\u22D6",lthree:"\u22CB",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltri:"\u25C3",ltrie:"\u22B4",ltrif:"\u25C2",ltrPar:"\u2996",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",macr:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21A6",mapsto:"\u21A6",mapstodown:"\u21A7",mapstoleft:"\u21A4",mapstoup:"\u21A5",marker:"\u25AE",mcomma:"\u2A29",Mcy:"\u041C",mcy:"\u043C",mdash:"\u2014",mDDot:"\u223A",measuredangle:"\u2221",MediumSpace:"\u205F",Mellintrf:"\u2133",Mfr:"\uD835\uDD10",mfr:"\uD835\uDD2A",mho:"\u2127",micro:"\xB5",mid:"\u2223",midast:"*",midcir:"\u2AF0",middot:"\xB7",minus:"\u2212",minusb:"\u229F",minusd:"\u2238",minusdu:"\u2A2A",MinusPlus:"\u2213",mlcp:"\u2ADB",mldr:"\u2026",mnplus:"\u2213",models:"\u22A7",Mopf:"\uD835\uDD44",mopf:"\uD835\uDD5E",mp:"\u2213",Mscr:"\u2133",mscr:"\uD835\uDCC2",mstpos:"\u223E",Mu:"\u039C",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20D2",nap:"\u2249",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",napprox:"\u2249",natur:"\u266E",natural:"\u266E",naturals:"\u2115",nbsp:"\xA0",nbump:"\u224E\u0338",nbumpe:"\u224F\u0338",ncap:"\u2A43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",Ncy:"\u041D",ncy:"\u043D",ndash:"\u2013",ne:"\u2260",nearhk:"\u2924",neArr:"\u21D7",nearr:"\u2197",nearrow:"\u2197",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226B",NestedLessLess:"\u226A",NewLine:"\n",nexist:"\u2204",nexists:"\u2204",Nfr:"\uD835\uDD11",nfr:"\uD835\uDD2B",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",nGg:"\u22D9\u0338",ngsim:"\u2275",nGt:"\u226B\u20D2",ngt:"\u226F",ngtr:"\u226F",nGtv:"\u226B\u0338",nhArr:"\u21CE",nharr:"\u21AE",nhpar:"\u2AF2",ni:"\u220B",nis:"\u22FC",nisd:"\u22FA",niv:"\u220B",NJcy:"\u040A",njcy:"\u045A",nlArr:"\u21CD",nlarr:"\u219A",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nLeftarrow:"\u21CD",nleftarrow:"\u219A",nLeftrightarrow:"\u21CE",nleftrightarrow:"\u21AE",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",nless:"\u226E",nLl:"\u22D8\u0338",nlsim:"\u2274",nLt:"\u226A\u20D2",nlt:"\u226E",nltri:"\u22EA",nltrie:"\u22EC",nLtv:"\u226A\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xA0",Nopf:"\u2115",nopf:"\uD835\uDD5F",Not:"\u2AEC",not:"\xAC",NotCongruent:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226F",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",notin:"\u2209",notindot:"\u22F5\u0338",notinE:"\u22F9\u0338",notinva:"\u2209",notinvb:"\u22F7",notinvc:"\u22F6",NotLeftTriangle:"\u22EA",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangleEqual:"\u22EC",NotLess:"\u226E",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",notni:"\u220C",notniva:"\u220C",notnivb:"\u22FE",notnivc:"\u22FD",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",NotReverseElement:"\u220C",NotRightTriangle:"\u22EB",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangleEqual:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",NotSubset:"\u2282\u20D2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",npar:"\u2226",nparallel:"\u2226",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",npr:"\u2280",nprcue:"\u22E0",npre:"\u2AAF\u0338",nprec:"\u2280",npreceq:"\u2AAF\u0338",nrArr:"\u21CF",nrarr:"\u219B",nrarrc:"\u2933\u0338",nrarrw:"\u219D\u0338",nRightarrow:"\u21CF",nrightarrow:"\u219B",nrtri:"\u22EB",nrtrie:"\u22ED",nsc:"\u2281",nsccue:"\u22E1",nsce:"\u2AB0\u0338",Nscr:"\uD835\uDCA9",nscr:"\uD835\uDCC3",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22E2",nsqsupe:"\u22E3",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsube:"\u2288",nsubset:"\u2282\u20D2",nsubseteq:"\u2288",nsubseteqq:"\u2AC5\u0338",nsucc:"\u2281",nsucceq:"\u2AB0\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20D2",nsupseteq:"\u2289",nsupseteqq:"\u2AC6\u0338",ntgl:"\u2279",Ntilde:"\xD1",ntilde:"\xF1",ntlg:"\u2278",ntriangleleft:"\u22EA",ntrianglelefteq:"\u22EC",ntriangleright:"\u22EB",ntrianglerighteq:"\u22ED",Nu:"\u039D",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224D\u20D2",nVDash:"\u22AF",nVdash:"\u22AE",nvDash:"\u22AD",nvdash:"\u22AC",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvHarr:"\u2904",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwarhk:"\u2923",nwArr:"\u21D6",nwarr:"\u2196",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xD3",oacute:"\xF3",oast:"\u229B",ocir:"\u229A",Ocirc:"\xD4",ocirc:"\xF4",Ocy:"\u041E",ocy:"\u043E",odash:"\u229D",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2A38",odot:"\u2299",odsold:"\u29BC",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29BF",Ofr:"\uD835\uDD12",ofr:"\uD835\uDD2C",ogon:"\u02DB",Ograve:"\xD2",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",ohm:"\u03A9",oint:"\u222E",olarr:"\u21BA",olcir:"\u29BE",olcross:"\u29BB",oline:"\u203E",olt:"\u29C0",Omacr:"\u014C",omacr:"\u014D",Omega:"\u03A9",omega:"\u03C9",Omicron:"\u039F",omicron:"\u03BF",omid:"\u29B6",ominus:"\u2296",Oopf:"\uD835\uDD46",oopf:"\uD835\uDD60",opar:"\u29B7",OpenCurlyDoubleQuote:"\u201C",OpenCurlyQuote:"\u2018",operp:"\u29B9",oplus:"\u2295",Or:"\u2A54",or:"\u2228",orarr:"\u21BB",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oS:"\u24C8",Oscr:"\uD835\uDCAA",oscr:"\u2134",Oslash:"\xD8",oslash:"\xF8",osol:"\u2298",Otilde:"\xD5",otilde:"\xF5",Otimes:"\u2A37",otimes:"\u2297",otimesas:"\u2A36",Ouml:"\xD6",ouml:"\xF6",ovbar:"\u233D",OverBar:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",OverParenthesis:"\u23DC",par:"\u2225",para:"\xB6",parallel:"\u2225",parsim:"\u2AF3",parsl:"\u2AFD",part:"\u2202",PartialD:"\u2202",Pcy:"\u041F",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",perp:"\u22A5",pertenk:"\u2031",Pfr:"\uD835\uDD13",pfr:"\uD835\uDD2D",Phi:"\u03A6",phi:"\u03C6",phiv:"\u03D5",phmmat:"\u2133",phone:"\u260E",Pi:"\u03A0",pi:"\u03C0",pitchfork:"\u22D4",piv:"\u03D6",planck:"\u210F",planckh:"\u210E",plankv:"\u210F",plus:"+",plusacir:"\u2A23",plusb:"\u229E",pluscir:"\u2A22",plusdo:"\u2214",plusdu:"\u2A25",pluse:"\u2A72",PlusMinus:"\xB1",plusmn:"\xB1",plussim:"\u2A26",plustwo:"\u2A27",pm:"\xB1",Poincareplane:"\u210C",pointint:"\u2A15",Popf:"\u2119",popf:"\uD835\uDD61",pound:"\xA3",Pr:"\u2ABB",pr:"\u227A",prap:"\u2AB7",prcue:"\u227C",prE:"\u2AB3",pre:"\u2AAF",prec:"\u227A",precapprox:"\u2AB7",preccurlyeq:"\u227C",Precedes:"\u227A",PrecedesEqual:"\u2AAF",PrecedesSlantEqual:"\u227C",PrecedesTilde:"\u227E",preceq:"\u2AAF",precnapprox:"\u2AB9",precneqq:"\u2AB5",precnsim:"\u22E8",precsim:"\u227E",Prime:"\u2033",prime:"\u2032",primes:"\u2119",prnap:"\u2AB9",prnE:"\u2AB5",prnsim:"\u22E8",prod:"\u220F",Product:"\u220F",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prop:"\u221D",Proportion:"\u2237",Proportional:"\u221D",propto:"\u221D",prsim:"\u227E",prurel:"\u22B0",Pscr:"\uD835\uDCAB",pscr:"\uD835\uDCC5",Psi:"\u03A8",psi:"\u03C8",puncsp:"\u2008",Qfr:"\uD835\uDD14",qfr:"\uD835\uDD2E",qint:"\u2A0C",Qopf:"\u211A",qopf:"\uD835\uDD62",qprime:"\u2057",Qscr:"\uD835\uDCAC",qscr:"\uD835\uDCC6",quaternions:"\u210D",quatint:"\u2A16",quest:"?",questeq:"\u225F",QUOT:"\"",quot:"\"",rAarr:"\u21DB",race:"\u223D\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221A",raemptyv:"\u29B3",Rang:"\u27EB",rang:"\u27E9",rangd:"\u2992",range:"\u29A5",rangle:"\u27E9",raquo:"\xBB",Rarr:"\u21A0",rArr:"\u21D2",rarr:"\u2192",rarrap:"\u2975",rarrb:"\u21E5",rarrbfs:"\u2920",rarrc:"\u2933",rarrfs:"\u291E",rarrhk:"\u21AA",rarrlp:"\u21AC",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21A3",rarrw:"\u219D",rAtail:"\u291C",ratail:"\u291A",ratio:"\u2236",rationals:"\u211A",RBarr:"\u2910",rBarr:"\u290F",rbarr:"\u290D",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201D",rdquor:"\u201D",rdsh:"\u21B3",Re:"\u211C",real:"\u211C",realine:"\u211B",realpart:"\u211C",reals:"\u211D",rect:"\u25AD",REG:"\xAE",reg:"\xAE",ReverseElement:"\u220B",ReverseEquilibrium:"\u21CB",ReverseUpEquilibrium:"\u296F",rfisht:"\u297D",rfloor:"\u230B",Rfr:"\u211C",rfr:"\uD835\uDD2F",rHar:"\u2964",rhard:"\u21C1",rharu:"\u21C0",rharul:"\u296C",Rho:"\u03A1",rho:"\u03C1",rhov:"\u03F1",RightAngleBracket:"\u27E9",RightArrow:"\u2192",Rightarrow:"\u21D2",rightarrow:"\u2192",RightArrowBar:"\u21E5",RightArrowLeftArrow:"\u21C4",rightarrowtail:"\u21A3",RightCeiling:"\u2309",RightDoubleBracket:"\u27E7",RightDownTeeVector:"\u295D",RightDownVector:"\u21C2",RightDownVectorBar:"\u2955",RightFloor:"\u230B",rightharpoondown:"\u21C1",rightharpoonup:"\u21C0",rightleftarrows:"\u21C4",rightleftharpoons:"\u21CC",rightrightarrows:"\u21C9",rightsquigarrow:"\u219D",RightTee:"\u22A2",RightTeeArrow:"\u21A6",RightTeeVector:"\u295B",rightthreetimes:"\u22CC",RightTriangle:"\u22B3",RightTriangleBar:"\u29D0",RightTriangleEqual:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVector:"\u21BE",RightUpVectorBar:"\u2954",RightVector:"\u21C0",RightVectorBar:"\u2953",ring:"\u02DA",risingdotseq:"\u2253",rlarr:"\u21C4",rlhar:"\u21CC",rlm:"\u200F",rmoust:"\u23B1",rmoustache:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",robrk:"\u27E7",ropar:"\u2986",Ropf:"\u211D",ropf:"\uD835\uDD63",roplus:"\u2A2E",rotimes:"\u2A35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rrarr:"\u21C9",Rrightarrow:"\u21DB",rsaquo:"\u203A",Rscr:"\u211B",rscr:"\uD835\uDCC7",Rsh:"\u21B1",rsh:"\u21B1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22CC",rtimes:"\u22CA",rtri:"\u25B9",rtrie:"\u22B5",rtrif:"\u25B8",rtriltri:"\u29CE",RuleDelayed:"\u29F4",ruluhar:"\u2968",rx:"\u211E",Sacute:"\u015A",sacute:"\u015B",sbquo:"\u201A",Sc:"\u2ABC",sc:"\u227B",scap:"\u2AB8",Scaron:"\u0160",scaron:"\u0161",sccue:"\u227D",scE:"\u2AB4",sce:"\u2AB0",Scedil:"\u015E",scedil:"\u015F",Scirc:"\u015C",scirc:"\u015D",scnap:"\u2ABA",scnE:"\u2AB6",scnsim:"\u22E9",scpolint:"\u2A13",scsim:"\u227F",Scy:"\u0421",scy:"\u0441",sdot:"\u22C5",sdotb:"\u22A1",sdote:"\u2A66",searhk:"\u2925",seArr:"\u21D8",searr:"\u2198",searrow:"\u2198",sect:"\xA7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\uD835\uDD16",sfr:"\uD835\uDD30",sfrown:"\u2322",sharp:"\u266F",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xAD",Sigma:"\u03A3",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",sim:"\u223C",simdot:"\u2A6A",sime:"\u2243",simeq:"\u2243",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2A33",smeparsl:"\u29E4",smid:"\u2223",smile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",SOFTcy:"\u042C",softcy:"\u044C",sol:"/",solb:"\u29C4",solbar:"\u233F",Sopf:"\uD835\uDD4A",sopf:"\uD835\uDD64",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\uFE00",sqcup:"\u2294",sqcups:"\u2294\uFE00",Sqrt:"\u221A",sqsub:"\u228F",sqsube:"\u2291",sqsubset:"\u228F",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",squ:"\u25A1",Square:"\u25A1",square:"\u25A1",SquareIntersection:"\u2293",SquareSubset:"\u228F",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25AA",squf:"\u25AA",srarr:"\u2192",Sscr:"\uD835\uDCAE",sscr:"\uD835\uDCC8",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22C6",Star:"\u22C6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03F5",straightphi:"\u03D5",strns:"\xAF",Sub:"\u22D0",sub:"\u2282",subdot:"\u2ABD",subE:"\u2AC5",sube:"\u2286",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subne:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",Subset:"\u22D0",subset:"\u2282",subseteq:"\u2286",subseteqq:"\u2AC5",SubsetEqual:"\u2286",subsetneq:"\u228A",subsetneqq:"\u2ACB",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",succ:"\u227B",succapprox:"\u2AB8",succcurlyeq:"\u227D",Succeeds:"\u227B",SucceedsEqual:"\u2AB0",SucceedsSlantEqual:"\u227D",SucceedsTilde:"\u227F",succeq:"\u2AB0",succnapprox:"\u2ABA",succneqq:"\u2AB6",succnsim:"\u22E9",succsim:"\u227F",SuchThat:"\u220B",Sum:"\u2211",sum:"\u2211",sung:"\u266A",Sup:"\u22D1",sup:"\u2283",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",supdot:"\u2ABE",supdsub:"\u2AD8",supE:"\u2AC6",supe:"\u2287",supedot:"\u2AC4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supne:"\u228B",supplus:"\u2AC0",Supset:"\u22D1",supset:"\u2283",supseteq:"\u2287",supseteqq:"\u2AC6",supsetneq:"\u228B",supsetneqq:"\u2ACC",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swarhk:"\u2926",swArr:"\u21D9",swarr:"\u2199",swarrow:"\u2199",swnwar:"\u292A",szlig:"\xDF",Tab:"\t",target:"\u2316",Tau:"\u03A4",tau:"\u03C4",tbrk:"\u23B4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20DB",telrec:"\u2315",Tfr:"\uD835\uDD17",tfr:"\uD835\uDD31",there4:"\u2234",Therefore:"\u2234",therefore:"\u2234",Theta:"\u0398",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",thickapprox:"\u2248",thicksim:"\u223C",ThickSpace:"\u205F\u200A",thinsp:"\u2009",ThinSpace:"\u2009",thkap:"\u2248",thksim:"\u223C",THORN:"\xDE",thorn:"\xFE",Tilde:"\u223C",tilde:"\u02DC",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",times:"\xD7",timesb:"\u22A0",timesbar:"\u2A31",timesd:"\u2A30",tint:"\u222D",toea:"\u2928",top:"\u22A4",topbot:"\u2336",topcir:"\u2AF1",Topf:"\uD835\uDD4B",topf:"\uD835\uDD65",topfork:"\u2ADA",tosa:"\u2929",tprime:"\u2034",TRADE:"\u2122",trade:"\u2122",triangle:"\u25B5",triangledown:"\u25BF",triangleleft:"\u25C3",trianglelefteq:"\u22B4",triangleq:"\u225C",triangleright:"\u25B9",trianglerighteq:"\u22B5",tridot:"\u25EC",trie:"\u225C",triminus:"\u2A3A",TripleDot:"\u20DB",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",Tscr:"\uD835\uDCAF",tscr:"\uD835\uDCC9",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040B",tshcy:"\u045B",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226C",twoheadleftarrow:"\u219E",twoheadrightarrow:"\u21A0",Uacute:"\xDA",uacute:"\xFA",Uarr:"\u219F",uArr:"\u21D1",uarr:"\u2191",Uarrocir:"\u2949",Ubrcy:"\u040E",ubrcy:"\u045E",Ubreve:"\u016C",ubreve:"\u016D",Ucirc:"\xDB",ucirc:"\xFB",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21C5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296E",ufisht:"\u297E",Ufr:"\uD835\uDD18",ufr:"\uD835\uDD32",Ugrave:"\xD9",ugrave:"\xF9",uHar:"\u2963",uharl:"\u21BF",uharr:"\u21BE",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",Umacr:"\u016A",umacr:"\u016B",uml:"\xA8",UnderBar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",UnionPlus:"\u228E",Uogon:"\u0172",uogon:"\u0173",Uopf:"\uD835\uDD4C",uopf:"\uD835\uDD66",UpArrow:"\u2191",Uparrow:"\u21D1",uparrow:"\u2191",UpArrowBar:"\u2912",UpArrowDownArrow:"\u21C5",UpDownArrow:"\u2195",Updownarrow:"\u21D5",updownarrow:"\u2195",UpEquilibrium:"\u296E",upharpoonleft:"\u21BF",upharpoonright:"\u21BE",uplus:"\u228E",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",Upsi:"\u03D2",upsi:"\u03C5",upsih:"\u03D2",Upsilon:"\u03A5",upsilon:"\u03C5",UpTee:"\u22A5",UpTeeArrow:"\u21A5",upuparrows:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",Uring:"\u016E",uring:"\u016F",urtri:"\u25F9",Uscr:"\uD835\uDCB0",uscr:"\uD835\uDCCA",utdot:"\u22F0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25B5",utrif:"\u25B4",uuarr:"\u21C8",Uuml:"\xDC",uuml:"\xFC",uwangle:"\u29A7",vangrt:"\u299C",varepsilon:"\u03F5",varkappa:"\u03F0",varnothing:"\u2205",varphi:"\u03D5",varpi:"\u03D6",varpropto:"\u221D",vArr:"\u21D5",varr:"\u2195",varrho:"\u03F1",varsigma:"\u03C2",varsubsetneq:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vartheta:"\u03D1",vartriangleleft:"\u22B2",vartriangleright:"\u22B3",Vbar:"\u2AEB",vBar:"\u2AE8",vBarv:"\u2AE9",Vcy:"\u0412",vcy:"\u0432",VDash:"\u22AB",Vdash:"\u22A9",vDash:"\u22A8",vdash:"\u22A2",Vdashl:"\u2AE6",Vee:"\u22C1",vee:"\u2228",veebar:"\u22BB",veeeq:"\u225A",vellip:"\u22EE",Verbar:"\u2016",verbar:"|",Vert:"\u2016",vert:"|",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200A",Vfr:"\uD835\uDD19",vfr:"\uD835\uDD33",vltri:"\u22B2",vnsub:"\u2282\u20D2",vnsup:"\u2283\u20D2",Vopf:"\uD835\uDD4D",vopf:"\uD835\uDD67",vprop:"\u221D",vrtri:"\u22B3",Vscr:"\uD835\uDCB1",vscr:"\uD835\uDCCB",vsubnE:"\u2ACB\uFE00",vsubne:"\u228A\uFE00",vsupnE:"\u2ACC\uFE00",vsupne:"\u228B\uFE00",Vvdash:"\u22AA",vzigzag:"\u299A",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2A5F",Wedge:"\u22C0",wedge:"\u2227",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\uD835\uDD1A",wfr:"\uD835\uDD34",Wopf:"\uD835\uDD4E",wopf:"\uD835\uDD68",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\uD835\uDCB2",wscr:"\uD835\uDCCC",xcap:"\u22C2",xcirc:"\u25EF",xcup:"\u22C3",xdtri:"\u25BD",Xfr:"\uD835\uDD1B",xfr:"\uD835\uDD35",xhArr:"\u27FA",xharr:"\u27F7",Xi:"\u039E",xi:"\u03BE",xlArr:"\u27F8",xlarr:"\u27F5",xmap:"\u27FC",xnis:"\u22FB",xodot:"\u2A00",Xopf:"\uD835\uDD4F",xopf:"\uD835\uDD69",xoplus:"\u2A01",xotime:"\u2A02",xrArr:"\u27F9",xrarr:"\u27F6",Xscr:"\uD835\uDCB3",xscr:"\uD835\uDCCD",xsqcup:"\u2A06",xuplus:"\u2A04",xutri:"\u25B3",xvee:"\u22C1",xwedge:"\u22C0",Yacute:"\xDD",yacute:"\xFD",YAcy:"\u042F",yacy:"\u044F",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042B",ycy:"\u044B",yen:"\xA5",Yfr:"\uD835\uDD1C",yfr:"\uD835\uDD36",YIcy:"\u0407",yicy:"\u0457",Yopf:"\uD835\uDD50",yopf:"\uD835\uDD6A",Yscr:"\uD835\uDCB4",yscr:"\uD835\uDCCE",YUcy:"\u042E",yucy:"\u044E",Yuml:"\u0178",yuml:"\xFF",Zacute:"\u0179",zacute:"\u017A",Zcaron:"\u017D",zcaron:"\u017E",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017B",zdot:"\u017C",zeetrf:"\u2128",ZeroWidthSpace:"\u200B",Zeta:"\u0396",zeta:"\u03B6",Zfr:"\u2128",zfr:"\uD835\uDD37",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21DD",Zopf:"\u2124",zopf:"\uD835\uDD6B",Zscr:"\uD835\uDCB5",zscr:"\uD835\uDCCF",zwj:"\u200D",zwnj:"\u200C"},hasOwn=Object.prototype.hasOwnProperty;function has(e,t){return!!e&&hasOwn.call(e,t)}function decodeEntity(e){return has(entities,e)?entities[e]:e}var hasOwn$1=Object.prototype.hasOwnProperty;function has$1(e,t){return!!e&&hasOwn$1.call(e,t)}// Extend objects
//
function assign(e/*from1, from2, from3, ...*/){var t=[].slice.call(arguments,1);return t.forEach(function(t){if(t){if("object"!=typeof t)throw new TypeError(t+"must be object");Object.keys(t).forEach(function(r){e[r]=t[r]})}}),e}////////////////////////////////////////////////////////////////////////////////
var UNESCAPE_MD_RE=/\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;function unescapeMd(e){return 0>e.indexOf("\\")?e:e.replace(UNESCAPE_MD_RE,"$1")}////////////////////////////////////////////////////////////////////////////////
function isValidEntityCode(e){/*eslint no-bitwise:0*/ // broken sequence
return!(55296<=e&&57343>=e)&&!(64976<=e&&65007>=e)&&65535!=(65535&e)&&65534!=(65535&e)&&!(0<=e&&8>=e)&&11!==e&&!(14<=e&&31>=e)&&!(127<=e&&159>=e)&&!(1114111<e);// never used
// control codes
// out of range
}function fromCodePoint(e){var t=String.fromCharCode;/*eslint no-bitwise:0*/if(65535<e){e-=65536;var r=55296+(e>>10),n=56320+(1023&e);return t(r,n)}return t(e)}var NAMED_ENTITY_RE=/&([a-z#][a-z0-9]{1,31});/gi,DIGITAL_ENTITY_TEST_RE=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;function replaceEntityPattern(e,t){var r=0,n=decodeEntity(t);if(t!==n)return n;return 35===t.charCodeAt(0)/* # */&&DIGITAL_ENTITY_TEST_RE.test(t)&&(r="x"===t[1].toLowerCase()?parseInt(t.slice(2),16):parseInt(t.slice(1),10),isValidEntityCode(r))?fromCodePoint(r):e}function replaceEntities(e){return 0>e.indexOf("&")?e:e.replace(NAMED_ENTITY_RE,replaceEntityPattern)}////////////////////////////////////////////////////////////////////////////////
var HTML_ESCAPE_TEST_RE=/[&<>"]/,HTML_ESCAPE_REPLACE_RE=/[&<>"]/g,HTML_REPLACEMENTS={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function replaceUnsafeChar(e){return HTML_REPLACEMENTS[e]}function escapeHtml(e){return HTML_ESCAPE_TEST_RE.test(e)?e.replace(HTML_ESCAPE_REPLACE_RE,replaceUnsafeChar):e}/**
 * Renderer rules cache
 */var rules={blockquote_open:function/* tokens, idx, options, env */(){return"<blockquote>\n"},blockquote_close:function(e,t/*, options, env */){return"</blockquote>"+getBreak(e,t)},code:function(e,t/*, options, env */){return e[t].block?"<pre><code>"+escapeHtml(e[t].content)+"</code></pre>"+getBreak(e,t):"<code>"+escapeHtml(e[t].content)+"</code>"},fence:function(e,t,r,n,a){var s,o,l,i=e[t],c="",p=r.langPrefix,d="";if(i.params){if(s=i.params.split(/\s+/g),o=s.join(" "),has$1(a.rules.fence_custom,s[0]))return a.rules.fence_custom[s[0]](e,t,r,n,a);d=escapeHtml(replaceEntities(unescapeMd(o))),c=" class=\""+p+d+"\""}return l=r.highlight?r.highlight.apply(r.highlight,[i.content].concat(s))||escapeHtml(i.content):escapeHtml(i.content),"<pre><code"+c+">"+l+"</code></pre>"+getBreak(e,t)},fence_custom:{},heading_open:function(e,t/*, options, env */){return"<h"+e[t].hLevel+">"},heading_close:function(e,t/*, options, env */){return"</h"+e[t].hLevel+">\n"},hr:function(e,t,r/*, env */){return(r.xhtmlOut?"<hr />":"<hr>")+getBreak(e,t)},bullet_list_open:function/* tokens, idx, options, env */(){return"<ul>\n"},bullet_list_close:function(e,t/*, options, env */){return"</ul>"+getBreak(e,t)},list_item_open:function/* tokens, idx, options, env */(){return"<li>"},list_item_close:function/* tokens, idx, options, env */(){return"</li>\n"},ordered_list_open:function(e,t/*, options, env */){var r=e[t],n=1<r.order?" start=\""+r.order+"\"":"";return"<ol"+n+">\n"},ordered_list_close:function(e,t/*, options, env */){return"</ol>"+getBreak(e,t)},paragraph_open:function(e,t/*, options, env */){return e[t].tight?"":"<p>"},paragraph_close:function(e,t/*, options, env */){var r=!(e[t].tight&&t&&"inline"===e[t-1].type&&!e[t-1].content);return(e[t].tight?"":"</p>")+(r?getBreak(e,t):"")},link_open:function(e,t,r/* env */){var n=e[t].title?" title=\""+escapeHtml(replaceEntities(e[t].title))+"\"":"",a=r.linkTarget?" target=\""+r.linkTarget+"\"":"";return"<a href=\""+escapeHtml(e[t].href)+"\""+n+a+">"},link_close:function/* tokens, idx, options, env */(){return"</a>"},image:function(e,t,r/*, env */){var n=" src=\""+escapeHtml(e[t].src)+"\"",a=e[t].title?" title=\""+escapeHtml(replaceEntities(e[t].title))+"\"":"",s=" alt=\""+(e[t].alt?escapeHtml(replaceEntities(unescapeMd(e[t].alt))):"")+"\"",o=r.xhtmlOut?" /":"";return"<img"+n+s+a+o+">"},table_open:function/* tokens, idx, options, env */(){return"<table>\n"},table_close:function/* tokens, idx, options, env */(){return"</table>\n"},thead_open:function/* tokens, idx, options, env */(){return"<thead>\n"},thead_close:function/* tokens, idx, options, env */(){return"</thead>\n"},tbody_open:function/* tokens, idx, options, env */(){return"<tbody>\n"},tbody_close:function/* tokens, idx, options, env */(){return"</tbody>\n"},tr_open:function/* tokens, idx, options, env */(){return"<tr>"},tr_close:function/* tokens, idx, options, env */(){return"</tr>\n"},th_open:function(e,t/*, options, env */){var r=e[t];return"<th"+(r.align?" style=\"text-align:"+r.align+"\"":"")+">"},th_close:function/* tokens, idx, options, env */(){return"</th>"},td_open:function(e,t/*, options, env */){var r=e[t];return"<td"+(r.align?" style=\"text-align:"+r.align+"\"":"")+">"},td_close:function/* tokens, idx, options, env */(){return"</td>"},strong_open:function/* tokens, idx, options, env */(){return"<strong>"},strong_close:function/* tokens, idx, options, env */(){return"</strong>"},em_open:function/* tokens, idx, options, env */(){return"<em>"},em_close:function/* tokens, idx, options, env */(){return"</em>"},del_open:function/* tokens, idx, options, env */(){return"<del>"},del_close:function/* tokens, idx, options, env */(){return"</del>"},ins_open:function/* tokens, idx, options, env */(){return"<ins>"},ins_close:function/* tokens, idx, options, env */(){return"</ins>"},mark_open:function/* tokens, idx, options, env */(){return"<mark>"},mark_close:function/* tokens, idx, options, env */(){return"</mark>"},sub:function(e,t/*, options, env */){return"<sub>"+escapeHtml(e[t].content)+"</sub>"},sup:function(e,t/*, options, env */){return"<sup>"+escapeHtml(e[t].content)+"</sup>"},hardbreak:function(e,t,r/*, env */){return r.xhtmlOut?"<br />\n":"<br>\n"},softbreak:function(e,t,r/*, env */){return r.breaks?r.xhtmlOut?"<br />\n":"<br>\n":"\n"},text:function(e,t/*, options, env */){return escapeHtml(e[t].content)},htmlblock:function(e,t/*, options, env */){return e[t].content},htmltag:function(e,t/*, options, env */){return e[t].content},abbr_open:function(e,t/*, options, env */){return"<abbr title=\""+escapeHtml(replaceEntities(e[t].title))+"\">"},abbr_close:function/* tokens, idx, options, env */(){return"</abbr>"},footnote_ref:function(e,t){var r=(+(e[t].id+1)).toString(),n="fnref"+r;return 0<e[t].subId&&(n+=":"+e[t].subId),"<sup class=\"footnote-ref\"><a href=\"#fn"+r+"\" id=\""+n+"\">["+r+"]</a></sup>"},footnote_block_open:function(e,t,r){var n=r.xhtmlOut?"<hr class=\"footnotes-sep\" />\n":"<hr class=\"footnotes-sep\">\n";return n+"<section class=\"footnotes\">\n<ol class=\"footnotes-list\">\n"},footnote_block_close:function(){return"</ol>\n</section>\n"},footnote_open:function(e,t){var r=(+(e[t].id+1)).toString();return"<li id=\"fn"+r+"\"  class=\"footnote-item\">"},footnote_close:function(){return"</li>\n"},footnote_anchor:function(e,t){var r=(+(e[t].id+1)).toString(),n="fnref"+r;return 0<e[t].subId&&(n+=":"+e[t].subId)," <a href=\"#"+n+"\" class=\"footnote-backref\">\u21A9</a>"},dl_open:function(){return"<dl>\n"},dt_open:function(){return"<dt>"},dd_open:function(){return"<dd>"},dl_close:function(){return"</dl>\n"},dt_close:function(){return"</dt>\n"},dd_close:function(){return"</dd>\n"}};/**
 * Blockquotes
 */ /**
 * Helper functions
 */function nextToken(e,t){return++t>=e.length-2?t:"paragraph_open"===e[t].type&&e[t].tight&&"inline"===e[t+1].type&&0===e[t+1].content.length&&"paragraph_close"===e[t+2].type&&e[t+2].tight?nextToken(e,t+2):t}/**
 * Check to see if `\n` is needed before the next token.
 *
 * @param  {Array} `tokens`
 * @param  {Number} `idx`
 * @return {String} Empty string or newline
 * @api private
 */var getBreak=rules.getBreak=function(e,t){return t=nextToken(e,t),t<e.length&&"list_item_close"===e[t].type?"":"\n"};/**
 * Renderer class. Renders HTML and exposes `rules` to allow
 * local modifications.
 */function Renderer(){// exported helper, for custom rules only
this.rules=assign({},rules),this.getBreak=rules.getBreak}/**
 * Render a string of inline HTML with the given `tokens` and
 * `options`.
 *
 * @param  {Array} `tokens`
 * @param  {Object} `options`
 * @param  {Object} `env`
 * @return {String}
 * @api public
 */Renderer.prototype.renderInline=function(e,t,r){for(var n=this.rules,a=e.length,s=0,o="";a--;)o+=n[e[s].type](e,s++,t,r,this);return o},Renderer.prototype.render=function(e,t,r){for(var n=this.rules,a=e.length,s=-1,o="";++s<a;)o+="inline"===e[s].type?this.renderInline(e[s].children,t,r):n[e[s].type](e,s,t,r,this);return o};/**
 * Ruler is a helper class for building responsibility chains from
 * parse rules. It allows:
 *
 *   - easy stack rules chains
 *   - getting main chain and named chains content (as arrays of functions)
 *
 * Helper methods, should not be used directly.
 * @api private
 */function Ruler(){// List of added rules. Each element is:
//
// { name: XXX,
//   enabled: Boolean,
//   fn: Function(),
//   alt: [ name2, name3 ] }
//
// Cached rule chains.
//
// First level - chain name, '' for default.
// Second level - digital anchor for fast filtering by charcodes.
//
this.__rules__=[],this.__cache__=null}/**
 * Find the index of a rule by `name`.
 *
 * @param  {String} `name`
 * @return {Number} Index of the given `name`
 * @api private
 */Ruler.prototype.__find__=function(e){for(var t=this.__rules__.length,r=-1;t--;)if(this.__rules__[++r].name===e)return r;return-1},Ruler.prototype.__compile__=function(){var e=this,t=[""];// collect unique names
e.__rules__.forEach(function(e){e.enabled&&e.alt.forEach(function(e){0>t.indexOf(e)&&t.push(e)})}),e.__cache__={},t.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(r){!r.enabled||t&&0>r.alt.indexOf(t)||e.__cache__[t].push(r.fn)})})},Ruler.prototype.at=function(e,t,r){var n=this.__find__(e);if(-1===n)throw new Error("Parser rule not found: "+e);this.__rules__[n].fn=t,this.__rules__[n].alt=(r||{}).alt||[],this.__cache__=null},Ruler.prototype.before=function(e,t,r,n){var a=this.__find__(e);if(-1===a)throw new Error("Parser rule not found: "+e);this.__rules__.splice(a,0,{name:t,enabled:!0,fn:r,alt:(n||{}).alt||[]}),this.__cache__=null},Ruler.prototype.after=function(e,t,r,n){var a=this.__find__(e);if(-1===a)throw new Error("Parser rule not found: "+e);this.__rules__.splice(a+1,0,{name:t,enabled:!0,fn:r,alt:(n||{}).alt||[]}),this.__cache__=null},Ruler.prototype.push=function(e,t,r){this.__rules__.push({name:e,enabled:!0,fn:t,alt:(r||{}).alt||[]}),this.__cache__=null},Ruler.prototype.enable=function(e,t){// Search by name and enable
e=Array.isArray(e)?e:[e],t&&this.__rules__.forEach(function(e){e.enabled=!1}),e.forEach(function(e){var t=this.__find__(e);if(0>t)throw new Error("Rules manager: invalid rule name "+e);this.__rules__[t].enabled=!0},this),this.__cache__=null},Ruler.prototype.disable=function(e){// Search by name and disable
e=Array.isArray(e)?e:[e],e.forEach(function(e){var t=this.__find__(e);if(0>t)throw new Error("Rules manager: invalid rule name "+e);this.__rules__[t].enabled=!1},this),this.__cache__=null},Ruler.prototype.getRules=function(e){return null===this.__cache__&&this.__compile__(),this.__cache__[e]||[]};function block(e){e.inlineMode?e.tokens.push({type:"inline",content:e.src.replace(/\n/g," ").trim(),level:0,lines:[0,1],children:[]}):e.block.parse(e.src,e.options,e.env,e.tokens)}// Inline parser state
function StateInline(e,t,r,n,a){// Stores { start: end } pairs. Useful for backtrack
// optimization of pairs parse (emphasis, strikes).
// Link parser state vars
// Set true when seek link label - we should disable
// "paired" rules (emphasis, strikes) to not skip
// tailing `]`
// Increment for each nesting link. Used to prevent
// nesting in definitions
// Temporary storage for link url
this.src=e,this.env=n,this.options=r,this.parser=t,this.tokens=a,this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache=[],this.isInLabel=!1,this.linkLevel=0,this.linkContent="",this.labelUnmatchedScopes=0}// Flush pending text
//
StateInline.prototype.pushPending=function(){this.tokens.push({type:"text",content:this.pending,level:this.pendingLevel}),this.pending=""},StateInline.prototype.push=function(e){this.pending&&this.pushPending(),this.tokens.push(e),this.pendingLevel=this.level},StateInline.prototype.cacheSet=function(e,t){for(var r=this.cache.length;r<=e;r++)this.cache.push(0);this.cache[e]=t},StateInline.prototype.cacheGet=function(e){return e<this.cache.length?this.cache[e]:0};/**
 * Parse link labels
 *
 * This function assumes that first character (`[`) already matches;
 * returns the end of the label.
 *
 * @param  {Object} state
 * @param  {Number} start
 * @api private
 */function parseLinkLabel(e,t){var r,n,a,s=-1,o=e.posMax,l=e.pos,i=e.isInLabel;if(e.isInLabel)return-1;if(e.labelUnmatchedScopes)return e.labelUnmatchedScopes--,-1;for(e.pos=t+1,e.isInLabel=!0,r=1;e.pos<o;){if(a=e.src.charCodeAt(e.pos),91===a/* [ */)r++;else if(93===a&&(r--,0===r)/* ] */){n=!0;break}e.parser.skipToken(e)}return n?(s=e.pos,e.labelUnmatchedScopes=0):e.labelUnmatchedScopes=r-1,e.pos=l,e.isInLabel=i,s}// Parse abbreviation definitions, i.e. `*[abbr]: description`
function parseAbbr(e,t,r,n){var a,s,o,l,i,c;if(42!==e.charCodeAt(0)/* * */)return-1;if(91!==e.charCodeAt(1)/* [ */)return-1;if(-1===e.indexOf("]:"))return-1;if(a=new StateInline(e,t,r,n,[]),s=parseLinkLabel(a,1),0>s||58!==e.charCodeAt(s+1)/* : */)return-1;// abbr title is always one line, so looking for ending "\n" here
for(l=a.posMax,o=s+2;o<l&&10!==a.src.charCodeAt(o);o++);return(i=e.slice(2,s),c=e.slice(s+2,o).trim(),0===c.length)?-1:(n.abbreviations||(n.abbreviations={}),"undefined"==typeof n.abbreviations[":"+i]&&(n.abbreviations[":"+i]=c),o)}function abbr(e){var t,r,n,a,s=e.tokens;if(!e.inlineMode)// Parse inlines
for(t=1,r=s.length-1;t<r;t++)if("paragraph_open"===s[t-1].type&&"inline"===s[t].type&&"paragraph_close"===s[t+1].type){for(n=s[t].content;n.length&&(a=parseAbbr(n,e.inline,e.options,e.env),!(0>a));)n=n.slice(a).trim();s[t].content=n,n.length||(s[t-1].tight=!0,s[t+1].tight=!0)}}function normalizeLink(e){var t=replaceEntities(e);// We shouldn't care about the result of malformed URIs,
// and should not throw an exception.
try{t=decodeURI(t)}catch(e){}return encodeURI(t)}/**
 * Parse link destination
 *
 *   - on success it returns a string and updates state.pos;
 *   - on failure it returns null
 *
 * @param  {Object} state
 * @param  {Number} pos
 * @api private
 */function parseLinkDestination(e,t){var r,n,a,s=t,o=e.posMax;if(60===e.src.charCodeAt(t)/* < */){for(t++;t<o;){if(r=e.src.charCodeAt(t),10===r/* \n */)return!1;if(62===r/* > */)return(a=normalizeLink(unescapeMd(e.src.slice(s+1,t))),!!e.parser.validateLink(a))&&(e.pos=t+1,e.linkContent=a,!0);if(92===r/* \ */&&t+1<o){t+=2;continue}t++}// no closing '>'
return!1}// this should be ... } else { ... branch
for(n=0;t<o&&(r=e.src.charCodeAt(t),32!==r)&&!(32>r||127===r);){if(92===r/* \ */&&t+1<o){t+=2;continue}if(40===r&&(n++,1<n)/* ( */)break;if(41===r&&(n--,0>n)/* ) */)break;t++}return s!==t&&(a=unescapeMd(e.src.slice(s,t)),!!e.parser.validateLink(a))&&(e.linkContent=a,e.pos=t,!0)}/**
 * Parse link title
 *
 *   - on success it returns a string and updates state.pos;
 *   - on failure it returns null
 *
 * @param  {Object} state
 * @param  {Number} pos
 * @api private
 */function parseLinkTitle(e,t){var r,n=t,a=e.posMax,s=e.src.charCodeAt(t);if(34!==s/* " */&&39!==s/* ' */&&40!==s/* ( */)return!1;for(t++,40===s&&(s=41);t<a;){if(r=e.src.charCodeAt(t),r===s)return e.pos=t+1,e.linkContent=unescapeMd(e.src.slice(n+1,t)),!0;if(92===r/* \ */&&t+1<a){t+=2;continue}t++}return!1}function normalizeReference(e){// use .toUpperCase() instead of .toLowerCase()
// here to avoid a conflict with Object.prototype
// members (most notably, `__proto__`)
return e.trim().replace(/\s+/g," ").toUpperCase()}function parseReference(e,t,r,n){var a,s,o,l,i,c,p,d,u;if(91!==e.charCodeAt(0)/* [ */)return-1;if(-1===e.indexOf("]:"))return-1;if(a=new StateInline(e,t,r,n,[]),s=parseLinkLabel(a,0),0>s||58!==e.charCodeAt(s+1)/* : */)return-1;// [label]:   destination   'title'
//         ^^^ skip optional whitespace here
for(l=a.posMax,o=s+2;o<l&&(i=a.src.charCodeAt(o),32===i||10===i);o++);// [label]:   destination   'title'
//            ^^^^^^^^^^^ parse this
if(!parseLinkDestination(a,o))return-1;for(p=a.linkContent,o=a.pos,c=o,++o;o<l&&(i=a.src.charCodeAt(o),32===i||10===i);o++);// [label]:   destination   'title'
//                          ^^^^^^^ parse this
// ensure that the end of the line is empty
for(o<l&&c!==o&&parseLinkTitle(a,o)?(d=a.linkContent,o=a.pos):(d="",o=c);o<l&&32===a.src.charCodeAt(o)/* space */;)o++;return o<l&&10!==a.src.charCodeAt(o)?-1:(u=normalizeReference(e.slice(1,s)),"undefined"==typeof n.references[u]&&(n.references[u]={title:d,href:p}),o)}function references(e){var t,r,n,a,s=e.tokens;if(e.env.references=e.env.references||{},!e.inlineMode)// Scan definitions in paragraph inlines
for(t=1,r=s.length-1;t<r;t++)if("inline"===s[t].type&&"paragraph_open"===s[t-1].type&&"paragraph_close"===s[t+1].type){for(n=s[t].content;n.length&&(a=parseReference(n,e.inline,e.options,e.env),!(0>a));)n=n.slice(a).trim();s[t].content=n,n.length||(s[t-1].tight=!0,s[t+1].tight=!0)}}function inline(e){var t,r,n,a=e.tokens;// Parse inlines
for(r=0,n=a.length;r<n;r++)t=a[r],"inline"===t.type&&e.inline.parse(t.content,e.options,e.env,t.children)}function footnote_block(e){var r,n,a,s,o,c,p,d,u,h=0,g=!1,m={};if(e.env.footnotes&&(e.tokens=e.tokens.filter(function(e){return"footnote_reference_open"===e.type?(g=!0,d=[],u=e.label,!1):"footnote_reference_close"===e.type?(g=!1,m[":"+u]=d,!1):(g&&d.push(e),!g)}),!!e.env.footnotes.list)){for(c=e.env.footnotes.list,e.tokens.push({type:"footnote_block_open",level:h++}),(r=0,n=c.length);r<n;r++){for(e.tokens.push({type:"footnote_open",id:r,level:h++}),c[r].tokens?(p=[],p.push({type:"paragraph_open",tight:!1,level:h++}),p.push({type:"inline",content:"",level:h,children:c[r].tokens}),p.push({type:"paragraph_close",tight:!1,level:--h})):c[r].label&&(p=m[":"+c[r].label]),e.tokens=e.tokens.concat(p),o="paragraph_close"===e.tokens[e.tokens.length-1].type?e.tokens.pop():null,s=0<c[r].count?c[r].count:1,a=0;a<s;a++)e.tokens.push({type:"footnote_anchor",id:r,subId:a,level:h});o&&e.tokens.push(o),e.tokens.push({type:"footnote_close",level:--h})}e.tokens.push({type:"footnote_block_close",level:--h})}}// Enclose abbreviations in <abbr> tags
//
var PUNCT_CHARS=" \n()[]'\".,!?-";// from Google closure library
// http://closure-library.googlecode.com/git-history/docs/local_closure_goog_string_string.js.source.html#line1021
function regEscape(e){return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1")}function abbr2(e){var t,r,n,a,s,o,c,p,d,u,h,g,f=e.tokens;if(e.env.abbreviations)for(e.env.abbrRegExp||(g="(^|["+PUNCT_CHARS.split("").map(regEscape).join("")+"])("+Object.keys(e.env.abbreviations).map(function(e){return e.substr(1)}).sort(function(e,t){return t.length-e.length}).map(regEscape).join("|")+")($|["+PUNCT_CHARS.split("").map(regEscape).join("")+"])",e.env.abbrRegExp=new RegExp(g,"g")),u=e.env.abbrRegExp,(r=0,n=f.length);r<n;r++)if("inline"===f[r].type)// We scan from the end, to keep position when new tags added.
for(a=f[r].children,t=a.length-1;0<=t;t--)if(s=a[t],"text"===s.type){for(p=0,o=s.content,u.lastIndex=0,d=s.level,c=[];h=u.exec(o);)u.lastIndex>p&&c.push({type:"text",content:o.slice(p,h.index+h[1].length),level:d}),c.push({type:"abbr_open",title:e.env.abbreviations[":"+h[2]],level:d++}),c.push({type:"text",content:h[2],level:d}),c.push({type:"abbr_close",level:--d}),p=u.lastIndex-h[3].length;c.length&&(p<o.length&&c.push({type:"text",content:o.slice(p),level:d}),f[r].children=a=[].concat(a.slice(0,t),c,a.slice(t+1)))}}// Simple typographical replacements
//
// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4
var RARE_RE=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,SCOPED_ABBR_RE=/\((c|tm|r|p)\)/ig,SCOPED_ABBR={c:"\xA9",r:"\xAE",p:"\xA7",tm:"\u2122"};function replaceScopedAbbr(e){return 0>e.indexOf("(")?e:e.replace(SCOPED_ABBR_RE,function(e,t){return SCOPED_ABBR[t.toLowerCase()]})}function replace(e){var t,r,n,a,s;if(e.options.typographer)for(s=e.tokens.length-1;0<=s;s--)if("inline"===e.tokens[s].type)for(a=e.tokens[s].children,t=a.length-1;0<=t;t--)r=a[t],"text"===r.type&&(n=r.content,n=replaceScopedAbbr(n),RARE_RE.test(n)&&(n=n.replace(/\+-/g,"\xB1")// .., ..., ....... -> …
// but ?..... & !..... -> ?.. & !..
.replace(/\.{2,}/g,"\u2026").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",")// em-dash
.replace(/(^|[^-])---([^-]|$)/mg,"$1\u2014$2")// en-dash
.replace(/(^|\s)--(\s|$)/mg,"$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/mg,"$1\u2013$2")),r.content=n)}// Convert straight quotation marks to typographic ones
//
var QUOTE_TEST_RE=/['"]/,QUOTE_RE=/['"]/g,PUNCT_RE=/[-\s()\[\]]/,APOSTROPHE="\u2019";// This function returns true if the character at `pos`
// could be inside a word.
function isLetter(e,t){return!(0>t||t>=e.length)&&!PUNCT_RE.test(e[t])}function replaceAt(e,t,r){return e.substr(0,t)+r+e.substr(t+1)}function smartquotes(e){/*eslint max-depth:0*/var r,n,a,s,o,l,c,p,d,u,h,g,m,f,b,v,k;if(e.options.typographer)for(k=[],b=e.tokens.length-1;0<=b;b--)if("inline"===e.tokens[b].type)for(v=e.tokens[b].children,k.length=0,r=0;r<v.length;r++)if(n=v[r],!("text"!==n.type||QUOTE_TEST_RE.test(n.text))){for(c=v[r].level,m=k.length-1;0<=m&&!(k[m].level<=c);m--);k.length=m+1,a=n.content,o=0,l=a.length;/*eslint no-labels:0,block-scoped-var:0*/OUTER:for(;o<l&&(QUOTE_RE.lastIndex=o,s=QUOTE_RE.exec(a),!!s);){if(p=!isLetter(a,s.index-1),o=s.index+1,f="'"===s[0],d=!isLetter(a,o),!d&&!p){f&&(n.content=replaceAt(n.content,s.index,APOSTROPHE));continue}if(h=!d,g=!p,g)// this could be a closing quote, rewind the stack to get a match
for(m=k.length-1;0<=m&&(u=k[m],!(k[m].level<c));m--)if(u.single===f&&k[m].level===c){u=k[m],f?(v[u.token].content=replaceAt(v[u.token].content,u.pos,e.options.quotes[2]),n.content=replaceAt(n.content,s.index,e.options.quotes[3])):(v[u.token].content=replaceAt(v[u.token].content,u.pos,e.options.quotes[0]),n.content=replaceAt(n.content,s.index,e.options.quotes[1])),k.length=m;continue OUTER}h?k.push({token:r,pos:s.index,single:f,level:c}):g&&f&&(n.content=replaceAt(n.content,s.index,APOSTROPHE))}}}/**
 * Core parser `rules`
 */var _rules=[["block",block],["abbr",abbr],["references",references],["inline",inline],["footnote_tail",footnote_block],["abbr2",abbr2],["replacements",replace],["smartquotes",smartquotes]];/**
 * Class for top level (`core`) parser rules
 *
 * @api private
 */function Core(){this.options={},this.ruler=new Ruler;for(var e=0;e<_rules.length;e++)this.ruler.push(_rules[e][0],_rules[e][1])}/**
 * Process rules with the given `state`
 *
 * @param  {Object} `state`
 * @api private
 */Core.prototype.process=function(e){var t,r,n;for(n=this.ruler.getRules(""),t=0,r=n.length;t<r;t++)n[t](e)};// Parser state class
function StateBlock(e,t,r,n,a){var o,l,i,c,p,d,u;for(this.src=e,this.parser=t,this.options=r,this.env=n,this.tokens=a,this.bMarks=[],this.eMarks=[],this.tShift=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.parentType="root",this.ddIndent=-1,this.level=0,this.result="",l=this.src,d=0,u=!1,(i=c=d=0,p=l.length);c<p;c++){if(o=l.charCodeAt(c),!u)if(32===o/* space */){d++;continue}else u=!0;(10===o||c===p-1)&&(10!==o&&c++,this.bMarks.push(i),this.eMarks.push(c),this.tShift.push(d),u=!1,d=0,i=c+1)}// Push fake entry to simplify cache bounds checks
this.bMarks.push(l.length),this.eMarks.push(l.length),this.tShift.push(0),this.lineMax=this.bMarks.length-1}StateBlock.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},StateBlock.prototype.skipEmptyLines=function(e){for(var t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},StateBlock.prototype.skipSpaces=function(e){for(var t=this.src.length;e<t&&!(32!==this.src.charCodeAt(e)/* space */);e++);return e},StateBlock.prototype.skipChars=function(e,t){for(var r=this.src.length;e<r&&!(this.src.charCodeAt(e)!==t);e++);return e},StateBlock.prototype.skipCharsBack=function(e,t,r){if(e<=r)return e;for(;e>r;)if(t!==this.src.charCodeAt(--e))return e+1;return e},StateBlock.prototype.getLines=function(e,t,r,n){var s,o,l,c,p,a=Math.min,d=e;if(e>=t)return"";// Opt: don't use push queue for single line;
if(d+1===t)return o=this.bMarks[d]+a(this.tShift[d],r),l=n?this.eMarks[d]+1:this.eMarks[d],this.src.slice(o,l);for(c=Array(t-e),s=0;d<t;d++,s++)p=this.tShift[d],p>r&&(p=r),0>p&&(p=0),o=this.bMarks[d]+p,l=d+1<t||n?this.eMarks[d]+1:this.eMarks[d],c[s]=this.src.slice(o,l);return c.join("")};// Code block (4 spaces padded)
function code(e,t,r/*, silent*/){var n,a;if(4>e.tShift[t]-e.blkIndent)return!1;for(a=n=t+1;n<r;){if(e.isEmpty(n)){n++;continue}if(4<=e.tShift[n]-e.blkIndent){n++,a=n;continue}break}return e.line=n,e.tokens.push({type:"code",content:e.getLines(t,a,4+e.blkIndent,!0),block:!0,lines:[t,e.line],level:e.level}),!0}// fences (``` lang, ~~~ lang)
function fences(e,t,r,n){var a,s,o,l,i,c=!1,p=e.bMarks[t]+e.tShift[t],d=e.eMarks[t];if(p+3>d)return!1;if(a=e.src.charCodeAt(p),126!==a/* ~ */&&96!==a/* ` */)return!1;// scan marker length
if(i=p,p=e.skipChars(p,a),s=p-i,3>s)return!1;if(o=e.src.slice(p,d).trim(),0<=o.indexOf("`"))return!1;// Since start is found, we can report success here in validation mode
if(n)return!0;// search end of block
for(l=t;;){if(l++,l>=r)// unclosed block should be autoclosed by end of document.
// also block seems to be autoclosed by end of parent
break;if(p=i=e.bMarks[l]+e.tShift[l],d=e.eMarks[l],p<d&&e.tShift[l]<e.blkIndent)// non-empty line with negative indent should stop the list:
// - ```
//  test
break;if(e.src.charCodeAt(p)===a&&!(4<=e.tShift[l]-e.blkIndent)&&(p=e.skipChars(p,a),!(p-i<s))&&(p=e.skipSpaces(p),!(p<d)))// closing code fence must be at least as long as the opening one
// closing fence should be indented less than 4 spaces
{c=!0;// found!
break}// make sure tail has spaces only
}// If a fence has heading spaces, they should be removed from its inner block
return s=e.tShift[t],e.line=l+(c?1:0),e.tokens.push({type:"fence",params:o,content:e.getLines(t+1,l,s,!0),lines:[t,e.line],level:e.level}),!0}// Block quotes
function blockquote(e,t,r,n){var a,s,o,c,p,d,u,h,g,m,f,b=e.bMarks[t]+e.tShift[t],v=e.eMarks[t];if(b>v)return!1;// check the block quote marker
if(62!==e.src.charCodeAt(b++)/* > */)return!1;if(e.level>=e.options.maxNesting)return!1;// we know that it's going to be a valid blockquote,
// so no point trying to find the end of it in silent mode
if(n)return!0;// skip one optional space after '>'
// Search the end of the block
//
// Block ends with either:
//  1. an empty line outside:
//     ```
//     > test
//
//     ```
//  2. an empty line inside:
//     ```
//     >
//     test
//     ```
//  3. another tag
//     ```
//     > test
//      - - -
//     ```
for(32===e.src.charCodeAt(b)&&b++,p=e.blkIndent,e.blkIndent=0,c=[e.bMarks[t]],e.bMarks[t]=b,b=b<v?e.skipSpaces(b):b,s=b>=v,o=[e.tShift[t]],e.tShift[t]=b-e.bMarks[t],h=e.parser.ruler.getRules("blockquote"),a=t+1;a<r&&(b=e.bMarks[a]+e.tShift[a],v=e.eMarks[a],!(b>=v));a++){if(62===e.src.charCodeAt(b++)/* > */){32===e.src.charCodeAt(b)&&b++,c.push(e.bMarks[a]),e.bMarks[a]=b,b=b<v?e.skipSpaces(b):b,s=b>=v,o.push(e.tShift[a]),e.tShift[a]=b-e.bMarks[a];continue}// Case 2: line is not inside the blockquote, and the last line was empty.
if(s)break;// Case 3: another tag found.
for(f=!1,g=0,m=h.length;g<m;g++)if(h[g](e,a,r,!0)){f=!0;break}if(f)break;c.push(e.bMarks[a]),o.push(e.tShift[a]),e.tShift[a]=-1337}// Restore original tShift; this might not be necessary since the parser
// has already been here, but just to make sure we can do that.
for(d=e.parentType,e.parentType="blockquote",e.tokens.push({type:"blockquote_open",lines:u=[t,0],level:e.level++}),e.parser.tokenize(e,t,a),e.tokens.push({type:"blockquote_close",level:--e.level}),e.parentType=d,u[1]=e.line,g=0;g<o.length;g++)e.bMarks[g+t]=c[g],e.tShift[g+t]=o[g];return e.blkIndent=p,!0}// Horizontal rule
function hr(e,t,r,n){var a,s,o,l=e.bMarks[t],i=e.eMarks[t];if(l+=e.tShift[t],l>i)return!1;// Check hr marker
if(a=e.src.charCodeAt(l++),42!==a/* * */&&45!==a/* - */&&95!==a/* _ */)return!1;// markers can be mixed with spaces, but there should be at least 3 one
for(s=1;l<i;){if(o=e.src.charCodeAt(l++),o!==a&&32!==o/* space */)return!1;o===a&&s++}return!(3>s)&&(!!n||(e.line=t+1,e.tokens.push({type:"hr",lines:[t,e.line],level:e.level}),!0))}// Lists
// Search `[-+*][\n ]`, returns next pos arter marker on success
// or -1 on fail.
function skipBulletListMarker(e,t){var r,n,a;return(n=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],n>=a)?-1:(r=e.src.charCodeAt(n++),42!==r/* * */&&45!==r/* - */&&43!==r/* + */?-1:n<a&&32!==e.src.charCodeAt(n)?-1:n)}// Search `\d+[.)][\n ]`, returns next pos arter marker on success
// or -1 on fail.
function skipOrderedListMarker(e,t){var r,n=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(n+1>=a)return-1;if(r=e.src.charCodeAt(n++),48>r/* 0 */||57<r/* 9 */)return-1;for(;;){// EOL -> fail
if(n>=a)return-1;if(r=e.src.charCodeAt(n++),!(48<=r/* 0 */&&57>=r/* 9 */)){// found valid marker
if(41===r/* ) */||46===r/* . */)break;return-1}}return n<a&&32!==e.src.charCodeAt(n)/* space */?-1:n}function markTightParagraphs(e,t){var r,n,a=e.level+2;for(r=t+2,n=e.tokens.length-2;r<n;r++)e.tokens[r].level===a&&"paragraph_open"===e.tokens[r].type&&(e.tokens[r+2].tight=!0,e.tokens[r].tight=!0,r+=2)}function list$1(e,t,r,n){var a,s,o,c,p,d,u,h,g,m,f,b,v,k,y,x,_,w,L,A,q,C,S=!0;// Detect list type and position after marker
if(0<=(h=skipOrderedListMarker(e,t)))v=!0;else if(0<=(h=skipBulletListMarker(e,t)))v=!1;else return!1;if(e.level>=e.options.maxNesting)return!1;// We should terminate list on style change. Remember first one to compare.
// For validation mode we can terminate immediately
if(b=e.src.charCodeAt(h-1),n)return!0;// Start list
for(y=e.tokens.length,v?(u=e.bMarks[t]+e.tShift[t],f=+e.src.substr(u,h-u-1),e.tokens.push({type:"ordered_list_open",order:f,lines:_=[t,0],level:e.level++})):e.tokens.push({type:"bullet_list_open",lines:_=[t,0],level:e.level++}),a=t,x=!1,L=e.parser.ruler.getRules("list");a<r&&(k=e.skipSpaces(h),g=e.eMarks[a],m=k>=g?1:k-h,4<m&&(m=1),1>m&&(m=1),s=h-e.bMarks[a]+m,e.tokens.push({type:"list_item_open",lines:w=[t,0],level:e.level++}),c=e.blkIndent,p=e.tight,o=e.tShift[t],d=e.parentType,e.tShift[t]=k-e.bMarks[t],e.blkIndent=s,e.tight=!0,e.parentType="list",e.parser.tokenize(e,t,r,!0),(!e.tight||x)&&(S=!1),x=1<e.line-t&&e.isEmpty(e.line-1),e.blkIndent=c,e.tShift[t]=o,e.tight=p,e.parentType=d,e.tokens.push({type:"list_item_close",level:--e.level}),a=t=e.line,w[1]=a,k=e.bMarks[t],!(a>=r))&&!e.isEmpty(a)&&!(e.tShift[a]<e.blkIndent);){for(C=!1,A=0,q=L.length;A<q;A++)if(L[A](e,a,r,!0)){C=!0;break}if(C)break;// fail if list has another type
if(v){if(h=skipOrderedListMarker(e,a),0>h)break;}else if(h=skipBulletListMarker(e,a),0>h)break;if(b!==e.src.charCodeAt(h-1))break}// Finilize list
return e.tokens.push({type:v?"ordered_list_close":"bullet_list_close",level:--e.level}),_[1]=a,e.line=a,S&&markTightParagraphs(e,y),!0}// Process footnote reference list
function footnote(e,t,r,n){var a,s,o,l,i,c=e.bMarks[t]+e.tShift[t],p=e.eMarks[t];// line should be at least 5 chars - "[^x]:"
if(c+4>p)return!1;if(91!==e.src.charCodeAt(c)/* [ */)return!1;if(94!==e.src.charCodeAt(c+1)/* ^ */)return!1;if(e.level>=e.options.maxNesting)return!1;for(l=c+2;l<p;l++){if(32===e.src.charCodeAt(l))return!1;if(93===e.src.charCodeAt(l)/* ] */)break}return l!==c+2&&!(l+1>=p||58!==e.src.charCodeAt(++l)/* : */)&&(!!n||(l++,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={}),i=e.src.slice(c+2,l-2),e.env.footnotes.refs[":"+i]=-1,e.tokens.push({type:"footnote_reference_open",label:i,level:e.level++}),a=e.bMarks[t],s=e.tShift[t],o=e.parentType,e.tShift[t]=e.skipSpaces(l)-l,e.bMarks[t]=l,e.blkIndent+=4,e.parentType="footnote",e.tShift[t]<e.blkIndent&&(e.tShift[t]+=e.blkIndent,e.bMarks[t]-=e.blkIndent),e.parser.tokenize(e,t,r,!0),e.parentType=o,e.blkIndent-=4,e.tShift[t]=s,e.bMarks[t]=a,e.tokens.push({type:"footnote_reference_close",level:--e.level}),!0));// no empty footnote labels
}// heading (#, ##, ...)
function heading(e,t,r,n){var a,s,o,l=e.bMarks[t]+e.tShift[t],i=e.eMarks[t];if(l>=i)return!1;if(a=e.src.charCodeAt(l),35!==a/* # */||l>=i)return!1;// count heading level
for(s=1,a=e.src.charCodeAt(++l);35===a/* # */&&l<i&&6>=s;)s++,a=e.src.charCodeAt(++l);return!(6<s||l<i&&32!==a/* space */)&&(!!n||(i=e.skipCharsBack(i,32,l),o=e.skipCharsBack(i,35,l),o>l&&32===e.src.charCodeAt(o-1)/* space */&&(i=o),e.line=t+1,e.tokens.push({type:"heading_open",hLevel:s,lines:[t,e.line],level:e.level}),l<i&&e.tokens.push({type:"inline",content:e.src.slice(l,i).trim(),level:e.level+1,lines:[t,e.line],children:[]}),e.tokens.push({type:"heading_close",hLevel:s,level:e.level}),!0));// Let's cut tails like '    ###  ' from the end of string
}// lheading (---, ===)
function lheading(e,t,r/*, silent*/){var n,a,s,o=t+1;return!(o>=r)&&!(e.tShift[o]<e.blkIndent)&&!(3<e.tShift[o]-e.blkIndent)&&(a=e.bMarks[o]+e.tShift[o],s=e.eMarks[o],!(a>=s))&&(n=e.src.charCodeAt(a),45===n/* - */||61===n/* = */)&&(a=e.skipChars(a,n),a=e.skipSpaces(a),!(a<s))&&(a=e.bMarks[t]+e.tShift[t],e.line=o+1,e.tokens.push({type:"heading_open",hLevel:61===n/* = */?1:2,lines:[t,e.line],level:e.level}),e.tokens.push({type:"inline",content:e.src.slice(a,e.eMarks[t]).trim(),level:e.level+1,lines:[t,e.line-1],children:[]}),e.tokens.push({type:"heading_close",hLevel:61===n/* = */?1:2,level:e.level}),!0);// Scan next line
}// List of valid html blocks names, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#html-blocks
var html_blocks={};["article","aside","button","blockquote","body","canvas","caption","col","colgroup","dd","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","iframe","li","map","object","ol","output","p","pre","progress","script","section","style","table","tbody","td","textarea","tfoot","th","tr","thead","ul","video"].forEach(function(e){html_blocks[e]=!0});// HTML block
var HTML_TAG_OPEN_RE=/^<([a-zA-Z]{1,15})[\s\/>]/,HTML_TAG_CLOSE_RE=/^<\/([a-zA-Z]{1,15})[\s>]/;function isLetter$1(e){/*eslint no-bitwise:0*/var t=32|e;// to lower case
return 97<=t/* a */&&122>=t/* z */}function htmlblock(e,t,r,n){var a,s,o,l=e.bMarks[t],i=e.eMarks[t],c=e.tShift[t];if(l+=c,!e.options.html)return!1;if(3<c||l+2>=i)return!1;if(60!==e.src.charCodeAt(l)/* < */)return!1;if(a=e.src.charCodeAt(l+1),33===a/* ! */||63===a/* ? */){// Directive start / comment start / processing instruction start
if(n)return!0;}else if(47===a/* / */||isLetter$1(a)){// Probably start or end of tag
if(47===a/* \ */){if(s=e.src.slice(l,i).match(HTML_TAG_CLOSE_RE),!s)return!1;}else if(s=e.src.slice(l,i).match(HTML_TAG_OPEN_RE),!s)return!1;// Make sure tag name is valid
if(!0!==html_blocks[s[1].toLowerCase()])return!1;if(n)return!0}else return!1;// If we are here - we detected HTML block.
// Let's roll down till empty line (block end).
for(o=t+1;o<e.lineMax&&!e.isEmpty(o);)o++;return e.line=o,e.tokens.push({type:"htmlblock",level:e.level,lines:[t,e.line],content:e.getLines(t,o,0,!0)}),!0}// GFM table, non-standard
function getLine(e,t){var r=e.bMarks[t]+e.blkIndent,n=e.eMarks[t];return e.src.substr(r,n-r)}function table(e,r,n,a){var s,o,l,c,p,d,u,h,g,m,f;// should have at least three lines
if(r+2>n)return!1;if(p=r+1,e.tShift[p]<e.blkIndent)return!1;// first character of the second line should be '|' or '-'
if(l=e.bMarks[p]+e.tShift[p],l>=e.eMarks[p])return!1;if(s=e.src.charCodeAt(l),124!==s/* | */&&45!==s/* - */&&58!==s/* : */)return!1;if(o=getLine(e,r+1),!/^[-:| ]+$/.test(o))return!1;if(d=o.split("|"),2>=d)return!1;for(h=[],c=0;c<d.length;c++){if(g=d[c].trim(),!g)// allow empty columns before and after table, but not in between columns;
// e.g. allow ` |---| `, disallow ` ---||--- `
if(0===c||c===d.length-1)continue;else return!1;if(!/^:?-+:?$/.test(g))return!1;58===g.charCodeAt(g.length-1)/* : */?h.push(58===g.charCodeAt(0)/* : */?"center":"right"):58===g.charCodeAt(0)/* : */?h.push("left"):h.push("")}if(o=getLine(e,r).trim(),-1===o.indexOf("|"))return!1;if(d=o.replace(/^\||\|$/g,"").split("|"),h.length!==d.length)return!1;if(a)return!0;for(e.tokens.push({type:"table_open",lines:m=[r,0],level:e.level++}),e.tokens.push({type:"thead_open",lines:[r,r+1],level:e.level++}),e.tokens.push({type:"tr_open",lines:[r,r+1],level:e.level++}),c=0;c<d.length;c++)e.tokens.push({type:"th_open",align:h[c],lines:[r,r+1],level:e.level++}),e.tokens.push({type:"inline",content:d[c].trim(),lines:[r,r+1],level:e.level,children:[]}),e.tokens.push({type:"th_close",level:--e.level});for(e.tokens.push({type:"tr_close",level:--e.level}),e.tokens.push({type:"thead_close",level:--e.level}),e.tokens.push({type:"tbody_open",lines:f=[r+2,0],level:e.level++}),p=r+2;p<n&&!(e.tShift[p]<e.blkIndent)&&(o=getLine(e,p).trim(),-1!==o.indexOf("|"));p++){for(d=o.replace(/^\||\|$/g,"").split("|"),e.tokens.push({type:"tr_open",level:e.level++}),c=0;c<d.length;c++)// 0x7c === '|'
e.tokens.push({type:"td_open",align:h[c],level:e.level++}),u=d[c].substring(124===d[c].charCodeAt(0)?1:0,124===d[c].charCodeAt(d[c].length-1)?d[c].length-1:d[c].length).trim(),e.tokens.push({type:"inline",content:u,level:e.level,children:[]}),e.tokens.push({type:"td_close",level:--e.level});e.tokens.push({type:"tr_close",level:--e.level})}return e.tokens.push({type:"tbody_close",level:--e.level}),e.tokens.push({type:"table_close",level:--e.level}),m[1]=f[1]=p,e.line=p,!0}// Definition lists
// Search `[:~][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipMarker(e,t){var r,n,a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t];return a>=s?-1:(n=e.src.charCodeAt(a++),126!==n/* ~ */&&58!==n/* : */)?-1:(r=e.skipSpaces(a),a===r?-1:r>=s?-1:r);// Check bullet
// no empty definitions, e.g. "  : "
}function markTightParagraphs$1(e,t){var r,n,a=e.level+2;for(r=t+2,n=e.tokens.length-2;r<n;r++)e.tokens[r].level===a&&"paragraph_open"===e.tokens[r].type&&(e.tokens[r+2].tight=!0,e.tokens[r].tight=!0,r+=2)}function deflist(e,t,r,n){var a,s,o,l,i,c,p,d,u,h,g,m,f,b;if(n)// quirk: validation mode validates a dd block only, not a whole deflist
return!(0>e.ddIndent)&&0<=skipMarker(e,t);if(p=t+1,e.isEmpty(p)&&++p>r)return!1;if(e.tShift[p]<e.blkIndent)return!1;if(a=skipMarker(e,p),0>a)return!1;if(e.level>=e.options.maxNesting)return!1;// Start list
c=e.tokens.length,e.tokens.push({type:"dl_open",lines:i=[t,0],level:e.level++}),o=t,s=p;// One definition list can contain multiple DTs,
// and one DT can be followed by multiple DDs.
//
// Thus, there is two loops here, and label is
// needed to break out of the second one
//
/*eslint no-labels:0,block-scoped-var:0*/OUTER:for(;;){for(b=!0,f=!1,e.tokens.push({type:"dt_open",lines:[o,o],level:e.level++}),e.tokens.push({type:"inline",content:e.getLines(o,o+1,e.blkIndent,!1).trim(),level:e.level+1,lines:[o,o],children:[]}),e.tokens.push({type:"dt_close",level:--e.level});;){if(e.tokens.push({type:"dd_open",lines:l=[p,0],level:e.level++}),m=e.tight,u=e.ddIndent,d=e.blkIndent,g=e.tShift[s],h=e.parentType,e.blkIndent=e.ddIndent=e.tShift[s]+2,e.tShift[s]=a-e.bMarks[s],e.tight=!0,e.parentType="deflist",e.parser.tokenize(e,s,r,!0),(!e.tight||f)&&(b=!1),f=1<e.line-s&&e.isEmpty(e.line-1),e.tShift[s]=g,e.tight=m,e.parentType=h,e.blkIndent=d,e.ddIndent=u,e.tokens.push({type:"dd_close",level:--e.level}),l[1]=p=e.line,p>=r)break OUTER;if(e.tShift[p]<e.blkIndent)break OUTER;if(a=skipMarker(e,p),0>a)break;s=p}if(p>=r)break;if(o=p,e.isEmpty(o))break;if(e.tShift[o]<e.blkIndent)break;if(s=o+1,s>=r)break;if(e.isEmpty(s)&&s++,s>=r)break;if(e.tShift[s]<e.blkIndent)break;if(a=skipMarker(e,s),0>a)break;// go to the next loop iteration:
// insert DT and DD tags and repeat checking
}// Finilize list
return e.tokens.push({type:"dl_close",level:--e.level}),i[1]=p,e.line=p,b&&markTightParagraphs$1(e,c),!0}// Paragraph
function paragraph(e,t/*, endLine*/){var r,n,a,s,o,c,p=t+1;// jump line-by-line until empty one or EOF
if(r=e.lineMax,p<r&&!e.isEmpty(p))for(c=e.parser.ruler.getRules("paragraph");p<r&&!e.isEmpty(p);p++)// this would be a code block normally, but after paragraph
// it's considered a lazy continuation regardless of what's there
if(!(3<e.tShift[p]-e.blkIndent)){for(a=!1,s=0,o=c.length;s<o;s++)if(c[s](e,p,r,!0)){a=!0;break}if(a)break}// Some tags can terminate paragraph without empty line.
return n=e.getLines(t,p,e.blkIndent,!1).trim(),e.line=p,n.length&&(e.tokens.push({type:"paragraph_open",tight:!1,lines:[t,e.line],level:e.level}),e.tokens.push({type:"inline",content:n,level:e.level+1,lines:[t,e.line],children:[]}),e.tokens.push({type:"paragraph_close",tight:!1,level:e.level})),!0}/**
 * Parser rules
 */var _rules$1=[["code",code],["fences",fences,["paragraph","blockquote","list"]],["blockquote",blockquote,["paragraph","blockquote","list"]],["hr",hr,["paragraph","blockquote","list"]],["list",list$1,["paragraph","blockquote"]],["footnote",footnote,["paragraph"]],["heading",heading,["paragraph","blockquote"]],["lheading",lheading],["htmlblock",htmlblock,["paragraph","blockquote"]],["table",table,["paragraph"]],["deflist",deflist,["paragraph"]],["paragraph",paragraph]];/**
 * Block Parser class
 *
 * @api private
 */function ParserBlock(){this.ruler=new Ruler;for(var e=0;e<_rules$1.length;e++)this.ruler.push(_rules$1[e][0],_rules$1[e][1],{alt:(_rules$1[e][2]||[]).slice()})}/**
 * Generate tokens for the given input range.
 *
 * @param  {Object} `state` Has properties like `src`, `parser`, `options` etc
 * @param  {Number} `startLine`
 * @param  {Number} `endLine`
 * @api private
 */ParserBlock.prototype.tokenize=function(e,t,r){for(var n,a,s=this.ruler.getRules(""),o=s.length,l=t,c=!1;l<r&&(e.line=l=e.skipEmptyLines(l),!(l>=r))&&!(e.tShift[l]<e.blkIndent);){// Try all possible rules.
// On success, rule should:
//
// - update `state.line`
// - update `state.tokens`
// - return true
for(a=0;a<o&&(n=s[a](e,l,r,!1),!n);a++);// set state.tight iff we had an empty line before current tag
// i.e. latest empty line should not count
if(e.tight=!c,e.isEmpty(e.line-1)&&(c=!0),l=e.line,l<r&&e.isEmpty(l)){// two empty lines should stop the parser in list mode
if(c=!0,l++,l<r&&"list"===e.parentType&&e.isEmpty(l))break;e.line=l}}};var TABS_SCAN_RE=/[\n\t]/g,NEWLINES_RE=/\r[\n\u0085]|[\u2424\u2028\u0085]/g,SPACES_RE=/\u00a0/g;ParserBlock.prototype.parse=function(e,t,r,n){var a,s=0,o=0;return e?void(// Normalize spaces
// Normalize newlines
e=e.replace(SPACES_RE," "),e=e.replace(NEWLINES_RE,"\n"),0<=e.indexOf("\t")&&(e=e.replace(TABS_SCAN_RE,function(t,r){var n;return 10===e.charCodeAt(r)?(s=r+1,o=0,t):(n="    ".slice((r-s-o)%4),o=r-s+1,n)})),a=new StateBlock(e,this,t,r,n),this.tokenize(a,a.line,a.lineMax)):[]};// Skip text characters for text token, place those to pending buffer
// and increment current pos
// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions
function isTerminatorChar(e){return!(10/* \n */!==e&&92/* \ */!==e&&96/* ` */!==e&&42/* * */!==e&&95/* _ */!==e&&94/* ^ */!==e&&91/* [ */!==e&&93/* ] */!==e&&33/* ! */!==e&&38/* & */!==e&&60/* < */!==e&&62/* > */!==e&&123/* { */!==e&&125/* } */!==e&&36/* $ */!==e&&37/* % */!==e&&64/* @ */!==e&&126/* ~ */!==e&&43/* + */!==e&&61/* = */!==e&&58/* : */!==e)}function text$1(e,t){for(var r=e.pos;r<e.posMax&&!isTerminatorChar(e.src.charCodeAt(r));)r++;return r!==e.pos&&(t||(e.pending+=e.src.slice(e.pos,r)),e.pos=r,!0)}// Proceess '\n'
function newline(e,t){var r,n,a=e.pos;if(10!==e.src.charCodeAt(a)/* \n */)return!1;// '  \n' -> hardbreak
// Lookup in pending chars is bad practice! Don't copy to other rules!
// Pending string is stored in concat mode, indexed lookups will cause
// convertion to flat mode.
if(r=e.pending.length-1,n=e.posMax,!t)if(!(0<=r&&32===e.pending.charCodeAt(r)))e.push({type:"softbreak",level:e.level});else if(1<=r&&32===e.pending.charCodeAt(r-1)){// Strip out all trailing spaces on this line.
for(var s=r-2;0<=s;s--)if(32!==e.pending.charCodeAt(s)){e.pending=e.pending.substring(0,s+1);break}e.push({type:"hardbreak",level:e.level})}else e.pending=e.pending.slice(0,-1),e.push({type:"softbreak",level:e.level});// skip heading spaces for next line
for(a++;a<n&&32===e.src.charCodeAt(a);)a++;return e.pos=a,!0}// Proceess escaped chars and hardbreaks
for(var ESCAPED=[],i=0;256>i;i++)ESCAPED.push(0);["\\","!","\"","#","$","%","&","'","(",")","*","+",",",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~","-"].forEach(function(e){ESCAPED[e.charCodeAt(0)]=1});function escape(e,t){var r,n=e.pos,a=e.posMax;if(92!==e.src.charCodeAt(n)/* \ */)return!1;if(n++,n<a){if(r=e.src.charCodeAt(n),256>r&&0!==ESCAPED[r])return t||(e.pending+=e.src[n]),e.pos+=2,!0;if(10===r){// skip leading whitespaces from next line
for(t||e.push({type:"hardbreak",level:e.level}),n++;n<a&&32===e.src.charCodeAt(n);)n++;return e.pos=n,!0}}return t||(e.pending+="\\"),e.pos++,!0}// Parse backticks
function backticks(e,t){var r,n,a,s,o,l=e.pos,i=e.src.charCodeAt(l);if(96!==i/* ` */)return!1;for(r=l,l++,n=e.posMax;l<n&&96===e.src.charCodeAt(l)/* ` */;)l++;for(a=e.src.slice(r,l),s=o=l;-1!==(s=e.src.indexOf("`",o));){for(o=s+1;o<n&&96===e.src.charCodeAt(o)/* ` */;)o++;if(o-s===a.length)return t||e.push({type:"code",content:e.src.slice(l,s).replace(/[ \n]+/g," ").trim(),block:!1,level:e.level}),e.pos=o,!0}return t||(e.pending+=a),e.pos+=a.length,!0}// Process ~~deleted text~~
function del(e,t){var r,n,a,s,o,l=e.posMax,i=e.pos;if(126!==e.src.charCodeAt(i)/* ~ */)return!1;if(t)return!1;// don't run any pairs in validation mode
if(i+4>=l)return!1;if(126!==e.src.charCodeAt(i+1)/* ~ */)return!1;if(e.level>=e.options.maxNesting)return!1;if(s=0<i?e.src.charCodeAt(i-1):-1,o=e.src.charCodeAt(i+2),126===s/* ~ */)return!1;if(126===o/* ~ */)return!1;if(32===o||10===o)return!1;for(n=i+2;n<l&&126===e.src.charCodeAt(n)/* ~ */;)n++;if(n>i+3)return e.pos+=n-i,t||(e.pending+=e.src.slice(i,n)),!0;for(e.pos=i+2,a=1;e.pos+1<l;){if(126===e.src.charCodeAt(e.pos)&&126===e.src.charCodeAt(e.pos+1)&&(s=e.src.charCodeAt(e.pos-1),o=e.pos+2<l?e.src.charCodeAt(e.pos+2):-1,126!==o/* ~ */&&126!==s&&(32!==s&&10!==s?a--:32!==o&&10!==o&&a++,0>=a)/* ~ */)/* ~ */ /* ~ */)// else {
//  // standalone ' ~~ ' indented with spaces
// }
{r=!0;break}e.parser.skipToken(e)}return r?(e.posMax=e.pos,e.pos=i+2,t||(e.push({type:"del_open",level:e.level++}),e.parser.tokenize(e),e.push({type:"del_close",level:--e.level})),e.pos=e.posMax+2,e.posMax=l,!0):(e.pos=i,!1);// found!
}// Process ++inserted text++
function ins(e,t){var r,n,a,s,o,l=e.posMax,i=e.pos;if(43!==e.src.charCodeAt(i)/* + */)return!1;if(t)return!1;// don't run any pairs in validation mode
if(i+4>=l)return!1;if(43!==e.src.charCodeAt(i+1)/* + */)return!1;if(e.level>=e.options.maxNesting)return!1;if(s=0<i?e.src.charCodeAt(i-1):-1,o=e.src.charCodeAt(i+2),43===s/* + */)return!1;if(43===o/* + */)return!1;if(32===o||10===o)return!1;for(n=i+2;n<l&&43===e.src.charCodeAt(n)/* + */;)n++;if(n!==i+2)return e.pos+=n-i,t||(e.pending+=e.src.slice(i,n)),!0;for(e.pos=i+2,a=1;e.pos+1<l;){if(43===e.src.charCodeAt(e.pos)&&43===e.src.charCodeAt(e.pos+1)&&(s=e.src.charCodeAt(e.pos-1),o=e.pos+2<l?e.src.charCodeAt(e.pos+2):-1,43!==o/* + */&&43!==s&&(32!==s&&10!==s?a--:32!==o&&10!==o&&a++,0>=a)/* + */)/* + */ /* + */)// else {
//  // standalone ' ++ ' indented with spaces
// }
{r=!0;break}e.parser.skipToken(e)}return r?(e.posMax=e.pos,e.pos=i+2,t||(e.push({type:"ins_open",level:e.level++}),e.parser.tokenize(e),e.push({type:"ins_close",level:--e.level})),e.pos=e.posMax+2,e.posMax=l,!0):(e.pos=i,!1);// found!
}// Process ==highlighted text==
function mark(e,t){var r,n,a,s,o,l=e.posMax,i=e.pos;if(61!==e.src.charCodeAt(i)/* = */)return!1;if(t)return!1;// don't run any pairs in validation mode
if(i+4>=l)return!1;if(61!==e.src.charCodeAt(i+1)/* = */)return!1;if(e.level>=e.options.maxNesting)return!1;if(s=0<i?e.src.charCodeAt(i-1):-1,o=e.src.charCodeAt(i+2),61===s/* = */)return!1;if(61===o/* = */)return!1;if(32===o||10===o)return!1;for(n=i+2;n<l&&61===e.src.charCodeAt(n)/* = */;)n++;if(n!==i+2)return e.pos+=n-i,t||(e.pending+=e.src.slice(i,n)),!0;for(e.pos=i+2,a=1;e.pos+1<l;){if(61===e.src.charCodeAt(e.pos)&&61===e.src.charCodeAt(e.pos+1)&&(s=e.src.charCodeAt(e.pos-1),o=e.pos+2<l?e.src.charCodeAt(e.pos+2):-1,61!==o/* = */&&61!==s&&(32!==s&&10!==s?a--:32!==o&&10!==o&&a++,0>=a)/* = */)/* = */ /* = */)// else {
//  // standalone ' == ' indented with spaces
// }
{r=!0;break}e.parser.skipToken(e)}return r?(e.posMax=e.pos,e.pos=i+2,t||(e.push({type:"mark_open",level:e.level++}),e.parser.tokenize(e),e.push({type:"mark_close",level:--e.level})),e.pos=e.posMax+2,e.posMax=l,!0):(e.pos=i,!1);// found!
}// Process *this* and _that_
function isAlphaNum(e){return 48<=e/* 0 */&&57>=e/* 9 */||65<=e/* A */&&90>=e/* Z */||97<=e/* a */&&122>=e/* z */}// parse sequence of emphasis markers,
// "start" should point at a valid marker
function scanDelims(e,t){var r,n,a,s=t,o=!0,l=!0,i=e.posMax,c=e.src.charCodeAt(t);for(r=0<t?e.src.charCodeAt(t-1):-1;s<i&&e.src.charCodeAt(s)===c;)s++;return s>=i&&(o=!1),a=s-t,4<=a?o=l=!1:(n=s<i?e.src.charCodeAt(s):-1,(32===n||10===n)&&(o=!1),(32===r||10===r)&&(l=!1),95===c/* _ */&&(isAlphaNum(r)&&(o=!1),isAlphaNum(n)&&(l=!1))),{can_open:o,can_close:l,delims:a}}function emphasis(e,t){var r,n,a,s,o,l,i,c=e.posMax,p=e.pos,d=e.src.charCodeAt(p);if(95!==d/* _ */&&42!==d/* * */)return!1;if(t)return!1;// don't run any pairs in validation mode
if(i=scanDelims(e,p),r=i.delims,!i.can_open)return e.pos+=r,t||(e.pending+=e.src.slice(p,e.pos)),!0;if(e.level>=e.options.maxNesting)return!1;for(e.pos=p+r,l=[r];e.pos<c;){if(e.src.charCodeAt(e.pos)===d){if(i=scanDelims(e,e.pos),n=i.delims,i.can_close){for(s=l.pop(),o=n;s!==o;){if(o<s){l.push(s-o);break}// assert(newCount > oldCount)
if(o-=s,0===l.length)break;e.pos+=s,s=l.pop()}if(0===l.length){r=s,a=!0;break}e.pos+=n;continue}i.can_open&&l.push(n),e.pos+=n;continue}e.parser.skipToken(e)}return a?(e.posMax=e.pos,e.pos=p+r,t||((2===r||3===r)&&e.push({type:"strong_open",level:e.level++}),(1===r||3===r)&&e.push({type:"em_open",level:e.level++}),e.parser.tokenize(e),(1===r||3===r)&&e.push({type:"em_close",level:--e.level}),(2===r||3===r)&&e.push({type:"strong_close",level:--e.level})),e.pos=e.posMax+r,e.posMax=c,!0):(e.pos=p,!1);// found!
}// Process ~subscript~
// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;function sub(e,t){var r,n,a=e.posMax,s=e.pos;if(126!==e.src.charCodeAt(s)/* ~ */)return!1;if(t)return!1;// don't run any pairs in validation mode
if(s+2>=a)return!1;if(e.level>=e.options.maxNesting)return!1;for(e.pos=s+1;e.pos<a;){if(126===e.src.charCodeAt(e.pos)/* ~ */){r=!0;break}e.parser.skipToken(e)}return r&&s+1!==e.pos?(n=e.src.slice(s+1,e.pos),n.match(/(^|[^\\])(\\\\)*\s/))?(e.pos=s,!1):(e.posMax=e.pos,e.pos=s+1,t||e.push({type:"sub",level:e.level,content:n.replace(UNESCAPE_RE,"$1")}),e.pos=e.posMax+1,e.posMax=a,!0):(e.pos=s,!1);// found!
}// Process ^superscript^
// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE$1=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;function sup(e,t){var r,n,a=e.posMax,s=e.pos;if(94!==e.src.charCodeAt(s)/* ^ */)return!1;if(t)return!1;// don't run any pairs in validation mode
if(s+2>=a)return!1;if(e.level>=e.options.maxNesting)return!1;for(e.pos=s+1;e.pos<a;){if(94===e.src.charCodeAt(e.pos)/* ^ */){r=!0;break}e.parser.skipToken(e)}return r&&s+1!==e.pos?(n=e.src.slice(s+1,e.pos),n.match(/(^|[^\\])(\\\\)*\s/))?(e.pos=s,!1):(e.posMax=e.pos,e.pos=s+1,t||e.push({type:"sup",level:e.level,content:n.replace(UNESCAPE_RE$1,"$1")}),e.pos=e.posMax+1,e.posMax=a,!0):(e.pos=s,!1);// found!
}// Process [links](<to> "stuff")
function links(e,t){var r,n,a,s,o,l,i,c,p=!1,d=e.pos,u=e.posMax,h=e.pos,g=e.src.charCodeAt(h);if(33===g/* ! */&&(p=!0,g=e.src.charCodeAt(++h)),91!==g/* [ */)return!1;if(e.level>=e.options.maxNesting)return!1;// parser failed to find ']', so it's not a valid link
if(r=h+1,n=parseLinkLabel(e,h),0>n)return!1;if(l=n+1,l<u&&40===e.src.charCodeAt(l)/* ( */){for(l++;l<u&&(c=e.src.charCodeAt(l),32===c||10===c);l++);if(l>=u)return!1;// [link](  <href>  "title"  )
//          ^^^^^^ parsing link destination
for(h=l,parseLinkDestination(e,l)?(s=e.linkContent,l=e.pos):s="",h=l;l<u&&(c=e.src.charCodeAt(l),32===c||10===c);l++);// [link](  <href>  "title"  )
//                  ^^^^^^^ parsing link title
if(l<u&&h!==l&&parseLinkTitle(e,l))// [link](  <href>  "title"  )
//                         ^^ skipping these spaces
for(o=e.linkContent,l=e.pos;l<u&&(c=e.src.charCodeAt(l),32===c||10===c);l++);else o="";if(l>=u||41!==e.src.charCodeAt(l)/* ) */)return e.pos=d,!1;l++}else{//
// Link reference
//
// do not allow nested reference links
if(0<e.linkLevel)return!1;// [foo]  [bar]
//      ^^ optional whitespace (can include newlines)
for(;l<u&&(c=e.src.charCodeAt(l),32===c||10===c);l++);if(l<u&&91===e.src.charCodeAt(l)/* [ */&&(h=l+1,l=parseLinkLabel(e,l),0<=l?a=e.src.slice(h,l++):l=h-1),a||("undefined"==typeof a&&(l=n+1),a=e.src.slice(r,n)),i=e.env.references[normalizeReference(a)],!i)return e.pos=d,!1;s=i.href,o=i.title}//
// We found the end of the link, and know for a fact it's a valid link;
// so all that's left to do is to call tokenizer.
//
return t||(e.pos=r,e.posMax=n,p?e.push({type:"image",src:s,title:o,alt:e.src.substr(r,n-r),level:e.level}):(e.push({type:"link_open",href:s,title:o,level:e.level++}),e.linkLevel++,e.parser.tokenize(e),e.linkLevel--,e.push({type:"link_close",level:--e.level}))),e.pos=l,e.posMax=u,!0}// Process inline footnotes (^[...])
function footnote_inline(e,t){var r,n,a,s,o=e.posMax,l=e.pos;return!(l+2>=o)&&!(94!==e.src.charCodeAt(l)/* ^ */)&&!(91!==e.src.charCodeAt(l+1)/* [ */)&&!(e.level>=e.options.maxNesting)&&(r=l+2,n=parseLinkLabel(e,l+1),!(0>n))&&(t||(!e.env.footnotes&&(e.env.footnotes={}),!e.env.footnotes.list&&(e.env.footnotes.list=[]),a=e.env.footnotes.list.length,e.pos=r,e.posMax=n,e.push({type:"footnote_ref",id:a,level:e.level}),e.linkLevel++,s=e.tokens.length,e.parser.tokenize(e),e.env.footnotes.list[a]={tokens:e.tokens.splice(s)},e.linkLevel--),e.pos=n+1,e.posMax=o,!0);// We found the end of the link, and know for a fact it's a valid link;
// so all that's left to do is to call tokenizer.
//
}// Process footnote references ([^...])
function footnote_ref(e,t){var r,n,a,s,o=e.posMax,l=e.pos;// should be at least 4 chars - "[^x]"
if(l+3>o)return!1;if(!e.env.footnotes||!e.env.footnotes.refs)return!1;if(91!==e.src.charCodeAt(l)/* [ */)return!1;if(94!==e.src.charCodeAt(l+1)/* ^ */)return!1;if(e.level>=e.options.maxNesting)return!1;for(n=l+2;n<o;n++){if(32===e.src.charCodeAt(n))return!1;if(10===e.src.charCodeAt(n))return!1;if(93===e.src.charCodeAt(n)/* ] */)break}return n!==l+2&&!(n>=o)&&(n++,r=e.src.slice(l+2,n-1),"undefined"!=typeof e.env.footnotes.refs[":"+r])&&(t||(!e.env.footnotes.list&&(e.env.footnotes.list=[]),0>e.env.footnotes.refs[":"+r]?(a=e.env.footnotes.list.length,e.env.footnotes.list[a]={label:r,count:0},e.env.footnotes.refs[":"+r]=a):a=e.env.footnotes.refs[":"+r],s=e.env.footnotes.list[a].count,e.env.footnotes.list[a].count++,e.push({type:"footnote_ref",id:a,subId:s,level:e.level})),e.pos=n,e.posMax=o,!0);// no empty footnote labels
}// List of valid url schemas, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#autolinks
var url_schemas=["coap","doi","javascript","aaa","aaas","about","acap","cap","cid","crid","data","dav","dict","dns","file","ftp","geo","go","gopher","h323","http","https","iax","icap","im","imap","info","ipp","iris","iris.beep","iris.xpc","iris.xpcs","iris.lwz","ldap","mailto","mid","msrp","msrps","mtqp","mupdate","news","nfs","ni","nih","nntp","opaquelocktoken","pop","pres","rtsp","service","session","shttp","sieve","sip","sips","sms","snmp","soap.beep","soap.beeps","tag","tel","telnet","tftp","thismessage","tn3270","tip","tv","urn","vemmi","ws","wss","xcon","xcon-userid","xmlrpc.beep","xmlrpc.beeps","xmpp","z39.50r","z39.50s","adiumxtra","afp","afs","aim","apt","attachment","aw","beshare","bitcoin","bolo","callto","chrome","chrome-extension","com-eventbrite-attendee","content","cvs","dlna-playsingle","dlna-playcontainer","dtn","dvb","ed2k","facetime","feed","finger","fish","gg","git","gizmoproject","gtalk","hcp","icon","ipn","irc","irc6","ircs","itms","jar","jms","keyparc","lastfm","ldaps","magnet","maps","market","message","mms","ms-help","msnim","mumble","mvn","notes","oid","palm","paparazzi","platform","proxy","psyc","query","res","resource","rmi","rsync","rtmp","secondlife","sftp","sgn","skype","smb","soldat","spotify","ssh","steam","svn","teamspeak","things","udp","unreal","ut2004","ventrilo","view-source","webcal","wtai","wyciwyg","xfire","xri","ymsgr"],EMAIL_RE=/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,AUTOLINK_RE=/^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;// Process autolinks '<protocol:...>'
/*eslint max-len:0*/function autolink(e,t){var r,n,a,s,o,l=e.pos;return!(60!==e.src.charCodeAt(l)/* < */)&&(r=e.src.slice(l),!(0>r.indexOf(">")))&&((n=r.match(AUTOLINK_RE),n)?!(0>url_schemas.indexOf(n[1].toLowerCase()))&&(s=n[0].slice(1,-1),o=normalizeLink(s),!!e.parser.validateLink(s))&&(t||(e.push({type:"link_open",href:o,level:e.level}),e.push({type:"text",content:s,level:e.level+1}),e.push({type:"link_close",level:e.level})),e.pos+=n[0].length,!0):(a=r.match(EMAIL_RE),!!a)&&(s=a[0].slice(1,-1),o=normalizeLink("mailto:"+s),!!e.parser.validateLink(o))&&(t||(e.push({type:"link_open",href:o,level:e.level}),e.push({type:"text",content:s,level:e.level+1}),e.push({type:"link_close",level:e.level})),e.pos+=a[0].length,!0))}// Regexps to match html elements
function replace$1(e,t){return e=e.source,t=t||"",function a(r,n){return r?(n=n.source||n,e=e.replace(r,n),a):new RegExp(e,t)}}var attr_name=/[a-zA-Z_:][a-zA-Z0-9:._-]*/,unquoted=/[^"'=<>`\x00-\x20]+/,single_quoted=/'[^']*'/,double_quoted=/"[^"]*"/,attr_value=replace$1(/(?:unquoted|single_quoted|double_quoted)/)("unquoted",unquoted)("single_quoted",single_quoted)("double_quoted",double_quoted)(),attribute=replace$1(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name",attr_name)("attr_value",attr_value)(),open_tag=replace$1(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute",attribute)(),close_tag=/<\/[A-Za-z][A-Za-z0-9]*\s*>/,comment=/<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/,processing=/<[?].*?[?]>/,declaration=/<![A-Z]+\s+[^>]*>/,cdata=/<!\[CDATA\[[\s\S]*?\]\]>/,HTML_TAG_RE=replace$1(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag",open_tag)("close_tag",close_tag)("comment",comment)("processing",processing)("declaration",declaration)("cdata",cdata)();// Process html tags
function isLetter$2(e){/*eslint no-bitwise:0*/var t=32|e;// to lower case
return 97<=t/* a */&&122>=t/* z */}function htmltag(e,t){var r,n,a,s=e.pos;return!!e.options.html&&(a=e.posMax,!(60!==e.src.charCodeAt(s)/* < */||s+2>=a))&&(r=e.src.charCodeAt(s+1),33===r/* ! */||63===r/* ? */||47===r/* / */||isLetter$2(r))&&(n=e.src.slice(s).match(HTML_TAG_RE),!!n)&&(t||e.push({type:"htmltag",content:e.src.slice(s,s+n[0].length),level:e.level}),e.pos+=n[0].length,!0);// Check start
// Quick fail on second char
}// Process html entity - &#123;, &#xAF;, &quot;, ...
var DIGITAL_RE=/^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,NAMED_RE=/^&([a-z][a-z0-9]{1,31});/i;function entity(e,t){var r,n,a,s=e.pos,o=e.posMax;if(38!==e.src.charCodeAt(s)/* & */)return!1;if(s+1<o)if(r=e.src.charCodeAt(s+1),35===r/* # */){if(a=e.src.slice(s).match(DIGITAL_RE),a)return t||(n="x"===a[1][0].toLowerCase()?parseInt(a[1].slice(1),16):parseInt(a[1],10),e.pending+=isValidEntityCode(n)?fromCodePoint(n):fromCodePoint(65533)),e.pos+=a[0].length,!0;}else if(a=e.src.slice(s).match(NAMED_RE),a){var l=decodeEntity(a[1]);if(a[1]!==l)return t||(e.pending+=l),e.pos+=a[0].length,!0}return t||(e.pending+="&"),e.pos++,!0}/**
 * Inline Parser `rules`
 */var _rules$2=[["text",text$1],["newline",newline],["escape",escape],["backticks",backticks],["del",del],["ins",ins],["mark",mark],["emphasis",emphasis],["sub",sub],["sup",sup],["links",links],["footnote_inline",footnote_inline],["footnote_ref",footnote_ref],["autolink",autolink],["htmltag",htmltag],["entity",entity]];/**
 * Inline Parser class. Note that link validation is stricter
 * in Remarkable than what is specified by CommonMark. If you
 * want to change this you can use a custom validator.
 *
 * @api private
 */function ParserInline(){this.ruler=new Ruler;for(var e=0;e<_rules$2.length;e++)this.ruler.push(_rules$2[e][0],_rules$2[e][1]);// Can be overridden with a custom validator
this.validateLink=validateLink}/**
 * Skip a single token by running all rules in validation mode.
 * Returns `true` if any rule reports success.
 *
 * @param  {Object} `state`
 * @api privage
 */ParserInline.prototype.skipToken=function(e){var t,r,n=this.ruler.getRules(""),a=n.length,s=e.pos;if(0<(r=e.cacheGet(s)))return void(e.pos=r);for(t=0;t<a;t++)if(n[t](e,!0))return void e.cacheSet(s,e.pos);e.pos++,e.cacheSet(s,e.pos)},ParserInline.prototype.tokenize=function(e){for(var t,r,n=this.ruler.getRules(""),a=n.length,s=e.posMax;e.pos<s;){// Try all possible rules.
// On success, the rule should:
//
// - update `state.pos`
// - update `state.tokens`
// - return true
for(r=0;r<a&&(t=n[r](e,!1),!t);r++);if(t){if(e.pos>=s)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},ParserInline.prototype.parse=function(e,t,r,n){var a=new StateInline(e,this,t,r,n);this.tokenize(a)};/**
 * Validate the given `url` by checking for bad protocols.
 *
 * @param  {String} `url`
 * @return {Boolean}
 */function validateLink(e){var t=e.trim().toLowerCase();return t=replaceEntities(t),-1===t.indexOf(":")||-1===["vbscript","javascript","file","data"].indexOf(t.split(":")[0])}// Remarkable default options
var defaultConfig={options:{html:!1,// Enable HTML tags in source
xhtmlOut:!1,// Use '/' to close single tags (<br />)
breaks:!1,// Convert '\n' in paragraphs into <br>
langPrefix:"language-",// CSS language prefix for fenced blocks
linkTarget:"",// set target to open link in
// Enable some language-neutral replacements + quotes beautification
typographer:!1,// Double + single quotes replacement pairs, when typographer enabled,
// and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
quotes:"\u201C\u201D\u2018\u2019",// Highlighter function. Should return escaped HTML,
// or '' if input not changed
//
// function (/*str, lang*/) { return ''; }
//
highlight:null,maxNesting:20// Internal protection, recursion limit
},components:{core:{rules:["block","inline","references","replacements","smartquotes","references","abbr2","footnote_tail"]},block:{rules:["blockquote","code","fences","footnote","heading","hr","htmlblock","lheading","list","paragraph","table"]},inline:{rules:["autolink","backticks","del","emphasis","entity","escape","footnote_ref","htmltag","links","newline","text"]}}},fullConfig={options:{html:!1,// Enable HTML tags in source
xhtmlOut:!1,// Use '/' to close single tags (<br />)
breaks:!1,// Convert '\n' in paragraphs into <br>
langPrefix:"language-",// CSS language prefix for fenced blocks
linkTarget:"",// set target to open link in
// Enable some language-neutral replacements + quotes beautification
typographer:!1,// Double + single quotes replacement pairs, when typographer enabled,
// and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
quotes:"\u201C\u201D\u2018\u2019",// Highlighter function. Should return escaped HTML,
// or '' if input not changed
//
// function (/*str, lang*/) { return ''; }
//
highlight:null,maxNesting:20// Internal protection, recursion limit
},components:{// Don't restrict core/block/inline rules
core:{},block:{},inline:{}}},commonmarkConfig={options:{html:!0,// Enable HTML tags in source
xhtmlOut:!0,// Use '/' to close single tags (<br />)
breaks:!1,// Convert '\n' in paragraphs into <br>
langPrefix:"language-",// CSS language prefix for fenced blocks
linkTarget:"",// set target to open link in
// Enable some language-neutral replacements + quotes beautification
typographer:!1,// Double + single quotes replacement pairs, when typographer enabled,
// and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
quotes:"\u201C\u201D\u2018\u2019",// Highlighter function. Should return escaped HTML,
// or '' if input not changed
//
// function (/*str, lang*/) { return ''; }
//
highlight:null,maxNesting:20// Internal protection, recursion limit
},components:{core:{rules:["block","inline","references","abbr2"]},block:{rules:["blockquote","code","fences","heading","hr","htmlblock","lheading","list","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","htmltag","links","newline","text"]}}},config$1={default:defaultConfig,full:fullConfig,commonmark:commonmarkConfig};// Remarkable default options
/**
 * The `StateCore` class manages state.
 *
 * @param {Object} `instance` Remarkable instance
 * @param {String} `str` Markdown string
 * @param {Object} `env`
 */function StateCore(e,t,r){this.src=t,this.env=r,this.options=e.options,this.tokens=[],this.inlineMode=!1,this.inline=e.inline,this.block=e.block,this.renderer=e.renderer,this.typographer=e.typographer}/**
 * The main `Remarkable` class. Create an instance of
 * `Remarkable` with a `preset` and/or `options`.
 *
 * @param {String} `preset` If no preset is given, `default` is used.
 * @param {Object} `options`
 */function Remarkable(e,t){"string"!=typeof e&&(t=e,e="default"),t&&null!=t.linkify&&console.warn("linkify option is removed. Use linkify plugin instead:\n\nimport Remarkable from 'remarkable';\nimport linkify from 'remarkable/linkify';\nnew Remarkable().use(linkify)\n"),this.inline=new ParserInline,this.block=new ParserBlock,this.core=new Core,this.renderer=new Renderer,this.ruler=new Ruler,this.options={},this.configure(config$1[e]),this.set(t||{})}/**
 * Set options as an alternative to passing them
 * to the constructor.
 *
 * ```js
 * md.set({typographer: true});
 * ```
 * @param {Object} `options`
 * @api public
 */Remarkable.prototype.set=function(e){assign(this.options,e)},Remarkable.prototype.configure=function(e){var t=this;if(!e)throw new Error("Wrong `remarkable` preset, check name/content");e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(r){e.components[r].rules&&t[r].ruler.enable(e.components[r].rules,!0)})},Remarkable.prototype.use=function(e,t){return e(this,t),this},Remarkable.prototype.parse=function(e,t){var r=new StateCore(this,e,t);return this.core.process(r),r.tokens},Remarkable.prototype.render=function(e,t){return t=t||{},this.renderer.render(this.parse(e,t),this.options,t)},Remarkable.prototype.parseInline=function(e,t){var r=new StateCore(this,e,t);return r.inlineMode=!0,this.core.process(r),r.tokens},Remarkable.prototype.renderInline=function(e,t){return t=t||{},this.renderer.render(this.parseInline(e,t),this.options,t)};var commonjsGlobal="undefined"==typeof globalThis?"undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?{}:self:global:window:globalThis;function createCommonjsModule(e,t){return t={exports:{}},e(t,t.exports),t.exports}var prism=createCommonjsModule(function(e){var t=Math.min,r="undefined"==typeof window?"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self// if in worker
:{}// if in node js
:window// if in browser
,n=function(e){// Typescript note:
// The following can be used to import the Token type in JSDoc:
//
//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token
/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */function t(e,t,r,n){this.type=e,this.content=t,this.alias=r,this.length=0|(n||"").length}/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */ /**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */ /**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */function r(e,t,r,n){e.lastIndex=t;var a=e.exec(r);if(a&&n&&a[1]){// change the match to remove the text matched by the Prism lookbehind group
var s=a[1].length;a.index+=s,a[0]=a[0].slice(s)}return a}/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */function n(e,a,l,i,c,d){for(var h in l)if(l.hasOwnProperty(h)&&l[h]){var g=l[h];g=Array.isArray(g)?g:[g];for(var m=0;m<g.length;++m){if(d&&d.cause==h+","+m)return;var f=g[m],b=f.inside,v=!!f.lookbehind,y=!!f.greedy,x=f.alias;if(y&&!f.pattern.global){// Without the global flag, lastIndex won't work
var _=f.pattern.toString().match(/[imsuy]*$/)[0];f.pattern=RegExp(f.pattern.source,_+"g")}/** @type {RegExp} */for(// iterate the token list and keep track of the current token/string position
var w,L=f.pattern||f,A=i.next,q=c;A!==a.tail&&!(d&&q>=d.reach);q+=A.value.length,A=A.next){if(w=A.value,a.length>e.length)// Something went terribly wrong, ABORT, ABORT!
return;if(!(w instanceof t)){var C,S=1;// this is the to parameter of removeBetween
if(y){if(C=r(L,q,e,v),!C||C.index>=e.length)break;var E=C.index,M=C.index+C[0].length,D=q;for(D+=A.value.length;E>=D;)A=A.next,D+=A.value.length;// adjust pos (and p)
// the current node is a Token, then the match starts inside another Token, which is invalid
if(D-=A.value.length,q=D,A.value instanceof t)continue;// find the last node which is affected by this match
for(var N=A;N!==a.tail&&(D<M||"string"==typeof N.value);N=N.next)S++,D+=N.value.length;S--,w=e.slice(q,D),C.index-=q}else if(C=r(L,0,w,v),!C)continue;// eslint-disable-next-line no-redeclare
var E=C.index,T=C[0],I=w.slice(0,E),R=w.slice(E+T.length),B=q+w.length;d&&B>d.reach&&(d.reach=B);var U=A.prev;I&&(U=s(a,U,I),q+=I.length),o(a,U,S);var O=new t(h,b?u.tokenize(T,b):T,x,T);if(A=s(a,U,O),R&&s(a,A,R),1<S){// at least one Token object was removed, so we have to do some rematching
// this can only happen if the current pattern is greedy
/** @type {RematchOptions} */var P={cause:h+","+m,reach:B};n(e,a,l,A.prev,q,P),d&&P.reach>d.reach&&(d.reach=P.reach)}}}}}}/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */ /**
	 * @template T
	 * @private
	 */function a(){/** @type {LinkedListNode<T>} */var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};/** @type {LinkedListNode<T>} */e.next=t,this.head=e,this.tail=t,this.length=0}/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */function s(e,t,r){// assumes that node != list.tail && values.length >= 0
var n=t.next,a={value:r,prev:t,next:n};return t.next=a,n.prev=a,e.length++,a}/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */function o(e,t,r){for(var n=t.next,a=0;a<r&&n!==e.tail;a++)n=n.next;t.next=n,n.prev=t,e.length-=a}/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */function l(e){for(var t=[],r=e.head.next;r!==e.tail;)t.push(r.value),r=r.next;return t}function i(){u.manual||u.highlightAll()}// Private helper vars
var c=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,p=0,d={},u={/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */manual:e.Prism&&e.Prism.manual,/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */util:{encode:function r(e){return e instanceof t?new t(e.type,r(e.content),e.alias):Array.isArray(e)?e.map(r):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++p}),e.__id},/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */clone:function r(e,t){t=t||{};var n,a;switch(u.util.type(e)){case"Object":if(a=u.util.objId(e),t[a])return t[a];for(var s in n=/** @type {Record<string, any>} */{},t[a]=n,e)e.hasOwnProperty(s)&&(n[s]=r(e[s],t));return(/** @type {any} */n);case"Array":return(a=u.util.objId(e),t[a])?t[a]:(n=[],t[a]=n,/** @type {Array} */ /** @type {any} */e.forEach(function(e,a){n[a]=r(e,t)}),/** @type {any} */n);default:return e;}},/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */getLanguage:function(e){for(;e;){var t=c.exec(e.className);if(t)return t[1].toLowerCase();e=e.parentElement}return"none"},/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */setLanguage:function(e,t){e.className=e.className.replace(RegExp(c,"gi"),""),e.classList.add("language-"+t)},/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document&&!0/* hack to trip TS' flow analysis */)return(/** @type {any} */document.currentScript);// IE11 workaround
// we'll get the src of the current script by parsing IE11's error stack trace
// this will not work for inline scripts
try{throw new Error}catch(n){// Get file src url from stack. Specifically works with the format of stack traces in IE.
// A stack will look like this:
//
// Error
//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
//    at Global code (http://localhost/components/prism-core.js:606:1)
var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(n.stack)||[])[1];if(e){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==e)return t[r]}return null}},/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */isActive:function(e,t,r){for(var n;e;){if(n=e.classList,n.contains(t))return!0;if(n.contains("no-"+t))return!1;e=e.parentElement}return!!r}},/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */languages:{/**
			 * The grammar for plain, unformatted text.
			 */plain:d,plaintext:d,text:d,txt:d,/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */extend:function(e,t){var r=u.util.clone(u.languages[e]);for(var n in t)r[n]=t[n];return r},/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */insertBefore:function(e,t,r,n){n=n||/** @type {any} */u.languages;var a=n[e],s={};/** @type {Grammar} */for(var o in a)if(a.hasOwnProperty(o)){if(o==t)for(var l in r)r.hasOwnProperty(l)&&(s[l]=r[l]);// Do not insert token which also occur in insert. See #1525
r.hasOwnProperty(o)||(s[o]=a[o])}var i=n[e];return n[e]=s,u.languages.DFS(u.languages,function(t,r){r===i&&t!=e&&(this[t]=s)}),s},// Traverse a language definition with Depth First Search
DFS:function a(e,t,r,n){n=n||{};var s=u.util.objId;for(var o in e)if(e.hasOwnProperty(o)){t.call(e,o,e[o],r||o);var l=e[o],i=u.util.type(l);"Object"!==i||n[s(l)]?"Array"===i&&!n[s(l)]&&(n[s(l)]=!0,a(l,t,o,n)):(n[s(l)]=!0,a(l,t,null,n))}}},plugins:{},/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */highlightAll:function(e,t){u.highlightAllUnder(document,e,t)},/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */highlightAllUnder:function(e,t,r){var n={callback:r,container:e,selector:"code[class*=\"language-\"], [class*=\"language-\"] code, code[class*=\"lang-\"], [class*=\"lang-\"] code"};u.hooks.run("before-highlightall",n),n.elements=Array.prototype.slice.apply(n.container.querySelectorAll(n.selector)),u.hooks.run("before-all-elements-highlight",n);for(var a,s=0;a=n.elements[s++];)u.highlightElement(a,!0===t,n.callback)},/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */highlightElement:function(t,r,n){function a(e){c.highlightedCode=e,u.hooks.run("before-insert",c),c.element.innerHTML=c.highlightedCode,u.hooks.run("after-highlight",c),u.hooks.run("complete",c),n&&n.call(c.element)}// Find language
var s=u.util.getLanguage(t),o=u.languages[s];u.util.setLanguage(t,s);// Set language on the parent, for styling
var l=t.parentElement;l&&"pre"===l.nodeName.toLowerCase()&&u.util.setLanguage(l,s);var i=t.textContent,c={element:t,language:s,grammar:o,code:i};if(u.hooks.run("before-sanity-check",c),l=c.element.parentElement,l&&"pre"===l.nodeName.toLowerCase()&&!l.hasAttribute("tabindex")&&l.setAttribute("tabindex","0"),!c.code)return u.hooks.run("complete",c),void(n&&n.call(c.element));if(u.hooks.run("before-highlight",c),!c.grammar)return void a(u.util.encode(c.code));if(r&&e.Worker){var p=new Worker(u.filename);p.onmessage=function(e){a(e.data)},p.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else a(u.highlight(c.code,c.grammar,c.language))},/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */highlight:function(e,r,n){var a={code:e,grammar:r,language:n};if(u.hooks.run("before-tokenize",a),!a.grammar)throw new Error("The language \""+a.language+"\" has no grammar.");return a.tokens=u.tokenize(a.code,a.grammar),u.hooks.run("after-tokenize",a),t.stringify(u.util.encode(a.tokens),a.language)},/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */tokenize:function(e,t){var r=t.rest;if(r){for(var o in r)t[o]=r[o];delete t.rest}var i=new a;return s(i,i.head,e),n(e,i,t,i.head,0),l(i)},/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */hooks:{all:{},/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */add:function(e,t){var r=u.hooks.all;r[e]=r[e]||[],r[e].push(t)},/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */run:function(e,t){var r=u.hooks.all[e];if(r&&r.length)for(var n,a=0;n=r[a++];)n(t)}},Token:t};if(e.Prism=u,t.stringify=function r(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var n="";return e.forEach(function(a){n+=r(a,t)}),n}var a={type:e.type,content:r(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},o=e.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(a.classes,o):a.classes.push(o)),u.hooks.run("wrap",a);var l="";for(var i in a.attributes)l+=" "+i+"=\""+(a.attributes[i]||"").replace(/"/g,"&quot;")+"\"";return"<"+a.tag+" class=\""+a.classes.join(" ")+"\""+l+">"+a.content+"</"+a.tag+">"},!e.document)return e.addEventListener?(u.disableWorkerMessageHandler||e.addEventListener("message",function(t){var r=JSON.parse(t.data),n=r.language,a=r.code,s=r.immediateClose;e.postMessage(u.highlight(a,u.languages[n],n)),s&&e.close()},!1),u):u;// Get current script and highlight
var h=u.util.currentScript();if(h&&(u.filename=h.src,h.hasAttribute("data-manual")&&(u.manual=!0)),!u.manual){// If the document state is "loading", then we'll use DOMContentLoaded.
// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
// might take longer one animation frame to execute which can create a race condition where only some plugins have
// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
// See https://github.com/PrismJS/prism/issues/2102
var g=document.readyState;"loading"===g||"interactive"===g&&h&&h.defer?document.addEventListener("DOMContentLoaded",i):window.requestAnimationFrame?window.requestAnimationFrame(i):window.setTimeout(i,16)}return u}(r);// some additional documentation/types
/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */ /**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */ /**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */ /**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */ /* **********************************************
     Begin prism-markup.js
********************************************** */ // Plugin to make entity title show the real entity, idea by Roman Komarov
/* **********************************************
     Begin prism-css.js
********************************************** */ /* **********************************************
     Begin prism-clike.js
********************************************** */ /* **********************************************
     Begin prism-javascript.js
********************************************** */ /* **********************************************
     Begin prism-file-highlight.js
********************************************** */e.exports&&(e.exports=n),"undefined"!=typeof commonjsGlobal&&(commonjsGlobal.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{// https://www.w3.org/TR/xml/#NT-doctypedecl
pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null// see below
},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */value:function(e,t){var r={};r["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[t]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};a["language-"+t]={pattern:/[\s\S]+/,inside:n.languages[t]};var s={};s[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:a},n.languages.insertBefore("markup","cdata",s)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */value:function(e,t){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+e+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,"language-"+t],inside:n.languages[t]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}// See rest below
}},url:{// https://drafts.csswg.org/css-values-3/#urls
pattern:RegExp("\\burl\\((?:"+t.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+t.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+t.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var r=e.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(// constant
/NaN|Infinity/.source+"|"+// binary integer
/0[bB][01]+(?:_[01]+)*n?/.source+"|"+// octal integer
/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+// hexadecimal integer
/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+// decimal bigint
/\d+(?:_\d+)*n/.source+"|"+// decimal number (integer or float) but no bigint
/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{// eslint-disable-next-line regexp/no-dupe-characters-character-class
pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},// This must be declared before keyword because we use "function" inside the look-forward
"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,function(){/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */function e(e,t,r){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&(400>n.status&&n.responseText?t(n.responseText):400<=n.status?r(a(n.status,n.statusText)):r("\u2716 Error: File does not exist or is empty"))},n.send(null)}/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */function r(e){var t=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||"");if(t){var r=+t[1],n=t[2],a=t[3];return n?a?[r,+a]:[r,void 0]:[r,r]}}if("undefined"!=typeof n&&"undefined"!=typeof document){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a=function(e,t){return"\u2716 Error "+e+" while fetching file: "+t},s={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",l="loading",i="loaded",c="pre[data-src]:not(["+o+"=\""+i+"\"]):not(["+o+"=\""+l+"\"])";n.hooks.add("before-highlightall",function(e){e.selector+=", "+c}),n.hooks.add("before-sanity-check",function(a){var p=/** @type {HTMLPreElement} */a.element;if(p.matches(c)){a.code="",p.setAttribute(o,l);// mark as loading
// add code element with loading message
var d=p.appendChild(document.createElement("CODE"));d.textContent="Loading\u2026";var u=p.getAttribute("data-src"),h=a.language;if("none"===h){// the language might be 'none' because there is no language set;
// in this case, we want to use the extension as the language
var g=(/\.(\w+)$/.exec(u)||[,"none"])[1];h=s[g]||g}// set language classes
n.util.setLanguage(d,h),n.util.setLanguage(p,h);// preload the language
var m=n.plugins.autoloader;m&&m.loadLanguages(h),e(u,function(e){var a=Math.max;p.setAttribute(o,i);// handle data-range
var s=r(p.getAttribute("data-range"));if(s){var l=e.split(/\r\n?|\n/g),c=s[0],u=null==s[1]?l.length:s[1];// the range is one-based and inclusive on both ends
0>c&&(c+=l.length),c=a(0,t(c-1,l.length)),0>u&&(u+=l.length),u=a(0,t(u,l.length)),e=l.slice(c,u).join("\n"),p.hasAttribute("data-start")||p.setAttribute("data-start",c+1+"")}// highlight code
d.textContent=e,n.highlightElement(d)},function(e){p.setAttribute(o,"failed"),d.textContent=e})}}),n.plugins.fileHighlight={/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */highlight:function(e){for(var t,r=(e||document).querySelectorAll(c),a=0;t=r[a++];)n.highlightElement(t)}};var p=!1;/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */n.fileHighlight=function(){p||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),p=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}}// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
}()});(function(e){e.languages.typescript=e.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null// see below
},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,// keywords that have to be followed by an identifier
/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,// This is for `import type *, {}`
/\btype\b(?=\s*(?:[\{*]|$))/),delete e.languages.typescript.parameter,delete e.languages.typescript["literal-property"];// a version of typescript specifically for highlighting types
var t=e.languages.extend("typescript",{});delete t["class-name"],e.languages.typescript["class-name"].inside=t,e.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{// e.g. foo<T extends "bar" | "baz">( ...
pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,// everything after the first <
alias:"class-name",inside:t}}}}),e.languages.ts=e.languages.typescript})(Prism);class Markdown{constructor(e,t){new Promise(()=>fetch(window.location.origin+window.location.pathname+e).then(e=>e.text()).then(r=>{if(this.md=new Remarkable({langPrefix:"hljs language-"}),this.content=el("div",{class:"markdown-doc mt-16 pt-8 pb-16 w-full"},el("div",{class:"max-w-5xl"},this.markdown=el("div"),this.footer=el("div",{class:"border-t border-gray-400 py-6 mt-8 text-gray-600"},"Caught a mistake or want to contribute to the documentation? ",el("a",{href:config_4+e,target:"_blank",rel:"noopener"},"Edit this page on GitHub")))),this.markdown.innerHTML=this.md.render(r),this.markdown.querySelector(".language-json")){const e=JSON.parse(this.markdown.querySelector(".language-json").textContent);if(e.el&&e.attributes){const t=el(e.el,e.attributes);this.markdown.querySelector(".language-json").parentElement.remove(),this.markdown.appendChild(t)}}setChildren(t,this.content)}).then(()=>{prism.highlightAll()}))}}class Link$1{constructor(){this.el=el("a",{})}update(e){const{text:t,path:r,children:n}=e;this.el=el("ul",t),r&&(this.el=el("li",{},this.link=el("a",{class:"flex w-full",title:t,href:r},el("span",{},t)))),n&&n.length&&(this.el=el("li",{"tab-index":0},el("span",{class:"mb-3 lg:mb-2 uppercase mb-3 lg:mb-2 text-gray-500 tracking-wide font-bold text-sm lg:text-xs"},t),this.nav=el("ul",{class:"mt-2 mb-3 text-blue-700"})),this.list=list(this.nav,Link$1),this.list.update(n)),r===location.hash?setAttr(this.el,{class:"outline-none py-1 mb-3 lg:mb-1 block text-primary"}):setAttr(this.el,{class:"outline-none py-1 mb-3 lg:mb-1 block focus:text-gray-900 hover:text-gray-900 text-gray-700 font-medium"}),this.el.onclick=t=>{t.stopPropagation();const r=new CustomEvent("on:click-item",{detail:e,bubbles:!0});this.el.dispatchEvent(r)}}}class SideBar{constructor(){this.onSearch=this.onSearch.bind(this),this.el=el("div",{class:"h-full flex flex-col px-6 overflow-y-auto scrolling-touch text-base lg:text-sm py-24 lg:py-12"},el("div",{class:"hidden lg:flex flex-col pb-4 mb-6 bg-gray-100"},el("a",{href:config_1,title:"RE:DOM",class:"self-center w-24 mb-8",rel:"prerender"},this.logo=el("img",{src:"./static/images/redomjs.svg",alt:"RE:DOM Logo"})),this.search=el("input",{class:"border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-sm bg-gray-200 py-3 pr-4 pl-4 block w-full appearance-none leading-normal",placeholder:"Search the docs (Press \"Enter\" to focus)",type:"text",value:"","aria-Label":"search input"})),el("nav",{role:"navigation"},this.nav=el("ul"))),this.list=list(this.nav,Link$1),document.addEventListener("keypress",e=>{"Enter"===e.key&&this.search.focus()}),this.search.oninput=()=>{this.onSearch(this.search.value)},this.el.addEventListener("on:click-item",()=>{this.search.value=""})}onSearch(e){if(1<e.length){const t=[];config_9.map(r=>{r.text.toUpperCase().includes(e.toUpperCase())&&t.push(r),r.children&&r.children.length&&r.children.map(r=>{r.text.toUpperCase().includes(e.toUpperCase())&&t.push(r)})}),this.update(t,this._current)}else this.update(config_9,this._current)}update(e){this.list.update(e)}}class Main{constructor(){this.el=el("main#main",{class:"lg:flex w-full mx-auto m-auto"},this.aside=el("aside#sidebar",{class:"h-screen bg-gray-100 z-40 hidden fixed top-0 h-full w-full lg:sticky lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block"},this.sideNav=new SideBar),this.content=el("div#content",{class:"bg-white min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 px-6"})),document.addEventListener("on:click-button",()=>{this.aside.classList.toggle("hidden")}),document.addEventListener("on:click-item",()=>{this.aside.classList.toggle("hidden")}),this.update()}update(){config_9.map(e=>e.path===location.hash?void(this._current=e):void(e.children.length&&e.children.map(e=>{e.path===location.hash&&(this._current=e)}))),this.sideNav.update(config_9),new Markdown(this._current.link,this.content)}}class Doc{constructor(){this.el=el("div",{class:"bg-gray-100"},this.header=new Header,this.main=new Main)}update(){this.main.update()}}const app=router("div#app",{home:Home,doc:Doc});window.location.hash?app.update("doc",data):app.update("home",data),window.addEventListener("hashchange",()=>{window.scroll(0,0),window.location.hash?app.update("doc",data):app.update("home",data)}),mount(document.body,app,document.body.querySelector("script"));

(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n(1),o=n.n(i),a=n(10),s=n.n(a),l=(n(16),n(17),n(6)),r=n(2),h=function(e){for(var t="",n=0;n<e.length;n++)" "!==e[n]&&(t+=e[n]);switch(t[t.length-1]){case".":case"^":case"*":case"/":case"+":case"-":return NaN}for(var c=[],i=0;i<t.length;i++)"("===t[i]?c.push(t[i]):")"===t[i]&&c.length>0&&"("===c[c.length-1]&&c.pop();if(c.length>0)return NaN;for(var o=[],a=[],s="",l=0;l<t.length;l++)if("("!==t[l])if(")"!==t[l])if("*"===t[l]||"/"===t[l]||"+"===t[l]||"-"===t[l]&&s.length>0||"^"===t[l]){if(s.length>0&&(o.push(s),s=""),o.length>=2){if(a.length>0&&"^"===a[a.length-1]){var r=o.pop(),h=o.pop(),u=a.pop();void 0!==r&&void 0!==h&&void 0!==u&&o.push(h+" "+r+u)}if(a.length>0&&("*"===a[a.length-1]||"/"===a[a.length-1])&&"^"!==t[l]){var p=o.pop(),j=o.pop(),d=a.pop();void 0!==p&&void 0!==j&&void 0!==d&&o.push(p+" "+j+d)}if(a.length>0&&("+"===a[a.length-1]||"-"===a[a.length-1])&&"*"!==t[l]&&"/"!==t[l]&&"^"!==t[l]){var b=o.pop(),v=o.pop(),f=a.pop();void 0!==b&&void 0!==v&&void 0!==f&&o.push(v+" "+b+f)}}a.push(t[l])}else s+=t[l];else{if(s.length>0&&(o.push(s),s=""),"("!==a[a.length-1])for(;a.length>0&&"("!==a[a.length-1];){var g=o.pop(),x=o.pop(),O=a.pop();if(void 0!==g&&void 0!==x&&void 0!==O)switch(O){case"^":case"+":case"-":o.push(x+" "+g+O);break;case"*":case"/":o.push(g+" "+x+O)}}else{var k=o.pop();void 0!==k&&(s=k)}"("===a[a.length-1]&&a.pop()}else a.push(t[l]);s.length>0&&o.push(s);for(var C=0;a.length>0&&o.length>=2;){if(++C>=3e3)throw new Error("inf loop");if(a.length>0&&"^"===a[a.length-1]){var m=o.pop(),y=o.pop(),N=a.pop();void 0!==m&&void 0!==y&&void 0!==N&&o.push(y+" "+m+N)}if(a.length>0&&("*"===a[a.length-1]||"/"===a[a.length-1])){var w=o.pop(),M=o.pop(),$=a.pop();void 0!==w&&void 0!==M&&void 0!==$&&o.push(w+" "+M+$)}if(a.length>0&&("+"===a[a.length-1]||"-"===a[a.length-1])){var F=o.pop(),S=o.pop(),E=a.pop();void 0!==F&&void 0!==S&&void 0!==E&&o.push(S+" "+F+E)}}var D=o.pop(),J=[],L="";if(void 0!==D)for(var T=0;T<D.length;T++)if(J.length>0&&("+"===D[T]||"-"===D[T]&&(L.length>0||isNaN(parseInt(D[T+1]))||T+1===D.length)||"*"===D[T]||"/"===D[T]||"^"===D[T])){L.length>0&&(J.push(parseFloat(L)),L="");var A=J.pop(),B=J.pop();if(void 0!==A&&void 0!==B)switch(D[T]){case"+":J.push(B+A);break;case"-":J.push(B-A);break;case"*":J.push(A*B);break;case"/":J.push(A/B);break;case"^":J.push(Math.pow(B,A))}}else" "===D[T]?L.length>0&&(J.push(parseFloat(L)),L=""):L+=D[T];return 0===J.length&&void 0!==D&&J.push(parseFloat(D)),J[0]};n(18);var u=function(e){var t=Object(i.useState)(""),n=Object(r.a)(t,2),o=n[0],a=n[1],s=Object(i.useState)(0),l=Object(r.a)(s,2),h=l[0],u=l[1];return Object(i.useEffect)((function(){a(e.expr),u(e.evaluate(e.expr))}),[e.expr]),Object(c.jsxs)("div",{className:"type-area",children:[Object(c.jsx)("input",{type:"text",className:"in",onChange:function(t){a(t.target.value),u(e.evaluate(t.target.value)),e.history[e.index]=t.target.value,e.changeDisp(t)},value:o,onKeyDown:function(t){"Backspace"===t.key&&0===o.length&&e.del(e.index)},onFocus:e.changeDisp}),Object(c.jsx)("div",{className:"answer",children:o.length>0&&!o.match(/^[A-Za-z]+$/)&&void 0!==h&&!isNaN(h)?"= "+h:""})]})},p=n(9),j=n.n(p);n(26);var d=function(){var e=Object(i.useState)(""),t=Object(r.a)(e,2),n=t[0],o=t[1],a=Object(i.useState)(0),s=Object(r.a)(a,2),p=s[0],d=s[1],b=Object(i.useState)([]),v=Object(r.a)(b,2),f=v[0],g=v[1],x=Object(i.useState)(""),O=Object(r.a)(x,2),k=O[0],C=O[1],m=function(e){f.splice(e,1),g(Object(l.a)(f))},y=function(e){C("$$"+e.target.value+"$$")};return Object(c.jsxs)("div",{id:"calc",children:[Object(c.jsx)("div",{id:"display",children:Object(c.jsx)(j.a.Context,{input:"ascii",onError:function(e,t){console.warn(t),console.log("Encountered a MathJax error, re-attempting a typeset!"),e.Hub.Queue(e.Hub.Typeset())},script:"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML",options:{asciimath2jax:{useMathMLspacing:!0,delimiters:[["$$","$$"]],preview:"none"},styles:{"#MathJax_Message":{display:"none"}}},children:Object(c.jsx)(j.a.Text,{text:k})})}),Object(c.jsxs)("div",{className:"type-area",children:[Object(c.jsx)("input",{type:"text",className:"in",id:"math",onFocus:y,onChange:function(e){o(e.target.value),d(h(e.target.value)),y(e)},value:n,onKeyDown:function(e){if("Enter"===e.key){var t=Object(l.a)(f);t.push(n),g(t)}}}),Object(c.jsx)("div",{className:"answer",children:n.length>0&&!n.match(/^[A-Za-z]+$/)&&void 0!==p&&!isNaN(p)?"= "+p:""})]}),Object(c.jsx)("div",{id:"operations",children:Object(c.jsxs)("div",{id:"numbers",children:[Object(c.jsx)("button",{onClick:function(){o(n+7),d(h(n+7))},children:"7"}),Object(c.jsx)("button",{onClick:function(){o(n+8),d(h(n+8))},children:"8"}),Object(c.jsx)("button",{onClick:function(){o(n+9),d(h(n+9))},children:"9"}),Object(c.jsx)("button",{onClick:function(){o(n+4),d(h(n+4))},children:"4"}),Object(c.jsx)("button",{onClick:function(){o(n+5),d(h(n+5))},children:"5"}),Object(c.jsx)("button",{onClick:function(){o(n+6),d(h(n+6))},children:"6"}),Object(c.jsx)("button",{onClick:function(){o(n+1),d(h(n+1))},children:"1"}),Object(c.jsx)("button",{onClick:function(){o(n+2),d(h(n+2))},children:"2"}),Object(c.jsx)("button",{onClick:function(){o(n+3),d(h(n+3))},children:"3"}),Object(c.jsx)("button",{onClick:function(){o(n+0),d(h(n+0))},children:"0"}),Object(c.jsx)("button",{onClick:function(){o(n+"."),d(h(n+"."))},children:Object(c.jsx)("b",{children:"."})}),Object(c.jsx)("button",{onClick:function(){var e=Object(l.a)(f);e.push(n),g(e)},children:"Enter"}),Object(c.jsx)("button",{onClick:function(){o(n+" + "),d(h(n+" + "))},children:"+"}),Object(c.jsx)("button",{onClick:function(){o(n+" - "),d(h(n+" - "))},children:"\u2212"}),Object(c.jsx)("button",{onClick:function(){o(n+" * "),d(h(n+" * "))},children:"\xd7"}),Object(c.jsx)("button",{onClick:function(){o(n+" / "),d(h(n+" / "))},children:"\xf7"})]})}),Object(c.jsx)("div",{id:"history",children:f.map((function(e,t){return Object(c.jsx)(u,{changeDisp:y,evaluate:h,del:m,index:t,expr:e,history:f},t)}))})]})};var b=function(){return Object(c.jsx)(d,{})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,28)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),i(e),o(e),a(e)}))};s.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(b,{})}),document.getElementById("root")),v()}},[[27,1,2]]]);
//# sourceMappingURL=main.0105a4a2.chunk.js.map
(this["webpackJsonptest-comments-"]=this["webpackJsonptest-comments-"]||[]).push([[0],{105:function(e,t,n){},106:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(8),o=n.n(c),i=n(20),s=n.n(i),u=n(34),l=n(38),m=n(21),p=n(142),d=n(143),b=n(137),j=n(152),f=n(149),h=n(7),x=Object(b.a)({form:{display:"flex",flexDirection:"column",alignItems:"start",marginTop:"30px"},input:{marginBottom:"15px",width:"320px"},button:{marginBottom:"10px",width:"120px"}}),O=function(e){var t=e.onSubmit,n=x(),r=Object(a.useState)(""),c=Object(m.a)(r,2),o=c[0],i=c[1],s=Object(a.useState)(""),u=Object(m.a)(s,2),l=u[0],b=u[1];return Object(h.jsxs)("form",{className:n.form,onSubmit:function(e){e.preventDefault(),t({name:o,text:l}),i(""),b("")},children:[Object(h.jsx)(j.a,{children:Object(h.jsx)(f.a,{onChange:function(e){i(e.target.value)},type:"text",name:"name",className:n.input,required:!0,placeholder:"Input you name",label:"Name","aria-labelledby":"user name",variant:"outlined",value:o,size:"medium"})}),Object(h.jsx)(j.a,{children:Object(h.jsx)(f.a,{onChange:function(e){b(e.target.value)},type:"text",name:"comment",className:n.input,value:l,required:!0,placeholder:"Input your comment",id:"outlined-multiline-static",label:"Comment","aria-labelledby":"user comment",multiline:!0,rows:4,variant:"outlined"})}),Object(h.jsx)(p.a,{type:"submit","aria-label":"send comment",className:n.button,variant:"contained",color:"primary",size:"large",endIcon:Object(h.jsx)(d.a,{children:"send"}),children:"Send"})]})},g=n(45),v=n.n(g);v.a.defaults.baseURL="https://jordan.ashton.fashion/api";var y={getComments:function(){var e=Object(u.a)(s.a.mark((function e(){var t,n,a,r,c,o,i=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:1,n="/goods/30/comments?page=".concat(t),e.prev=2,e.next=5,v.a.get(n);case 5:return a=e.sent,r=a.data,c=r.current_page,o=r.last_page,e.abrupt("return",{data:r,last_page:o,current_page:c});case 11:e.prev=11,e.t0=e.catch(2),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(){return e.apply(this,arguments)}}(),addComment:function(){var e=Object(u.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.post("/goods/30/comments",t);case 3:return n=e.sent,e.abrupt("return",n);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},w=n(151),C=n(148),N=n(150),S=Object(b.a)({Container:{maxWidth:"1200px",padding:"0 15px",margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center"}}),k=function(e){var t=e.children,n=S();return Object(h.jsx)("div",{className:n.Container,children:t})},I=n(141),_=n(144),B=n(145),T=n(146),W=n(147),z=n(46),L=(n(103),Object(b.a)({button:{marginTop:"15px",marginBottom:"40px"},contentWrap:{width:"550px",wordWrap:"break-word",backgroundColor:"rgba(150, 147, 245, 0.5)"},dataList:{display:"grid",gridTemplateColumns:"1fr 1fr"},pagination:{marginBottom:"60px"}}));var D=function(){var e=L(),t=Object(a.useState)([]),n=Object(m.a)(t,2),r=n[0],c=n[1],o=Object(a.useState)(1),i=Object(m.a)(o,2),d=i[0],b=i[1],j=Object(a.useState)(0),f=Object(m.a)(j,2),x=f[0],g=f[1],v=Object(a.useState)(!1),S=Object(m.a)(v,2),D=S[0],E=S[1];Object(a.useEffect)((function(){E(!0);y.getComments(d).then((function(e){var t=e.data,n=e.current_page,a=e.last_page;b(n),g(a),c((function(e){return 0===r.length?Object(l.a)(t.data):[].concat(Object(l.a)(e),Object(l.a)(t.data))})),d===x&&z.c.info("Oops ... Pages run out. There is nowhere to scroll further")})).finally((function(){E(!1),d>1&&window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})}))}),[d,x]);var J=function(){var e=Object(u.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.addComment(t).then((function(e){var t=e.config;return JSON.parse(t.data)}));case 2:n=e.sent,c([n].concat(Object(l.a)(r)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)(k,{children:[Object(h.jsx)(O,{onSubmit:J}),!D&&Object(h.jsx)(I.a,{className:e.dataList,children:r.map((function(t){var n=t.name,a=t.text;return Object(h.jsx)(_.a,{children:Object(h.jsxs)(B.a,{children:[Object(h.jsxs)(T.a,{className:e.contentWrap,children:["Name: ",n]}),Object(h.jsxs)(T.a,{className:e.contentWrap,children:["Comment: ",a]})]})},Object(w.a)())}))}),D&&Object(h.jsx)(W.a,{}),!D&&d!==x&&Object(h.jsx)(p.a,{size:"medium",type:"submit",variant:"outlined",color:"primary",className:e.button,"aria-label":"load more",endIcon:Object(h.jsx)(C.a,{children:"send"}),onClick:function(){b((function(e){return D?d:e+1}))},children:"Load more"}),!D&&Object(h.jsx)(N.a,{className:e.pagination,count:x,page:d,onChange:function(e,t){if(D)return b(d);b(t),r.length&&c((function(e){return e.splice(0,e.length)}),r)},color:"primary",size:"large",siblingCount:2}),Object(h.jsx)(z.a,{autoClose:4e3,transition:z.b})]})};n(104),n(105);o.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(D,{})}),document.getElementById("root"))}},[[106,1,2]]]);
//# sourceMappingURL=main.76bcf5fb.chunk.js.map
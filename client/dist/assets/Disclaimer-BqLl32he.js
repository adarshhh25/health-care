import{c as l,r as i,j as e,a as m}from"./index-BSYKhbqh.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=l("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=l("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),b=i.forwardRef(({label:s,error:r,helperText:a,className:t="",required:o=!1,rows:d=4,...c},n)=>e.jsxs("div",{className:`w-full ${t}`,children:[s&&e.jsxs("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:[s,o&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx("textarea",{ref:n,rows:d,className:`
          w-full px-4 py-3 
          border rounded-xl
          bg-[var(--color-surface)] text-[var(--color-text-primary)]
          placeholder-[var(--color-text-tertiary)]
          border-[var(--color-border)]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
          resize-none
          hover:border-[var(--color-border-hover)]
          ${r?"border-red-500/50 focus:ring-red-500/50 bg-red-900/10":""}
        `,...c}),(r||a)&&e.jsx("p",{className:`mt-2 text-sm ${r?"text-red-600":"text-gray-500"}`,children:r||a})]}));b.displayName="Textarea";const h=({className:s="",variant:r="default"})=>{const{t:a}=m(),t={default:"bg-amber-900/20 border-amber-800 text-amber-100",subtle:"bg-gray-800/50 border-gray-700 text-gray-300",prominent:"bg-blue-900/20 border-blue-800 text-blue-100"};return e.jsx("div",{className:`
      ${t[r]} 
      border-2 rounded-xl p-4 
      ${s}
    `,children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(x,{className:"w-5 h-5 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"text-sm leading-relaxed",children:[e.jsx("p",{className:"font-semibold mb-1",children:a("common.disclaimer.title")}),e.jsx("p",{children:a("common.disclaimer.desc")})]})]})})};export{h as D,p as L,b as T,x as a};

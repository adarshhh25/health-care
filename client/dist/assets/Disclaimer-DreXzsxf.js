import{c as l,r as i,j as e,a as m}from"./index-Dz-RQC1z.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=l("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=l("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),b=i.forwardRef(({label:r,error:a,helperText:s,className:t="",required:d=!1,rows:o=4,...c},n)=>e.jsxs("div",{className:`w-full ${t}`,children:[r&&e.jsxs("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:[r,d&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx("textarea",{ref:n,rows:o,className:`
          w-full px-4 py-3 
          border-2 rounded-xl
          text-gray-900 placeholder-gray-400
          transition-all duration-200
          focus:outline-none focus:ring-0
          resize-none
          ${a?"border-red-300 focus:border-red-500 bg-red-50":"border-gray-200 focus:border-[#2B6CB0] hover:border-gray-300"}
        `,...c}),(a||s)&&e.jsx("p",{className:`mt-2 text-sm ${a?"text-red-600":"text-gray-500"}`,children:a||s})]}));b.displayName="Textarea";const p=({className:r="",variant:a="default"})=>{const{t:s}=m(),t={default:"bg-amber-50 border-amber-200 text-amber-800",subtle:"bg-gray-50 border-gray-200 text-gray-600",prominent:"bg-blue-50 border-blue-200 text-blue-800"};return e.jsx("div",{className:`
      ${t[a]} 
      border-2 rounded-xl p-4 
      ${r}
    `,children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(x,{className:"w-5 h-5 flex-shrink-0 mt-0.5"}),e.jsxs("div",{className:"text-sm leading-relaxed",children:[e.jsx("p",{className:"font-semibold mb-1",children:s("common.disclaimer.title")}),e.jsx("p",{children:s("common.disclaimer.desc")})]})]})})};export{p as D,h as L,b as T,x as a};

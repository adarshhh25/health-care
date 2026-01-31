import{c as m,r as x,j as e}from"./index-BSYKhbqh.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=m("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),p=x.forwardRef(({label:s,error:r,helperText:a,icon:t,type:l="text",className:o="",required:c=!1,...n},d)=>e.jsxs("div",{className:`w-full ${o}`,children:[s&&e.jsxs("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:[s,c&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("div",{className:"relative",children:[t&&e.jsx("div",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400",children:e.jsx(t,{className:"w-5 h-5"})}),e.jsx("input",{ref:d,type:l,className:`
            w-full px-4 py-3 
            ${t?"pl-12":""}
            border rounded-xl
            bg-[var(--color-surface)] text-[var(--color-text-primary)] 
            placeholder-[var(--color-text-tertiary)]
            border-[var(--color-border)]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            hover:border-[var(--color-border-hover)]
            ${r?"border-red-500/50 focus:ring-red-500/50 bg-red-900/10":""}
          `,...n})]}),(r||a)&&e.jsx("p",{className:`mt-2 text-sm ${r?"text-red-600":"text-gray-500"}`,children:r||a})]}));p.displayName="Input";const v=x.forwardRef(({label:s,error:r,helperText:a,options:t=[],placeholder:l="Select an option",className:o="",required:c=!1,...n},d)=>e.jsxs("div",{className:`w-full ${o}`,children:[s&&e.jsxs("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:[s,c&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("select",{ref:d,className:`
            w-full px-4 py-3 pr-10
            border rounded-xl
            bg-[var(--color-surface)] text-[var(--color-text-primary)]
            border-[var(--color-border)]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            appearance-none cursor-pointer
            hover:border-[var(--color-border-hover)]
            ${r?"border-red-500/50 focus:ring-red-500/50 bg-red-900/10":""}
          `,...n,children:[e.jsx("option",{value:"",disabled:!0,children:l}),t.map(i=>e.jsx("option",{value:i.value,children:i.label},i.value))]}),e.jsx("div",{className:"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400",children:e.jsx(u,{className:"w-5 h-5"})})]}),(r||a)&&e.jsx("p",{className:`mt-2 text-sm ${r?"text-red-600":"text-gray-500"}`,children:r||a})]}));v.displayName="Select";export{u as C,p as I,v as S};

import{c as m,r as x,j as e}from"./index-67fEfVSB.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=m("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),p=x.forwardRef(({label:a,error:s,helperText:r,icon:t,type:l="text",className:n="",required:d=!1,...o},c)=>e.jsxs("div",{className:`w-full ${n}`,children:[a&&e.jsxs("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:[a,d&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("div",{className:"relative",children:[t&&e.jsx("div",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400",children:e.jsx(t,{className:"w-5 h-5"})}),e.jsx("input",{ref:c,type:l,className:`
            w-full px-4 py-3 
            ${t?"pl-12":""}
            border-2 rounded-xl
            text-gray-900 placeholder-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-0
            ${s?"border-red-300 focus:border-red-500 bg-red-50":"border-gray-200 focus:border-[#2B6CB0] hover:border-gray-300"}
          `,...o})]}),(s||r)&&e.jsx("p",{className:`mt-2 text-sm ${s?"text-red-600":"text-gray-500"}`,children:s||r})]}));p.displayName="Input";const b=x.forwardRef(({label:a,error:s,helperText:r,options:t=[],placeholder:l="Select an option",className:n="",required:d=!1,...o},c)=>e.jsxs("div",{className:`w-full ${n}`,children:[a&&e.jsxs("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:[a,d&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("select",{ref:c,className:`
            w-full px-4 py-3 pr-10
            border-2 rounded-xl
            text-gray-900
            transition-all duration-200
            focus:outline-none focus:ring-0
            appearance-none cursor-pointer
            ${s?"border-red-300 focus:border-red-500 bg-red-50":"border-gray-200 focus:border-[#2B6CB0] hover:border-gray-300 bg-white"}
          `,...o,children:[e.jsx("option",{value:"",disabled:!0,children:l}),t.map(i=>e.jsx("option",{value:i.value,children:i.label},i.value))]}),e.jsx("div",{className:"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400",children:e.jsx(u,{className:"w-5 h-5"})})]}),(s||r)&&e.jsx("p",{className:`mt-2 text-sm ${s?"text-red-600":"text-gray-500"}`,children:s||r})]}));b.displayName="Select";export{u as C,p as I,b as S};

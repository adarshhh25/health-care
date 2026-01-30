import{m as d,j as p}from"./index-Dz-RQC1z.js";const m=({children:r,className:e="",hover:o=!0,padding:i="default",animate:t=!0})=>{const n={none:"",sm:"p-4",default:"p-6 sm:p-8",lg:"p-8 sm:p-10"},s=t?d.div:"div",a=t?{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"},transition:{duration:.5},whileHover:o?{y:-4}:{}}:{};return p.jsx(s,{className:`
        bg-white rounded-2xl border border-gray-100 
        ${n[i]}
        ${o?"hover:shadow-xl hover:border-blue-100":"shadow-sm"} 
        transition-all duration-300 
        ${e}
      `,...a,children:r})};export{m as C};

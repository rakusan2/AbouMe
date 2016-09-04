interface skill{
    name:string,
    description?:string,
    img?:string,
    div?:HTMLDivElement
}
const activeKey = 'active';
let skils :skill[]= [
    {name:'Basic Vim'},
    {name:'HTML through Pug'},
    {name:'CSS through SCSS'},
    {name:'Typescript'},
    {name:'C'},
    {name:'Java'},
]
let input:HTMLDivElement
window.onload = (ev)=>{
    let sbody = document.getElementById('sbody'),
        sbodyFrag = document.createDocumentFragment();
    for(let i = 0; i <skils.length;i++){
        skils[i].div=skilToCard(skils[i])
       sbodyFrag.appendChild(skils[i].div);
    }
    sbody.innerHTML="";
    sbody.appendChild(sbodyFrag);
    input = document.getElementById("input")as HTMLDivElement;
    input.oninput = search;
    
}
function skilToCard(s:skill):HTMLDivElement{
    let frag = document.createElement('div'),
        name = document.createElement('div');
    name.classList.add('name');
    name.textContent = s.name;
    frag.appendChild(name);
    frag.classList.add(activeKey);
    return frag;
}
function checkChangeClass(div:HTMLDivElement,active:Boolean | string){
    if(div.classList.contains(activeKey)){
        if(!active)div.classList.remove(activeKey);
    }
    else if(active)div.classList.add(activeKey);
    console.log({contains:div.classList.contains(activeKey),active})
}
function search(ev:Event){
    let regSearch = new RegExp(input.textContent,'i'),s:skill;
    for(let i = 0; i < skils.length;i++){
        s = skils[i];
        checkChangeClass(s.div,s.name.search(regSearch)>= 0 || (s.description && s.description.search(regSearch) >=0));
    }
}
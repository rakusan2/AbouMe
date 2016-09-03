interface skill{
    name:string,
    description?:string,
    img?:string
}
let skils :skill[]= [
    {name:'Basic Vim'},
    {name:'HTML through Pug'},
    {name:'CSS through SCSS'},
    {name:'Typescript'},
    {name:'C'},
    {name:'Java'},
]
window.onload = (ev)=>{
    let input = document.getElementById('sbody'),
        inputFrag = document.createDocumentFragment();
    for(let i = 0; i <skils.length;i++){
       inputFrag.appendChild(skilToCard(skils[i]));
    }
    input.innerHTML="";
    input.appendChild(inputFrag);
}
function skilToCard(s:skill):HTMLDivElement{
    let frag = document.createElement('div'),
        name = document.createElement('div');
    name.classList.add('name');
    frag.appendChild(name);
    return frag;
}
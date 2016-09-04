var activeKey = 'active';
var skils = [
    { name: 'Basic Vim' },
    { name: 'HTML through Pug' },
    { name: 'CSS through SCSS' },
    { name: 'Typescript' },
    { name: 'C' },
    { name: 'Java' },
];
var input;
window.onload = function (ev) {
    var sbody = document.getElementById('sbody'), sbodyFrag = document.createDocumentFragment();
    for (var i = 0; i < skils.length; i++) {
        skils[i].div = skilToCard(skils[i]);
        sbodyFrag.appendChild(skils[i].div);
    }
    sbody.innerHTML = "";
    sbody.appendChild(sbodyFrag);
    input = document.getElementById("input");
    input.oninput = search;
};
function skilToCard(s) {
    var frag = document.createElement('div'), name = document.createElement('div');
    name.classList.add('name');
    name.textContent = s.name;
    frag.appendChild(name);
    frag.classList.add(activeKey);
    return frag;
}
function checkChangeClass(div, active) {
    if (div.classList.contains(activeKey)) {
        if (!active)
            div.classList.remove(activeKey);
    }
    else if (active)
        div.classList.add(activeKey);
    console.log({ contains: div.classList.contains(activeKey), active: active });
}
function search(ev) {
    var regSearch = new RegExp(input.textContent, 'i'), s;
    for (var i = 0; i < skils.length; i++) {
        s = skils[i];
        checkChangeClass(s.div, s.name.search(regSearch) >= 0 || (s.description && s.description.search(regSearch) >= 0));
    }
}

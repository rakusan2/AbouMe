var skils = [
    { name: 'Basic Vim' },
    { name: 'HTML through Pug' },
    { name: 'CSS through SCSS' },
    { name: 'Typescript' },
    { name: 'C' },
    { name: 'Java' },
];
window.onload = function (ev) {
    var input = document.getElementById('sbody'), inputFrag = document.createDocumentFragment();
    for (var i = 0; i < skils.length; i++) {
        inputFrag.appendChild(skilToCard(skils[i]));
    }
    input.innerHTML = "";
    input.appendChild(inputFrag);
};
function skilToCard(s) {
    var frag = document.createElement('div'), name = document.createElement('div');
    name.classList.add('name');
    frag.appendChild(name);
    return frag;
}

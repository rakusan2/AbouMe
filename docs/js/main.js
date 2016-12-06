//const activeKey = 'active';
var hideKey = 'hide';
var skills = [
    {
        name: 'Go',
        description: 'I have learned this just for trying out a new language which later became one of the languages that I used during the IEEEXtreme Programming competition',
        date: 'Late September of 2016'
    },
    {
        name: 'HTML through Pug',
        description: 'I have started using pug to decrease the the repetitive code creation and now I am also using it to add scripts that are only needed during testing',
        date: 'June of 2016'
    },
    {
        name: 'CSS through SCSS',
        description: 'SCSS enables me to nest my css code and use variables for repeated values',
        date: 'June of 2016'
    },
    {
        name: 'Typescript',
        description: 'A version of JavaScript which can be transpiled to older versions of JS while keeping me avare of properties I want in an object, types that the properties or parameters can use, spelling of a name, and more',
        date: 'June of 2016'
    },
    {
        name: 'Basic Vim',
        description: 'This is currently my go to text editor in linux',
        date: 'October of 2015'
    },
    {
        name: 'Git',
        description: 'Originally learned to colaborate with the programming portion of my high schools robotics team',
        date: 'January of 2015'
    },
    {
        name: 'Java',
        description: 'Used for programming an FRC robot for my schools robotics team',
        date: 'October of 2013'
    },
    {
        name: 'C#',
        description: 'Learned for the purpose of competing in a regional highschool level programming competition butonly truly used to transfer data to an Arduino and solve a Pic-A-Pix puzzle',
        date: 'July of 2012'
    },
    {
        name: 'C',
        description: 'I have been playing around with an Arduino since I was 15 years old and have taken a basic Programming course in University.',
        date: 'December of 2011'
    },
    {
        name: 'Turing',
        description: 'First Programming language I have ever learned',
        date: 'November of 2011'
    }
];
var input;
window.onload = function (ev) {
    var sbody = document.getElementById('sbody'), sbodyFrag = document.createDocumentFragment();
    for (var i = 0; i < skills.length; i++) {
        skills[i].div = skilToCard(skills[i]);
        sbodyFrag.appendChild(skills[i].div);
    }
    sbody.innerHTML = "";
    sbody.appendChild(sbodyFrag);
    input = document.getElementById("input");
    input.oninput = search;
};
function skilToCard(s) {
    var frag = document.createElement('div'), name = document.createElement('div'), desc = document.createElement('div'), date = document.createElement('div');
    name.classList.add('name');
    name.textContent = s.name;
    frag.appendChild(name);
    if (s.description) {
        desc.classList.add('desc');
        desc.textContent = s.description;
        frag.appendChild(desc);
    }
    if (s.date) {
        date.classList.add('date');
        date.textContent = s.date;
        frag.appendChild(date);
    }
    frag.tabIndex = 1;
    frag.onclick = function () { return frag.focus(); };
    return frag;
}
function checkChangeClass(div, active) {
    if (div.classList.contains(hideKey)) {
        if (active) {
            div.classList.remove(hideKey);
            div.tabIndex = 1;
        }
    }
    else if (!active) {
        div.classList.add(hideKey);
        div.removeAttribute('tabIndex');
    }
    console.log({ contains: div.classList.contains(hideKey), active: active });
}
function search(ev) {
    var regSearch = new RegExp(input.textContent, 'i'), s;
    for (var i = 0; i < skills.length; i++) {
        s = skills[i];
        checkChangeClass(s.div, s.name.search(regSearch) >= 0 || (s.description && s.description.search(regSearch) >= 0));
    }
}

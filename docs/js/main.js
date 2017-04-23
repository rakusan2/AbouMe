//const activeKey = 'active';
var hideKey = 'hide';
var input;
var skills = [];
window.onload = function (ev) {
    var sbody = document.getElementById('sbody');
    var _loop_1 = function (i, cards) {
        var card = cards[i];
        if (card instanceof HTMLDivElement) {
            card.oninput = function () { return card.focus(); };
            var s = {};
            for (var i_1 = 0, skil = card.children; i_1 < skil.length; i_1++) {
                var y = skil[i_1];
                if ('type' in y.dataset) {
                    s[y.dataset['type']] = y.firstChild.data;
                }
            }
            s.div = card;
            skills.push(s);
        }
    };
    for (var i = 0, cards = sbody.children; i < cards.length; i++) {
        _loop_1(i, cards);
    }
    input = document.getElementById("input");
    input.oninput = search;
};
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

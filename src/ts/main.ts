interface Skill {
    name?: string;
    description?: string;
    date?: string;
    img?: string;
    div?: HTMLDivElement;
}
//const activeKey = 'active';
const hideKey = 'hide';
let input: HTMLDivElement;
let skills: Skill[] = []
window.onload = (ev) => {
    let sbody = document.getElementById('sbody')
    for (let i = 0, cards = sbody.children; i < cards.length; i++) {
        let card = cards[i]
        if (card instanceof HTMLDivElement) {
            card.oninput = () => (<HTMLDivElement>card).focus()
            let s: Skill = {}
            for (let i = 0, skil = card.children; i < skil.length; i++) {
                let y = <HTMLDivElement>skil[i]
                if ('type' in y.dataset) {
                    s[y.dataset['type']] = (<Text>y.firstChild).data
                }
            }
            s.div = card
            skills.push(s)
        }
    }
    input = document.getElementById("input") as HTMLDivElement;
    input.oninput = search;
};
function checkChangeClass(div: HTMLDivElement, active: Boolean | string) {
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
    console.log({ contains: div.classList.contains(hideKey), active });
}
function search(ev: Event) {
    let regSearch = new RegExp(input.textContent, 'i'), s: Skill;
    for (let i = 0; i < skills.length; i++) {
        s = skills[i];
        checkChangeClass(s.div, s.name.search(regSearch) >= 0 || (s.description && s.description.search(regSearch) >= 0));
    }
}
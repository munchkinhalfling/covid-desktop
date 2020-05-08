
// Created by css.js
// JavaScript Template
export function hide(elem) {
    elem.classList.add('hidden');
}
export function unhide(elem) {
    elem.classList.remove('hidden');
}
// CSS Loader
const styles = [`.hidden {
    display: none;
}`];
const styleElem = document.createElement('style');
styleElem.setAttribute('data-cssjs-stylesheet-file', "app.css");
document.head.appendChild(styleElem);
styles.forEach(rule => {
    styleElem.sheet.insertRule(rule, styleElem.sheet.cssRules.length);
});

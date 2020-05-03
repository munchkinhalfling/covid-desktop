import {Component, renderUtils, render as tacocatRender} from './jspm_packages/npm/tacocat@1.0.0/tacocat.js';
import {MTCDialog, MTCButton} from './material-tacocat.js';
const row = ['mdc-data-table__row'];
const cellCss = ['mdc-data-table__cell'];
class Cell extends Component {
    render({tag, text}) {
        return tag('td', {
            children: (this.children.length == 0? [
                text(this.options.text || '')
            ] : this.children),
            cssClasses: cellCss
        })
    }
}
export default class DataRow extends Component {
    covidSiteClicked() {
        window.open(this.covid19site);
    }
    moreInfoClicked() {
        this.popup.open();
    }
    componentCreated() {
        const {apiResult, stateInfo, covid19siteTitle} = this.options;
        const {tag, text} = renderUtils;
        this.state = apiResult.state || "Unknown";
        this.totalTests = apiResult.totalTestResults || "Unknown";
        this.positive = apiResult.positive || "Unknown";
        this.negative = apiResult.negative || "Unknown";
        this.hospitalized = apiResult.hospitalized || "Unknown";
        this.death = apiResult.death || "Unknown";
        this.covid19site = stateInfo.covid19Site || "Unknown";
        this.popup = new MTCDialog({
            children: [
                tag('h2', {
                    cssClasses: ['mdc-dialog__title'],
                    style: {
                        'text-align': 'center'
                    },
                    children: [
                        text(`Data for ${stateInfo.name}`)
                    ]
                }),
                tag('div', {
                    cssClasses: ['mdc-dialog__content'],
                    style: {
                        'display': 'grid',
                        'grid-auto-columns': '1fr',
                        'grid-auto-flow': 'column',
                        'grid-gap': '12px'
                    },
                    children: [
                        tag('div', {
                            cssClasses: ['mdc-card'],
                            children: [
                                tag('h2', {
                                    cssClasses: ['mdc-card__title'],
                                    style: {
                                        'text-align': 'center'
                                    },
                                    children: [
                                        text('Test Results')
                                    ]
                                }),
                                tag('p', {
                                    style: {
                                        'text-align': 'center'
                                    },
                                    children: [
                                        tag('b', {textContent: 'Total: '}),
                                        text(this.totalTests),
                                        tag('br'),
                                        tag('b', {textContent: 'Positive: '}),
                                        text(this.positive),
                                        tag('br'),
                                        tag('b', {textContent: 'Negative: '}),
                                        text(this.negative)
                                    ]
                                })
                            ]
                        }),
                        tag('div', {
                            cssClasses: ['mdc-card'],
                            children: [
                                tag('h2', {
                                    style: {
                                        'text-align': 'center'
                                    },
                                    children: [
                                        text("Hospitalizations")
                                    ]
                                }),
                                tag('p', {
                                    style: {
                                        'text-align': 'center'
                                    },
                                    children: [
                                        text(this.hospitalized)
                                    ]
                                })
                            ]
                        }),
                        tag('div', {
                            cssClasses: ['mdc-card'],
                            children: [
                                tag('h2', {
                                    style: {
                                        'text-align': 'center'
                                    },
                                    children: [
                                        text('Deaths')
                                    ]
                                }),
                                tag('p', {
                                    style: {
                                        'text-align': 'center'
                                    },
                                    children: [
                                        text(this.death)
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                new MTCButton({
                    text: 'More Info',
                    attributes: {
                        title: this.covid19site
                    },
                    action: this.covidSiteClicked.bind(this)
                }),
                new MTCButton({
                    text: 'Close',
                    buttonType: 'unelevated',
                    action: () => {
                        this.popup.close();
                    }
                })
            ]
        });
    }
    render({tag, text}) {
        tacocatRender(this.popup, document.body);
        return tag('tr', {
            cssClasses: row,
            children: [
                new Cell({text: this.state}),
                new Cell({text: this.positive}),
                new Cell({text: this.death}),
                new Cell({
                    children: [
                        tag('button', {
                            cssClasses: ['mdc-button', 'mdc-button--unelevated'],
                            events: {
                                click: this.moreInfoClicked.bind(this)
                            },
                            children: [
                                tag('div', {
                                    cssClasses: ['mdc-button__ripple']
                                }),
                                tag('span', {
                                    cssClasses: ['mdc-button__label'],
                                    children: [
                                        text("Pop out")
                                    ]
                                })
                            ]
                        }, (elem) => {
                            mdc.ripple.MDCRipple.attachTo(elem);
                        })
                    ]
                })
            ]
        });
    }
}
import * as tc from './jspm_packages/npm/tacocat@1.0.0/tacocat.js';

export class MTCDialog extends tc.Component {
    render({tag, text}) {
        return tag('div', {
            cssClasses: ['mdc-dialog'],
            attributes: this.attributes,
            children: [
                tag('div', {
                    cssClasses: ['mdc-dialog__container'],
                    children: [
                        tag('div', {
                            cssClasses: ['mdc-dialog__surface'],
                            attributes: {
                                'role': 'alertdialog',
                                'aria-modal': 'true'
                            },
                            children: this.children
                        })
                    ]
                }),
                tag('div', {
                    cssClasses: ['mdc-dialog__scrim']
                })
            ]
        }, elem => {
            this.mdcComponent = new mdc.dialog.MDCDialog(elem);
        })
    }
    open() {
        if('mdcComponent' in this) this.mdcComponent.open();
        else throw new Error('Can\'t open an unrendered dialog; try again later...');
    }
    close() {
        if('mdcComponent' in this) this.mdcComponent.close();
        else throw new Error('Can\'t close an unrendered dialog; try again later...');
    }
}
export class MTCButton extends tc.Component {
    render({tag, text}) {
        return tag(this.options.btnElement || "button", {
            cssClasses: ['mdc-button', this.options.buttonType? `mdc-button--${this.options.buttonType.toString().toLowerCase()}` : 'mtc-no-buttontype'],
            style: this.options.style || {},
            attributes: this.attributes,
            children: [
                tag('div', {
                    cssClasses: ['mdc-button__ripple']
                }),
                tag('span', {
                    cssClasses: ['mdc-button__label'],
                    children: [
                        text(this.options.text)
                    ]
                })
            ],
            events: {
                click: this.options.action
            }
        }, elem => {
            mdc.ripple.MDCRipple.attachTo(elem);
        });
    }
}
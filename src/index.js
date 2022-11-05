import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
    static properties = {
        count: 0
    }
    constructor() {
        super();
        this.count = 0;
    }

    render() {
        return html`<button @click=${() => { this.count++; }}>${this.count}</button>`
    }
}

window.customElements.define('my-component', MyComponent);
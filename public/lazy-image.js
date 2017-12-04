class LazyImage extends HTMLElement {

  connectedCallback() {
    this.appendChild(document.createTextNode('Yay! Custom Elements work on this browser'));
  }

}

// Define the new element
customElements.define('lazy-image', LazyImage);

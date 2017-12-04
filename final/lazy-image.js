class LazyImage extends HTMLElement {

  constructor() {
    super(); // always call super() first in the constructor.

    const doc = document.currentScript.ownerDocument; // get the document that owns this script
    const tmpl = doc.querySelector('#ls-img'); // query owner of the script for the template with id 'ls-img'
    this._root = this.attachShadow({
      mode: 'open'
    }); // attach shadow dom tree to this element
    this._root.appendChild(tmpl.content.cloneNode(true)); // attach the template to the shadow-dom of this element
  }

  connectedCallback() {
    this._height = this.getAttribute('height');
    this._width = this.getAttribute('width');
  }
  // Monitor the 'src' attribute for changes.
  static get observedAttributes() {
    return ['src', 'height', 'width'];
  }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    // set attr if there is a new value
    this[attr] = newValue;
    if (attr == 'src') {
      [].forEach.call(this._root.querySelectorAll('img'), img => {
        img.setAttribute('src', newValue);
        img.onload = function() {
          img.style.opacity = 1;
        };
      });
    }
  }

  set height(height) {
    this._height = height;
    this.style.setProperty('--height', height);
    this.setAttribute('height', height);
  }
  get height() {
    return this._height;
  }

  set width(width) {
    this._width = width;
    this.style.setProperty('--width', width);
  }
  get width() {
    return this._width;
  }

}

// Define the new element
customElements.define('lazy-image', LazyImage);

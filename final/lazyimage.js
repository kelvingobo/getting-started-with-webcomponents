class LazyImage extends HTMLElement {
  // Monitor the 'src' attribute for changes.
  static get observedAttributes() {
    return ['src'];
  }

  constructor(){
    super(); // always call super() first in the constructor.

    // attach a shadow root to the element
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>

        :host {
          display: block;
          background-color: #bbb;
        }

        img {
          width: 400px;
          height: 400px;
          opacity: 0;
          transition: opacity 0.5s;
        }

      </style>

      <img>
    `;
  }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    // check if the 'src' attribute has been set or newValue is null
    if (attr !== 'src' || !newValue) {
      return;
    }

    /*
     * query all img elements in this element's shadow root
     * set img src attribute to newValue
     * show img when it has finished loading
    */
    [].forEach.call(this.shadowRoot.querySelectorAll('img'), function(img) {
      img.setAttribute('src', newValue);
      img.onload = function() {
        img.style.opacity = 1;
      };
    });
  }
}

// Define the new element
customElements.define('lazy-image', LazyImage);

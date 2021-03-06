import { LitElement, html, css } from 'lit-element';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { getPlatform } from '@moduware/lit-utils';

/**
 * `morph-tabbar`
 * Tab bar for polymorph components
 *
 * @customElement
 * @extends HTMLElement
 * @demo morph-tabbar/demo/index.html
 */
class MorphTabbar extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          --android-background-color: #0076FF;
          --ios-background-color: #f7f7f8;
          --ios-height: 44px;
          --ios-labeled-height: 50px;
          --android-height: 48px;
          --android-labeled-height: 72px;
          --android-bar-color: rgba(255, 255, 255, .7);
          --ios-bar-color: #c4c4c4;
          --ios-gray-color: #929292;

          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          justify-content: stretch;
          align-items: center;
        }

        :host([hidden]) {
          display: none;
        }

        :host .container ::slotted(*) {
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: 0%;
          opacity: .7;
        }

        :host .container ::slotted([selected]) {
          opacity: 1;
        }

        :host {
          width: 100%;
          font-size: 17px;
          position: relative;
          backface-visibility: hidden;
        }

        :host([platform="ios"]) {
          background: var(--ios-background-color, #929292);
          height: var(--ios-height);
          
          padding: 0 8px;
          color: var(--ios-gray-color);
          transform: translate3d(0, 0, 0);
          font-family: -apple-system, 'SF UI Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        :host([platform="android"]) {
          background: var(--android-background-color, #929292);
          height: var(--android-height);
          color: #fff;
          
          box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .2);
          font-family: Roboto, Noto, Helvetica, Arial, sans-serif;
        }

        :host([platform="ios"][label]) {
          height: var(--ios-labeled-height);
        }

        :host([platform="ios"])::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: auto;
          right: auto;
          height: 1px;
          width: 100%;
          background-color: var(--ios-bar-color);
          display: block;
          z-index: 1;
          transform-origin: 50% 0;
          transform: scaleY(.5);
        }

        :host .container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        }

        :host([platform="ios"]) .container {
          background: var(--ios-background-color);
          padding: 0 8px;
        }

        :host([platform="android"]) .container {
          background: var(--android-background-color);
        }

        :host([platform="android"][label]) {
          height: var(--android-labeled-height);
        }

        :host([platform="ios"]) .tab-highlight {
          display: none
        }

        :host([platform="android"]) .tab-highlight {
          position: absolute;
          left: 0;
          bottom: 0;
          top: auto;
          right: auto;
          height: 3px;
          /* width: 100%; */
          background-color: var(--android-bar-color);
          display: block;
          z-index: 1;
          transform: translate3d(0, 0, 0);
          transition-duration: .3s;
        }

        :host([platform="android"][selected]) .tab-highlight {
          transform: translate3d(-100%, 0, 0);
        }

        
      `
    ];
  }

  render() {
    return html`
      <div class="container">
        <slot id="slot"></slot>
        <span id="highlight" class="tab-highlight"></span>
      </div>
    `;
  }

  static get is() { return 'morph-tabbar'; }

  static get properties() {
    return {
      platform: { 
        type: String,
        reflect: true 
      },
      selected: {
        type: String,
        reflect: true
      },
      label: {
        type: Boolean,
        value: false,
        reflect: true
      },
      tabbarItems: {
        type: Array
      }
    };
  }

  constructor() {
    super();

    this.tabbarItems = [];
  }
  
  /**
   * LitElement lifecycle called once just just before first updated() is called
   */
  firstUpdated() {
    super.firstUpdated();
    
    // check first if there is html markup platform attribute before using getPlatform to check what device or platform to assign platform value
    if(!this.hasAttribute('platform')) {
      this.platform = getPlatform();
    }

    this._observer = new FlattenedNodesObserver(this, (info) => {
      this._processNewNodes(info.addedNodes);
      this._processRemovedNodes(info.removedNodes);
    });

    // Flush function needs to be added in order to have changes delivered immediately
    this._observer.flush();
  }
  
  updated(changedProperties) {
    // checking for change in selected property and calling selectedChangedObserver
    if (changedProperties.has('selected')) {
      this._selectedChangedObserver();
    }
    super.updated(changedProperties);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  /**
   * When select property changes, it will move the selected attribute to the new clicked or selected item and remove the previous selected attribute
   */
  _selectedChangedObserver() {
    const selectedItem = this.querySelector(`[name=${this.selected}]`);
    // console.log('selectedItem', selectedItem);
    selectedItem.setAttribute('selected', '');

    for (var i = 0; i < this.tabbarItems.length; i++) {
      //console.log(this.tabbarItems[i], e.target, this.tabbarItems[i] != e.target);
      if (this.tabbarItems[i] != selectedItem) {
        this.tabbarItems[i].removeAttribute('selected');
      }
    }
    
    if (this.platform == 'android') {
      const itemIndex = [].indexOf.call(this.children, selectedItem);
      // Moving highligh on Android
      this._setAndroidHightlightPosition(itemIndex);
    }
  }

  /**
   * _processNewNodes - Creates tabbar item with added nodes and adds them into tabbarItems array
   *
   * @param  {Array} nodes Items that are added inside the slot.
   */
  _processNewNodes(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName != "#text") {
        var tabbarItem = nodes[i];
        // save nodes into array in tabbar
        this.tabbarItems.push(tabbarItem);
        // assign click listener
        tabbarItem.addEventListener('click', (e) => this.innerItemClickHandler(e));
        // check current selected field matches this node name
        if (tabbarItem.getAttribute('name') == this.selected && typeof (tabbarItem.set) == 'function') {
          tabbarItem.set('selected', true);
          
          if(this.platform == 'android') {
            const position = this.tabbarItems.indexOf(tabbarItem);
            this._setAndroidHightlightPosition(position);
          }
        }
      }
    }
    // we need change size of android highlight based on number of items in tabbar
    this._setAndroidHighlightSizeByNumberOfElements(this.tabbarItems.length);
  }


  /**
   * _processRemovedNodes - Removes the removed node from the tabbarItems array.
   *
   * @param  {Array} nodes Items that are removed from the slot.
   */
  _processRemovedNodes(nodes) {
    let wasSelected;
    for (var i = 0; i < nodes.length; i++) {
      var tabbarItem = this.tabbarItems[i];
      wasSelected = tabbarItem.getAttribute('selected') == true;

      this.tabbarItems.splice(i, 1);
    }

    // we need change size of android highlight based on number of items in tabbar
    this._setAndroidHighlightSizeByNumberOfElements(this.tabbarItems.length);

    if (wasSelected && this.tabbarItems.length > 0) {
      this.tabbarItems[0].setAttribute('selected', true);
    } else if (this.tabbarItems.length == 0) {
      this.set('selected', null);
    }

  }


  /**
   * _setAndroidHighlightSizeByNumberOfElements - Sets the highlight size of tabbar
   * based on number of elements in android platform.
   *
   * @param  {Number} number number of elements in the slot.
   */
  _setAndroidHighlightSizeByNumberOfElements(number) {
    // we don't need to care about it on ios
    if (this.platform != 'android') return;
    let size = 0;
    if (number != 0) {
      size = 100 / number;
    }
    let shadow = this.shadowRoot;
    let myElement = shadow.querySelector('#highlight');
    
    myElement.style.width = size + '%';
  }


  /**
   * _setAndroidHightlightPosition - sets the position of higlight.
   *
   * @param  {Number} position index of the selected item.
   */
  _setAndroidHightlightPosition(position) {
    let shadow = this.shadowRoot;
    let myElement = shadow.querySelector('#highlight');
    
    myElement.style.transform = `translate3d(${position * 100}%, 0, 0)`;
  }


  /**
   * innerItemClickHandler - Handles the click event of the item.      
   *
   * @param  {type} e item that click event is happening.
   */
  innerItemClickHandler(e) {
    this.selected = e.target.getAttribute('name');
    // this.set('selected', e.target.getAttribute('name'));
  }
}

window.customElements.define(MorphTabbar.is, MorphTabbar);

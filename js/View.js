class View {
  constructor() {}

  getMainWrapper() {
    return document.querySelector('.main-wrapper');
  }

  create(elementName) {
    return document.createElement(elementName);
  }

  addClass(element, className) {
    element.classList.add(className);
  }

  append(parentElement, childElement) {
    if (childElement && childElement.classList && childElement.classList.contains('score-wrapper')) {
      parentElement.insertBefore(childElement, parentElement.firstChild);
    } else if (
      parentElement.lastChild &&
      parentElement.lastChild.classList && 
      parentElement.lastChild.classList.contains('btn-wrapper')
    ) {
      parentElement.insertBefore(childElement, parentElement.lastChild);
    } else {
      parentElement.appendChild(childElement);
    }
  }
  
  

  appendToBody(childElement) {
    document.body.appendChild(childElement);
  }

  remove(parentElement, childElement) {
    parentElement.removeChild(childElement);
  }

  removeFromBody(childElement) {
    document.body.removeChild(childElement);
  }

  style(element, styles) {
    Object.assign(element.style, styles);
  }

  setHTML(element, content) {
    element.innerHTML = content;
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new View();
    }
    return this.instance;
}
}


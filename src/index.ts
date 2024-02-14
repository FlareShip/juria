type int = number;

type _ReturnType = {
  style: CSSStyleDeclaration;
  getChild: (childSelector: string) => _ReturnType | undefined;
  getChildByIndex: (index: int) => _ReturnType | undefined;
  addClass: (className: string) => _ReturnType;
  removeClass: (className: string) => _ReturnType | undefined;
  onClick: (Func: (ev: MouseEvent, element: HTMLElement) => any) => _ReturnType;
  onHover: (Func: (ev: Event, element: HTMLElement) => any) => _ReturnType;
  onHoverOver: (Func: (ev: Event, element: HTMLElement) => any) => _ReturnType;
};

/**
 * The function `$` is a TypeScript function that returns the first HTMLElement that matches the given
 * selector.
 * @param {any} selector - The `selector` parameter is a string that represents a CSS selector. It is
 * used to select elements from the HTML document.
 * @returns the first element that matches the given selector as an HTMLElement.
 */
export function $(selector: any) {
  return document.querySelector<HTMLElement>(selector)!;
}


/**
 * The function `all` is a TypeScript function that returns an array of HTMLElements that match
 * the given selector.
 * @param {any} selector - The `selector` parameter is a string that represents a CSS selector. It is
 * used to select elements from the HTML document.
 * @returns an array of HTMLElements that match the given selector.
 */
$.all = (selector: any) => {
  return document.querySelectorAll<HTMLElement>(selector)!;
};


/**
 * The above function is a utility function in TypeScript that provides a simplified way to interact
 * with HTML elements by chaining methods for styling, accessing child elements, adding/removing
 * classes, and attaching event listeners.
 * @param {string | HTMLElement | undefined} [selector] - The `selector` parameter is optional and can
 * be a string representing a CSS selector, an HTMLElement, or undefined. If no selector is provided,
 * then it will point to the `<body>` eleemnt.
 */
export function _(selector?: string | HTMLElement | undefined): _ReturnType {
  selector = typeof selector === "undefined" ? "body" : selector;

  return {
    style:
      typeof selector === "string"
        ? $(selector).style
        : typeof selector === "object"
        ? selector.style
        : $("body").style,

    getChild: (childSelector: string) => {
      return typeof selector === "string"
        ? _($(selector).children.namedItem(childSelector) as HTMLElement)
        : typeof selector === "object"
        ? _(selector.children.namedItem(childSelector) as HTMLElement)
        : undefined;
    },

    getChildByIndex: (index: int) => {
      return typeof selector === "string"
        ? _($(selector).children.item(index) as HTMLElement)
        : typeof selector === "object"
        ? _(selector.children.item(index) as HTMLElement)
        : undefined;
    },

    addClass: (className: string) => {
      typeof selector === "string"
        ? $(selector).classList.add(className)
        : typeof selector === "object"
        ? selector.classList.add(className)
        : Error("Envalid selector");

      return _(selector);
    },

    removeClass: (className: string) => {
      typeof selector === "string"
        ? $(selector).classList.remove(className)
        : typeof selector === "object"
        ? selector.classList.remove(className)
        : Error("Envalid selector");

      if (selector === className) {
        return;
      }

      return _(selector);
    },

    onClick: (Func: (ev: MouseEvent, element: HTMLElement) => any) => {
      let element = typeof selector === "string" ? $(selector) : selector!;

      typeof selector === "string"
        ? $(selector).addEventListener("click", (ev) => Func(ev, element))
        : selector!.addEventListener("click", (ev) => Func(ev, element));

      return _(selector);
    },

    onHover: (Func: (ev: Event, element: HTMLElement) => any) => {
      let element = typeof selector === "string" ? $(selector) : selector!;

      typeof selector === "string"
        ? $(selector).addEventListener("mouseenter", (ev) => Func(ev, element))
        : selector!.addEventListener("mouseenter", (ev) => Func(ev, element));

      return _(selector);
    },

    onHoverOver: (Func: (ev: Event, element: HTMLElement) => any) => {
      let element = typeof selector === "string" ? $(selector) : selector!;

      typeof selector === "string"
        ? $(selector).addEventListener("mouseleave", (ev) => Func(ev, element))
        : selector!.addEventListener("mouseleave", (ev) => Func(ev, element));

      return _(selector);
    },
  };
}

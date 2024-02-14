type int = number;

type _ReturnType = {
  style: CSSStyleDeclaration;
  getChild: (childSelector: string) => _ReturnType;
  getChildByIndex: (index: int) => _ReturnType;
  addClass: (className: string) => _ReturnType;
  removeClass: (className: string) => _ReturnType | undefined;
  onClick: (Func: (e: MouseEvent) => any) => _ReturnType;
  onHover: (Func: (e: Event, element: HTMLElement) => any) => _ReturnType;
  onHoverOver: (Func: (ev: Event, element: HTMLElement) => any) => _ReturnType;
};




/**
 * The function $ is a TypeScript function that returns the first HTMLElement that matches the given
 * selector.
 * @param {any} selector - The `selector` parameter is a string that represents a CSS selector. It is
 * used to select elements from the HTML document.
 * @returns the first element that matches the given selector as an HTMLElement.
 */
export function $(selector: any) {
  return document.querySelector<HTMLElement>(selector)!;
}




/**
 * The function `_` is a helper function that provides a fluent interface for manipulating DOM elements
 * in TypeScript.
 * @param {any} [selector] - The `selector` parameter is an optional parameter that specifies the CSS
 * selector for the element(s) you want to target. If no selector is provided, it defaults to "body",
 * which means it will target the `<body>` element.
 * @returns an object with several properties and methods.
 */
export function _(selector?: any): _ReturnType {
  selector = typeof selector === "undefined" ? "body" : selector;

  return {
    style: $(selector).style,


    getChild: (childSelector: string) => {
      return _($(selector).children.namedItem(childSelector));
    },


    getChildByIndex: (index: int) => {
      return _($(selector).children.item(index));
    },


    addClass: (className: string) => {
      $(selector).classList.add(className);

      return _(selector);
    },


    removeClass: (className: string) => {
      $(selector).classList.add(className);

      if (selector === className) {
        return;
      }

      return _(selector);
    },


    onClick: (Func: (e: MouseEvent) => any) => {
      $(selector).addEventListener("click", (e) => Func(e));

      return _(selector);
    },


    onHover: (Func: (e: Event, element: HTMLElement) => any) => {
      let element = $(selector);

      $(selector).addEventListener("mouseenter", (e) => Func(e, element));

      
      return _(selector);
    },
    
    
    onHoverOver: (Func: (ev: Event, element: HTMLElement) => any) => {
      let element = $(selector);

      $(selector).addEventListener("mouseleave", (ev) => Func(ev, element));

      return _(selector);
    }
  };
}


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


export function $(selector: any) {
  return document.querySelector<HTMLElement>(selector)!;
}


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


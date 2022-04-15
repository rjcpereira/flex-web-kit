const add = (element, type, next, run) => element.addEventListener(type, event => {
    !run && event?.preventDefault();
    next?.(event);
});

const remove = (element, type, next) => element.removeEventListener(type, next);

const on = (element, type, next, run) => {
    const cb = event => {
        !run && event?.preventDefault();
        next?.(event);
    }
    add(element, type, cb);
    return {
        off: () => remove(element, type, cb)
    };
};

const click = (element, next, run) => on(element, 'click', event => {
    !run && event?.preventDefault();
    next?.(event);
});

const input = (element, next, run) => on(element, 'input', event => {
    !run && event?.preventDefault();
    next?.(element.value, event);
});

const change = (element, next, run) => on(element, 'change', event => {
    !run && event?.preventDefault();
    next?.(element.value, event);
});

const select = (element, next, run) => on(element, 'select', event => {
    !run && event?.preventDefault();
    const index = element.selectedIndex,
        text = element.children[index].innerHTML.trim();
    console.log(element.value, text);
    next?.(event);
});

flex.events = {
    add,
    remove,
    on,
    click,
    input,
    change,
    select
};
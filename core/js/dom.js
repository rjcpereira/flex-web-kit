const get = (selector, element) => (element || document).querySelector(selector);

const getAll = (selector, element) => (element || document).querySelectorAll(selector);

const createElement = (tag, attrs, parent) => {
    if(!tag) return;
    const element = document.createElement(tag || 'div');
    if (attrs) {
        for (let key in attrs) element.setAttribute(key, attrs[key]);
        if (attrs.html) element.innerHTML = attrs.html;
    }
    parent && parent.appendChild(element);
    return element;
};

const getAttributes = element => !element ? null : element.getAttributeNames().reduce((acc, name) => ({
    ...acc,
    [name]: element.getAttribute(name)
}), {});

const mergeChildNodes = (previous, latest) => {

    const parent = () => ((previous?.parentElement && latest?.parentElement) && (previous.parentElement.innerHTML = latest.parentElement.innerHTML || ''));

    if (previous.nodeType != latest.nodeType) !previous.isEqualNode(latest) && parent();
    else if (latest.nodeType == document.ELEMENT_NODE && !previous.isEqualNode(latest)) {
        if(previous?.parentElement) previous?.parentElement.replaceChild(latest, previous);
        else previous.innerHTML = latest.innerHTML || '';
    }
    else if (latest.nodeType == document.TEXT_NODE && flex.utils.parseWhiteSpaces(latest.textContent) != flex.utils.parseWhiteSpaces(previous.textContent)) {
        if ((!previous?.parentElement?.children?.length && !latest?.parentElement?.children?.length) || false) previous.textContent = latest.textContent;
        else parent();
    }
}

const mergeElements = (previous, latest) => {
    let previousChildren = previous?.childNodes || [], latestChildren = latest?.childNodes || [];
    const total = latestChildren.length > previousChildren.length ? latestChildren.length : previousChildren.length;
    if (!total) return mergeChildNodes(previous, latest);
    else for (let i = 0; i < total; i++) {
        const previousChild = previousChildren[i], latestChild = latestChildren[i];
        if (previousChild || latestChild) {
            const diff = latestChildren.length != previousChildren.length;
            if (!previousChild && latestChild && diff) previous.appendChild(latestChild);
            else if (previousChild && !latestChild && diff) previousChild.remove();
            else if (!previousChild.isEqualNode(latestChild)) {
                if (previousChild.nodeType != latestChild.nodeType) return mergeChildNodes(previous, latest);
                else mergeElements(previousChild, latestChild);
            }
        }
    }
};

flex.dom = {
    get,
    getAll,
    createElement,
    getAttributes,
    mergeChildNodes,
    mergeElements
}
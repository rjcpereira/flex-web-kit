const selector = 'data-field';

const process = (value, elements) => FlexJS.utils.each(elements, element => {
    if (element.value != value) element.value = value;
});

const updated = () => {
    const elements = FlexJS.utils.getElements(`[${selector}]`);
    FlexJS.utils.each(elements, element => {
        if (!element.parsed) {
            element.parsed = 1;
            const key = element.getAttribute(selector);
            let clones;
            const update = () => (clones = FlexJS.utils.getElements(`[${selector}="${key}"]`));
            update();
            FlexJS.events.input(element, value => process(value, clones))
            FlexJS.events.change(element, value => {
                update();
                process(value, clones);
            });
        }
    });
};

FlexJS.hooks.on('ready', updated);
FlexJS.hooks.on('render', updated);
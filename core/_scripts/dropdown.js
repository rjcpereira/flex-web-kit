FlexJS.hooks.on('ready', () => {
    const elements = FlexJS.utils.getElements(`[data-dropdown]`);
    FlexJS.utils.each(elements, element => {
        FlexJS.events.select(element, value => {
            console.log(value)
        })
    });
})
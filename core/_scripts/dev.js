FlexJS.dev = status => {
    FlexJS.config.dev = !FlexJS.utils.isset(status) ? !FlexJS.config.dev : status;
    console.log(`Dev mode turned o${!FlexJS.config.dev ? 'ff' : 'n'}`)
};

FlexJS.hooks.on('ready', () => {

    let save = FlexJS.utils.getElementID('save'), textarea = FlexJS.utils.getElementID('textarea');

    FlexJS.net.get('/api/get', res => (textarea.value = JSON.stringify(res || '{}')))

    FlexJS.events.click(save, () => {
        console.log('save')
        FlexJS.net.set('/api/set', JSON.parse(textarea.value || '{}'), res => console.log('set', res))
    });

});
/* const reactive = dataObj => {

    let signals = {}

    const observe = (property, signalHandler) => {
        if(!signals[property]) signals[property] = [];
        signals[property].push(signalHandler)
    }

    const notify = (signal) => {
        if(!signals[signal] || signals[signal].length < 1) return;
        signals[signal].forEach((signalHandler) => signalHandler())
    }

    const makeReactive = (obj, key) => {
        let val = obj[key]
        Object.defineProperty(obj, key, {
            get() {
                console.log('GET', val);
                return val
            },
            set(newVal) {
                console.log('SET', newVal);
                val = newVal
                notify(key)
            }
        })
    }

    const watch = (obj) => {
        for (let key in obj) obj.hasOwnProperty(key) && makeReactive(obj, key);
        process(document.body, obj)
    }

    const sync = (node, observable, property) => {
        console.log('sync', node, property)
        node.textContent = observable[property];
        observe(property, () => node.textContent = observable[property])
    }

    const process = (node, observable) => {
        const nodes = document.querySelectorAll('[s-text]')
        console.log(nodes)
        nodes.forEach((node) => sync(node, observable, node.attributes['s-text'].value));
    }

    watch(dataObj)

    return {
        state: dataObj,
        observe,
        notify
    }
};

FlexJS.reactive = reactive({
    title: 'Game of Thrones',
    firstName: 'Jon',
    lastName: 'Snow',
    age: 25
})

const update = (property, e) => (FlexJS.reactive.state[property] = e.target.value);

FlexJS.hooks.on('ready', () => {
    const selector = 'data-field';
    const elements = FlexJS.utils.getElements(`[${selector}]`);
    FlexJS.utils.each(elements, element => {
        
    });
}); */
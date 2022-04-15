const get = (path, next) => !path || !next ? (next && next()) : fetch(path).then(res => res.json()).then(next);

const set = (path, body, next) => !path || !next ? (next && next()) : fetch(path, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
}).then(res => res.json()).then(next);

flex.net = {
    get,
    set
}
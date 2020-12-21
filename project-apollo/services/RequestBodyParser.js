const RequestBodyParser = (data)=> {
    let updates = {};
    for(let key in data) {
        if(data[key] != null){
            updates[key] = data[key];
        }
    }
    return updates;
}

module.exports = RequestBodyParser;
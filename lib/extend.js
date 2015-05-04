module.exports = function extend(){
    var result = {};
    Array.prototype.slice.call(arguments).forEach(function(object){
        for (var key in object){
            if (result[key] == undefined) {
                result[key] = object[key];
            } else if(typeof result[key] == 'object' && typeof object[key] == 'object') {
                result[key] = extend(result[key], object[key]);
            }
        }
    });
    return result;
};

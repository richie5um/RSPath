var _ = require('underscore');

var pathSet = function(obj, path, value) {
    // Basic input validation
    if (undefined === obj || undefined === path || 0 === path.length) {
        return false;
    }

    // Ensure the path is separated in path elements
    var pathElements = _.isArray(path) ? path : path.split('.');
    if (0 === pathElements.length) {
        return false;
    }

    var key = pathElements[0];
    var element;

    // Check for array index in path
    var index = key.indexOf('[');
    var indexArray;
    if (-1 !== index) {
        indexArray = parseInt(key.slice(index + 1));

        // If we are multi-dimensional, then re-insert the sub-dimensions into the path
        var indexSub = key.indexOf('[', index + 1);
        if (-1 !== indexSub) {
            var keyArraySub = key.slice(indexSub);
            if (undefined !== keyArraySub && 0 < keyArraySub.length) {
                pathElements.splice(1, 0, keyArraySub);
            }
        }

        key = key.slice(0, index);
        // Needed so we can handle direct array access (i.e. [1])
        if ((undefined !== key && 0 < key.length)) {
            element = obj[key];
        } else {
            element = obj;
        }

        // If this is a array index, then validate that it is valid.
        if (!_.isArray(element) || 0 > indexArray || element.length <= indexArray) {
            return false;
        }
    } else {
        element = obj[key];
    }

    // If this is the last path element, then assign and return.
    if (1 === pathElements.length) {
        if (-1 !== index) {
            element[indexArray] = value;
            return true;
        }

        obj[key] = value;
        return true;
    }

    // If this is an array index, then use the correct key
    if (-1 !== index) {
        return pathSet(obj[key][indexArray], pathElements.slice(1), value);
    }

    // Ensure is element is an object
    if (obj[key] === undefined || !_.isObject(obj[key])) {
        obj[key] = {};
    }

    return pathSet(obj[key], pathElements.slice(1), value);
};

var pathDelete = function(obj, path) {
    // Basic input validation
    if (undefined === obj || undefined === path || 0 === path.length) {
        return false;
    }

    // Ensure the path is separated in path elements
    var pathElements = _.isArray(path) ? path : path.split('.');
    if (0 === pathElements.length) {
        return false;
    }

    var key = pathElements[0];
    var element;

    // Check for array index in path
    var index = key.indexOf('[');
    var indexArray;
    if (-1 !== index) {
        indexArray = parseInt(key.slice(index + 1));

        // If we are multi-dimensional, then re-insert the sub-dimensions into the path
        var indexSub = key.indexOf('[', index + 1);
        if (-1 !== indexSub) {
            var keyArraySub = key.slice(indexSub);
            if (undefined !== keyArraySub && 0 < keyArraySub.length) {
                pathElements.splice(1, 0, keyArraySub);
            }
        }

        key = key.slice(0, index);
        // Needed so we can handle direct array access (i.e. [1])
        if ((undefined !== key && 0 < key.length)) {
            element = obj[key];
        } else {
            element = obj;
        }

        // If this is a array index, then validate that it is valid.
        if (!_.isArray(element) || 0 > indexArray || element.length <= indexArray) {
            return false;
        }
    } else {
        element = obj[key];
    }

    // If this is the last path element, then delete and return.
    if (1 === pathElements.length) {
        if (-1 !== index) {
            element.splice(indexArray, 1);
            return true;
        }

        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            delete obj[key];
            return true;
        }

        return false;
    }

    // If this is an array index, then use the correct key
    if (-1 !== index) {
        return pathDelete(element[indexArray], pathElements.slice(1));
    }

    // Ensure is element is an object, otherwise it is invalid detele
    if (element === undefined || !_.isObject(element)) {
        return false;
    }

    return pathDelete(element, pathElements.slice(1));
};

var pathGet = function(obj, path) {
    // Basic input validation
    if (undefined === obj || undefined === path || 0 === path.length) {
        return undefined;
    }

    // Ensure the path is separated in path elements
    var pathElements = _.isArray(path) ? path : path.split('.');
    if (0 === pathElements.length) {
        return undefined;
    }

    var key = pathElements[0];

    // Check for array index in path
    var index = key.indexOf('[');
    var element;

    if (-1 === index) {
        element = obj[key];
    } else {
        var indexArray = parseInt(key.slice(index + 1));
        var newKey = key.slice(0, index);

        // Needed so we can handle direct array access (i.e. [1])
        if ((undefined !== newKey && 0 < newKey.length)) {
            element = obj[newKey];
        } else {
            element = obj;
        }

        if (_.isArray(element) && 0 <= indexArray && indexArray < element.length) {
            element = element[indexArray];
        } else {
            return undefined;
        }

        // If we are multi-dimensional, then re-insert the sub-dimensions into the path
        var indexSub = key.indexOf('[', index + 1);
        if (-1 !== indexSub) {
            var keyArraySub = key.slice(indexSub);
            if (undefined !== keyArraySub && 0 < keyArraySub.length) {
                pathElements.splice(1, 0, keyArraySub);
            }
        }
    }

    if (1 === pathElements.length || undefined === element) {
        return element;
    }

    return pathGet(element, pathElements.slice(1));
};

module.exports.pathGet = pathGet;
module.exports.pathSet = pathSet;
module.exports.pathDelete = pathDelete;


exports.extractImagePath = function(image){
    var path = image.path;
    path = path.replace(/\\/g,'/');
    var spliced = path.split('/');

    return "/" + spliced[spliced.length - 1];
};
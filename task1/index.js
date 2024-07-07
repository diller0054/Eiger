var commonPrefixLength = function (s1, s2) {
    var length = 0;
    var minLength = Math.min(s1.length, s2.length);
    for (var i = 0; i < minLength; i++) {
        if (s1[i] !== s2[i]) {
            break;
        }
        length++;
    }
    return length;
};
var commonPrefix = function (inputs) {
    return inputs.map(function (input) {
        var totalLength = 0;
        var inputLength = input.length;
        for (var i = 0; i <= inputLength; i++) {
            var suffix = input.substring(i);
            totalLength += commonPrefixLength(input, suffix);
        }
        return totalLength;
    });
};
console.log(commonPrefix(['abcabcd']));

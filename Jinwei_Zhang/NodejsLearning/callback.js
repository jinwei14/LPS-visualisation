(function (window) {
    function callbackExample(val){
        console.log(val);
    }

    var list = ['apple','banana','pear'];

    list.forEach(callbackExample);

    console.log('Done');

})();


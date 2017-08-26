/**
 * Created by maximvlasenko on 8/25/17.
 *
 */

var globalJsonTree = {};

/*
I used jQuery only for ajax other functionality will write on clear JS
*/

let __ = function () {
    let __objects = {};
    function getElement(selector) {
        return __objects[selector] || ( __objects[selector] = document.getElementById(selector) );
    }
    return getElement;
}();

/* task 1 */
let getJson = function(event){
    event.preventDefault();
    $.get( "http://pstand.flyupstudio.com/api/json", function( data ) {
        globalJsonTree = JSON.parse(data);
        let item = findById(__('findId').value, globalJsonTree) || 'not found';
        __('result').innerHTML = `Result: ${item}`;
    }).fail(function() {
        alert( "error" );
    });
};

// to get request from server we can run getJson();

function findById(id, obj){
    let res = -1;
    for(let item in obj){
        if(obj[item].id == id){
            return obj[item].label;
        } else {
            res = findById(id, obj[item].child);
            if(res != -1) return res;
        }
    }
    return res;
}

document.addEventListener('DOMContentLoaded', function(){
    let elem = document.createElement('div');
    elem.id = 'message';
    elem.className = 'message';
    elem.style.display = 'none';

    let message = function(input, text, show = true){
        elem.textContent = text;
        elem.className = 'error';
        elem.style.display = show ? 'block':'none';
        input.className = show ? 'invalid':'valid';
    };

    __('formValidation').appendChild(elem);

    let validationList = ['name', 'address1', 'city', 'state', 'zipCode'];
    for(let validationElement of validationList){
        __(validationElement).addEventListener('invalid', function(event) {
            event.preventDefault();
            if (!event.target.validity.valid) {
                message(__(validationElement), __(validationElement).dataset.error);
            }
        })
        __(validationElement).addEventListener('input', function(event) {
            message(__(validationElement),'',0);
        });
    }
});

/* end task 1 */

let actionReducer = function (event, action) {
    event.preventDefault();
    switch (action) {
        case 'REVERSIFY_ALL':
            showResultReversify('stringTask3', 'resultTask3');
            break;
        case 'REVERSIFY_WORD':
            showResultReversify('stringTask31', 'resultTask31', ' ');
            break;
        case 'NATIVE_METHOD':
            addToNative('stringTask4', 'stringTask41', 'resultTask4');
            break;
        case 'NEEDLE':
            findNeedle('stringTask5', 'stringTask51', 'resultTask5');
            break;
        case 'PALINDROME':
            isPalindrome('stringTask6', 'resultTask6');
            break;
    }
}

let isPalindrome = function (selector, result) {
    let isPlaindromeString = __(selector).value.replace(/[^0-9a-z]/gi, '').toLowerCase();
    __(result).innerHTML = 'This string is ' + (isPlaindromeString == reversify(isPlaindromeString) ? '': 'not' ) +
                            ' palindrome';
}

let findNeedle = function(selector, needle, result){
    let position = finder(__(selector).value, __(needle).value);
    __(result).innerHTML = `Position is ${position}`;
};

let finder = function(haystack, needle) {
    let result = -1;
    for(let i = 0; i < haystack.length; i++){
        if(haystack[i] == needle[0]){
            // try check for sub cahrs
            let res = true;
            for (let j = 0; j < needle.length; j++){
                if(needle[j] != haystack[i+j]){
                    res = false;
                    break;
                }
            }
            if(res){
                result = i;
                break;
            }
        }
    }
    return result;
}

let addToNative = function (selector, count, result) {
    String.prototype.repeatify = function(count){
        let str = '';
        for (let i = 0; i < this.length; i++){
            str += this[i];
        }
        let result = '';
        for(let i = 0; i < count; i++){
            result += str;
        }
        return result;
    }

    __(result).innerHTML = __(selector).value.repeatify(__(count).value);

}

let reversify = function(str, separator = ""){
    return str.split(separator).map((el, i, all) => all[all.length - 1 - i]).join(separator);
};

let showResultReversify = function (selector, result, separator = "") {
    __(result).innerHTML = reversify(__(selector).value, separator);
};


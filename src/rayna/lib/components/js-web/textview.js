/**
 * @module textview 模块
 * @author Rube
 * @date 15/8/31
 * @desc
 */

R.define('component-textview', function () {

    var TextView = function (dom) {
        this.dom = dom;
    };
    TextView.prototype = {
        getText: function(){
            return this.dom.innerHTML;
        },
        setText: function(text){
            return this.dom.innerHTML = text;
        }
    };

    return {
        build: function (dom) {
            return new TextView(dom);
        }
    }
});
/**
 * @author Rube
 * @date 15/8/15
 * @desc textview parse
 */

module.exports = {
    parse: function ($, tagObject) {
        tagObject['text'] = $.text();
    }
};
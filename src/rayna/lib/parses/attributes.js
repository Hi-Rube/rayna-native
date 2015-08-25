/**
 * @module parseAttributes
 * @author Rube
 * @date 15/8/13
 * @desc the elements' attribute
 */

var baseAttributes = ['id', 'class', 'style'];

module.exports = {
    activity: ['action', 'type'],
    textview: ['text'].concat(baseAttributes),
    layout: [].concat(baseAttributes)
};

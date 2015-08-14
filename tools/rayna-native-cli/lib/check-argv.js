/**
 * @module checkArgs
 * @author Rube
 * @date 15/8/13
 * @desc check command lines args
 */

module.exports = {
    check: function (args) {

        if (args.length > 3) {

            return {
                applicationName: args[2],
                packageName: args[3]
            }
        }

        return false;
    }
};
const LOGGER = require('../../src/setup/logger.js');


class ArrayHelper {

    /**
     * To remove one element from String array.
     *
     * @param fields             String[] (String array from which element to be removed)
     * @param elementToBeRemoved String (element to be removed)
     * @return String[] (String array after removal of element)
     */

    static async removeElementFromStringArray(fields, elementToBeRemoved) {
        if (!Array.isArray(fields)) {
            return [];
        }
    
        return fields.filter(field => field !== elementToBeRemoved);
    }
    
    /**
     * To convert all values in string array to lower case.
     *
     * @param array String[]
     * @return String[]
     */
    
        static async convertAllArrayValuesToLowerCase(array) {
            for (let i = 0; i < array.length; i++) {
                array[i] = array[i].toLowerCase();
            }
            return array;
        
    }
    

}
module.exports = ArrayHelper
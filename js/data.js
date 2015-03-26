wordService = (function () {

    var findById = function (id) {
            var deferred = $.Deferred();
            var employee = null;
            var l = words.length;
            for (var i = 0; i < l; i++) {
                if (words[i].id == id) {
                    employee = words[i];
                    break;
                }
            }
            deferred.resolve(employee === null ? [] : employee);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            var results = words.filter(function (element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByManager = function (managerId) {
            var deferred = $.Deferred();
            var results = words.filter(function (element) {
                return managerId === element.managerId;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByCifrMethod = function(number){
            var deferred = $.Deferred();
            var couple,
                firstDigit,
                secondDigit,
                regexp,
                results = [],
                digitToChar = {
                    0:'лн',
                    1:'рц',
                    2:'дг',
                    3:'тз',
                    4:'чкх',
                    5:'пб',
                    6:'шщж',
                    7:'с',
                    8:'вф',
                    9:'м'
                };
            if (/^\d*$/.test(number)){
                for (var i=0; i < number.length; i++){
                    if (i%2) {
                        couple = number[i-1] +''+ number[i];
                        console.log('Couple %o', couple);
                        firstDigit = digitToChar[number[i-1]];
                        secondDigit = digitToChar[number[i]];
                        regexp = new RegExp('^[уеыайъоэяиюьё]{0,2}['+firstDigit+']{1}[уеыаоэяйъиюьё]{0,2}['+secondDigit+']{1}[а-я]*$');                        ;
                        results = words.filter(function (element) {
                            return regexp.test(element.name);
                        });
                    }
                }
            } else {
                console.log('Not a number in search bar');
            }
            deferred.resolve(results);
            return deferred.promise();
        },

        words = [
            {"id": 1, name: 'мама'}, // 99
            {"id": 2, name: 'мумия'}, // 99
            {"id": 3, name: 'шифер'}, // 68
            {"id": 4, name: 'песок'}, // 57
            {"id": 5, name: 'дог'}, // 22
            {"id": 6, name: 'дудочка'} // 22
        ];

    // The public API
    return {
        findById: findById,
        findByName: findByName,
        findByManager: findByManager,
        findByCifrMethod: findByCifrMethod
    };

}());
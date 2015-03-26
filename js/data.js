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

        words = [
            {"id": 1, name: 'мама'},
            {"id": 2, name: 'шифер'},
            {"id": 3, name: 'песок'},
            {"id": 4, name: 'дог'}
        ];

    // The public API
    return {
        findById: findById,
        findByName: findByName,
        findByManager: findByManager
    };

}());
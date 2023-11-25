"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var BaseManager = (function () {
    function BaseManager() {
        this.pool = {};
    }
    BaseManager.prototype.retrieveInstance = function (objectId, object) {
        this.pool[objectId] = object;
        return this.pool[objectId];
    };
    BaseManager.prototype.search = function (objectId) {
        return this.pool[objectId];
    };
    BaseManager.prototype.addObject = function (objectId, object) {
        this.retrieveInstance(objectId, object);
    };
    BaseManager.prototype.fetchObject = function (objectId) {
        return this.search(objectId);
    };
    BaseManager.prototype.getObject = function (objectId) {
        var _this = this;
        var component = this;
        return new Promise(function (resolve, reject) {
            var object = _this.search(objectId);
            if (object) {
                resolve(object);
            }
            else {
                component.load(objectId)
                    .then(function (returnedObject) {
                    resolve(returnedObject);
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    BaseManager.prototype.loadAllObjects = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var objects = _this.getObjectsFromCache();
            if (objects.length > 0) {
                resolve(objects);
            }
            else {
                _this.getAll()
                    .then(function (returnedObjects) {
                    if (returnedObjects instanceof Array) {
                        _this.addAll(returnedObjects);
                        resolve(returnedObjects);
                    }
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    BaseManager.prototype.getObjectsFromCache = function () {
        var objects = [];
        for (var poolObject in this.pool) {
            if (poolObject) {
                objects.push(this.pool[poolObject]);
            }
        }
        return objects.reverse();
    };
    BaseManager.prototype.unShiftPool = function (key, instance, pool) {
        var keys = Object.keys(pool);
        var tempObjectsList = [];
        keys.forEach(function (tempKey) {
            tempObjectsList.push(pool[tempKey]);
        });
        var tempPool = {};
        tempPool[key] = instance;
        tempObjectsList.forEach(function (object) {
            tempPool[object.id] = object;
        });
        return tempPool;
    };
    BaseManager.prototype.removeObject = function (objectId) {
        delete this.pool[objectId];
    };
    BaseManager.prototype.clearObjects = function () {
        this.pool = {};
    };
    return BaseManager;
}());
exports.BaseManager = BaseManager;
//# sourceMappingURL=base.manager.js.map
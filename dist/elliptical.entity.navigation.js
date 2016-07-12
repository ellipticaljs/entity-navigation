(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'elliptical-utils', 'elliptical-service', 'elliptical-soa', 'elliptical-location'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('elliptical-utils'), require('elliptical-service'), require('elliptical-soa'), require('elliptical-location'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.elliptical.utils, global.elliptical.Service, global.elliptical.$Pagination, global.elliptical.Location);
        global.elliptical.EntityNavigation = mod.exports.default;
    }
})(this, function (exports, _ellipticalUtils, _ellipticalService, _ellipticalPagination, _ellipticalLocation) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ellipticalUtils2 = _interopRequireDefault(_ellipticalUtils);

    var _ellipticalService2 = _interopRequireDefault(_ellipticalService);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            return step("next", value);
                        }, function (err) {
                            return step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var object = _ellipticalUtils2.default.object;

    function parseOrderBy(oldObj, newObj) {
        if (oldObj.$orderBy) newObj.orderBy = oldObj.$orderBy;
        return newObj;
    }

    function parseOrderByDesc(oldObj, newObj) {
        if (oldObj.$orderByDesc) newObj.orderByDesc = oldObj.$orderByDesc;
        return newObj;
    }

    function setParamsQueryString(params) {
        var u = _ellipticalLocation.referrer;
        var search = _ellipticalLocation.getSearch(u);
        if (search && search !== '') params.querystring = search;
        return params;
    }

    function getReferrerQuery() {
        var referrer = _ellipticalLocation.referrer;
        return _ellipticalLocation.getQuery(referrer);
    }

    var EntityNavigation = function (_Service) {
        _inherits(EntityNavigation, _Service);

        function EntityNavigation() {
            _classCallCheck(this, EntityNavigation);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(EntityNavigation).apply(this, arguments));
        }

        _createClass(EntityNavigation, [{
            key: 'navigate',
            value: function navigate(params, query, callback) {
                this.constructor.navigate(params, query, callback);
            }
        }, {
            key: 'navigateAsync',
            value: function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params, query) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    this.constructor.navigateAsync(params, query);

                                case 1:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function navigateAsync(_x, _x2) {
                    return _ref.apply(this, arguments);
                }

                return navigateAsync;
            }()
        }], [{
            key: 'navigate',
            value: function navigate(params, query, callback) {
                if (typeof query === 'function') {
                    callback = query;
                    query = {};
                }
                var $provider = this.$provider;
                var resource = this['@resource'];
                var queryable = {};
                if (!query || object.isEmpty(query)) {
                    query = getReferrerQuery();
                    params = setParamsQueryString(params);
                }
                var filter = this._toQueryable(query);
                if (!object.isEmpty(filter)) queryable.filter = filter;
                queryable = parseOrderBy(query, queryable);
                queryable = parseOrderByDesc(query, queryable);

                $provider.get(params, resource, queryable, callback);
            }
        }, {
            key: 'navigateAsync',
            value: function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(params, query) {
                    var $provider, resource, queryable, filter;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    $provider = this.$provider;
                                    resource = this['@resource'];
                                    queryable = {};

                                    if (!query || object.isEmpty(query)) {
                                        query = getReferrerQuery();
                                        params = setParamsQueryString(params);
                                    }
                                    filter = this._toQueryable(query);

                                    if (!object.isEmpty(filter)) queryable.filter = filter;
                                    queryable = parseOrderBy(query, queryable);
                                    queryable = parseOrderByDesc(query, queryable);
                                    return _context2.abrupt('return', new Promise(function (resolve, reject) {
                                        $provider.get(params, resource, queryable, function (err, data) {
                                            if (err) reject(err);else resolve(data);
                                        });
                                    }));

                                case 9:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function navigateAsync(_x3, _x4) {
                    return _ref2.apply(this, arguments);
                }

                return navigateAsync;
            }()
        }]);

        return EntityNavigation;
    }(_ellipticalService2.default);

    EntityNavigation.$paginationProvider = _ellipticalPagination;

    exports.default = EntityNavigation;
});

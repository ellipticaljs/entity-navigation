import utils from 'elliptical-utils';
import Service from 'elliptical-service';
import {$Pagination} from 'elliptical-soa';
import {Location} from 'elliptical-location';

let object=utils.object;


function parseOrderBy(oldObj, newObj) {
    if (oldObj.$orderBy) newObj.orderBy = oldObj.$orderBy;
    return newObj;
}

function parseOrderByDesc(oldObj, newObj) {
    if (oldObj.$orderByDesc) newObj.orderByDesc = oldObj.$orderByDesc;
    return newObj;
}

function setParamsQueryString(params) {
    var u = Location.referrer;
    var search = Location.getSearch(u);
    if (search && search !== '') params.querystring = search;
    return params;

}

function getReferrerQuery() {
    var referrer = Location.referrer;
    return Location.getQuery(referrer);
}

class EntityNavigation extends Service {
    static navigate(params, query, callback) {
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

        $provider.get(params, resource, queryable, callback)
    }

    static async navigateAsync(params, query) {
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
        return new Promise(function (resolve, reject) {
            $provider.get(params, resource, queryable, function (err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    navigate(params, query, callback) {
        this.constructor.navigate(params, query, callback);
    }

    async navigateAsync(params, query) {
        this.constructor.navigateAsync(params, query);
    }
}

EntityNavigation.$paginationProvider = $Pagination;

export default EntityNavigation;
    
   


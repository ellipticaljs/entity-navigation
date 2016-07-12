(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        //commonjs
        module.exports = factory(require('elliptical-soa'),require('elliptical-location'),require('elliptical-utils'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['elliptical-soa','elliptical-location','elliptical-utils'], factory);
    } else {
        // Browser globals (root is window)

        root.elliptical.EntityNavigation=factory(root.elliptical,root.elliptical.Location,root.elliptical.utils);
        root.returnExports = root.elliptical.EntityNavigation;
    }
}(this, function (elliptical,Location,utils) {

    var Service=elliptical.Service;
    var $Pagination=elliptical.$Pagination;
    var object=utils.object;

    
    function parseOrderBy(oldObj,newObj){
        if(oldObj.$orderBy) newObj.orderBy=oldObj.$orderBy;
        return newObj;
    }
    
    function parseOrderByDesc(oldObj,newObj){
        if(oldObj.$orderByDesc) newObj.orderByDesc=oldObj.$orderByDesc;
        return newObj;
    }

    function setParamsQueryString(params){
        var u=Location.referrer;
        var search=Location.getSearch(u);
        if(search && search !=='') params.querystring=search;
        return params;

    }
    
    function getReferrerQuery(){
        var referrer=Location.referrer;
        return Location.getQuery(referrer);
    }

    return Service.extend({
        $paginationProvider:$Pagination,
        
        navigate:function(params,query,callback){
            if (typeof query === 'function') {
                callback = query;
                query = {};
            }
            var $provider = this.$provider;
            var resource = this['@resource'];
            var queryable={};
            if(!query || object.isEmpty(query)){
                query=getReferrerQuery();
                params=setParamsQueryString(params);
            }
            var filter=utils.toQueryable(query);
            if(!object.isEmpty(filter)) queryable.filter=filter;
            queryable=parseOrderBy(query,queryable);
            queryable=parseOrderByDesc(query,queryable);
            
            $provider.get(params, resource, queryable, callback)
        }
    },{});


}));


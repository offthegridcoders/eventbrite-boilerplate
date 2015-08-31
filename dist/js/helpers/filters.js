// *******************
// FILTERS
// *******************

  var SearchBtn = $('#search');
  var SortByOption = $('#sortByOption');
  var CityFilter = $('#CityFilter');
  var CountryFilter = $('#CountryFilter');
  var RegionFilter = $('#RegionFilter');
  var cityFilterItem = $('#cityFilterItem');
  var regionFilterItem = $('#regionFilterItem');

  cityFilterItem.hide();
  regionFilterItem.hide();

  function refreshPage() {
    var url = window.location.pathname + '?' + $.param(params);
    window.location.replace(url);
  };

  // **********************
  // INIT GET URL-PARAMS FUNCTION
  // **********************

    if($.urlParam('page')) {
      params.page = $.urlParam('page');
      if (params.page < 1) {
        params.page = 1;
        refreshPage();
      }
    };

    if($.urlParam('sort_by')) {
      SortByOption.val($.urlParam('sort_by'));
      params.sort_by = $.urlParam('sort_by');
    };

    if($.urlParam('categories')) {
      CategoriesElm.val($.urlParam('categories'));
      params.categories = $.urlParam('categories');
    };

    if($.urlParam('venue.city')) {
      var city = {'venue.city': $.urlParam('venue.city')};
      params = $.extend({}, city, params);
      CityFilter.val($.urlParam('venue.city'));
    };

    if($.urlParam('venue.country')) {
      var country = {'venue.country': $.urlParam('venue.country')};
      params = $.extend({}, country, params);
      CountryFilter.val($.urlParam('venue.country'));
      if ($.urlParam('venue.country') == 'US') {
        cityFilterItem.show();
        regionFilterItem.show();
      } else {
        cityFilterItem.hide();
        regionFilterItem.hide();
        delete params['venue.city'];
        delete params['venue.region'];
      }
    };

    if($.urlParam('venue.region')) {
      var region = {'venue.region': $.urlParam('venue.region')};
      params = $.extend({}, region, params);
      RegionFilter.val($.urlParam('venue.region'));
    };

  // *******************
  // SORT_BY
  // *******************
    SortByOption.change(function(e) {
      params.sort_by = e.target.value;
      refreshPage();
    });

  // *******************
  // CATEGORIES
  // *******************
    CategoriesElm.change(function(e) {
      params.categories = e.target.value;
      refreshPage();
    });

  // *******************
  // CITY
  // *******************
    CityFilter.keyup(function(e) {
      delete params['venue.city'];
      if (e.target.value) {
        var city = {'venue.city': e.target.value};
        params = $.extend(city, params);
      }
    });

  // *******************
  // REGION
  // *******************
    RegionFilter.change(function(e) {
      delete params['venue.region'];
      if (e.target.value) {
        var region = {'venue.region': e.target.value};
        params = $.extend(region, params);
      }
    });

  // *******************
  // COUNTRY
  // *******************
    CountryFilter.change(function(e) {
      delete params['venue.country'];
      if (e.target.value) {
        var country = {'venue.country': e.target.value};
        params = $.extend(country, params);
        if (e.target.value == 'US') {
          cityFilterItem.show();
          regionFilterItem.show();
        } else {
          cityFilterItem.hide();
          regionFilterItem.hide();
          delete params['venue.city'];
          delete params['venue.region'];
        }
      }
    });

  // *******************
  // SEARCH
  // *******************
    SearchBtn.click(function(e) {
      refreshPage();
    });

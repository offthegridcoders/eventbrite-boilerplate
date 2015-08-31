// *******************
// FILTERS
// *******************

  var SortByOption = $('#sortByOption');

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

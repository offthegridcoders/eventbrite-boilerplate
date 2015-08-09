// PAGINATION
//
// definitely needs to be refactored
//

  var PaginationElm = $('#pagination');
  PaginationElm.hide();

  // Sets Pagination
    function setPagination(pagination) {
      // todo: add elispse after start and before last -- ... adds or subtracts 10 from current page unless goes
      // negative or past last page
      PaginationElm.empty();
      var a = $('<a/>').addClass('page-number');
      var span = $('<span/>').addClass('page-number current-page');
      var start = pagination.page_number - 4;
      if (start <= 1) start = 2;

      if ((start + 9) > pagination.page_count) {
        var end = pagination.page_count;
        start = pagination.page_count - 8;
      } else {
        var end = start + 8;
      }

      // adds first page
        if (pagination.page_number == 1) {
          newpage = span.clone();
        } else {
          newpage = a.clone();
        }
        var tmpParams = jQuery.extend(true, {}, params);
            tmpParams.page = 1;
        var newUrl = '/index.html?' + $.param(tmpParams);
        if (byLocation) newUrl += '&location.address=' + byLocation;
        newpage.text(1).attr('href', newUrl);
        PaginationElm.append(newpage);

      for (var i=start; i<=(end); i++) {
        tmpParams = jQuery.extend(true, {}, params);
        tmpParams.page = i;
        if(pagination.page_number != i) {
          newpage = a.clone();
          var newUrl = '/index.html?' + $.param(tmpParams);
          if (byLocation) newUrl += '&location.address=' + byLocation;
          newpage.text(i).attr('href', newUrl);
        } else {
          var newpage = span.clone();
          newpage.text(i);
        }

        PaginationElm.append(newpage);
      }

      // adds last page

        if (pagination.page_number == pagination.page_count) {
          newpage = span.clone();
        } else {
          newpage = a.clone();
        }

        var tmpParams = jQuery.extend(true, {}, params);
            tmpParams.page = pagination.page_count;
        var newUrl = '/index.html?' + $.param(tmpParams);
        if (byLocation) newUrl += '&location.address=' + byLocation;
        newpage.text(pagination.page_count).attr('href', newUrl);
        PaginationElm.append(newpage);


      PaginationElm.append()
      PaginationElm.show();
    }

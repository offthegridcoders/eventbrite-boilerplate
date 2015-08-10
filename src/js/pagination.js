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
      var right = a.clone().html($('<i/>').addClass('fa fa-caret-right')).attr('src', 'index.html?less');

      var linkLength = 9; // MUST BE ODD NUMBER

      // SETS start and end variables
        // START:
          var start = pagination.page_number - (Math.round((linkLength-3)/2)); // start = left three places of current page
          if (start <= 1) start = 2; // if it goes to first page or negative, set to 2
        // END:
          if ((start + (linkLength-3)) >= pagination.page_count) { // if lastpage or close to
            var end = pagination.page_count - 1;
            start = pagination.page_count - (linkLength-1);
          } else { // if far away from last page
            var end = start + (linkLength-3);
          }

      function addArrow(dir) {

        function appendArrow() {
          var newUrl = '/index.html?' + $.param(tmpParams);
          var arrow = a.clone().addClass(dir + '-page').html($('<i/>').addClass('fa fa-caret-' + dir)).attr('href', newUrl);
          PaginationElm.append(arrow);
        }

        var tmpParams = jQuery.extend(true, {}, params);
        if ((dir == 'left') && (tmpParams.page != 1)) {
          tmpParams.page = pagination.page_number - 1;
          appendArrow();
        }
        if ((dir == 'right') && (pagination.page_number != pagination.page_count)) {
          tmpParams.page = pagination.page_number + 1;
          appendArrow();
        }
      }

      function addElipsis(dir) {
        function appendElipsis() {
          var newUrl = '/index.html?' + $.param(tmpParams);
          var elipsis = a.clone().addClass(dir + '-elipsis').text('...').attr('href', newUrl);
          PaginationElm.append(elipsis);
        }

        var tmpParams = jQuery.extend(true, {}, params);

        if ((dir == 'left') && (tmpParams.page > (linkLength - 4))) {
          tmpParams.page = pagination.page_number - 10;
          appendElipsis();
        }

        if ((dir == 'right') && (tmpParams.page < pagination.page_count - 4)) {
          tmpParams.page = pagination.page_number + 10;
          if (tmpParams.page >= pagination.page_count) {
            tmpParams.page = end + 1;
          }
          appendElipsis();
        }
      }

      function addFirstPage() {
        // adds first page
          var newpage;
          if (pagination.page_number == 1) {
            newpage = span.clone().text('1').addClass('first-page');
          } else {
            newpage = a.clone();
            var tmpParams = jQuery.extend(true, {}, params);
                tmpParams.page = 1;
            var newUrl = '/index.html?' + $.param(tmpParams);
            if (byLocation) newUrl += '&location.address=' + byLocation;
            newpage.text(1).attr('href', newUrl).addClass('first-page');
          }
          PaginationElm.append(newpage);
      }

      function addMiddlePages() {
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
      }

      function addLastPage() {
          var tmpParams = jQuery.extend(true, {}, params);
              tmpParams.page = pagination.page_count;
          var newUrl = '/index.html?' + $.param(tmpParams);
          if (byLocation) newUrl += '&location.address=' + byLocation;

          if (pagination.page_number == pagination.page_count) {
            newpage = span.clone().text(pagination.page_count).addClass('last-page');
          } else {
            newpage = a.clone();
            newpage.text(pagination.page_count).attr('href', newUrl).addClass('last-page');
          }
          PaginationElm.append(newpage);
      }

      addArrow('left');
      addFirstPage();
      addElipsis('left');
      addMiddlePages();
      addElipsis('right');
      addLastPage();
      addArrow('right');

      PaginationElm.append()
      PaginationElm.show();
    }

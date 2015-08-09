// var timeFormat = 'hh:mm a';
// time = jQuery.format.date(str, timeFormat);


  var EB_URL = 'https://www.eventbriteapi.com/v3';
  var EB_TOKEN = 'OUZ32QGNYHRKXKKDBMTA';


  // SERVICES
    // Events Service
      var eventsService = {
        list: function(params, userId) {
          var apiUrl = EB_URL + '/events/search/' + '?token=' + EB_TOKEN;
          if (params) apiUrl += '&' + $.param(params);
          if (userId) apiUrl += '&user.id=' + userId;
          if (byLocation) apiUrl += '&location.address=' + byLocation;

          return $.ajax({
            dataType: 'json',
            url: apiUrl,
            type: 'GET'
          });
        },
        get: function(id, params) {
          var apiUrl = EB_URL + '/events/' + id + '/?token=' + EB_TOKEN;
          if (params) apiUrl += '&' + $.param(params);
          return $.ajax({
            dataType: 'json',
            url: apiUrl,
            type: 'GET'
          });
        },
        post: function() {
          return null;
        },
        update: function() {
          return null;
        },
        remove: function() {
          return null;
        }
      }


  // MAIN APP
  var params =  {
    expand: 'venue',
    sort_by: 'date',
    page: 1
  };

  var userId = '142688710831'; // example user.id
  var eventId = '17659525115'; // example event id

  var EventsElm = $('#eventListSection');
  var loadingElm = $('#loading');
  var SortByOption = $('#sortByOption');
  var NearLocation = $('#nearLocation');
  var SearchBtn = $('#searchBtn');

  $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
  }

  if($.urlParam('page')) {
    params.page = $.urlParam('page');
    if (params.page < 0) {
      params.page = 0;
      window.location.replace('/index.html?location.address=' + NearLocation.val() + '&' + $.param(params));
    }
  };

  if($.urlParam('sort_by')) {
    SortByOption.val($.urlParam('sort_by'));
    params.sort_by = $.urlParam('sort_by');
  };

  if($.urlParam('location.address')) {
    var byLocation = $.urlParam('location.address');
    NearLocation.val(byLocation);
  };




  function clearEvents() {
    EventsElm.empty();
  };

  function createListEventsMarkup(res) {
    clearEvents();
    var ul = $('<ul/>').addClass('main-events-list').appendTo(EventsElm);
    var li = $('<li/>').addClass('single-event');

    for (var i=0; i<res.events.length; i++) {
      $(ul).append(li.clone().text(res.events[i].name.text));
    }
  }

  function listEvents() {
    clearEvents()
    loadingElm.show();
    return eventsService.list(params)
      .then(function(res) {
        console.log(res);
        // todo: if events is empty....
        loadingElm.hide();
        createListEventsMarkup(res);
        setPagination(res.pagination);
      });
  };

  function listEvent() {
    loadingElm.show();
    eventsService.get(eventId)
      .then(function(res) {
        loadingElm.hide();
      });
  };

  // UPDATES OPTIONS
    // Sort By
    SortByOption.change(function(e) {
      params.sort_by = e.target.value;
      window.location.replace('/index.html?' + $.param(params));
    });
    // Location Near
    SearchBtn.click(function(e) {
      window.location.replace('/index.html?location.address=' + NearLocation.val() + '&' + $.param(params));
    });

listEvents();

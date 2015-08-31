// *****************
// EVENTS CONTROLLER
// *****************

  function clearEvents() {
    EventsElm.empty();
  };

  function createListEventsMarkup(res) {
    clearEvents();
    var ul = $('<ul/>').addClass('main-events-list').appendTo(EventsElm);
    var li = $('<li/>').addClass('single-event');
    var a = $('<a/>');

    for (var i=0; i<res.events.length; i++) {
      $(ul).append(a.clone().attr('href', 'event.html?event_id=' + res.events[i].id).append(li.clone().text(res.events[i].name.text)));
    }
  }

  function listEvents() {
    clearEvents()
    loadingElm.show();
    return eventsService.list(params)
      .then(function(res) {
        console.log('Events Found: ');
        console.log(res);
        // todo: if events is empty....
        loadingElm.hide();
        createListEventsMarkup(res);
        setPagination(res.pagination);
      });
  };

// ********************
// MAIN EVENTS PAGE APP
// ********************

  // Default Variables
    var EventsElm = $('#eventListSection');
    params.expand =  'venue';

  // Main Events Page Function
    function mainEventsFunction() {
      listEvents();
    };

  $(function() {
    mainEventsFunction();
  });

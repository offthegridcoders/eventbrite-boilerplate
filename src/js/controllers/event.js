// ********************
// EVENT CONTROLLER
// ********************

  function buildEventPage(event) {
    var h1 = $('<h1/>');
    var date = $('<date/>');
    var p = $('<p/>');
    var logo = $('<img/>').addClass('logo');

    EventsElm.append(logo.clone().attr('src', event.logo.url));
    EventsElm.append(h1.clone().text(event.name.text));
    EventsElm.append(date.clone().text('Time: ' + $.format.date(event.start.local, "dd/MM/yyyy h:mma") + ' to ' + $.format.date(event.end.local, "dd/MM/yyyy h:mma")));
  };

  function listEvent(id) {
    loadingElm.show();
    eventsService.get(id)
      .then(function(res) {
        console.log('Event Found: ');
        console.log(res);
        buildEventPage(res);
        loadingElm.hide();
      });
  };

// ********************
// MAIN EVENT PAGE APP
// ********************

  // Default Variables
    var EventsElm = $('#eventSection');
    var params =  {expand: 'venue'};
    var event_id;

    if($.urlParam('event_id')) {
      event_id = $.urlParam('event_id');
    };

  // Main Events Page Function
    function mainEventsFunction() {
      listEvent(event_id);
    };

  $(function() {
    mainEventsFunction();
  });

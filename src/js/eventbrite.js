
//var ebUrl = 'https://www.eventbriteapi.com/v3/events/search/?token=' + ebPublicToken + '&user.id=142688710831&expand=venue&sort_by=date'

// EVENTBRITE API
  var listContainer = $('#events');
  var singleContainer = $('#event');

  var loadingEventsContainer = $('#loadingEvents');
  var noEventsFoundContainer = $('#noEventsFound');

  function formatDate(str) {
    var formattedDate = new Date(str);
    var d = formattedDate.getDate();
    var m =  formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    var y = formattedDate.getFullYear();
    return m + "/" + d + "/" + y;
  }

  function formatTime(str) {
    console.log(str);

    var timeFormat = 'hh:mm a';

    time = jQuery.format.date(str, timeFormat);

    console.log(time);

    return time;
  }

  function loadAllEvents(url) {
    loadingEventsContainer.show();

    $.ajax({
      dataType: "json",
      url: url,
      type: 'GET',
      data: '',
      success: function(res) {
        loadingEventsContainer.hide();
        if (events.length == 0) {
          noEventsFoundContainer.show();
        } else {
         noEventsFoundContainer.hide();
         createListMarkup(res.events);
        }
      },
      error: function(res) {
        loadingEventsContainer.hide();
        noEventsFoundContainer.show();
      }
    });
  };

  function loadSingleEvent(url) {
    $.ajax({
      dataType: "json",
      url: url,
      type: 'GET',
      data: '',
      success: function(res) {
        loadVenueInformation(res.venue_id, res)
      }
    });
  };

  function loadVenueInformation(venueId, event) {
    var url = 'https://www.eventbriteapi.com/v3/venues/' + venueId + '/?token=C4C3HV4MMSZ3WJVUZSHZ';
    $.ajax({
      dataType: "json",
      url: url,
      type: 'GET',
      data: '',
      success: function(res) {
        createDetailMarkup(res, event);
      }
    });
  };

  function createListMarkup(events) {
    var ul = $('<ul/>').addClass('main-event-ul'),
        li = $('<li/>'),
        h2 = $('<h1/>'),
        p = $('<p/>'),
        img = $('<img/>'),
        date = $('<date/>'),
        a = $('<a/>'),
        button = $('<button/>');

    $.each(events, function( index, value ) {
      var newItemHtml = li.clone();

      // add logo
      img.clone()
         .attr('src', value.logo.url)
         .addClass('logo')
         .appendTo(newItemHtml);

       // add buy tickets button
       a.clone()
       .attr('href', value.url)
       .attr('target', '_new')
       .addClass('button-href')
       .append(button.clone()
                     .text('buy tickets')
                     .addClass('buy-tickets-button btn-default'))
       .appendTo(newItemHtml);

      // add date

      var eventTimeRange = formatDate(value.start.local) + '  ' + formatTime(value.start.local) + ' - ' + formatTime(value.end.local);
      date.clone()
          .text(eventTimeRange)
          .appendTo(newItemHtml);

      // add title
      h2.clone()
        .text(value.name.text)
        .addClass('title')
        .appendTo(newItemHtml);

      // add address
      var addressHTML = '<a target="_new" href="http://maps.google.com?q=' + value.venue.address.address_1 + ', ' + value.venue.address.city + ', ' + value.venue.address.region + ' ' + value.venue.address.postal_code + '"><i class="fa fa-map-marker"></i></a> ' + value.venue.address.address_1 + ', ' + value.venue.address.city + ', ' + value.venue.address.region + ' ' + value.venue.address.postal_code;
      p.clone()
        .html(addressHTML)
        .addClass('venue-address')
        .appendTo(newItemHtml);

      // add view details link
      a.clone()
        .text('See Details')
        .attr('href', '/event/?id=' + value.id)
        .addClass('details')
        .appendTo(newItemHtml);

      // append full item to main list
      newItemHtml.appendTo(ul);
    });

    ul.appendTo(listContainer).addClass('main-event-ul');
  }

  function createDetailMarkup(venue, event) {
    var h2 = $('<h2/>'),
        p = $('<p/>'),
        a = $('<a/>'),
        date = $('<date/>'),
        button = $('<button/>');

    $('#eventTitle').text(event.name.text) // sets header title


    // event description
    var eventHTML = '<h2>Event Description</h2>' + event.description.html;

    $('#eventDescription').html(eventHTML);
    var detailsBlock = $('#eventDetails');

    // section title
    h2.clone()
        .text('Event Details')
        .appendTo(detailsBlock);

    // add date
    date.clone()
        .text(formatDate(event.start.local))
        .addClass('event-date')
        .appendTo(detailsBlock);

    // add time range
    var eventTimeRange = formatTime(event.start.local) + ' - ' + formatTime(event.end.local);

    p.clone()
        .text(eventTimeRange)
        .addClass('event-time')
        .appendTo(detailsBlock);

    // add venue name
    p.clone()
      .addClass('venue-name')
      .text(venue.name)
      .appendTo(detailsBlock);

    // add venue address
    var addressHTML = '<a target="_new" href="http://maps.google.com?q=' + venue.address.address_1 + ', ' + venue.address.city + ', ' + venue.address.region + ' ' + venue.address.postal_code + '"><i class="fa fa-map-marker"></i></a> ' + venue.address.address_1 + ', ' + venue.address.city + ', ' + venue.address.region + ' ' + venue.address.postal_code;

    p.clone()
      .html(addressHTML)
      .addClass('venue-address')
      .appendTo(detailsBlock);

    // add buy tickets button
    a.clone()
      .attr('href', event.url)
      .attr('target', '_new')
      .addClass('button-href')
      .append(button.clone()
                    .text('buy tickets')
                    .addClass('buy-tickets-button btn-default'))
      .appendTo(detailsBlock);

    // back to events link
    a.clone()
      .attr('href', '/events')
      .addClass('back-to-events-a')
      .html('<i class="fa fa-caret-left"></i> back to events')
      .appendTo(detailsBlock);
  };

  function initAllEvents() {
    loadingEventsContainer.hide();
    noEventsFoundContainer.hide();
  }

  initAllEvents();

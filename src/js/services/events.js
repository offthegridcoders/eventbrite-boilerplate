// Events Service
  var eventsService = {
    list: function(params) {
      console.log('-- Finding Events --');
      console.log('With Params:');
      console.log(params);
      var apiUrl = EB_URL + '/events/search/' + '?token=' + EB_TOKEN;
      if (params) apiUrl += '&' + $.param(params);

      return $.ajax({
        dataType: 'json',
        url: apiUrl,
        type: 'GET'
      });
    },
    get: function(id) {
      console.log('-- Finding Event --');
      console.log('by ID:' + id);
      var apiUrl = EB_URL + '/events/' + id + '/?token=' + EB_TOKEN;
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

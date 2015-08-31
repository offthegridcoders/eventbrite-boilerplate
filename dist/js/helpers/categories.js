// ******************
// Categories Service
//
// https://www.eventbrite.com/developer/v3/endpoints/categories/
// ******************

  var categoriesService = {
    list: function() {
      console.log('-- Finding Categories --');
      var apiUrl = EB_URL + '/categories/' + '?token=' + EB_TOKEN;
      return $.ajax({
        dataType: 'json',
        url: apiUrl,
        type: 'GET'
      });
    },
    get: function(id) {
      var apiUrl = EB_URL + '/categories/' + id + '/?token=' + EB_TOKEN;
      return $.ajax({
        dataType: 'json',
        url: apiUrl,
        type: 'GET'
      });
    }
  }


// *****************
// CATEGORIES BUILDER
// *****************

  var CategoriesElm = $('#Categories');

  function buildCategorySelectBox(categories) {
    var newCategory = $('<option/>');

    for (var i=0;i<categories.length;i++) {
      var newCategoryId = categories[i].id;
      var newCategoryName = categories[i].name;
      var newCat = newCategory.clone();
      newCat.attr('value', newCategoryId);
      newCat.text(newCategoryName);
      newCat.appendTo(CategoriesElm);
    }
  };

  function getCategories() {
    return categoriesService.list()
      .then(function(res) {
        console.log('Categories Found: ');
        console.log(res);
        buildCategorySelectBox(res.categories);
      });
  };

  getCategories();

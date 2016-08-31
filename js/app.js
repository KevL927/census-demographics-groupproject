$( document ).ready(function() {

  var $template = $('<option>');

  var states = [null,'AL','AK',null,'AZ','AR','CA',null,'CO','CT','DE','DC','FL','GA',null,'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA',null,'RI','SC','SD','TN','TX','UT','VT','VA',null,'WA','WV','WI','WY'];

  states.forEach(function(state,index){
    if(state === null) { return; }
    var $templateClone = $template.clone();

      $templateClone.val(index)
                    .text(state);

      $('.state-list').append($templateClone)
  });

  $('.census-form').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('.state-list').val();
    searchTerm = '0' + searchTerm
    getRequest(searchTerm);
  })

  function getRequest(searchTerm) {

    var params = {
      'key': '761f74a5270b2aa6a34a35e45d54f4fcc3af92c0',
      'for': 'state:'+ searchTerm,
      'get': 'P0010001'
      }

    $.getJSON('http://api.census.gov/data/2010/sf1', params,
      function(data) {
      var population = data[1][0];
      $("#num-of-people").text(population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    });
    
  }
});

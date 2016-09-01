$( document ).ready(function() {

  var states = [null,'AL','AK',null,'AZ','AR','CA',null,'CO','CT','DE','DC','FL','GA',null,'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA',null,'RI','SC','SD','TN','TX','UT','VT','VA',null,'WA','WV','WI','WY'];

  var $template = $('<option>');

  states.forEach(function(state,index){
    if(state === null) { return; }
    var $templateClone = $template.clone();

      $templateClone.val(index)
                    .text(state);

      $('.state-list').append($templateClone);
  });

  $('.census-form').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('.state-list').val();

    searchTerm = '0' + searchTerm;
    setBackground(searchTerm);
    getRequest(searchTerm);
  })

  function setBackground (statesArrayIndex) {
    $('body').css('background-image', 'url(images/' + states[+statesArrayIndex.slice(1)] + '.jpg)');
  }

/* Code representation:
geography = 'NAME', totalPopulation = 'P0010001', whitePop = 'P0100003', blackOrAfricanAmericanPop = 'P0100004', americanIndianAndAlaskaNativePop = 'P0100005', AsianPop = 'P0100006', nativeHawaiianAndOtherPacificIslanderPop = 'P0100007', malePop = 'P012A002', femalePop = 'P012A026', otherRace = 'P0100008', totalHousingUnits = 'H00010001', totalOccupiedHousingUnits = 'H0100001' */

  var getCode = ['P0010001','P0100003','P0100004','P0100005','P0100006','P0100007','P012A002','P012A026','P0100008','H00010001','H0100001'],
      getCodeLength = getCode.length-1;

  function getRequest(searchTerm, currentGetCode) {

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


    // Remove comments to enable other numbers
    // if(getCodeLength > -1) {
    //   getCodeLength--;
    //   return getRequest(searchTerm, getCode.shift());
    // }
  }
});

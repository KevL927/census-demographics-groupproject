$(document).ready(function() {

    var states = ['AL', "AK", "three", "AZ", "AR", "CA", "seven", "CO", "CT", "DE", "DC", "FL", "GA", "Fourteen", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "Forty-three", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "Fifty-two", "WA", "WV", "WI", "WY"];

    $('.census-form').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('.city-box').val();
        searchTerm = states.indexOf(searchTerm) + 1;
        searchTerm = searchTerm.toString();
        if (searchTerm < 10) {
            searchTerm = (('0' + searchTerm).slice(-2))
        }

        getRequest(searchTerm);
    })

    function getRequest(searchTerm) {
        var params = {
            key: '761f74a5270b2aa6a34a35e45d54f4fcc3af92c0'
        }
        $.getJSON('http://api.census.gov/data/2010/sf1?get=P0010001&for=state:' + searchTerm, params,
            function(data) {

                console.log(data[1][0]);
                $("#numOfpeople").css("font-size" ,'4em').text(data[1][0])
            }

        )

    }



  
});

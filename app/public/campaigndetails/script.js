$(document).ready(function() {
  var idName ='58c4bb4170900285867fcdd3'
  var tickerName='TRIGX'

  var getData = function(id, tick) {
    return $.ajax({
      crossDomain: true,
      url: 'http://localhost:8080/campaigns-details?id=' + idName + '&funds=' +tickerName,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log("wtf is this shit")
        handleResponse(data);
      },
      error: function(er) {
      return $.ajax({
        crossDomain: true,
        url: 'http://52.39.21.43:8080/campaigns-details?id=' + idName + '&funds=' +tickerName,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          console.log("wtf is this shit")
          handleResponse(data);
        }
    })
  }
})
  }

    // manipulate data to display info
  var handleResponse = function(data) {
    $('#ticker').text(data.funds[0].assets[0].name+ '(' + data.funds[0].assets[0].ticker + ')')
    $('#share').text(data.funds[0].assets[0].name+ ': '+ data.funds[0].assets[0].shares)

    // $('#des').html(" ")
    //on enter display information
  };
  //call search here
  getData()

  $(function () {
      $('#emailbutton').click(function (event) {
        var email = 'YourMututalFund@invest.com';
        var subject = $('campaign-name').text();
        var emailBody = $('campaign-description').text();
        var attach = 'path';
        document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody+
            "?attach="+attach;
      });
    });
})

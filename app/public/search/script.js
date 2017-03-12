$(document).ready(function(){
 var getData = function(nameSearch){
    var pName = 'BUFBX'
    return $.ajax({
      crossDomain: true,
      url: 'http://localhost:8080/campaigns?ticker=' + pName,
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log("wtf is this shit")
        handleResponse(data);
      },
      error: function(er, textStatus, error) {
        console.log("is there an error here?")
        console.log(er)
        console.log(error)
      }
    })
  }
  var addAJAXFunction = function(data){
    $('input').bind("enterKey",function(e){
    // alert("Enter");
      $('#campaignDisplay').show();
        // e.preventDefault()
      });
      $('input').keydown(function(e){
        if(e.keyCode == 13){
          e.preventDefault()
          $(this).trigger("enterKey");
          //clear information on load
          e.currentTarget.value = "";
          getData()
      }

    });
  }
  // manipulate data to display info
  var handleResponse = function(data){
    console.log("datacheck")
    console.log(data)
    data.forEach(function(object) {
      var placeDes = "Pneumonia is one of te leading cases of death among children around the world. You can help make the cost of the vaccine affordable."
      var $vals = $("<h4>Associated Campaigns</h4>"+
        "<p>" + object.name + "</p>"+
        "<img src=''>"+
        "<p>Description: " +object.description+ "</p>" +
        "<p># of Participants: " + object.totalBackers + "</p>" +
        "<div class='progress'><div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='90' style='width:40%'>40%</div></div>" +
        "<p class='expire'>Expires:" + data.deadline + " </p>")
      $('#campaignDisplay').append($vals)
    });
    // $('#des').html(" ")
    //on enter display information

  };


  //call search here
  addAJAXFunction()

  var availableTags = [
        "Vanguard",
        "something",
        "something else",
        "hi"];
  $( "#tags" ).autocomplete({
    source: availableTags
  });



})



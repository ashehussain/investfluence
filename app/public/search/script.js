$(document).ready(function(){
 var getData = function(nameSearch){
    return $.ajax({
      url: 'http://localhost:8080/campaigns',
      method: 'GET',
      success: function(data){
        console.log(data);
        console.log(data[0])
        handleResponse(data);
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
    console.log(data[0])

    // $('#des').html(" ")
    //on enter display information
    var placeDes = "Pneumonia is one of te leading cases of death among children around the world. You can help make the cost of the vaccine affordable."
    var $vals = $("<h4>Associated Campaigns</h4>"+
      "<img src=''>"+
      "<p>Description: " +placeDes+ "</p>" +
      "<p># of Participants: " + 40 + "</p>" +
      "<div class='progress'><div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='90' style='width:40%'>40%</div></div>" +
      "<p class='expire'>Expires:" + data.expire + " </p>")
    $('#campaignDisplay').append($vals)
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



$(document).ready(function(){

var availableTags = [
      "Vanguard",
      "something",
      "something else",
      "hi"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
$('input').bind("enterKey",function(e){
// alert("Enter");
$('#campaignDisplay').show();
e.preventDefault()
});
$('input').keyup(function(e){
if(e.keyCode == 13)
{
  $(this).trigger("enterKey");
}
});
})



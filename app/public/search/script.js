$(document).ready(function() {
  var getData = function(ticker) {
    var tickerName = ticker
    return $.ajax({
      crossDomain: true,
      url: 'http://localhost:8080/campaigns?ticker=' + tickerName,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
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
  var addAJAXFunction = function(data) {
   $('input').bind("enterKey", function(e) {
    // alert("Enter");
      $('#campaignDisplay').show();
      // e.preventDefault()
      });
      $('input').keydown(function(e) {
        if (e.keyCode == 13) {
          e.preventDefault()
          $(this).trigger("enterKey");
          //clear information on load

          var $ticker = $('#tags').val();
          console.log($ticker)
          getData($ticker);
          e.currentTarget.value = $ticker;
        }
      });
        var availableTags = [
        {"label": "T. Rowe Price International Gr & Inc", "ticker": "TRIGX"},
        {"label": "Fidelity® Series Growth & Income","ticker": "FGLGX"},
        {"label": "Vanguard Windsor™ II Inv","ticker": "VWNFX"},
        {"label": "Fidelity® Growth & Income","ticker": "FGRIX"},
        {"label": "Fidelity® Balanced", "ticker": "FBALX"},
        {"label": "Fidelity VIP Contrafund Inv", "ticker": "FAVCF"},
        {"label": "T. Rowe Price Overseas Stock", "ticker": "TROSX"},
        {"label": "Fidelity® Select Pharmaceuticals Port", "ticker": "FPHAX"},
        {"label": "Fidelity® Mega Cap Stock", "ticker": "FGRTX"},
        {"label": "Fidelity® Puritan®", "ticker": "FPURX"},
        {"label": "Fidelity Advisor® Capital Development O", "ticker": "FDETX"},
        {"label": "American Beacon Lg Cap Value Inst", "ticker": "AADEX"},
        {"label": "Fidelity® Large Cap Stock", "ticker": "FLCSX"},
        {"label": "Strategic Advisers® Core", "ticker": "FCSAX"},
        {"label": "GMO International Equity III", "ticker": "GMOIX"},
        {"label": "AST Large-Cap Value", "ticker": "AST_LARG_C"},
        {"label": "Vanguard PRIMECAP Inv", "ticker": "VPMCX"},
        {"label": "DFA International Core Equity I", "ticker": "DFIEX"},
        {"label": "Buffalo Flexible Income", "ticker": "BUFBX"},
        {"label": "Market Vectors® Pharmaceutical ETF", "ticker": "PPH"},
        {"label": "Vanguard Total Stock Mkt Idx", "ticker": "VTSMX"},
        {"label": "Vanguard 500 Index Inv", "ticker": "VFINX"},
        {"label": "SPDR® S&P 500 ETF", "ticker": "SPY"},
        {"label": "Vanguard Institutional Index I", "ticker": "VINIX"},
        {"label": "Health Care Select Sector SPDR® ETF", "ticker": "XLV"},
        {"label": "Fidelity Spartan® 500 Index Inv", "ticker": "FUSEX"},
        {"label": "Vanguard Value Index Inv", "ticker": "VIVAX"},
        {"label": "MFS Value A", "ticker": "MEIAX"},
        {"label": "Franklin Income A", "ticker": "FKINX"},
        {"label": "BlackRock Equity Dividend Inv B", "ticker": "MBDVX"},
        {"label": "Vanguard Wellington™ Inv", "ticker": "VWELX"},
        {"label": "iShares Russell 1000 Value", "ticker": "IWD"},
        {"label": "CREF Stock R1", "ticker": "QCSTRX"},
        {"label": "VA CollegeAmerica Inc Fund of Amer 529E", "ticker": "NULL"},
        {"label": "Vanguard Wellesley Income", "ticker": "VWINX"},
        {"label": "Vanguard High Dividend Yield ETF", "ticker": "VYM"},
        {"label": "Vanguard Equity-Income Inv", "ticker": "VEIPX"},
        {"label": "VA CollegeAmerica WA Mutual 529B", "ticker": "NULL"},
        {"label": "T. Rowe Price Value", "ticker": "TRVLX"
      }];
  $("#tags").autocomplete({
    minLength: 2,
    source: function(request, response) {
      response($.map(availableTags, function(value, key) {
        return {
          label: `${value.label} (${value.ticker})`,
          value: value.ticker
        };
      }));
    },
    focus: function(event, ui) {
      $('#tags').val(ui.item.value);
      return false;
    },
    // Once a value in the drop down list is selected, do the following:
    select: function(event, ui) {
      // place the person.given_label value into the textfield called 'select_origin'...
      $('#tags').val(ui.item.label);
      // and place the person.id into the hidden textfield called 'link_origin_id'.
      $('#link_origin_id').val(ui.item.id);
      return false;
    }
  });
    }
    // manipulate data to display info
  var handleResponse = function(data) {
    console.log("datacheck")
    console.log(data)
    data.forEach(function(object) {
      var placeDes = "Pneumonia is one of te leading cases of death among children around the world. You can help make the cost of the vaccine affordable."
      var $vals = $("<h4>Associated Campaigns</h4>" + "<p>" + object.name +
        "<button id='goToCampaign'> Campaigns</button>"+
        "</p>" + "<img src=''>" + "<p>Description: " + object.description + "</p>" + "<p># of Participants: " + object.totalBackers + "</p>" + "<div class='progress'><div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='90' style='width:40%'>40%</div></div>" + "<p class='expire'>Expires:" + data.deadline + " </p>")
      $('#campaignDisplay').append($vals)
    });
    // $('#des').html(" ")
    //on enter display information
      $('#goToCampaign').click(function(event) {
    window.location.replace("/campaigndetails");
    });
  };
  //call search here
  addAJAXFunction()


})

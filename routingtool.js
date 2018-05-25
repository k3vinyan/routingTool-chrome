$( document ).ready(function(){

  let clusterData = {};
  let routeNames = [];
  let routeData = [];
  let newRouteData = [];
  let allRouteNames = []
  let names = []
  let counter = 0;

  const clusterElements = $("[id^=graph-]");

  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

  for(var i = 3; i < clusterElements.length; i++){

    clusterName = $(clusterElements[i]).attr("transform", "transform(120, 20)").children("h2").text();
    routeNames.push($(clusterElements[i]).attr("transform", "translate(120,20)").children('svg').children('g').children('.y').children('.tick'));
    routeData.push($(clusterElements[i]).attr("transform", "translate(120,20)").children('svg').children('g').children('.g').children('text'));
  }

  for(var i = 0; i < routeData.length; i++){
    for(var j = 0; j < routeData[i].length; j++){
      newRouteData.push((routeData[i][j]).innerHTML)
    }
  }

//loop through route name
for(var i  = 0; i < routeNames.length; i++){
  for(var j = 0; j < routeNames[i].length; j++){
    obj = {}
    names.push($(routeNames[i][j]).text());
    obj[$(routeNames[i][j]).text()] = {
      betweenFC: "",
      atStation: "",
      departure: "",
      onRoad: "",
      delivered: "",
      attempted: "",
      undelivered: "",
      other: ""
    }
    allRouteNames.push(obj);
  }
}

for(var i = 0; i < newRouteData.length; i++){
  var mod = i%8;

  switch(mod){
    case 0:
      allRouteNames[counter][names[counter]]['betweenFC'] = newRouteData[i];
      break;
    case 1:
      allRouteNames[counter][names[counter]]['atStation'] = newRouteData[i];
      break;
    case 2:
      allRouteNames[counter][names[counter]]['departure'] = newRouteData[i];
      break;
    case 3:
      allRouteNames[counter][names[counter]]['onRoad'] = newRouteData[i];
      break;
    case 4:
      allRouteNames[counter][names[counter]]['delivered'] = newRouteData[i];
      break;
    case 5:
      allRouteNames[counter][names[counter]]['attempted'] = newRouteData[i];
      break;
    case 6:
      allRouteNames[counter][names[counter]]['undelivered'] = newRouteData[i];
      break;
    case 7:
      allRouteNames[counter][names[counter]]['other'] = newRouteData[i];
      counter++;
      break;
    default:
      console.log("something went wrong in switch case");

  }
}

  $.ajax({
    type: "POST",
    url: "http://localhost:9000/api/routingtools",
    data: JSON.stringify( allRouteNames),
    success: function(data){
      console.log(data)
      console.log("request successful!")
    },
    error: function(data){
      console.log("An error has occurred.  Please check if server is on....")
    }
  });

  setTimeout(function () {
    location.reload();
  }, 300000);
});

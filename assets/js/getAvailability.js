function loadJSON() {

  jQuery(document).ready(function() {
                     jQuery.getJSON('data/pushvailability-test-export.json', function(data) {
                          var output="";
                          jQuery.each(data.users, function(index, element) {
                              var time = moment(element.lastUpdated).format('dddd');
                              var timeday = moment(element.lastUpdated).day();
                              var today = moment().day();
                              var first_el =  Math.abs(parseFloat(timeday) - parseFloat(today));
                              var toda     = element.availabilityArray[first_el];
                              var sum = element.availabilityArray.reduce((previous, current) => current += previous);
                              var avg = sum / element.availabilityArray.length;
                              var fullavg = Math.round(sum / element.availabilityArray.length);
                              if(avg > fullavg){
                                  var sig = '>';
                              }else{
                                  var sig = '<';
                              }
                              if(toda == 1){
                                  var color = 'green';
                              }else if(toda == 2){
                                  var color = 'lightgreen';
                              }else if(toda == 3){
                                  var color = 'yellow';
                              }else if(toda == 4){
                                  var color = 'orange';
                              }else if(toda == 5){
                                  var color = 'red';
                              }else{
                                  var color = 'red';
                              }
                              if(fullavg == 1){
                                  var avgcolor = 'green';
                              }else if(fullavg == 2){
                                  var avgcolor = 'lightgreen';
                              }else if(fullavg == 3){
                                  var avgcolor = 'yellow';
                              }else if(fullavg == 4){
                                  var avgcolor = 'orange';
                              }else if(fullavg == 5){
                                  var avgcolor = 'red';
                              }else{
                                  var avgcolor = 'red';
                              }

                              output+="<tr>";
                              output+="<td><div class='circle' style='background:"+color+"'>" + toda+ "</span></td>";
                              output+="<td>" + element.name+ "</td>";
                              output+="<td><div class='circle' style='background:"+avgcolor+"'>" +sig+' '+ fullavg+ "</span></td>";
                              output+="</tr>";
                          });

                          jQuery('table').append(output);
                      });

                  });
}

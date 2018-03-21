function loadJSON() {

    jQuery(document).ready(() => {
        jQuery.getJSON('data/pushvailability-test-export.json', (data) => {
            let output = [];
           const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length



            for (var key in data.users) {
                const start = moment(data.users[key].lastUpdated);
          //      data.users[key]
            //    console.log('Number of Nodes in JSON file is : ', data.user.length);
                const end = moment();
                const range = moment.range(start, end);
//console.log(range);
                const days = range.diff('days');
            //    console.log('Days are ',days);

                if (days >= 0 && days < 7) {
                    let result = {
                        today: null,
                        average: null,
                        name: null,
                        absent: null
                    }

                    var tod = result.today = data.users[key].availabilityArray[days]
                    var ave = result.average = arrAvg(data.users[key].availabilityArray.splice(days + 1))
                  //  var roundedAve = Math.round(ave)
                    var nam = result.name = data.users[key].name
                    var absentVal = result.absent = data.users[key].absent


              //     console.log('The average is ', ave);
                    if (absentVal == false) {
                        output.push(result)
                    }

                }

                else {

                  let altResult = {
                    today:'None',
                    average: 'None',
                    name:'No person found',

                  }
                  output.push(altResult);
                  break;
                }


            }
            console.log('The output is ',output);

            // console.log('The output is ',output);
            // console.log('The first output is ', output[0].name);
            // console.log('The output count is ', output.length);


            for (var a = 0; a < output.length; a++) {


                if (output[a].today == 1) {
                    var color = 'green';
                } else if (output[a].today == 2) {
                    var color = 'lightgreen';
                } else if (output[a].today == 3) {
                    var color = 'yellow';
                } else if (output[a].today == 4) {
                    var color = 'orange';
                } else if (output[a].today == 5) {
                    var color = 'red';
                } else {
                    var color = 'red';
                }
                if (output[a].average == 1) {
                    var avgcolor = 'green';
                } else if (output[a].average == 2) {
                    var avgcolor = 'lightgreen';
                } else if (output[a].average == 3) {
                    var avgcolor = 'yellow';
                } else if (output[a].average == 4) {
                    var avgcolor = 'orange';
                } else if (output[a].average == 5) {
                    var avgcolor = 'red';
                } else {
                    var avgcolor = 'yellow';
                }



                $('table').append("<tr><td><div class='circle' style='background:" + color + "'>" + output[a].today + "</span></td><td>" + output[a].name + "</td> <td><div class='circle' style='background:" + avgcolor + "'>" + output[a].average + "</span></td></tr>")

            }


        });

    });

}

function loadJSON() {
    jQuery(document).ready(function() {
        jQuery.getJSON('data/newdata.json', function(data) {
            const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length
            let output = [];
            for (var key in data.users) {
                //   console.log(data.users.names)
                const start = moment(data.users[key].lastUpdated);
                const end = moment();
                const range = moment.range(start, end);
                const days = range.diff('days');

                if (days >= 0 && days < 7) {
                    let result = {
                        today: null,
                        average: null,
                        name: null
                    }

                    var tod = result.today = data.users[key].availabilityArray[days]
                    var ave = result.average = arrAvg(data.users[key].availabilityArray.splice(days + 1))
                    var roundedAve = Math.round(ave)
                    var nam = result.name = data.users[key].name
                    var absent = data.users[key].absent
                    console.log('The results are :', result);

               

//Setting Color Codes for Availability
                if (tod == 1) {
                    var color = 'green';
                } else if (tod == 2) {
                    var color = 'lightgreen';
                } else if (tod == 3) {
                    var color = 'yellow';
                } else if (tod == 4) {
                    var color = 'orange';
                } else if (tod == 5) {
                    var color = 'red';
                } else {
                    var color = 'red';
                }
                if (roundedAve == 1) {
                    var avgcolor = 'green';
                } else if (roundedAve == 2) {
                    var avgcolor = 'lightgreen';
                } else if (roundedAve == 3) {
                    var avgcolor = 'yellow';
                } else if (roundedAve == 4) {
                    var avgcolor = 'orange';
                } else if (roundedAve == 5) {
                    var avgcolor = 'red';
                } else {
                    var avgcolor = 'red';
                }

                if(absent == false){
                    output += "<tr>";
                    output += "<td><div class='circle' style='background:" + color + "'>" + tod + "</span></td>";
                    output += "<td>" + nam + "</td>";
                    output += "<td><div class='circle' style='background:" + avgcolor + "'>" + roundedAve + "</span></td>";
                    output += "</tr>";
                }
                }
            }
            jQuery('table').append(output);



        });

    });

}

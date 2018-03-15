function loadJSON() {

    jQuery(document).ready(() => {

        jQuery.getJSON('data/pushvailability-test-export.json', (data) => {
            var output = "";
            jQuery.each(data.users, (index, element) => {

                var time = moment(element.lastUpdated).format('dddd');
                var timeday = moment(element.lastUpdated).day();
                var today = moment().day();
                var first_el = Math.abs(parseFloat(timeday) - parseFloat(today));
                var availability = element.availabilityArray[first_el];
                var sum = element.availabilityArray.reduce((previous, current) => current += previous);
                var avg = sum / element.availabilityArray.length;
                var fullavg = Math.round(sum / element.availabilityArray.length);

                if (avg > fullavg) {
                    var sig = '>';
                } else {
                    var sig = '<';
                }

                if (availability == 1) {
                    var color = 'green';
                } else if (availability == 2) {
                    var color = 'lightgreen';
                } else if (availability == 3) {
                    var color = 'yellow';
                } else if (availability == 4) {
                    var color = 'orange';
                } else if (availability == 5) {
                    var color = 'red';
                } else {
                    var color = 'red';
                }
                if (avg == 1) {
                    var avgcolor = 'green';
                } else if (avg == 2) {
                    var avgcolor = 'lightgreen';
                } else if (avg == 3) {
                    var avgcolor = 'yellow';
                } else if (avg == 4) {
                    var avgcolor = 'orange';
                } else if (avg == 5) {
                    var avgcolor = 'red';
                } else {
                    var avgcolor = 'red';
                }

                output += "<tr>";
                output += "<td><div class='circle' style='background:" + color + "'>" + availability + "</span></td>";
                output += "<td>" + element.name + "</td>";
                output += "<td><div class='circle' style='background:" + avgcolor + "'>" + sig + ' ' + fullavg + "</span></td>";
                output += "</tr>";
            });

            jQuery('table').append(output);
        });

    });
}

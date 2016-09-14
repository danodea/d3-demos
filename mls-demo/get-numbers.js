// data.json includes a whole bunch of data I've scraped,
// so let's grab just the jersey numbers so that making
// the bubble chart is a little easier.
//
// *****
// This script was written quickly and is extremely bad,
// please don't judge it too harshly.
// *****

var fs = require('fs'),
	numbers = [],
	fileToWrite = 'jersey-numbers-' + new Date().toISOString().split(':').join('').slice(0,-5) + '.json';

fs.readFile('data.json', function (err, data) {
	var parsed = JSON.parse(data);
	parsed.forEach( function (el, i) {
		parsed[i].forEach(aggregateNumbers);
	});
	numbers = clean(numbers);
	writeToFile(numbers);
});

// figuring out the best way to structure this data
// has spurred me to start looking for a class
// I could take to get better at structuring data...
function aggregateNumbers (element) {
	var jerseyNum = element.jerseyNumber;
	if (!jerseyNum) {
		return
	} else if (!numbers[jerseyNum]){
		numbers[jerseyNum] = {"jerseyNum": jerseyNum, "count": 1};
	} else {
		numbers[jerseyNum].count++;
	}
};

// this should be a job for .filter(), but
// it seems to skip null elements for some reason?
// docs say it shouldn't, but whatever let's do this:
function clean (array) {
	var newArray = [];
	array.forEach( function (el, i, arr) {
		if (arr[i]) {
			newArray.push(arr[i]);
		}
	});
	return newArray;
};

function writeToFile (data) {
	fs.writeFile(fileToWrite, JSON.stringify(data), function(err) {
		if (!err) {
			console.log('Successfully wrote to ' + fileToWrite);
		}
	});
};
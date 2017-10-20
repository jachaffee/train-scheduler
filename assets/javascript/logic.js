
var config = {
    apiKey: "AIzaSyA_Jf7TgIVn9bepJZY48NjWOAUzqynVr0U",
    authDomain: "train-scheduler-a4b11.firebaseapp.com",
    databaseURL: "https://train-scheduler-a4b11.firebaseio.com",
    projectId: "train-scheduler-a4b11",
    storageBucket: "train-scheduler-a4b11.appspot.com",
    messagingSenderId: "254465515138"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
	event.preventDefault();

	var train = $("#new-train").val().trim();
	var destination = $("#new-destination").val().trim();
	var frequency = $("#new-frequency").val().trim();
	var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");

	var newTrain ={
		train: train,
		destination: destination,
		frequency: frequency,
		first: firstTrain
	};

	database.ref().push(newTrain);

	$("#new-train").val("");
	$("#new-destination").val("");
	$("#new-frequency").val("");
	$("#first-train").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	var train = childSnapshot.val().train;
	var destination = childSnapshot.val().destination;
	var frequency = childSnapshot.val().frequency;
	var firstTrain = childSnapshot.val().firstTrain;
	
	var firstTrainConverted = moment(firstTrain).subtract(1, "years");
	
	var currentTime = moment().format("HH:mm");

	var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
	
	var timeRemainder = diffTime % frequency;

	var minutesTillTrain = frequency - timeRemainder;

	var nextTrain = moment().add(minutesTillTrain, "minutes").format("HH:mm");

	$("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");

});


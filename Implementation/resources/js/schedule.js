$(document).ready(function() {
	
	YUI().use(
	  'aui-scheduler',
	  function(Y) {
		
		Date.prototype.addDays = function(days)
		{
			var dat = new Date(this.valueOf());
			dat.setDate(dat.getDate() + days);
			return dat;
		}
		
		var eventsArray = Array();
		//CustomEvent Object.
		//usage: new CustomEvent(new Date(2015, 5, 16, 0), new Date(2015, 5, 16, 1), "Event name");
		function CustomEvent(startingDate, endingDate, name) {
			this.startDate = startingDate;
			this.endDate = endingDate;
			this.content = name;
			//this.color = "#D96666";
		}
		var clone = (function(){ 
		  return function (obj) { Clone.prototype=obj; return new Clone() };
		  function Clone(){}
		}());
		function addOneWeek(event) {
			var newEvent = clone(event);
			newEvent.startDate = new Date(event.startDate.addDays(7));
			newEvent.endDate = new Date(event.endDate.addDays(7));
			newEvent.content = event.content;
			return newEvent;
		}
	
		function pushSingleEvent(event) {
			eventsArray.push(event);
		}
		function pushEveryWeek(event) {
			var rememberMe = event;
			eventsArray.push(event);
			for (i = 1; i < 52; i++) { 
				var nextWeekEvent = addOneWeek(rememberMe);////var nextWeekEvent = addOneWeek(thisWeekEvent);
				eventsArray.push(nextWeekEvent);
				rememberMe = nextWeekEvent;
			}
		}
		//creating an event
		var event1 = new CustomEvent(new Date(2015, 5, 16, 0), new Date(2015, 5, 16, 1), "Bikram Yoga");			pushEveryWeek(event1);
		var event2 = new CustomEvent(new Date(2015, 5, 17, 1), new Date(2015, 5, 17, 2), "Spinning");			pushEveryWeek(event2);
		var event3 = new CustomEvent(new Date(2015, 5, 17, 2), new Date(2015, 5, 17, 3), "Cardiolates");			pushEveryWeek(event3);
		var event4 = new CustomEvent(new Date(2015, 5, 18, 3), new Date(2015, 5, 18, 4), "Anti-Gravity Yoga");			pushEveryWeek(event4);
		var event5 = new CustomEvent(new Date(2015, 5, 19, 0), new Date(2015, 5, 19, 23), "Running Club");			pushEveryWeek(event5);
		var event6 = new CustomEvent(new Date(2015, 5, 20, 14), new Date(2015, 5, 20, 15), "Stage Circuits");			pushEveryWeek(event6);
		var event7 = new CustomEvent(new Date(2015, 5, 21, 15), new Date(2015, 5, 21, 20), "Timed Station Circuits");			pushEveryWeek(event7);
		var event8 = new CustomEvent(new Date(2015, 5, 22, 13), new Date(2015, 5, 22, 14), "Zumba");			pushEveryWeek(event8);
		var event9 = new CustomEvent(new Date(2015, 5, 22, 12), new Date(2015, 5, 22, 18), "Samba");			pushEveryWeek(event9);
		var event10 = new CustomEvent(new Date(2015, 5, 23, 19), new Date(2015, 5, 23, 20), "Ballet workout");		pushEveryWeek(event10);
		var event11 = new CustomEvent(new Date(2015, 5, 23, 20), new Date(2015, 5, 23, 21), "Taekwondo");		pushEveryWeek(event11);
		var event12 = new CustomEvent(new Date(2015, 5, 23, 21), new Date(2015, 5, 23, 22), "Brazilian jiu-jitsu");		pushEveryWeek(event12);
	
		
		var weekView = new Y.SchedulerWeekView();

		new Y.Scheduler(
		  {
			boundingBox: '#myScheduler',//HTML element
			date: new Date(2015, 5, 16),//first occuring event date
			items: eventsArray,//variable where we stored our events
			render: true,//set render to true so that it renders on load
			views: [weekView]//[dayView, weekView, monthView, agendaView]
		  }
		);
	  }
	);
	
});

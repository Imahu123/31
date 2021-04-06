var notificationCounter = 0;
var notificationsArray = [];
var notificationDefaultDelay = 10;
var startingZindex = 20000;
var smready = false;
var alertSound;

soundManager.url = assetsUrl + '/site/js/soudnmanager/';
soundManager.onready(function() {
	smready = true;
    alertSound = soundManager.createSound({
        id: 'alert',
        url: assetsUrl + '/sounds/alert.mp3',
        volume: 50,
        multiShot: true,
        autoLoad: true
    });   
});

$(window).resize(function(){
	
	for (i = 0; i< notificationsArray.length; i++){
		var w = 600;
		if ($(document).width() < 600) w = $(document).width() - 40;
		$('#notification_'+notificationsArray[i]['id']).css("width", w);
		$('#notification_'+notificationsArray[i]['id']).css("left", ($(document).width() - w) /2);
	}

})

function pfnotify(html){
	var notificationID = ++notificationCounter;
	var notificationArr = [];
	notificationArr['id'] = notificationID;
	notificationArr['content'] = html;
	notificationsArray.push(notificationArr);
	showNotification(notificationID);
}

function showNotification(notificationID){
	for (i = 0; i< notificationsArray.length; i++){
		if (notificationsArray[i]['id'] == notificationID){
			addToBody(notificationID, buildNotificationBody(notificationID, notificationsArray[i]['content']));
		}
	}	
}

function buildNotificationBody(id, body){
	
	var html = '';
	html += '<a href="javascript:hideNotification('+id+');" id="notification_'+id+'" data-id="'+id+'" class="notificationContainer">';
		html += '<div class="notificationContent">';
			html += body;
		html += '</div>';
	html += '</a>';
	
	return html;
}

function addToBody(id, html){
	$('body').append(html);
	$('#notification_'+id).css("z-index",startingZindex+notificationCounter);
	var w = 600;
	if ($(document).width() < 600) w = $(document).width() - 40;
	$('#notification_'+id).css("width", w);
	$('#notification_'+id).css("left", ($(document).width() - w) /2);
	$('#notification_'+id).css("top",-$('#notification_'+id).outerHeight());
	var t = 0;
	for (i = 0; i< notificationsArray.length; i++){
		if (notificationsArray[i]['id'] == id){
			break;
		}
		t += $('#notification_'+notificationsArray[i]['id']).outerHeight();
	}
	$('#notification_'+id).stop().animate({
		top: t
	}, 500, null, function(){
		setTimeout(function(){
			hideNotification(id);
		}, notificationDefaultDelay*1000)	
	});
	if (smready){
		alertSound.play();
	}
}

function hideNotification(id){
	$('#notification_'+id).fadeOut(500, function(){
		$('#notification_'+id).remove();
		rearraingNotifications();			
	});		
	for (i = 0; i< notificationsArray.length; i++){
		if (notificationsArray[i]['id'] == id)
			notificationsArray.splice(i, 1);
	}
}	

function rearraingNotifications(){	
	var delay = 0;
	var t = 0;
	for (i = 0; i< notificationsArray.length; i++){
		$('#notification_'+notificationsArray[i]['id']).stop().animate({
			top: t
		}, 500+delay, null);
		delay += 100;
		t += $('#notification_'+notificationsArray[i]['id']).outerHeight();
	}	
} 

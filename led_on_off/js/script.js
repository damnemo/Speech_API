

var lang = "it-IT";
var final_transcript = '';
var recognizing = false;
var start_timestamp;




showInfo('info_start');


function voiceInputOver(val){
	switch(val)
	{
		case "led rosso acceso":
		$("#img_led_rosso").attr("src","img/led_rosso_on.png")
		//console.log("red on");
		return;
		break;

		case "led rosso spento":
		$("#img_led_rosso").attr("src","img/led_rosso_off.png")
		//console.log("red off");
		return;
		break;

		case "led verde acceso":
		$("#img_led_verde").attr("src","img/led_verde_on.png")
		//console.log("green on");
		return;
		break;

		case "led verde spento":
		$("#img_led_verde").attr("src","img/led_verde_off.png")
		//console.log("green off");
		return;
		break;

		case "lampeggia":
    $("#img_led_verde").attr("src","img/led_verde_on.png")
    $("#img_led_rosso").attr("src","img/led_rosso_on.png")
	  $(".led").fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400);
		//console.log("lampeggia");
		return;
		break;
	}
}





if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang;

  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = 'img/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'img/mic.gif';
      showInfo('info_no_speech');
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'img/mic.gif';
      showInfo('info_no_microphone');
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
    }
  };

  recognition.onend = function() {
    recognizing = false;
    start_img.src = 'img/mic.gif';
    showInfo('info_start');
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    //final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      voiceInputOver(final_transcript);
    }
  };
}


function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.start();
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = 'img/mic-slash.gif';
  showInfo('info_allow');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}



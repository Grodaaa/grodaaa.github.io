var context;
var source, sourceJs;
var analyser;
var url = 'music/Upstep.mp3';
var array = new Array();
var boost = 0;
var soundCheck = 0;

var interval = window.setInterval(function() {}, 500);

try {
	if(typeof AudioContext === 'function' || 'AudioContext' in window) {
		context = new AudioContext();
	}
	else {
		context = new AudioContext();
	}
}
catch(e) {
	$('#info').text('Web Audio API is not supported in this browser');
}

var request = new XMLHttpRequest();
request.open("GET", url, true);
request.responseType = "arraybuffer";

request.onload = function() 
{
	context.decodeAudioData(
		request.response,
		function(buffer) 
		{
			if(!buffer) 
			{
				$('#info').text('Error decoding file data');
				return;
			}

			sourceJs = context.createScriptProcessor(2048, 1, 1);
			sourceJs.buffer = buffer;
			sourceJs.connect(context.destination);
			analyser = context.createAnalyser();
			analyser.smoothingTimeConstant = 0.6;
			analyser.fftSize = 512;

			source = context.createBufferSource();
			source.buffer = buffer;
			source.loop = true;

			source.connect(analyser);
			analyser.connect(sourceJs);
			source.connect(context.destination);

			sourceJs.onaudioprocess = function(e) 
			{
				array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				boost = 0;
				for (var i = 0; i < array.length; i++) {
		            boost += array[i];
		        }
		        boost = boost / array.length;
			};

			$('#info')
				.fadeOut('normal', function() {
					$(this).html('<div id="artist"><a class="name" href="http://www.purple-planet.com/dance/4583971242" target="_blank">Purple planet</a><br /><a class="song" target="_blank">Upstep</a><br /></div><div><img src="img/upstep.png" width="58" height="58" /></div>');
				})
				.fadeIn();

			clearInterval(interval);
			// popup
			$('body').append($('<div onclick="play();" id="play" style="width: ' + $(window).width() + 'px; height: ' + $(window).height() + 'px;"><div id="play_link"></div></div>'));
			$('#play_link').css('top', ($(window).height() / 2 - $('#play_link').height() / 2) + 'px');
			$('#play_link').css('left', ($(window).width() / 2 - $('#play_link').width() / 2) + 'px');
			$('#play').fadeIn();

				 
			$('body').append($('<div onclick="stop();" id="stop" style="width: ' + $(window).width() + 'px; height: ' + $(window).height() + 'px;"><div id="stop_link"></div></div>'));
			$('#stop_link').css('bottom', 20 + 'px');
			$('#stop_link').css('left', 20 + 'px');

		},
		function(error) 
		{
			$('#info').text('Decoding error:' + error);
		}
	);
};

request.onerror = function() 
{
	$('#info').text('buffer: XHR error');
};

request.send();

function displayTime(time) {
	if(time < 60) {
		return '0:' + (time < 10 ? '0' + time : time);
	}
	else {
		var minutes = Math.floor(time / 60);
		time -= minutes * 60;
		return minutes + ':' + (time < 10 ? '0' + time : time);
	}
}

function play() 
{
	$('#play').fadeOut('normal', function() {
		$(this).remove();
	});
	source.start(0);
	$('#stop').fadeIn();
	soundCheck = 1;
}

function stop() 
{
	$('#stop').fadeOut('normal', function() {
		$(this).remove();
	});
	source.stop(0);
	soundCheck = 0;
}


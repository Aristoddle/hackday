var internalNS = '.imademo';

var vm;
var playerTiming = {};


var uvpc = {
    "classes": [
        {
            "className": "com.cbs.can.model.VideoSourceManager",
            "list": [
                {
                    "className": "com.cbs.can.model.PlatformVideoSource",
                    "id": "Platform",
                    "properties": [
                        {
                            "name": "PlayListURL",
                            "value": "http://release.theplatform.com/content.select?format=SMIL&amp;Tracking=true&amp;balance=true&amp;MBR=true&amp;pid="
                        },
                        {
                            "name": "MultiBitrateURL",
                            "value": "http://release.theplatform.com/content.select?format=SMIL&amp;Tracking=true&amp;balance=true&amp;MBR=true&amp;pid="
                        },
                        {
                            "name": "ThumbnailURL",
                            "value": "http://cbs.feeds.theplatform.com/ps/API/PortalService/1.6/getReleaseList?PIâ€¦eINzALPyoHte4KLYNmp&amp;field=thumbnailURL&amp;field=title&amp;query=PIDs|"
                        },
                        {
                            "name": "GeoMessage",
                            "value": "You are not in a geographic region that has access to this content."
                        },
                        {
                            "name": "XMLHandler",
                            "value": "com.cbs.can.model.Platform"
                        }
                    ]
                },
                {
                    "className": "com.cbs.can.model.PlatformMPXVideoSource",
                    "id": "Platform_MPX",
                    "properties": [
                        {
                            "name": "PlayListURL",
                            "value": "https://link.theplatform.com/s/dJ5BDC/$PID$?format=SMIL&manifest=m3u&Tracking=true&mbr=true&callback=uvpHandleJsonpResult"
                        },
                        {
                            "name": "MultiBitrateURL",
                            "value": "https://link.theplatform.com/s/dJ5BDC/$PID$?format=SMIL&manifest=m3u&Tracking=true&mbr=true&callback=uvpHandleJsonpResult"
                        },
                        {
                            "name": "ThumbnailURL",
                            "value": "http://link.theplatform.com/s/dJ5BDC/$PID$?format=preview"
                        },
                        {
                            "name": "GeoMessage",
                            "value": "This content is not available in your location."
                        },
                        {
                            "name": "XMLHandler",
                            "value": "com.cbs.can.model.Platform_MPX"
                        }
                    ]
                }
            ],
            "name": "VideoSourceManager",
            "properties": [
                {
                    "name": "liveStreamToken",
                    "value": "masters_"
                },
                {
                    "name": "geoDetectionURL",
                    "value": "http://videocgi.drt.cbsig.net/video/geo/c2i.pl"
                },
                {
                    "name": "videoSourceClassName",
                    "value": "com.cbs.can.model.PlatformMPXVideoSource"
                }
            ]
        }
    ],
    "modules": [
        {
            category: 'internal',
            name: 'UVPJSDebug',
            enabled: false,
            params: [
                {name: 'showAll', value: true},
                {name: 'SkinManager', value: false},
                {name: 'CVI_Model', value: false},
                {name: 'EventsManager', value: false},
                {name: 'ResourceProvider', value: false},
                {name: 'VideoManager', value: false},
                {name: 'VideoControlInterface', value: false},
                {name: 'CoreVideoInstance', value: false},
                {name: 'ResourcePlaylistManager', value: false},
                {name: 'ResourceConfigObject', value: false},
                {name: 'TrackingManager', value: false},
                {name: 'showTimestamps', value: false},
                {name: 'VPF_HTML5', value: false},
                {name: 'showClockTime', value: false},
                {name: 'TrackingLib', value: false},
                {name: 'MuxDebug', value: true}
            ]
        },
        {
            "category": "qos",
            "enabled": true,
            "name": "MuxQOSPluginJS",
            "params": [
                {
                    "name": "propertyKey",
                    "value": "1778b90ad19424061a4c8920a"
                },
                {
                    "name": "subPropertyId",
                    "value": "test_sub_property"
                },
                {
                    "name": "experimentName",
                    "value": "test_experiment"
                }
            ]
        }
    ]
},
ractive = new Ractive({
  template: '#template',
  el: '#data',
}),
myVideoManager, myVideoPlayer;

var latencies = [0, 0, 0, 0];

function loadPlayer() {
    var sessionOptions = {
        skin: true, // = default
        autoPlay: false, // = default
        previewImage: '//vidtech.cbsinteractive.com/skins/ui/imgs/poster.jpg',
        preloadContent: true,
        partner: 'cbs',
        userId: '0000000',
        allowConcurrentPlayback: true,
        uvpc: uvpc
    };

    myVideoManager = new uvpjs.VideoManager();
    myVideoManager.initialize(sessionOptions, onVideoManagerReady, onVideoManagerError);
}

function onVideoManagerReady(systemInfo) {
    vm = myVideoManager;
    var et = uvpjs.EventType;


    var playerOptions = {
        enableUnmutedAutoplay: systemInfo.supportsUnmutedAutoplay,
        enableMutedAutoplay: systemInfo.supportsMutedAutoplay
    };



    var videoPlayerArray = [
        ['myVideoContainer_1', onVideoPlayerReady.bind(this), playerOptions],
        ['myVideoContainer_2', onVideoPlayerReady.bind(this), playerOptions],
        ['myVideoContainer_3', onVideoPlayerReady.bind(this), playerOptions],
        ['myVideoContainer_4', onVideoPlayerReady.bind(this), playerOptions]
    ];

    vm.createMultipleVideoPlayers(videoPlayerArray);
}

function onContentLoad(evtObj){
    playerTiming[evtObj.target] = { loadTime: Date.now()};
}
function onContentStart(evtObj){
    playerTiming[evtObj.target].startTime = Date.now();
    ractive.set('startup_' + evtObj.target, (playerTiming[evtObj.target].startTime - playerTiming[evtObj.target].loadTime)/1000);
}

function onVideoManagerError(errorMessage) {
    console.log('Video manager error.', errorMessage);
}

var resourceConfigObjs = {
    'myVideoContainer_1': {
      type: uvpjs.mediaCapabilities.RP_URL,
      isLive: true,
      assetURL: 'https://liveheroes.global.ssl.fastly.net/liveheroes-10sec/primary/primary.m3u8', // 10
      liveSyncDurationCount: 3
    },
    'myVideoContainer_2': {
      type: uvpjs.mediaCapabilities.RP_URL,
      isLive: true,
      assetURL: 'https://liveheroes.global.ssl.fastly.net/liveheroes-6sec/primary/primary.m3u8', // 2
      liveSyncDurationCount: 3
    },
    'myVideoContainer_3': {
      type: uvpjs.mediaCapabilities.RP_URL,
      isLive: true,
      assetURL: 'https://liveheroes.global.ssl.fastly.net/liveheroes-4sec/primary/primary.m3u8', // 1
      liveSyncDurationCount: 3,
    },
    'myVideoContainer_4': {
        type: uvpjs.mediaCapabilities.RP_URL,
        isLive: true,
        assetURL: 'https://liveheroes.global.ssl.fastly.net/liveheroes-2sec/primary/primary.m3u8', // 1
        liveSyncDurationCount: 3,
      },
};

function onVideoPlayerReady(videoPlayer) {
  // Get the DOM ID current video player instance.
  var containerID = videoPlayer.getVidContId();
  // Add the current video player instance to the players object.
  myVideoPlayer = videoPlayer;

  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_DATA_LOADED + '.' + containerID, onContentLoad.bind(this));
  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_START + '.' + containerID, onContentStart.bind(this));
  myVideoPlayer.addEventListener(uvpjs.EventType.VIDEO_PROGRESS + '.' + containerID, onVideoProgress.bind(this));

  // Pass the Resource Config Objects and play the video.
  myVideoPlayer.loadAndPlayResource(resourceConfigObjs[containerID]);
}

function updateLatencies(playerName, latency) {
  var lineId = parseInt(playerName.split("_").pop()) - 1;
  latencies[lineId] = latency;
}

function onVideoProgress (evtObj) {
    var player = vm.getVideoPlayers()[evtObj.target];
    var facadeState = player.getCurrentPlaybackState().facadeState;

    //Bitrate
    var bitrate = Number(Math.round((facadeState.currentBitrate/ 1000000) + 'e2')+'e-2');
    ractive.set('currentBitrate_' + evtObj.target, bitrate);

    // Buffer Length
    var videoElem = document.getElementById('video_' + player.getVidContId());
    var bufferL = Number(Math.round((videoElem.buffered.end(0) - videoElem.currentTime) + 'e2')+'e-2');
    ractive.set('bufferLength_' + evtObj.target, bufferL);

    // Latency
    var latency = Date.now() - facadeState.player.streamController.fragPlaying.programDateTime;
    latency = Number(Math.round((latency/1000) + 'e2')+'e-2')
    ractive.set('latency_' + evtObj.target, latency);

    updateLatencies(evtObj.target, latency)
    //appendDataPoint(evtObj.target, Date.now(),latency)
}

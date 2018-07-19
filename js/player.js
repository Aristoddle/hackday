var internalNS = '.imademo';
var vm, contentLoadTime_1, contentStartTime_1, contentLoadTime_2, contentStartTime_2, contentLoadTime_3, contentStartTime_3;
var latency1 = -1,
  latency2 = -1,
  latency3 = -1

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
    var et = uvpjs.EventType,
        ns = '.myVideoContainer';

    var playerOptions = {
      enableUnmutedAutoplay: systemInfo.supportsUnmutedAutoplay,
      enableMutedAutoplay: systemInfo.supportsMutedAutoplay
    }

    var videoPlayerArray = [
        ['myVideoContainer_1', onVideoPlayerReady.bind(this), playerOptions],
        ['myVideoContainer_2', onVideoPlayerReady.bind(this), playerOptions],
        ['myVideoContainer_3', onVideoPlayerReady.bind(this), playerOptions]
    ];

    vm.createMultipleVideoPlayers(videoPlayerArray);
    vm.addEventListener(et.VIDEO_PROGRESS + ns, onVideoProgress.bind(this));
    vm.addEventListener(et.VIDEO_STATE_CHANGE + ns, onVideoStateChange.bind(this));
}

function onContentLoad_1(evtObj){ contentLoadTime_1 = Date.now(); }
function onContentStart_1(evtObj){ contentStartTime_1 = Date.now(); }
function onContentLoad_2(evtObj){ contentLoadTime_2 = Date.now(); }
function onContentStart_2(evtObj){ contentStartTime_2 = Date.now(); }
function onContentLoad_3(evtObj){ contentLoadTime_3 = Date.now(); }
function onContentStart_3(evtObj){ contentStartTime_3 = Date.now(); }

function onVideoManagerError(errorMessage) {
    console.log('Video manager error.', errorMessage);
}

var resourceConfigObjs = {
    'myVideoContainer_1': {
      type: uvpjs.mediaCapabilities.RP_URL,
      isLive: true,
      assetURL: 'https://liveheroes.global.ssl.fastly.net/liveheroes-test1/primary/primary.m3u8', // 10
      liveSyncDurationCount: 3
    },
    'myVideoContainer_2': {
      type: uvpjs.mediaCapabilities.RP_URL,
      isLive: true,
      assetURL: 'https://liveheroes.global.ssl.fastly.net/liveheroes-test2/primary/primary.m3u8', // 2
      liveSyncDurationCount: 3
    },
    'myVideoContainer_3': {
      type: uvpjs.mediaCapabilities.RP_URL,
      isLive: true,
      assetURL: 'https://liveheroes.global.ssl.fastly.net/liveheroes-test3/primary/primary.m3u8', // 1
      liveSyncDurationCount: 3
    },
};

function onVideoPlayerReady(videoPlayer) {
  // Get the DOM ID current video player instance.
  var containerID = videoPlayer.getVidContId();
  // Add the current video player instance to the players object.
  myVideoPlayer = videoPlayer;

  // Pass the Resource Config Objects and play the video.
  myVideoPlayer.loadAndPlayResource(resourceConfigObjs[containerID]);

  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_DATA_LOADED + '.myVideoContainer_1', onContentLoad_1.bind(this));
  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_START + '.myVideoContainer_1', onContentStart_1.bind(this));
  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_DATA_LOADED + '.myVideoContainer_2', onContentLoad_2.bind(this));
  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_START + '.myVideoContainer_2', onContentStart_2.bind(this));
  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_DATA_LOADED + '.myVideoContainer_3', onContentLoad_3.bind(this));
  myVideoPlayer.addEventListener(uvpjs.EventType.CONTENT_START + '.myVideoContainer_3', onContentStart_3.bind(this));
}

function onVideoProgress (evtObj) {
    var player_1 = evtObj.payload;
    var player_2 = vm.getVideoPlayers().myVideoContainer_2;
    var player_3 = vm.getVideoPlayers().myVideoContainer_3;

    ractive.set('currentBitrate_1', player_1.facadeState.currentBitrate);
    ractive.set('currentBitrate_2', player_2.getCurrentPlaybackState().facadeState.currentBitrate);
    ractive.set('currentBitrate_3', player_3.getCurrentPlaybackState().facadeState.currentBitrate);

    // Buffer Length
    var bufferL_1 = document.getElementsByTagName('video')[0].buffered.end(0) - document.getElementsByTagName('video')[0].currentTime;
    var bufferL_2 = document.getElementsByTagName('video')[1].buffered.end(0) - document.getElementsByTagName('video')[1].currentTime;
    var bufferL_3 = document.getElementsByTagName('video')[2].buffered.end(0) - document.getElementsByTagName('video')[2].currentTime;

    ractive.set('bufferLength_1', Math.trunc(bufferL_1));
    ractive.set('bufferLength_2', Math.trunc(bufferL_2));
    ractive.set('bufferLength_3', Math.trunc(bufferL_3));

    // Latency
    var latency_1 = Date.now() - player_1.facadeState.player.streamController.fragPlaying.programDateTime;
    var latency_2 = Date.now() - player_2.getCurrentPlaybackState().facadeState.player.streamController.fragPlaying.programDateTime;
    var latency_3 = Date.now() - player_3.getCurrentPlaybackState().facadeState.player.streamController.fragPlaying.programDateTime;

    ractive.set('date_1', latency_1/1000);
    ractive.set('date_2', latency_2/1000);
    ractive.set('date_3', latency_3/1000);

    ractive.set('startup_1', contentStartTime_1 - contentLoadTime_1);
    ractive.set('startup_2', contentStartTime_2 - contentLoadTime_2);
    ractive.set('startup_3', contentStartTime_3 - contentLoadTime_3);

    latency1 = latency_1/1000;
    latency2 = latency_2/1000;
    latency3 = latency_3/1000;
}

function onVideoStateChange (evtObj) {
    ractive.set({
        playbackState: evtObj.payload.newState
    });
}

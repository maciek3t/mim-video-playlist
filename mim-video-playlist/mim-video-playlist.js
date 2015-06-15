define(['knockout', 'css!mediaelement-css',  'css!dataTables-bootstrap-css', 'text!./mim-video-playlist.html', 'datatables', 'knockout.punches', 'mediaelement', 'datatables-bootstrap'], function (ko, css, dataTablesBootstrapCss,templateMarkup) {

    function MimVideoPlaylist(params) {
        var self = this;
        self.list = [
    { "video": 'video/Video1.mp4',"poster": "video/Video1.jpg", title: 'video 1 ' },
    { "video": 'video/Video2.mp4', "poster": "video/Video1.jpg", title: 'video 2' }
        ];
        self.fileName = ko.observable(self.list[0].video);
        self.posterFileName = ko.observable(self.list[0].poster);
        self.isVideoVisible = ko.observable(false);
        self.mustPlay = ko.observable(false);
        self.playOnRender = ko.observable(false);

        self.playerAssign = function () {
            delete self.player;
            self.player =
            $('#videoContent').mediaelementplayer({
                alwaysShowControls: false,
                features: ['playpause', 'volume'],
                success: function (mediaElement, domObject) {
                    if (self.mustPlay()) mediaElement.play();
                },
                error: function (data) {
                    alert('data')
                }
            });
        };

        self.playlistClick = function (data) {
            self.isVideoVisible(false);
            self.fileName(data.video);
            self.posterFileName(data.poster);
            self.mustPlay(true);
            self.isVideoVisible(true);
            return true;
        }

        self.videoUrlBase = 'videos';
        self.player = null;

        self.initView = function () {
            $('#mim-playlist-innner').DataTable(
                {
                    responsive: true,
                    "deferRender": true,
                    "jQueryUI": false,
                    "sDom": 't',
                    "deferRender": true,
                    "autoWidth": false,
                    "autoHigh": false,
                    searching: false,
                    ordering: false,
                    paging: false,
                    "info": false
                });
            $('#mim-playlist-innner').removeClass('display').addClass('table table-striped table-bordered');
        };
        ko.punches.enableAll();
        self.initView();
        self.isVideoVisible(true);
  }

  MimVideoPlaylist.prototype.dispose = function() { };
  
  return { viewModel: MimVideoPlaylist, template: templateMarkup };

});

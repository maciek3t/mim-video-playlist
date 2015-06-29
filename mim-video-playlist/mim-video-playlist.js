define(['knockout', 'Q', 'model',
    'css!mediaelement-css', 'css!dataTables-bootstrap-css', 'css!datatables-scroller-css', 'text!./mim-video-playlist.html',
    'datatables', 'knockout.punches', 'mediaelement', 'datatables-bootstrap', 'datatables-scroller'],
    function (ko, Q, model, css, dataTablesBootstrapCss,datatablesScrollerCss, templateMarkup) {
        function MimVideoPlaylist(params) {
            var self = this;
            self.urlBaseVideo = 'videoDirectory/';
            self.urlApi = 'Api/';
            self.videoSuffix = '.mp4';
			self.videoSuffix = '.jpg';
            self.isVideoDataLoaded = ko.observable(false);
            self.url = {            
                getVideoList: self.urlApi + 'video'
            };
            self.list = ko.observableArray([]);
            self.list0 = ko.observableArray([]);
            self.fileName = ko.observable();
            self.posterFileName = ko.observable();
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
                    }
                });
            };

            self.playlistClick = function (data) {
                self.isVideoVisible(false);
                self.fileName(data.video);
                ko.utils.arrayForEach(self.list(), function (item) {
                    item.isPlaying(false)
                });
                data.isPlaying(true);
                self.posterFileName(data.poster);
                self.mustPlay(true);
                self.isVideoVisible(true);
                return true;
            }

            self.player = null;

            self.mapping = {
                create: function (options) {
                    var vmCreate = ko.mapping.fromJS(options.data, {
                        'ignore': ['Video','Title']

                    });
                    vmCreate.isPlaying = ko.observable(false);
                    vmCreate.isNotPlaying = ko.pureComputed(function () { return !vmCreate.isPlaying(); });
                    vmCreate.poster = self.urlBaseVideo+ options.data.Video + self.posterSuffix
                    vmCreate.video = self.urlBaseVideo + options.data.Video + self.videoSuffix;
                    vmCreate.title = options.data.Title;
                    return vmCreate;
                }
            };

            self.initModel = function () {
                Q(model.post(self.url.getVideoList))
                    .then(function (data) {
                        ko.mapping.fromJS(data.d, self.mapping, self.list);
                        self.fileName(self.list()[0].video);
                        self.posterFileName(self.list()[0].poster);
                        self.isVideoDataLoaded(true);
                    });
            }

            self.initView = function () {
                $('#mim-playlist-innner').DataTable(
                    {
                        responsive: true,
                        "deferRender": true,
                        "jQueryUI": false,
                        "sDom": 't',
                        dom: "S",
                        "sScrollY": "360px",
                        scrollCollapse: true,
                        "deferRender": true,
                        "autoWidth": true,
                        "autoHigh": false,
                        searching: false,
                        ordering: false,
                        "info": false,
                    });
                $('#mim-playlist-innner').removeClass('display').addClass('table table-striped table-bordered');
                $('.dataTables_scrollBody').css('height', 360);
                $('.dataTables_scrollBody').css('width', '100%');
            };
            ko.punches.enableAll();
            self.initModel();
            self.initView();
            self.isVideoVisible(true);
        }

  MimVideoPlaylist.prototype.dispose = function() { };
  
  return { viewModel: MimVideoPlaylist, template: templateMarkup };

});

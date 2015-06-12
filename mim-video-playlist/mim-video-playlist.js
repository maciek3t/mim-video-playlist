define(['knockout', 'text!./mim-video-playlist.html', 'datatables'], function (ko, templateMarkup) {

    function MimVideoPlaylist(params) {
        var self = this;
        self.list = [
    { "video": 'videos/sampleVideo.mp4', "poster": "videos/sampleVideo.jpg", title: 'video 1' },
    { "video": 'videos/sampleVideo.mp4', "poster": "videos/sampleVideo.jpg", title: 'video 1' },
    { "video": 'videos/sampleVideo.mp4', "poster": "videos/sampleVideo.jpg", title: 'video 1' },
    { "video": 'videos/sampleVideo.mp4', "poster": "videos/sampleVideo.jpg", title: 'video 1' }
        ];
        self.fileName = ko.observable(self.list[0].video);
        self.isVideoVisible = ko.observable(false);
        self.posterClick = function () {
            self.isVideoVisible(true);
            document.getElementById('video-content').Play();
            return false;
        }
        self.videoUrlBase = 'videos'

        self.initView = function () {
            $('#idLpVote').DataTable(
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
                    "info": false,
                    "columns": [
                        { "orderable": false, "width": "20px" },
                        { "orderable": false },
                    ]
                });
        };
                $('#idLpVote').removeClass('display').addClass('table table-striped table-bordered');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  MimVideoPlaylist.prototype.dispose = function() { };
  
  return { viewModel: MimVideoPlaylist, template: templateMarkup };

});

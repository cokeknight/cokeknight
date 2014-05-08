 var flashTID = typeof flashid!=="undefined" ? flashid:"a1"
 var flashWidthT = typeof width!=="undefined" ? width:600;
 var flashHeightT = typeof height!=="undefined" ? height:400;
 var flashvars={
                    f:'/'+uploadvediourl,
                    c:0,m:1,
                    b:1,p:'0',//视频默认0是暂停，1是播放

                    };
var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always'};
CKobject.embedSWF('/ckplayer/ckplayer/ckplayer.swf',flashTID,'ckplayer_a1',flashWidthT,flashHeightT,flashvars,params);

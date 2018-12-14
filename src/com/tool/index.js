import './index.scss'
import template from './index.html'
import Base from '../base'
import io from 'socket.io-client'
import '../../lib/jquery.barrager.min'
import Zhong from './Mr.Zhong.png'
import bk from './lll/bk.jpg'
import img2 from './lll/aerial-shot-bird-s-eye-view-daylight-1667003 (2).jpg'
import img3 from './lll/android-wallpaper-back-view-boat-531474.jpg'
import img4 from './lll/bird-s-eye-view-cold-daylight-1679718.jpg'
import img5 from './lll/bridge-cars-daylight-1681392.jpg'

class Tool extends Base{
    constructor() {
        super();
    }

    render(baseDom) {
        baseDom.html(template);
        return this;
    }


    run() {
        const imgArray = [{key:1,path:bk}, {key:2,path:img2}, {key:3,path:img3}, {key:4,path:img4}, {key:5,path:img5}];
        const socket = io();
        socket.on('chat message', function(msg){
            const userInfo = msg.user;
            const message = msg.msg;
            const otherData = msg.otherData;
            const item = {
                img: userInfo.avatarUrl || Zhong,
                info: userInfo.nickName + ': ' + message,
                close:true,
                speed:9,
                color: otherData.textColor === '#000000' ? '#fff' : otherData.textColor
            };
            $('#root').barrager(item);
        });
        document.onkeydown = function(e) {
            let key = $("#root")[0].dataset.key;
            switch(e.keyCode) {
                case 67: //c
                    $.fn.barrager.removeAll();
                    break;
                case 37: //left
                    let indexLeft = --key;
                    if(indexLeft< 0) {
                        indexLeft = imgArray.length - 1;
                    }
                    $('#root').css({
                        'background-image': 'url('+imgArray[indexLeft].path+')'
                    });
                    $('#root')[0].dataset.key = indexLeft;
                    break;
                case 39: //right
                    let indexRight = ++key;
                    if(indexRight> imgArray.length - 1) {
                        indexRight = 0;
                    }
                    $('#root').css({
                        'background-image': 'url('+imgArray[indexRight].path+')'
                    })
                    $('#root')[0].dataset.key = indexRight;
                    break;
                default :


            }
        };

        this.leavePage(function() {
            document.onkeydown = null;
        })




    }
}

export default new Tool();

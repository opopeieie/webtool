import './index.scss'
import template from './index.html'
import Base from '../base'
import io from 'socket.io-client'
import '../../lib/jquery.barrager.min'
import twemoji from 'twemoji'
import Zhong from './Mr.Zhong.png'
import bk from './lll/bk.jpg'
import img6 from './lll/017A7032B3A343AB431B4043DD586E78.png'

class Tool extends Base{
    constructor() {
        super();
    }

    render(baseDom) {
        baseDom.html(template);
        return this;
    }


    run() {
        const imgArray = [{key:1,path:bk}, {key:2,path:img6}];
        const socket = io();
        const chat = function(msg) {
            const userInfo = msg.user;
            const message = msg.msg;
            const otherData = msg.otherData;
            const item = {
                img: userInfo.avatarUrl || Zhong,
                info: userInfo.nickName + ': ' + twemoji.parse(message, {
                    base : 'https://twemoji.maxcdn.com/',
                    size: 16
                }),
                close:false,
                speed:9,
                color: otherData.textColor === '#000000' ? '#fff' : otherData.textColor
            };
            $('#root').barrager(item);
        };

        socket.on('chat message', chat);
        document.onkeydown = function(e) {
            console.log(e);
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
                case 80: //pause
                    $.fn.barrager.removeAll();
                    socket.off('chat message');
                    $.ajax({
                        url: '/weapp/sendStatus',
                        contentType: "application/json",
                        dataType: "json",
                        method: 'POST',
                        data: JSON.stringify({
                            message: 'pause'
                        })
                    });
                    break;
                case 83:
                    socket.off('chat message');
                    socket.on('chat message', chat);
                    $.ajax({
                        url: '/weapp/sendStatus',
                        contentType: "application/json",
                        dataType: "json",
                        method: 'POST',
                        data: JSON.stringify({
                            message: 'start'
                        })
                    });
                    break;

                case 49: //1
                    $('iframe').remove();
                    break;
                case 50: //2
                    $('iframe').remove();
                    // $('#root').append($('<iframe id=\'iframe\' class="iframe-ppt" src="/ppt1" name=\'iframe\' frameborder="0" width="100%" ></iframe>'));
                    break;
                case 51: //3
                    $('iframe').remove();
                    // $('#root').append($('<iframe id=\'iframe\' class="iframe-ppt" src="/ppt2" name=\'iframe\' frameborder="0" width="100%" ></iframe>'))
                    break;
                default :
            }
        };

        this.leavePage(function() {
            socket.off('chat message');
            document.onkeydown = null;
        })




    }
}

export default new Tool();

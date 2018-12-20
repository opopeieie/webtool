import './index.scss'
import template from './index.html'
import Base from '../base'
import io from 'socket.io-client'
import '../../lib/jquery.barrager.min'
import twemoji from 'twemoji'
import Zhong from './Mr.Zhong.png'
import bk from './lll/bk.jpg'
import img2 from './lll/tanpan_2.jpg'
import img3 from './lll/huluwa_3.1.png'
import img4 from './lll/huluwa_3.2.png'
import img5 from './lll/huluwa_3.3.png'
import img6 from './lll/huluwa_3.4.png'
import img7 from './lll/huluwa_3.5.png'
import img8 from './lll/huluwa_3.6.png'
import img9 from './lll/other_4.jpg'



class Tool extends Base{
    constructor() {
        super();
    }

    render(baseDom) {
        baseDom.html(template);
        return this;
    }


    run() {
        const imgArray = [bk, img2, bk, img3, img4, img5, img6, img7, img8,bk, img9, 'light'];
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
                href: 'javascript:void(0)',
                close:false,
                speed:9,
                color: otherData.textColor === '#000000' ? '#fff' : otherData.textColor
            };
            $('#main').barrager(item);
        };

        socket.on('chat message', chat);
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

                    caseImg(key, indexLeft)

                    break;
                case 39: //right
                    let indexRight = ++key;
                    if(indexRight> imgArray.length -1) {
                        indexRight = 0;
                    }

                    caseImg(key, indexRight)

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

                default :
            }
        };

        function caseImg(key ,index) {
            $('.samples').hide().fadeIn();
            switch(index) {
                case 9:
                case 2:
                case 0:
                    $('#root').css({
                        'background-image': 'url('+imgArray[index]+')',
                        'background-size': '100% 100%'
                    });
                    break;
                case (imgArray.length - 1) :
                    $('#root').css({
                        'background-image': 'linear-gradient(45deg, rgba(0, 0, 0, 1) 1%, rgba(0, 0, 0, 1) 100%)'
                    });
                    break;
                default:
                    $('#root').css({
                        'background-image': 'url('+imgArray[index]+')',
                        'background-size': 'contain',
                        'background-repeat': 'no-repeat',
                        'background-position-x': '50%',
                        'background-position-y': '50%'
                    })
                    break;
            }
            $('#root')[0].dataset.key = index;
        }

        this.leavePage(function() {
            socket.off('chat message');
            document.onkeydown = null;
        })




    }
}

export default new Tool();

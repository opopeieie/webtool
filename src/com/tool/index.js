import './index.scss'
import template from './index.html'
import Base from '../base'
import io from 'socket.io-client'
import '../../lib/jquery.barrager.min'
import Zhong from './Mr.Zhong.png'
import bk from './lll/bk.jpg'

class Tool extends Base{
    constructor() {
        super();
    }

    render(baseDom) {
        baseDom.html(template);
        return this;
    }


    run() {
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
    }
}

export default new Tool();

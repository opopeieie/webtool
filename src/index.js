import './index.scss'
import Login from './com/login'
import Tool from './com/tool'
import $ from 'jquery'

$(document).ready(() => {
    const views = {
        login: Login,
        tool: {
            main: Tool
        },
    };

    let baseDom = $('#main');

    const loadModule = () => {
        let view = location.hash.substr(1).replace(/\?\d+/, '');
        if(view === 'login') {
            window.data = {};
        }else if(view === '') {
            location.hash = 'login'
        }
        const viewList = view.split('/');
        let obj = views;
        if(viewList.length > 1) {
            for(const v of viewList) {
                obj = obj[v]
            }
            view = obj;
            view.render(baseDom).run()
        }else {
            views[view].render(baseDom).run()
        }

        // for(let i in viewList) {
        //     const v = viewList[i];
        //     if(!views[v]) return;
        //     baseDom = makeBaseDom(viewList, i)
        //     views[v].render(baseDom).run()
        // }
    };
    loadModule();
    window.addEventListener('hashchange', loadModule)
});

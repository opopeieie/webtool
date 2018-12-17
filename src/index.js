import './lib/jquery.min'
import './index.scss'
import Login from './com/login'
import Tool from './com/tool'
import sha256 from 'js-sha256'


$(document).ready(() => {
    window.user = {'liangqing': '7c9f4a6a015f2af75ddddab9fc5cde6d4dc1fa82983fc776b8d8f69376d861d8','test': 'dfa79772c0f051e5cfe3c57bd14d01c773a6f8a650cc3e57ea6f816b192204b6'};
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
            view = 'login'
        }else {
            let user = window.sessionStorage.getItem('user');
            if(!user) {
                location.hash = 'login';
            }else {
                try {
                    user = JSON.parse(user);
                }catch(e){
                    location.hash = 'login';
                    return;
                }
                let isOk = false;
                const password = sha256(sha256(user.password));
                for(let [k,v] of Object.entries(window.user)) {
                    if(user.userName === k && password === v) {
                        isOk = true;
                        break;
                    }
                }
                if(!isOk) {
                    location.hash = 'login';
                }
            }

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

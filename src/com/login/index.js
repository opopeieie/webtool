import './index.scss'
import template from './index.html'
import sha256 from 'js-sha256'
import Base from '../base'
class Login extends Base{
    constructor() {
        super();
    }

    render(baseDom) {
        baseDom.html(template);
        return this;
    }

    run() {
        const self = this;
        $('#username, #password').on('input', function() {
            if ($('#username').val() && $('#password').val()) {
                $('.login').addClass('buttonafter');
            } else {
                $('.login').removeClass('buttonafter');
            }
        });

        $('#loginBtn').on('click', function() {
            let userNameVal = $('#username').val();
            let password = $('#password').val();
            password = sha256(sha256(password));
            for(let [k,v] of Object.entries(window.user)) {
                if(userNameVal === k && password === v) {
                    sessionStorage.setItem('isLogin', true)
                    self.goTo('main');
                    return;
                }
            }
        })
    }



}

export default new Login();

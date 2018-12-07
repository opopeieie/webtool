import './index.scss'
import $ from 'jquery'
import template from './index.html'
import sha256 from 'js-sha256'
class Login {
    constructor() {
        this.user = {'liangqing': '7c9f4a6a015f2af75ddddab9fc5cde6d4dc1fa82983fc776b8d8f69376d861d8','test': 'dfa79772c0f051e5cfe3c57bd14d01c773a6f8a650cc3e57ea6f816b192204b6'}
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
            for(let [k,v] of Object.entries(self.user)) {
                if(userNameVal === k && password === v) {
                    location.hash = 'tool';
                    return;
                }
            }
            alert('error')
        })
    }



}

export default new Login();

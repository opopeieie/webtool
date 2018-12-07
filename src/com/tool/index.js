import './index.scss'
import $ from 'jquery'
import template from './index.html'

class Tool {
    constructor() {

    }

    render(baseDom) {
        baseDom.html(template);
        return this;
    }


    run() {

    }
}

export default new Tool();

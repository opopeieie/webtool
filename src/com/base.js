export default class Base {

    constructor() {

    }

    goTo(view, isBaseRouter) {
        isBaseRouter? location.hash = view: location.hash = 'tool/'+view;
    }
}

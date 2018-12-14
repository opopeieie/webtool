export default class Base {

    constructor() {

    }

    goTo (view, isBaseRouter) {
        isBaseRouter? location.hash = view: location.hash = 'tool/'+view;
    }

    leavePage (fun) {
        if (typeof fun !== "function") throw new Error("baseController leavePage error: " + fun + "is not a function");

        function _leave() {
            fun();
            window.removeEventListener("hashchange", _leave);
        }

        window.addEventListener("hashchange", _leave, false);
    }
}

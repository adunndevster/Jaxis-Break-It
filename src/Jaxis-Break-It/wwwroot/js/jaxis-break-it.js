//global vars
var EDITOR_TRANSITION_TIME = 300;
var MODAL_LEFT = 400;

//vue app
var jaxi = new Object();
var guide;
jaxi.currentEditor = null;

$(document).ready(function($){

    // Instance the tour
    var tour = new Tour({
        steps: [
        {
            element: "#js-editor",
            title: "Title of my step",
            content: "Content of my step",
            backdrop: true,
            backdropContainer: '.editorContainer',
            backdropPadding: false
        },
        {
            element: "#html-editor",
            title: "Title of my step",
            content: "Content of my step"
        }
        ]
    });

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();

    const Child = {
        template: '#childarea'
    };

    guide = new Vue({
        el: '#app',
        data() {
            return {
                isShowing: false,
                modalLeft: '0px',
                modalTop: '0px'
            }
        },
        methods: {
            toggleShow() {
                this.isShowing = !this.isShowing;
            }
        },
        components: {
            appChild: Child
        }
    });

    



    (function () {


        async function pointAtSomething(code, panel) {
            $(panel).click();
            jaxi.currentEditor.focus();
            jaxi.currentEditor.clearSelection();
            var range = jaxi.currentEditor.find(code);
            jaxi.currentEditor.addSelectionMarker(range);
            await sleep(EDITOR_TRANSITION_TIME);
            var coords = jaxi.currentEditor.renderer.textToScreenCoordinates(range.start.row, range.end.column);
            guide.modalLeft = EDITOR_TRANSITION_TIME + 'px';
            guide.modalTop = coords.pageY + 'px';
            guide.isShowing = true;

        }

        jaxi.pointAtSomething = pointAtSomething;

        //setTimeout(pointAtSomething.bind(null, 'ball', '#js-editor'), 2000)

    })();

});





var teachPoint = {
    find: 'ball',
    text: "I like goods",
    character: 'jaxi'

};





//utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
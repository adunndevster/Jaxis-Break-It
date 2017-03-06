//global vars
var EDITOR_TRANSITION_TIME = 300;
var MODAL_LEFT = 400;

//vue app
var jaxi = new Object();
var guide;
jaxi.currentEditor = null;
var tour;

$(document).ready(function($){
    (function () {

        // Instance the tour
        tour = new Tour({
            steps: [
            {
                element: "#html-editor",
                title: "Editors",
                content: "This is the HTML editor."
            },
            {
                element: "#css-editor",
                title: "Editors",
                content: "This is the CSS editor."
            },
            {
                element: "#js-editor",
                title: "Editors",
                content: "This is the javascript editor."
            },
            {
                element: ".jaxi-modal",
                title: "variables",
                content: "This is the ball variable.",
                orphan: false,
                code: 'ball',
                panel: '#js-editor'

            },
            {
                element: "#js-editor",
                title: "Editors",
                content: "This is the javascript editor."
            }
            ],
            onNext: function(tour){
                var stepNum = tour.getCurrentStep() + 1;
                var step = tour.getStep(stepNum);
                if(step.code !== undefined)
                {
                    jaxi.pointAtSomething(step.code, step.panel);
                    sleep(EDITOR_TRANSITION_TIME);
                    tour.redraw();
                }
            }
        });

        // Initialize the tour
        tour.init();

        // Start the tour
        tour.start(true);

        const Child = {
            template: '#childarea'
        };

        guide = new Vue({
            el: '#app',
            data() {
                return {
                    isShowing: true,
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

    



    

        async function pointAtSomething(code, panel) {
            $(panel).click();
            jaxi.currentEditor.focus();
            jaxi.currentEditor.clearSelection();
            var range = jaxi.currentEditor.find(code);
            jaxi.currentEditor.addSelectionMarker(range);
            await sleep(EDITOR_TRANSITION_TIME);
            var coords = jaxi.currentEditor.renderer.textToScreenCoordinates(range.start.row, range.end.column);
            guide.modalLeft = coords.pageX + 5 + 'px';
            guide.modalTop = coords.pageY + 12 + 'px';

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
//global vars
var EDITOR_TRANSITION_TIME = 300;
var MODAL_TRANSITION_TIME = 300;
var MODAL_LEFT = 400;

//vue app
var jaxi = new Object();
var guide;
jaxi.currentEditor = null;
var tour;



$(document).ready(function($){
    (function () {

        var codeTracker = Object();
        codeTracker.steps = new Array();

        tour = new Tour(
            {
                steps: [],
                autoscroll: false,
                storage:false,
                keyboard: false,
                template: "<div class='popover tour'>    <div class='arrow'></div>    <h3 class='popover-title'></h3>    <div class='popover-content'></div>    <div class='popover-navigation'>        <button class='btn btn-default' data-role='prev'>« Prev</button>        <span data-role='separator'></span>        <button class='btn btn-default' data-role='next'>Next »</button>    </div>  </div>",
                onHide: onHide
            });

        if(arrTour != undefined)
        {
            tour.addSteps(arrTour);
        }
        

        
        function onHide(tour)
        {

            var stepNum = tour.getCurrentStep()+1;
            var step = tour.getStep(stepNum);

            if(step === undefined) return;

            

            $(step.element).click();

            if(step.content.indexOf('<code>') != -1)
            {
                insertCode(step.content.substring(step.content.indexOf('<xmp>')+5, step.content.indexOf('</xmp>')));
            }

            if(step.code !== undefined)
            {
                jaxi.pointAtSomething(step.code, step.panel);
            }
        }

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

    



    

        function insertCode(code) {
            
            //make sure we don't add this code in the future.
            var stepNum = tour.getCurrentStep()+1;
            if($.inArray(stepNum, codeTracker.steps) == -1 )
            {
                codeTracker.steps.push(stepNum);
                jaxi.currentEditor.focus();
                jaxi.currentEditor.insert(code);
            }
        }

        async function pointAtSomething(code, panel) {
            $(panel).click();
            jaxi.currentEditor.focus();
            //jaxi.currentEditor.exitMultiSelectMode();
            var range = jaxi.currentEditor.find(code);
            //jaxi.currentEditor.addSelectionMarker(range);
            await sleep(EDITOR_TRANSITION_TIME);
            var coords = jaxi.currentEditor.renderer.textToScreenCoordinates(range.start.row, range.end.column);
            guide.modalLeft = coords.pageX + 5 + 'px';
            guide.modalTop = coords.pageY + 8 + 'px';
        }

        jaxi.pointAtSomething = pointAtSomething;
        jaxi.insertCode = insertCode;


    })();

});



//utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
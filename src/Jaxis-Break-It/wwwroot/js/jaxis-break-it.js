//global vars
var EDITOR_TRANSITION_TIME = 300;
var MODAL_TRANSITION_TIME = 300;
var MODAL_LEFT = 400;
var LAB_MODE_LEARNING = "LAB_MODE_LEARNING";
var LAB_MODE_PLAYING = "LAB_MODE_PLAYING";
var LAB_MODE_MAKING = "LAB_MODE_MAKING";



//vue app
var jaxi = new Object();
var vue;
jaxi.currentEditor = null;
var tour;



$(document).ready(function($){
    (function () {

        //VUE//////////////////////////////////////
        const Child = {
            template: '#childarea'
        };

        vue = new Vue({
            el: '#app',
            data() {
                return {
                    isShowing: true,
                    labMode: LAB_MODE_PLAYING,
                    modalLeft: '0px',
                    modalTop: '0px',
                    isNewStep: false
                }
            },
            methods: {
                toggleShow() {
                    this.isShowing = !this.isShowing;
                },
                setMode(e, mode){
                    e.preventDefault();

                    this.labMode = mode;

                    if(mode != LAB_MODE_MAKING)
                    {
                        $('.editors').css('height', '100vh');
                        //$('.makerContainer').css('display', 'none');
                        $(".editor").click();
                    } else {
                        $('.editors').css('height', '85vh');
                        //$('.makerContainer').css('display', 'inline-block');
                        $(".editor").click();
                    }
                },
                editStep(e, stepId)
                {
                    e.preventDefault();

                    isNewStep = stepId == undefined;

                    var stepTitle;
                    var stepText;
                    if(!isNewStep)
                    {
                        stepTitle = $('#' + stepId).find('.stepTitle').text();
                        stepText = $('#' + stepId).find('.stepText').text();
                    } else {
                        stepTitle = "";
                        stepText = "";
                    }
                    $('#mdlStepTitle').val(stepTitle);
                    $('#mdlStepText').text(stepText);

                    $('#mdlEditStep').modal({
                        show:true,
                        backdrop: false
                    });
                },
                saveStep(e)
                {
                    e.preventDefault();

                    if(isNewStep)
                    {
                        alert('yay');
                    }
                }
                
            },
            components: {
                appChild: Child
            }
        });



        //TOUR////////////////////////////////////
        var codeTracker = Object();
        codeTracker.steps = new Array();

        tour = new Tour(
            {
                steps: [],
                autoscroll: false,
                storage:false,
                keyboard: false,
                template: "<div class='popover tour'>    <div class='arrow'></div>    <h3 class='popover-title'></h3>    <div class='popover-content'></div>    <div class='popover-navigation'>        <button class='btn btn-default' data-role='prev'>« Prev</button>        <span data-role='separator'>&nbsp;</span>        <button class='btn btn-default' data-role='next'>Next »</button>    <span data-role='separator'>&nbsp;</span>     <button class='btn btn-default' data-role='end'>End tour</button>   </div>  </div>",
                onHide: onHide
            });

        if(arrTour.length > 0)
        {
            vue.labMode = LAB_MODE_LEARNING;
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
                insertCode(step.content.substring(step.content.indexOf('<xmp>')+5, step.content.indexOf('</xmp>')), step.row, step.col);
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

        

        
        //FUNCTIONS////////////////////////////////////
        function insertCode(code, row, col) {
            
            //make sure we don't add this code in the future.
            var stepNum = tour.getCurrentStep()+1;
            if($.inArray(stepNum, codeTracker.steps) == -1 )
            {
                codeTracker.steps.push(stepNum);
                jaxi.currentEditor.focus();
                if(row != undefined && col != undefined)
                {
                    var position = {row:row, column:col};
                    jaxi.currentEditor.session.insert(position, code)
                } else {
                    jaxi.currentEditor.insert(code);
                }
                
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
            vue.modalLeft = coords.pageX + 5 + 'px';
            vue.modalTop = coords.pageY + 8 + 'px';
        }

        jaxi.pointAtSomething = pointAtSomething;
        jaxi.insertCode = insertCode;


    })();

});



//utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
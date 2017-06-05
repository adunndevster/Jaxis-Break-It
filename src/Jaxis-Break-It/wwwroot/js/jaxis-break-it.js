//jquery done typing plugin
//
// $('#element').donetyping(callback[, timeout=1000])
// Fires callback when a user has finished typing. This is determined by the time elapsed
// since the last keystroke and timeout parameter or the blur event--whichever comes first.
//   @callback: function to be called when even triggers
//   @timeout:  (default=1000) timeout, in ms, to to wait before triggering event if not
//              caused by blur.
// Requires jQuery 1.7+
//
;(function($){
    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.on('keyup keypress paste',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);



//global vars
var EDITOR_TRANSITION_TIME = 300;
var MODAL_TRANSITION_TIME = 300;
var MODAL_LEFT = 400;
var LAB_MODE_LEARNING = "LAB_MODE_LEARNING";
var LAB_MODE_PLAYING = "LAB_MODE_PLAYING";
var LAB_MODE_MAKING = "LAB_MODE_MAKING";

//sessionStorage notes:
//sessionStorage.lab

//localStorage notes:
//localStorage.hasSeenTutorial


//vue app
var jaxi = new Object();
var vue;
jaxi.currentEditor = null;
var tour;



$(document).ready(function($){
    (function () {
        
        //VUE//////////////////////////////////////
        Vue.component('step', {
            template: '#step',
            props: ['step'],
            data() {
                return{
                }
            },
            methods: {
                editStep()
                {

                    isNewStep = false;

                    $('#mdlStepTitle').val(this.step.title);
                    $('#mdlStepText').val(this.step.text);
                    $('.editorCodeSnippet').text(this.step.code);

                    if(this.step.code)
                    {
                        $('.editorCodeSnippet').attr('style', 'display:inline-block;');
                    } else {
                        $('.editorCodeSnippet').attr('style', 'display:none;');
                    }

                    $('#mdlEditStep').modal({
                        show:true,
                        backdrop: false
                    });

                    vue.activeStep = vue.steps.indexOf(this.step);
                },
                killStep()
                {
                    //get the clicked item
                    vue.steps.splice(vue.steps.indexOf(this.step), 1)
                }
            }
        });


        vue = new Vue({
            el: '#app',
            data() {
                return {
                    labTitle: '',
                    labDescription: '',
                    steps: [],
                    isShowing: true,
                    labMode: LAB_MODE_PLAYING,
                    modalLeft: '0px',
                    modalTop: '0px',
                    isNewStep: false,
                    isSelectingCode: false,
                    btnCodeSelectText: 'Highlight Code',
                    activeStep: -1,
                    compiledTour: []
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


                        if(localStorage.hasSeenTutorial != "true")
                        {
                            //show the lesson maker tutorial
                            $('#mdlTutorial').modal({
                                show:true,
                                backdrop: true
                            });

                            localStorage.hasSeenTutorial = true;
                        }


                        //add the onchange listeners
                        $("#html-editor").donetyping(function(){
                            vue.saveAll();
                        });
                        $("#css-editor").donetyping(function(){
                            vue.saveAll();
                        });
                        $("#js-editor").donetyping(function(){
                            vue.saveAll();
                        });


                    }
                },
                createStep(e)
                {
                    e.preventDefault();

                    $('#mdlStepTitle').val("");
                    $('#mdlStepText').val("");
                    $('.editorCodeSnippet').text("");
                    $('.editorCodeSnippet').attr('style', 'display:none;');

                    $('#mdlEditStep').modal({
                        show:true,
                        backdrop: false
                    });

                    isNewStep = true;
                },
                saveStep(e)
                {
                    e.preventDefault();

                    var newStepTitle = $('#mdlStepTitle').val();
                    var newStepText = $('#mdlStepText').val();
                    var newCode = $('.editorCodeSnippet').text();

                    if(isNewStep)
                    {
                        var newStep = {title:newStepTitle, text:newStepText, code:newCode};
                        this.steps.push(newStep);
                    } else {
                        //modify the existing step
                        var stepId = $('#mdlEditStep').data('stepid');

                        $('#' + stepId).find('.stepTitle').text(newStepTitle);
                        $('#' + stepId).find('.stepText').text(newStepText);
                        this.steps[this.activeStep].title = newStepTitle;
                        this.steps[this.activeStep].text = newStepText;
                        this.steps[this.activeStep].code = newCode;
                    }

                    this.saveAll();

                    //clear the code
                    $('.editorCodeSnippet').text('');
                },
                toggleCodeSelect()
                {
                    this.isSelectingCode = !this.isSelectingCode;

                    if(this.isSelectingCode)
                    {
                        $('.editorCodeSnippet').attr('style', 'display:none;');
                        this.btnCodeSelectText = 'Finish Selecting...';
                    } else {
                        var code = jaxi.currentEditor.session.getTextRange(jaxi.currentEditor.getSelectionRange());

                        $('.editorCodeSnippet').attr('style', 'display:inline-block;');
                        $('.editorCodeSnippet').text(code);

                        this.btnCodeSelectText = 'Highlight Code'
                    }
                },
                saveAll()
                {
                
                    this.compiledTour = [];
                    
                    //compile all of the steps into a new tour
                    for(var i=0; i<this.steps.length; i++)
                    {
                        var step = this.steps[i];
                        var tourStep = new Object();
                        
                        tourStep.title = step.title;
                        tourStep.content = step.text;

                        if(step.code)
                        {
                            tourStep.code = step.code;
                            tourStep.element = '.jaxi-modal';
                            tourStep.delay = MODAL_TRANSITION_TIME;
                        } else {
                            tourStep.orphan = !0;
                        }

                        this.compiledTour.push(tourStep);

                    }

                    //save this.compiledTour to the server
                    var css    = ace.edit("css-editor").getSession().getValue();
                    var script = ace.edit("js-editor").getSession().getValue();
                    var html   = ace.edit("html-editor").getSession().getValue();

                    var lab = new Object({
                        Id: labId,
                        Title: this.labTitle,
                        Description: this.labDescription,
                        HTML: html,
                        CSS: css,
                        JS: script,
                        TourJSON: JSON.stringify(this.compiledTour)
                    });

                    sessionStorage.lab = JSON.stringify(lab);

                    if(isAuthed && isCreator && this.labTitle)
                    {
                        $.post('/labs/savelab', lab, function(data){
                            labId = data.id;
                        })
                    }
                    

                }
                
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

        //populate from the sessionStorage if necessary
        var url = window.location.href.lastIndexOf("/") == window.location.href.length - 1 ? window.location.href.substring(0, window.location.href.length - 1) : window.location.href;
        var urlSuffix = url.split("/").reverse()[0].toLowerCase();
       
        if(urlSuffix.indexOf("labs") > -1 && sessionStorage.lab != null)
        {
            var lab = JSON.parse(sessionStorage.lab);
            arrTour = JSON.parse(lab.TourJSON);
            labTitle = lab.Title;
            labDescription = lab.Description;

            ace.edit("html-editor").getSession().setValue(lab.HTML);
            ace.edit("css-editor").getSession().setValue(lab.CSS);
            ace.edit("js-editor").getSession().setValue(lab.JS);

        }

        if(arrTour != undefined && arrTour.length > 0)
        {
            vue.labMode = LAB_MODE_LEARNING;
            tour.addSteps(arrTour);

            //populate the maker if the creator is visiting the page...
            if(isCreator)
            {
                vue.labTitle = labTitle;
                vue.labDescription = labDescription;
                
                for(var i = 0; i<arrTour.length; i++)
                {
                    var step = new Object()
                    var tourStep = arrTour[i];
                        
                    step.title = tourStep.title;
                    step.text = tourStep.content;

                    if(tourStep.code)
                    {
                        step.code = tourStep.code;
                    }

                    vue.steps.push(step);
                }
            }

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








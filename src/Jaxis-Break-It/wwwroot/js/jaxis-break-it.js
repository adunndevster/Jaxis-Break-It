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

        // Instance the tour
        tour = new Tour({
            steps: [
            {
                title: "Introduction",
                content: "In this app you will make a ball bounce off of the walls.",
                orphan:true
            },
            {
                title: "Introduction",
                content: "But first, I’m going to explain the pieces of an app.<br><br>Notice, on the left, there are three code panels: HTML, CSS, and Javascript.<br><br>Each one has a different superpower. Let me explain by comparing this to a car.",
                orphan:true
            },
            {
                title: "Code is like a car",
                content: "With a car, you have the body, the paint, and the motor, right? It’s kinda the same with an app.",
                orphan:true
            },
            {
                element: "#html-editor",
                title: "Editors",
                content: "The HTML is where you define the body. Sort of the nuts and bolts frame of your \"car\""
            },
            {
                element: "#css-editor",
                title: "Editors",
                content: "The CSS is where you define the style. Sort of like your paint job."
            },
            {
                element: "#js-editor",
                title: "Editors",
                content: "The Javascript is where you build your motor that actually drives the car.<br><br>It really is that simple."
            },
            {
                element: "#html-editor",
                title: "Let's Code!",
                content: "Let’s start building this sucker! Type the following code into the HTML editor:<br><br><xmp><div id=\'ball\'><\/div></xmp>"
            },
            {
                element: "#html-editor",
                title: "Let's Code!",
                content: "Okay, that might look a little weird. Don’t worry it’s how you write html code. You see html is made up of \"tags\". What you used there was the \"<xmp><div></xmp>\" tag.<br><br>There are many tags in HTML. No biggie. We’ll learn more of them :)."
            },
            {
                element: "#html-editor",
                title: "Let's Code!",
                content: "The div tag is really just a container for content (stuff). In this case, we are going to use this div tag to make our ball that will bounce off the walls."
            },
            {
                element: ".jaxi-modal",
                title: "The \"id\"",
                content: "Notice we gave it an \"id\". That’s just how we give it a name to call it by in our code. We called this div tag \"ball\".",
                code: "ball",
                panel: '#html-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: "#css-editor",
                title: "Let's Style!",
                content: "Now type this into the CSS code panel. Our app doesn’t look like anything yet because we haven’t styled it. That’s what we do here in the CSS.<br><br><xmp>#ball {\r\n    background: red;\r\n    -moz-border-radius: 50px;\r\n    -webkit-border-radius: 50px;\r\n    border-radius: 50px;\r\n    width: 30px;\r\n    height: 30px;\r\n    position: absolute;\r\n}</xmp>"
            },
            {
                element: "#css-editor",
                title: "Let's Style!",
                content: "Okay, great! Remember how, in the HTML, we made a <xmp><div></xmp> tag and gave it an id of \"ball\"? Now we said, here in the CSS, to give the ball some features."
            },
            {
                element: ".jaxi-modal",
                title: "Let's Style!",
                content: "We gave it a red background.",
                code: "red;",
                panel:'#css-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: ".jaxi-modal",
                title: "Let's Style!",
                content: "These three lines make the edges round. This will give the effect of making a circle or a ball.",
                code: "50px;",
                panel:'#css-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: ".jaxi-modal",
                title: "Let's Style!",
                content: "These two lines tell us the width and height of the ball on the screen. <br><br>Pro tip: \"px\" means pixel or tiny dot of light on your screen.",
                code: "30px;",
                panel:'#css-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: ".jaxi-modal",
                title: "Let's Style!",
                content: "And this line tells the ball that we can put it anywhere on the app’s screen that we please.",
                code: "absolute;",
                panel:'#css-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: ".jaxi-modal",
                title: "Syntax",
                content: "Notice how you have to write this… Up here you have \"#\" before ball. This tells the CSS to look for anything in the HTML that has the id of \"ball\".",
                code: '#ball',
                panel: '#css-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: ".jaxi-modal",
                title: "Syntax",
                content: "Notice this opening curly brace…",
                code: '{',
                panel: '#css-editor',
                delay: MODAL_TRANSITION_TIME

            },
            {
                element: ".jaxi-modal",
                title: "Syntax",
                content: "...and this closing curly brace… Everything inside these two braces is the styling for our ball.",
                code: '}',
                panel: '#css-editor',
                delay: MODAL_TRANSITION_TIME

            },
            {
                element: "#btnRun",
                title: "Run It!",
                content: "Go ahead and click “Run” and let’s see what your program does."
            },
            {
                element: "#preview",
                title: "It's Alive!",
                content: "Okee dokee, do you see a red ball? Looks pretty. It doesn’t do anything yet though, right? That’s because we’ve simply just defined it with HTML, and styled it with CSS. Now it’s time to program it!"
            },
            {
                element: "#js-editor",
                title: "Code :)",
                content: "Copy the following code into the Javascript editor.<br><br><xmp>var ball = document.getElementById(\'ball\');\r\nvar x = 0;\r\nvar y = 0;\r\nvar width = 30;\r\nvar height = 30;\r\nvar speed = 3;\r\nvar directionX = speed;\r\nvar directionY = speed;\r\n\r\n\/\/Look! You can change css inside javascript!\r\n\/\/we need to add \'px\' on the end\r\n\/\/to tell the css to make the ball 100 \"pixels\"\r\nball.style.width = width + \'px\';\r\nball.style.height = height + \'px\';\r\n\r\n\r\nfunction moveBall() {\r\n    x += directionX;\r\n    y += directionY;\r\n    ball.style.left = x + \'px\';\r\n    ball.style.top = y + \'px\';\r\n\r\n    if (x >= window.innerWidth - width) {\r\n        directionX = -speed;\r\n    }\r\n    if (x <= 0) {\r\n        directionX = speed;\r\n    }\r\n\r\n    if (y >= window.innerHeight - height) {\r\n        directionY = -speed;\r\n    }\r\n    if (y <= 0) {\r\n        directionY = speed;\r\n    }\r\n}\r\n\r\nsetInterval(moveBall, 10);</xmp>"
            },
            {
                element: "#btnRun",
                title: "Run It!",
                content: "Now click “Run”, and let’s see what it does. You just built the motor for your app."
            },
            {
                element: "#preview",
                title: "It's Really Alive!",
                content: "Sweet! Do you see a ball bouncing around? What is so magical about that Javascript code to make that happen? Let’s poke around..."
            },
            {
                element: ".jaxi-modal",
                title: "The code...",
                content: "First, we find that ball in the html using this line.",
                code: '(\'ball\')',
                panel: '#js-editor',
                delay: MODAL_TRANSITION_TIME

            },
            {
                element: ".jaxi-modal",
                title: "The code...",
                content: "Then we set its position here. “x” and “y”? Think of a graph. That’s how we position things in programming.<br><br>“x” is the horizontal position. “y” is the vertical.<br><br>The top left most point in the app’s screen is x=0, y=0.",
                code: '0;',
                panel: '#js-editor',
                delay: MODAL_TRANSITION_TIME

            },
            {
                element: ".jaxi-modal",
                title: "The code...",
                content: "These variables, or units of data, set the speed of the ball, and the direction it is currently traveling.",
                code: 'speed;',
                panel: '#js-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: ".jaxi-modal",
                title: "The \"function\"",
                content: "Let’s skip down to the powerful “function”. Just like in CSS all of the guts of the function go between those curly braces. Those “guts” we call logic :). We can look at that later.",
                code: 'function',
                panel: '#js-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                element: ".jaxi-modal",
                title: "The timer",
                content: "Lastly, we get this thing started by using setInterval. The variables between those parentheses are called “parameters”. In this case, we are telling the setInterval function to call “moveBall” every 10 milliseconds. Pretty fast!",
                code: 'setInterval',
                panel: '#js-editor',
                delay: MODAL_TRANSITION_TIME
            },
            {
                title: "Conclusion",
                content: "Why don’t you look over this code, and see if you can figure out how the moveBall function works.  Play with some numbers. Don’t worry, feel free to break it!",
                orphan:true
            }
            ],
            autoscroll: false,
            onHide: onHide
            //onPrev: onStep
        });

        function onHide(tour)
        {

            var stepNum = tour.getCurrentStep()+1;
            var step = tour.getStep(stepNum);

            if(step === undefined) return;

            $(step.element).click();
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

    



    

        async function pointAtSomething(code, panel) {
            $(panel).click();
            jaxi.currentEditor.focus();
            jaxi.currentEditor.clearSelection();
            var range = jaxi.currentEditor.find(code);
            jaxi.currentEditor.addSelectionMarker(range);
            await sleep(EDITOR_TRANSITION_TIME);
            var coords = jaxi.currentEditor.renderer.textToScreenCoordinates(range.start.row, range.end.column);
            guide.modalLeft = coords.pageX + 5 + 'px';
            guide.modalTop = coords.pageY + 8 + 'px';
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
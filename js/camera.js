var videoId = 'video';
var scaleFactor = 1;
var snapshots = [];
            
var video = document.getElementsByTagName('video')[0], 
heading = document.getElementsByTagName('h1')[0],
button = document.getElementById('shoot');

/**
             * Captures a image frame from the provided video element.
             * 
             * @param {Video} video HTML5 video element from where the image frame will be captured.
             * @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
             * 
             * @return {Canvas}
             */
function capture(video, scaleFactor) {
    if(scaleFactor == null){
        scaleFactor = 1;
    }
    var w = video.videoWidth * scaleFactor;
    var h = video.videoHeight * scaleFactor;
    var canvas = document.createElement('canvas');
    canvas.width  = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);
    return canvas;
}
            
/**
             * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
             */
function shoot(){
    var output = document.getElementById('output');
    var canvas = capture(video, scaleFactor);
    canvas.onclick = function(){
        window.open(this.toDataURL());
    };
    snapshots.unshift(canvas);
    output.innerHTML = '';
    for(var i=0; i<4; i++){
        output.appendChild(snapshots[i]);
    }
}
            
function supportsToDataURL()
{
                
    var c = document.createElement("canvas");
    var data = c.toDataURL("image/png");
    return (data.indexOf("data:image/png") == 0);
}
            
//check if there is videocapture functionality (sometimes flakey)
if(navigator.getUserMedia) 
{
                
    navigator.getUserMedia('video', successCallback, errorCallback);
                
    function successCallback( stream ) 
    {
        video.src = stream;
    }
                
    function errorCallback( error ) 
    {
        heading.textContent = 
        "An error occurred: [CODE " + error.code + "]";
    }
} 
else 
{
    heading.textContent = 
        "Native web camera streaming is not supported in this browser!";
}
            
if(!supportsToDataURL())
{
    heading.textContent+="You browser is lame and does NOT support Canvas.toDataURL();"
}

button.addEventListener("click", shoot, true);
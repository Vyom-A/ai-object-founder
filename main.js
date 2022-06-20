video = "";
status1 = "";
object_name = "";
objects = [];
function prelaod() {

}
function setup() {
    canvas = createCanvas(500, 450);
    canvas.position(430, 340);
    video = createCapture(VIDEO);
    video.hide();
    video.size(500, 500);
}
function draw() {
    image(video, 0, 0, 500, 450);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            
            percent = floor(objects[i].confidence * 100);
            label = objects[i].label;
            fill("red");
            text(label + " " + percent + " %", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_name").innerHTML = object_name + " found";
            utterThis = SpeechSynthesisUtterance(object_name + " found");
            speak(utterThis);
            }else {
            document.getElementById("object_name").innerHTML = object_name + " not found";
            }
        }
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name_input").value;
    console.log(object_name);
}
function modelLoaded() {
    console.log("modelLoaded");
    status1 = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        objects = results;
        console.log(objects);

    }
}
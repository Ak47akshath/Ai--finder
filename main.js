
objects=[];
status="";

function setup(){
    canvas= createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO)
    video.hide()
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
    name_of_the_object=document.getElementById("object_name") .value;
    
}

function modelLoaded(){
    console.log("Model Loaded!")
    status= true;
}

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results;

    }
}

function draw(){
    image(video,0,0,480,380);
    if(status!= ""){
        objectDetector.detect(video,gotResult)
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML= "status: objects Detected";
        fill("#36ad56");
        percent= floor(objects[i].confidence*100) ;
        text(objects[i].label+ " " + percent + " %", objects[i].x+15, objects[i].y+15)
        noFill();
        stroke("white");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        if(objects[i].label==name_of_the_object){
            video.stop()
            objectDetector.detect(gotResult)
            document.getElementById("status").innerHTML= "status: "+ name_of_the_object +"found";
            
            synth=window.speechSynthesis
            utterThis=new SpeechSynthesisUtterance( name_of_the_object +"found");
            synth.speak(utterThis)
        }
        else{
            document.getElementById("status").innerHTML= "status:"+ name_of_the_object + "not found";
    
        }

    }
    }
   
}

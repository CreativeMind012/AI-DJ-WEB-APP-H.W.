m1 = "";
m2 = "";

leftW_X = 0;
leftW_Y = 0;
rightW_X = 0;
rightW_Y = 0;

score_LeftW = 0;
score_RightW = 0;

m1_status = ""; 

function preload(){
    m1 = loadSound("music.mp3");
    m2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

}
function modelLoaded()
{
    console.log("PoseNet Initialized.");
}
function gotPoses(results)
{
    if(results > 0)
    {
        console.log(results);
		score_RightW = results[0].pose.keypoints[10].score;
		score_LeftW = results[0].pose.keypoints[9].score;
		console.log("scoreRightWrist = "+ score_RightW + "scoreLeftWrist = " + score_LeftW);

		rightW_X = results[0].pose.rightWrist.x;
		rightW_Y = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightW_X + "rightWristY = " + rightW_Y);

		leftW_X = results[0].pose.leftWrist.x;
		leftW_Y = results[0].pose.leftWrist.y;
		console.log("leftWristX = " + leftW_X + "leftWristY = " + leftW_Y);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);

    m1_status = m1.isPlaying();     

    fill("#FF0000");
	stroke("#FF0000");

    if(score_LeftW > 0.2){
        circle(leftW_X, leftW_Y, 20);
        m2.stop();

		if(m1_status == false)
		{
            m1_status = m1.isPlaying();
			document.getElementById("song_name").innerHTML = "Song Playing: ...";
		}
    }
}
/*
(song1 will be played when left wrist is shown);
    if(score_RightW > 0.2){
        circle(rightW_X, rightW_Y, 20);

		if()
		{
            
			document.getElementById("song_name").innerHTML = "Song Playing: ...";
		}
    }
*/
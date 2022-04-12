m1 = "";
m2 = "";

leftW_X = 0;
leftW_Y = 0;
rightW_X = 0;
rightW_Y = 0;

score_LeftW = 0;
score_RightW = 0;

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
/*
*/
function draw(){
    image(video, 0, 0, 600, 500);
}

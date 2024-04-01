

export async function BodyValues(poseValue) {
    // shoulder values
    var left_shoulder = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_shoulder");
    var right_shoulder = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_shoulder");

    // elbow values
    var left_elbow = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_elbow");
    var right_elbow = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_elbow");

    // wrist values
    var left_wrist = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_wrist");
    var right_wrist = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_wrist");

    var left_hip = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_hip");
    var right_hip = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_hip");

    var left_knee = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_knee");
    var right_knee = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_knee");

    var left_ankle = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_ankle");
    var right_ankle = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_ankle");

    // console.log(typeof (left_shoulder.x));
    // console.log(left_shoulder.x);
    var shoulderx = 0;
    var shouldery = 0;
    var elbowx = 0;
    var elbowy = 0;
    var wristx = 0;
    var wristy = 0;
    var hipx = 0;
    var hipy = 0;
    var kneex = 0;
    var kneey = 0;
    var anklex = 0;
    var ankley = 0;
    // console.log("leftshoulder conf: ", left_shoulder.score);
    // console.log("rightshoulder conf: ", right_shoulder.score);
    // console.log("leftelbow conf: ", left_elbow.score);
    // console.log("rightelbow conf: ", right_elbow.score);
    // console.log("leftwrist conf: ", left_shoulder.score);
    // console.log("rightwrist conf: ", right_wrist.score);
    shoulderx = left_shoulder.x;
    shouldery = left_shoulder.y;
    elbowx = left_elbow.x;
    elbowy = left_elbow.y;
    wristx = left_wrist.x;
    wristy = left_wrist.y;

    // if (left_shoulder.score > right_shoulder.score) {
    //     shoulderx = left_shoulder.x;
    //     shouldery = left_shoulder.y;
    // }
    // else {
    //     shoulderx = right_shoulder.x;
    //     shouldery = right_shoulder.y;
    // }

    // if (left_elbow.score > right_elbow.score) {
    //     elbowx = left_elbow.x;
    //     elbowy = left_elbow.y;
    // }
    // else {
    //     elbowx = right_elbow.x;
    //     elbowy = right_elbow.y;
    // }


    if (left_hip.score > right_hip.score) {
        hipx = left_hip.x;
        hipy = left_hip.y;
    }
    else {
        hipx = right_hip.x;
        hipy = right_hip.y;
    }
    if (left_knee.score > right_knee.score) {
        kneex = left_knee.x;
        kneey = left_knee.y;
    }
    else {
        kneex = right_knee.x;
        kneey = right_knee.y;
    }
    if (left_ankle.score > right_ankle.score) {
        anklex = left_ankle.x;
        ankley = left_ankle.y;
    }
    else {
        anklex = right_ankle.x;
        ankley = right_ankle.y;
    }
    // if (left_wrist.score > right_wrist.score) {
    //     wristx = left_wrist.x;
    //     wristy = left_wrist.y;
    // }
    // else {
    //     wristx = right_wrist.x;
    //     wristy = right_wrist.y;
    // }



    return { shoulderx, shouldery, elbowx, elbowy, wristx, wristy, hipx, hipy, kneex, kneey, anklex, ankley };



}

export async function CalculateElbowAngle(poseValue) {
    // var positionValue = BodyValues(poseValue);
    await new Promise(r => setTimeout(r, 500));
    var dx1 = Math.abs(poseValue.elbowx - poseValue.shoulderx);
    var dy1 = Math.abs(poseValue.elbowy - poseValue.shouldery);
    // var dx2 = poseValue.wristx - poseValue.shoulderx;
    // var dy2 = poseValue.wristy - poseValue.shouldery;
    var dx2 = Math.abs(poseValue.wristx - poseValue.elbowx);
    var dy2 = Math.abs(poseValue.wristy - poseValue.elbowy);

    var dotProduct = dx1 * dx2 + dy1 * dy2;
    var magnitude1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    var magnitude2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    var cosTheta = dotProduct / (magnitude1 * magnitude2);
    var theta = Math.acos(cosTheta);

    // Convert to degrees
    var angleDegrees = (theta * 180) / Math.PI;

    return angleDegrees;
}

export async function CalculateShoulderWristDistance(maxDistance, poseValue) {
    // get coordinates of elbow, shoulder, wrist
    await new Promise(r => setTimeout(r, 500));
    // var positionValue = BodyValues(poseValue);

    // |x2-x1| and |y2-y1| 
    var dx = Math.abs(poseValue.shoulderx - poseValue.wristx);
    var dy = Math.abs(poseValue.shouldery - poseValue.wristy);

    // Calculate distance: sqrt( (dx*dx) + (dy*dy) )
    var distance = Math.sqrt((Math.pow(dx, 2) + Math.pow(dy, 2)));

    // var max = 0;
    if (maxDistance > distance) {
        return { maxDistance, distance };
    }
    if (maxDistance === 0) {
        maxDistance = distance;
        return { maxDistance, distance };
    }
    if (maxDistance < distance) {
        if (!(maxDistance >= 80 + maxDistance)) {
            maxDistance = distance;
            return { maxDistance, distance };
        }

    }

    return { maxDistance, distance };



}

export function isBodyStraight(poseValue) {
    // await new Promise(r => setTimeout(r, 250));
    // Calculate the vectors from shoulder to hip, hip to knee, and knee to ankle
    let vectorShoulderToHip = { x: poseValue.hipx - poseValue.shoulderx, y: poseValue.hipy - poseValue.shouldery };
    let vectorHipToKnee = { x: poseValue.kneex - poseValue.hipx, y: poseValue.kneey - poseValue.hipy };
    let vectorKneeToAnkle = { x: poseValue.anklex - poseValue.kneex, y: poseValue.ankley - poseValue.kneey };

    // Calculate the dot product between the vectors
    let dotProduct1 = vectorShoulderToHip.x * vectorHipToKnee.x + vectorShoulderToHip.y * vectorHipToKnee.y;
    let dotProduct2 = vectorHipToKnee.x * vectorKneeToAnkle.x + vectorHipToKnee.y * vectorKneeToAnkle.y;

    // Calculate the magnitude of the vectors
    let magnitude1 = Math.sqrt(vectorShoulderToHip.x ** 2 + vectorShoulderToHip.y ** 2) * Math.sqrt(vectorHipToKnee.x ** 2 + vectorHipToKnee.y ** 2);
    let magnitude2 = Math.sqrt(vectorHipToKnee.x ** 2 + vectorHipToKnee.y ** 2) * Math.sqrt(vectorKneeToAnkle.x ** 2 + vectorKneeToAnkle.y ** 2);

    // Calculate the cosine of the angle between the vectors
    let cosineAngle1 = dotProduct1 / magnitude1;
    let cosineAngle2 = dotProduct2 / magnitude2;

    // If the cosine of the angle is close to 1, the points are in a straight line
    // console.log("cosineAngle1-1: ",Math.abs(cosineAngle1 - 1));
    // console.log("cosineAngle2-1: ",Math.abs(cosineAngle2 - 1));
    // return Math.abs(cosineAngle1 - 1) < 0.1 && Math.abs(cosineAngle2 - 1) < 0.1;

    // If the cosine of the angle is close to 1, the points are in a straight line
    // return Math.abs(cosineAngle1 - 1) < 0.1736 && Math.abs(cosineAngle2 - 1) < 0.1736;

    return Math.abs(cosineAngle1 - 1) < 0.3420 && Math.abs(cosineAngle2 - 1) < 0.3420;

}

export async function CountPushup(maxDistance, distance, currentState) {

    // var percentage = (distance * 100) / maxDistance;

    if (currentState === false) {
        // Check if the subject is in down position
        if (distance <= maxDistance * 0.7) {
            currentState = true;
        }
    }
    else if (currentState === true) {
        // Check if the subject is in up position
        if (distance >= maxDistance * 0.9) {
            currentState = false;
        }
    }
    // console.log(currentState);
    return currentState;
}


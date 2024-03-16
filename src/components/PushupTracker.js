
// function retrieve hipValues(postValues){
//     var left
// }

import { max } from "@tensorflow/tfjs-core";
import React, { useEffect, useState } from "react";


// function assignHipFeatures(poseValues){
//     var hipx
// }

function UpperBodyValues(poseValue) {
    // shoulder values
    var left_shoulder = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_shoulder");
    var right_shoulder = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_shoulder");

    // elbow values
    var left_elbow = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_elbow");
    var right_elbow = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_elbow");

    // wrist values
    var left_wrist = poseValue[0].keypoints.find(keypoint => keypoint.name === "left_wrist");
    var right_wrist = poseValue[0].keypoints.find(keypoint => keypoint.name === "right_wrist");

    // console.log(typeof (left_shoulder.x));
    // console.log(left_shoulder.x);
    var shoulderx = 0;
    var shouldery = 0;
    var elbowx = 0;
    var elbowy = 0;
    var wristx = 0;
    var wristy = 0;
    if (left_shoulder.score > right_shoulder.score) {
        shoulderx = left_shoulder.x;
        shouldery = left_shoulder.y;
    }
    else {
        shoulderx = right_shoulder.x;
        shouldery = right_shoulder.y;
    }

    if (left_elbow.score > right_elbow.score) {
        elbowx = left_elbow.x;
        elbowy = left_elbow.y;
    }
    else {
        elbowx = right_elbow.x;
        elbowy = right_elbow.y;
    }


    if (left_wrist.score > right_wrist.score) {
        wristx = left_wrist.x;
        wristy = left_wrist.y;
        // console.log("left wrist confidence: ",left_wrist.score);
    }
    else {
        wristx = right_wrist.x;
        wristy = right_wrist.y;
        // console.log("right wrist confidence: ",right_wrist.score);
    }


    return { shoulderx, shouldery, elbowx, elbowy, wristx, wristy };



}

export function CalculateElbowAngle(poseValue) {
    var positionValue = UpperBodyValues(poseValue);
    var dx1 = Math.abs(positionValue.elbowx - positionValue.shoulderx);
    var dy1 = Math.abs(positionValue.elbowy - positionValue.shouldery);
    // var dx2 = positionValue.wristx - positionValue.shoulderx;
    // var dy2 = positionValue.wristy - positionValue.shouldery;
    var dx2 = Math.abs(positionValue.wristx - positionValue.elbowx);
    var dy2 = Math.abs(positionValue.wristy - positionValue.elbowy);

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
    var positionValue = UpperBodyValues(poseValue);

    // |x2-x1| and |y2-y1| 
    var dx = Math.abs(positionValue.shoulderx - positionValue.wristx);
    var dy = Math.abs(positionValue.shouldery - positionValue.wristy);

    // Calculate distance: sqrt( (dx*dx) + (dy*dy) )
    var distance = Math.sqrt((Math.pow(dx, 2) + Math.pow(dy, 2)));

    // var max = 0;
    if (maxDistance > distance) {
        return { maxDistance, distance };
    }
    if (maxDistance == 0) {
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

export async function CountPushup(maxDistance, distance, currentState) {
    var percentage = (distance * 100) / maxDistance;
    // if(currentState== 3 && (percentage<50 || percentage<60)){

    // }

    // if (distance <= maxDistance * 0.8 && currentState==false) {
    //     // the 'down' position of a pushup
    //     while (distance < maxDistance) {
    //         // wait for the 'up' position
    //         distance = getdistance();
    //     }
    // }
    if(currentState==false){
        // Check if the subject is in down position
        if(distance <= maxDistance * 0.6){
            currentState=true;
        }
    }
    else if(currentState==true){
        // Check if the subject is in up position
        if(distance>= maxDistance*0.8){
            currentState=false;
        }
    }
    console.log(currentState);
    return currentState;
}
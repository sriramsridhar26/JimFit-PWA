import React, { useState, useRef, useEffect } from 'react';
import { PoseDetector, SupportedModels, createDetector, movenet } from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgpu';
import { BodyValues, CalculateElbowAngle, CalculateShoulderWristDistance, CountPushup, isBodyStraight } from '../../../components/Pushup/PushupTracker';
import { Button } from '@mui/material';
import './Pushup.css'



export function Pushup() {
    // console.log(maxDistance);

    useEffect(() => {
        const initTfBackend = async () => {

            try {
                await tf.setBackend('webgpu');
            } catch (error) {
                console.log("Error setting webgpu as backend, setting webgl as");
                await tf.setBackend('webgl');
            }

            await tf.ready();
            // setBackendInitialized(true);
        };

        initTfBackend();
    }, []);

    const detectorConfig = { modelType: movenet.modelType.SINGLEPOSE_THUNDER };
    // const detectorPromise = createDetector(SupportedModels.MoveNet, detectorConfig);
    const detectorRef = useRef(null);

    const constraints = {
        audio: false,
        video: { facingMode: "user" }
    };
    // console.log("Pushup refresh");
    const [stream, setStream] = useState(null);
    // const [devids, setdevids] = useState([]);
    const [videoFeedOn, setVideoFeedOn] = useState(false);
    // const [maxDistance, setmaxDistance] = useState(0);
    var maxDistanceRef = useRef(0);
    var currentState = useRef(false);
    const [pushupCount, setpushupCount] = useState(0);
    var pushupCountRef = useRef(0);

    // const [elbowangle, setelbowankle] = useState(0);
    // const [distance, setDistance] = useState(0);
    // var distance =
    const [actLoop, setactLoop] = useState(false);
    var prevState = useRef(false);
    const videoRef = useRef(null);


    useEffect(() => {

        const getStream = async () => {
            try {
                // const getcam = navigator.mediaDevices.getUserMedia || navigator.
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(stream);
                videoRef.current.srcObject = stream;
                // const detector = await createDetector(SupportedModels.MoveNet, detectorConfig);
                // const vid = document.getElementById('video');
                // const poses = await detector.estimatePoses(vid,{flipHorizontal: false,maxPoses:1 });
                // console.log(poses);
                // const detector = await detectorPromise;
                const detector = await createDetector(SupportedModels.MoveNet, detectorConfig);
                detectorRef.current = detector;
                setVideoFeedOn(true);
                console.log("invoked stream useEffect");
            } catch (error) {
                console.error('Error accessing camera or invoking detector:', error);
                alert("Error accessing camera or invoking detector: ", error);
            }
        };
        // navigator.mediaDevices.enumerateDevices().then(gotDevices);

        getStream();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         if (videoFeedOn && detectorRef.current) {
    //             // alert("entered vidfeedon && detectorRef.curret");
    //             try {
    //                 const poses = await detectorRef.current.estimatePoses(videoRef.current, {
    //                     flipHorizontal: false,
    //                     maxPoses: 1,
    //                 });
    //                 // const requestOptions = {
    //                 //     method: 'POST',
    //                 //     headers: { 'Content-Type': 'application/json' },
    //                 //     body: JSON.stringify({ poses: poses })
    //                 // };
    //                 // console.log(requestOptions);
    //                 // alert("Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
    //                 // alert(JSON.stringify({ poses: poses }));
    //                 // await fetch('http://192.168.2.38:5000/api/data', requestOptions);
    //                 console.log(poses);
    //                 // console.log(poses[0].keypoints.find(keypoint =>keypoint.name==="left_shoulder"));

    //                 console.log("maxDistance before invoking: ", maxDistance);
    //                 await setelbowankle(CalculateElbowAngle(poses));
    //                 const result = await CalculateShoulderWristDistance(maxDistance, poses);
    //                 console.log("maxDistance from function: ", result.maxDistance);
    //                 setmaxDistance(result.maxDistance);
    //                 console.log("maxDistance after setting: ", maxDistance);
    //                 setDistance(result.distance);
    //             } catch (error) {
    //                 console.error('Error generating pose values', error);
    //                 alert("Error generating pose values " + error);
    //             }
    //         }
    //     }, 1000);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [videoFeedOn]);

    useEffect(() => {
        const loop = async () => {
            while (actLoop) {
                try {
                    const poses = await detectorRef.current.estimatePoses(videoRef.current, {
                        flipHorizontal: false,
                        maxPoses: 1,
                    });
                    // const requestOptions = {
                    //     method: 'POST',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify({ poses: poses })
                    // };
                    // console.log(requestOptions);
                    // alert("Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
                    // alert(JSON.stringify({ poses: poses }));
                    // await fetch('http://192.168.2.38:5000/api/data', requestOptions);

                    // console.log(poses);

                    // console.log(poses[0].keypoints.find(keypoint =>keypoint.name==="left_shoulder"));

                    // console.log("maxDistanceRef: ",maxDistanceRef.current);
                    // console.log("maxDistance before invoking: ", maxDistance);



                    // await setelbowankle(CalculateElbowAngle(poses));
                    var pushupPoseValues = await BodyValues(poses);

                    if (!isBodyStraight(pushupPoseValues)) {
                        await new Promise(r => setTimeout(r, 250));
                        console.log("Ankle, Knee, Hip, Shoulder not straight, correct it");
                        continue;
                    }
                    // await new Promise(r => setTimeout(r, 500));

                    const result = await CalculateShoulderWristDistance(maxDistanceRef.current, pushupPoseValues);
                    // console.log("maxDistance from function: ", result.maxDistance);
                    // setmaxDistance(result.maxDistance);
                    maxDistanceRef.current = result.maxDistance;
                    // console.log("maxDistance after setting: ", maxDistance);
                    // setDistance(result.distance);
                    // console.log(result.distance);


                    prevState.current = currentState.current;

                    currentState.current = await CountPushup(maxDistanceRef.current, result.distance, currentState.current);
                    if (prevState.current === true && currentState.current === false) {
                        console.log("pushupCount+1");
                        // setpushupCount(pushupCount+1);
                        // console.log(pushupCountRef.current);
                        pushupCountRef.current = pushupCountRef.current + 1;
                        console.log(pushupCountRef.current);
                    }
                } catch (error) {
                    console.error('Error generating pose values', error);
                    alert("Error generating pose values " + error);
                }
            }
        }
        loop();

    }, [actLoop]);



    useEffect(() => {
        // if(currentState.current===false){
        setpushupCount(pushupCount + 1);
        console.log("pushup count: ", pushupCount);
        // }

    }, [pushupCountRef.current])

    // console.log("maxDistance outside: ", maxDistance);
    return (
        <>
            <h2>Let's get started</h2>
            <div className='pushupcomp'>

                {/*<div>
                <h3>distance: {distance}</h3>
            </div>
            <div>
                <h3>maxdistance: {maxDistance}</h3>
            </div> 
            <div>
                <h3>angle: {elbowangle}</h3>
            </div> */}
                <div className='viddiv'>
                    <video id='video' ref={videoRef} autoPlay muted playsInline style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '40px',
                        objectFit: 'cover', // This will ensure that the video covers the entire div
                    }} />
                </div>
                <div>
                    <h3>Count: {pushupCount}</h3>
                </div>
                <div>
                    <Button onClick={() => {
                        setactLoop(!actLoop);
                    }}>Activate</Button>
                </div>
            </div>


        </>


    )
}
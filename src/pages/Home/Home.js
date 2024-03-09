import React, { useState, useRef, useEffect } from 'react';

export function Home() {

    const constraints = {
        audio: false,
        // video: true
        // video: {
        //     width: { min: 576, ideal: 720, max: 1080 },
        //     height: { min: 1024, ideal: 1280, max: 1920 }
        // },
        video: { facingMode: "user" }
    };

    const [stream, setStream] = useState(null);
    const [devids, setdevids] = useState([]);
    const videoRef = useRef(null);

   
    useEffect(() => {
        // const gotDevices = (deviceInfos) => {
        //     for (let i = 0; i !== deviceInfos.length; ++i) {
        //         const deviceInfo = deviceInfos[i];
        //         if (deviceInfo.kind === 'videoinput') {
        //             // let text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
        //             // console.log(text);
        //             console.log(i);
        //             console.log(deviceInfo.deviceId);
        //             console.log(deviceInfo.label);
        //             setdevids(
        //                 [
        //                     ...devids,
        //                     {deviceId: deviceInfo.deviceId, deviceName: deviceInfo.label}
        //                 ]
        //             )
        //             // devids.push({})
        //         }
        //     }
        // };
        const getStream = async () => {
            try {
                // const getcam = navigator.mediaDevices.getUserMedia || navigator.
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(stream);
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert("Error accessing camera: ", error);
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
    return (
        <>
            <h1>Hello from home</h1>
            {/* <ul>
                {devids.map(devid =>(
                    <li key={devid.deviceId}>{devid.deviceId} || {devid.deviceName}</li>
                ))}
            </ul> */}
            <div>
                <video ref={videoRef} autoPlay muted playsInline />
            </div>
        </>


    )
}
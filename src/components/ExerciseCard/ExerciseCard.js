import React from "react";
import './ExerciseCard.css'
import { useNavigate } from "react-router-dom";

export function ExerciseCard({exercise}){
    const navigate = useNavigate();

    console.log(exercise);

    return(
        <>
        <div className="excard" key={exercise.id} onClick={() => navigate('/' + exercise.name)}>
            <div className="excard-content">
            <div className="icon">
                <img src={exercise.img} />
            </div>
            <div className="cal">
                <h4>{exercise.cal} Kcal</h4>
            </div>
            <div className="name">
                <p>{exercise.name}</p>
            </div>
            </div>
            
        </div>
        </>
    )

}
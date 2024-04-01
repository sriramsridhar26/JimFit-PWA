import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import './Home.css';
import { mockexercisetypes, mockprofiledata } from '../../data/mockupdata';
import calendar from '../../assets/calendar.png';
import threedots from '../../assets/more.png';
import flashicon from '../../assets/white-flash.png';
import { ExerciseCard } from '../../components/ExerciseCard/ExerciseCard';
import challenge from '../../assets/challenges.png';
import fastforward from '../../assets/fast-forward.png';
import trophy from '../../assets/trophy.png';


export function Home() {
    var data = mockprofiledata();
    const date = new Date();
    var exercisecards = mockexercisetypes();

    return (
        <>
            <div className='homediv'>
                <div className='topbar'>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <div className='imgdiv'>
                                <img className='imga' src={`${data.img}`} width="50px" height="50px" />
                            </div>

                        </Grid>
                        <Grid item xs={8}>
                            <h3>Welcome {data.FirstName}</h3>
                            <p>{date.toLocaleString('default', { month: 'long' })},{date.getDay()}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <div className='imgdiv'>
                                <img src={calendar} width="32px" height="32px" />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className='Progress'>
                    <div className='current'>
                        {/* <Progress progress={75} /> */}
                        <h1>{data.TodayBurn} Kcal</h1>
                        <p>Total Kilocalories</p>
                    </div>
                </div>
                <div className='stats'>
                    <Grid container spacing={2}>
                        <Grid item xs={4} style={{ paddingTop: "1%" }}>
                            <div className='indstat'>
                                <h3>{data.AvgBurn} </h3>
                                <p>Avg burn</p>
                            </div>

                        </Grid>
                        <Grid item xs={4} style={{ paddingTop: "1%" }} >
                            <div className='indstat'>
                                <h3>{data.PeakBurn} </h3>
                                <p>Peak cal burn</p>
                            </div>

                        </Grid>
                        <Grid item xs={4} style={{ paddingTop: "1%" }}>
                            <div className='indstat'>
                                <h3>{data.AvgTime} </h3>
                                <p>Avg time</p>
                            </div>

                        </Grid>
                    </Grid>
                </div>
                <div className='exercisecardsection'>
                    <h4>Grind</h4>
                    <div className='exercisecards'>

                        <div className='dummycard'></div>
                        {exercisecards.map((item) => {
                            return <ExerciseCard exercise={item} />
                        })}

                    </div>
                </div>
                <div className='Goals'>
                    <div className='Goals-heading'>
                        <Grid container>
                            <Grid item xs={10}>
                                <h4 style={{ marginTop: '5%' }}>
                                    Short Term Goal
                                </h4>
                                <p>
                                    April 2024
                                </p>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='dotimg'>
                                    <img src={threedots} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='Goals-content'>
                        <div className='Goals-card'>
                            <div className='Goals-card-top'>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div className='flash'>
                                            <div className='flashicon'>
                                                <img src={flashicon} width="32px" height="32px" />
                                            </div>
                                        </div>

                                    </Grid>
                                    <Grid item xs={8}>
                                        <p>WEEK 1</p>
                                        <h3>Body Weight</h3>
                                        <h5>Workout 1 of 5</h5>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='Goals-card-bottom'>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div className='fwdicon'>
                                            <img src={fastforward} width="32px" height="32px" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <p>Next Exercise</p>
                                        <h4>Lower Body</h4>
                                    </Grid>
                                </Grid>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='Goals'>
                    <div className='Goals-heading'>
                        <Grid container>
                            <Grid item xs={10}>
                                <h4 style={{ marginTop: '5%' }}>
                                    Long Term Goal
                                </h4>
                                <p>
                                    2024
                                </p>
                            </Grid>
                            <Grid item xs={2}>
                                <div className='dotimg'>
                                    <img src={threedots} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='Goals-content'>
                        <div className='Goals-card'>
                            <div className='Goals-card-top'>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div className='flash'>
                                            <div className='tr-flashicon'>
                                                <img src={trophy} width="32px" height="32px" />
                                            </div>
                                        </div>

                                    </Grid>
                                    <Grid item xs={8}>
                                        <p>Month 4</p>
                                        <h3>Body Weight</h3>
                                        <h5>Avg workout time: 50m/day</h5>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='Goals-card-bottom'>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div className='fwdicon'>
                                            <img src={challenge} width="32px" height="32px" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <p>Need to focus on</p>
                                        <h4>Triceps</h4>
                                    </Grid>
                                </Grid>

                            </div>

                        </div>
                    </div>
                </div>
                <h1>Hello from home</h1>
            </div>

        </>
    )
}
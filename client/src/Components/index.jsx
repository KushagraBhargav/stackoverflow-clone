import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import getUserByToken from '../Lib/getUserByToken';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import Leftbar from './leftbar'

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [firstRender, setFirstRender] = useState(true);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if(result) setUserInfo(result)
            if(firstRender) setFirstRender(false)
        })
    }, [firstRender])

    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/all`)
        .then(res => setQuestions(res.data))
    })

    useEffect(() => console.log(userInfo), [userInfo])

    return(
        <div className="container">
            {!userInfo && !firstRender?
            <div className="mt-7 intro-pg pt-5">
                <h1 className="intro-title">WELCOME TO STACKOVERFLOW CLONE </h1>
                <p className="mt-3 intro-text">Join the developer community!!</p>
                <p className="mt-3 intro-text">Click on Login || Sinup to begin.</p>

                <Link to = "/login" className="btn btn-dark mr-2">Log in</Link>
                <Link to = "/register" className="btn btn-light ml-2">Sign up</Link>
            </div>
            :<div>
                <h1 className="mt-5 index-title">Top Questions <Link className="btn ask-question-btn" to = "/create">Ask question</Link></h1>
                {questions?.map(question => {
                    return(
                        <div className="mt-10">
                        <div key = {question._id} className="box theme-light m-5 p-5">
                            <Link to = {`/question/${question._id}`}>
                                <h3>{question.title}</h3>
                                <p className="mt-10">Asked {moment(question?.createdAt).fromNow()} by {question?.asker?.name}</p>
                                
                            </Link>

                        </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default Home;
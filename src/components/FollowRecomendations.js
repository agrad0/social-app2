import React from "react";
import { useEffect, useState, useContext } from "react";
import './FollowRecomendations.css';
import { LoginContext } from '../App';
import axios from "axios";

const FollowRecomendations = (props) => {
    const {userData} = useContext(LoginContext);
    const [recommendations, setRecommendations] = useState([]);

  
    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
         .then(res => {
          console.log(res.data) 
          setRecommendations(res.data);
         }) 
         .catch((error) => console.error(error))
         axios.post('https://akademia108.pl/api/social-app/follows/allfollows')
         .then(res => {
          console.log(res)
         })
    }
    
    const follow = (leader_id) => {
        const followedUserData = JSON.stringify({"leader_id": leader_id})
        axios.post('https://akademia108.pl/api/social-app/follows/follow', followedUserData)
         .then(() => {
           setRecommendations(recommendations.filter(profile => profile.id !== leader_id ));
           props.updatePosts();
           getRecommendations();
         }) 
         .catch((error) => console.error(error))
    }


    useEffect(() => {
        if (userData) {
        getRecommendations()
      }
      }, [userData])

    return (
    <ul className='recommended-profiles'>
        {recommendations.map((recommendedProfile) => {
            return(
            <li className='recommended-profile'>
                <img src={recommendedProfile?.avatar_url} alt='Recommended user'></img>
                <span>{recommendedProfile?.username}</span>
                <button onClick={() => follow(recommendedProfile?.id)}>Follow</button>
            </li> 
            )
        })}
    </ul>
    )
}






export default FollowRecomendations;



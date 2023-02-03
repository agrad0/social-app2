import React from "react";
import { useEffect, useState, useContext } from "react";
import './FollowRecomendations.css';
import { LoginContext } from '../App';
import axios from "axios";

const FollowRecomendations = (props) => {
    const {userData} = useContext(LoginContext);
    const [recommendations, setRecommendations] = useState([]);
    let recommendationsLength = recommendations.length;

    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
         .then(res => {
           setRecommendations(res.data);
         }) 
         .catch((error) => console.error(error))
       }
    
    const follow = (leader_id) => {
        const followedUserData = JSON.stringify({"leader_id": leader_id})
        axios.post('https://akademia108.pl/api/social-app/follows/follow', followedUserData)
         .then(res => {
           console.log(res.data);
           console.log(recommendations)
           const deletedItemIndex = recommendations.findIndex(item => item.id === leader_id);
           console.log(deletedItemIndex);
           setRecommendations(recommendations.filter(profile => profile.id !== leader_id ));
           props.updatePosts();
         }) 
         .catch((error) => console.error(error))
    }


    useEffect(() => {
        if (userData) {
        getRecommendations()
        console.log(recommendations)
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



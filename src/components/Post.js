import React from "react";
import './Post.css';


const Post = (props) => {
    const createdAtDate = props.postData.created_at.slice(0, 10);
    const createdAtTime = props.postData.created_at.slice(12, 19);
    const likesCounter = props.postData.likes.length;
    return (
        <div className="post-container" key={props.postId}>
            <div className="avatar">
                <img src={props.postData.user.avatar_url} alt={props.postData.user.username} />
            </div>  
            <div className="post-content">
                <h5>Data dodania: {createdAtDate} Godzina dodania: {createdAtTime} Liczba lajków: {likesCounter}</h5>
                
                <article>{props.postData.content}</article>

            </div>
        </div>
    )
}





export default Post
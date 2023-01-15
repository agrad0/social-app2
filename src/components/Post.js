import React from "react";
import './Post.css';


const Post = (props) => {
    
    return (
        <div className="post-container">
            <div className="avatar">
                <img src={props.postData.user.avatar_url} alt={props.postData.user.username} />
            </div>  
            <div className="post-content">
                <h5>Data dodania: {props.postData.created_at}</h5>
                
                <article>{props.postData.content}</article>

            </div>
        </div>
    )
}





export default Post
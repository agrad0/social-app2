import React from "react";
import './Post.css';


const Post = (props) => {
    
    return (
        <div className="post-container">
            <div className="avatar">
                <img src={props.postData.user.avatar_url} alt={props.postData.user.username} />
            </div>  
            <div className="post-content">
                  

            </div>
        </div>
    )
}





export default Post
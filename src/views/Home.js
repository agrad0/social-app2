// import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { LoginContext } from '../App';
import axios from "axios";
import Post from '../components/Post';
import './Home.css';
import AddPost from "../components/AddPost";
import FollowRecomendations from "../components/FollowRecomendations";
import PopUp from "./PopUp";

const Home = () => {
  const {userData} = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const [unfollowedUser, setUnfollowedUser] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);


  const getLatestPosts = () => {

    axios.post('https://akademia108.pl/api/social-app/post/latest')
      .then(res => {
        setPosts(res.data);
      })
      .catch((error) => console.error(error))
  }

  const getNextPosts = () => {
    axios.post('https://akademia108.pl/api/social-app/post/older-then', {
      date: posts[posts.length - 1].created_at
    })
      .then(res => {
        setPosts(posts.concat(res.data));
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
  getLatestPosts()
  }, [])

  useEffect(() => {
    if (!userData)
    setTimeout(() => {
      setShowPopUp(true)
    }, 5000)
  }, [userData])

  const getPrevPosts = () => {
    axios.post('https://akademia108.pl/api/social-app/post/newer-then', {
      date: posts[0].created_at
    })
      .then(res => {
        console.log(res);
        setPosts(res.data.concat(posts));
    })
    .catch((error) => console.error(error))

  }

  const deletePost = (post_id) => {
    const postToDelete = JSON.stringify({"post_id": post_id});
    axios.post('https://akademia108.pl/api/social-app/post/delete', postToDelete)
      .then((response) => {
        console.log(response);
      })
    setPosts(posts.filter(post => post.id !== post_id ))
  }

  const disFollow = (user_id) => {
    console.log(user_id)
    const followedUserData = JSON.stringify({"leader_id": user_id});
    axios.post('https://akademia108.pl/api/social-app/follows/disfollow', followedUserData)
     .then(res => {
       console.log(res.data);
       setUnfollowedUser(user_id)
       getLatestPosts();
     }) 
     .catch((error) => console.error(error))
    setPosts(posts.filter(post => post.user.id !== user_id ));
}


    return (
      <>
        <header>
          <h1>Feed</h1>
        </header>
        <main>
        
        {userData &&
        <AddPost getPrevPosts={getPrevPosts} />}

        {!userData && showPopUp &&
        <PopUp setShowPopUp={setShowPopUp} />}

        {userData && 
        <FollowRecomendations updatePosts={getLatestPosts} unfollowedUser={unfollowedUser} />}
        <div className='post-feed'>
            {posts.map((post) => {
              return (
                <Post postData={post} postId={post.id} deletePost={deletePost} disFollow={disFollow} key={post.id} />
              )
            })}
            <button onClick={getNextPosts}>Pokaż więcej</button>
        </div>
        </main>
      </>
    );
  }

  export default Home;
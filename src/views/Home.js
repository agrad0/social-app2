// import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { LoginContext } from '../App';
import axios from "axios";
import Post from '../components/Post';
import './Home.css';
import AddPost from "../components/AddPost";

const Home = () => {
  const {userData, setUserData} = useContext(LoginContext);
  const [posts, setPosts] = useState([])

  const getLatestPosts = () => {

    axios.post('https://akademia108.pl/api/social-app/post/latest')
      .then(res => {
        console.log(res);
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
    const user = JSON.parse(userData);
    axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.post('https://akademia108.pl/api/social-app/post/delete', postToDelete)
      .then((response) => {
        console.log(response);
      })
    setPosts(posts.filter(post => post.id !== post_id ))
  }

    return (
      <>
        <header>
          <h1>Feed</h1>
        </header>
        <main>
        
        {userData &&
        <AddPost getPrevPosts={getPrevPosts} />}


        <div className='recommended-profiles'>
          <h3>Subscribe new recommended profiles!</h3>
        </div>

        <div className='post-feed'>
            {posts.map((post) => {
              return (
                <Post postData={post} postId={post.id} deletePost={deletePost} />
              )
            })}
            <button onClick={getNextPosts}>Pokaż więcej</button>
        </div>
        </main>
      </>
    );
  }

  export default Home;
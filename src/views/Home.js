// import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Post from '../components/Post'

import './Home.css';

const Home = () => {
    
  
  const [posts, setPosts] = useState([])

  const getLatestPosts = () => {

    axios.post('https://akademia108.pl/api/social-app/post/latest')
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((error) => console.error(error))

    
  }

    useEffect(() => {
      getLatestPosts()
    }, [])

    return (
      <>
        <header>
          <h1>Feed</h1>
        </header>
        <main>
        <div className='create-post'>
          <h3>Create a new post!</h3>
        </div>

        <div className='recommended-profiles'>
          <h3>Subscribe new recommended profiles!</h3>
        </div>

        <div className='post-feed'>
            {posts.map((post) => {
              return (
                <Post postData={post} />
              )
            })}
        </div>
        </main>
      </>
    );
  }

  export default Home;
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {API} from '../../api';
import './posts.css'



export default function PostsPage() {
    const [posts, setPosts] = useState([])
    const [value, setValue] = useState('');



    useEffect(() => {
        API.get('posts')
        .then( resp => setPosts(resp.data))
    }, [])


    const deletePosts = (id) => {
        const promt = window.confirm('Вы действительно хотите удалить ….')
        if(promt){
            axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then( () => {
                setPosts(posts.filter(i => i.id !== id))
            })
        }
    }

    
    return (
        <ul>
            <h1>Список постов</h1>
            {posts.map( p => 
                <div>
                    <li key={p.id} style={{fontSize: '2rem'}} className='post-li'>
                        <Link to={`/posts/${p.id}`} className='post'>{p.title}</Link>
                    </li>
                    <button>edit post</button>
                    <button onClick={() => deletePosts(p.id)}>delete post</button>
                </div>
                
            )}

        </ul>
    )
};
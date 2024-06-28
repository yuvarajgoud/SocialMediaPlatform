import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`/api/posts?userId=${id}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };
        fetchUserProfile();
        fetchUserPosts();
    }, [id]);

    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-details">
                    <img src={user.avatar} alt="Profile" className="profile-picture" />
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <div className="profile-actions">
                        <button className="profile-button">About</button>
                        <button className="profile-button">Edit Profile</button>
                    </div>
                    <div className="user-posts">
                        <h3>Posts</h3>
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <div key={post._id} className="post">
                                    <p>{post.content}</p>
                                    {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                                </div>
                            ))
                        ) : (
                            <p>No posts yet.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;

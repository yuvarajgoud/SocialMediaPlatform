import React, { useState, useEffect } from 'react';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/posts/${postId}/comments`);
      setComments(res.data);
      setLoading(false);
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/posts/${postId}/comments`, { content });
    setComments([...comments, res.data]);
    setContent('');
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;


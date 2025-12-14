import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [stories, setStories] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }
fetchPosts()

window.addEventListener("scroll",handleScroll)
return ()=>{
  window.removeEventListener("scroll",handleScroll)
}
    
  }, []);

  const fetchPosts = ()=>{
    // Fetching all posts
    fetch(`/allposts?limit=${limit}&skip=${skip}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData((data)=>[...data, ...result]);
        const newLoading = {};
        result.forEach(post => {
          newLoading[post._id] = true;
        });
        setLoadingImages(prev => ({ ...prev, ...newLoading }));
        // Update stories with unique users
        const uniqueUsers = {};
        [...data, ...result].forEach(post => {
          if (!uniqueUsers[post.postedBy._id]) {
            uniqueUsers[post.postedBy._id] = post.postedBy;
          }
        });
        setStories(Object.values(uniqueUsers).slice(0, 10)); // Limit to 10
      })
      .catch((err) => console.log(err));
  }

  const handleScroll = ()=>{
    if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
      skip = skip + 10
      fetchPosts()
    }
  }

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  // function to make comment
  const makeComment = (text, id) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

  return (
    <div className="home">
      {/* Stories */}
      <div className="stories">
        {stories.map(user => (
          <div className="story" key={user._id}>
            <img src={user.Photo ? user.Photo : picLink} alt={`${user.name}'s story`} />
            <p>{user.name}</p>
          </div>
        ))}
      </div>

      {/* Posts */}
      {data.map((posts) => {
        return (
          <div className="card" key={posts._id}>
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                  alt={`${posts.postedBy.name}'s avatar`}
                />
              </div>
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                </Link>
              </h5>
            </div>
            {/* card image */}
            <div className="card-image">
              {loadingImages[posts._id] && <div className="image-loading">Loading...</div>}
              <img 
                src={posts.photo} 
                alt={posts.body || "Post image"} 
                onLoad={() => setLoadingImages(prev => ({ ...prev, [posts._id]: false }))}
                onError={() => setLoadingImages(prev => ({ ...prev, [posts._id]: false }))}
                style={{ display: loadingImages[posts._id] ? 'none' : 'block' }}
              />
            </div>

            {/* action bar */}
            <div className="action-bar">
              <div className="action-icons">
                {posts.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <span
                    className="material-symbols-outlined material-symbols-outlined-red"
                    onClick={() => {
                      unlikePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                )}
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    toggleComment(posts);
                  }}
                >
                  chat_bubble
                </span>
                <span className="material-symbols-outlined">send</span>
                <span className="material-symbols-outlined" style={{ marginLeft: 'auto' }}>bookmark</span>
              </div>
            </div>

            {/* card content */}
            <div className="card-content">
              <p className="likes">{posts.likes.length} likes</p>
              <p className="caption">
                <strong>{posts.postedBy.name}</strong> {posts.body}
              </p>
              <p
                className="view-comments"
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all comments
              </p>
            </div>

            {/* add Comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(comment, posts._id);
                }}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}

      {/* show Comment */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt={item.body || "Post image"} />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #dbdbdb" }}
              >
                <div className="card-pic">
                  <img
                    src={item.postedBy.Photo ? item.postedBy.Photo : picLink}
                    alt={`${item.postedBy.name}'s avatar`}
                  />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>

              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #dbdbdb" }}
              >
                <div style={{ padding: '16px 0' }}>
                  <p className="comm">
                    <span className="commenter" style={{ fontWeight: "600" }}>
                      {item.postedBy.name}{" "}
                    </span>
                    <span className="commentText">{item.body}</span>
                  </p>
                </div>
                {item.comments.map((comment) => {
                  return (
                    <div key={comment._id} style={{ padding: '8px 0' }}>
                      <p className="comm">
                        <span
                          className="commenter"
                          style={{ fontWeight: "600" }}
                        >
                          {comment.postedBy.name}{" "}
                        </span>
                        <span className="commentText">{comment.comment}</span>
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* card content */}
              <div className="card-content" style={{ borderBottom: '1px solid #dbdbdb', padding: '12px 16px' }}>
                <p className="likes">{item.likes.length} likes</p>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <button
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

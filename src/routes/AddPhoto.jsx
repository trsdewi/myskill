import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const data = {
    imageUrl: imageUrl,
    captions: captions,
    createdAt: "2022-11-25T10:58:50.032Z",
    updatedAt: "2022-11-25T10:58:50.032Z",
    secret: secret,
  }

  const addPhoto = async (e) => {
    e.preventDefault();
    if(secret === "password"){
      const url = "http://localhost:3001/photos";
      const setting = {
        method: "POST", // HTTP method
        headers: {
        // HTTP headers
          "Content-Type": "application/json", // type data yang dikirim
      },
      body: JSON.stringify(data),
      };
      try {
        const response = await fetch(url,setting);
        const data = await response.json();
        navigate("/photos");
      }catch(error){
        console.log(error);
      }
    }
    else if(secret !== "password"){
      setError( "You are not authorized")
    }
    // TODO: answer here
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;

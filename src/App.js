import React, { useState, useEffect } from "react";
import { useStore } from "./context/storeContext";
import { userAdded, getUsers, signIn, getCurrUser } from "./store/users";
import {
  commentAdded,
  commentDeleted,
  commentModified,
  getComments,
} from "./store/comments";

import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextArea from "./components/TextArea";
import FlexContainer from "./common/FlexContainer";
import Typography from "@material-ui/core/Typography";

function App() {
  const store = useStore();
  const [text, setText] = useState("Hello World");
  const [comms, setComms] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [currUser, setCurrUser] = useState({});

  //const textRef = React.useRef();

  function stateUpdate() {
    const comments = getComments(store.getState());
    const users = getUsers(store.getState());
    const currUser = getCurrUser(store.getState());
    setCurrUser(currUser);
    setUsers(users);
    setComms(comments);
  }

  useEffect(() => {
    const unsub = store.subscribe(stateUpdate);
    return () => {
      unsub();
    };
  });

  const handleCommentAdd = (value) => {
    store.dispatch(
      commentAdded({
        userId: currUser.userId,
        name: currUser.name,
        body: value,
      })
    );
  };
  const handleRegisterUser = () => {
    store.dispatch(userAdded({ name: user }));
  };
  return (
    <div className="App">
      <FlexContainer width="350px" justify="space-between">
        <TextField
          id="userAdd"
          label="Add User"
          variant="filled"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={handleRegisterUser}
          size="small"
        >
          Register
        </Button>
      </FlexContainer>
      <FlexContainer width="200px" justify="space-between">
        <Typography variant="subtitle1" color="initial">
          Login
        </Typography>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            const userId = e.currentTarget.value;
            store.dispatch(signIn({ userId }));
          }}
        >
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.name}
            </option>
          ))}
        </select>
      </FlexContainer>

      {comms.map((comment) => (
        <div key={comment.id}>
          <div
            dangerouslySetInnerHTML={{
              __html: `${comment.name} says: - ${comment.body} - ${comment.dateCreated}`,
            }}
          />
          <button
            onClick={() =>
              store.dispatch(
                commentDeleted({ id: comment.id, userId: currUser.userId })
              )
            }
          >
            Delete
          </button>
          <button
            onClick={() =>
              store.dispatch(
                commentModified({
                  id: comment.id,
                  body: text,
                  userId: currUser.userId,
                })
              )
            }
          >
            Modify
          </button>
        </div>
      ))}
      <TextArea value={text} onChange={setText} onSend={handleCommentAdd} />
      <button onClick={() => handleCommentAdd(text)}>Add comment</button>
    </div>
  );
}

export default App;

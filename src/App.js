import "./App.css";
import React, { useReducer, useRef, useState} from "react";
const initialState = {
  text: "",
  preview: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload, preview: action.payload };
    case "CONVERT_UPPERCASE":
      return { ...state, preview: state.text.toUpperCase() };
    case "CONVERT_LOWERCASE":
      return { ...state, preview: state.text.toLowerCase() };
    case "CLEAR_TEXT":
      return { ...state, text: "", preview: "" };
    case "COPY_TO_CLIPBOARD":
      navigator.clipboard.writeText(state.preview);
      return state;
    case "REMOVE_EXTRA_SPACE":
      const newText = state.text.replace(/\s + /g, "").trim();
      return { ...state, text: newText, preview: newText };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const textAreaRef = useRef(null);

  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const handleCount = () => {
    const words = state.text.split(/\s+/).filter((word) => word !== "").length;
    const characters = state.text.length;
    const readingTime = Math.ceil(words / 200);

    setWordCount(words);
    setCharCount(characters);
    setReadingTime(readingTime);

    alert(
      `Words: ${words}, Characters: ${characters} , Reading Time: ${readingTime}`
    );
  };
  return (
    <div className="App">
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Text Util</h1>
        <textarea
          ref={textAreaRef}
          rows="5"
          cols="50"
          value={state.text}
          onChange={(e) =>
            dispatch({ type: "SET_TEXT", payload: e.target.value })
          }
          style={{ padding: "10px", marginTop: "10px", borderRadius: "5px" }}
        ></textarea>
        <br />
        <button className="action-btn" onClick={() => dispatch({ type: "CONVERT_UPPERCASE" })}>
          Convert to Uppercase
        </button>
        <button className="action-btn" onClick={() => dispatch({ type: "CONVERT_LOWERCASE" })}>
          Convert to Lowercase
        </button>
        <button className="action-btn" onClick={() => dispatch({ type: "CLEAR_TEXT" })}>
          Clear Text
        </button>
        <button className="action-btn" onClick={() => dispatch({ type: "COPY_TO_CLIPBOARD" })}>
          Copy to Clipboard
        </button>
        <button className="action-btn" onClick={() => dispatch({ type: "REMOVE_EXTRA_SPACE" })}>
          Remove Extra Space
        </button>
        <br />
        <button onClick={handleCount} className="count-btn">
          Count Words, Characters, Reading Time
        </button>
        <br />
        {wordCount > 0 && (
          <div className="counts">
            <p>Words: {wordCount}</p>
            <p>Characters: {charCount}</p>
            <p>Reading Time: {readingTime}</p>
          </div>
        )}
        <div>
          <strong>Preview:</strong>
          <p>{state.preview}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

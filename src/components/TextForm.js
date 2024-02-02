import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleClearClick = () => {
    setText("");
  };

  const handleCapitalizeWordClick = () => {
    let lowercase = text.toLowerCase();
    let words = lowercase.split(" ");
    let newWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let newText = newWords.join(" ");
    setText(newText);
  };

  const handleToggleCaseClick = () => {
    let words = text.split(" ");
    let newText = words
      .map((word) => {
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
          let char = word.charAt(i);
          if (char >= "A" && char <= "Z") {
            char = char.toLowerCase();
          } else if (char >= "a" && char <= "z") {
            char = char.toUpperCase();
          }
          newWord += char;
        }

        return newWord;
      })
      .join(" ");

    setText(newText);
  };

  const handleSentenceCaseClick = () => {
    let lowerCase = text.toLowerCase();
    let regex = /([^.!?]+[!?.\d\s]+)/g;
    let sentences = lowerCase.match(regex);
    let newText = sentences
      .map((sentence) => {
        return sentence.charAt(0) >= "a" && sentence.charAt(0) <= "z"
          ? sentence.charAt(0).toUpperCase() + sentence.slice(1)
          : sentence;
      })
      .join("");

    setText(newText);
  };

  const handleExtraSpacesClick = () => {
    let newText = text.split(/[\s]+/).join(" ");
    setText(newText);
  };

  const handleCopyTextClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const calculateWords = () => {
    let numOfWords = 0;
    let words = text.split(/[\s]+/);
    let length = words.length;
    numOfWords = words[length - 1] === "" || words[length - 1] === " " ? length - 1 : length;
    return numOfWords;
  };

  const [text, setText] = useState("");
  return (
    <div
      style={{
        color: props.mode === "light" ? "black" : "white",
      }}
    >
      <div className="container py-2 style">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#181818",
              color: props.mode === "light" ? "black" : "white",
            }}
          ></textarea>
        </div>
        <button className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`} onClick={handleUpClick}>
          UPPERCASE
        </button>
        <button className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`} onClick={handleLoClick}>
          lower case
        </button>
        <button
          className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`}
          onClick={handleCapitalizeWordClick}
        >
          Capitalize Words
        </button>
        <button
          className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`}
          onClick={handleToggleCaseClick}
        >
          tOGGLE cASE
        </button>
        <button
          className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`}
          onClick={handleSentenceCaseClick}
        >
          Sentence case
        </button>
        <button
          className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`}
          onClick={handleExtraSpacesClick}
        >
          Remove Extra Spaces
        </button>
        <button className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`} onClick={handleCopyTextClick}>
          Copy Text
        </button>
        <button className={`btn btn-${props.mode === "light" ? "primary" : "dark"} m-1`} onClick={handleClearClick}>
          Clear Text
        </button>
      </div>
      <div className="container mb-3">
        <h2>Your Text Summary</h2>
        <p>
          {calculateWords()} words and {text.length} characters
        </p>
        <p>{calculateWords() * 0.008} Minutes to read</p>
      </div>
      <div className="container mb-3">
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter your text to preview here!"}</p>
      </div>
    </div>
  );
}

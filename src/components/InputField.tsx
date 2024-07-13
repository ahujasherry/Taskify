import React, { useRef } from "react";
import "./styles.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();


  const handleVoiceAdd = () => {
    console.log('Clicked ');
    console.log("trans=>" +transcript);
    if (transcript) {
      console.log(transcript);
      setTodo(transcript);
      resetTranscript();
    }
  };


  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        handleVoiceAdd();
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>

      <button
        type="button"
        className="input_voice"
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
      >
        Speak
      </button>
      
      
    </form>
  );
};

export default InputField;

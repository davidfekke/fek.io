import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons';

const SpeechButton = ({ textToRead }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [textSegments, setTextSegments] = useState([]);
  // Setting useRef to null since Gatsby uses SSR, and the window object may be null.
  const speechSynthesisRef = useRef(null);
  const regex = /(<([^>]+)>)/gi;
  const cleansedText = textToRead.replace(regex, "");

  const divStyle = {
    display: 'inline'
  };

  const buttonStyle = {
    borderRadius: '20px', // making the button rounded
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: isSpeaking ? '#f44336' : '#4CAF50', // green when speaking, red otherwise
    fontSize: '16px',
    margin: '10px',
    outline: 'none',
  };

  useEffect(() => {
    // This is needed to check for window object since Gatsby uses SSR.
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        speechSynthesisRef.current = window.speechSynthesis;
    }
    const segments = cleansedText.split(/[.!?]+/).filter(segment => segment.trim());
    setTextSegments(segments);
    setCurrentPosition(0);
  }, [textToRead, cleansedText]);

  const speakNextSegment = useCallback(() => {
    if (currentPosition < textSegments.length) {
      const utterance = new SpeechSynthesisUtterance(textSegments[currentPosition]);
      utterance.onend = () => {
        if (currentPosition + 1 < textSegments.length) {
          setCurrentPosition(currentPos => currentPos + 1);
        } else {
          setIsSpeaking(false);
          setCurrentPosition(0);
        }
      };
      speechSynthesisRef.current.speak(utterance);
    }
  }, [currentPosition, textSegments]);

  useEffect(() => {
    if (isSpeaking) {
      speakNextSegment();
    }
  }, [isSpeaking, currentPosition, speakNextSegment]); // Add speakNextSegment to dependency array

  const toggleReadAloud = () => {
    if (isSpeaking) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
    }
  };

  return (
    <div style={divStyle} aria-label='Listen to post'>
      <button onClick={toggleReadAloud} style={buttonStyle}>
        <FontAwesomeIcon icon={faHeadphones} />
        {' '}
        <FontAwesomeIcon icon={isSpeaking ? (currentPosition === 0 ? faStop : faPause) : faPlay} />
        {' '}
        {isSpeaking ? ' Stop Listening' : ' Listen to Post'}
      </button>
    </div>
  );
};

export default SpeechButton;

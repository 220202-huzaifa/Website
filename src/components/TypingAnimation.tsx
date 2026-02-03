import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

function TypingAnimation({ 
  words, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 2000,
  className = "" 
}: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    };

    const speed = isPaused ? pauseDuration : (isDeleting ? deletingSpeed : typingSpeed);
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration, isPaused]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default TypingAnimation;

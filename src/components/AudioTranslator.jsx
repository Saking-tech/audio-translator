import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const AudioTranslator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [showText, setShowText] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();
      setIsRecording(true);

      mediaRecorder.current.ondataavailable = (event) => {
        // Here you would typically send the audio data to a speech-to-text API
        // and then to a translation API. For now, we'll just simulate this process.
        simulateTranslation(event.data);
      };
    } catch (err) {
      console.error("Error accessing the microphone", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const simulateTranslation = (audioBlob) => {
    // Simulating speech-to-text and translation
    const dummyText = "This is a simulated transcription of your speech.";
    setSourceText(dummyText);
    setTranslatedText(`Translated: ${dummyText}`);

    // Simulating text-to-speech
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLanguage;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Button 
        onClick={isRecording ? stopRecording : startRecording}
        className="w-full mb-4"
      >
        <Mic className="mr-2" />
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>

      <div className="space-y-4">
        <Select onValueChange={setSourceLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select source language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">English</SelectItem>
            <SelectItem value="es-ES">Spanish</SelectItem>
            <SelectItem value="fr-FR">French</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setTargetLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select target language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">English</SelectItem>
            <SelectItem value="es-ES">Spanish</SelectItem>
            <SelectItem value="fr-FR">French</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setShowText(value === 'yes')}>
          <SelectTrigger>
            <SelectValue placeholder="Show text?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showText && (
        <div className="mt-4 space-y-4">
          <Textarea
            placeholder="Source text"
            value={sourceText}
            readOnly
          />
          <Textarea
            placeholder="Translated text"
            value={translatedText}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default AudioTranslator;
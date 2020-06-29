import { useState, useEffect, useCallback } from 'react';
import TextToSpeech from '../api/textToSpeech';
import SpeechToText from '../api/speechToText';

type StatusType = 'countdown' | 'speaking' | 'waiting' | 'listening' | 'result';

interface IUseChallenge {
	status: StatusType;
	result: string;
	speechText: () => Promise<void>;
	voiceRecognizing: () => Promise<void>;
	stopRecognizing: () => Promise<void>;
}

export const useChallenge = (text: string): IUseChallenge => {
	const [status, setStatus] = useState<StatusType>('countdown');
	const [result, setResult] = useState<string>('');

	const speechText = async () => {
		TextToSpeech.tts.stop().then(() => TextToSpeech.tts.speak(text));
	};

	const onSpeechResults = useCallback(async (text: string) => {
		await SpeechToText.stopRecognizing();
		setResult(text);
		setStatus('result');
	}, []);

	const voiceRecognizing = async () => {
		await SpeechToText.startRecognizing();
	};

	const stopRecognizing = async () => {
		await SpeechToText.startRecognizing();
	};

	useEffect(() => {
		TextToSpeech.initTextToSpeech({
			startListener: () => setStatus('speaking'),
			finishListener: () => setStatus('waiting'),
		});
		return () => {
			TextToSpeech.finishTextToSpeech();
		};
	}, []);

	useEffect(() => {
		SpeechToText.initSpeechToText({
			startListener: () => setStatus('listening'),
			finishListener: () => setStatus('waiting'),
			resultListener: onSpeechResults,
		});
		return () => {
			SpeechToText.finishPeechToText();
		};
	}, [onSpeechResults]);

	return {
		status,
		result,
		speechText,
		voiceRecognizing,
		stopRecognizing,
	};
};
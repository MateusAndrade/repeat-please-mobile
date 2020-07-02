import { useState, useEffect, useCallback } from 'react';
import TextToSpeech from '../api/textToSpeech';
import SpeechToText from '../api/speechToText';
import { stringsDifference, hightScoreWord } from '../utils/compareStrings';

export type StatusType =
	| 'countdown'
	| 'speaking'
	| 'waiting'
	| 'listening'
	| 'result';

export type ResultType = {
	text: string;
	score: number;
	difference: { str: string; matches: boolean }[];
};

interface IUseChallenge {
	status: StatusType;
	result: ResultType;
	speechText: () => Promise<void>;
	voiceRecognizing: () => Promise<void>;
	stopRecognizing: () => Promise<void>;
}

export const useChallenge = (text: string): IUseChallenge => {
	const [status, setStatus] = useState<StatusType>('countdown');
	const [result, setResult] = useState<ResultType>({
		text: '',
		score: 0,
		difference: [],
	});

	const speechText = async () => {
		TextToSpeech.tts.stop().then(() => TextToSpeech.tts.speak(text));
	};

	const onSpeechResults = useCallback(
		async (speechResult: string) => {
			// Android has more than one speech results.
			const { word, score } = hightScoreWord(speechResult, text);
			setResult({
				text: word,
				score,
				difference: stringsDifference(word, text),
			});
			await SpeechToText.stopRecognizing();
		},
		[text],
	);

	const voiceRecognizing = async () => {
		await SpeechToText.startRecognizing();
	};

	const stopRecognizing = async () => {
		await SpeechToText.stopRecognizing();
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
			finishListener: () => setStatus('result'),
			resultListener: onSpeechResults,
		});
		return () => {
			SpeechToText.finishSpeechToText();
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

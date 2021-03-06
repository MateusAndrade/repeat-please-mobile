import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { AudioWaveSVG, MicWaveSVG } from './SVG';
import { chimpListening, chimpSpeaking } from '../../../assets/images';
import { styles } from './styles';

type chimpType = 'listening' | 'speaking';

interface IAudioWavesProps {
	label?: string;
	type?: chimpType;
}

type colorPositionType = 'first' | 'second' | 'third';

const WAVE_RED = '#FF5733';
const WAVE_BLACK = '#000';
const POSITIONS: colorPositionType[] = ['first', 'second', 'third'];
const WAVE_SPEED = 400;

const audioWaveColors = (posToChange: colorPositionType) => {
	return {
		first: posToChange === 'first' ? WAVE_RED : WAVE_BLACK,
		second: posToChange === 'second' ? WAVE_RED : WAVE_BLACK,
		third: posToChange === 'third' ? WAVE_RED : WAVE_BLACK,
	};
};

export const ChimpAudioWaves = ({
	label = 'Listening...',
	type = 'listening',
}: IAudioWavesProps) => {
	const [wavePos, setWavePos] = useState<colorPositionType>('first');

	useEffect(() => {
		const position = POSITIONS.findIndex(pos => pos === wavePos);
		const waveId = setInterval(() => {
			setWavePos(position >= 2 ? POSITIONS[0] : POSITIONS[position + 1]);
		}, WAVE_SPEED);
		return () => clearInterval(waveId);
	}, [wavePos]);

	return (
		<View style={styles.container}>
			<Text style={styles.textStyle}>{label}</Text>
			{type === 'listening' && (
				<View style={styles.audioWaveContainer}>
					<AudioWaveSVG {...{ ...audioWaveColors(wavePos) }} />
					<Image source={chimpListening} style={styles.chimpListeningStyle} />
				</View>
			)}
			{type === 'speaking' && (
				<View style={styles.micWaveContainer}>
					<MicWaveSVG
						{...{ ...audioWaveColors(wavePos) }}
						style={styles.micWaveStyle}
					/>
					<Image source={chimpSpeaking} style={styles.chimpSpeakingStyle} />
				</View>
			)}
		</View>
	);
};

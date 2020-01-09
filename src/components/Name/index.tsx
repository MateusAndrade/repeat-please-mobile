import React from 'react';
import { PlaceholderInput } from 'repeat-please-styles';

export interface INameProps {
	name: string;
	onNameChange: (name: string) => void;
}

export const Name = ({ name, onNameChange }: INameProps): JSX.Element => (
	<PlaceholderInput
		data-test="name"
		placeholder="Name or NickName"
		value={name}
		onChangeText={text => onNameChange(text)}
	/>
);
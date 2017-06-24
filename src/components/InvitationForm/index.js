import React from 'react';
import { compose } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import AirportPicker from 'components/AirportPicker';

const withInvitationForm = compose(
	reduxForm(
		{
			form: 'invitation',
		}
	)
);
const renderInvitationForm = (
	{
		handleSubmit,
		onSubmitInvitation: handleSubmitInvitation,
	}
) => {
	return (
		<form>
			<Field
				name="flyFromMulti"
			    component={AirportPicker}
			/>
			<button onClick={handleSubmit(handleSubmitInvitation)}>
				find flights
			</button>
		</form>
	)
};

const InvitationForm = withInvitationForm(renderInvitationForm);

export default InvitationForm;

import {act, fireEvent, render, screen} from '@testing-library/react';
import {Form, Formik} from 'formik';
import Input from './Input';
import * as Yup from 'yup';
import {FieldErrorMessages} from '../../models';

describe('Input test suite', () => {
    const TEST_NAME = 'testName';
    const TEST_LABEL = 'testLabel';
    const TEST_VALUE = 'value';
    const NEW_TEST_VALUE = 'new_value';

    const submitMock = jest.fn();

    const initValues = {
        [TEST_NAME]: TEST_VALUE,
    };

    const initValuesNew = {
        [TEST_NAME]: NEW_TEST_VALUE,
    };

    const validSchema = Yup.object().shape({
        testName: Yup.string().required(FieldErrorMessages.MANDATORY_FIELD),
    });

    const renderComponent = (initVal = initValues) =>
        render(
            <Formik initialValues={initVal} onSubmit={submitMock}>
                {({handleSubmit}) => (
                    <Form id="testForm" onSubmit={handleSubmit}>
                        <Input label={TEST_LABEL} name={TEST_NAME} />
                    </Form>
                )}
            </Formik>
        );

    it('should render component properly', () => {
        renderComponent();

        expect(screen.getByText(`${TEST_LABEL}`)).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveValue(TEST_VALUE);
    });

    it('should change value successfully', async () => {
        renderComponent(initValuesNew);

        const inputElement = screen.getByRole('textbox');

        await act(async () => {
            fireEvent.change(inputElement, {target: {value: NEW_TEST_VALUE}});
        });

        expect(inputElement).toHaveValue(NEW_TEST_VALUE);
    });

    it('should render component with error', async () => {
        render(
            <Formik initialValues={initValues} validationSchema={validSchema} onSubmit={submitMock}>
                {({handleSubmit}) => (
                    <Form id="testForm" onSubmit={handleSubmit}>
                        <Input label={TEST_LABEL} name={TEST_NAME} />
                    </Form>
                )}
            </Formik>
        );

        const inputElement = screen.getByRole('textbox');

        await act(async () => {
            fireEvent.change(inputElement, {target: {value: ''}});
            fireEvent.blur(inputElement);
        });

        expect(screen.getByText(FieldErrorMessages.MANDATORY_FIELD)).toBeInTheDocument();
    });
});

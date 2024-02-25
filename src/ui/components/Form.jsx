import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import selectors from "../../engine/todo/selectors.js";
import { setData } from "../../engine/todo/thunks.js";

const validateText = yup.object({
    text_input: yup
        .string('')
        .min(5, 'Minimum 5 letters required')
        .required('Text is required'),
});

export function TodoForm () {
    const dispatch = useDispatch()
    const items = useSelector(selectors.items)
    const onSubmit = (values)=> {
        dispatch(setData(values, items));
    }
    const formik = useFormik({
        initialValues: {
            text_input: '',
        },
        validationSchema: validateText,
        onSubmit: onSubmit,
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', backgroundColor: 'white'}}>
                <TextField
                    sx={{ flex: 1, margin: '10px'}}
                    name="text_input"
                    type="text"
                    label="Input text"
                    placeholder="Input text"
                    value={formik.values.text_input}
                    onChange={formik.handleChange}
                    error={formik.touched.text_input && Boolean(formik.errors.text_input)}
                    helperText={formik.touched.text_input && formik.errors.text_input}

                />
                <Button variant="contained" type="submit" disabled={!formik.isValid}>
                    Send
                </Button>
            </div>
        </form>
    );
}


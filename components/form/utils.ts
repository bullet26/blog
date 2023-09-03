import * as Yup from 'yup';

export const initialValuesSignup = {
    username: '',
    email: '',
    password: '',
    role: '',
};

export const initialValuesLogin = {
    email: '',
    password: '',
};

export const initialValuesCreatePost = {
    content: '',
    title: '',
    author_id: '',
};

export const initialValuesCreateComment = {
    content: '',
    title: '',
    author_id: '',
    post_id: '',
};

export const validationSchemaSignup = Yup.object({
    username: Yup.string().min(2, 'Minimum 2 letters to fill').required('Required field!'),
    email: Yup.string().email().required('Required field!'),
    password: Yup.string().min(6, 'Minimum 6 symbols to fill').required('Required field!'),
    role: Yup.string().required('Required field!'),
});

export const validationSchemaLogin = Yup.object({
    email: Yup.string().email().required('Required field!'),
    password: Yup.string().min(6, 'Minimum 6 symbols to fill').required('Required field!'),
});

export const validationSchemaPost = Yup.object({
    title: Yup.string().min(3, 'Minimum 3 symbols to fill').max(50, 'Maximum 50 symbols to fill').required('Required field!'),
    content: Yup.string().min(10, 'Minimum 10 symbols to fill').max(500, 'Maximum 500 symbols to fill').required('Required field!'),
});

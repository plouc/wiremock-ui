import * as Yup from 'yup'

export const mappingValidationSchema = Yup.object().shape({
    method: Yup.string()
        .required('Request method is required'),
    queryParameters: Yup.array().of(Yup.object().shape({
        key: Yup.string()
            .required('Query parameter name is required'),
        value: Yup.string()
            .required('Query parameter value is required'),
    })),
    requestHeaders: Yup.array().of(Yup.object().shape({
        key: Yup.string()
            .required('Header name is required'),
        value: Yup.string()
            .required('Header value is required'),
    })),
    requestCookies: Yup.array().of(Yup.object().shape({
        key: Yup.string()
            .required('Cookie name is required'),
        value: Yup.string()
            .required('Cookie value is required'),
    })),
    responseStatus: Yup.number()
        .min(100, 'Response status code is invalid')
        .max(527, 'Response status code is invalid')
        .required('Response status code is required'),
    responseHeaders: Yup.array().of(Yup.object().shape({
        key: Yup.string()
            .required('Header name is required'),
        value: Yup.string()
            .required('Header value is required'),
    }))
})
import * as Yup from 'yup'
// import {parseXml} from 'libxmljs2';
// tslint:disable-next-line: no-console
// console.log(parseXml)
Yup.addMethod(Yup.string, "validateXML", function (args) {
    const { message } = args;
    return this.test('test-name', message, function(value) {
        const { path, createError } = this;
        if (!value) {
          return createError({ path, message: 'Response body is required' });
        }
        else {
            try{
                const domParser = new DOMParser();
                const dom = domParser.parseFromString(value, 'text/xml');
                return value
            } catch(error){
                return createError({ path, message: 'Error processing response body' });
            }
        }
    });
});

Yup.addMethod(Yup.string, "validateJSON", function (args) {
    const { message } = args;
    return this.test('test-name', message, function(value) {
        const { path, createError } = this;
        if (!value) {
          return createError({ path, message: 'Response body is required' });
        } else {
            try{
                JSON.parse(value)
                return value
            } catch(error){
                return createError({ path, message: 'Error processing response body' });
            }
        }
    });
});

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
    })),
    bodyType: Yup.string()
        .default('JSON')
        .oneOf(['JSON','XML']),
    responseBody: Yup.string()
        .when('bodyType', {
            is: 'JSON',
            then: Yup.string().test('test-name', 'JSON is valid', function(value) {
                const { path, createError } = this;
                if (!value) {
                  return createError({ path, message: 'Response body is required' });
                }
                else {
                    try{
                        JSON.parse(value)
                        return value
                    } catch(error){
                        return createError({ path, message: 'Invalid JSON' });
                    }
                }
            })
        })
        .when('bodyType', {
            is: 'XML',
            then: Yup.string().test('test-name', 'XML is valid', function(value) {
                const { path, createError } = this;
                if (!value) {
                  return createError({ path, message: 'Response body is required' });
                }
                else {
                    try{
                        return value
                    } catch(error){
                        // tslint:disable-next-line: no-console
                        console.log("error")
                        return createError({ path, message: 'Invalid XML' });
                    }
                }
            })
        })
}, [['bodyType', 'responseBody']])
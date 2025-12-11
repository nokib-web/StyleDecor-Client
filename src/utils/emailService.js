import emailjs from '@emailjs/browser';

// REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
const SERVICE_ID = 'service_wiecqoh';
const TEMPLATE_ID = 'template_86yse19';
const PUBLIC_KEY = 'GS5FlBE6Yq_LGd1va';

export const sendEmail = async (templateParams) => {
    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log('SUCCESS!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('FAILED...', error);
        throw error;
    }
};

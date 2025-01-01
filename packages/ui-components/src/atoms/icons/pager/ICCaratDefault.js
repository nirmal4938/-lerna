import React from 'react';

export const ICCaratDefault = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 10 6">
        <path fill="#454543" fillRule="nonzero" d="M.969 0H9.03c.271 0 .459.13.563.39.104.261.062.485-.125.673l-4.032 4.03A.6.6 0 0 1 5 5.282a.6.6 0 0 1-.438-.187L.532 1.063C.343.875.301.65.405.39.51.13.698 0 .97 0z" opacity=".505" />
    </svg>
);

ICCaratDefault.defaultProps = {
    width: '10',
    height: '6',
};

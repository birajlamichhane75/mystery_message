import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  otp:string;
}

export const EmailTemplate = ({
  username,otp
}:EmailTemplateProps) => (
  <div>
    <h1>Hello, {username}!</h1>
    <h5>This is Biraj Lamichhane</h5>
    <h4>Your OTP is {otp}</h4>
  </div>
);

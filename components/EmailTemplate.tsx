import * as React from "react";

interface EmailTemplateProps {
    emailData: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ emailData }) => (
    <div>
        <h1>Welcome, {emailData?.firstName}!</h1>
    </div>
);

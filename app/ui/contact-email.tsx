interface EmailTemplateProps {
    data: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    data
}) => (
    <div>
        <p>{data}</p>
    </div>
)

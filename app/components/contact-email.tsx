export default function ContactEmail(data: any) {
    return `
    <div>
        <div style='margin: 10px; background-color: #ffffff; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);'>
            <h1 style='margin: 0px; padding: 10px; text-align: center; font-size: 2.5em; color: #ffffff; font-weight: bold; background-color: #e42626;'>AZ-Fitness</h1>

            <div style='padding: 5px; text-align: center;'>
                <h2 style='font-size: 1.5em; font-weight: bold;'>Message Received From:</h2>
                <h2 style='font-size: 1em;'>${data.name}</h2>
                <h2 style='font-size: 0.875em; font-style: italic;'>${data.email}</h2>
            </div>

            <div style='padding: 5px; text-align: center;'>
                <h2 style='font-size: 1.5em; font-weight: bold;'>Subject:</h2>
                <h2 style='font-size: 1em;'>${data.subject ? data.subject : '-'}</h2>
            </div>

            <div style='padding: 5px; text-align: center;'>
                <h2 style='font-size: 1.5em; font-weight: bold;'>Message:</h2>
                <p style='font-size: 1em;'>${data.message}</p>
            </div>
        </div>
    </div>
    `;
}

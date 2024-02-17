export default function TestimonialEmail(data: any) {
    return `
    <div>
        <div style='margin: 10px; background-color: #ffffff; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);'>
            <h1 style='margin: 0px; padding: 10px; text-align: center; font-size: 2.5em; color: #ffffff; font-weight: bold; background-color: #e42626;'>AZ-Fitness</h1>

            <div style='padding: 5px; text-align: center;'>
                <h2 style='font-size: 1.5em; font-weight: bold;'>Review Received From:</h2>
                <h2 style='font-size: 1em;'>${data.firstName}${data.lastName && ` ${data.lastName}`}</h2>
                <h2 style='font-size: 0.875em; font-style: italic;'>Email: ${data.email}</h2>
                <h2 style='font-size: 0.875em; font-style: italic;'>Phone: ${data.phone ? data.phone : '-' }</h2>
            </div>

            <div style='padding: 5px; text-align: center;'>
                <h2 style='font-size: 1.5em; font-weight: bold;'>Recommended:</h2>
                <h2 style='font-size: 1em;'>${data.recommend}</h2>
            </div>

            <div style='padding: 5px; text-align: center;'>
                <h2 style='font-size: 1.5em; font-weight: bold;'>Message:</h2>
                <p style='font-size: 1em;'>${data.review}</p>
                <h3 style='font-size: 1em; font-weight: bold;'>Extra:</h3>
                <p style='font-size: 1em;'>${data.extra ? data.extra : '-'}</p>
            </div>
        </div>
    </div>
    `;
}


// api request for uploading file
export const uploadFile = async (formData) => {

    try {
        
        // request parameters to pass along with request
        // attaching formData as request body
        const requestOptions = {
            method: "POST",
            body: formData
        };

        // Sending request to api
        const response = await fetch("http://localhost:8000/api/v1/upload-bill", requestOptions);

        // return response received from api
        return await response.json();

    } catch (error) {
        // return failed response if error occurs while making api request.
        // With error msg.
        return {
            fileUploaded: false,
            msg: `${error.name}\n${error.message}`
        };
    }

};
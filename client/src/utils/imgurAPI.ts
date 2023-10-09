export default async function imgurUpload(file: File) {
    const clientId = "b1a8ab68d548bcb";
    const auth = "Client-ID " + clientId;

    const data = new FormData();
    data.append("image", file);

    try {
        const response = await fetch("https://api.imgur.com/3/image/", {
            method: "POST",
            body: data,
            headers: {
                Authorization: auth,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.data.link;
        } else {
            return "";
        }
    } catch (error) {
        return "";
    }
}

// import imgurUpload from "../utils/imgurAPI";
// const response = imgurUpload(file);

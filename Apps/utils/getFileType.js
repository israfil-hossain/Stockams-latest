export const getImageFileData = async (uri) =>{
  try {
    // Fetch the image data
    const response = await fetch(uri);

    // Check for successful response
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    // Create the Blob
    const blob = await response.blob();

    // Get file type information
    const type = blob.type; // Access the MIME type directly

    // Optional: Access more file details (if needed)
    const size = blob.size; // File size in bytes
    const name = uri.split("/").pop();

    return {type,size,name}
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

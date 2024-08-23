import {useState} from "react";
import {grabstuff, startup} from "./database.ts"; // Ensure Parse is initialized

const FileUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles(Array.from(files));
        }
    };

    const handleUpload = async () => {
        console.log(selectedFiles);
        try {

            for (const file of selectedFiles) {

                const fileContent = await file.arrayBuffer();
                const uint8Array = new Uint8Array(fileContent);
                startup(uint8Array)

            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const retrieve = async () =>{
        await grabstuff()
    }

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Files</button>
            <button onClick={retrieve}>get stuff</button>
        </div>
    );
};

export default FileUpload;

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: Props) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    return (
        <div className="content">
            <ReactQuill
                value={value}
                theme={"snow"}
                onChange={onChange}
                modules={modules}
            />
        </div>
    );
}

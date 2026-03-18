import { Button } from "./Button";
import { useMyContext } from "../contexts/MyContext";
import Link from "next/link";

const ButtonDialogHF = ({ color, mt }) => {
    const { popup, setPopUp } = useMyContext();

    return (
        <Link href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani" target="_blank" rel="noopener noreferrer">
            <Button color={color} className={`mt-${mt} flex items-center space-x-2`}>
                {/* Image for Hugging Face */}
                <img 
                    src="https://img.icons8.com/fluency/48/hugging-face_app.png" 
                    alt="Hugging Face Icon" 
                    className="h-5 w-5" 
                />
                <span>Download Data</span>
            </Button>
        </Link>
    );
};

export default ButtonDialogHF;

import { useRef, useEffect } from "react";

export default function EditDescriptionInput ({description}) {

    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current)  {
          inputRef.current.focus();
        }
    }, []);

    return (
        <form>
            <input
              ref={inputRef}
              placeholder={description}
            />
        </form>
    )
}
import React, { useState } from "react";
import { Group, InputMessage } from "../../../types";
import "./styles/CreateNewGroup.scss";

interface Props {
  group: Group;
  save: (groupName: string) => void;
  groupNames: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  center?: boolean;
}

const CreateNewGroup: React.FC<Props> = ({
  group,
  save,
  groupNames,
  setOpen,
  center,
}) => {
  const [input, setInput] = useState<string>("");
  const [inputMessage, setInputMessage] = useState<InputMessage>({
    active: false,
    error: false,
    message: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setInputMessage({ active: false, error: false, message: "" });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input)
      setInputMessage({
        active: true,
        error: true,
        message: `Give the new ${
          group == "linkCollections" ? "collection" : "session"
        } a name`,
      });
    else if (groupNames.includes(input))
      setInputMessage({
        active: true,
        error: true,
        message: `${
          group == "linkCollections" ? "Collection" : "Session"
        } "${input}" already exists. Give a different name.`,
      });
    else {
      save(input);
      setInput("");
      setOpen(false);
    }
  };

  return (
    <div className={`create-new-collection ${center && "center"}`}>
      <form onSubmit={handleSubmit}>
        <span className="create-new-collection__header">
          Create new collection
        </span>
        <div className="create-new-collection__input-and-button">
          <input type="text" value={input} onChange={handleOnChange} />
          <button className="save" type="submit">
            Save
          </button>
        </div>
        {inputMessage.active && (
          <span
            className={`create-new-collection__input-message ${
              inputMessage.error && "error"
            }`}
          >
            {inputMessage.message}
          </span>
        )}
      </form>
    </div>
  );
};

export default CreateNewGroup;

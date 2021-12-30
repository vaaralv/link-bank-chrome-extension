import React, { useState } from "react";
import { Group, InputMessage } from "../../types";
import "./styles/CreateNewGroup.scss";

interface Props {
  group: Group;
  save: (groupName: string) => void;
  groupNames: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewGroup: React.FC<Props> = ({
  group,
  save,
  groupNames,
  setOpen,
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
    <div className="create-new-collection">
      <form onSubmit={handleSubmit}>
        <label>
          Create new collection:
          <input type="text" value={input} onChange={handleOnChange} />
          <button type="submit">Save</button>
        </label>
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

import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import InputSearch from "./InputSearch";
import CloseButton from "./Close";

export default function DismissableModal({ show, onClose, defaultSkills, updateSkillsFunction, chosenSkills}) {
  const [parentState, setParentState] = useState(chosenSkills);

  const data = defaultSkills.map((item, index) => {
    return item.skill_name;
  });

  const updateData = (newSkill) => {
    console.log(newSkill)
    if (!parentState.includes(newSkill)) {
      setParentState([...parentState, newSkill]);
    }

  };

  const removeSkill = (skillToRemove) => {
    const updatedState = parentState.filter((item) => item !== skillToRemove);
    setParentState(updatedState);
    
  };

  const handleSubmit = () => {
    updateSkillsFunction(parentState)
  };

  return (
    <Modal dismissible show={show} onClose={onClose} size="lg">
      <Modal.Header>Filter</Modal.Header>
      <Modal.Body>
        <div className="h-40">
          <InputSearch data={data} updateParentState={updateData} />
        </div>
      </Modal.Body>
      <Modal.Body>
        <div className="max-h-32 flex flex-wrap flex-row">
          {parentState?.map((item, index) => (
            <div key={item} className="bg-gray-100 text-sm font-medium focus:outline-none rounded-lg p-2 m-1 flex flex-row">
              <div>{item}</div>
              <button className="my-auto mx-1" onClick={() => removeSkill(item)}>
                <CloseButton />
              </button>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={()=>{setParentState([])}}>
          Clear
        </Button>
        <Button
          color="gray"
          onClick={() => {
            onClose();
            handleSubmit();
          }}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


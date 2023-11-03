import React, { useState } from "react";
import { Button, Modal, Label, Radio } from "flowbite-react";
import InputSearch from "./InputSearch";
import CloseButton from "./Close";

export default function DismissableModal({
  show,
  onClose,
  defaultSkills,
  updateSkillsFunction,
  chosenSkills,
  ascending,
}) {
  const [parentState, setParentState] = useState(chosenSkills);
  let childAscending = ascending;
  const data = defaultSkills.map((item, index) => {
    return item.skill_name;
  });

  const updateData = (newSkill) => {
    if (!parentState.includes(newSkill)) {
      setParentState([...parentState, newSkill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedState = parentState.filter((item) => item !== skillToRemove);
    setParentState(updatedState);
  };

  const handleSubmit = () => {
    let tempData = { skillsData: parentState, ascending: childAscending };
    updateSkillsFunction(tempData);
  };

  const onChange = (e) => {
    childAscending = e.target.value === "false";
  };

  return (
    <Modal dismissible show={show} onClose={onClose} size="lg">
      <Modal.Header>
        <p className="pl-1 font-semibold">Filter and Sort Listings</p>
      </Modal.Header>
      <Modal.Body className="border-b">
        <p className="text-lg font-semibold">Sort by No. of Skills Matched</p>
        <fieldset onChange={onChange} className="pt-4 flex flex-row" id="radio">
          <div className="flex w-1/2 items-center gap-2">
            <Radio
              defaultChecked={ascending === false}
              id="descending"
              name="sortDirection"
              value="true"
            />
            <Label className="text-md" htmlFor="descending">
              Highest to Lowest
            </Label>
          </div>
          <div className="flex w-1/2 items-center gap-2">
            <Radio
              defaultChecked={ascending === true}
              id="ascending"
              name="sortDirection"
              value="false"
            />
            <Label className="text-md" htmlFor="ascending">
              Lowest to Highest
            </Label>
          </div>
        </fieldset>
      </Modal.Body>
      <Modal.Body>
        <p className="text-lg pb-2 font-semibold">Filter By</p>
        <div className="h-40 pb-2">
          <InputSearch data={data} updateParentState={updateData} />
        </div>
      </Modal.Body>
      <Modal.Body>
        <div className="max-h-32 flex flex-wrap flex-row">
          {parentState?.map((item, index) => (
            <div
              key={item}
              className="bg-gray-100 text-sm font-medium focus:outline-none rounded-lg p-2 m-1 flex flex-row"
            >
              <div>{item}</div>
              <button
                className="my-auto mx-1"
                onClick={() => removeSkill(item)}
              >
                <CloseButton />
              </button>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="gray"
          onClick={() => {
            setParentState([]);
            childAscending = false;
          }}
        >
          Reset Filters
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

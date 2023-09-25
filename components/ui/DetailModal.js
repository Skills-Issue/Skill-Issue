"use client";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function DefaultModal({ details }) {
  const [openModal, setOpenModal] = useState(undefined);
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button onClick={() => props.setOpenModal("default")}>Details</Button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Job Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {details}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>Exit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

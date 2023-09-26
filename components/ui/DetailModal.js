'use client';
import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

export default function DetailsModal({details}) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button color='gray' onClick={() => props.setOpenModal('dismissible')}>Details</Button>
      <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Job Description</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {details}
            </p>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color='gray' onClick={() => props.setOpenModal(undefined)}>Exit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



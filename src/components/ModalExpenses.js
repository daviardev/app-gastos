import Modal from './Modal'

export default function ModalExpenses ({ show, onClose }) {
  return (
    <>
      <Modal
        show={show}
        onClose={onClose}
      >
        <h3>Modal</h3>
      </Modal>
    </>
  )
}

import React from 'react';
import modalStyles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './parts';
import { useSelector } from 'react-redux';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ title, onClose, children, name, titleType = 'default'}) => {
  const isOpen = useSelector(store => store.modal[`is${name}ModalOpen`])

  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        onClose(e);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={modalStyles.container}>
      <div className={modalStyles.modal}>
        <h2 className={titleType === 'id' ? modalStyles.heading_type_id : modalStyles.heading}>{title}</h2>
        <span className={modalStyles.close} onClick={onClose}>
          <CloseIcon />
        </span>
        {children}
      </div>
      <ModalOverlay isOpen={isOpen} onClick={onClose} />
    </div>
    , modalRoot
  )
}
export default Modal;

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  titleType: PropTypes.string
}



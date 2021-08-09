import React, { FC } from 'react';
import modalStyles from './modal.module.css';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './parts';
import { useAppSelector } from 'services/hooks';

const modalRoot = document.getElementById('modal-root');

interface IModal {
  title?: string;
  onClose: () => void;
  name: 'Order' | 'Details';
  titleType?: 'id' | 'default';
}

const Modal: FC<IModal> = ({ title, onClose, children, name, titleType = 'default'}) => {
  const isOpen = useAppSelector(store => store.modal[`is${name}ModalOpen`])

  React.useEffect(() => {
    const handleEsc = (event: {keyCode: number}) => {
      if (event.keyCode === 27) {
        onClose();
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
          <CloseIcon type='primary' />
        </span>
        {children}
      </div>
      <ModalOverlay isOpen={isOpen} onClick={onClose} />
    </div>
    , (modalRoot as HTMLElement)
  )
}
export default Modal;




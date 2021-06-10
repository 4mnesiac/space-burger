import React from 'react';
import modalStyles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './parts';

const modalRoot = document.getElementById('modal-root');

export default function Modal ({title, isOpen, onClose, children}) {
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
                        <h2 className={modalStyles.heading}>{title}</h2>
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

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.object.isRequired
}



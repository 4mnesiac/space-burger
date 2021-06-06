import React from 'react';
import modalStyles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './parts';

const modalRoot = document.getElementById('modal-root');

export default function Modal ({title, isOpen, onClose, children}) {
        return ReactDOM.createPortal(
            <ModalOverlay isOpen={isOpen}>  
                <div className={modalStyles.modal}>
                        <h2 className={modalStyles.heading}>{title}</h2>
                        <span className={modalStyles.close} onClick={onClose}>
                            <CloseIcon />
                        </span>

                    {children}
                </div>
            </ModalOverlay>
        , modalRoot
    )
    }

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    }



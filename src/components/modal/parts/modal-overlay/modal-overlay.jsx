import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
const ModalOverlay = ({isOpen, children, onClick}) => {

    React.useEffect(() => {
        const handleEsc = (e) => {
          if (e.keyCode === 27) {
            onClick(e);
          }
        };
        window.addEventListener("keydown", handleEsc);
    
        return () => {
          window.removeEventListener("keydown", handleEsc);
        };
      }, [onClick]);

    return ( 
        <section className={isOpen ? `${overlayStyles.overlay} ${overlayStyles.overlay_opened}` : overlayStyles.overlay} >
            {children}
        </section>
     );
}
 
export default ModalOverlay;

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired
}
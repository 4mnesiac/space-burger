import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
const ModalOverlay = ({isOpen, children}) => {
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
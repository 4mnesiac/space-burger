import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
const ModalOverlay = ({isOpen, children}) => {
    return ( 
        <article className={isOpen ? `${overlayStyles.overlay} ${overlayStyles.overlay_opened}` : overlayStyles.overlay} >
            {children}
        </article>
     );
}
 
export default ModalOverlay;

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired
}
import React, {FC} from 'react';
import overlayStyles from './modal-overlay.module.css';

interface IModalOverlay {
  isOpen: boolean;
  onClick: () => void
}
const ModalOverlay: FC<IModalOverlay> = ({ isOpen, onClick }) => {
  const overlay = React.useRef(null);

  React.useEffect(() => {
    const handleOverlayClick = (e: Event) => {
      if (e.target === overlay.current) {
        onClick();
      }
    };
    window.addEventListener("click", handleOverlayClick);

    return () => {
      window.removeEventListener("click", handleOverlayClick);
    };
  }, [onClick]);

  return (
    <div className={isOpen ? `${overlayStyles.overlay} ${overlayStyles.overlay_opened}` : overlayStyles.overlay} ref={overlay}></div>
  );
}

export default ModalOverlay;

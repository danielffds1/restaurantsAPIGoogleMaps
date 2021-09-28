import React, { useEffect } from 'react';

import Portal from './Portal';

import { Overlay, Dialog } from './styles';

// onClose irá manipular o estado de aberto e fechado
const Modal = ({children, open, onClose}) => {
  // Declarando um hook useEffect, para que o usuário clicando na tecla Esc feche o modal também.
  useEffect(() => {
    function onEsc(event) {
      if (event.keyCode === 27) onClose();
    }
    window.addEventListener('keydown', onEsc);
    return () => {
      window.addEventListener('keydown', onEsc);
    };
  }, [onClose]);

  if(!open) return null;

  // Quando o usuário estiver com o Modal aberto e clicar fora então quero que feche o Modal
  function onOverlayClick() {
    onClose();
  }

  // Evitando a propagação do evento
  function onDialogClick(event) {
    event.stopPropagation();
  }

  return(
    <Portal>
       <Overlay onClick={onOverlayClick}>
        <Dialog onClick={onDialogClick}>{children}</Dialog>
      </Overlay>
    </Portal>
  )
}

export default Modal;
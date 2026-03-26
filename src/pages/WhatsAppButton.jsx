function WhatsAppButton() {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=5493795337995&text=Hola!%20Quer%C3%ADa%20consultarles%20sobre"
      className="whatsapp-flotante"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

export default WhatsAppButton;
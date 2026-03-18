function WhatsAppButton() {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=5493794019159&text=Hola!%20Quer%C3%ADa%20consultarles%20sobre"
      className="whatsapp-flotante" /* Corregido: era class */
    >
      <i className="fab fa-whatsapp"></i> {/* Corregido: era classname en minúscula */}
    </a>
  );
}

export default WhatsAppButton;
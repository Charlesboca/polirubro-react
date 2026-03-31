function WhatsAppButton() {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=5493794069660&text=!Hola%20Polirubro%20Llevate!%20todo%20Quisiera%20consultarles%20sobre..."
      className="whatsapp-flotante"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

export default WhatsAppButton;
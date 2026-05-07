import IButton from "../Interfaces/IButton";

export default function Button(button: IButton) {
  return (
    <button
      id={button.id}
      type={button.type}
      className={`w3-button w3-border w3-margin-top w3-red ${button.class && button.class.length > 0 ? button.class : ""}`}
      title={button.title}
      onClick={button.onClick}
      style={button.style}
    >
      {button.value}
    </button>
  );
}

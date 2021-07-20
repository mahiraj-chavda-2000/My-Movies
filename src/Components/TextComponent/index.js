const Input = (props) => {
  return (
    <input
      type={props.type}
      autoComplete={props.autoComplete}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
    />
  );
};

export default Input;

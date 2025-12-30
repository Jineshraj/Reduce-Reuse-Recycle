const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: ""
});

const handleChange = (e) => {
  // Destructure name and value from the input field that triggered the event
  const { name, value } = e.target;

  // Update state using the previous state to ensure no data is lost
  setFormData((prevState) => ({
    ...prevState,     // Copy all existing form fields
    [name]: value,    // Dynamically update only the field that changed
  }));
};

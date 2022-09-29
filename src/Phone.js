import {useState } from "react";


const Phone = () => {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    console.log(name);
    document.getElementById("name").value = "";
  }
  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="name">Enter name</label> <br /><br/>
        <input
          pattern="[A-Za-z]{3,10}"
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="name"
        /><br/>
        <br/>
        <br />
        <input type="submit" />
      </form>
    </>
  );
};
export default Phone;

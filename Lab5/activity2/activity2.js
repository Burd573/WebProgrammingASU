var uName = "name";

const getName = () => {
  uName = document.getElementById("nameInput").value;
  if (uName == "") {
    alert("No value entered for name");
    return;
  } else {
    alert(uName);
  }
};

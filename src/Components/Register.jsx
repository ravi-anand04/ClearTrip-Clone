import React, { useState } from "react";
import { Button, Modal, Checkbox, Label, TextInput } from "flowbite-react";
import { Navigate } from "react-router-dom";
import { headers } from "../constants";

const Register = ({
  openRegisterModal,
  toggleLoginModel,
  toggleRegisterModel,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", name: "", password: "" });

  function onCloseModal() {
    toggleRegisterModel();
    setEmail("");
    setError({ email: "", name: "", password: "" });
  }

  const formValidation = () => {
    let result = true;

    setError((prev) => {
      return { ...prev, email: "", password: "", name: "" };
    });

    if (!email.includes("@") || !email.includes(".com")) {
      setError((prev) => {
        return { ...prev, email: "Invalid email" };
      });

      result = false;
    }

    if (password.length < 5 || password.length > 15) {
      setError((prev) => {
        return { ...prev, password: "Invalid password" };
      });
      result = false;
    }

    if (!name) {
      setError((prev) => {
        return { ...prev, name: "Name cannot be empty" };
      });
      result = false;
    }

    return result;
  };

  const submitForm = async () => {
    const result = formValidation();

    if (result === false) {
      console.log("Returning from register result");
      return;
    }

    const payload = JSON.stringify({
      name,
      email,
      password,
      appType: "bookingportals",
    });

    const res = await fetch(
      "https://academics.newtonschool.co/api/v1/bookingportals/signup",
      {
        method: "POST",
        headers,
        body: payload,
      }
    );
    const resJSON = await res.json();

    if (resJSON.status === "success") {
      localStorage.setItem("cleartrip_token", resJSON.token);
      localStorage.setItem(
        "cleartrip_name",
        resJSON.data.user.name.toUpperCase()
      );
      console.log(resJSON);

      window.location.reload();
    }
  };

  return (
    <>
      <Modal
        dismissible
        show={openRegisterModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header>
          <img
            className="h-48"
            src="https://static.businessworld.in/article/article_extra_large_image/1678954998_Xi4M1h_clear1.jpg"
          />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <div className="flex flex-col">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                SIGN UP
              </h3>
              <span className="font-light">
                Get Exciting Offers & Track Order
              </span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                value={email}
                shadow
                onChange={(event) => setEmail(event.target.value)}
                required
                color={error.email ? "failure" : ""}
                helperText={
                  error.email ? (
                    <>
                      <span className="font-medium">Enter valid email</span>
                    </>
                  ) : (
                    ""
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                color={error.name ? "failure" : ""}
                helperText={
                  error.name ? (
                    <>
                      <span className="font-medium">Name cannot be empty</span>
                    </>
                  ) : (
                    ""
                  )
                }
                shadow
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                shadow
                required
                onChange={(event) => setPassword(event.target.value)}
                color={error.password ? "failure" : ""}
                helperText={
                  error.password ? (
                    <>
                      <span className="font-medium">
                        Password should be between 5 and 15 characters
                      </span>
                    </>
                  ) : (
                    ""
                  )
                }
              />
            </div>
            <div className="flex justify-between"></div>
            <div>
              <Button className="w-full" onClick={submitForm}>
                REGISTER
              </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                onClick={() => {
                  toggleRegisterModel();
                  toggleLoginModel();
                }}
              >
                Log In
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;

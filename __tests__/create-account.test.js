import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreateAccount from "../app/(auth)/create-account";

test("renders all the input fields", () => {
  jest.mock("expo-router", () => {
    return { useRouter: () => {} };
  });

  const { getByPlaceholderText } = render(<CreateAccount />);
  expect(getByPlaceholderText("email")).not.toBeNull();
  expect(getByPlaceholderText("firstName")).not.toBeNull();
  expect(getByPlaceholderText("lastName")).not.toBeNull();
  expect(getByPlaceholderText("password")).not.toBeNull();
});

// test("updates input fields correctly", () => {
//   const { getByPlaceholderText } = render(<CreateAccount />);
//   const emailInput = getByPlaceholderText("email");
//   const firstNameInput = getByPlaceholderText("firstName");
//   const lastNameInput = getByPlaceholderText("lastName");
//   const passwordInput = getByPlaceholderText("password");
//   const email = "test@example.com";
//   const firstName = "John";
//   const lastName = "Doe";
//   const password = "password";

//   fireEvent.changeText(emailInput, email);
//   fireEvent.changeText(firstNameInput, firstName);
//   fireEvent.changeText(lastNameInput, lastName);
//   fireEvent.changeText(passwordInput, password);

//   expect(emailInput.props.value).toBe(email);
//   expect(firstNameInput.props.value).toBe(firstName);
//   expect(lastNameInput.props.value).toBe(lastName);
//   expect(passwordInput.props.value).toBe(password);
// });

// test("calls the AuthStore correctly on cancel press", () => {
//   const updateFn = jest.fn();
//   const AuthStore = { update: updateFn };
//   const router = { back: jest.fn() };
//   const { getByText } = render(
//     <CreateAccount AuthStore={AuthStore} router={router} />
//   );
//   const cancelButton = getByText("CANCEL");
//   fireEvent.press(cancelButton);
//   expect(updateFn).toHaveBeenCalledWith(expect.any(Function));
//   expect(router.back).toHaveBeenCalled();
// });

import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

type SignupInput = {
  email: string;
  name: string;
  password: string;
  confPassword: string;
};

const SignUp = () => {
  const history = useHistory();
  const [signUp, {}] = useMutation(SIGNUP_MUTATION);

  const initialValues: SignupInput = {
    email: "",
    name: "",
    password: "",
    confPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password is required"),
    confPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name is required"),
  });

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          const response = await signUp({
            variables: values,
          });
          console.log("response: ", response);
        }}
      >
        <Form>
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component={"div"} />

          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />

          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} />

          <Field
            name="confPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confPassword" component={"div"} />
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/operations';
import { Btn, Label, MyStyledInput, SignUpForm } from './SingUp.styled';
import { Notify } from 'notiflix';

const SignUp = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (value, { resetForm }) => {
      dispatch(register(value))
        .unwrap()
        .then(() => Notify.success(`Congratulations ${formik.values.name}`))
        .catch(e => {
          console.log(e);
          Notify.failure(
            `This mail  ${formik.values.email} is already registered `
          );
        });
      resetForm();
    },
  });

  return (
    <>
      <div>
        <SignUpForm htmlFor="name" onSubmit={formik.handleSubmit}>
          <Label>
            <MyStyledInput
              type="text"
              autoFocus
              placeholder="login"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Label>
          <Label>
            <MyStyledInput
              type="email"
              autoFocus
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Label>

          <Label>
            <MyStyledInput
              type="password"
              autoFocus
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Label>
          <Btn type="submit">SignUp</Btn>
        </SignUpForm>
      </div>
    </>
  );

  /*         {() => (
          <Form>
            <div>
              <label htmlFor="exampleInputName">Name</label>
              <Field name="name" id="exampleInputName" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail">Email</label>
              <Field name="email" id="exampleInputEmail" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword">Password</label>
              <Field name="password" id="exampleInputPassword" />
            </div>
            <button type="submit">Login</button>
          </Form>
        )} */
};

export default SignUp;

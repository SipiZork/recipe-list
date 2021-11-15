import { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getCurrentUser } from '../../actions/userAction';

const SignInSignUp = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const changeFromData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const Login = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const auth = getAuth();
      const userRef = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledSignInSignUp>
      <form onSubmit={(e) => Login(e)}></form>
      <Input type="text" name="email" value={formData.email} onChange={(e) => changeFromData(e)} required autoComplete="off" >Email</Input>
      <Input type="password" name="password" value={formData.password} onChange={(e) => changeFromData(e)} required autoComplete="off" >Jelszó</Input>
      <Button onClick={(e) => Login(e)}>Belépés</Button>
      <p>Demo email: demo@user.com</p>
      <p>jelszó: demoUser</p>
    </StyledSignInSignUp>
  )
}

const StyledSignInSignUp = styled.div`
  width: 80vw;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default SignInSignUp;

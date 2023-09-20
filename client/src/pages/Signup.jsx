import useSignup from '../hooks/useSignup';
import AuthForm from '../components/AuthForm';

function Signup() {
  const { signup, loading } = useSignup()

  const handleSignup = async (email, password) => {
    await signup(email, password)
  }

  return (
    <AuthForm type="SignUp" handleSubmit={handleSignup} loading={loading} />
  );
}

export default Signup
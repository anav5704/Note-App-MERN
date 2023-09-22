import useUserController from '../hooks/useUserController';
import AuthForm from '../components/AuthForm';

function Signup() {
  const { login, loading } = useUserController()

  const handleLogin = async (email, password) => {
    await login(email, password)
  }

  return (
    <AuthForm type="LogIn" handleSubmit={handleLogin} loading={loading} />
  );
}

export default Signup
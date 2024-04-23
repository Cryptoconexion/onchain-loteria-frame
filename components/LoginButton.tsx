import { SignInButton } from '@farcaster/auth-kit';

export const Login = () => {
  return (
    <SignInButton
      onSuccess={({ fid, username }) =>
        console.log(`Hello, ${username}! Your fid is ${fid}.`)
      }
    />
  );
};
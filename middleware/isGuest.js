export default function ({ $auth, redirect }) {
    if (!$auth.user) {
      redirect('/user/login-register')
    }
  }
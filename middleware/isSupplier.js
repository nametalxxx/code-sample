export default function ({ $auth, redirect }) {
    if ($auth.user && $auth.user.supplier === true) {
      redirect('/panel/')
    }
  }
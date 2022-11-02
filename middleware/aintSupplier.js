export default function ({ $auth, redirect }) {
    if (!$auth.user || $auth.user.supplier === false) {
      redirect('/become-supplier/')
    }
  }
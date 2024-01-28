const Login = () => {
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts">
        <form action="" className="form-login">
          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>
          <input type="submit" value="Ingresar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};

export default Login;

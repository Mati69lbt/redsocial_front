import Routing from "./router/Routing";

function App() {
  const size = window.innerWidth;
  console.log(size);
  return (
    <div className="layout">
      {/* Cargando toda la configuración de rutas */}
      <Routing />
    </div>
  );
}

export default App;

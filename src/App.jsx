import './App.css'
import { SaasLabsProvider } from './context/context'
import Catalog from './pages/Catalog'

function App() {

  return (
    <>
    <SaasLabsProvider>
        <div className="catalog-wrapper">
          <Catalog />
        </div>
      </SaasLabsProvider>
    </>
  )
}

export default App

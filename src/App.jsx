import './App.css'
import HomePage from "./components/pages/home-page/homePage.jsx";
import Modal from "./components/modal/modal.jsx";
import ErrorModal from "./components/modal/errorModal.jsx";
import Footer from "./components/footer/footer.jsx";

function App() {

  return (
    <>
      <HomePage/>
      <Modal />
      <ErrorModal />
      <Footer />
    </>
  )
}

export default App

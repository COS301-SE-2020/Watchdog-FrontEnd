import Header from '../components/Header'
import navButtons from "../config/buttons"
import NavBar from "../components/NavBar";
function Landing(){
    return (
      <div>
        <Header />
        <NavBar navButtons={navButtons} />
    </div>
    )
}
export default Landing
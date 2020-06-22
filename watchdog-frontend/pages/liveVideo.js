import Header from '../components/Header'
import navButtons from "../config/buttons"
import NavBar from "../components/NavBar";
function liveVideo(){
    return (
      <div>
        <Header />
        <NavBar navButtons={navButtons} />
    </div>
    )
}
export default liveVideo
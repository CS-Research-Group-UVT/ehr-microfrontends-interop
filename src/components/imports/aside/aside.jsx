import './aside.css'
import Filters from "../../filters/filters.jsx";
import changeSVG from '../../../assets/images/changeSVG.svg'
import {useSelector} from "react-redux";
import {getPatient} from "../../../store/selectors/patientSelectors.js";
import {Link} from "react-router";
const Aside = () => {
    const patient = useSelector(getPatient)
    // const patientFamilyName = patient.resource.name[0].family
    // const patientGivenName = patient.resource.name[0].given.join(', ')
    return (
        <aside className='aside module'>
            <Filters />
            <div className="aside-double-item">
                {/*<p className='current-patient'>{patientFamilyName}, {patientGivenName}</p>*/}
                <div className="aside-item">
                    <img src={changeSVG} className='svg-icon' alt=""/>
                    <Link to='/patients'>Change Patient</Link>
                </div>
            </div>

            <div className="aside-item">
            </div>
        </aside>
    )
}
export default Aside
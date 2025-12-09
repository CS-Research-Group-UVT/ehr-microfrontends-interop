import './homePage.css'
import Header from "../../imports/header/header.jsx";
import Body from "../../imports/body/body.jsx";
import Aside from "../../imports/aside/aside.jsx";
import Widgets from "../../widgets/widgets.jsx";
const HomePage = () => {
    return (
        <div className='outer-wrapper'>
            {/*<Body />*/}
            <Aside />
            <Widgets />
        </div>
    )
}
export default HomePage
import './widgets.css'
import Widget from "../widget/widget.jsx";
import {useEffect, useState} from "react";
import useFetchHook from "../../hooks/fetchHook.jsx";
import Loading from "../loading/loading.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { showErrorModal } from '../../store/actions/errorActions.js';

const Widgets = () => {
    const dispatch = useDispatch();
    const {fetchData} = useFetchHook()
    const [data, setData] = useState(null)
    const errorOpen = useSelector(state => state.error.isOpen);

    useEffect(() => {
        (async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const widgetList = await fetchData(`${apiUrl}/api/widgets/0/2`)
                setData(widgetList)
            } catch (err) {
                dispatch(showErrorModal('Failed to load widgets. Please try again later.'))
            }
        })()
    }, []);
    if(data === null && !errorOpen)
        return <Loading />
    else if (data === null && errorOpen)
        return null;
    else
        return (
            <div className='widgets'>
                {data.map(widget => {
                    return <Widget data={widget} />
                })}
            </div>
        )
}
export default Widgets
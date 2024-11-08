import svg from '../assets/emot_logo.png';

import './loading.css';

export const Loading = () => {
    return (
        <div className="modal-preload">
            <div className="circles">
                <div className="circle"></div>
                <div className="mainLogo">
                    <img src={svg} alt="" style={{opacity: 0.45, width: '70%', marginTop: '17px'}} />
                </div>
            </div>
        </div>
    )
}

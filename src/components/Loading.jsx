import svg from '../assets/vite.svg';

import './loading.css';

export const Loading = () => {
    return (
        <div className="modal-preload">
            <div className="circles">
                <div className="circle"></div>
                <div className="mainLogo">
                    <img src={svg} alt="" style={{opacity: 0.45, width: '55%', marginTop: '36px'}} />
                </div>
            </div>
        </div>
    )
}

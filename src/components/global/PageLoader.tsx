import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

type PageLoaderType = {
    typeT: "Audio" | "BallTriangle" | "Bars" | "Circles" | "Grid" | "Hearts" | "Oval" | "Puff" | "Rings" | "TailSpin" | "ThreeDots" | "Watch" | "RevolvingDot" | "Triangle" | "Plane" | "MutatingDots" | "CradleLoader";
    visibleT: boolean
}

const PageLoader = ({
    typeT,
    visibleT
}: PageLoaderType) => {
    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-12 col-md text-center">
                    <div style={{
                        position: 'fixed',
                        left: '0px',
                        top: '50%',
                        width: '100%',
                        height: '100%',
                        zIndex: 9999
                    }}>
                        <Loader
                            type={typeT}
                            color="#3769A1"
                            height={100}
                            width={100}
                            visible={visibleT}
                        />
                        <h4>Loading ...</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLoader;

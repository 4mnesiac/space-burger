import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import s from './loader.module.css'

const LoaderSpinner = ({type = 'default'}) => {
    return (
        <>
            {type === 'default' ? (
                <div className={s.overlay}>
                    <Loader
                        type="Oval"
                        color="#801AB2"
                        height={64}
                        width={64}
                    />
                </div>
            ) : (
                <Loader
                    type="Oval"
                    color="#801AB2"
                    height={96}
                    width={96}
                />
            )}
            
        </>
    )
}

LoaderSpinner.propTypes = {
  type: PropTypes.string
}
export default LoaderSpinner;

import Loader from "react-loader-spinner";
import s from './loader.module.css'

const LoaderSpinner = () => {
    return (
        <section className={s.overlay}>
            <Loader
                type="Oval"
                color="#801AB2"
                height={64}
                width={64}
            />
        </section>
    );
}
export default LoaderSpinner;

import { FC } from "react";
import Loader from "react-loader-spinner";
import s from './loader.module.css'

interface ILoader {
    type?: 'default' | 'light';
}

const LoaderSpinner: FC<ILoader> = ({type = 'default'}) => {
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

export default LoaderSpinner;

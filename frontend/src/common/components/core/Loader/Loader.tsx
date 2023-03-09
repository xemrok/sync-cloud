import style from './Loader.module.css';

export type LoaderProps = {
  size?: number;
  className?: string;
};

const Loader = ({ size = 48, className }: LoaderProps) => (
  <div className={`${style.container} ${className}`}>
    <div className={style.loader} style={{ width: `${size}px`, height: `${size}px` }}/>
  </div>
);

export default Loader;

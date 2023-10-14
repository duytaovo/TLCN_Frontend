import classNames from 'classnames/bind';
import styles from './styles.css';

const cx = classNames.bind(styles);
function Skeleton({ children, styles, className }) {
    return (
        <div className={cx('skeleton', className)} style={styles}>
            {children}
        </div>
    );
}

export default Skeleton
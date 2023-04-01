import { Icon } from '../../index';

import style from './ProfileLabel.module.css';


export type ProfileLabelColor =
    'white'
    | 'gray'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'success'
    | 'light-gray'
    | 'black';

export type ProfileLabelProps = {
    src?: string;
    name?: string;
    isFullName?: boolean;
    textPosition?: 'left' | 'right' | 'top' | 'bottom';
    imageSize?: number;
    fontSize?: number;
    color?: ProfileLabelColor;
    textColor?: ProfileLabelColor;
    onClick?: (event: any) => void;
};

const ProfileLabel = ({
    name,
    src,
    imageSize = 36,
    fontSize = 16,
    textColor = 'black',
    color = 'primary',
    textPosition = 'left',
    isFullName,
    onClick,
}: ProfileLabelProps) => (
    <div
        className={`${style.container} ${textPosition === 'bottom' || textPosition === 'top' ? style.horizontal : ''}`}
        style={{ fontSize }}
    >
        {name && isFullName && (
            <div
                className={`${style.name} ${
                    textPosition === 'left' || textPosition === 'top' ? style.before : style.after} ${style[textColor]} ${
                    onClick ? style.clickable : ''}`
                }
                onClick={onClick}
            >
                {name}
            </div>
        )}
        <div
            style={{ width: imageSize, height: imageSize, fontSize: 0.5 * imageSize }}
            className={`${style.container} ${style.img} ${style.letter} ${style[color]} ${onClick ? style.clickable : ''}`}
            onClick={onClick}
        >
            {src
                ? <img src={src} className={style.img} alt="Avatar" />
                : name ? name[0] : <Icon type="accountBoxOutline" color={color} size={0.6 * imageSize} />
            }
        </div>
    </div>
);

export default ProfileLabel;

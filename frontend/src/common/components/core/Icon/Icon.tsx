import { ComponentProps, ReactComponentElement } from 'react';

import { ReactComponent as Gear } from '../../../../assets/gear.svg';
import { ReactComponent as AccountBoxOutline } from '../../../../assets/account-box-outline.svg';
import { ReactComponent as ChevronRight } from '../../../../assets/chevron-right.svg';
import { ReactComponent as ChevronLeft } from '../../../../assets/chevron-left.svg';
import { ReactComponent as ChevronUp } from '../../../../assets/chevron-up.svg';
import { ReactComponent as ChevronDown } from '../../../../assets/chevron-down.svg';
import { ReactComponent as Close } from '../../../../assets/close.svg';
import { ReactComponent as FileUploadOutline } from '../../../../assets/file-upload-outline.svg';
import { ReactComponent as DeleteOutline } from '../../../../assets/delete-outline.svg';
import { ReactComponent as Delete } from '../../../../assets/delete.svg';
import { ReactComponent as EyeOff } from '../../../../assets/eye-off.svg';
import { ReactComponent as Eye } from '../../../../assets/eye.svg';
import { ReactComponent as Search } from '../../../../assets/search.svg';
import { ReactComponent as Menu } from '../../../../assets/menu.svg';
import { ReactComponent as FolderTable } from '../../../../assets/folder-table.svg';
import { ReactComponent as DeleteRestore } from '../../../../assets/delete-restore.svg';
import { ReactComponent as AlertOutline } from '../../../../assets/alert-outline.svg';
import { ReactComponent as CloudUpload } from '../../../../assets/cloud-upload.svg';
import { ReactComponent as Logout } from '../../../../assets/logout.svg';

import style from './Icon.module.css';


export type IconTypes =
    'gear'
    | 'logout'
    | 'cloudUpload'
    | 'alertOutline'
    | 'deleteRestore'
    | 'folderTable'
    | 'menu'
    | 'chevronDown'
    | 'chevronUp'
    | 'search'
    | 'eye'
    | 'eyeOff'
    | 'delete'
    | 'deleteOutline'
    | 'fileUploadOutline'
    | 'close'
    | 'chevronLeft'
    | 'chevronRight'
    | 'accountBoxOutline';

export type IconColor =
    'gray'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'white'
    | 'dark-gray'
    | 'light-gray'
    | 'black'
    | 'background';

export type IconProps = {
    className?: string;
    type?: IconTypes;
    color?: IconColor;
    size?: number | 'auto';
    height?: number;
    width?: number;
    disabled?: boolean;
    onClick?: (e: any) => void;
} & ComponentProps<'span'>;

const iconByType = (type?: IconTypes): ReactComponentElement<any> => {
    switch (type) {
        case 'logout':
            return <Logout />
        case 'cloudUpload':
            return <CloudUpload />
        case 'alertOutline':
            return <AlertOutline />
        case 'deleteRestore':
            return <DeleteRestore />
        case 'folderTable':
            return <FolderTable />
        case 'menu':
            return <Menu />
        case 'chevronDown':
            return <ChevronDown />
        case 'chevronUp':
            return <ChevronUp />
        case 'search':
            return <Search />
        case 'eye':
            return <Eye />
        case 'eyeOff':
            return <EyeOff />
        case 'delete':
            return <Delete />
        case 'deleteOutline':
            return <DeleteOutline />
        case 'fileUploadOutline':
            return <FileUploadOutline />
        case 'close':
            return <Close />
        case 'chevronLeft':
            return <ChevronLeft />
        case 'chevronRight':
            return <ChevronRight />
        case 'accountBoxOutline':
            return <AccountBoxOutline />
        default:
            return <Gear />;
    }
};

const Icon = ({
    className,
    type,
    color = 'gray',
    size = 16,
    height,
    width,
    disabled,
    onClick,
    ...props
}: IconProps) => (
    <span
        className={`${style.container} ${style[color!]} ${className} ${disabled ? style.disabled : ''}`}
        style={{ height: height || size, width: width || size }}
        onClick={e => onClick && !disabled && onClick(e)}
        {...props}
    >
        {iconByType(type)}
    </span>
);

export default Icon;

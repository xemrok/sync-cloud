import React, { ComponentProps, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

import style from './TooltipMenu.module.css';


export type TooltipMenuProps = {
    className?: string;
    classNameWrapper?: string;
    node?: ReactElement;
    children?: string | ReactNode | ReactNode[];
} & ComponentProps<'ul'>;

const TooltipMenu = ({ className, classNameWrapper, node, children, ...props }: TooltipMenuProps) => {
    const mouseOver = useRef<boolean>(false);
    const items = children as Array<ReactElement>;
    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisible = (state: boolean): void => setVisible(state);

    const onMouseClose = (): false | void => !mouseOver.current && toggleVisible(false);

    useEffect(() => {
        document.addEventListener('mousedown', onMouseClose);
        return () => document.removeEventListener('mousedown', onMouseClose);
    }, []);

    return (
        <div className={`${style.wrapper} ${classNameWrapper || ''}`}>
            {node &&
                React.cloneElement(node, {
                    ...node.props,
                    onClick: (e: any): void => {
                        toggleVisible(!visible);
                        node.props?.onClick && node.props.onClick(e);
                    },
                    onMouseOver: (e: any): void => {
                        mouseOver.current = true;
                        node.props?.onMouseOver && node.props.onMouseOver(e);
                    },
                    onMouseOut: (e: any): void => {
                        mouseOver.current = false;
                        node.props?.onMouseOut && node.props.onMouseOut(e);
                    },
                })
            }
            {visible &&
                <ul
                    {...props}
                    className={`${style.menu} ${className || ''}`}
                    onMouseOver={() => (mouseOver.current = true)}
                    onMouseOut={() => (mouseOver.current = false)}
                >
                    {items.map((item, index) =>
                        React.cloneElement(item, {
                            key: `tooltip-item-${index}`,
                            ...item.props,
                            onClick: (e: any) => {
                                toggleVisible(!visible);
                                item.props.onClick && item.props.onClick(e)
                            },
                        }))
                    }
                </ul>
            }
        </div>
    )
};

export default TooltipMenu;

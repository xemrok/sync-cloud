import { ReactNode } from 'react';


export type TableNoDataProps = {
    colSpan: number;
    children?: ReactNode | ReactNode[];
};

const TableNoData = ({ colSpan, children }: TableNoDataProps) => (
    <tr className="empty-string">
        <td colSpan={colSpan}>{children}</td>
    </tr>
);

export default TableNoData;

import * as React from 'react';
import { styled } from '@mui/material/styles';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Link, useTranslate, useGetMany, useRecordContext } from 'react-admin';

interface RequestProps{
    name: string;
    price: number;
    quantity: number;
    firstPayment: number;
}

const RequestInfo = ({name, price, quantity, firstPayment}: RequestProps) => {
    const translate = useTranslate();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        {'Назва'}
                    </TableCell>
                    <TableCell>
                        {'Перший платіж'}
                    </TableCell>
                    {/* <TableCell>
                        {'Кількість'}
                    </TableCell> */}
                    <TableCell>
                        {'Ціна'}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    <TableRow >
                        <TableCell>
                            {name}
                        </TableCell>
                        <TableCell>
                            {firstPayment === null ? Number(0).toLocaleString(
                                undefined,
                                {
                                    style: 'currency',
                                    currency: 'UAH',
                                }
                            ) : firstPayment.toLocaleString(
                                undefined,
                                {
                                    style: 'currency',
                                    currency: 'UAH',
                                }
                            )}
                        </TableCell>
                        {/* <TableCell>{quantity}</TableCell> */}
                        <TableCell>
                            {price === null ? Number(0).toLocaleString(
                                undefined,
                                {
                                    style: 'currency',
                                    currency: 'UAH',
                                }
                            ) : price.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'UAH',
                            })}
                        </TableCell>
                    </TableRow>
            </TableBody>
        </Table>
    );
};

export default RequestInfo;

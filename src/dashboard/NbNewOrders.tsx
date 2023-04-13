import * as React from 'react';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const NbNewOrders = (props: Props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to='/calculator'
            icon={CalculateIcon}
            title={translate('pos.dashboard.calculator')}
            subtitle={'Платіж по кредиту'}
        />
    );
};

export default NbNewOrders;

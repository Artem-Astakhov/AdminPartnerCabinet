import * as React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: string;
}

const MonthlyRevenue = (props: Props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/commands"
            icon={PersonAddIcon}
            title={translate('pos.dashboard.monthly_revenue')}
            subtitle={translate('pos.dashboard.create_orders')}
        />
    );
};

export default MonthlyRevenue;

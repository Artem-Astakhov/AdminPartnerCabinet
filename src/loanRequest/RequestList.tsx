import * as React from 'react';
import { Fragment, useCallback } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Count,
    DatagridConfigurable,
    DateField,
    DateInput,
    ExportButton,
    FilterButton,
    List,
    NullableBooleanInput,
    NumberField,
    ReferenceField,
    ReferenceInput,
    SearchInput,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar,
    useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@mui/material';

import NbItemsField from '../orders/NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from '../orders/MobileGrid';
import { Customer } from '../types';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);

const RequestList = () => (
    <List
        filterDefaultValues={{ status: 'InProgress' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        filters={orderFilters}
        actions={<ListActions />}
    >
        <TabbedDatagrid />
    </List>
);

const orderFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="customer_id" reference="customers">
        <AutocompleteInput
            optionText={(choice?: Customer) =>
                choice?.id // the empty choice is { id: '' }
                    ? `${choice.first_name} ${choice.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <DateInput source="date_gte" />,
    <DateInput source="date_lte" />,
    <TextInput source="total_gte" />,
    <NullableBooleanInput source="returned" />,
];

const tabs = [
    { id: 'InProgress', name: 'InProgress', source: 'В прогресі'  },
    { id: 'Done', name: 'Done', source: 'Виконані' },
    { id: 'Canceled', name: 'Canceled', source: 'Відмінені' },
];

const TabbedDatagrid = () => {
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters,
                    false // no debounce, we want the filter to fire immediately
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            <span>
                                {choice.source} (
                                <Count
                                    filter={{
                                        ...filterValues,
                                        status: choice.name,
                                    }}
                                    sx={{ lineHeight: 'inherit' }}
                                />
                                )
                            </span>
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <MobileGrid />
            ) : (
                <>
                    {filterValues.status === 'InProgress' && (
                        <DatagridConfigurable
                            rowClick="edit"
                            omit={['contactIpn', 'contactEmail', 'status']}
                        >
                            <DateField source="createdOn" showTime />
                            <TextField source="contactName" />
                            <TextField source="contactEmail" />
                            <TextField source="contactPhone" />
                            <TextField source="contactIpn" />
                            <TextField source="contactPassport" />
                            <TextField source="carName" />
                            <TextField source="carNumber" />
                            <TextField source="status" />
                            <CustomerReferenceField />

                            <NumberField
                                source="carPrice"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                            <NumberField
                                source="firstPayment"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                        </DatagridConfigurable>
                    )}
                    {filterValues.status === 'Done' && (
                        <DatagridConfigurable
                            rowClick="edit"
                            omit={['contactIpn', 'contactEmail', 'status']}
                        >
                            <DateField source="createdOn" showTime />
                            <TextField source="contactName" />
                            <TextField source="contactEmail" />
                            <TextField source="contactPhone" />
                            <TextField source="contactIpn" />
                            <TextField source="contactPassport" />
                            <TextField source="carName" />
                            <TextField source="carNumber" />
                            <TextField source="status" />
                            <CustomerReferenceField />

                            <NumberField
                                source="carPrice"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                            <NumberField
                                source="firstPayment"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                        </DatagridConfigurable>
                    )}
                    {filterValues.status === 'Canceled' && (
                        <DatagridConfigurable
                            rowClick="edit"
                            omit={['contactIpn', 'contactEmail', 'status']}
                        >
                            <DateField source="createdOn" showTime />
                            <TextField source="contactName" />
                            <TextField source="contactEmail" />
                            <TextField source="contactPhone" />
                            <TextField source="contactIpn" />
                            <TextField source="contactPassport" />
                            <TextField source="carName" />
                            <TextField source="carNumber" />
                            <TextField source="status" />
                            <CustomerReferenceField />

                            <NumberField
                                source="carPrice"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                            <NumberField
                                source="firstPayment"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                        </DatagridConfigurable>
                    )}
                </>
            )}
        </Fragment>
    );
};

export default RequestList;
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
    useRedirect
} from 'react-admin';
import { NavLink } from 'react-router-dom';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NbItemsField from '../orders/NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer } from '../types';


const ListActions = () => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    return (<TopToolbar>
                {isXSmall ? (
                <span style={{marginLeft:'0', marginRight:"auto"}}><NavLink to={'/'}><ArrowBackIcon fontSize='large' color='primary'  /></NavLink></span>
                ) : (<span></span>)
                }
                <SelectColumnsButton />
                <FilterButton />
                <ExportButton />
            </TopToolbar>)
};

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
    const redirect = useRedirect();    
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
    const back = ()=>{
        redirect('/');
    }    
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
                            omit={['contactIpn', 'status']}
                        >
                            <DateField source="createdOn" label="Дата"  showTime />
                            <TextField source="contactName" label="Ім'я" />
                            <TextField source="contactPhone" label="Контактний телефон" />
                            <TextField source="contactIpn" label="ІПН" />
                            <TextField source="contactPassport" label="Паспорт" />
                            <TextField source="carName" label="Марка авто" />
                            <TextField source="carNumber" label="Держ. номер" />
                            <TextField source="status" label="Статус" />
                            
                            <NumberField
                                source="carPrice"
                                label="Вартість"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                    default: 0
                                }}
                            />
                            <NumberField
                                source="firstPayment"
                                label="Початковий внесок"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                    default: 0
                                }}
                            />
                        </DatagridConfigurable>
                    )}
                    {filterValues.status === 'Done' && (
                        <DatagridConfigurable
                            rowClick="edit"
                            omit={['contactIpn', 'status']}
                        >
                            <DateField source="createdOn" label="Дата"  showTime />
                            <TextField source="contactName" label="Ім'я" />
                            <TextField source="contactPhone" label="Контактний телефон" />
                            <TextField source="contactIpn" label="ІПН" />
                            <TextField source="contactPassport" label="Паспорт" />
                            <TextField source="carName" label="Марка авто" />
                            <TextField source="carNumber" label="Держ. номер" />
                            <TextField source="status" label="Статус" />

                            <NumberField
                                source="carPrice"
                                label="Вартість"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                            <NumberField
                                source="firstPayment"
                                label="Початковий внесок"
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
                            omit={['contactIpn', 'status']}
                        >
                            <DateField source="createdOn" label="Дата"  showTime />
                            <TextField source="contactName" label="Ім'я" />
                            <TextField source="contactPhone" label="Контактний телефон" />
                            <TextField source="contactIpn" label="ІПН" />
                            <TextField source="contactPassport" label="Паспорт" />
                            <TextField source="carName" label="Марка авто" />
                            <TextField source="carNumber" label="Держ. номер" />
                            <TextField source="status" label="Статус" />

                            <NumberField
                                source="carPrice"
                                label="Вартість"
                                options={{
                                    style: 'currency',
                                    currency: 'UAH',
                                }}
                            />
                            <NumberField
                                source="firstPayment"
                                label="Початковий внесок"
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
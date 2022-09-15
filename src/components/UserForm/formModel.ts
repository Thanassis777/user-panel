import {InputProps, User} from '../../models';

export const initialUserState: User = {
    id: '',
    photo: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
};

export const initialFormModel: InputProps[] = [
    {
        label: 'Name',
        id: 'name',
        name: 'name',
    },
    {
        label: 'Email address',
        id: 'email',
        name: 'email',
    },
    {
        label: 'Phone',
        id: 'phone',
        name: 'phone',
    },
    {
        label: 'Address',
        id: 'address',
        name: 'address',
    },
    {
        label: 'Company',
        id: 'company',
        name: 'company',
    },
];

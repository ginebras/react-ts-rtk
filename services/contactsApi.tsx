import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contact'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
  }),
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: () => '/products',
      providesTags: ['Contact'],
    }),
    contact: builder.query<Contact, string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation<void, Contact>({
      query: (contact) => ({
        url: '/products',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
